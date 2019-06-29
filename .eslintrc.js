module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  "rules": {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi': 0,
    'no-useless-constructor': 0,
    'space-before-blocks': 0,
    'space-before-function-paren': 0,
    'padded-blocks': 0,
    'no-multi-spaces': 0,
    'keyword-spacing': 0,
    'no-extra-parens ': 0,
    'no-trailing-spaces': 0
  }
};
