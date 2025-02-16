<script lang="ts">
import { PropType } from "vue";
import { commonCssMixin } from "../utils/commonCssMixin";
import { AssetOverviewItem } from "../utils/types";
import WoodButtonElement from "../WoodButtonElement/WoodButtonElement.vue";
import WoodArrowLeft from "./WoodArrowLeft.vue";
import WoodArrowRight from "./WoodArrowRight.vue";
import WoodAssetsOverviewDesktopItem from "./WoodAssetsOverviewDesktopItem.vue";

/**
 * TODO: Component description...
 */
export default {
  name: "WoodAssetsOverviewDesktopView",
  components: {
    WoodArrowRight,
    WoodArrowLeft,
    WoodButtonElement,
    WoodAssetsOverviewDesktopItem,
  },
  mixins: [commonCssMixin],

  props: {
    items: {
      type: Array as PropType<Array<AssetOverviewItem>>,
      required: true,
    },
  },

  data() {
    return {
      startIndex: 0,
      observer: null as IntersectionObserver | null,
      visibilityByIndex: Object.fromEntries(
        this.items.map((_, index) => [index.toString(), false]),
      ),
    };
  },

  computed: {
    totalItems() {
      return this.items.length;
    },
    isFirstItemVisible() {
      return this.visibilityByIndex[0];
    },
    isLastItemVisible() {
      return this.visibilityByIndex[this.totalItems - 1];
    },
    canMoveLeft() {
      return !this.isFirstItemVisible;
    },
    canMoveRight() {
      return !this.isLastItemVisible;
    },
    showNavigation() {
      return this.totalItems > 4;
    },
    itemsVisibilityArray() {
      return Object.entries(this.visibilityByIndex) || [];
    },
    firstVisibleItemIndex() {
      return this.itemsVisibilityArray.findIndex(([_, isVisible]) => isVisible);
    },
    lastVisibleItemIndex() {
      return this.itemsVisibilityArray.reduce((acc, [index, isVisible]) => {
        return isVisible ? parseInt(index) : acc;
      }, 0);
    },
  },

  mounted() {
    this.setUpObserver();
  },
  },

  methods: {
    moveLeft() {
      if (!this.canMoveLeft) return;

      this.scrollIntoView(this.firstVisibleItemIndex - 1);
    },
    moveRight() { 
      if (!this.canMoveRight) return;

      this.scrollIntoView(this.lastVisibleItemIndex + 1);
    },

    scrollIntoView(index: number) {
      const itemElements = this.getItemElements();
      if (!itemElements || !itemElements[index]) return;

      itemElements[index].scrollIntoView({ behavior: "smooth", inline: "nearest" });
    },

    getItemElements() {
      const itemElements = this.$refs.items;

      if (!Array.isArray(itemElements)) {
        throw new Error(
          "Could not get elements. `$refs.items` does not contain an Array of HTMLDivElements.",
        );
      }

      return itemElements as HTMLDivElement[];
    },

    getContainerElement() {
      const containerElement = this.$refs.container;

      if (!containerElement) {
        throw new Error("Could not get container element. `$refs.container` is falsy.");
      }

      return containerElement as HTMLDivElement;
    },

    getPropFromDataset(dataset: DOMStringMap, prop: string) {
      const value = dataset[prop];

      if (!value) {
        throw new Error(`Could not get prop ${prop} from dataset. Value is falsy.`);
      }

      return value;
    },

    setUpObserver() {
      if (!this.showNavigation) return;

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const { isIntersecting, target } of entries) {
            const element = target as HTMLElement;
            const index = this.getPropFromDataset(element.dataset, "index");
            this.visibilityByIndex[index] = isIntersecting;
          }
        },
        { root: this.getContainerElement() },
      );

      for (const element of this.getItemElements()) {
        this.observer.observe(element);
      }
    },
    },
  },
};
</script>

<template>
  <div>
    <div v-if="showNavigation" :class="[$commonCss.cardBase, $css.container]">
      <WoodButtonElement @click="moveLeft">
        <WoodArrowLeft :class="[$css.arrowButton, !canMoveLeft && $css.isDisabled]" />
      </WoodButtonElement>

      <div ref="container" :class="$css.containerData">
        <div
          v-for="(overviewItem, index) in items"
          ref="items"
          :key="index"
          :data-index="index"
          :class="$css.assetsOverviewItem"
          :style="{ transform: `translateX(-${startIndex * (213 + 20)}px)` }"
        >
          <WoodAssetsOverviewDesktopItem v-bind="$props" :item="overviewItem" />
        </div>
      </div>

      <WoodButtonElement @click="moveRight">
        <WoodArrowRight :class="[$css.arrowButton, !canMoveRight && $css.isDisabled]" />
      </WoodButtonElement>
    </div>

    <!-- If the number of items is less than 4 -->
    <div v-else :class="[$commonCss.cardBase, $css.containerDataWithoutButtons]">
      <div
        v-for="(overviewItem, index) in items"
        :key="index"
        :class="$css.assetsOverviewItemWithoutButtons"
      >
        <WoodAssetsOverviewDesktopItem v-bind="$props" :item="overviewItem" />
      </div>
    </div>
  </div>
</template>

<style module="$css">
.container {
  background-color: white;
  display: flex;
  justify-content: space-between;
  gap: var(--space-m);
  padding-inline: var(--space-m);
  align-items: center;
}

.containerData {
  display: flex;
  gap: 20px;
  overflow: hidden;
}

.assetsOverviewItem {
  border-right: 1px solid var(--color-green-30);
  width: 213px;
  flex-shrink: 0;
  transition: transform 0.5s ease-in-out;
}

.arrowButton {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--space-xl);
  background-color: var(--color-red-100);
  inline-size: 34px;
  block-size: 34px;
  transition: background-color 200ms;
  flex-shrink: 0;
  cursor: pointer;

  &:hover {
    background-color: var(--color-dark-red-100);
  }

  &.isDisabled {
    pointer-events: none;
    background-color: var(--color-red-50);
  }
}

.containerDataWithoutButtons {
  display: flex;
  justify-content: center;
  gap: var(--space-m-extra);
  background-color: white;
  padding-inline: var(--space-m);
  align-items: center;
}

.assetsOverviewItemWithoutButtons {
  border-right: 1px solid var(--color-green-30);
}
</style>
