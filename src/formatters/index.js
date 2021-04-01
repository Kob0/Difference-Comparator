import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (diff, outputFormat = 'stylish') => {
  switch (outputFormat) {
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error(`Unknown output format ${outputFormat}!`);
  }
};
