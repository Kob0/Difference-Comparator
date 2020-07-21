import _ from 'lodash';
import parseFile from './parsers.js';

export default (pathToFile, pathToFile2) => {
  const obj = parseFile(pathToFile);
  const obj2 = parseFile(pathToFile2);

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
