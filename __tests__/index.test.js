import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/js/index.js';
import parser from '../src/js/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff between files', () => {
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
  expect(parser(readFile('file1.yaml'), '.yaml')).toEqual(jsonData);
});
