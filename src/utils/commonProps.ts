/**
 * This file includes props that are useful across the entire application. It should
 * only include generic props like RequiredString/Text, or application-wide props
 * like Role and Locale.
 *
 * Props generated from enums should be generated via the {@link enumToProp} helper
 * directly from enums at usage site.
 */

import { PropType } from "vue";
import { TranslateResult } from "vue-i18n";

type Validator<T, N extends boolean> =
  [N] extends [true] ? (value: T | null) => boolean : (value: T) => boolean;

export function enumToProp<
  T,
  R extends boolean = true,
  D extends T | undefined = undefined,
  N extends boolean = false,
>(
  e: { type: PropType<T>; validator: (value: T) => boolean },
  options?: { required?: R; default?: D; nullable?: N },
): // This complicated type signature is required to make Vue play nicely with TypeScript
[D] extends [undefined] ?
  [N] extends [true] ?
    {
      type: PropType<T | null>;
      validator: Validator<T, N>;
      required: R;
    }
  : {
      type: PropType<T>;
      validator: Validator<T, N>;
      required: R;
    }
: [N] extends [true] ?
  {
    type: PropType<T | null>;
    validator: Validator<T, N>;
    required: R;
    default: D;
  }
: {
    type: PropType<T>;
    validator: Validator<T, N>;
    required: R;
    default: D;
  } {
  // If the nullable option was passed, the validator must also allow for null values.
  const validator =
    options?.nullable ? (value: T | null) => value === null || e.validator(value) : e.validator;

  return {
    type: e.type,
    validator,
    required: options?.required ?? true,
    default: options?.default,
  } as never;
}

export const RequiredString = {
  type: String,
  required: true as const,
};

export const OptionalString = {
  type: String,
  required: false as const,
};

export const RequiredText = {
  type: [String, Object] as PropType<TranslateResult>,
  required: true as const,
};

export const OptionalText = {
  type: [String, Object] as PropType<TranslateResult>,
  required: false as const,
};

export const OptionalNullableString = {
  type: String as PropType<string | null>,
  required: false as const,
};
