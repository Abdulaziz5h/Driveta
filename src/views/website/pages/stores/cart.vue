<template>
  <b-container class="mb-5" style="min-height: 70vh">
    <div class="d-flex justify-content-between align-items-center mt-3 mb-3">
      <span>
        <label class="text-capitalize m-0">الكلفة الكلية: </label>
        <strong> {{ cartTotalCost }} {{ $t("sp") }} </strong>
      </span>
      <b-button class="px-5" to="/stores" variant="secondary">تسوق الان</b-button>
    </div>
    <hr />
    <b-card class="mb-4" no-body v-for="(value, key) of cartProducts" :key="key">
      <b-card-header class="d-flex justify-content-between align-items-center">
        <h6 class="m-0 title">
          {{ value[0].storeName }}
        </h6>
        <b-button variant="outline-success" class="px-4" size="sm" @click="order(value)">اطلب الان</b-button>
      </b-card-header>
      <b-card-body class="p-0 pb-2">
        <a-table :items="value" no_select :columns="columns" no_footer>
          <template slot="headers" slot-scope="{ props }">
            <template v-if="
              props.column.field != 'actions' && props.column.field != 'documents'
            ">
              {{ $t("products.table.columns")[props.column.label] }}
            </template>
            <template v-else-if="props.column.field == 'actions'">
              <div class="text-center">
                {{ $t("actions") }}
              </div>
            </template>
            <template v-else-if="props.column.field == 'documents'">
              <div class="text-center">
                {{ $t("products.table.columns.documents") }}
              </div>
            </template>
          </template>
          <template slot="items.documents" slot-scope="{ value }">
            <div class="text-center">
              <img v-if="value[0]" :src="$store.getters.domainHost + value[0].src" style="object-fit: cover"
                class="rounded-circle" width="50" height="50" :alt="value[0].name" />
            </div>
          </template>
          <template slot="items.price" slot-scope="{ value }">
            {{ value }} {{ $t("sp") }}
          </template>
          <template slot="items.total" slot-scope="{ value }">
            {{ value }} {{ $t("sp") }}
          </template>
          <template slot="items.actions" slot-scope="{ props }">
            <div class="text-center">
              <b-button variant="primary" size="sm" class="btn-icon mr-2" @click="
                setCart({
                  product: { id: props.row.id },
                  q: props.row.quantity + 1,
                })
              "><i class="mdi mdi-plus"></i></b-button>
              <b-button @click="
                removeCartItem({
                  product: { id: props.row.id },
                  q: -1,
                })
              " :disabled="!props.row.quantity" variant="danger" size="sm" class="btn-icon"><i
                  class="mdi mdi-minus"></i>
              </b-button>
            </div>
          </template>
        </a-table>
      </b-card-body>
    </b-card>
    <h5 class="title text-center py-3" v-if="!Object.keys(cartProducts).length">
      السلة فارغة
    </h5>
    <b-modal ref="map-modal" size="md" hide-footer title="وجهة التوصيلة">
      <div v-if="loading">
        <a-loading class="position-relative" style="height: 300px;"></a-loading>
      </div>
      <template v-else>
        <map-viewor v-if="dto.lat && dto.lng" @set_store_location="setStoreLocation($event)"
          @set_distenation="setDistenation($event)" delivery :myLatlng="{
            lat: dto.lat,
            lng: dto.lng
          }"></map-viewor>
        <div class="mt-3">
          <h5 class="title mb-3">
            تفاصيل الطلبية
          </h5>
          <hr />
          <b-row class="w-100">
            <b-col cols="4" v-for="(type, index) of vehicleTypes" :key="index">
              <b-card class="mx-auto text-center" :class="{ 'border-success': type.item1 == selectedType.item1 }"
                style="cursor: pointer" @click="setVehicleType(type)">
                {{ type.item1 }}
              </b-card>
            </b-col>
          </b-row>
          <hr />
          <label class="d-block mb-3" v-if="storeFormatedLocation">
            <strong>موقع المتجر: </strong> <small>{{ storeFormatedLocation }}</small>
          </label>
          <label class="d-block mb-3" v-if="distFormatedLocation">
            <strong>موقع الوجهة: </strong> <small>{{ distFormatedLocation }}</small>
          </label>
          <b-row>
            <b-col cols="6">
              <label class="d-block mb-3" v-if="distFormatedLocation">
                <strong>المسافة: </strong> {{ +distance.text.split(' ')[0] >= 1 ? distance.text :
                    +distance.text.split(' ')[0] * 1000 + 'm'
                }}
              </label>
            </b-col>
            <b-col cols="6">
              <label class="d-block mb-3" v-if="distFormatedLocation">
                <strong>المدة: </strong> {{ duration.text }}
              </label>
            </b-col>
          </b-row>
          <label class="d-block mb-3" v-if="distFormatedLocation && selectedType.item2">
            <strong>الكلفة: </strong> {{ calcDeliveryCost(distance.value, selectedType.item2) + ' ' + $t('sp') }}
          </label>
        </div>
      </template>
      <div>
        <b-button variant="primary" @click="invokeDelivery()" size="sm" class="px-4 mr-3"
          :disabled="!selectedType.item2 || !distFormatedLocation || loading">
          تم</b-button>
        <b-button variant="outline-secondary" size="sm" class="px-4">إلفاء</b-button>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { onUpdateCartEvent } from "@/libs/listeners";
import { defaultCartDto } from "@/store/modules/cart.store";
import map from "./components/map.vue";
import { calcDeliveryCost } from "../../../../core/util/global";
import { MapHub } from "@/libs/map/map-hub.js";
import Swal from "sweetalert2";

export default {
  components: {
    'map-viewor': map
  },
  data: () => ({
    loading: false,
    dto: {
      lat: 0,
      lng: 0
    },
    distDto: {
      lat: 0,
      lng: 0
    },
    selectedProducts: [],
    storeFormatedLocation: '',
    distFormatedLocation: '',
    selectedType: {
      item1: '',
      item2: 0
    },
    distance: {
      text: '',
      value: 0
    },
    duration: {
      text: '',
      value: 0
    },
    cartDto: defaultCartDto,
    columns: [
      {
        label: "documents",
        field: "documents",
        sortable: false,
      },
      {
        label: "name",
        field: "name",
        sortable: false,
      },
      {
        label: "price",
        field: "price",
      },
      {
        label: "total",
        field: "total",
      },
      {
        label: "quantity",
        field: "quantity",
      },
      {
        label: "actions",
        field: "actions",
        sortable: false,
      },
    ],
    connection: null,
  }),
  computed: {
    ...mapState({
      vehicleTypes: state => state.cart.vehicleTypes
    }),
    ...mapGetters(["cartProducts", "cartTotalCost"]),
  },
  created() {
    this.mapHub = new MapHub();
    this.connection = this.mapHub.startSignalR();
    this.getVehicleTypes();
    this.getCart((data) => {
      Object.assign(this.cartDto, data);
      this.getCartProducts();
      this.$store.commit("Set_Main_Loading", false);
    });
    onUpdateCartEvent((data) => {
      Object.assign(this.cartDto, data);
    });
  },
  methods: {
    calcDeliveryCost,
    ...mapActions(['getStoreById', "getCart", "setCart", "removeCartItem", "getCartProducts", "getVehicleTypes", "removeCartItem"]),
    order(storeProducts) {
      this.selectedProducts = storeProducts;
      this.getStoreById({
        id: storeProducts[0].storeId,
        callback: ({ data }) => {
          Object.assign(this.dto, { lat: +data.lat, lng: +data.long })
          this.$refs['map-modal'].show();
        }
      })
    },
    setDistenation(e) {
      Object.assign(this.distDto, { lat: +e.lat(), lng: +e.lng() });
      this.distFormatedLocation = e.data.originAddresses[0];
      Object.assign(this.distance, e.data.rows[0].elements[0].distance);
      Object.assign(this.duration, e.data.rows[0].elements[0].duration);
    },
    setStoreLocation(e) {
      this.storeFormatedLocation = e.destinationAddresses[0]
    },
    setVehicleType(type) {
      Object.assign(this.selectedType, type)
    },
    invokeDelivery() {
      this.loading = true;
      this.connection.invoke(`AddDeliveryProduct`, {
        startLat: this.dto.lat.toString(),
        startLong: this.dto.lng.toString(),
        endLat: this.distDto.lat.toString(),
        endLong: this.distDto.lng.toString(),
        distance: this.distance.value,
        price: calcDeliveryCost(this.distance.value, this.selectedType.item2),
        pickUp: this.storeFormatedLocation,
        dropOff: this.distFormatedLocation,
        expectedTime: this.duration.text,
        vehicleType: this.selectedType.item2,
        details: this.selectedProducts.map((p => {
          return {
            productId: p.id,
            quantity: p.quantity,
          }
        }))
      }).then((data) => {
        this.loading = false;
        this.$refs['map-modal'].hide();
        this.selectedProducts.forEach((p) => {
          this.removeCartItem({
            q: 0,
            product: {
              id: p.id
            }
          })
        })
        Swal.fire({
          title: "نشكركم للإستفادة من خدمات درافيتا",
          text: "تم إضافة طلبكم بنجاح يمكنكم متابعة الطلب من تطبيق الموبايل",
          icon: "success",
          confirmButtonText: "تم"
        })
        this.reset();
      }).catch((e) => {
        console.log(e);
      })
    },
    reset() {
      Object.assign(this.dto, {
        lat: 0,
        lng: 0
      })
      Object.assign(this.distDto, {
        lat: 0,
        lng: 0
      })
      this.selectedProducts = [];
      this.storeFormatedLocation = '';
      this.distFormatedLocation = '';
      Object.assign(this.selectedType, {
        item1: '',
        item2: 0
      })
      Object.assign(this.distance, {
        text: '',
        value: 0
      })
      Object.assign(this.duration, {
        text: '',
        value: 0
      })
      this.getCart((data) => {
        Object.assign(this.cartDto, data);
        this.getCartProducts();
        this.$store.commit("Set_Main_Loading", false);
      });
    }
  },
  beforeDestroy() {
    this.mapHub.stopSignalR();
  },
};
</script>
