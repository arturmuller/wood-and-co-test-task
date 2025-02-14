import type { Preview } from "@storybook/vue";
import "../src/vars.css";
import "./style.css";

export default {
  parameters: {
    controls: {
      matchers: {
        date: /^date$/,
      },
    },
    backgrounds: {
      default: "Gradient",
      values: [
        {
          name: "White",
          value: "#ffffff",
        },
        {
          name: "Gradient",
          value: "linear-gradient(to right, #005F60, #0F3738) no-repeat",
        },
        {
          name: "LightGreen",
          value: "#d9e7e7",
        },
      ],
    },
  },
  decorators: [
    // Sets a default max-width on every story.
    (story) => {
      return {
        components: { story },
        template: '<div style="margin: 0 auto; max-width: 1060px"><story /></div>',
      };
    },
  ],
} satisfies Preview;
