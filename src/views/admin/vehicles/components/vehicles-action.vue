<template>
  <a-activaitor :title="$t('vehicle.create-new')" :placeholder="$t('vehicle.search')" @search="search" @ok="add()"/>
</template>

<script>
import { nullGuid } from "@core/util/global/index.js";
export default {
  methods: {
    add() {
      this.$router.replace('/admin/vehicles/' + nullGuid)
    },
    search(query) { 
      this.$store.commit('Set_Search_Dto', {
        keys: ['name', 'vehicleNumber', 'driverName', 'ownerName', 'modelName'],
        query
      })
    }
  }
}
</script>