<template>
  <a-drop-down :items="products" right minWidth="300">
    <template slot="activaitor">
      <div class="activaitor">
        <span class="title">
          0,00$
        </span>
        <b-avatar class="ml-2" badge-top badge-offset="-0.3em" badge="7">
          <i class="mdi mdi-cart-variant"></i>
        </b-avatar>
      </div>
    </template>
    <template slot="default" slot-scope="{items}">
      <div class="cart-body p-2">
        <VuePerfectScrollbar class="scroll-area" :settings="settings">
          <b-list-group class="cart-item-container">
            <b-list-group-item
              class="d-flex justify-content-between align-items-center border-right-0 border-top-0 border-left-0"
              v-for="i in items" :key="i"
            >
              <b-avatar class="mr-2" badge-variant="primary" badge-top badge-left badge-offset="-.3em">
                <i class="mdi mdi-cart-variant"></i>
                <template #badge><i class="mdi mdi-close"></i> </template>
              </b-avatar>
              <div class="flex-grow-1">
                <p class="m-0">Cras justo odio</p>
                <small>1 X <span class="text-danger">234$</span></small>
              </div>
            </b-list-group-item>
          </b-list-group>
        </VuePerfectScrollbar>
        <div class="cart-bill pt-3 pb-2" v-if="items.length">
          <b-list-group-item
            class="subtotal px-0 pt-0 d-flex justify-content-between align-items-center border-0"
          >
            <strong>
              Subtotal:
            </strong>
            <span>3333$</span>
          </b-list-group-item>
          <b-button block size="sm" variant="flat" class="border">View cart</b-button>
          <b-button block size="sm" variant="primary">Checkout</b-button>
        </div>
        <div class="empty-cart" v-if="!items.length">
          <b-avatar class="my-4">
            <i class="mdi mdi-shopping-outline"></i>
          </b-avatar>
          <p>
            no products is cart
          </p>
        </div>
      </div>
    </template>
  </a-drop-down>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
export default {
  components: {
    VuePerfectScrollbar
  },
  props: {
    products: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      settings: {
      }
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep {
  .activaitor {
    .b-avatar {
      background: var(--light);
      border: solid 1px var(--primary);
      width: 46px;
      height: 46px;
      i {
        color: var(--primary);
        font-size: 18px;
      }
    }
  }
  .b-avatar-badge {
    padding-top: 3px;
  }
}
.cart-body {
  ::v-deep {
    .cart-item-container {
      height: 210px;
      .list-group-item {
        p {
          font-size: 14px;
        }
        small {
          font-size: 12px;
        }
        &.subtotal {
          color: var(--font-color);
          span {
            color: var(--danger);
          }
        }
      }
    }
  }
  .empty-cart {
    text-transform: capitalize;
    text-align: center;
    ::v-deep {
      .b-avatar {
        width: 80px;
        height: 80px;
        background: var(--light);
        i {
          color: var(--primary);
          font-size: 40px;
        }
      }
    }
  }
}
</style>