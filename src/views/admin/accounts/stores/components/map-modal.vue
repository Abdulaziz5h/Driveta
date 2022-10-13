<template>
  <div id="map" style="width: 100%; height: 300px"></div>
</template>
<style lang="scss">
.gm-style {
  div:first-of-type {
    cursor: pointer !important;
  }
}
</style>
<script>
import { Loader } from "@googlemaps/js-api-loader";
import { $_themeConfig } from "@themeConfig";
export default {
  data: () => ({
    myLatlng: {},
    zoom: 13,
    shopId: Number,
    map: null,
    markers: [],
    lat: null,
    lng: null,
  }),
  props: {
    latProp: String,
    lngProp: String,
  },
  created() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.lat = parseFloat(this.latProp);
      this.lng = parseFloat(this.lngProp);
      if (isNaN(this.lat) || isNaN(this.lng)) {
        this.myLatlng = { lat: 36.204, lng: 37.135 };
      } else {
        this.myLatlng = { lat: this.lat, lng: this.lng };
        this.zoom = 13;
      }
      const loader = new Loader({
        apiKey: $_themeConfig.apiKey,
        version: "weekly",
        libraries: ["places"],
      });
      loader.load().then(() => {
        // eslint-disable-next-line no-undef
        this.map = new google.maps.Map(document.getElementById("map"), {
          center: this.myLatlng,
          zoom: this.zoom,
          mapTypeId: "roadmap",
          gestureHandling: 'cooperative'
        });
        const input = document.getElementById("searchPlace");
        // eslint-disable-next-line no-undef
        const searchBox = new google.maps.places.SearchBox(input);
        // eslint-disable-next-line no-undef
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchBox);

        searchBox.addListener("places_changed", () => {
          const places = searchBox.getPlaces();
          if (places.length == 0) {
            return;
          }
          // eslint-disable-next-line no-undef
          const bounds = new google.maps.LatLngBounds();
          places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
              console.log("Returned place contains no geometry");
              return;
            }
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          this.map.fitBounds(bounds);
        });
        this.addMarker(this.myLatlng, this.map);
        this.map.addListener("click", (event) => {
          this.addMarker(event.latLng, this.map);
          this.lat = event.latLng.toJSON().lat.toString();
          this.lng = event.latLng.toJSON().lng.toString();

          this.$emit("getLatLng", this.lat, this.lng);
        });
      });
    },
    addMarker(location, map) {
      if (this.markers.length != 0) {
        this.markers[0].setMap(null);
        this.markers = [];
      }
      // eslint-disable-next-line no-undef
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: require('@/assets/images/shop.png')
      });
      this.markers.push(marker);
    }
  },
  watch: {
    latProp() {
      this.initMap();
    },
    lngProp() {
      this.initMap();
    },
  },
};
</script>
