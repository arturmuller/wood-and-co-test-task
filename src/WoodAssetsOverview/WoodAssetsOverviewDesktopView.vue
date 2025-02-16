<script lang="ts">
import { PropType } from "vue";
import { commonCssMixin } from "../utils/commonCssMixin";
import { AssetOverviewItem } from "../utils/types";
import WoodButtonElement from "../WoodButtonElement/WoodButtonElement.vue";
import WoodArrowLeft from "./WoodArrowLeft.vue";
import WoodArrowRight from "./WoodArrowRight.vue";
import WoodAssetsOverviewDesktopItem from "./WoodAssetsOverviewDesktopItem.vue";

/**
 * This component displays a horizontal list of asset overview items.
 * In case there are more than 4 items. It allows the user to scroll through the items using left and right arrows.
 * Component is designed for desktop view.
 * 
 * To track visibility of items IntersectionObserver is used. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
 * Even though browsers should automatically handle memory cleanup for IntersectionObserver, it is good practice to disconnect the observer when the component is unmounted.
 *
 * For scrolling to the next item, the component uses the `scrollIntoView` method. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)
 * 
 * CSS Scroll Snap is used to make the scrolling in descrete steps. [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap)
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
  beforeUnmount() {
    this.destroyObserver();
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
    destroyObserver() {
      if (this.observer) {
        this.observer.disconnect();
      }
    },
  },
};
</script>

<template>
  <div>
    <div :class="[$commonCss.cardBase, $css.container]">
      <WoodButtonElement v-if="showNavigation" @click="moveLeft">
        <WoodArrowLeft :class="[$css.arrowButton, !canMoveLeft && $css.isDisabled]" />
      </WoodButtonElement>

      <div ref="container" :class="[showNavigation && $css.containerData, !showNavigation && $css.containerDataWithoutButtons]">
        <div
          v-for="(overviewItem, index) in items"
          ref="items"
          :key="index"
          :data-index="index"
          :class="[$css.assetsOverviewItem, lastVisibleItemIndex === index && showNavigation && $css.lastVisibleItem, !showNavigation && $css.assetsOverviewItemWithoutButtons]"
          :style="{ transform: `translateX(-${startIndex * (213 + 20)}px)` }"
        >
          <WoodAssetsOverviewDesktopItem v-bind="$props" :item="overviewItem" />
        </div>
      </div>

      <WoodButtonElement v-if="showNavigation" @click="moveRight">
        <WoodArrowRight :class="[$css.arrowButton, !canMoveRight && $css.isDisabled]" />
      </WoodButtonElement>
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
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  -ms-overflow-style: none;  /* hide scrollbar in Internet Explorer 10+ */
  scrollbar-width: none;  /* hide scrollbar in Chrome, Safari and Firefox */
}

.assetsOverviewItem {
  border-right: 1px solid var(--color-green-30);
  width: 213px;
  flex-shrink: 0;
  transition: transform 0.5s ease-in-out;
  text-align: right;
  scroll-snap-align: start;
}
.lastVisibleItem {
  border-right: none;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: var(--space-m-extra);
  background-color: white;
  padding-inline: var(--space-m);
  align-items: center;
}

.assetsOverviewItemWithoutButtons {
  border-right: 1px solid var(--color-green-30);
  text-align: right;
  flex: 1;
}
.assetsOverviewItemWithoutButtons:last-child {
  border-right: none;
}
</style>
