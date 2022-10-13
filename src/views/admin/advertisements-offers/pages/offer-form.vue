<template>
  <validation-observer ref="observer">
    <form @submit.prevent>
      <b-row>
        <b-col cols="12" class="d-flex mb-2">
          <a-back path="/admin/advertisements-offers/offers" />
          <b-button
            type="submit"
            class="px-4 ml-auto mr-2"
            size="sm"
            variant="primary"
            >{{ $t("ok") }}</b-button
          >
          <b-button variant="danger" size="sm" class="px-3">{{
            $t("delete")
          }}</b-button>
        </b-col>
      </b-row>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions } from "vuex";
import { nullGuid } from "@core/util/global/index.js";
export default {
  props: {
    id: String,
  },
  data: () => ({
    nullGuid,
    isEdit: false,
    offerDto: {
      id: "",
      file: [],
      OfferDetails: [],
      name: "",
      note: "",
      startDate: new Date(),
      endDate: new Date(),
      price: 0,
      rate: 0,
    },
  }),
  created() {
    this.isEdit = this.id != nullGuid;
    if (this.isEdit) {
      this.getOfferById({
        id: this.id,
        callback: ({ data }) => {
          Object.assign(this.offerDto, data);
          this.$store.commit("Set_Main_Loading", false);
        },
      });
    }
  },
  methods: {
    ...mapActions(["getOfferById"]),
  },
};
</script>
