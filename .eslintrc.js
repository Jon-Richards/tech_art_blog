const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  'env': {
    'browser': true,
    'node': true,
  },
  'parser': '@typescript-eslint/parser',
  'extends': [
    'eslint:recommended',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  'rules': {
    'linebreak-style': [OFF],
    'valid-jsdoc': [ERROR, {
      'requireReturn': true,
      'requireReturnDescription': true,
      'requireReturnType': false,
      'requireParamDescription': true,
      'requireParamType': false,
      'prefer': {
        'return': 'returns',
      },
    }],
  },
};
