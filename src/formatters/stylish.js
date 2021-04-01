import _ from 'lodash';

const stringify = (value) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = _.keys(value);

  return keys.map((key) => {
    if (!_.isObject(value[key])) {
      return { name: key, nodeType: 'unknown', children: value[key] };
    }
    return { name: key, nodeType: 'unknown', children: stringify(value[key]) };
  });
};

export default (diff) => {
  const iter = (data, depth) => data
    .flatMap((item) => {
      const {
        name, nodeType, value, value1, value2, children,
      } = item;
      const space = ' ';
      const initialIndentSize = 4;
      const indentSize = 2;
      const defaultIndent = space.repeat(initialIndentSize);
      const defaultIndent2 = space.repeat(indentSize);
      const indent1 = defaultIndent + space.repeat(depth * initialIndentSize);
      const indent2 = defaultIndent2 + space.repeat(depth * initialIndentSize);

      const chooseIndent = (v) => (Array.isArray(v) ? `{\n${iter(v, depth + 1).join('\n')}\n${indent1}}` : v);

      const format = (val) => chooseIndent(stringify(val));

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
