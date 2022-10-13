<template>
  <a-activaitor @search="search" :placeholder="$t('settings.search')"></a-activaitor>
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
