import commonCss from "../common.module.css";

export type CommonCssModule = {
  sectionsStack: string;
  cardBase: string;
  fadeIn: string;
  fragment: string;
  textLink: string;
};

type VueWithCommonCss = {
  $commonCss: CommonCssModule;
};

export const commonCssMixin = {
  created(this: VueWithCommonCss) {
    this.$commonCss = commonCss as CommonCssModule;
  },
};
