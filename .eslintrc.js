module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-unused-vars": "off",
    'max-len': 'off',
    "vue/no-unused-components": "off",
    "linebreak-style": 0,
    "arrow-body-style": ["error", "as-needed"],
    "no-param-reassign": 0,
    "no-lonely-if": "off",
    "no-unused-expressions": "off",
    "no-use-before-define": "off",
    "array-callback-return": "off",
  },
};
