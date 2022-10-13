<template>
  <b-row>
    <b-col cols="12">
      <a-table :title="$t('vehicle.table.title')" :items="vehicles" :columns="columns" no_footer no_select
        @details="details($event.row)">
        <template slot="headers" slot-scope="{ props }">
          <template v-if="props.column.field != 'details'">
            {{ $t("vehicle.table.columns")[props.column.label] }}
          </template>
          <template v-else>
            <div class="text-center">
              {{ $t("details") }}
            </div>
          </template>
        </template>
        <template slot="items.type" slot-scope="{ value }">
          {{ value == 500 ? 'دراجة' : value == 1000 ? 'تاكسي' : 'سيارة خاصة' }}
        </template>
        <template slot="items.driverName" slot-scope="{ value }">
          {{ value ? value : 'System' }}
        </template>
        <template slot="items.ownerName" slot-scope="{ value }">
          {{ value ? value : 'System' }}
        </template>
        <template slot="items.documents" slot-scope="{ value }">
          <div class="text-center">
            <img :src="$store.getters.domainHost + value[0].src" class="rounded-circle" style="object-fit: cover"
              width="50" height="50" :alt="value.modelName + ' pecture'" />
          </div>
        </template>
      </a-table>
    </b-col>
  </b-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(['vehicles']),
  },
  data: () => ({
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
        label: "vehicleNumber",
        field: "vehicleNumber",
        sortable: false,
      },
      {
        label: "driverName",
        field: "driverName",
        sortable: false,
      },
      {
        label: "ownerName",
        field: "ownerName",
        sortable: false,
      },
      {
        label: "type",
        field: "type",
        sortable: false
      },
      {
        label: "modelName",
        field: "modelName",
        sortable: false,
      },
      {
        label: "details",
        field: "details",
        sortable: false,
      },
    ],
  }),
  created() {
    this.getVehicles();
  },
  methods: {
    ...mapActions(["getVehicles"]),
    details(props) {
      this.$router.replace("/admin/vehicles/" + props.id);
    },
    vehcoleType(type) {
      return type == 1
        ? { name: "taxi", color: "warning" }
        : type == 2
          ? { name: "bike", color: "secondary" }
          : { name: "privateCar", color: "success" };
    },
  },
  beforeDestroy() {
    this.$store.commit("Reset_Shared");
  },
};
</script>
