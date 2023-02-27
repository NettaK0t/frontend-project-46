import genStylishOutput from './stylish.js';
import genPlainOutput from './plain.js';
import genJsonOutput from './json.js';

const genOutput = (internalStructure, format) => {
  switch (format) {
    case 'plain':
      return genPlainOutput(internalStructure);
    case 'json':
      return genJsonOutput(internalStructure);
    default: return genStylishOutput(internalStructure);
  }
};

export default genOutput;
