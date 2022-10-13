<template>
  <validation-observer ref="observer">
    <a-dialog :isEdit="isEdit" ref="form" tag="form" @ok="submitForm" @close="resetForm"
      @delete="deleteStreet(streetDto.id)" :title="!isEdit ? $t('street.create-new') : $t('street.update')">
      <template #body>
        <a-input-text :label="$t('street.form.name.label')" v-model="streetDto.name"
          :rules="[{ type: 'required', message: $t('street.form.name.validation.required') }]"
          :placeholder="$t('street.form.name.placeholder')" name="name" />
        <a-input-select :label="$t('street.form.area.label')" v-model="streetDto.areaId" :options="areas"
          :rules="[{ type: 'required', message: $t('street.form.area.validation.required') }]"
          :placeholder="$t('street.form.area.placeholder')" name="area" />
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
      areas: (state) => state.setting.areas,
    })
  },
  data: () => ({
    streetDto: {
      id: nullGuid,
      name: "",
      areaId: null
    },
    isEdit: false,
  }),
  methods: {
    ...mapActions(["setStreet", "getStreetById", "updateStreetById", "deleteStreet", "deleteStreets"]),
    submitForm() {
      this.$refs.observer.validate().then((success) => {
        if (success) {
          if (this.streetDto.id == nullGuid) {
            this.setStreet(this.streetDto)
          } else {
            this.updateStreetById(this.streetDto)
          }
          this.close();
        }
      });
    },
    resetForm() {
      this.$refs.observer.reset();
      Object.assign(this.streetDto, {
        id: nullGuid,
        name: "",
        areaId: null
      });
      this.isEdit = false;
    },
    delete(l) {
      this.deleteStreets(l)
    },
    open(is, id) {
      this.$refs.form.open();
      this.isEdit = is;
      if (is) {
        this.getStreetById({
          id, callback: (data) => {
            Object.assign(this.streetDto, data)
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
