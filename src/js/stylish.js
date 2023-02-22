import _ from 'lodash';

const parseObj = (obj, curIndent) => {
  if (!_.isObject(obj)) {
    return `${obj}`;
  }
  const lines = Object.entries(obj)
    .map(([key, val]) => `${curIndent}      ${key}: ${parseObj(val, `${curIndent}    `)}`);

  return [
    '{',
    ...lines,
    `  ${curIndent}}`,
  ].join('\n');
};

const toStr = (node, curIndent) => {
  const {
    value, valBefore, valAfter, type, key,
  } = node;
  switch (type) {
    case 'unchanged':
      return value ? `  ${key}: ${value}` : '  ';
    case 'changed':
      return _.isObject(valBefore) || _.isObject(valAfter)
        ? `- ${key}: ${parseObj(valBefore, curIndent)}\n${curIndent}+ ${key}: ${parseObj(valAfter, curIndent)}`
        : `- ${key}: ${valBefore}\n${curIndent}+ ${key}: ${valAfter}`;
    case 'deleted':
      return _.isObject(value) ? `- ${key}: ${parseObj(value, curIndent)}`
        : `- ${key}: ${value}`;
    default: return _.isObject(value) ? `+ ${key}: ${parseObj(value, curIndent)}`
      : `+ ${key}: ${value}`;
  }
};

const genOutput = (arrObjects, format, replacer = ' ', spacesCount = 2) => {
  const output = arrObjects.map((obj) => {
    const makeStylish = (node, depth) => {
      const { key, type, children } = node;
      const newDepth = type === 'unchanged' ? depth + 1 : depth;
      const indentSize = depth * spacesCount;
      const curIndent = replacer.repeat(indentSize);
      const bktIndent = replacer.repeat(newDepth * spacesCount);

      if (children.length === 0) {
        return `${curIndent}${toStr(node, curIndent)}`;
      }
      const childrenView = children.map((child) => makeStylish(child, newDepth + 1)).join('\n');
      return `${curIndent}${toStr(node, curIndent)}${key}: {\n${childrenView}\n${bktIndent}}`;
    };
    return makeStylish(obj, 1);
  });
  return `{\n${output.join('\n')}\n}`;
};

export default genOutput;
