import fs from 'fs';
import path from 'path';
import parser from './parser.js';

const readFiles = (...filePaths) => filePaths.map((filePath) => {
  const fileFormat = path.extname(filePath);
  const strFromFile = fs.readFileSync(path.resolve(filePath), 'utf8');
  return parser(strFromFile, fileFormat);
});

export default readFiles;
