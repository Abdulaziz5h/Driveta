<template>
  <validation-observer ref="observer">
    <a-dialog
      :isEdit="isEdit"
      ref="form"
      tag="form"
      @ok="submitForm"
      @close="resetForm"
      @delete="deleteModel(modelDto.id)"
      :title="!isEdit ? $t('model.create-new') : $t('model.update')"
    >
      <template #body>
        <a-input-text
          :label="$t('model.form.name.label')"
          v-model="modelDto.name"
          :rules="[{ type: 'required', message: $t('model.form.name.validation.required') }]"
          :placeholder="$t('model.form.name.placeholder')"
          name="name"
        />
        <div>
          <a-input-datepicker
            :label="$t('model.form.date.label')"
            no-header
            placeholder="اختر التاريخ"
            name="date"
            type="year"
            :min="new Date(1970)"
            :max="new Date()"
            v-model="modelDto.date"
          />
        </div>
      </template>
    </a-dialog>
  </validation-observer>
</template>

<script>
import { mapActions } from "vuex";
import { nullGuid } from "@core/util/global/index.js";
export default {
  data: () => ({
    modelDto: {
      id: nullGuid,
      name: "",
      date: new Date()
    },
    isEdit: false,
  }),
  methods: {
    ...mapActions(["setModel", "getModelById", "updateModelById", "deleteModel", "deleteModels"]),
    submitForm() {
      this.$refs.observer.validate().then((success) => {
        if (success) {
          if(this.modelDto.id == nullGuid) {
            this.modelDto.date = new Date(this.modelDto.date)
            this.setModel(this.modelDto)
          } else {
            this.modelDto.date = new Date(this.modelDto.date)
            this.updateModelById(this.modelDto)
          }
          this.close();
        }
      });
    },
    resetForm() {
      this.$refs.observer.reset();
      Object.assign(this.modelDto, {
        id: nullGuid,
        name: "",
      date: new Date()
      });
      this.isEdit = false;
    },
    delete(l) {
      this.deleteModels(l)
    },
    open(is, id) {
      this.$refs.form.open();
      this.isEdit = is;
      if(is) {
        this.getModelById({id, callback: (data) => {
          Object.assign(this.modelDto, data)
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
