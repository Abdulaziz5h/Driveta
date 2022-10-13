<template>
  <a-table :title="'فواتير ' + userName" :items="invoices" :columns="columns" no_footer no_select @details="details($event.row)">
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
    <template slot="items.date" slot-scope="{ value }">
      {{ moment(value).format("MMM Do YY") }}
    </template>
    <template slot="items.total" slot-scope="{ value }">
      {{ value + ' ' + $t("sp") }}
    </template>
  </a-table>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import moment from "moment";
export default {
  props: {
    id: String
  },
  data: () => ({
    columns: [
      {
        label: "تاريخ",
        field: "date",
        sortable: false,
      },
      {
        label: "المبلغ الكلي",
        field: "total",
        sortable: false,
      },
      {
        label: "ملاحطات",
        field: "note",
        sortable: false,
      },
      {
        label: "details",
        field: "details",
      },
    ],
  }),
  computed: {
    ...mapState({
      userName: state => state['admin/invoice'].userName
    }),
    ...mapGetters(['invoices']),
  },
  created() {
    this.getDriverOwnerInvoice(this.id);
  },
  methods: {
    moment,
    ...mapActions(["getDriverOwnerInvoice"]),
    details(row) {
      this.$router.push('/admin/drivers/' + this.id + '/invoices/' + row.id)
    }
  },
};
</script>
