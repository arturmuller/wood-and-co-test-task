<script lang="ts">
import { PropType } from "vue";
import { commonCssMixin } from "../utils/commonCssMixin";
import { AssetOverviewItem } from "../utils/types";

/**
 * Component description...
 */
export default {
  name: "WoodAssetsOverviewCardView",
  components: {},
  mixins: [commonCssMixin],
  props: {
    items: {
      type: Array as PropType<Array<AssetOverviewItem>>,
      required: true,
    },
  },

  data() {
    return {
      isBeginning: true,
      isEnd: false,
    };
  },
};
</script>

<template>
  <div :class="[$commonCss.cardBase, $css.container]">
    <p :class="$css.message">Mobile view is not part of this task 😊</p>
  </div>
</template>

<style module="$css">
.container {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-l);
}

.message {
  text-align: center;
}
</style>
