<template>
  <validation-observer ref="observer">
    <a-dialog :isEdit="isEdit" ref="form" tag="form" @ok="submitForm" @close="resetForm"
      @delete="deleteArea(areaDto.id)" :title="!isEdit ? $t('area.create-new') : $t('area.update')">
      <template #body>
        <a-input-text :label="$t('area.form.name.label')" v-model="areaDto.name"
          :rules="[{ type: 'required', message: $t('area.form.name.validation.required') }]"
          :placeholder="$t('area.form.name.placeholder')" name="name" />
        <a-input-select :label="$t('area.form.city.label')" v-model="areaDto.cityId" :options="cities"
          :rules="[{ type: 'required', message: $t('area.form.city.validation.required') }]"
          :placeholder="$t('area.form.city.placeholder')" name="city" />
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
      cities: (state) => state.setting.cities,
    })
  },
  data: () => ({
    areaDto: {
      id: nullGuid,
      name: "",
      cityId: null
    },
    isEdit: false,
  }),
  methods: {
    ...mapActions(["setArea", "getAreaById", "updateAreaById", "deleteArea", "deleteAreas"]),
    submitForm() {
      this.$refs.observer.validate().then((success) => {
        if (success) {
          if (this.areaDto.id == nullGuid) {
            this.setArea(this.areaDto)
          } else {
            this.updateAreaById(this.areaDto)
          }
          this.close();
        }
      });
    },
    resetForm() {
      this.$refs.observer.reset();
      Object.assign(this.areaDto, {
        id: nullGuid,
        name: "",
        cityId: null
      });
      this.isEdit = false;
    },
    delete(l) {
      this.deleteAreas(l)
    },
    open(is, id) {
      this.$refs.form.open();
      this.isEdit = is;
      if (is) {
        this.getAreaById({
          id, callback: (data) => {
            Object.assign(this.areaDto, data)
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
