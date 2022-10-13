<template>
  <validation-observer ref="observer">
    <a-dialog :isEdit="isEdit" ref="form" tag="form" @ok="submitForm" @close="resetForm"
      @delete="deleteCountry(countryDto.id)" :title="!isEdit ? $t('country.create-new') : $t('country.update')">
      <template #body>
        <a-input-text :label="$t('country.form.name.label')" v-model="countryDto.name"
          :rules="[{ type: 'required', message: $t('country.form.name.validation.required') }]"
          :placeholder="$t('country.form.name.placeholder')" name="name" />
      </template>
    </a-dialog>
  </validation-observer>
</template>

<script>
import { mapActions } from "vuex";
import { nullGuid } from "@core/util/global/index.js";
export default {
  data: () => ({
    countryDto: {
      id: nullGuid,
      name: "",
    },
    isEdit: false,
  }),
  methods: {
    ...mapActions(["setCountry", "getCountryById", "updateCountryById", "deleteCountry", "deleteCountries"]),
    submitForm() {
      this.$refs.observer.validate().then((success) => {
        if (success) {
          if (this.countryDto.id == nullGuid) {
            this.setCountry(this.countryDto)
          } else {
            this.updateCountryById(this.countryDto)
          }
          this.close();
        }
      });
    },
    resetForm() {
      this.$refs.observer.reset();
      Object.assign(this.countryDto, {
        id: nullGuid,
        name: "",
      });
      this.isEdit = false;
    },
    delete(l) {
      this.deleteCountries(l)
    },
    open(is, id) {
      this.$refs.form.open();
      this.isEdit = is;
      if (is) {
        this.getCountryById({
          id, callback: (data) => {
            Object.assign(this.countryDto, data)
            this.$store.commit("Set_Main_Loading", false);
          }
        })
      }
    },
    close() {
      this.$refs.form.close();
    },
  },
};
</script>
