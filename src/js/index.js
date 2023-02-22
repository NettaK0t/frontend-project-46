import _ from 'lodash';
import genOutput from './formatters/index.js';
import readFiles from './reader.js';

const genDiff = (filePath1, filPath2, format = 'stylish') => {
  const [objFromFile1, objFromFile2] = readFiles(filePath1, filPath2);

  const bldInternalStruct = (obj1, obj2) => {
    if (!_.isObject(obj1) || !_.isObject(obj2)) {
      return [];
    }
    const file1Keys = Object.keys(obj1);
    const file2Keys = Object.keys(obj2);
    const commonUniqKeys = _.sortBy(_.union(file1Keys, file2Keys));

    return commonUniqKeys.map((key) => {
      const children = bldInternalStruct(obj1[key], obj2[key]);
      if (!file1Keys.includes(key)) {
        return {
          key, value: obj2[key], type: 'added', children,
        };
      }
      if (!file2Keys.includes(key)) {
        return {
          key, value: obj1[key], type: 'removed', children,
        };
      }
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return {
          key, type: 'unchanged', children,
        };
      }
      if (obj1[key] !== obj2[key]) {
        return {
          key, valBefore: obj1[key], valAfter: obj2[key], type: 'updated', children,
        };
      }
      return {
        key, value: obj1[key], type: 'unchanged', children,
      };
    });
  };
  const internalStructure = bldInternalStruct(objFromFile1, objFromFile2);

  return genOutput(internalStructure, format);
};

export default genDiff;
