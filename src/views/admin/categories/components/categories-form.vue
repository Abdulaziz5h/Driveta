<template>
  <validation-observer ref="observer">
    <a-dialog :isEdit="isEdit" ref="form" tag="form" @ok="submitForm" @close="resetForm"
      @delete="localeDeleteCategory(categoryDto.id)" :btn_title="$t('category.create-new')"
      :title="!isEdit ? $t('category.create-new') : $t('category.update')">
      <!-- :placeholder="$t('category.search')" -->
      <template #body>
        <a-input-text :label="$t('category.form.name.label')" v-model="categoryDto.name" :rules="[
          {
            type: 'required',
            message: $t('category.form.name.validation.required'),
          },
        ]" :placeholder="$t('category.form.name.placeholder')" name="name" />
        <a-input-file ref="file" required :label="$t('advertisement.form.files.label')" :value="categoryDto.documents"
          @input="categoryDto.files = $event" />
      </template>
    </a-dialog>
  </validation-observer>
</template>

<script>
import { mapActions } from "vuex";
import { nullGuid } from "@core/util/global/index.js";
import { onCategoryDetailsEvent, onAddCategoryEvent } from "@/libs/listeners";
export default {
  data: () => ({
    categoryDto: {
      id: nullGuid,
      name: "",
      parentCategoryId: null,
      documents: [],
      files: [],
    },
    nullGuid,
    isEdit: false
  }),
  mounted() {
    onCategoryDetailsEvent((payload) => {
      this.$refs.form.open();
      this.isEdit = true;
      Object.assign(this.categoryDto, {
        id: payload.id,
        name: payload.name,
        parentCategoryId: payload.parentId,
        documents: [...payload.documents],
        files: []
      });
    });
    onAddCategoryEvent((id) => {
      this.$refs.form.open();
      this.categoryDto.parentCategoryId = id;
    });
  },
  methods: {
    ...mapActions([
      "setCategory",
      "getCategoryById",
      "modifyCategory",
      "deleteCategory"
    ]),
    submitForm() {
      this.$refs.observer.validate().then((success) => {
        if (success && (this.categoryDto.documents.length || this.categoryDto.files.length)) {
          if (this.categoryDto.id == nullGuid) {
            this.setCategory({
              dto: this.categoryDto,
              callback: ({ data }) => {
                this.$store.commit('Insert_Category', [{
                  id: data.id,
                  documents: data.documents,
                  name: data.name,
                  parentId: data.parentCategoryId,
                  hasChildren: false,
                  categoryChildrens: null
                }])
              },
            });
          } else {
            this.modifyCategory({
              dto: this.categoryDto,
              callback: async ({ data }) => {
                this.$store.commit('Update_Category', {
                  id: data.id,
                  name: data.name,
                  documents: data.documents,
                  categoryChildrens: null,
                  hasChildren: data.hasChildren,
                  parentId: data.parentCategoryId,
                })
              }
            });
          }
          this.close();
        }
      });
    },
    localeDeleteCategory(id) {
      this.deleteCategory({
        id,
        callback: () => {
          this.$store.commit('Delete_Category', id)
        }
      })
    },
    resetForm() {
      this.$refs.observer.reset();
      Object.assign(this.categoryDto, {
        id: nullGuid,
        name: "",
        parentCategoryId: null,
        documents: [],
        files: [],
        parentId: null,
        hasChildren: false,
        categoryChildrens: null
      });
      this.isEdit = false;
      this.$refs.file.clear();
    },
    close() {
      this.$refs.form.close();
    },
  },
};
</script>
