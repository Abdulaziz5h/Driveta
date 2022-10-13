<template>
<div class="website" @scroll="updateScrollTop">
  <a-navbar :screenTop="screenTop"/>
  <main class="main">
    <b-container v-if="isUserLoggedIn() && isCustomer() && !userData.isActive">
      <div class="alert alert-warning mt-3">
        فقدت بعض البيانات ، يرجى إكمال
        <router-link :to="'/profile/' + currentUserId">بياناتك</router-link>
      </div>
    </b-container>
    <router-view/>
  </main>
  <a-footer/>
</div>
</template>

<script>
import aNavbar from "../layout/navbar";
import aFooter from "../layout/footer";
import { currentUserId, getUserData, isUserLoggedIn, isCustomer } from "@core/util/auth";
export default {
  components: {
    aNavbar,
    aFooter
  },
  computed: {
    currentUserId() {
      return currentUserId();
    },
    userData() {
      return getUserData();
    },
  },
  data: () => ({
    screenTop: 0,
  }),
  methods: {
    isUserLoggedIn,
    isCustomer,
    updateScrollTop(e) {
      this.screenTop = e.target.scrollTop;
    },
  }
}
</script>

<style scoped lang="scss">
.website {
  height: 100vh;
  overflow: auto;
}
</style>
