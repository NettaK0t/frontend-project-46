import genStylishOutput from './stylish.js';
import genPlainOutput from './plain.js';

const genOutput = (internalStructure, format) => {
  switch (format) {
    case 'stylish':
      return genStylishOutput(internalStructure);
    case 'plain':
      return genPlainOutput(internalStructure);
    default: return 'Error. Please, enter correct format name.';
  }
};

export default genOutput;
