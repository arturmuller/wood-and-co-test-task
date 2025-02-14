<script lang="ts">
import { PropType } from "vue";
import { AssetOverviewItem } from "../utils/types";
import { WoodResponsiveSwitch } from "../WoodResponsiveSwitch";
import WoodAssetsOverviewDesktopView from "./WoodAssetsOverviewDesktopView.vue";
import WoodAssetsOverviewCardView from "./WoodAssetsOverviewMobileView.vue";

/**
 * TODO: Component description...
 */
export default {
  name: "WoodAssetsOverviewCard",
  components: {
    WoodResponsiveSwitch,
    WoodAssetsOverviewDesktopView,
    WoodAssetsOverviewCardView,
  },

  props: {
    items: {
      type: Array as PropType<Array<AssetOverviewItem>>,
      required: true,
    },
  },
};
</script>

<template>
  <WoodResponsiveSwitch>
    <template #mobile>
      <WoodAssetsOverviewCardView v-bind="$props" />
    </template>

    <template #desktop>
      <WoodAssetsOverviewDesktopView v-bind="$props" />
    </template>
  </WoodResponsiveSwitch>
</template>
