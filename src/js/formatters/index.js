import genStylishOutput from './stylish.js';
import genPlainOutput from './plain.js';
import genJsonOutput from './json.js';

const genOutput = (internalStructure, format = 'stylish') => {
  switch (format) {
    case 'plain':
      return genPlainOutput(internalStructure);
    case 'json':
      return genJsonOutput(internalStructure);
    case 'stylish':
      return genStylishOutput(internalStructure);
    default:
      throw new Error('Error. Please enter correct format name');
  }
};

export default genOutput;
