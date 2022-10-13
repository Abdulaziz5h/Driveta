<template>
  <router-link to="/">
    <h4 class="title text-white">
      <strong>{{ appName }}</strong>
    </h4>
  </router-link>
</template>
<script>
import { $_themeConfig } from "@themeConfig";
export default {
  setup() {
    const appName = $_themeConfig.app.appName;
    return {
      appName,
    };
  },
  props: {
    width: {
      type: String,
      default: "60",
    },
  },
};
</script>
