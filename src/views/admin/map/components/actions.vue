<template>
  <div class="h-100 d-flex justify-content-end align-items-center">
    <b-button variant="flat" @click="toggleLiveMode()">
      <i class="mdi mdi-circle text-danger mr-2" :class="{ live }"></i> مباشر
    </b-button>
  </div>
</template>

<script>
import { startLiveModeEvent, stopLiveModeEvent } from "@/libs/global-event";
export default {
  data: () => ({
    live: true
  }),
  methods: {
    toggleLiveMode() {
      this.live = !this.live
      if(this.live) {
        startLiveModeEvent()
      } else {
        stopLiveModeEvent()
      }
    }
  }
}
</script>

<style scoped>
@keyframes live {
 0% {
  opacity: 1;
 }
 50% {
  opacity: .4;
 } 
 100% {
  opacity: 1;
 } 
}
.live {
  animation: live .7s linear infinite;
}
</style>