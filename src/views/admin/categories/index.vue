<template>
  <div>
    <a-tree
      @sync="getCategoriesLevel"
      @details="categoryDetails"
      @add="addcategory"
      :treeData="activeTree"
      :header="header"
    ></a-tree>
    <div class="py-2 d-flex">
      <a-pagination class="mx-auto" :pageLength="6" :items="rootTree.categoryChildrens" v-model="activeTree"></a-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { categoryDetailsEvent, addCategoryEvent } from "@/libs/global-event";
export default {
  data: () => ({
    activeTree: [],
    header: [
      {
        label: "category",
        value: "name",
      },
    ],
  }),
  computed: {
    ...mapState({
      rootTree: (state) => state['admin/categories'].rootTree,
    }),
  },
  created() {
    this.$store.commit('Reset_Tree');
    this.getCategoriesLevel();
  },
  methods: {
    ...mapActions(["getCategoriesLevel"]),
    categoryDetails(category) {
      categoryDetailsEvent(category);
    },
    addcategory(cat) {
      addCategoryEvent(cat.id);
    },
  },
};
</script>
