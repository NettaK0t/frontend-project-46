import _ from 'lodash';
import genOutput from './stylish.js';
import readFile from './reader.js';

const genDiff = (filePath1, filPath2, format = 'stylish') => {
  const [objFromFile1, objFromFile2] = readFile(filePath1, filPath2);

  const bldInternalStruct = (obj1, obj2) => {
    const newObj1 = _.cloneDeep(obj1);
    const newObj2 = _.cloneDeep(obj2);
    if (!_.isObject(newObj1) || !_.isObject(newObj2)) {
      return [];
    }
    const file1Keys = Object.keys(newObj1);
    const file2Keys = Object.keys(newObj2);
    const commonUniqKeys = _.sortBy(_.union(file1Keys, file2Keys));

    return commonUniqKeys.map((key) => {
      const children = bldInternalStruct(newObj1[key], newObj2[key]);
      if (!file1Keys.includes(key)) {
        return {
          key, value: newObj2[key], type: 'added', children,
        };
      }
      if (!file2Keys.includes(key)) {
        return {
          key, value: newObj1[key], type: 'deleted', children,
        };
      }
      if (_.isObject(newObj1[key]) && _.isObject(newObj2[key])) {
        return {
          key, type: 'unchanged', children,
        };
      }
      if (newObj1[key] !== newObj2[key]) {
        return {
          key, valBefore: newObj1[key], valAfter: newObj2[key], type: 'changed', children,
        };
      }
      return {
        key, value: newObj1[key], type: 'unchanged', children,
      };
    });
  };
  const internalStructure = bldInternalStruct(objFromFile1, objFromFile2);

  return genOutput(internalStructure, format);
};

export default genDiff;
