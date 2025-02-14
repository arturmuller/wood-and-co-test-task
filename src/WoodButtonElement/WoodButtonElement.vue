<script lang="ts">
import { enumToProp } from "../utils/commonProps";
import { createEnum } from "../utils/props";

const ButtonType = createEnum(["submit", "button", "reset"]);

/**
 * This simple wrapper around the native button element makes sure that the default
 * button type is set to `button`, preventing accidental form submissions.
 *
 * From [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#notes):
 *
 * > If your buttons are not for submitting form data to a server, be sure to set
 * their type attribute to button. Otherwise, they will try to submit form data and
 * to load the (nonexistent) response, possibly destroying the current state of the document.
 *
 * ---
 *
 * Author: Artur Müller
 */
export default {
  name: "WoodButtonElement",
  props: {
    type: enumToProp(ButtonType, { required: false, default: "button" }),
  },
};
</script>

<template>
  <button :type="type" v-bind="$attrs" v-on="$listeners"><slot /></button>
</template>
