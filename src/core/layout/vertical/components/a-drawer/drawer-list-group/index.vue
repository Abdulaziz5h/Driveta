<template>
  <div v-if="isRoled">
    <b-list-group-item class="drawer-togglable" @click="isToggle = !isToggle">
      <i class="icon mdi" :class="'mdi-' + items.icon"></i>
      <span class="mr-auto">{{ $t("titles")[items.title] }}</span>
      <i
        class="icon mdi arrow"
        :class="'mdi-chevron-' + (isToggle ? 'up' : 'down')"
      ></i>
    </b-list-group-item>
    <div class="list-group-container" v-if="isToggle">
      <drawer-list-item-link
        v-for="(child, index) in items.children"
        :key="index"
        :item="child"
      ></drawer-list-item-link>
    </div>
  </div>
</template>

<script>
import { currentUserRole } from "@core/util/auth";
import drawerListItemLink from "./../drawer-list-item-link/index.vue";
export default {
  props: {
    items: Object,
  },
  data: () => ({
    isToggle: false,
  }),
  components: {
    drawerListItemLink,
  },
  computed: {
    isRoled() {
      return this.items.roles.indexOf(currentUserRole()) != -1;
    },
  },
};
</script>
