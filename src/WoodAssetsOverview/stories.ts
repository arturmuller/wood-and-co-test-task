import type { Meta, StoryObj } from "@storybook/vue";
import { WoodAssetsOverview } from ".";

type StoryComponent = typeof WoodAssetsOverview;

export default {
  title: "Components/Assets Overview ",
  component: WoodAssetsOverview,
  args: {
    items: dummyAssetOverviewData(),
  },
  tags: ["autodocs"],
} satisfies Meta<StoryComponent>;

function dummyAssetOverviewData() {
  return [
    {
      label: "Celková hodnota majetku",
      value: "60 413,73 CZK",
      informationText: { title: "Here will be title 0", value: "Here will be value 0" },
    },
    {
      label: "Peníze na účtu",
      value: "60 024 413,73 CZK",
      informationText: { title: "Here will be title 5", value: "Here will be value 5" },
    },
    {
      label: "Celkový zisk",
      value: "60 024 413,73 CZK",
      informationText: { title: "Here will be title 1", value: "Here will be value 1" },
    },
    {
      label: "Čistý vklad",
      value: "60 024 413,73 CZK",
      informationText: { title: "Here will be title 2", value: "Here will be value 2" },
    },
    {
      label: "Nerealizovany zisk",
      value: "-84 448 457,04 CZK",
      informationText: { title: "Here will be title 3", value: "Here will be value 3" },
    },
    {
      label: "Realizovany zisk",
      value: "60 749 024 413,73 CZK",
      informationText: { title: "Here will be title 4", value: "Here will be value 4" },
    },
    {
      label: "test text",
      value: "60 749 024 413,73 CZK",
      informationText: { title: "test title", value: "test value" },
    },
  ];
}

function fourItems() {
  return [
    {
      label: "Celková hodnota majetku",
      value: "2 025 179 402,18 CZK",
      informationText: { title: "Here will be title 0", value: "Here will be value 0" },
    },
    {
      label: "Peníze na účtu",
      value: "456 678,23 CZK",
      informationText: { title: "Here will be title 5", value: "Here will be value 5" },
    },
    {
      label: "Celkový zisk",
      value: "2 025 179 402,18 CZK",
      informationText: { title: "Here will be title 1", value: "Here will be value 1" },
    },
    {
      label: "Čistý vklad",
      value: "2 025 179 402,18 CZK",
      informationText: { title: "Here will be title 2", value: "Here will be value 2" },
    },
  ];
}

function threeItems() {
  return [
    {
      label: "Celková hodnota majetku",
      value: "2 025 179 402,18 CZK",
      informationText: { title: "Here will be title 0", value: "Here will be value 0" },
    },
    {
      label: "Peníze na účtu",
      value: "456 678,23 CZK",
      informationText: { title: "Here will be title 5", value: "Here will be value 5" },
    },
    {
      label: "Celkový zisk",
      value: "2 025 179 402,18 CZK",
      informationText: { title: "Here will be title 1", value: "Here will be value 1" },
    },
  ];
}

function twoItems() {
  return [
    {
      label: "Celková hodnota majetku",
      value: "2 025 179 402,18 CZK",
      informationText: { title: "Here will be title 0", value: "Here will be value 0" },
    },
    {
      label: "Peníze na účtu",
      value: "456 678,23 CZK",
      informationText: { title: "Here will be title 5", value: "Here will be value 5" },
    },
  ];
}

export const Default: StoryObj<StoryComponent> = {
  args: {
    items: dummyAssetOverviewData(),
  },
};

export const FourItems: StoryObj<StoryComponent> = {
  args: {
    items: fourItems(),
  },
};

export const ThreeItems: StoryObj<StoryComponent> = {
  args: {
    items: threeItems(),
  },
};

export const TwoItems: StoryObj<StoryComponent> = {
  args: {
    items: twoItems(),
  },
};
