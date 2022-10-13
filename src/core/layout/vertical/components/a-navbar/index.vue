<template>
  <div class="navbar-container d-flex align-items-center p-3 border-bottom">
    <span class="mr-3">
      <i
        class="mdi text-primary toggle-collased"
        @click="toggleCollapse()"
        :class="collapsed ? 'mdi-menu' : 'mdi-backburger'"
      ></i>
    </span>
    <!-- <language/> -->
    <a-user-dropdown class="ml-auto" />
  </div>
</template>
<script>
import {
  userRoleAttrName,
  userNameAttrName,
} from "@core/auth/jwt/jwtDefaultConfig";

export default {
  props: {
    collapsed: Boolean,
  },
  data: () => ({
    userRoleAttrName,
    userNameAttrName,
  }),
  methods: {
    toggleCollapse() {
      this.$emit("toggleCollapse");
    },
  },
};
</script>
