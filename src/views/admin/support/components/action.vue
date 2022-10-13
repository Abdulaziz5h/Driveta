<template>
  <a-activaitor placeholder="ابحث في رسائل الدعم..." @search="search"></a-activaitor>
</template>

<script>
export default {
  methods: {
    search(query) {
      this.$store.commit('Set_Search_Dto', {
        keys: ['userName', 'email', 'phoneNumber', 'description'],
        query
      })
    }
  },
};
</script>
