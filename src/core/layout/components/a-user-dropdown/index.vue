<template>
  <a-drop-down :right="$store.state.app.isRTL" :items="['titles.profile', 'auth.log-out']" class="drop-down">
    <template slot="activaitor">
      <div class="d-flex align-items-center">
        <b-avatar v-bind="$attrs" :variant="variant" :src="
          userData.personalImage
            ? $store.getters.domainHost + userData.personalImage
            : src
        ">
          <template slot="badge">
            <slot name="badge"></slot>
          </template>
        </b-avatar>
        <div class="ml-2 d-none d-md-block">
          <p class="
              mt-1
              m-0
              title
              d-flex
              flex-column
              justify-content-center
              align-self-end
            " style="line-height: 1; font-size: 12px">
            {{ userData.name }}
          </p>
          <small class="text-secondary">
            {{ $t(currentUserRole) }}
          </small>
        </div>
      </div>
    </template>
    <template slot="default" slot-scope="{ items }">
      <b-list-group>
        <b-list-group-item class="py-2 d-md-none">
          <p class="
              m-0
              mt-1
              title
              d-flex
              flex-column
              justify-content-center
              align-self-end
            " style="line-height: 1; font-size: 12px">
            {{ userData.name }}
          </p>
          <small class="text-secondary">
            {{ currentUserRole }}
          </small>
        </b-list-group-item>
        <b-list-group-item v-if="isAdmin || isCustomer" class="
            text-capitalize
            py-2
            d-flex
            align-items-center
            justify-content-between
          " :to="
            isAdmin
              ? '/admin/management/' + currentUserId
              : '/profile/' + currentUserId
          " style="cursor: pointer; font-size: 14px">
          {{ $t(items[0]) }} <i class="mdi mdi-account mdi-18px"></i>
        </b-list-group-item>
        <b-list-group-item class="
            text-capitalize
            py-2
            d-flex
            align-items-center
            justify-content-between
          " style="cursor: pointer; font-size: 14px" @click="logout">
          {{ $t(items[1]) }} <i class="mdi mdi-logout mdi-18px"></i>
        </b-list-group-item>
      </b-list-group>
    </template>
  </a-drop-down>
</template>
<script>
import useJwt from "@core/util/auth/jwt/useJwt";
import {
  currentUserId,
  getUserData,
  currentUserRole,
  isAdmin,
  isCustomer,
} from "@core/util/auth";
export default {
  props: {
    variant: {
      type: String,
      default: () => "secondary",
    },
    src: {
      type: String,
      default: () => "/media/placeHolders/profile.png",
    },
  },
  computed: {
    currentUserId() {
      return currentUserId();
    },
    userData() {
      return getUserData();
    },
    currentUserRole() {
      return currentUserRole();
    },
    isAdmin() {
      return isAdmin();
    },
    isCustomer() {
      return isCustomer();
    },
  },
  methods: {
    logout() {
      useJwt.logOut();

      // Redirect to login page
      this.$router.push(this.isAdmin ? "/cpanel" : "/login");
    },
  },
};
</script>
<style scoped lang="scss">
.drop-down {
  ::v-deep .b-avatar-badge {
    padding: 2px;
  }
}
</style>
