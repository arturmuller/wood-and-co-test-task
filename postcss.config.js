import ap from "autoprefixer";
import nesting from "postcss-nesting";

/** @type {import('postcss-load-config').Config} */

export const config = {
  plugins: [ap, nesting],
};
