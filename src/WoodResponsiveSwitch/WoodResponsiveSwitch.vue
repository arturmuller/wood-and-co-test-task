<script lang="ts">
type Viewport = "mobile" | "tablet" | "desktop";

// Note that there is no media query for mobile, as that is the default
const MinWidth = {
  DESKTOP: "(min-width: 768px)",
  TABLET: "(min-width: 640px)",
};

/**
 * Conditionally renders one of three possible slots (`mobile`, `tablet` and `desktop`) depending
 * on window width.
 *
 * **BEWARE**: This component is not compatible with SSR as it requires access to `window` during
 * data initialization.
 *
 * Add a warning to the parent component's description that the component is CLIENT ONLY.
 *
 * ## Usage
 *
 * This component follows the mobile-first principle. This means that the `mobile` slot is rendered
 * by default, and `tablet` and `desktop` only override the `mobile` slot if defined.
 *
 * In this example, every size has it's own slot:
 *
 *
 * ```html
 * <WoodResponsiveSwitch>
 *   <template #desktop>
 *     Rendered on desktop
 *   </template>
 *
 *   <template #tablet>
 *     Rendered on tablet
 *   </template>
 *
 *   <template #mobile>
 *     Rendered on mobile
 *   </template>
 * </WoodResponsiveSwitch>
 * ```
 *
 * However, in this next example, only mobile and desktop are defined. In this case, the component will
 * keep rendering `mobile` until `desktop` is reached, at which point it will switch.
 *
 * ```html
 * <WoodResponsiveSwitch>
 *   <template #desktop>
 *     Desktop
 *   </template>
 *
 *   <template #mobile>
 *     Mobile / Tablet
 *   </template>
 * </WoodResponsiveSwitch>
 * ```
 *
 * Conversly, in this last example, only `mobile` and `tablet` is defined. When on `desktop`, the
 * component will render `tablet`, as that is the closest defined slot.
 *
 * ```html
 * <WoodResponsiveSwitch>
 *   <template #tablet>
 *     Tablet / Desktop
 *   </template>
 *
 *   <template #mobile>
 *     Mobile
 *   </template>
 * </WoodResponsiveSwitch>
 * ```
 * ---
 *
 * Author: Artur Müller
 */
export default {
  name: "WoodResponsiveSwitch",
  props: {},
  data() {
    const desktopMQL = window.matchMedia(MinWidth.DESKTOP);
    const tabletMQL = window.matchMedia(MinWidth.TABLET);

    return {
      desktopMQL,
      tabletMQL,

      isDesktop: desktopMQL.matches,
      isTablet: tabletMQL.matches,
    };
  },
  computed: {
    slotName(): Viewport {
      if (this.$slots.desktop && this.isDesktop) {
        return "desktop";
      }

      if (this.$slots.tablet && this.isTablet) {
        return "tablet";
      }

      return "mobile";
    },
  },
  mounted() {
    this.desktopMQL.addEventListener("change", this.handleDesktopChange);
    this.tabletMQL.addEventListener("change", this.handleTabletChange);
  },
  destroyed() {
    this.desktopMQL.removeEventListener("change", this.handleDesktopChange);
    this.tabletMQL.removeEventListener("change", this.handleTabletChange);
  },
  methods: {
    handleDesktopChange(event: MediaQueryListEvent) {
      this.isDesktop = event.matches;
    },
    handleTabletChange(event: MediaQueryListEvent) {
      this.isTablet = event.matches;
    },
  },
};
</script>

<template>
  <div>
    <slot :name="slotName" />
  </div>
</template>
