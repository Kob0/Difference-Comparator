import _ from 'lodash';

const stringify = (value, spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }
    const space = ' ';
    const indentSize = depth * spacesCount;
    const currentIndent = space.repeat(indentSize);
    const bracketIndent = space.repeat(indentSize - spacesCount);
    const lines = Object.entries(currentValue).map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(value, 1);
};

export default (diff, spacesCount = 4) => {
  const iter = (data, depth) => {
    const space = ' ';
    const displacementSize = 2;
    const indentSize = depth * spacesCount;
    const keyIndent = space.repeat(indentSize - displacementSize);
    const bracketIndent = space.repeat(indentSize - spacesCount);
    const lines = data.flatMap((item) => {
      const {
        name, value, nodeType, children, value1, value2,
      } = item;

      switch (nodeType) {
        case 'added':
          return `${keyIndent}+ ${name}: ${stringify(value)}`;
        case 'deleted':
          return `${keyIndent}- ${name}: ${stringify(value)}`;
        case 'unknown':
          return `${keyIndent}  ${name}: ${iter(children, depth + 1)}`;
        case 'unmodified':
          return `${keyIndent}  ${name}: ${stringify(value)}`;
        case 'modified':
          return [
            `${keyIndent}- ${name}: ${stringify(value1)}`,
            `${keyIndent}+ ${name}: ${stringify(value2)}`,
          ];
        default:
          throw new Error(`Unknown nodeType: ${nodeType}!`);
      }
    });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(diff, 1);
};
