import { PropType } from "vue";

export function isOneOf(options: ReadonlyArray<string> | Array<string>) {
  return (v: string) => options.includes(v);
}

export function gt(min: number) {
  return (v: number) => v > min;
}

export function gte(min: number) {
  return (v: number) => v >= min;
}

export function isNonEmpty() {
  return size(1, Infinity);
}

export function size(min: number, max: number = min) {
  return (value: { length: number }) => value.length >= min && value.length <= max;
}

/**
 * Creates a strongly typed set of props to be used within Vue.js component definitions and
 * Storybook stories.
 *
 * Note that you *only* need to use it if you intend to use this in Vue.js prop types and
 * in Storybook controls. If you just need a TypeScript enum, use an actual enum or string
 * literal union.
 *
 * @see https://www.typescriptlang.org/docs/handbook/enums.html
 * @see https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types
 */
export function createEnum<const T extends string>(options: T[]) {
  return {
    /**
     * Vue.js-compatible PropType. To be used within prop definition. Equivalent to
     * defining the prop as `String as PropType<T>`.
     *
     * Note that to make the prop required, you must specify `required: true` within
     * the prop definition.
     *
     * @example
     * ```ts
     * const { type: Role } = createEnum(...)
     *
     * export default {
     *   props: {
     *     type: Role,
     *     required: true,
     *   }
     * }
     * ```
     */
    type: String as unknown as PropType<T>,

    /**
     * Identical to `type`, except that the null value is also allowed. Equivalent to
     * defining the prop as `String as PropType<T | null>`.
     */
    nullableType: String as unknown as PropType<T | null>,

    /**
     * Vue.js-compatible validator.
     *
     * @example
     * ```ts
     * const { role, Role, validator: isRole } = createEnum(...)
     *
     * export default {
     *   props: {
     *     type: Role,
     *     validator: isRole,
     *     required: true,
     *   }
     * }
     * ```
     */
    validator: isOneOf(options) as unknown as (v: T) => v is T,

    /**
     * Contains an object where each key represents one enum variant.
     *
     * @example
     * ```ts
     * const { enum: RoleEnum } = createEnum(["Client", "Salesman"]);
     *
     * RoleEnum.Client // => "Client"
     * RoleEnum.Salesman // => "Salesman"
     * ```
     */
    enum: Object.fromEntries(options.map((o) => [o, o])) as unknown as { [K in T]: K },

    /**
     * Contains an array of enum options. Useful within Storybook argTypes definitions.
     *
     * @example
     * ```ts
     * const { options: roleOptions } = createEnum(["Client", "Salesman"]);
     *
     * // Storybook Meta export
     * export default {
     *   argTypes: {
     *     role: {
     *       control: { type: "select" },
     *       options: roleOptions,
     *     },
     *   },
     *   // ...other configuration
     * } satisfies Meta<StoryComponent>;
     *
     * ```
     */
    options,
  };
}
