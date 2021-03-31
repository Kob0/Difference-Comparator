import _ from 'lodash';

const formatValue = (val) => {
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

      const newPath = `${path}.${name}`;

      switch (nodeType) {
        case 'added':
          return `Property '${newPath.slice(1)}' was added with value: ${formatValue(value)}`;
        case 'deleted':
          return `Property '${newPath.slice(1)}' was removed`;
        case 'unknown':
          return iter(children, newPath);
        case 'unmodified':
          return [];
        case 'modified':
          return `Property '${newPath.slice(1)}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`;
        default:
          return `Unknown node type: ${nodeType}!`;
      }
    });
  return iter(diff, '').join('\n');
};
