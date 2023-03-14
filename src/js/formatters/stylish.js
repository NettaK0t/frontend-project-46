import _ from 'lodash';

const parseObj = (obj, curIndent) => {
  if (!_.isObject(obj)) {
    return `${obj}`;
  }
  const lines = Object.entries(obj).map(([key, val]) => `${curIndent}      ${key}: ${parseObj(val, `${curIndent}    `)}`);

  return ['{', ...lines, `  ${curIndent}}`].join('\n');
};

const genStylishOutput = (arrObjects, replacer = ' ', spacesCount = 2) => {
  const output = arrObjects.map((obj) => {
    const makeStylish = (node, depth) => {
      const {
        value, valBefore, valAfter, type, key, children,
      } = node;
      const newDepth = type === 'nested' ? depth + 1 : depth;
      const indentSize = depth * spacesCount;
      const curIndent = replacer.repeat(indentSize);
      const bktIndent = replacer.repeat(newDepth * spacesCount);

      const val = (v) => parseObj(v, curIndent);
      switch (type) {
        case 'nested':
          return `${curIndent}  ${key}: {\n${children.map((child) => makeStylish(child, newDepth + 1)).join('\n')}\n${bktIndent}}`;
        case 'unchanged':
          return `${curIndent}  ${key}: ${value}`;
        case 'updated':
          return `${curIndent}- ${key}: ${val(valBefore)}\n${curIndent}+ ${key}: ${val(valAfter)}`;
        case 'removed':
          return `${curIndent}- ${key}: ${val(value)}`;
        case 'added':
          return `${curIndent}+ ${key}: ${val(value)}`;
        default:
          throw new Error('Error!');
      }
    };
    return makeStylish(obj, 1);
  });

  return `{\n${output.join('\n')}\n}`;
};

export default genStylishOutput;
