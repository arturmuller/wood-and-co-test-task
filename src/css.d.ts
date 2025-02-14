import "csstype";

declare module "csstype" {
  // All custom properties should be prefixed with `--wpc-` to avoid naming collisions
  type WoodPortalComponentsCssVar = `--wpc-${string}`;

  interface Properties {
    [key: WoodPortalComponentsCssVar]: string | undefined;
  }
}
