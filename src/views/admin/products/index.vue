<template>
  <a-table :title="$t('products.table.title')" :items="products" :columns="columns" no_footer
    @details="details($event.row)" @delete-selected="removeMultiProduct">
    <template slot="headers" slot-scope="{ props }">
      <template v-if="props.column.field != 'details'">
        {{ $t("products.table.columns")[props.column.label] }}
      </template>
      <template v-else-if="props.column.field == 'details'">
        <div class="text-center">
          {{ $t("details") }}
        </div>
      </template>
    </template>
    <template slot="items.documents" slot-scope="{ value }">
      <div class="text-center">
        <img v-if="value[0]" :src="$store.getters.domainHost + value[0].src" style="object-fit: cover"
          class="rounded-circle" width="50" height="50" :alt="value[0].name" />
      </div>
    </template>
    <template slot="items.description" slot-scope="{ value }">
      {{ value.slice(0, 50) }} {{ value.length > 50 ? "..." : "" }}
    </template>
  </a-table>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { isAdmin, currentUserId } from "@core/util/auth";
export default {
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
        label: "description",
        field: "description",
        sortable: false,
      },
      {
        label: "price",
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
    ...mapGetters(['products']),
  },
  created() {
    if (isAdmin()) {
      this.getAllProducts();
    } else {
      this.getAllProducts(currentUserId());
    }
  },
  methods: {
    ...mapActions(["getAllProducts", "removeMultiProduct"]),
    details(row) {
      this.$router.replace("/admin/products/" + row.id);
    },
  },
};
</script>
