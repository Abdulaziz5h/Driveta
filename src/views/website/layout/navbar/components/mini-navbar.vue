<template>
  <nav class="mini-nav nav border-bottom">
    <b-container class="d-flex">
      <ul class="list-unstyled p-0 m-0 menu py-1">
        <li>
          <router-link to="/about" custom v-slot="{ href, navigate, isActive, isExactActive }">
            <a class="text-secondary" :href="href" @click="navigate" :class="{ active: isActive, isExactActive }">about us</a>
          </router-link>
        </li>
        <li>
          <router-link to="/account" custom v-slot="{ href, navigate, isActive, isExactActive }">
            <a class="text-secondary" :href="href" @click="navigate" :class="{ active: isActive, isExactActive }">my account</a>
          </router-link>
        </li>
      </ul>
      <div class="flex-grow-1 d-flex align-items-center">
        <p class="m-0 text-center w-100">
          Secure delivery without contacting the courier
        </p>
      </div>
      <ul class="list-unstyled p-0 m-0 menu border-left ml-auto py-1">
        <li>
          <language />
        </li>
      </ul>
    </b-container>
  </nav>
</template>
<script>
export default {
};
</script>
<style lang="scss" scoped>
.mini-nav {
  font-size: 12px;
  .menu {
    display: flex;
    align-items: center;
    li {
      text-transform: capitalize;
      white-space: nowrap;
    }
    &:first-of-type {
      li {
        padding-right: 10px;
      }
    }
    &:last-of-type {
      li {
        padding-left: 10px;
      }
    }
    a {
      font-weight: bold;
      padding: 2px 12px 3px;
      border-radius: 6px;
      vertical-align: middle;
    }
    .active {
      color: var(--primary);
      background: #4f2b8530;
    }
    .btn {
      font-size: 12px;
      text-transform: capitalize;
    }
  }
}
</style>
