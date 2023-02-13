#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/js/index.js';

const program = new Command();

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => console.log(genDiff(
    filepath1,
    filepath2,
  )));
program.parse();
