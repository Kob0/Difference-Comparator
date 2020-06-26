import { test, expected } from '@jest/globals';
import getDiff from '../src/index.js';

let result;

beforeEach(() => {
  result = [
    '{',
    '    host: hexlet.io',
    '  + timeout: 20',
    '  - timeout: 50',
    '  - proxy: 123.234.53.22',
    '  - follow: false',
    '  + verbose: true',
    '}'].join('\n');
});
