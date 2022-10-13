<template>
<div class="search">
  <a-input-text placeholder="search for products..." name="products search" />
</div>
</template>

<style scoped lang="scss">
.search {
  flex-grow: 1;
  max-width: 460px;
  margin-top: -4px;
  ::v-deep {
    .a-form-group {
      margin: 0;
      input {
        height: 61px;
      }
    }
  }
}
</style>