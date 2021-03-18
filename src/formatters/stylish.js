import _ from 'lodash';

const getFormat = (value) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = _.keys(value);
  return keys.map((key) => {
    if (!_.isObject(value[key])) {
      return { name: key, status: 'unknown', children: value[key] };
    }
    return { name: key, status: 'unknown', children: getFormat(value[key]) };
  });
};

export default (diff) => {
  const iter = (data, depth) => data
    .flatMap((item) => {
      const {
        name, status, value, oldValue, newValue, children,
      } = item;
      const space = ' ';
      const defaultIndent = space.repeat(4);
      const defaultIndent2 = space.repeat(2);
      const indent = defaultIndent + space.repeat(depth * 4);
      const indent2 = defaultIndent2 + space.repeat(depth * 4);

      const chooseIndent = (v) => (_.isArray(v) ? `{\n${iter(v, depth + 1).join('\n')}\n}` : v);

      const formatValue = (val) => chooseIndent(getFormat(val));

      switch (status) {
        case 'added':
          return `${indent2}+ ${name}: ${formatValue(value)}`;
        case 'deleted':
          return `${indent2}- ${name}: ${formatValue(value)}`;
        case 'unmodified':
          return `${indent}${name}: ${formatValue(value)}`;
        case 'unknown':
          return `${indent}${name}: ${chooseIndent(children)}`;
        case 'modified':
          return [
            `${indent2}- ${name}: ${oldValue}`,
            `${indent2}- ${name}: ${newValue}`,
          ];
        default:
          throw new Error(`Unknown status: ${status}!`);
      }
    });
  return `{\n${iter(diff, 0).join('\n')}\n}`;
};
