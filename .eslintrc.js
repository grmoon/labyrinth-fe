const devRules = {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off'
};

const prodRules = {

};

const rules = process.NODE_ENV === 'production' ? prodRules : devRules;

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/strongly-recommended'
    ],
    rules
}