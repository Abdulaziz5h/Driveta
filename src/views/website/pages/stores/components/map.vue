<template>
  <div id="map"></div>
</template>
<style lang="scss">
#map {
  height: 300px;
  width: 100%;
}
</style>
<script>
import { Loader } from "@googlemaps/js-api-loader";
import { $_themeConfig } from "@themeConfig";
export default {
  props: {
    myLatlng: Object,
    delivery: Boolean
  },
  data: () => ({
    zoom: 13,
    map: null,
    distMarker: null,
    dr: null
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
        const service = new google.maps.DistanceMatrixService();
        const directionsService = new google.maps.DirectionsService();
        this.map = new google.maps.Map(document.getElementById("map"), {
          center: this.myLatlng,
          zoom: this.zoom,
          mapTypeId: "roadmap",
        });
        const shop = new google.maps.Marker({
          position: {
            lat: this.myLatlng.lat,
            lng: this.myLatlng.lng
          },
          icon: require('@/assets/images/shop.png'),
          map: this.map
        })
        service.getDistanceMatrix(
          {
            origins: [shop.position],
            destinations: [shop.position],
            travelMode: 'DRIVING'
          }, (data) => {
            this.$emit('set_store_location', data)
          });
        this.delivery && google.maps.event.addListener(this.map, 'click', (evt) => {
          this.distMarker && this.distMarker.setMap(null);
          this.distMarker = new google.maps.Marker({
            position: {
              lat: evt.latLng.lat(),
              lng: evt.latLng.lng()
            },
            icon: require('@/assets/images/end-marker.png'),
            map: this.map
          })
          service.getDistanceMatrix(
            {
              origins: [this.distMarker.position],
              destinations: [shop.position],
              travelMode: 'DRIVING'
            }, (data) => {
              this.$emit('set_distenation', { ...this.distMarker.position, data })
            });
          this.calculateAndDisplayRoute(this.map, directionsService, this.distMarker.position, shop.position)
        })
      });
    },
    calculateAndDisplayRoute(map, directionsService, startPoint, clintHome) {
      directionsService.route({
        origin: startPoint,
        destination: clintHome,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          this.dr && this.dr.setMap(null)
          this.dr = new google.maps.DirectionsRenderer({
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
