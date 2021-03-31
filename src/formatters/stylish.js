import _ from 'lodash';

const getFormat = (value) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = _.keys(value);

  return keys.map((key) => {
    if (!_.isObject(value[key])) {
      return { name: key, nodeType: 'unknown', children: value[key] };
    }
    return { name: key, nodeType: 'unknown', children: getFormat(value[key]) };
  });
};

export default (diff) => {
  const iter = (data, depth) => data
    .flatMap((item) => {
      const {
        name, nodeType, value, value1, value2, children,
      } = item;
      const space = ' ';
      const defaultIndent = space.repeat(4);
      const defaultIndent2 = space.repeat(2);
      const indent1 = defaultIndent + space.repeat(depth * 4);
      const indent2 = defaultIndent2 + space.repeat(depth * 4);

      const chooseIndent = (v) => (Array.isArray(v) ? `{\n${iter(v, depth + 1).join('\n')}\n${indent1}}` : v);

      const format = (val) => chooseIndent(getFormat(val));

      switch (nodeType) {
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
            `${indent2}- ${name}: ${format(value1)}`,
            `${indent2}+ ${name}: ${format(value2)}`,
          ];
        default:
          throw new Error(`Unknown node type: ${nodeType}!`);
      }
    });
  return `{\n${iter(diff, 0).join('\n')}\n}`;
};
