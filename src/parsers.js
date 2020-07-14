import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const format = path.extname(data).substring(1);

  let parse;

  if (format === 'json') {
    parse = JSON.parse;
  } else if (format === 'yml') {
    parse = yaml.safeLoad;
  }

  return parse(data);
};

export default parseFile;
