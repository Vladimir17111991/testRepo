const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const toLintAliases = () => {
  const content = readFileSync(resolve('./aliases.json'), 'utf8');
  const { alias, extensions } = JSON.parse(content);

  return {
    map: Object.entries(alias),
    extensions,
  };
};

module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['local-rules'],
  // !Add variable in vue-shim.d.ts too!
  rules: {
    'import/no-unresolved': [
      'error',
      {
        ignore: ['\\.svg\\?(meta|url|raw|component|skipsvgo)', '\\.*\\?url'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        json: 'never',
        // vue: 'never',
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: '{,**/}{consts,helpers,services}/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '{,**/}{components,new-components}/**',
            group: 'internal',
            position: 'before',
          },
        ],
        distinctGroup: true,
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'no-console': ['error'],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsForRegex: ['^accu?m?(ulator)?$'],
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    // Disable multi-word component names.
    'vue/multi-word-component-names': 'off',
    'vue/order-in-components': 'error',
    // Additional rules for promises.
    'promise/prefer-await-to-callbacks': 'warn',
    'promise/prefer-await-to-then': 'warn',
    'vue/require-explicit-emits': 'error',
    'vue/v-on-event-hyphenation': 'error',
    'vue/no-setup-props-reactivity-loss': 'error',
    'vue/no-ref-as-operand': 'error',
    'vue/no-lifecycle-after-await': 'error',
    'vue/no-v-for-template-key': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'vue/define-emits-declaration': ['error'],
    'vue/define-props-declaration': ['error'],
    'local-rules/disallow-define-props-destructure': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      rules: {
        'no-undef': 'off',
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            ts: 'never',
            // json: 'never',
            // vue: 'never',
          },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: toLintAliases(),
    },
  },
};
