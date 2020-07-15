import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const getCorrectPathToFile = (pathToFile) => {
  const currentDirectory = process.cwd();
  let correctPath;
  if (!currentDirectory.includes(pathToFile)) {
    correctPath = path.resolve(currentDirectory, pathToFile);
  } else {
    correctPath = pathToFile;
  }

  return correctPath;
};

const getDiff = (pathToFile, pathToFile2) => {
  const file = fs.readFileSync(getCorrectPathToFile(pathToFile), 'utf8');
  const file2 = fs.readFileSync(getCorrectPathToFile(pathToFile2), 'utf8');

  const obj = JSON.parse(file);
  const obj2 = JSON.parse(file2);

  const keys = _.uniq([...Object.keys(obj), ...Object.keys(obj2)]);

  const result = ['{'];

  for (let i = 0; i < keys.length; i += 1) {
    if (_.has(obj2, keys[i]) && _.has(obj, keys[i])) {
      if (obj2[keys[i]] === obj[keys[i]]) {
        result.push(`    ${keys[i]}: ${obj2[keys[i]]}`);
      } else {
        result.push(`  + ${keys[i]}: ${obj2[keys[i]]}`);
        result.push(`  - ${keys[i]}: ${obj[keys[i]]}`);
      }
    } else if (_.has(obj2, keys[i])) {
      result.push(`  + ${keys[i]}: ${obj2[keys[i]]}`);
    } else {
      result.push(`  - ${keys[i]}: ${obj[keys[i]]}`);
    }
  }
  result.push('}');

  const diff = result.join('\n');
  console.log(diff);

  return diff;
};

export default getDiff;
