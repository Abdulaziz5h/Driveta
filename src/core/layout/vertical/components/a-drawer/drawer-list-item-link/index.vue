<template>
  <router-link
    v-if="isRoled"
    v-slot="{ isActive, href, navigate }"
    :key="item.title"
    custom
    class="drawer-list-item-link"
    :to="item.to ? item.to : ''"
  >
    <a :href="href" @click="navigate">
      <b-list-group-item :class="{ active: isActive }">
        <i class="icon mdi" :class="'mdi-' + item.icon"></i>
        <span>{{ $t('titles')[item.title] }}</span>
      </b-list-group-item>
    </a>
  </router-link>
</template>
<script>
  import { currentUserRole } from "@core/util/auth";
  export default {
    props: {
      item: Object,
    },
    computed: {
      isRoled() {
        return this.item.roles.indexOf(currentUserRole()) != -1;
      },
    },
  };
</script>
