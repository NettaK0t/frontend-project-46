import genOutput from './formatters/index.js';
import readFiles from './reader.js';
import bldInternalStruct from './buildStructure.js';

const genDiff = (filePath1, filPath2, format) => {
  const [objFromFile1, objFromFile2] = readFiles(filePath1, filPath2);
  const internalStructure = bldInternalStruct(objFromFile1, objFromFile2);

  return genOutput(internalStructure, format);
};

export default genDiff;
