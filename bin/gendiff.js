#!/usr/bin/env node

import commander from 'commander';
import genDiff from '../src/index.js';

const program = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action(() => {
    genDiff('src/before.json', 'src/after.json');
  });
  
program.parse(process.argv);

genDiff('src/before.json', 'src/after.json');
