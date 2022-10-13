<template>
  <a-drop-down :items="['usd', 'atr']" right title="usd" minWidth="90">
    <template slot="activaitor">
      <b-button size="sm" class="active-currancy" variant="outline-secondary">
        {{currancy}}
      </b-button>
    </template>
    <template slot="default" slot-scope="{items}">
      <span class="currancy-dropdown">
        <b-dropdown-item @click="setCurrancy(item)" v-for="(item, i) in items" :key="i">
          {{item}}
        </b-dropdown-item>
      </span>
    </template>
  </a-drop-down>
</template>

<script>
export default {
  data: () => ({
    currancy: null
  }),
  methods: {
    setCurrancy(item) {
      this.currancy = item
    }
  }  
}
</script>

<style lang="scss" scoped>
.active-currancy {
  text-transform: uppercase;
  font-size: 12px
}
.currancy-dropdown {
  ::v-deep {
    li {
      text-transform: uppercase;
      font-size: 12px;
      a:hover {
        background: transparent;
        color: var(--primary);
        text-shadow: 0 0 1px var(--primary);
      }
    }
  }
}
</style>
