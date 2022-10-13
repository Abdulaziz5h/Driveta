<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<style lang="scss">
body,
html {
  overflow: hidden !important;
}
</style>
<script>
const fullLayout = () => import("@/core/layout/full/fullLayout.vue");
const verticalLayout = () =>
import("@/core/layout/vertical/verticalLayout.vue");
import { initScreenEvent, destroyScreenEvent } from "@/libs/global-event.js"
import { setDir } from "@/libs/i18n";
export default {
  name: "App",
  components: {
    fullLayout,
    verticalLayout,
  },
  computed: {
    layout() {
      if (
        typeof this.$route.meta == "function"
          ? this.$route.meta(this.$route).layout == "vertical"
          : false
      ) {
        return "verticalLayout";
      } else {
        return "fullLayout";
      }
    },
  },
  created() {
    setDir();
    addEventListener('keydown', (e) => {
      if(e.code == 'F1') {
        e.preventDefault()
        if(this.$route.name != 'login') {
          this.$router.push('/login')
        } else {
          this.$router.push('/cpanel')
        }
      }
    })
  },
  mounted() {
    initScreenEvent()
  },
  beforeDestroy() {
    destroyScreenEvent()
  }
};
</script>
