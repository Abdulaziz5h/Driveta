<template>
  <a-table
    :title="$t('driver.table.title')"
    :items="drivers"
    :columns="columns"
    no_footer
    no_select
    @details="details($event.row)"
  >
    <template slot="headers" slot-scope="{ props }">
      <template
        v-if="
          props.column.field != 'details' &&
          props.column.field != 'dateBlocked' &&
          props.column.field != 'rate'
        "
      >
        {{ $t("driver.table.columns")[props.column.label] }}
      </template>
      <template v-else-if="props.column.field == 'details'">
        <div class="text-center">
          {{ $t("details") }}
        </div>
      </template>
      <template v-else>
        <div class="text-center">
          {{ $t("driver.table.columns")[props.column.label] }}
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
          :alt="'placeholder image'"
        />
      </div>
    </template>
    <template slot="items.phoneNumber" slot-scope="{ value }">
      {{ isValidJsonString(value) ? JSON.parse(value).formattedNumber : "---" }}
    </template>
    <template slot="items.dateBlocked" slot-scope="{ props }">
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
    <template slot="items.rate" slot-scope="{ value }">
      <div class="text-center">{{ value }} %</div>
    </template>
  </a-table>
</template>

<script>
import { isValidJsonString } from "@core/util/global/index";
import { mapActions, mapGetters } from "vuex";
export default {
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
        label: "dateBlocked",
        field: "dateBlocked",
        sortable: false,
      },
      {
        label: "rate",
        field: "rate",
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
  computed: {
    ...mapGetters(["drivers"]),
  },
  created() {
    this.getDrivers();
  },
  methods: {
    ...mapActions(["getDrivers"]),
    isValidJsonString,
    details(props) {
      this.$router.replace("/admin/drivers/" + props.id);
    },
  },
  beforeDestroy() {
    this.$store.commit("Reset_Search_Dto");
  },
};
</script>
