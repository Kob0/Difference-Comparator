/* eslint-disable no-undef */
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

beforeEach(() => {
  result = [
    '{',
    '    host: hexlet.io',
    '  + timeout: 20',
    '  - timeout: 50',
    '  - proxy: 123.234.53.22',
    '  - follow: false',
    '  + verbose: true',
    '}'].join('\n');
});

test('getting diffs from two json files', () => {
  const jsonPath1 = getFixturePath('before.json');
  const jsonPath2 = getFixturePath('after.json');
  expect(getDiff(jsonPath1, jsonPath2)).toEqual(result);
});

test('getting diffs from two yaml files', () => {
  const yamlPath1 = getFixturePath('before.json');
  const yamlPath2 = getFixturePath('after.json');
  expect(getDiff(yamlPath1, yamlPath2)).toEqual(result);
});
