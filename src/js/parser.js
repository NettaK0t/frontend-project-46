import yaml from 'js-yaml';

const parser = (strFromFile, format) => {
  if (format === '.json') {
    return JSON.parse(strFromFile);
  }
  return yaml.load(strFromFile);
};

export default parser;
