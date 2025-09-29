// TODO: refactor after migrating to eslint v9 with "eslint-plugin-local-rules" removal
module.exports = {
  'disallow-define-props-destructure': {
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow destructuring of defineProps result in script setup',
        recommended: false,
      },
      schema: [],
      messages: {
        noDestructure: "Destructuring defineProps's result is not allowed.",
      },
    },
    create(context) {
      return {
        VariableDeclarator(node) {
          if (
            node.id.type === 'ObjectPattern' &&
            node.init &&
            node.init.type === 'CallExpression' &&
            node.init.callee.name === 'defineProps'
          ) {
            context.report({
              node,
              messageId: 'noDestructure',
            });
          }
        },
      };
    },
  },
};
