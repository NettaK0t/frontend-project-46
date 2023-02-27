import _ from 'lodash';
import genOutput from './formatters/index.js';
import readFiles from './reader.js';

const genDiff = (filePath1, filPath2, format) => {
  const [objFromFile1, objFromFile2] = readFiles(filePath1, filPath2);

  const bldInternalStruct = (obj1, obj2) => {
    if (!_.isObject(obj1) || !_.isObject(obj2)) {
      return [];
    }
    const file1Keys = Object.keys(obj1);
    const file2Keys = Object.keys(obj2);
    const commonUniqKeys = _.sortBy(_.union(file1Keys, file2Keys));

    return commonUniqKeys.map((key) => {
      const properties = [
        {
          value: obj2[key],
          type: 'added',
          check: (k) => !file1Keys.includes(k),
        },
        {
          value: obj1[key],
          type: 'removed',
          check: (k) => !file2Keys.includes(k),
        },
        {
          type: 'nested',
          check: (k) => _.isObject(obj1[key]) && _.isObject(obj2[k]),
        },
        {
          valBefore: obj1[key],
          valAfter: obj2[key],
          type: 'updated',
          check: (k) => obj1[key] !== obj2[k],
        },
        {
          value: obj1[key],
          type: 'unchanged',
          check: (k) => obj1[key] === obj2[k],
        },
      ];

      const getProperty = (k) => properties.find(({ check }) => check(k));

      const children = bldInternalStruct(obj1[key], obj2[key]);
      const { value = {}, valBefore = {}, valAfter = {}, type } = getProperty(key);

      return {
        key,
        type,
        value,
        valBefore,
        valAfter,
        children,
      };
    });
  };

  const internalStructure = bldInternalStruct(objFromFile1, objFromFile2);

  return genOutput(internalStructure, format);
};

export default genDiff;
