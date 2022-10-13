<template>
  <a-table
    :title="$t('store.table.title')"
    :items="stores"
    :columns="columns"
    no_footer
    @details="details($event.row.id)"
    @delete-selected="deleteSelected('countries', $event)"
  >
    <template slot="headers" slot-scope="{ props }">
      <template
        v-if="
          props.column.field != 'details' && props.column.field != 'status'
        "
      >
        {{ $t("store.table.columns")[props.column.field] }}
      </template>
      <template v-else-if="props.column.field == 'details'">
        <div class="text-center">
          {{ $t("details") }}
        </div>
      </template>
      <template v-else>
        <div class="text-center">
          {{ $t("store.table.columns")[props.column.label] }}
        </div>
      </template>
    </template>
    <template slot="items.documents" slot-scope="{ value }">
      <div class="text-center">
        <img
          v-if="value[0]"
          :src="$store.getters.domainHost + value[0].src"
          style="object-fit: cover"
          class="rounded-circle"
          width="50"
          height="50"
          :alt="value[0].name"
        />
        <img
          v-else
          src="@/assets/images/placeholder.png"
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
  </a-table>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { isValidJsonString } from "@core/util/global/index";
export default {
  computed: {
    ...mapGetters(["stores"]),
  },
  data: () => ({
    columns: [
      {
        label: "image",
        field: "documents",
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
      {
        label: "details",
        field: "details",
        sortable: false,
      },
    ],
  }),
  created() {
    this.getStores();
  },
  methods: {
    ...mapActions(["getStores"]),
    isValidJsonString,
    details(id) {
      this.$router.replace("/admin/stores/" + id);
    },
  },
  beforeDestroy() {
    this.$store.commit("Reset_Search_Dto");
  },
};
</script>
