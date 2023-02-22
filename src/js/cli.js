import { Command } from 'commander';
import genDiff from './index.js';

const makeHelp = () => {
  const program = new Command();

  program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1', '-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2, format = program.opts().format) => console.log(genDiff(
      filepath1,
      filepath2,
      format,
    )))
    .parse();
};

export default makeHelp;
