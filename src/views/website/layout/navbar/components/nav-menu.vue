<template>
  <b-navbar toggleable="lg" class="py-2 navbar">
    <b-container class="d-flex">
      <b-navbar-brand class="text-primary">
        <a-logo-primary width="50" />
      </b-navbar-brand>
      <b-collapse is-nav ref="navbar" class="justify-content-between order-2 order-lg-0">
        <b-navbar-nav class="menu-nav flex-lg-row-reverse flex-column-reverse mx-auto">
          <router-link to="/about-us" custom v-slot="{ href, navigate, isActive, isExactActive }">
            <b-nav-item @click="navigate" :href="href" :class="{ active: isActive && isExactActive }">من نحن
            </b-nav-item>
          </router-link>
          <router-link to="/stores" custom v-slot="{ href, navigate, isActive, isExactActive }">
            <b-nav-item @click="navigate" :href="href" :class="{ active: isActive && isExactActive }">المتاجر
            </b-nav-item>
          </router-link>
          <router-link to="/" custom v-slot="{ href, navigate, isActive, isExactActive }">
            <b-nav-item @click="navigate" :href="href" :class="{ active: isActive && isExactActive }">الرئيسية</b-nav-item>
          </router-link>
        </b-navbar-nav>
      </b-collapse>
      <!-- <language class="ml-auto"/> -->
      <b-button size="sm" class="px-3 ml-auto" variant="outline-primary" to="/login" v-if="!isCustomer()">تسجيل دخول
      </b-button>
      <!-- <b-button size="sm" class="btn-icon p-2 p-md-1 px-md-3 ml-auto position-relative" variant="outline-info"
        v-if="isCustomer()">
        <i class="btn-icon mdi mdi-doctor mr-md-2" style="line-height: 1"></i>
        <span class="d-none d-md-block">حجز توصيلة</span>
      </b-button> -->
      <b-button v-if="isCustomer()" size="sm" class="btn-icon p-2 mr-1 ml-2 position-relative" to="/cart"
        variant="outline-danger">
        <i class="mdi mdi-cart" style="line-height: 1"></i>
        <span class="position-absolute" style="bottom: -8px; right: -8px">
          <b-badge class="py-1" variant="primary">{{ cartCount }}</b-badge>
        </span>
      </b-button>
      <b-button size="sm" @click="toggleNavbar()" class="btn-icon d-lg-none p-2 ml-2" variant="outline-primary">
        <i class="mdi mdi-menu mt-50" style="line-height: 1"></i>
      </b-button>
      <a-user-dropdown class="ml-2" size="36px" v-if="isCustomer()">
      </a-user-dropdown>
    </b-container>
  </b-navbar>
</template>

<script>
import { isCustomer } from "@core/util/auth";
import { mapActions } from "vuex";
import { onUpdateCartEvent } from "@/libs/listeners";

export default {
  data: () => ({
    cartCount: 0,
  }),
  created() {
    this.getCart((data) => {
      this.cartCount = data.ids.length;
      this.$store.commit("Set_Main_Loading", false);
    });
    onUpdateCartEvent((data) => {
      this.cartCount = data.ids.length;
    });
  },
  methods: {
    ...mapActions(["getCart"]),
    isCustomer,
    toggleNavbar() {
      this.$refs.navbar.toggle();
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/helpers/variables";

.categories-dropdown {
  max-height: calc(100vh - 200px);

  ::v-deep {
    li {
      text-transform: uppercase;
      font-size: 12px;

      a {
        line-height: 38px;
        border: solid 1px $borderColor;
      }

      a:hover {
        background: transparent;
        color: var(--primary);
        text-shadow: 0 0 1px var(--primary);
      }
    }
  }
}

.menu-nav {
  ::v-deep {
    .nav-item {
      margin-left: 2px;
      text-transform: capitalize;
      font-size: 14px;

      &:not(:last-of-type) {
        margin-right: 2px;
      }

      .nav-link {
        font-weight: bold;
      }

      &:hover,
      &.active {
        a {
          color: var(--primary);
        }
      }
    }
  }
}
</style>
