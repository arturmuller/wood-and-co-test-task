<script lang="ts">
import { PropType } from "vue";
import { commonCssMixin } from "../utils/commonCssMixin";
import { AssetOverviewItem } from "../utils/types";

/**
 * TODO: Component description...
 */
export default {
  name: "WoodAssetsOverviewDesktopItem",
  mixins: [commonCssMixin],

  props: {
    item: {
      type: Object as PropType<AssetOverviewItem>,
      required: true,
    },
  },
};
</script>

<template>
  <div :class="$css.container">
    <div :class="$css.dataContainer">
      <div :class="$css.labelContainer">
        <span :class="$css.label">{{ item.label }}</span>
      </div>
      <div :class="$css.value">{{ item.value }}</div>
    </div>
  </div>
</template>

<style module="$css">
.container {
  margin-right: var(--space-l);
  bottom: 0;
}

.dataContainer {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.labelContainer {
  white-space: nowrap;
}

.label {
  font: var(--font-xxs);
  color: var(--color-green-100);
}

.infoIcon {
  margin-inline-start: var(--space-s);
  position: relative;
  top: 0.05em;
  color: var(--color-green-100);
}

.value {
  font: var(--font-m);
  color: var(--color-green-100);
  white-space: nowrap;
}
</style>
