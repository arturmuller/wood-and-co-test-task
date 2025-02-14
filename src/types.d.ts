import "vue/types/vue";
import type { HrefGetters } from "./utils/hrefGetters";

declare module "vue/types/vue" {
  interface Noty {
    show(message: string): void;
    success(message: string): void;
    error(message: string): void;
    warning(message: string): void;
    info(message: string): void;
  }

  type CSSModuleClasses = {
    readonly [key: string]: string;
  };

  interface Vue {
    readonly $noty: Noty;

    /**
     * Use `commonCssMixin` to add this property to any Vue instance.
     */
    readonly $commonCss: CSSModuleClasses;

    /**
     * Use `hrefGettersMixin` to inject this value.
     */
    readonly $hrefs: HrefGetters;
  }
}
