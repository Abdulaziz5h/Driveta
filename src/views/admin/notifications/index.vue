<template>
  <a-table
    title="notifications"
    :items="notifications"
    :columns="columns"
    no_footer
    no_select
    @details="details($event.row)"
  >
    <template slot="headers" slot-scope="{ props }">
      <template
        v-if="props.column.field != 'details' && props.column.field != 'status'"
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
  </a-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { currentUserId } from "@core/util/auth";

export default {
  computed: {
    ...mapGetters(["notifications"]),
  },
  data: () => ({
    columns: [
      {
        label: "",
        field: "",
      },
    ],
  }),
  created() {
    this.getNotificationsUserById(currentUserId());
  },
  methods: {
    ...mapActions(["getNotificationsUserById"]),
  },
};
</script>
