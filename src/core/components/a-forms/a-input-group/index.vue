<template>
  <b-input-group>
      <b-input-group-prepend v-if="prepend" is-text>
        <slot name="prepend">
        </slot>
      </b-input-group-prepend>
      <slot></slot>
      <b-input-group-append v-if="append" is-text>
        <slot name="append">
        </slot>
      </b-input-group-append>
    </b-input-group>
</template>

<script>
import { BInputGroup } from "bootstrap-vue";
export default {
  components: {
    BInputGroup,
  },
  props: {
    append: Boolean,
    prepend: Boolean,
  }
}
</script>