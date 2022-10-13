<template>
  <a-activaitor
    :title="$t('store.add-store')"
    :placeholder="$t('store.search')"
    @ok='createStore'
    @search="search"
  >
  </a-activaitor>
</template>

<script>
import { nullGuid } from "@core/util/global/index.js";
export default {
  methods: {
    createStore() {
      this.$router.replace('/admin/stores/' + nullGuid)
    },
    search(query) { 
      this.$store.commit('Set_Search_Dto', {
        keys: ['name', "username"],
        query
      })
    }
  }  
}
</script>
