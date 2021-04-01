import _ from 'lodash';

const stringify = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return val;
};

export default (diff) => {
  const iter = (data, path) => data
    .flatMap((item) => {
      const {
        name, nodeType, value, children, value1, value2,
      } = item;

      const newPath = [...path, name];
      const fullPath = newPath.join('.');

      switch (nodeType) {
        case 'added':
          return `Property '${fullPath}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${fullPath}' was removed`;
        case 'unknown':
          return iter(children, newPath);
        case 'unmodified':
          return [];
        case 'modified':
          return `Property '${fullPath}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        default:
          throw new Error(`Unknown node type: ${nodeType}!`);
      }
    });
  return iter(diff, '').join('\n');
};
