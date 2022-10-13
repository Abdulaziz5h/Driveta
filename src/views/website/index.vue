<template>
  <div>
    <a-loading v-if="isMainLoading" />
    <div v-show="!isMainLoading">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      isMainLoading: (state) => state.app.isMainLoading,
    }),
  }
}
</script>