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
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(readFile('expected_file.txt'));

  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), 'stylish')).toEqual(readFile('expected_file.txt'));

  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'stylish')).toEqual(readFile('expected_file.txt'));

  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish')).toEqual(readFile('expected_file.txt'));

  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.json'), 'stylish')).toEqual(readFile('expected_file.txt'));

  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'stylish')).toEqual(readFile('expected_file.txt'));

  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(readFile('expected_file.txt'));

  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.json'), 'stylish')).toEqual(readFile('expected_file.txt'));

  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'stylish')).toEqual(readFile('expected_file.txt'));
  
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(null);

});

test('parser', () => {
  const jsonData = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  expect(parser(readFile('file1.yaml'), '.yaml')).toEqual(jsonData);
});

