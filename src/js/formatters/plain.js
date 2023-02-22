import _ from 'lodash';

const getValueType = (value) => (_.isString(value) ? `'${value}'` : value);

const parseUpdatedObj = (curPath, valBefore, valAfter, type) => {
  if (_.isObject(valBefore)) {
    return `Property '${curPath.join('.')}' was ${type}. From [complex value] to ${valAfter}`;
  }
  if (_.isObject(valAfter)) {
    return `Property '${curPath.join('.')}' was ${type}. From ${valBefore} to [complex value]`;
  }
  return `Property '${curPath.join('.')}' was ${type}. From ${valBefore} to ${valAfter}`;
};

const toStr = (node, curPath) => {
  const {
    value, valBefore, valAfter, type,
  } = node;
  switch (type) {
    case 'unchanged':
      return '';
    case 'updated':
      return parseUpdatedObj(curPath, getValueType(valBefore), getValueType(valAfter), type);
    case 'removed':
      return `Property '${curPath.join('.')}' was ${type}`;
    default: return _.isObject(value) ? `Property '${curPath.join('.')}' was ${type} with value: [complex value]`
      : `Property '${curPath.join('.')}' was ${type} with value: ${getValueType(value)}`;
  }
};

const genPlainOutput = (arrObjects) => {
  const output = arrObjects.map((obj) => {
    const makePlain = (node, route) => {
      const { key, children } = node;
      const currentPath = [...route, key];
      if (children.length === 0) {
        return `${toStr(node, currentPath)}`;
      }
      return children.map((child) => makePlain(child, currentPath))
        .filter((child) => child !== '').join('\n');
    };
    return makePlain(obj, []);
  });
  return output.filter((str) => str !== '').join('\n');
};
export default genPlainOutput;
