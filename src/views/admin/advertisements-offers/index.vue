<template>
  <div>
    <a-table :title="$t('advertisement.table.title')" :items="advertisements" :columns="adsColumns" no_footer
      @details="details($event.row.id, 1)" @delete-selected="deleteSelectedAds">
      <template slot="headers" slot-scope="{ props }">
        <template v-if="props.column.field != 'details'">
          {{ $t("advertisement.table.columns")[props.column.field] }}
        </template>
        <template v-else>
          <div class="text-center">
            {{ $t("details") }}
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    adsColumns: [
      {
        label: "title",
        field: "title",
      },
      {
        label: "description",
        field: "description",
      },
      {
        label: "details",
        field: "details",
        sortable: false,
      },
    ],
    OfferColumns: [
      {
        label: "title",
        field: "name",
      },
      {
        label: "details",
        field: "details",
        sortable: false,
      },
    ],
  }),
  computed: {
    ...mapGetters(["advertisements", "offers"]),
  },
  mounted() {
    this.fetch();
  },
  methods: {
    ...mapActions([
      "getAdvertisements",
      "getOffers",
      "deleteAdvertisements",
      "deleteOffers",
    ]),
    fetch() {
      if (this.type()) this.getAdvertisements();
      else this.getOffers();
    },
    details(e, type) {
      if (type)
        this.$router.replace(
          "/admin/advertisements/" + e
        );
      else this.$router.replace("/admin/advertisements-offers/offers/" + e);
    },
    deleteSelectedAds(e) {
      this.deleteAdvertisements(e);
    },
    deleteSelectedOffers(e) {
      this.deleteOffers(e);
    },
    type() {
      return this.$route.name.indexOf("offers") == -1;
    },
  },
  watch: {
    $route() {
      this.fetch();
    },
  },
  beforeDestroy() {
    this.$store.commit("Reset_Search_Dto");
  },
};
</script>
