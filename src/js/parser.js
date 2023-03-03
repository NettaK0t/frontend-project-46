import yaml from 'js-yaml';

const parser = (strFromFile, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(strFromFile);
    case '.yaml':
    case '.yml':
      return yaml.load(strFromFile);
    default:
      throw new Error('Error. Please enter correct format name');
  }
};

export default parser;
