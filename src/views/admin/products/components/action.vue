<template>
  <a-activaitor :title="!isAdmin() ? 'إضافة منتج' : ''" placeholder="ابحث في المنتجات..." @ok="AddNew"
    @search="search"></a-activaitor>
</template>

<script>
import { isAdmin } from "@core/util/auth";
export default {
  methods: {
    isAdmin,
    AddNew() {
      this.$router.replace("/admin/products/create");
    },
    search(query) {
      this.$store.commit('Set_Search_Dto', {
        keys: ['name', 'description', 'price'],
        query
      })
    }
  },
};
</script>
