<template>
  <div>
    <ul class="d-flex tree-row w-100 header border-bottom-0 border">
      <li
        class="text-center node-tree p-3"
        :style="
          i != 0
            ? 'width: 220px!important'
            : 'flex-grow: 1; text-align: left!important; padding-left: 60px!important;'
        "
        v-for="(th, i) in header"
        :key="i"
      >
        {{ $t('category.table.columns')[th.label] }}
      </li>
      <li class="text-center node-tree p-3" style="width: 160px !important">
        {{$t('category.table.columns.detailscategory')}}
      </li>
      <li class="text-center node-tree p-3" style="width: 160px !important">
        {{$t('category.table.columns.newcategory')}}
      </li>
    </ul>
    <div class="tree border">
      <ul class="tree-list" v-if="treeData.length">
        <node-tree
          @sync="sync"
          @details="details"
          @add="add"
          v-for="(node, index) in treeData"
          :key="index"
          :level="1"
          :header="header"
          :node="node"
        ></node-tree>
      </ul>
      <h6 class="text-center py-3 m-0 title" v-else>
        {{$t('empty')}}
      </h6>
    </div>
  </div>
</template>

<script>
import NodeTree from "./NodeTree";

export default {
  props: {
    treeData: Array,
    header: Array,
  },
  components: {
    NodeTree,
  },
  methods: {
    sync(id) {
      this.$emit('sync', id)
    },
    details(node) {
      this.$emit('details', node)
    },
    add(node) {
      this.$emit('add', node)
    }
  }
};
</script>

<style lang="scss">
.tree {
  overflow: hidden;
  ul {
    padding-left: 0;
    list-style: none;
  }
}
.header {
  list-style: none;
  margin: 0;
  padding: 0;
}
.tree-list ul {
  padding: 0;
  margin: 0;
}
</style>
