import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

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

const parseFile = (filePath) => {
  const data = fs.readFileSync(getCorrectPathToFile(filePath), 'utf8');
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
