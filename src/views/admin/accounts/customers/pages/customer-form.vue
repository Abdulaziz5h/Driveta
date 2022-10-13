<template>
  <b-row>
    <b-col cols="12" class="d-flex mb-2 align-items-center">
      <a-back path="/admin/customers" />
      <!-- <h6 class="title pl-3 mr-auto m-0">
        <strong>{{ $t("customer.customer-balance") }}:
          <span class="text-info">
            {{ customerDto.balance
            }}<small class="font-weight-bold">{{ $t("sp") }}</small>
          </span>
        </strong>
      </h6> -->
      <a-block-user @input="actionBlock" :id="id" :dateBlock="customerDto.dateBlocked" v-if="isAdmin()" />
      <a-active-user @input="customerDto.isActive = true" :id="id" v-if="!customerDto.isActive && isAdmin() && customerDto.id != nullGuid" />
    </b-col>
    <b-col cols="12">
      <div class="card">
        <div class="card-header text-capitalize">
          {{ $t("customer.details.title") }}
        </div>
        <div class="card-body d-flex">
          <img v-if="customerDto.personalImage.src" :src="
            $store.getters.domainHost + '/' + customerDto.personalImage.src
          " width="120" height="120" :alt="customerDto.name + 'image'" class="mr-3" />
          <img v-else src="@/assets/images/placeholder-user-image.jpg" width="120" height="120"
            :alt="customerDto.name + 'image'" class="mr-3" />
          <div>
            <div>
              <label class="text-capitalize font-weight-bold mr-2">{{ $t("customer.details.name") }}: </label>{{
                  customerDto.name
              }}
            </div>
            <div>
              <label class="text-capitalize font-weight-bold mr-2">{{ $t("customer.details.username") }}: </label>{{
                  customerDto.userName
              }}
            </div>
            <div>
              <label class="text-capitalize font-weight-bold mr-2">{{ $t("customer.details.phonenumber") }}:
              </label>
              {{
                  customerDto.phoneNumber && isValidJsonString(customerDto.phoneNumber)
                    ? JSON.parse(customerDto.phoneNumber).formattedNumber
                    : "---"
              }}
            </div>
            <div>
              <label class="text-capitalize font-weight-bold mr-2 mb-0">{{ $t("customer.details.email") }}: </label>{{
                  customerDto.email
              }}
            </div>
          </div>
        </div>
      </div>
    </b-col>
    <b-col cols="12">
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
    </b-col>
  </b-row>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { nullGuid } from "@core/util/global/index.js";
import { isValidJsonString } from "@core/util/global/index";
import { isAdmin } from "@core/util/auth";
import moment from "moment";
export default {
  props: {
    id: String,
  },
  data: () => ({
    deliveryStatueTab: 0,
    nullGuid,
    columns: [
      {
        label: "إلتقاط",
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
    customerDto: {
      id: nullGuid,
      userName: "",
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
      balance: 0,
      deliveries: [],
      personalImageFile: [],
      personalImage: [],
      dateBlocked: null,
    },
  }),
  computed: {
    ...mapState({
      deliveryStatue: status => status['admin/deliveries'].deliveryStatue,
      deliveryStatueEn: status => status['admin/deliveries'].deliveryStatueEn,
      deliveries: (state) => state['admin/deliveries'].deliveries,
      deliveryType: status => status['admin/deliveries'].deliveryType
    })
  },
  created() {
    this.getCustomerById({
      id: this.id,
      callback: ({ data }) => {
        Object.assign(this.customerDto, data);
        this.$store.commit("Set_Main_Loading", false);
      },
    });
    this.getDeliveriesByUserId({ id: this.id, type: 2 })
  },
  methods: {
    moment,
    isAdmin,
    ...mapActions(["getCustomerById", "getDeliveriesByUserId"]),
    isValidJsonString,
    actionBlock(block) {
      this.customerDto.dateBlocked = block;
    },
    setDeliveryType(type) {
      this.deliveryStatueTab = type;
    },
    deliveryDetails(row) {
      this.$router.push('/admin/deliveries/' + row.id)
    }
  },
};
</script>
