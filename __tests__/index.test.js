import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const ymlFile1 = getFixturePath('file1.yml');
const ymlFile2 = getFixturePath('file2.yml');

const stylishDiff = readFile('expectedStylish.txt').trim();
const jsonDiff = readFile('expectedJson.txt').trim();
const plainDiff = readFile('expectedPlain.txt').trim();

test('compare two files and shows a diff in stylish output format', () => {
  expect(genDiff(jsonFile1, jsonFile2)).toBe(stylishDiff);
  expect(genDiff(jsonFile1, jsonFile2, 'stylish')).toBe(stylishDiff);
  expect(genDiff(ymlFile1, ymlFile2, 'stylish')).toBe(stylishDiff);
  expect(genDiff(ymlFile1, jsonFile2, 'stylish')).toBe(stylishDiff);
});

test('compare two files and shows a diff in plain output format', () => {
  expect(genDiff(jsonFile1, jsonFile2, 'plain')).toBe(plainDiff);
  expect(genDiff(ymlFile1, ymlFile2, 'plain')).toBe(plainDiff);
  expect(genDiff(ymlFile1, jsonFile2, 'plain')).toBe(plainDiff);
});

test('compare two files and shows a diff in json output format', () => {
  expect(genDiff(jsonFile1, jsonFile2, 'json')).toBe(jsonDiff);
  expect(genDiff(ymlFile1, ymlFile2, 'json')).toBe(jsonDiff);
  expect(genDiff(ymlFile1, jsonFile2, 'json')).toBe(jsonDiff);
});
