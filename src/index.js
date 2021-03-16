import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';

const makeDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  return keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { name: key, status: 'added', value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { name: key, status: 'deleted', value: obj1[key] };
    }
    if (obj1[key] === obj2[key]) {
      return { name: key, status: 'unmodified', value: obj1[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { name: key, status: 'unknown', children: makeDiff(obj1[key], obj2[key]) };
    }
    return {
      name: key, status: 'modified', oldValue: obj1[key], newValue: obj2[key],
    };
  });
};

const getDiff = (filepath1, filepath2) => {
  const currentDir = process.cwd();
  const fullPath1 = path.resolve(currentDir, filepath1);
  const fullPath2 = path.resolve(currentDir, filepath2);
  const data1 = fs.readFileSync(fullPath1, 'utf-8');
  const data2 = fs.readFileSync(fullPath2, 'utf-8');
  const getFormat = (filePath) => path.extname(filePath).slice(1);
  const obj1 = parse(data1, getFormat(fullPath1));
  const obj2 = parse(data2, getFormat(fullPath2));

  return makeDiff(obj1, obj2);
};

console.log(getDiff('__fixtures__/file1.json', '__fixtures__/file2.json'));
