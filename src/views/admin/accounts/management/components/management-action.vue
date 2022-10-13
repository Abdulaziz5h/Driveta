<template>
  <a-activaitor :title="$t('management.create-new')" :placeholder="$t('management.search')" @search="search" @ok="add()"/>
</template>

<script>
import { nullGuid } from "@core/util/global/index.js";
export default {
  methods: {
    add() {
      this.$router.replace('/admin/management/' + nullGuid)
    },
    search(query) { 
      this.$store.commit('Set_Search_Dto', {
        keys: ['name', 'userName'],
        query
      })
    }
  }
}
</script>