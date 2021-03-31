#!/usr/bin/env node

import commander from 'commander';
import getDiff from '../index.js';

const program = commander.createCommand();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'choose output format: stylish | plain | json', 'stylish')
  .action((filepath1, filepath2) => console.log(getDiff(filepath1, filepath2, program.format)));

program.parse(process.argv);
