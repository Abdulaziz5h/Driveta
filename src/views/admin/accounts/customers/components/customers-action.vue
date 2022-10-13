<template>
  <a-activaitor :placeholder="$t('customer.search')" @search="search"/>
</template>

<script>
export default {
  methods: {
    search(query) { 
      this.$store.commit('Set_Search_Dto', {
        keys: ['name'],
        query
      })
    }
  }
}
</script>