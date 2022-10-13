<template>
 <div class="a-dropdown" size="sm" right variant="flat">
    <div class="activaitor" @mouseenter="active = true" @mouseleave="active = false">
      <slot name="activaitor" :active="active">
        {{title}}
      </slot>
    </div>
    <div class="dropdown-body"
      @mouseenter="active = true"
      @mouseleave="active = false"
      :class="{active}"
      v-if="items"
      :style="'min-width:' + minWidth + 'px;' +
        (right ? 'right: 0; left: auto;' : 'right: auto; left: 0;')">
      <div class="border dropdown-body-content">
        <slot :items="items">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    right: Boolean,
    minWidth: {
      type: String,
      default: () => '200'
    },
    items: {
      type: Array,
      require: true
    }
  },
  data: () => ({
    active: false
  })
}
</script>

<style scoped lang="scss">
.a-dropdown {
  position: relative;
  .title {
    font-size: 18px;
  }
  .dropdown-body {
    padding-top: 12px;
    transition: .4s;
    position: absolute;
    top: calc(100%);
    z-index: 100;
    transform: translate(0, -60px)!important;
    left: 0;
    opacity: 0;
    visibility: hidden;
    &.active {
      transform: translate(0, 0)!important;
      opacity: 1;
      visibility: visible;
    }
    .dropdown-body-content {
      background: #fff;
      border-radius: 4px;
      box-shadow: 0px 5px 10px rgb(62 68 90 / 10%);
    }
  }
  .activaitor {
    cursor: pointer;
  }
}
</style>