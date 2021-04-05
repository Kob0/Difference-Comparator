import _ from 'lodash';

const spacesCount = 4;
const nodeKeyOffset = 2;
const indentSymbol = ' ';
const openSymbol = '{';
const closeSymbol = '}';

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const indentSize = depth * spacesCount;
  const keyIndent = indentSymbol.repeat(indentSize);
  const bracketIndent = indentSymbol.repeat(indentSize - spacesCount);
  const lines = Object.entries(value)
    .flatMap(([key, val]) => `${keyIndent}${key}: ${stringify(val, depth + 1)}`);

  return [
    openSymbol,
    ...lines,
    `${bracketIndent}${closeSymbol}`,
  ].join('\n');
};

const formatStylish = (diffTree) => {
  const iter = (tree, depth) => {
    const indentSize = depth * spacesCount;
    const keyIndent = indentSymbol.repeat(indentSize - nodeKeyOffset);
    const bracketIndent = indentSymbol.repeat(indentSize - spacesCount);
    const lines = tree.flatMap((item) => {
      const {
        name, value, nodeType, children, value1, value2,
      } = item;

      switch (nodeType) {
        case 'added':
          return [`${keyIndent}+ ${name}: ${stringify(value, depth + 1)}`];
        case 'deleted':
          return [`${keyIndent}- ${name}: ${stringify(value, depth + 1)}`];
        case 'unknown':
          return [`${keyIndent}  ${name}: ${iter(children, depth + 1)}`];
        case 'unmodified':
          return [`${keyIndent}  ${name}: ${stringify(value, depth + 1)}`];
        case 'modified':
          return [
            `${keyIndent}- ${name}: ${stringify(value1, depth + 1)}`,
            `${keyIndent}+ ${name}: ${stringify(value2, depth + 1)}`,
          ];
        default:
          throw new Error(`Unknown nodeType: ${nodeType}!`);
      }
    });
    return [openSymbol, ...lines, `${bracketIndent}${closeSymbol}`].join('\n');
  };
  return iter(diffTree, 1);
};

export default formatStylish;
