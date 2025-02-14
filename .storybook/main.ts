import type { StorybookConfig } from "@storybook/vue-vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",

    // We only want to support typescript
    "../src/**/*.stories.@(ts|tsx)",
    "../src/**/stories.ts",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
};

export default config;
