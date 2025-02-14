import type { Meta, StoryObj } from "@storybook/vue";
import { WoodResponsiveSwitch } from ".";

type StoryComponent = typeof WoodResponsiveSwitch;

export default {
  title: "Components/Responsive Switch",
  component: WoodResponsiveSwitch,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "White",
    },
  },
} satisfies Meta<StoryComponent>;

export const Default = {
  render() {
    return {
      components: { WoodResponsiveSwitch },
      template: `
        <WoodResponsiveSwitch>
          <template #desktop>
            Desktop
          </template>
          
          <template #tablet>
            Tablet
          </template>
          
          <template #mobile>
            Mobile
          </template>
        </WoodResponsiveSwitch>
      `,
    };
  },
} satisfies StoryObj<StoryComponent>;

export const MobileAndDesktopFallbacks = {
  render() {
    return {
      components: { WoodResponsiveSwitch },
      template: `
        <WoodResponsiveSwitch>
          <template #desktop>
            Desktop
          </template>
          
          <template #mobile>
            Mobile / Tablet
          </template>
        </WoodResponsiveSwitch>
      `,
    };
  },
} satisfies StoryObj<StoryComponent>;

export const MobileAndTabletFallbacks = {
  render() {
    return {
      components: { WoodResponsiveSwitch },
      template: `
        <WoodResponsiveSwitch>
          <template #tablet>
            Tablet / Desktop
          </template>
          
          <template #mobile>
            Mobile
          </template>
        </WoodResponsiveSwitch>
      `,
    };
  },
} satisfies StoryObj<StoryComponent>;
