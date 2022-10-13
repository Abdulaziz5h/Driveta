<template>
  <b-container>
    <header>
      <b-row class="py-5">
        <b-col cols="12" lg="4" order-lg="1">
          <div class="position-relative mx-auto" style="height: 300px; width: 300px">
            <div class="border overflow-hidden rounded-circle h-100 w-100">
              <img v-if="dto.documents[0]" :src="$store.getters.domainHost + dto.documents[0].src" alt=""
                class="w-100 h-100" style="object-fit: cover" />
            </div>
            <div class="
                user-card
                card
                position-absolute
                bg-white
                rounded-pill
                p-2
                flex-row
              " style="top: 2rem; left: -26px; min-width: 200px; z-index: 1">
              <img v-if="dto.personalImage.src" :src="$store.getters.domainHost + dto.personalImage.src"
                :alt="dto.userName" width="48" height="48" class="rounded-circle" style="object-fit: cover" />
              <div class="pl-3 pr-4">
                <h6 class="title mb-0 mt-1">
                  {{ dto.storeOwnerName }}
                </h6>
              </div>
            </div>
            <div v-b-modal.map-modal v-if="dto.id != nullGuid" class="
                user-card
                card
                position-absolute
                bg-white
                px-4
                py-3
                align-items-center
                justify-content-center
              " style="
                cursor: pointer;
                bottom: 1rem;
                right: -40px;
                border-radius: 20px;
                z-index: 1;
              ">
              <img src="@/assets/images/pin.png" width="44" height="44" />
            </div>
          </div>
        </b-col>
        <b-col cols="12" lg="8" order-lg="0">
          <div class="d-flex flex-column h-100">
            <h2 class="title mt-5 mb-3 position-relative">
              <span class="title-musk"></span>
              <span class="position-relative pl-2">{{ dto.name }}</span>
            </h2>
            <div>
              <b-badge class="mr-2 px-2 py-1" variant="info" v-for="(category, i) in dto.categories" :key="i">{{
                  category.name
              }}</b-badge>
            </div>
            <p class="mb-auto">{{ dto.description }}</p>
            <div class="card border-0 mt-3" style="border-radius: 20px; border-top-left-radius: 0">
              <div>
                <b-button variant="flat-secondary" :class="{ active: tab == 0 }" @click="tab = 0">address</b-button>
                <b-button variant="flat-secondary" :class="{ active: tab == 2 }" @click="tab = 2">contact</b-button>
              </div>
              <b-card-body v-if="tab == 0">
                <b-row>
                  <b-col cols="12" md="6" lg="3">
                    <b-card class="text-center" no-body>
                      <b-card-header class="pb-2 text-capitalize bg-white border-0">
                        البلد
                      </b-card-header>
                      <b-card-body class="pt-0">
                        {{ dto.countryName }}
                      </b-card-body>
                    </b-card>
                  </b-col>
                  <b-col cols="12" md="6" lg="3">
                    <b-card class="text-center" no-body>
                      <b-card-header class="pb-2 text-capitalize bg-white border-0">
                        المدينة
                      </b-card-header>
                      <b-card-body class="pt-0">
                        {{ dto.cityName }}
                      </b-card-body>
                    </b-card>
                  </b-col>
                  <b-col cols="12" md="6" lg="3">
                    <b-card class="text-center" no-body>
                      <b-card-header class="pb-2 text-capitalize bg-white border-0">
                        المنطقة
                      </b-card-header>
                      <b-card-body class="pt-0">
                        {{ dto.areaName }}
                      </b-card-body>
                    </b-card>
                  </b-col>
                  <b-col cols="12" md="6" lg="3">
                    <b-card class="text-center" no-body>
                      <b-card-header class="pb-2 text-capitalize bg-white border-0">
                        الشارع
                      </b-card-header>
                      <b-card-body class="pt-0">
                        {{ dto.streetName }}
                      </b-card-body>
                    </b-card>
                  </b-col>
                </b-row>
              </b-card-body>
              <b-card-body v-else-if="tab == 2">
                <div class="mb-2">
                  <strong class="title">رقم الهاتف : </strong><span class="text-secondary">
                    {{
                        isValidJsonString(dto.phoneNumber)
                          ? JSON.parse(dto.phoneNumber).formattedNumber
                          : "---"
                    }}
                  </span>
                </div>
                <div>
                  <strong class="title">البريد الإلكتروني : </strong><span class="text-secondary">{{ dto.email }}</span>
                </div>
              </b-card-body>
            </div>
          </div>
        </b-col>
      </b-row>
    </header>
    <b-row class="pb-5">
      <b-col cols="12">
        <h3 class="title text-center mb-3">تصفح المنتجات</h3>
      </b-col>
      <b-col cols="12">
        <h4 class="title text-center mb-3" v-if="!products.length">
          لا يتوفر منتجات
        </h4>
      </b-col>
      <b-col cols="12" md="6" lg="3" v-for="(product, i) in products" :key="i">
        <b-list-group-item class="h-100 p-0 d-flex flex-column" style="border-radius: 12px">
          <b-media class="p-3 flex-grow-1">
            <div class="d-flex mb-2">
              <img v-if="product.documents[0]" :src="$store.getters.domainHost + product.documents[0].src"
                style="object-fit: cover" width="80" height="80" />
              <div class="ml-2">
                <h6 class="m-0">
                  {{ product.name }}
                </h6>
                <h6 class="title mt-2">{{ product.price }} {{ $t("sp") }}</h6>
              </div>
            </div>
            <p class="mb-0 text-justify">
              {{ product.description }}
            </p>
          </b-media>
          <b-button v-if="isCustomer() && notAdded(product)" @click="addCartProduct(product)" variant="secondary"
            squared block>
            إضافة للسلة <i class="ml-2 mdi mdi-plus"></i>
          </b-button>
          <b-button v-else-if="isCustomer()" @click="removeCartProduct(product)" variant="danger" squared block>
            إزالة من السلة <i class="ml-2 mdi mdi-minus"></i>
          </b-button>
        </b-list-group-item>
      </b-col>
    </b-row>
    <b-modal id="map-modal" size="md" hide-footer title="موقع المتجر">
      <map-viewor :myLatlng="{
        lat: +dto.lat,
        lng: +dto.long
      }"></map-viewor>
    </b-modal>
  </b-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { nullGuid } from "@core/util/global/index.js";
import { isValidJsonString } from "@core/util/global/index";
import { isCustomer } from "@core/util/auth";
import { onUpdateCartEvent } from "@/libs/listeners.js";
import { defaultCartDto } from "@/store/modules/cart.store";
import map from "./components/map.vue";

export default {
  components: {
    'map-viewor': map
  },
  props: {
    id: String,
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    }),
  },
  data: () => ({
    nullGuid,
    tab: 0,
    cartDto: defaultCartDto,
    dto: {
      id: nullGuid,
      userName: "",
      personalImage: {},
      documents: [],
      categories: [],
      countryName: "",
      cityName: "",
      areaName: "",
      streetName: "",
      name: "",
      storeOwnerName: "",
      description: "",
      phoneNumber: "",
      email: "",
      dateBlocked: null,
      long: null,
      lat: null,
      isActive: true,
    },
  }),
  created() {
    this.getCart((data) => {
      Object.assign(this.cartDto, data);
      this.$store.commit("Set_Main_Loading", false);
    });
    onUpdateCartEvent((data) => {
      Object.assign(this.cartDto, data);
    });
    this.getStoreById({
      id: this.id,
      callback: ({ data }) => {
        Object.assign(this.dto, data);
      },
    });
    this.getAllProducts(this.id);
  },
  methods: {
    ...mapActions([
      "getStoreById",
      "getAllProducts",
      "setCart",
      "getCart",
      "removeCartItem",
    ]),
    isValidJsonString,
    isCustomer,
    addCartProduct(product) {
      this.setCart({ product, q: 1 });
    },
    removeCartProduct(product) {
      this.removeCartItem({ product });
    },
    notAdded(p) {
      return this.cartDto.ids.indexOf(p.id) == -1;
    },
  },
};
</script>
<style scoped lang="scss">
.title-musk {
  background: var(--primary);
  width: 60px;
  height: 60px;
  border-top-left-radius: 100%;
  border-top-right-radius: 100%;
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
  opacity: 0.6;
}

.btn.active {
  box-shadow: none !important;
}
</style>
