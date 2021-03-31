import _ from 'lodash';

const makeDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { name: key, nodeType: 'added', value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { name: key, nodeType: 'deleted', value: obj1[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { name: key, nodeType: 'unknown', children: makeDiff(obj1[key], obj2[key]) };
    }
    if (obj1[key] === obj2[key]) {
      return { name: key, nodeType: 'unmodified', value: obj1[key] };
    }
    return {
      name: key, nodeType: 'modified', value1: obj1[key], value2: obj2[key],
    };
  });
};

export default makeDiff;
