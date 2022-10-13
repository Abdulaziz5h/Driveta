<template>
  <b-button @click="goToHome()" class="px-5"  variant="primary" >عودة للرئيسية</b-button>
</template>
<script>
import { getHomeRouteForLoggedInUser } from "@core/util/auth";
export default {
  methods: {
    goToHome() {
      this.$router.replace(getHomeRouteForLoggedInUser())
    }
  }
}
</script>