import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/js/index.js';
import parser from '../src/js/parser.js';
import genOutput from '../src/js/formatters/index.js';
import genStylishOutput from '../src/js/formatters/stylish.js';
import genPlainOutput from '../src/js/formatters/plain.js';
import readFiles from '../src/js/reader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('generate differences between files', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(readFile('expected_result1.txt'));
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), 'stylish')).toEqual(readFile('expected_result1.txt'));
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'stylish')).toEqual(readFile('expected_result1.txt'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish')).toEqual(readFile('expected_result1.txt'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.json'), 'stylish')).toEqual(readFile('expected_result1.txt'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'stylish')).toEqual(readFile('expected_result1.txt'));
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(readFile('expected_result1.txt'));
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.json'), 'stylish')).toEqual(readFile('expected_result1.txt'));
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'stylish')).toEqual(readFile('expected_result1.txt'));
  expect(genDiff(getFixturePath('file2.json'), getFixturePath('file1.json'), 'stylish')).toEqual(readFile('expected_result2.txt'));
  expect(genDiff(getFixturePath('file2.json'), getFixturePath('file1.yaml'), 'stylish')).toEqual(readFile('expected_result2.txt'));
  expect(genDiff(getFixturePath('file2.json'), getFixturePath('file1.yml'), 'stylish')).toEqual(readFile('expected_result2.txt'));
  expect(genDiff(getFixturePath('file2.yaml'), getFixturePath('file1.yaml'), 'stylish')).toEqual(readFile('expected_result2.txt'));
  expect(genDiff(getFixturePath('file2.yaml'), getFixturePath('file1.json'), 'stylish')).toEqual(readFile('expected_result2.txt'));
  expect(genDiff(getFixturePath('file2.yaml'), getFixturePath('file1.yml'), 'stylish')).toEqual(readFile('expected_result2.txt'));
  expect(genDiff(getFixturePath('file2.yml'), getFixturePath('file1.yml'), 'stylish')).toEqual(readFile('expected_result2.txt'));
  expect(genDiff(getFixturePath('file2.yml'), getFixturePath('file1.json'), 'stylish')).toEqual(readFile('expected_result2.txt'));
  expect(genDiff(getFixturePath('file2.yml'), getFixturePath('file1.yaml'), 'stylish')).toEqual(readFile('expected_result2.txt'));
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(readFile('expected_result3.txt'));
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), 'plain')).toEqual(readFile('expected_result3.txt'));
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'plain')).toEqual(readFile('expected_result3.txt'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain')).toEqual(readFile('expected_result3.txt'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.json'), 'plain')).toEqual(readFile('expected_result3.txt'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'plain')).toEqual(readFile('expected_result3.txt'));
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(readFile('expected_result3.txt'));
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.json'), 'plain')).toEqual(readFile('expected_result3.txt'));
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'plain')).toEqual(readFile('expected_result3.txt'));
  expect(genDiff(getFixturePath('file2.json'), getFixturePath('file1.json'), 'plain')).toEqual(readFile('expected_result4.txt'));
  expect(genDiff(getFixturePath('file2.json'), getFixturePath('file1.yaml'), 'plain')).toEqual(readFile('expected_result4.txt'));
  expect(genDiff(getFixturePath('file2.json'), getFixturePath('file1.yml'), 'plain')).toEqual(readFile('expected_result4.txt'));
  expect(genDiff(getFixturePath('file2.yaml'), getFixturePath('file1.yaml'), 'plain')).toEqual(readFile('expected_result4.txt'));
  expect(genDiff(getFixturePath('file2.yaml'), getFixturePath('file1.json'), 'plain')).toEqual(readFile('expected_result4.txt'));
  expect(genDiff(getFixturePath('file2.yaml'), getFixturePath('file1.yml'), 'plain')).toEqual(readFile('expected_result4.txt'));
  expect(genDiff(getFixturePath('file2.yml'), getFixturePath('file1.yml'), 'plain')).toEqual(readFile('expected_result4.txt'));
  expect(genDiff(getFixturePath('file2.yml'), getFixturePath('file1.json'), 'plain')).toEqual(readFile('expected_result4.txt'));
  expect(genDiff(getFixturePath('file2.yml'), getFixturePath('file1.yaml'), 'plain')).toEqual(readFile('expected_result4.txt'));
});

test('parser', () => {
  const jsonData = {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: 'value',
        doge: {
          wow: '',
        },
      },
    },
    group1: {
      baz: 'bas',
      foo: 'bar',
      nest: {
        key: 'value',
      },
    },
    group2: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  };
  expect(parser(readFile('file1.json'), '.json')).toMatchObject(jsonData);
  expect(parser(readFile('file1.yaml'), '.yaml')).toMatchObject(jsonData);
});

test('generate output', () => {
  const internalStructure = [{
    key: 'common',
    type: 'unchanged',
    children: [{
      key: 'follow', value: false, type: 'added', children: [],
    }, {
      key: 'setting1', value: 'Value 1', type: 'unchanged', children: [],
    }, {
      key: 'setting2', value: 200, type: 'removed', children: [],
    }, {
      key: 'setting3', valBefore: true, valAfter: null, type: 'updated', children: [],
    }, {
      key: 'setting4', value: 'blah blah', type: 'added', children: [],
    }, {
      key: 'setting5', value: { key5: 'value5' }, type: 'added', children: [],
    }, {
      key: 'setting6',
      type: 'unchanged',
      children: [{
        key: 'doge',
        type: 'unchanged',
        children: [{
          key: 'wow', valBefore: '', valAfter: 'so much', type: 'updated', children: [],
        }],
      }, {
        key: 'key', value: 'value', type: 'unchanged', children: [],
      }, {
        key: 'ops', value: 'vops', type: 'added', children: [],
      }],
    }],
  }, {
    key: 'group1',
    type: 'unchanged',
    children: [{
      key: 'baz', valBefore: 'bas', valAfter: 'bars', type: 'updated', children: [],
    }, {
      key: 'foo', value: 'bar', type: 'unchanged', children: [],
    }, {
      key: 'nest', valBefore: { key: 'value' }, valAfter: 'str', type: 'updated', children: [],
    }],
  }, {
    key: 'group2', value: { abc: 12345, deep: { id: 45 } }, type: 'removed', children: [],
  }, {
    key: 'group3', value: { deep: { id: { number: 45 } }, fee: 100500 }, type: 'added', children: [],
  }];

  expect(genOutput(internalStructure, 'stylish')).toEqual(readFile('expected_result1.txt'));
  expect(genOutput(internalStructure, 'plain')).toEqual(readFile('expected_result3.txt'));
  expect(genOutput(internalStructure, 'jpeg')).toBe('Error. Please, enter correct format name.');
});

test('generate stylish output', () => {
  const internalStructure = [{
    key: 'common',
    type: 'unchanged',
    children: [{
      key: 'follow', value: false, type: 'added', children: [],
    }, {
      key: 'setting1', value: 'Value 1', type: 'unchanged', children: [],
    }, {
      key: 'setting2', value: 200, type: 'removed', children: [],
    }, {
      key: 'setting3', valBefore: true, valAfter: null, type: 'updated', children: [],
    }, {
      key: 'setting4', value: 'blah blah', type: 'added', children: [],
    }, {
      key: 'setting5', value: { key5: 'value5' }, type: 'added', children: [],
    }, {
      key: 'setting6',
      type: 'unchanged',
      children: [{
        key: 'doge',
        type: 'unchanged',
        children: [{
          key: 'wow', valBefore: '', valAfter: 'so much', type: 'updated', children: [],
        }],
      }, {
        key: 'key', value: 'value', type: 'unchanged', children: [],
      }, {
        key: 'ops', value: 'vops', type: 'added', children: [],
      }],
    }],
  }, {
    key: 'group1',
    type: 'unchanged',
    children: [{
      key: 'baz', valBefore: 'bas', valAfter: 'bars', type: 'updated', children: [],
    }, {
      key: 'foo', value: 'bar', type: 'unchanged', children: [],
    }, {
      key: 'nest', valBefore: { key: 'value' }, valAfter: 'str', type: 'updated', children: [],
    }],
  }, {
    key: 'group2', value: { abc: 12345, deep: { id: 45 } }, type: 'removed', children: [],
  }, {
    key: 'group3', value: { deep: { id: { number: 45 } }, fee: 100500 }, type: 'added', children: [],
  }];

  expect(genStylishOutput(internalStructure)).toEqual(readFile('expected_result1.txt'));
});

test('generate plain output', () => {
  const internalStructure = [{
    key: 'common',
    type: 'unchanged',
    children: [{
      key: 'follow', value: false, type: 'added', children: [],
    }, {
      key: 'setting1', value: 'Value 1', type: 'unchanged', children: [],
    }, {
      key: 'setting2', value: 200, type: 'removed', children: [],
    }, {
      key: 'setting3', valBefore: true, valAfter: null, type: 'updated', children: [],
    }, {
      key: 'setting4', value: 'blah blah', type: 'added', children: [],
    }, {
      key: 'setting5', value: { key5: 'value5' }, type: 'added', children: [],
    }, {
      key: 'setting6',
      type: 'unchanged',
      children: [{
        key: 'doge',
        type: 'unchanged',
        children: [{
          key: 'wow', valBefore: '', valAfter: 'so much', type: 'updated', children: [],
        }],
      }, {
        key: 'key', value: 'value', type: 'unchanged', children: [],
      }, {
        key: 'ops', value: 'vops', type: 'added', children: [],
      }],
    }],
  }, {
    key: 'group1',
    type: 'unchanged',
    children: [{
      key: 'baz', valBefore: 'bas', valAfter: 'bars', type: 'updated', children: [],
    }, {
      key: 'foo', value: 'bar', type: 'unchanged', children: [],
    }, {
      key: 'nest', valBefore: { key: 'value' }, valAfter: 'str', type: 'updated', children: [],
    }],
  }, {
    key: 'group2', value: { abc: 12345, deep: { id: 45 } }, type: 'removed', children: [],
  }, {
    key: 'group3', value: { deep: { id: { number: 45 } }, fee: 100500 }, type: 'added', children: [],
  }];

  expect(genPlainOutput(internalStructure)).toEqual(readFile('expected_result3.txt'));
});

test('reader', () => {
  const arrOfObjects = [{
    common: {
      setting1: 'Value 1', setting2: 200, setting3: true, setting6: { key: 'value', doge: { wow: '' } },
    },
    group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
    group2: { abc: 12345, deep: { id: 45 } },
  }, {
    common: {
      follow: false, setting1: 'Value 1', setting3: null, setting4: 'blah blah', setting5: { key5: 'value5' }, setting6: { key: 'value', ops: 'vops', doge: { wow: 'so much' } },
    },
    group1: { foo: 'bar', baz: 'bars', nest: 'str' },
    group3: { deep: { id: { number: 45 } }, fee: 100500 },
  }];
  expect(readFiles(getFixturePath('file1.json'), getFixturePath('file2.json'))).toMatchObject(arrOfObjects);
});
