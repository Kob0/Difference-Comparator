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
      const indent1 = defaultIndent + space.repeat(depth * 4);
      const indent2 = defaultIndent2 + space.repeat(depth * 4);

      const chooseIndent = (v) => (Array.isArray(v) ? `{\n${iter(v, depth + 1).join('\n')}\n${indent1}}` : v);

      const format = (val) => chooseIndent(getFormat(val));

      switch (status) {
        case 'added':
          return `${indent2}+ ${name}: ${format(value)}`;
        case 'deleted':
          return `${indent2}- ${name}: ${format(value)}`;
        case 'unknown':
          return `${indent1}${name}: ${chooseIndent(children)}`;
        case 'unmodified':
          return `${indent1}${name}: ${format(value)}`;
        case 'modified':
          return [
            `${indent2}- ${name}: ${format(oldValue)}`,
            `${indent2}+ ${name}: ${format(newValue)}`,
          ];
        default:
          throw new Error(`Unknown status: ${status}!`);
      }
    });
  return `{\n${iter(diff, 0).join('\n')}\n}`;
};
