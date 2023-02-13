import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const genDiff = (filePath1, filePath2) => {
  const strFromFile1 = fs.readFileSync(path.resolve(filePath1), { encoding: 'utf8', flag: 'r' });
  const strFromFile2 = fs.readFileSync(path.resolve(filePath2), { encoding: 'utf8', flag: 'r' });
  const objFromFile1 = JSON.parse(strFromFile1);
  const objFromFile2 = JSON.parse(strFromFile2);
  const file1Keys = Object.keys(objFromFile1);
  const file2Keys = Object.keys(objFromFile2);
  const commonUniqKeys = _.sortBy(_.union(file1Keys, file2Keys));

  const diffStr = commonUniqKeys.reduce((str, key) => {
    if (file1Keys.includes(key) && !file2Keys.includes(key)) {
      return `${str}  - ${key}: ${objFromFile1[key]}\n`;
    }
    if (!file1Keys.includes(key) && file2Keys.includes(key)) {
      return `${str}  + ${key}: ${objFromFile2[key]}\n`;
    }
    if (objFromFile1[key] !== objFromFile2[key]) {
      return `${str}  - ${key}: ${objFromFile1[key]}\n  + ${key}: ${objFromFile2[key]}\n`;
    }
    return `${str}    ${key}: ${objFromFile1[key]}\n`;
  }, '');
  return `{\n${diffStr}}`;
};

export default genDiff;
