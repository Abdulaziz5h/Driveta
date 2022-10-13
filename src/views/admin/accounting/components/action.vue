<template>
  <a-activaitor :title="isAdmin() && !selectedUser ? 'إضافة فاتورة' : ''" placeholder="ابحث عن فاتورة..." @ok="AddNew" @search="search">
  </a-activaitor>
</template>

<script>
import { isAdmin } from "@core/util/auth";
import { nullGuid } from "../../../../core/util/global";
export default {
  props: {
    id: String
  },
  computed: {
    selectedUser() {
      return this.$route.name == 'admin owners invoices group' || this.$route.name == 'admin drivers invoices group'
    }
  },
  methods: {
    isAdmin,
    AddNew() {
      this.$route.name.includes('owner') ? this.$router.push('/admin/owners/' + this.id + '/invoices/' + nullGuid) :
      this.$router.push('/admin/drivers/' + this.id + '/invoices/' + nullGuid)
    },
    search(query) {
      this.$store.commit('Set_Search_Dto', {
        keys: ['name', 'userName'],
        query
      })
    }
  },
};
</script>
