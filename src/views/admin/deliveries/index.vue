<template>
  <b-container>
    <div class="mt-3 mb-2">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn" :class="deliveryStatueTab == 0 ? 'btn-primary' : 'btn-outline-primary'"
          @click="setDeliveryType(0)">{{ deliveryStatue[0] }}</button>
        <button type="button" class="btn" :class="deliveryStatueTab == 1 ? 'btn-primary' : 'btn-outline-primary'"
          @click="setDeliveryType(1)">{{ deliveryStatue[1] }}</button>
        <button type="button" class="btn" :class="deliveryStatueTab == 2 ? 'btn-primary' : 'btn-outline-primary'"
          @click="setDeliveryType(2)">{{ deliveryStatue[2] }}</button>
        <button type="button" class="btn" :class="deliveryStatueTab == 3 ? 'btn-primary' : 'btn-outline-primary'"
          @click="setDeliveryType(3)">{{ deliveryStatue[3] }}</button>
        <button type="button" class="btn" :class="deliveryStatueTab == 4 ? 'btn-primary' : 'btn-outline-primary'"
          @click="setDeliveryType(4)">{{ deliveryStatue[4] }}</button>
      </div>
    </div>
    <a-table title="التوصيلات" :items="deliveries[deliveryStatueEn[deliveryStatueTab].split(' ').join('')]"
      :columns="columns" no_footer no_select @details="deliveryDetails($event.row)">
      <template slot="headers" slot-scope="{ props }">
        <template v-if="
          props.column.field != 'details' && props.column.field != 'status'
        ">
          {{ props.column.label }}
        </template>
        <template v-else-if="props.column.field == 'details'">
          <div class="text-center">
            {{ $t("details") }}
          </div>
        </template>
        <template v-else>
          <div class="text-center">
            {{ props.column.label }}
          </div>
        </template>
      </template>
      <template slot="items.distance" slot-scope="{ value }">
        <div class="text-center">
          {{ value }} متر
        </div>
      </template>
      <template slot="items.expectedTime" slot-scope="{ value }">
        <div class="text-center">
          {{ value }}
        </div>
      </template>
      <template slot="items.dateCreated" slot-scope="{ value }">
        {{ moment(value).format("MMM Do YY") }}
      </template>
      <template slot="items.type" slot-scope="{ value }">
        {{ deliveryType[value] }}
      </template>
      <template slot="items.price" slot-scope="{ value }">
        <div class="text-center">
          {{ value }} {{ $t('sp') }}
        </div>
      </template>
    </a-table>
  </b-container>
</template>

<script>
import moment from 'moment';
import { mapActions, mapState } from 'vuex';
import { currentUserId } from '../../../core/util/auth';
export default {
  data: () => ({
    deliveryStatueTab: 0,
    columns: [
      {
        label: "الإلتقاط",
        field: "pickUp",
        sortable: false,
      },
      {
        label: "الوجهة",
        field: "dropOff",
        sortable: false,
      },
      {
        label: "النوع",
        field: "type",
        sortable: false,
      },
      {
        label: "المسافة",
        field: "distance",
      },
      {
        label: "الوقت المتوقع",
        field: "expectedTime",
        sortable: false,
      },
      {
        label: "التاريخ",
        field: "dateCreated",
        sortable: false,
      },
      {
        label: "التكلفة",
        field: "price",
      },
      {
        label: "details",
        field: "details",
        sortable: false,
      },
    ],
  }),
  computed: {
    ...mapState({
      deliveryStatue: status => status['admin/deliveries'].deliveryStatue,
      deliveryStatueEn: status => status['admin/deliveries'].deliveryStatueEn,
      deliveries: (state) => state['admin/deliveries'].deliveries,
      deliveryType: status => status['admin/deliveries'].deliveryType
    }),
  },
  created() {
    this.getDeliveriesByUserId({ id: currentUserId(), type: 4 })
  },
  methods: {
    moment,
    ...mapActions([
      "getDeliveriesByUserId"
    ]),
    setDeliveryType(type) {
      this.deliveryStatueTab = type;
    },
    deliveryDetails(row) {
      this.$router.push('/admin/deliveries/' + row.id)
    },
  }
}
</script>