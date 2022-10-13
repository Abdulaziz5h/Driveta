<template>
  <validation-observer ref="observer">
    <a-dialog
      :isEdit="isEdit"
      ref="form"
      tag="form"
      @ok="submitForm"
      @close="resetForm"
      @delete="deleteCity(cityDto.id)"
      :title="!isEdit ? $t('city.create-new') : $t('city.update')"
    >
      <template #body>
        <a-input-text
          :label="$t('city.form.name.label')"
          v-model="cityDto.name"
          :rules="[{ type: 'required', message: $t('city.form.name.validation.required') }]"
          :placeholder="$t('city.form.name.placeholder')"
          name="name"
        />
        <a-input-select
          :label="$t('city.form.country.label')"
          v-model="cityDto.countryId"
          :options="countries"
          :rules="[{ type: 'required', message: $t('city.form.country.validation.required') }]"
          :placeholder="$t('city.form.country.placeholder')"
          name="country"
        />
      </template>
    </a-dialog>
  </validation-observer>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { nullGuid } from "@core/util/global/index.js";
export default {
  computed: {
    ...mapState({
      countries: (state) => state.setting.countries,
    })
  },
  data: () => ({
    cityDto: {
      id: nullGuid,
      name: "",
      countryId: null
    },
    isEdit: false,
  }),
  methods: {
    ...mapActions(["setCity", "getCityById", "updateCityById", "deleteCity", "deleteCities"]),
    submitForm() {
      this.$refs.observer.validate().then((success) => {
        if (success) {
          if(this.cityDto.id == nullGuid) {
            this.setCity(this.cityDto)
          } else {
            this.updateCityById(this.cityDto)
          }
          this.close();
        }
      });
    },
    resetForm() {
      this.$refs.observer.reset();
      Object.assign(this.cityDto, {
        id: nullGuid,
        name: "",
        countryId: null
      });
      this.isEdit = false;
    },
    delete(l) {
      this.deleteCities(l)
    },
    open(is, id) {
      this.$refs.form.open();
      this.isEdit = is;
      if(is) {
        this.getCityById({id, callback: (data) => {
          Object.assign(this.cityDto, data)
          this.$store.commit("Set_Main_Loading", false);
        }})
      }
    },
    close() {
      this.$refs.form.close();
    },
  },
};
</script>
