import type { Meta, StoryObj } from "@storybook/vue";
import { WoodButtonElement } from ".";

type StoryComponent = typeof WoodButtonElement;

export default {
  title: "Components/Button Element",
  component: WoodButtonElement,
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "white" } },
} satisfies Meta<StoryComponent>;

export const Default: StoryObj<StoryComponent> = {
  render() {
    return {
      components: { WoodButtonElement },
      template: `<WoodButtonElement>Button</WoodButtonElement>`,
    };
  },
};
