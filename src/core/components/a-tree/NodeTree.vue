<template>
  <div class="w-100">
    <ul
      class="list-unstyled p-0 m-0 d-flex pl-3 w-100 border tree-node-container"
    >
      <li
        v-for="(lev, index) in level"
        :key="index"
        class="p-3"
        :class="{ 'tree-node-before': index == level - 1 }"
      ></li>
      <li
        class="node-tree py-2 px-3 position-relative"
        :style="
          i != 0
            ? 'width: 220px!important; text-align: center;'
            : 'flex-grow: 1'
        "
        v-for="(th, i) in header"
        :key="'before' + level * i"
      >
        <transition name="fade">
          <div>
            <b-button
              v-if="i == 0 && !node.categoryChildrens && node.hasChildren"
              variant="light"
              size="sm"
              class="rounded-circle tree-sync-btn"
              @click="
                node.categoryChildrens = [];
                sync(node.id);
              "
            >
              <i class="mdi mdi-sync"></i>
            </b-button>
            <b-button
              v-else-if="i == 0 && node.hasChildren"
              size="sm"
              variant="light"
              class="rounded-circle tree-collapse-btn"
              style="margin: auto"
              @click="isColapced = !isColapced"
            >
              <i
                :class="
                  'mdi mdi-' + (isColapced ? 'chevron-down' : 'chevron-up')
                "
              ></i>
            </b-button>
          </div>
        </transition>
        {{ node[th.value] }}
      </li>
      <li
        class="node-tree d-flex align-items-center"
        style="width: 160px !important; text-align: center"
      >
        <b-button
          variant="light"
          class="btn-icon rounded-circle action-btn"
          size="sm"
          style="margin: auto"
          @click="details(node)"
        >
          <i class="mdi mdi-pencil"></i>
        </b-button>
      </li>
      <li
        class="node-tree d-flex align-items-center"
        style="width: 160px !important; text-align: center"
      >
        <b-button
          variant="light"
          size="sm"
          class="btn-icon rounded-circle action-btn"
          style="margin: auto"
          @click="add(node)"
        >
          <i class="mdi mdi-plus"></i>
        </b-button>
      </li>
    </ul>
    <template v-if="node.categoryChildrens && node.categoryChildrens.length">
      <template class="pr-3" v-for="(child, index) in node.categoryChildrens">
        <transition name="fade" :key="index">
          <node
            @sync="sync"
            @details="details"
            @add="add"
            v-show="isColapced"
            :level="level + 1"
            :header="header"
            :node="child"
          ></node>
        </transition>
      </template>
    </template>
  </div>
</template>

<script>
import { BButton } from "bootstrap-vue";
export default {
  name: "node",
  components: {
    BButton,
  },
  props: {
    node: Object,
    header: Array,
    level: Number,
  },
  data: () => ({
    isColapced: false,
  }),
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

<style lang="scss" scoped>
.tree-node-container {
  .tree-node-before {
    position: relative;
    &:before {
      background: rgba(0, 0, 0, 0.375);
      height: 102%;
      width: 1px;
      content: "";
      position: absolute;
      top: 0;
      left: 14px;
      transform: translateY(-50%);
    }
    &:after {
      background: rgba(0, 0, 0, 0.375);
      height: 1px;
      width: 28px;
      content: "";
      position: absolute;
      top: 50%;
      left: 14px;
      transform: translateY(-50%);
    }
  }
}
.last-item-child {
  background: blue;
}
.tree-sync-btn {
  position: absolute;
  transform: translate(-130%, -8px) scale(0.8);
  font-size: 20px;
  padding: 9px;
  z-index: 1;
}
.tree-collapse-btn {
  position: absolute;
  transform: translate(-130%, -8px) scale(0.8);
  font-size: 20px;
  padding: 9px;
  z-index: 1;
}
.action-btn {
  transform: scale(0.8);
  font-size: 20px;
  padding: 9px;
}
.btn i {
  line-height: 1;
}
</style>
