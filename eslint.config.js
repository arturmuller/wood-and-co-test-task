import vue from "eslint-plugin-vue";
import js from "@eslint/js";
import ts from "typescript-eslint";

export default ts.config(
  js.configs["recommended"],
  ...ts.configs.recommended,
  ...vue.configs["flat/vue2-recommended"],
  {
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },

    rules: {
      "vue/attribute-hyphenation": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/multiline-html-element-content-newline": "off",
      "vue/max-attributes-per-line": "off",
      "vue/html-indent": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/require-default-prop": "off",
      "vue/html-self-closing": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
);
