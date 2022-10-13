<template>
  <validation-observer ref="observer">
    <b-row>
      <b-col cols="12" class="d-flex mb-2 align-items-center">
        <a-back path="/admin/products" />
        <b-button variant="primary" size="sm" class="ml-auto px-4" @click="submit()">{{ $t("ok") }}</b-button>
        <b-button variant="danger" size="sm" v-if="!isAdd" @click="_removeProduct()" class="px-3 ml-2">{{ $t("delete")
        }}</b-button>
      </b-col>
      <b-col cols="12" md="6">
        <a-input-text label="اسم المنتج" name="name" placeholder="اكتب اسم المنتج هنا..." v-model="productDto.name" :rules="[
          {
            type: 'required',
            message: 'اسم المنتج مطلوب',
          },
        ]"></a-input-text>
        <a-input-text label="السعر" name="price" placeholder="اكتب السعر هنا..." type="number"
          v-model="productDto.price" :rules="[
            {
              type: 'required',
              message: 'السعر مطلوب',
            },
          ]"></a-input-text>
        <a-input-select label="التصنيف" textLabel="path" :options="categoryPathsListV2" name="categoryIds"
          placeholder="اختر تصنيف" v-model="productDto.categoryIds" :rules="[
            {
              type: 'required',
              message: 'التصنيف مطلوب',
            },
          ]" multiple></a-input-select>
      </b-col>
      <b-col cols="12" md="6">
        <a-input-file ref="files" required label="صورة المنتج" :value="productDto.documents"
          @input="productDto.files = $event" />
      </b-col>
      <b-col cols="12">
        <a-input-textarea label="الوصف" name="description" placeholder="اكتب الوصف هنا..." rows="8"
          v-model="productDto.description" :rules="[
            {
              type: 'required',
              message: 'الوصف مطلوب',
            },
            {
              type: 'max:116',
              message: 'لا يسمح اكثر من 116 محرف',
            },
          ]"></a-input-textarea>
      </b-col>
    </b-row>
  </validation-observer>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { nullGuid } from "@core/util/global";
import { currentUserId } from "@core/util/auth";
export default {
  props: {
    id: String,
  },
  computed: {
    ...mapState({
      categoryPathsListV2: (state) =>
        state["admin/categories"].categoryPathsListV2,
    }),
  },
  data: () => ({
    isEdit: false,
    productDto: {
      id: nullGuid,
      price: 0,
      name: "",
      description: "",
      storeId: currentUserId(),
      categories: [],
      categoryIds: [],
      files: [],
      documentIds: [],
      documents: [],
    },
  }),
  created() {
    this.isAdd = this.id == nullGuid;
    if (!this.isAdd) {
      this.getProductById({
        id: this.id,
        callback: ({ data }) => {
          Object.assign(this.productDto, data);
          this.productDto.categoryIds = data.categories;
          this.$store.commit("Set_Main_Loading", false);
        },
      });
    }
    this.getTreePathsV2();
  },
  methods: {
    ...mapActions([
      "createProduct",
      "getProductById",
      "getTreePathsV2",
      "updateProduct",
      "removeProduct",
    ]),
    submit() {
      this.$refs.observer.validate().then((success) => {
        if (success && (this.productDto.documents.length || this.productDto.files.length)) {
          if (this.isAdd) {
            this.createProduct({
              dto: this.productDto,
              callback: this.reset,
            });
          } else {
            this.updateProduct({
              dto: this.productDto,
              callback: ({ data }) => {
                Object.assign(this.productDto, data);
                this.productDto.categoryIds = data.categories;
                this.$store.commit("Set_Main_Loading", true);
              },
            });
          }
        }
      });
    },
    _removeProduct() {
      this.removeProduct({
        id: this.id,
        callback: () => {
          this.$router.replace("/admin/products");
        },
      });
    },
    reset() {
      this.$refs.observer.reset();
      this.$refs.files.clear();
      Object.assign(this.productDto, {
        id: nullGuid,
        price: 0,
        name: "",
        description: "",
        storeId: currentUserId(),
        categories: [],
        categoryIds: [],
        files: [],
        documentIds: [],
        documents: [],
      });
      this.$store.commit("Set_Main_Loading", true);
    },
  },
};
</script>
