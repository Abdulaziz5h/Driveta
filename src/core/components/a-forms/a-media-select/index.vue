<template>
  <a-drop-down class="w-100" :items="options">
    <template slot="activaitor">
      <a-input-text
        readonly
        name="media-dropdown"
        class="bg-white"
        :label="label"
        :placeholder="placeholder"
        :value="innerVal ? innerVal[valueLabel] : ''"
        :rules="rules"
      ></a-input-text>
    </template>
    <template slot="default" slot-scope="{ items }">
      <div class="cars-body">
        <VuePerfectScrollbar class="scroll-area">
          <b-list-group class="cars-item-container">
            <b-list-group-item
              @click="innerVal = item"
              :class="{ active: innerVal && innerVal.id == item.id }"
              class="text-capitalize"
              style="cursor: pointer"
              v-for="(item, i) in items"
              :key="i"
            >
              <b-media>
                <template #aside>
                  <img
                    v-if="document(item)"
                    :src="$store.getters.domainHost + document(item)"
                    style="object-fit: cover"
                    width="64"
                    height="64"
                  />
                </template>
                <h6 class="mt-0">
                  <slot name="title" :item="item">
                    {{ item }}
                  </slot>
                </h6>
                <p class="mb-0">
                  <slot name="subTitle" :item="item"></slot>
                </p>
              </b-media>
            </b-list-group-item>
          </b-list-group>
        </VuePerfectScrollbar>
      </div>
      <div class="empty-cars p-2" v-if="!items.length">
        <p class="m-0 text-center">
          {{ $t("empty") }}
        </p>
      </div>
    </template>
  </a-drop-down>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar,
  },
  props: {
    options: Array,
    document: null,
    value: {
      type: null,
    },
    valueLabel: {
      type: String,
      default: () => 'name'
    },
    placeholder: String,
    label: String,
    rules: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    innerVal: null
  }),
  mounted() {
    if (this.value) {
      this.innerVal = this.value;
    }
  },
  methods: {
    reset() {
      this.innerVal = null
    }
  },
  watch: {
    innerVal(v) {
      this.$emit("input", v);
    },
    value(v) {
      this.innerVal = v;
    },
  }
}
</script>
<style scoped lang="scss">
.a-dropdown {
  ::v-deep .form-control[readonly] {
    background: #fff !important;
  }
}
::v-deep {
  .dropdown-body {
    width: 100%;
  }
}
.cars-body {
  ::v-deep {
    .cars-item-container {
      max-height: 260px;
    }
  }
  .empty-cars {
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
