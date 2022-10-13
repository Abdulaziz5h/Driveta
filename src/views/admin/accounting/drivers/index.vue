<template>
  <a-table title="قواتير السائقين" :items="invoicesGroup" :columns="columns" no_footer no_select @details="details($event.row)">
    <template slot="headers" slot-scope="{ props }">
      <template v-if="props.column.field == 'details'">
        <div class="text-center">
          {{ $t("details") }}
        </div>
      </template>
      <template v-else>
        {{ props.column.label }}
      </template>
    </template>
    <template slot="items.toPay" slot-scope="{ value }">
      {{ value + ' ' + $t('sp') }}
    </template>
    <template slot="items.profit" slot-scope="{ value }">
      {{ value + ' ' + $t('sp') }}
    </template>
  </a-table>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    columns: [
      {
        label: "اسم المستخدم",
        field: "userName",
        sortable: false,
      },
      {
        label: "الاسم",
        field: "name",
        sortable: false,
      },
      {
        label: "مترتب عليه",
        field: "toPay",
      },
      {
        label: "فوائد",
        field: "profit",
      },
      {
        label: "details",
        field: "details",
      },
    ],
  }),
  computed: {
    ...mapGetters(['invoicesGroup']),
  },
  created() {
    this.getAllDriversInvoices();
  },
  methods: {
    ...mapActions(["getAllDriversInvoices"]),
    details(row) {
      this.$router.push('/admin/drivers/' + row.userId + '/invoices');
    }
  },
};
</script>
