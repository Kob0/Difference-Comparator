import fs from 'fs';
import path from 'path';
import parse from './src/parsers.js';
import makeDiff from './src/index.js';
import format from './src/formatters/index.js';

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
