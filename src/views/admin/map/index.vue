<template>
  <div>
    <map-viewer :captains="dataStream"></map-viewer>
  </div>
</template>

<script>
import mapViewer from "./components/map.vue";
import { MapHub } from "@/libs/map/map-hub.js";
import { onUpdateDriversLocationsEvent, onStartLiveModeEvent, onStopLiveModeEvent } from "@/libs/listeners";
export default {
  components: {
    mapViewer,
  },
  data: () => ({
    mapHub: null,
    dataStream: []
  }),
  created() {
    this.mapHub = new MapHub();
    this.mapHub.startSignalR();
    onUpdateDriversLocationsEvent((data) => {
      this.dataStream = data;
      console.log(data)
    })
    onStartLiveModeEvent((data) => {
      this.mapHub.startSignalR();
    })
    onStopLiveModeEvent((data) => {
      this.mapHub.stopSignalR();
    })
  },
  methods: {
  },
  beforeDestroy() {
    this.mapHub.stopSignalR();
  },
};
</script>
