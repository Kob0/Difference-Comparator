/* eslint-disable no-undef */
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let result;

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

test('getDiff for json files', () => {
  const jsonPath1 = getFixturePath('file1.json');
  const jsonPath2 = getFixturePath('file2.json');
  expect(getDiff(jsonPath1, jsonPath2)).toEqual(result);
});

test('getDiff for yaml files', () => {
  const yamlPath1 = getFixturePath('file1.yml');
  const yamlPath2 = getFixturePath('file2.yml');
  expect(getDiff(yamlPath1, yamlPath2)).toEqual(result);
});

test('getDiff for ini files', () => {
  const iniPath1 = getFixturePath('file1.ini');
  const iniPath2 = getFixturePath('file2.ini');
  expect(getDiff(iniPath1, iniPath2)).toEqual(result);
});
