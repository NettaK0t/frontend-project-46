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
import genJsonOutput from '../src/js/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const internalStructure = [
  {
    key: 'common',
    type: 'nested',
    value: {},
    valBefore: {},
    valAfter: {},
    children: [
      {
        key: 'follow',
        type: 'added',
        value: false,
        valBefore: {},
        valAfter: {},
        children: [],
      },
      {
        key: 'setting1',
        type: 'unchanged',
        value: 'Value 1',
        valBefore: {},
        valAfter: {},
        children: [],
      },
      {
        key: 'setting2',
        type: 'removed',
        value: 200,
        valBefore: {},
        valAfter: {},
        children: [],
      },
      {
        key: 'setting3',
        type: 'updated',
        value: {},
        valBefore: true,
        valAfter: null,
        children: [],
      },
      {
        key: 'setting4',
        type: 'added',
        value: 'blah blah',
        valBefore: {},
        valAfter: {},
        children: [],
      },
      {
        key: 'setting5',
        type: 'added',
        value: { key5: 'value5' },
        valBefore: {},
        valAfter: {},
        children: [],
      },
      {
        key: 'setting6',
        type: 'nested',
        value: {},
        valBefore: {},
        valAfter: {},
        children: [
          {
            key: 'doge',
            type: 'nested',
            value: {},
            valBefore: {},
            valAfter: {},
            children: [
              {
                key: 'wow',
                type: 'updated',
                value: {},
                valBefore: '',
                valAfter: 'so much',
                children: [],
              },
            ],
          },
          {
            key: 'key',
            type: 'unchanged',
            value: 'value',
            valBefore: {},
            valAfter: {},
            children: [],
          },
          {
            key: 'ops',
            type: 'added',
            value: 'vops',
            valBefore: {},
            valAfter: {},
            children: [],
          },
        ],
      },
    ],
  },
  {
    key: 'group1',
    type: 'nested',
    value: {},
    valBefore: {},
    valAfter: {},
    children: [
      {
        key: 'baz',
        type: 'updated',
        value: {},
        valBefore: 'bas',
        valAfter: 'bars',
        children: [],
      },
      {
        key: 'foo',
        type: 'unchanged',
        value: 'bar',
        valBefore: {},
        valAfter: {},
        children: [],
      },
      {
        key: 'nest',
        type: 'updated',
        value: {},
        valBefore: { key: 'value' },
        valAfter: 'str',
        children: [],
      },
    ],
  },
  {
    key: 'group2',
    type: 'removed',
    value: { abc: 12345, deep: { id: 45 } },
    valBefore: {},
    valAfter: {},
    children: [],
  },
  {
    key: 'group3',
    type: 'added',
    value: { deep: { id: { number: 45 } }, fee: 100500 },
    valBefore: {},
    valAfter: {},
    children: [],
  },
];

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
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(readFile('expected_JSON_result.json'));
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), 'json')).toEqual(readFile('expected_JSON_result.json'));
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'json')).toEqual(readFile('expected_JSON_result.json'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json')).toEqual(readFile('expected_JSON_result.json'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.json'), 'json')).toEqual(readFile('expected_JSON_result.json'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'json')).toEqual(readFile('expected_JSON_result.json'));
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toEqual(readFile('expected_JSON_result.json'));
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.json'), 'json')).toEqual(readFile('expected_JSON_result.json'));
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'json')).toEqual(readFile('expected_JSON_result.json'));
  expect(genDiff(getFixturePath('file2.json'), getFixturePath('file1.json'), 'json')).toEqual(readFile('expected_JSON_result2.json'));
  expect(genDiff(getFixturePath('file2.json'), getFixturePath('file1.yaml'), 'json')).toEqual(readFile('expected_JSON_result2.json'));
  expect(genDiff(getFixturePath('file2.json'), getFixturePath('file1.yml'), 'json')).toEqual(readFile('expected_JSON_result2.json'));
  expect(genDiff(getFixturePath('file2.yaml'), getFixturePath('file1.yaml'), 'json')).toEqual(readFile('expected_JSON_result2.json'));
  expect(genDiff(getFixturePath('file2.yaml'), getFixturePath('file1.json'), 'json')).toEqual(readFile('expected_JSON_result2.json'));
  expect(genDiff(getFixturePath('file2.yaml'), getFixturePath('file1.yml'), 'json')).toEqual(readFile('expected_JSON_result2.json'));
  expect(genDiff(getFixturePath('file2.yml'), getFixturePath('file1.yml'), 'json')).toEqual(readFile('expected_JSON_result2.json'));
  expect(genDiff(getFixturePath('file2.yml'), getFixturePath('file1.json'), 'json')).toEqual(readFile('expected_JSON_result2.json'));
  expect(genDiff(getFixturePath('file2.yml'), getFixturePath('file1.yaml'), 'json')).toEqual(readFile('expected_JSON_result2.json'));
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
  expect(genOutput(internalStructure, 'stylish')).toEqual(readFile('expected_result1.txt'));
  expect(genOutput(internalStructure, 'plain')).toEqual(readFile('expected_result3.txt'));
  expect(genOutput(internalStructure, 'json')).toEqual(readFile('expected_JSON_result.json'));
});

test('generate stylish output', () => {
  expect(genStylishOutput(internalStructure)).toEqual(readFile('expected_result1.txt'));
});

test('generate plain output', () => {
  expect(genPlainOutput(internalStructure)).toEqual(readFile('expected_result3.txt'));
});

test('generate JSON output', () => {
  expect(genJsonOutput(internalStructure)).toEqual(readFile('expected_JSON_result.json'));
});

test('reader', () => {
  const arrOfObjects = [
    {
      common: {
        setting1: 'Value 1',
        setting2: 200,
        setting3: true,
        setting6: { key: 'value', doge: { wow: '' } },
      },
      group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
      group2: { abc: 12345, deep: { id: 45 } },
    },
    {
      common: {
        follow: false,
        setting1: 'Value 1',
        setting3: null,
        setting4: 'blah blah',
        setting5: { key5: 'value5' },
        setting6: { key: 'value', ops: 'vops', doge: { wow: 'so much' } },
      },
      group1: { foo: 'bar', baz: 'bars', nest: 'str' },
      group3: { deep: { id: { number: 45 } }, fee: 100500 },
    },
  ];
  expect(readFiles(getFixturePath('file1.json'), getFixturePath('file2.json'))).toMatchObject(arrOfObjects);
});
