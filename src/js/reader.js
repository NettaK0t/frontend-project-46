import fs from 'fs';
import path from 'path';
import parser from './parser.js';

const readFiles = (filePath1, filePath2) => [filePath1, filePath2].map((filePath) => {
  const fileFormat = path.extname(filePath);
  const strFromFile = fs.readFileSync(path.resolve(filePath), 'utf8');
  return parser(strFromFile, fileFormat);
});

export default readFiles;
