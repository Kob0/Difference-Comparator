import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';

const getAllKeys = (object1, object2) => _.union(Object.keys(object1), Object.keys(object2)).sort();

const makeDiff = (obj1, obj2) => {
  const keys = getAllKeys(obj1, obj2);
  return keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { name: key, status: 'added', value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { name: key, status: 'deleted', value: obj1[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { name: key, status: 'unknown', children: makeDiff(obj1[key], obj2[key]) };
    }
    if (obj1[key] === obj2[key]) {
      return { name: key, status: 'unmodified', value: obj1[key] };
    }
    return {
      name: key, status: 'modified', oldValue: obj1[key], newValue: obj2[key],
    };
  });
};

export default (filepath1, filepath2, outputFormat) => {
  const currentDir = process.cwd();
  const fullPath1 = path.resolve(currentDir, '__fixtures__', filepath1);
  const fullPath2 = path.resolve(currentDir, '__fixtures__', filepath2);
  const data1 = fs.readFileSync(fullPath1, 'utf-8');
  const data2 = fs.readFileSync(fullPath2, 'utf-8');
  const getFileExtention = (filePath) => path.extname(filePath).slice(1);
  const obj1 = parse(data1, getFileExtention(fullPath1));
  const obj2 = parse(data2, getFileExtention(fullPath2));
  const diff = makeDiff(obj1, obj2);

  return format(diff, outputFormat);
};
