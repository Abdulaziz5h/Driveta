<template>
  <validation-observer ref="observer">
    <form @submit.prevent>
      <b-row>
        <b-col cols="12" class="d-flex mb-2">
          <a-back path="/admin/advertisements-offers/advertisements" />
          <b-button
            type="submit"
            class="px-4 ml-auto mr-2"
            size="sm"
            variant="primary"
            @click="submitForm"
            >{{ $t("ok") }}</b-button
          >
          <b-button
            variant="danger"
            size="sm"
            class="px-3"
            @click="deleteAdsLocal"
            >{{ $t("delete") }}</b-button
          >
        </b-col>
        <b-col cols="12">
          <a-input-text
            :label="$t('advertisement.form.title.label')"
            :placeholder="$t('advertisement.form.title.placeholder')"
            :rules="[
              {
                type: 'required',
                message: $t('advertisement.form.title.validation.required'),
              },
            ]"
            name="title"
            v-model="adsDto.title"
          />
        </b-col>
        <b-col cols="12">
          <a-input-textarea
            :label="$t('advertisement.form.description.label')"
            :placeholder="$t('advertisement.form.description.placeholder')"
            :rules="[
              {
                type: 'required',
                message: $t(
                  'advertisement.form.description.validation.required'
                ),
              },
            ]"
            name="description"
            v-model="adsDto.description"
          />
        </b-col>
        <b-col cols="12">
          <a-input-file
            ref="file"
            required
            :label="$t('advertisement.form.files.label')"
            :value="adsDto.documents"
            @input="adsDto.files = $event"
          />
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
    adsDto: {
      id: nullGuid,
      title: "",
      description: "",
      documents: [],
      files: [],
    },
  }),
  mounted() {
    if (this.id == nullGuid) {
      this.resetForm();
    } else {
      this.getAdvertisementById({
        id: this.id,
        callback: (data) => {
          Object.assign(this.adsDto, data);
        },
      });
    }
  },
  methods: {
    ...mapActions([
      "getAdvertisementById",
      "setAdvertisement",
      "updateAdvertisementById",
      "deleteAdvertisement",
    ]),
    submitForm() {
      this.$refs.observer.validate().then((success) => {
        if (success && (this.adsDto.documents.length || this.adsDto.files.length)) {
          if (this.adsDto.id == nullGuid) {
            this.setAdvertisement({
              dto: this.adsDto,
              callback: this.resetForm,
            });
          } else {
            this.updateAdvertisementById({
              dto: this.adsDto,
              callback: ({ data }) => {
                Object.assign(this.adsDto, data);
                this.$refs.file.clear();
              },
            });
          }
        }
      });
    },
    resetForm() {
      this.$refs.observer.reset();
      Object.assign(this.adsDto, {
        id: nullGuid,
        title: "",
        description: "",
        documents: [],
        files: [],
      });
      this.$refs.file.clear();
    },
    deleteAdsLocal() {
      this.deleteAdvertisement({
        id: this.adsDto.id,
        callback: () => {
          this.$router.replace("/admin/advertisements-offers/advertisements");
        },
      });
    },
  },
};
</script>
