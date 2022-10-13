<template>
  <div class="drawer-list-container">
    <div class="brand">
      <a-logo-primary width="50" />
    </div>
    <VuePerfectScrollbar class="scroll-area">
      <b-list-group class="drawer-list">
        <drawer-list-item
          v-for="(item, index) in items"
          :key="index"
          :item="item"
        ></drawer-list-item>
      </b-list-group>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import drawerListItem from "./../drawer-list-item/index.vue";
export default {
  props: {
    items: Array,
  },
  components: {
    drawerListItem,
    VuePerfectScrollbar,
  },
  data: () => ({}),
};
</script>
