module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  // 'standard-with-typescript',
  // "plugin:@typescript-eslint/recommended",
  extends: [
    'plugin:vue/vue3-essential',
    "plugin:@typescript-eslint/recommended",
    'prettier',
    'plugin:prettier/recommended'
  ],
  overrides: [
  ],
  /* 指定如何解析语法 */
  parser: "vue-eslint-parser", // 不加这个会影响一些svg的解析，比如
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue']
  },
  plugins: [
    'vue'
  ],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    "vue/multi-word-component-names":"off",
    "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间。
    "@typescript-eslint/explicit-function-return-type": "off", // 显式函数返回类型

  }
}
