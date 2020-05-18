#!/usr/bin/env/ node

import commander from 'commander';

const program = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.');

program.parse(process.argv);
