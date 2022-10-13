<template>
  <div
    class="navbar-container"
    :class="{ 'scolled fixed-top': screenTop }"
  >
    <navMenu />
  </div>
</template>

<script>
import navMenu from "./components/nav-menu.vue";
export default {
  props: {
    screenTop: Number,
  },
  components: {
    navMenu,
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/helpers/variables";
.navbar-container {
  transition: .4s;
  &.scolled {
    width: calc(100vw - 17px);
    background: #fff;
    box-shadow: $shadow;
  }
}
</style>
