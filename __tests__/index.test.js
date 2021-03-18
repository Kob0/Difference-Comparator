import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['json', 'stylish', 'expectedStylish.txt'],
  ['yml', 'stylish', 'expectedStylish.txt'],
  ['json', 'plain', 'expectedPlain.txt'],
  ['yml', 'plain', 'expectedPlain.txt'],
  ['json', 'json', 'expectedJson.txt'],
  ['yml', 'json', 'expectedJson.txt'],
];

describe('test genDiff, each case in order', () => {
  test.each(cases)(
    'files of type %p formatted in %p and expected to be as %p',
    (type, format, expectedResult) => {
      const file1 = getFixturePath(`file1.${type}`);
      const file2 = getFixturePath(`file2.${type}`);
      const diff = genDiff(file1, file2, format).trim();
      const result = readFile(expectedResult).trim();
      expect(diff).toEqual(result);
    },
  );
});
