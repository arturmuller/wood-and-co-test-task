export type AssetOverviewItem = {
  /** @description Label. */
  label: string;
  /** @description Value. */
  value: string;
  /** @description Information text. */
  informationText: {
    /** @description Title. */
    title: string;
    /** @description Value. */
    value: string;
  } | null;
};
