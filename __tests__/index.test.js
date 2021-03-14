/* eslint-disable no-undef */
import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['json', 'stylish', 'exectedStylish.txt'],
  ['yml', 'stylish', 'expectedStylish.txt'],
];

describe('test genDiff, each case in order', () => {
  test.each(cases)(
    'files in type %p formatted in %p and expected to be as %p',
    (type, format, expectedResult) => {
      const file1 = getFixturePath(`1.${type}`);
      const file2 = getFixturePath(`2.${type}`);
      const diff = getDiff(file1, file2, format);
      const result = readFile(expectedResult).trim();
      expect(diff).toEqual(result);
    },
  );
});
