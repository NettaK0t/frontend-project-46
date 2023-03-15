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

const genPlainOutput = (arrObjects) => {
  const output = arrObjects
    .filter(({ type }) => type !== 'unchanged')
    .map((obj) => {
      const makePlain = (node, route) => {
        const {
          key, children, value, valBefore, valAfter, type,
        } = node;
        const currPath = [...route, key];

        switch (type) {
          case 'unchanged':
            return '';
          case 'updated':
            return parseUpdatedObj(currPath, getValueType(valBefore), getValueType(valAfter), type);
          case 'removed':
            return `Property '${currPath.join('.')}' was ${type}`;
          case 'added':
            return _.isObject(value) ? `Property '${currPath.join('.')}' was ${type} with value: [complex value]` : `Property '${currPath.join('.')}' was ${type} with value: ${getValueType(value)}`;
          case 'nested':
            return children.map((child) => makePlain(child, currPath))
              .filter((child) => child !== '').join('\n');
          default:
            throw new Error('Error!');
        }
      };
      return makePlain(obj, []);
    });
  return output.join('\n');
};
export default genPlainOutput;
