<template>
  <div id="map"></div>
</template>
<style lang="scss">
#map {
  height: calc(100vh - 122px);
  width: calc(100% + 16px);
  margin: -16px;
}
</style>
<script>
import { Loader } from "@googlemaps/js-api-loader";
import { $_themeConfig } from "@themeConfig";
export default {
  props: {
    start: Object,
    end: Object
  },
  data: () => ({
    zoom: 13,
    map: null,
  }),
  created() {
    this.initMap();
  },
  methods: {
    initMap() {
      const loader = new Loader({
        apiKey: $_themeConfig.apiKey,
        version: "weekly",
        libraries: ["places"],
      });
      loader.load().then(() => {
        const directionsService = new google.maps.DirectionsService();
        this.map = new google.maps.Map(document.getElementById("map"), {
          center: this.start,
          zoom: this.zoom,
          mapTypeId: "roadmap",
        });
        const startPoint = new google.maps.Marker({
          map: this.map,
          position: {
            lat: this.start.lat,
            lng: this.start.lng
          },
          icon: require('@/assets/images/start-marker.png')
        });
        const clintHome = new google.maps.Marker({
          map: this.map,
          position: {
            lat: this.end.lat,
            lng: this.end.lng
          },
          icon: require('@/assets/images/end-marker.png')
        });
        this.calculateAndDisplayRoute(this.map, directionsService, startPoint.position, clintHome.position)
      });
    },
    calculateAndDisplayRoute(map, directionsService, startPoint, clintHome) {
      directionsService.route({
        origin: startPoint,
        destination: clintHome,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          new google.maps.DirectionsRenderer({
            map,
            directions: response,
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: "#00b894"
            },
            hideRouteList: false
          });
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  },
};
</script>
