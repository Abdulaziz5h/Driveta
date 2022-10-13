<template>
<div>
  <a-activaitor
    :placeholder="$t('advertisement-offer.search')"
    @search="search"
  >
      <b-button class="text-nowrap px-3" size="sm" variant="primary" @click="$router.replace('/admin/advertisements/' + nullGuid)">{{$t('advertisement.create-new')}}</b-button>
  </a-activaitor>
</div>
</template>

<script>
import { nullGuid } from "@core/util/global/index.js";
export default {
  data: () => ({
    nullGuid
  }),
  methods: {
    search(query) { 
      this.$store.commit('Set_Search_Dto', {
        keys: ['title'],
        query
      })
    }
  }
};
</script>
