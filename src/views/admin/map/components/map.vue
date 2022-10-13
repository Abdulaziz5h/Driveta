<template>
  <div>
    <div id="map"></div>
    <div>
      <a-dialog no_footer ref="driverDetails" title="driver details">
        <template #body>
          <a-loading v-if="isLoading"></a-loading>
          <div v-else class="d-flex flex-column align-items-center">
            <img v-if="driverDto.personalImage.src" :src="$store.getters.domainHost + driverDto.personalImage.src"
              width="140" height="140" class="rounded-circle" style="object-fit: cover" :alt="driverDto.name + 'image'">
            <img v-else src="@/assets/images/placeholder-user-image.jpg" style="object-fit: cover" width="140"
              height="140" class="rounded-circle" alt="default image">
            <strong class="mt-3">{{ driverDto.name }} <b-button :to="'/admin/drivers/' + driverDto.id" variant="flat"
                class="ml-2 rounded-circle"><i class="mdi mdi-eye"></i></b-button> </strong>
            <small>{{ driverDto.userName }}</small>
            <span class="mt-3 mb-2">
              <strong>رقم الجوال: </strong>
              <a
                :href="'tel:' + (isValidJsonString(driverDto.phoneNumber) && JSON.parse(driverDto.phoneNumber).phoneNumber)">{{
                    isValidJsonString(driverDto.phoneNumber) &&
                    JSON.parse(driverDto.phoneNumber).formattedNumber
                }}</a>
            </span>
            <span>
              <strong>البريد الالكترني: </strong>
              <a :href="'mailto:' + driverDto.email">{{
                  driverDto.email
              }}</a>
            </span>
            <div class="d-flex justify-content-between px-5 w-100 mt-3">
              <!-- <span class="text-center">
                <strong class="d-block">الرصيد</strong>
                {{ driverDto.balance }}
              </span> -->
              <span class="text-center">
                <strong class="d-block">النسبة</strong>
                {{ driverDto.rate }}
              </span>
            </div>
            <div class="d-flex flex-column" v-if="!no_delivery">
              <hr />
              <h6 class="title text-center">قي توصيلة</h6>
              <h6 class="title text-center mb-4">تفاصيل التوصيلة</h6>
              <img v-if="delivertDto.customerPersonalImage"
                :src="$store.getters.domainHost + delivertDto.customerPersonalImage" width="140" height="140"
                class="mx-auto rounded-circle" style="object-fit: cover" :alt="delivertDto.customerName + 'image'">
              <img v-else src="@/assets/images/placeholder-user-image.jpg" style="object-fit: cover" width="140"
                height="140" class="mx-auto rounded-circle" alt="default image">
              <label class="d-block mx-auto mt-3">
                <strong>Customer Name: </strong> {{ delivertDto.customerName }}<b-button
                  :to="'/admin/customers/' + delivertDto.customerId" variant="flat" class="ml-2 rounded-circle"><i
                    class="mdi mdi-eye"></i></b-button>
              </label>
              <label class="d-block">
                <strong>رقم الجوال للزبون: </strong>
                <a
                  :href="'tel:' + (isValidJsonString(delivertDto.customerPhoneNumber) && JSON.parse(delivertDto.customerPhoneNumber).phoneNumber)">{{
                      isValidJsonString(delivertDto.customerPhoneNumber) &&
                      JSON.parse(delivertDto.customerPhoneNumber).formattedNumber
                  }}</a>
              </label>
              <label class="d-block">
                <strong>نوع التوصيلة: </strong> {{ deliveryType[delivertDto.type] }}
              </label>
              <label class="d-block">
                <strong>حالة التوصيلة: </strong> {{ deliveryStatue[delivertDto.staue] }}
              </label>
              <label class="d-block">
                <strong>التقاط: </strong> {{ delivertDto.pickUp }}
              </label>
              <label class="d-block">
                <strong>الوجهة: </strong> {{ delivertDto.dropOff }}
              </label>
              <label class="d-block">
                <strong>وقت البداية: </strong> {{ moment(delivertDto.startDate).format('llll') }}
              </label>
              <label class="d-block">
                <strong>الوقت المتوقع </strong> {{ delivertDto.expectedTime }}
              </label>
              <div class="d-flex justify-content-between px-5 w-100 mt-2 mb-4">
                <span class="text-center">
                  <strong class="d-block">Distance</strong>
                  {{ delivertDto.distance }} متر
                </span>
                <span class="text-center">
                  <strong class="d-block">التكلفة</strong>
                  {{ delivertDto.price }} {{ $t('sp') }}
                </span>
              </div>
            </div>
          </div>
        </template>
      </a-dialog>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#map {
  height: calc(100vh - 122px);
  width: calc(100% + 16px);
  margin: -16px;
}

::v-deep .b-sidebar {
  width: 600px;
}
</style>
<script>
import { Loader } from "@googlemaps/js-api-loader";
import { $_themeConfig } from "@themeConfig";
import { mapActions, mapState } from 'vuex';
import { isValidJsonString } from "@core/util/global/index";
import { nullGuid } from "@core/util/global";
import moment from "moment";
export default {
  props: {
    captains: Array
  },
  computed: {
    ...mapState({
      deliveryStatue: status => status['admin/deliveries'].deliveryStatue,
      deliveryType: status => status['admin/deliveries'].deliveryType
    })
  },
  data: () => ({
    isLoading: false,
    driverDto: {
      personalImage: {
        src: ""
      },
      rate: 0,
      id: nullGuid,
      balance: 0,
      userName: "",
      name: "",
      phoneNumber: "",
      email: ""
    },
    delivertDto: {
      customerId: nullGuid,
      customerName: "",
      customerPhoneNumber: "",
      customerPersonalImage: "",
      startDate: new Date(),
      endDate: null,
      store: null,
      type: 0,
      staue: 0,
      id: nullGuid,
      expectedTime: "",
      distance: 0,
      price: 0,
      pickUp: "",
      dropOff: ""
    },
    no_delivery: true,
    myLatlng: {
      lat: 36.204,
      lng: 37.135,
    },
    zoom: 13,
    map: null,
    markers: []
  }),
  created() {
    this.initMap();
  },
  methods: {
    moment,
    isValidJsonString,
    ...mapActions(['getDriver', 'getDriverCurrentDelivery']),
    initMap() {
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
        });
      });
    },
    addMarkerTOMap(cap) {
      this.markers = [...this.markers, (() => {
        var marker = new google.maps.Marker({
          map: this.map,
          position: {
            lat: +cap.lat,
            lng: +cap.long
          },
          icon: cap.isAvailable
            ? (cap.vehicleType == 500 ? require('@/assets/images/moto_marker.png') : require('@/assets/images/driving_pin.png'))
            : (cap.vehicleType == 500 ? require('@/assets/images/moto_marker-off.png') : require('@/assets/images/driving_pin-off.png')),
          id: cap.id,
          title: cap.name,
          opacity: 0.8,
        });
        const driverDetails = this.$refs.driverDetails;
        const getDriverDetails = this.getDriverDetails;
        const getDriverCurrentDelivery = this._getDriverCurrentDelivery;
        // add marker event to show info window
        google.maps.event.addListener(marker, 'click', function (evt) {
          var center = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
          // move info window to center
          this.map.panTo(center);
          driverDetails.open()
          getDriverDetails(marker.id)
          getDriverCurrentDelivery(marker.id)
        });

        return marker;
      })()]
    },
    getDriverDetails(id) {
      this.isLoading = true;
      this.getDriver({
        id,
        callback: ({ data }) => {
          Object.assign(this.driverDto, data)
          this.isLoading = false;
        }
      })
    },
    _getDriverCurrentDelivery(id) {
      this.isLoading = true;
      this.getDriverCurrentDelivery({
        id,
        callback: ({ data }) => {
          if (data) {
            Object.assign(this.delivertDto, data);
            this.no_delivery = false;
          } else
            this.no_delivery = true
          this.$store.commit('Set_Main_Loading', false)
          this.isLoading = false;
        }
      })
    },
    animatedMove(marker, t, moveto) {
      var deltalat = (moveto.lat - marker.position.lat()) / 100;
      var deltalng = (moveto.lng - marker.position.lng()) / 100;
      var delay = 10 * t;

      if (deltalng > 0 && deltalat > 0)
        for (var i = 0; i < 100; i++) {
          (function (ind) {
            setTimeout(
              function () {
                let lat = marker.position.lat();
                let lng = marker.position.lng();
                lat += deltalat;
                lng += deltalng;
                const latlng = new google.maps.LatLng(lat, lng);
                marker.setPosition(latlng);
              }, delay * ind
            );
          })(i)
        }
      else {
        const latlng = new google.maps.LatLng(moveto.lat, moveto.lng);
        marker.setPosition(latlng);
      }
    }
  },
  watch: {
    captains: {
      deep: true,
      handler(captains) {
        captains.forEach((cap) => {
          const marker = this.markers.find(m => m.id == cap.id)
          if (marker) {
            if (+cap.lat != marker.position.lat || +cap.long != marker.position.lng) {
              this.animatedMove(marker, 3, { lat: +cap.lat, lng: +cap.long })
            }
          } else {
            if (cap.lat && cap.long)
              this.addMarkerTOMap(cap);
          }
        })
      }
    }
  }
};
</script>
