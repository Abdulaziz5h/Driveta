<template>
  <b-list-group-item class="list-item-header" v-if="item.header && isRoled">
    <span>{{ $t("titles")[item.header] }}</span>
    <i class="mdi mdi-dots-horizontal"></i>
  </b-list-group-item>
  <drawer-list-group
    v-else-if="item.children"
    :items="item"
  ></drawer-list-group>
  <drawer-list-item-link v-else :item="item"></drawer-list-item-link>
</template>
<script>
import drawerListGroup from "./../drawer-list-group/index.vue";
import drawerListItemLink from "./../drawer-list-item-link/index.vue";
import { currentUserRole } from "@core/util/auth";
export default {
  props: {
    item: Object,
  },
  components: {
    drawerListGroup,
    drawerListItemLink,
  },
  computed: {
    isRoled() {
      return this.item.roles?.indexOf(currentUserRole()) != -1;
    },
  },
};
</script>
