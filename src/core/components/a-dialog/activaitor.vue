<template>
  <div class="d-flex justify-content-end">
    <a-input-group
      class="mr-2"
      v-if="!!placeholder"
      prepend
    >
      <a-input-text class="ml-2" name="search" @input="search" type="search" :placeholder="placeholder" />
      <template #prepend>
        <b-button variant="flat" size="sm" disabled>
          <i class="mdi mdi-magnify" style="margin-left: 2px; font-size: 16px; line-height: 1;"></i>
        </b-button>
      </template>
    </a-input-group>
    <slot>
      <b-button
        v-if="!!title"
        size="sm"
        variant="primary"
        class="text-nowrap px-3"
        @click="ok"
      >
        {{ title }}
        <i class="mdi mdi-plus ml-2" style="line-height: 1"></i>
      </b-button>
    </slot>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    placeholder: String,
  },
  methods: {
    search(e) {
      this.$emit("search", e);
    },
    ok() {
      this.$emit("ok");
    },
  },
};
</script>
