<template>
  <div class="d-flex flex-column align-items-center justify-content-center loading-container">
    <!-- <img src="@/assets/images/vectors/fox-head.svg" width="80" /> -->
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div>{{ progressEvent }}</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      progressEvent: (state) => state.app.progressEvent,
    }),
  },
};
</script>
<style lang="scss" scoped>
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 95px);
  z-index: 200;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 40px;
}
.lds-ellipsis div {
  position: absolute;
  top: 20px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--primary);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
