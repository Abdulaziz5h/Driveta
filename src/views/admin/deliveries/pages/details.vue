<template>
  <b-row>
    <b-col cols="12" lg="6">
      <b-card no-body class="mb-3">
        <b-card-header class="d-flex justify-content-between align-items-center">
          <h5 class="title m-0">
            بيانات التوصيلة
          </h5>
          <b-badge class="px-2">{{ deliveryStatue[dto.staue] }}</b-badge>
        </b-card-header>
        <b-card-body>
          <label class="d-block"><strong>إلتقاط:</strong> {{ dto.pickUp }}</label>
          <label class="d-block"><strong>الوجهة:</strong> {{ dto.dropOff }}</label>
          <label class="d-block"><strong>الزبون: </strong>
            <router-link v-slot="{ href, navigate }" v-if="isAdmin() || isCustomer()" custom
              :to="'/admin/customers/' + dto.customerId">
              <a :href="href" @click="navigate">{{ dto.customerName }}</a>
            </router-link>
            <span v-else>
              {{ dto.customerName }}
            </span>
          </label>
          <label class="d-block"><strong>رقم جوال الزبون:</strong>
            <a :href="'tel:' + (isValidJsonString(dto.riderPhone) && JSON.parse(dto.riderPhone).phoneNumber)">{{
                isValidJsonString(dto.riderPhone) ?
                  JSON.parse(dto.riderPhone).formattedNumber : "---"
            }}</a>
          </label>
          <label class="d-block"><strong>الوقت المتوقع:</strong> {{ dto.expectedTime }}</label>
          <label class="d-block"><strong>اسم السائق:</strong>
            <router-link v-slot="{ href, navigate }" v-if="dto.driverName && (isAdmin() || isDriver())" custom
              :to="'/admin/drivers/' + dto.driverId">
              <a :href="href" @click="navigate">{{ dto.driverName }}</a>
            </router-link>
            <span v-else-if="dto.driverName">
              {{ dto.driverName }}
            </span>
            <span v-else>
              لم يتم التحديد بعد
            </span>
          </label>
          <label class="d-block"><strong>التاريخ:</strong> {{ moment(dto.dateCreated).format("MMM Do YY") }}</label>
          <label class="d-block"><strong>المسافة:</strong> {{ dto.distance }} متر</label>
          <label class="d-block"><strong>الكلفة:</strong> {{ dto.price }} {{ $t('sp') }}</label>
        </b-card-body>
      </b-card>
      <b-card no-body>
        <a-table :title="$t('products.table.title')" :items="dto.details" no_select :columns="columns" no_footer>
          <template slot="items.quantity" slot-scope="{ value }">
            {{ value }}
          </template>
          <template slot="items.price" slot-scope="{ value }">
            {{ value }} {{ $t('sp') }}
          </template>
          <template slot="items.total" slot-scope="{ value, props }">
            {{ props.row.quantity * value }} {{ $t('sp') }}
          </template>
        </a-table>
      </b-card>
    </b-col>
    <b-col cols="12" lg="6">
      <b-card no-body class="mb-3">
        <b-card-header class="d-flex justify-content-between align-items-center">
          <h5 class="title m-0">
            مسار التوصيلة
          </h5>
          <b-badge variant="info" class="px-2">{{ deliveryType[dto.type] }}</b-badge>
        </b-card-header>
        <b-card-body>
          <map-viewer v-if="dto.id != nullGuid" :start="{ lat: +dto.startLat, lng: +dto.startLong }"
            :end="{ lat: +dto.endLat, lng: +dto.endLong }">
          </map-viewer>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { nullGuid } from '@core/util/global';
import map from '../components/map.vue';
import { isValidJsonString } from "@core/util/global/index";
import moment from 'moment';
import { isCustomer, isAdmin, isDriver } from '@core/util/auth';
export default {
  components: {
    'map-viewer': map
  },
  props: {
    id: String
  },
  data: () => ({
    nullGuid,
    dto: {
      type: 0,
      staue: 0,
      id: nullGuid,
      customerId: nullGuid,
      customerName: "",
      expectedTime: "",
      riderPhone: "",
      dateCreated: new Date(),
      startLat: 0,
      startLong: 0,
      endLat: 0,
      endLong: 0,
      distance: 0,
      price: 0,
      pickUp: "",
      dropOff: ""
    },
    columns: [
      {
        label: "اسم المنتج",
        field: "productOrOfferName",
        sortable: false,
      },
      {
        label: "الكمية",
        field: "quantity",
      },
      {
        label: "السعر",
        field: "price",
      },
      {
        label: "الكلفة",
        field: "price",
      }
    ],
  }),
  computed: {
    ...mapState({
      deliveryStatue: status => status['admin/deliveries'].deliveryStatue,
      deliveryType: status => status['admin/deliveries'].deliveryType
    })
  },
  created() {
    this.getDeliveriesById({
      id: this.id,
      callback: ({ data }) => {
        Object.assign(this.dto, data)
        this.$store.commit('Set_Main_Loading', false)
      }
    })
  },
  methods: {
    isValidJsonString,
    moment,
    isAdmin,
    isDriver,
    isCustomer,
    ...mapActions(['getDeliveriesById']),
  }
}
</script>