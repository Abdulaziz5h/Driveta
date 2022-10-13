<template>
  <a-table
    :title="$t('customer.table.title')"
    :items="customers"
    :columns="columns"
    no_footer
    no_select
    @details="details($event.row)"
  >
    <template slot="headers" slot-scope="{ props }">
      <template
        v-if="
          props.column.field != 'details' && props.column.field != 'status'
        "
      >
        {{ $t("customer.table.columns")[props.column.label] }}
      </template>
      <template v-else-if="props.column.field == 'details'">
        <div class="text-center">
          {{ $t("details") }}
        </div>
      </template>
      <template v-else>
        <div class="text-center">
          {{ $t("customer.table.columns")[props.column.label] }}
        </div>
      </template>
    </template>
    <template slot="items.personalImage" slot-scope="{ value }">
      <div class="text-center">
        <img
          v-if="value.src"
          :src="$store.getters.domainHost + value.src"
          style="object-fit: cover"
          class="rounded-circle"
          width="50"
          height="50"
          :alt="value.name"
        />
        <img
          v-else
          src="@/assets/images/placeholder-user-image.jpg"
          style="object-fit: cover"
          class="rounded-circle"
          width="50"
          height="50"
          :alt="value.name"
        />
      </div>
    </template>
    <template slot="items.phoneNumber" slot-scope="{ value }">
      {{ isValidJsonString(value) ? JSON.parse(value).formattedNumber : "---" }}
    </template>
    <template slot="items.status" slot-scope="{ props }">
      <div class="text-center">
        <b-badge variant="warning" class="px-3" v-if="!props.row.isActive">{{
          $t("unactivate")
        }}</b-badge>
        <b-badge variant="success" class="px-3" v-else-if="!props.row.dateBlocked">{{
          $t("activated")
        }}</b-badge>
        <b-badge variant="danger" class="px-3" v-else>{{
          $t("blocked")
        }}</b-badge>
      </div>
    </template>
    <template slot="items.balance" slot-scope="{ value }">
      {{ value + $t("sp") }}
    </template>
  </a-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { isValidJsonString } from "@core/util/global/index";

export default {
  computed: {
    ...mapGetters(["customers"]),
  },
  data: () => ({
    columns: [
      {
        label: "image",
        field: "personalImage",
        sortable: false,
      },
      {
        label: "name",
        field: "name",
        sortable: false,
      },
      {
        label: "username",
        field: "userName",
        sortable: false,
      },
      {
        label: "phonenumber",
        field: "phoneNumber",
        sortable: false,
      },
      {
        label: "status",
        field: "status",
        sortable: false,
      },
      // {
      //   label: "balance",
      //   field: "balance",
      // },
      {
        label: "details",
        field: "details",
        sortable: false,
      },
    ],
  }),
  created() {
    this.getCustomers();
  },
  methods: {
    ...mapActions(["getCustomers"]),
    isValidJsonString,
    details(props) {
      this.$router.replace("/admin/customers/" + props.id);
    },
  },
  beforeDestroy() {
    this.$store.commit("Reset_Search_Dto");
  },
};
</script>
