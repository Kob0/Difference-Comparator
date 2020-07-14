/* eslint-disable no-undef */
import { test, expect } from '@jest/globals';
import getDiff from '../src/index.js';

let result;
let dirname;

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

test('getting diffs from two yaml files', () => {
  dirname = `${process.cwd()}/__fixtures__/`;
  const filepath1 = `${dirname}before.json`;
  const filepath2 = `${dirname}after.json`;
  expect(getDiff(filepath1, filepath2)).toEqual(result);
});

test('getting diffs from two yaml files', () => {
  dirname = `${process.cwd()}/__fixtures__/`;
  const filepath1 = `${dirname}before.yml`;
  const filepath2 = `${dirname}after.yml`;
  expect(getDiff(filepath1, filepath2)).toEqual(result);
});
