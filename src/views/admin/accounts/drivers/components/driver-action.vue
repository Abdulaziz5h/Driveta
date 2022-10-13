<template>
  <a-activaitor :title="$t('driver.create-new')" :placeholder="$t('driver.search')" @search="search" @ok="add()"/>
</template>

<script>
import { nullGuid } from "@core/util/global/index.js";
export default {
  methods: {
    add() {
      this.$router.replace('/admin/drivers/' + nullGuid)
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