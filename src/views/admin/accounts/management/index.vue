<template>
  <a-table
    :title="$t('management.table.title')"
    :items="accountsList"
    :columns="columns"
    no_footer
    no_select
    @details="details($event.row)"
  >
    <template slot="headers" slot-scope="{ props }">
      <template
        v-if="
          props.column.field != 'details' && props.column.field != 'dateBlocked'
        "
      >
        {{ $t("management.table.columns")[props.column.label] }}
      </template>
      <template v-else-if="props.column.field == 'dateBlocked'">
        <div class="text-center">
          {{ $t("management.table.columns.dateBlocked") }}
        </div>
      </template>
      <template v-else>
        <div class="text-center">
          {{ $t("details") }}
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
    <template slot="items.dateBlocked" slot-scope="{ value }">
      <div class="text-center">
        <b-badge variant="success" class="px-3" v-if="!value">{{
          $t("activated")
        }}</b-badge>
        <b-badge variant="danger" class="px-3" v-else>{{
          $t("blocked")
        }}</b-badge>
      </div>
    </template>
    <template slot="items.phoneNumber" slot-scope="{ value }">
      {{ isValidJsonString(value) && JSON.parse(value)? JSON.parse(value).formattedNumber : "---" }}
    </template>
  </a-table>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { isValidJsonString } from "@core/util/global/index";
export default {
  computed: {
    ...mapGetters(["accountsList"]),
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
        label: "dateBlocked",
        field: "dateBlocked",
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
    this.getAllACcounts();
  },
  methods: {
    ...mapActions(["getAllACcounts"]),
    isValidJsonString,
    details(props) {
      this.$router.replace("/admin/management/" + props.id);
    },
  },
};
</script>
