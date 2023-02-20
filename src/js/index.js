import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parser from './parser.js';

const genDiff = (filePath1, filPath2, format = 'stylish') => {
  const filePaths = [filePath1, filPath2];
  const arrOfObjects = filePaths.map((fPath) => {
    const formatFile = path.extname(fPath);
    const strFromFile = fs.readFileSync(path.resolve(fPath), 'utf8');
    return parser(strFromFile, formatFile);
  });
  const [objFromFile1, objFromFile2] = arrOfObjects;
  const file1Keys = Object.keys(objFromFile1);
  const file2Keys = Object.keys(objFromFile2);
  const commonUniqKeys = _.sortBy(_.union(file1Keys, file2Keys));

  if (format === 'stylish') {
    const diffStr = commonUniqKeys.reduce((str, key) => {
      if (!file2Keys.includes(key)) {
        return `${str}  - ${key}: ${objFromFile1[key]}\n`;
      }
      if (!file1Keys.includes(key)) {
        return `${str}  + ${key}: ${objFromFile2[key]}\n`;
      }
      if (objFromFile1[key] !== objFromFile2[key]) {
        return `${str}  - ${key}: ${objFromFile1[key]}\n  + ${key}: ${objFromFile2[key]}\n`;
      }
      return `${str}    ${key}: ${objFromFile1[key]}\n`;
    }, '');
    return `{\n${diffStr}}`;
  }
  return null;
};

export default genDiff;
