<template>
  <div>
    <validation-observer ref="observer">
      <b-row>
        <b-col cols="12" class="d-flex mb-2">
          <a-back path="/admin/stores" v-if="isAdmin()" />
          <b-button variant="primary" size="sm" class="px-4 ml-auto" @click="submitStore()"
            v-if="(!isEdit && isAdmin()) || isStore()">{{ $t("ok") }}</b-button>
          <a-block-user @input="actionBlock" :id="id" :dateBlock="storeDto.dateBlocked"
            v-if="storeDto.isActive && isAdmin() && storeDto.id != nullGuid" />
          <a-active-user @input="storeDto.isActive = true" :id="id"
            v-if="!storeDto.isActive && isAdmin() && storeDto.id != nullGuid" />
          <b-button variant="danger" class="px-3 ml-2" size="sm" v-if="isEdit && isAdmin()"
            @click="storeDelete({ id: storeDto.id, callback: back })">{{ $t("delete") }}</b-button>
        </b-col>
        <b-col cols="12" md="6">
          <a-input-text :label="$t('store.form.name.label')" :placeholder="$t('store.form.name.placeholder')"
            :readonly="isEdit && isAdmin()" :rules="[
              {
                type: 'required',
                message: $t('store.form.name.validation.required'),
              },
            ]" v-model="storeDto.name" name="name" />
        </b-col>
        <b-col cols="12" md="6">
          <a-input-text :label="$t('store.form.username.label')" :placeholder="$t('store.form.username.placeholder')"
            :readonly="isEdit" :rules="[
              {
                type: 'required',
                message: $t('store.form.username.validation.required'),
              },
              {
                type: 'username',
                message: $t('store.form.username.validation.unValidUsername'),
              },
            ]" v-model="storeDto.userName" name="UserName" />
        </b-col>
        <b-col cols="12" md="4">
          <a-input-text :label="$t('store.form.storeOwnerName.label')"
            :placeholder="$t('store.form.storeOwnerName.placeholder')" :readonly="isEdit && isAdmin()" :rules="[
              {
                type: 'required',
                message: $t('store.form.storeOwnerName.validation.required'),
              },
            ]" v-model="storeDto.storeOwnerName" name="storeOwnerName" />
        </b-col>
        <b-col cols="12" md="4">
          <a-input-phone-number :label="$t('store.form.phone.label')" :placeholder="$t('store.form.phone.placeholder')"
            v-model="storeDto.phoneNumber" :readonly="isEdit && isAdmin()" name="phoneNumber" />
        </b-col>
        <b-col cols="12" md="4">
          <a-input-text :label="$t('store.form.email.label')" :placeholder="$t('store.form.email.placeholder')"
            :readonly="isEdit && isAdmin()" :rules="[
              {
                type: 'required',
                message: $t('store.form.email.validation.required'),
              },
              {
                type: 'email',
                message: $t('store.form.email.validation.unValidEmail'),
              },
            ]" name="email" v-model="storeDto.email" />
        </b-col>
        <b-col cols="12" md="6" lg="3" v-if="!isEdit && isAdmin()">
          <a-input-select :options="countries" :label="$t('country.form.name.label')"
            :placeholder="$t('country.form.name.placeholder-select')" v-model="locationfilters.country"
            name="countryId" />
        </b-col>
        <b-col cols="12" md="6" lg="3" v-if="!isEdit && isAdmin()">
          <a-input-select :options="cities" :label="$t('city.form.name.label')"
            :placeholder="$t('city.form.name.placeholder-select')" v-model="locationfilters.city" name="cityId" />
        </b-col>
        <b-col cols="12" md="6" lg="3" v-if="!isEdit && isAdmin()">
          <a-input-select :options="areas" :label="$t('area.form.name.label')"
            :placeholder="$t('area.form.name.placeholder-select')" v-model="locationfilters.area" name="areaId" />
        </b-col>
        <b-col cols="12" md="6" :lg="!isEdit && isAdmin() ? '3' : '6'">
          <a-input-select :readonly="isEdit && isAdmin()" :options="streets" :label="$t('store.form.street.label')"
            :placeholder="$t('store.form.street.placeholder')" :rules="[
              {
                type: 'required',
                message: $t('store.form.street.validation.required'),
              },
            ]" v-model="storeDto.streetId" name="StreetId" />
        </b-col>
        <b-col cols="12" md="6">
          <a-input-select :readonly="isEdit && isAdmin()" :options="categoryPathsListV2"
            :label="$t('store.form.categoryIds.label')" :placeholder="$t('store.form.categoryIds.placeholder')"
            textLabel="path" :rules="[
              {
                type: 'required',
                message: $t('store.form.categoryIds.validation.required'),
              },
            ]" multiple v-model="storeDto.categoryIds" name="categoryIds" />
        </b-col>
        <b-col cols="12" md="6" v-if="!isEdit && isAdmin()">
          <a-input-text :label="$t('store.form.password.label')" :placeholder="$t('store.form.password.placeholder')"
            :rules="[
              {
                type: 'password',
                message: $t('store.form.password.validation.unValidPassword'),
              },
            ]" v-model="storeDto.password" name="password" type="password" />
        </b-col>
        <b-col cols="12">
          <a-input-textarea label="الوصف" :readonly="isEdit && isAdmin()" placeholder="اكتب الوصف هنا..." :rules="[
            {
              type: 'required',
              message: 'الوصف مطلوب',
            },
            {
              type: 'max:255',
              message: 'يشترط الا يتجاوز الطول 255 محرف',
            },
          ]" v-model="storeDto.description" name="description" />
        </b-col>
        <b-col cols="12" md="6">
          <a-input-file :readonly="isEdit && isAdmin()" required :label="$t('store.form.personalImage.label')"
            ref="personalImageFile" :value="storeDto.personalImage" @input="storeDto.personalImageFile = $event" />
        </b-col>
        <b-col cols="12" md="6">
          <a-input-file :readonly="isEdit && isAdmin()" required :label="$t('store.form.storeFiles.label')"
            ref="storeFiles" :value="storeDto.documents" @input="storeDto.storeFiles = $event" />
        </b-col>
        <b-col cols="12" class="pb-3">
          <label class="mb-1 text-capitalize">{{
              $t("store.form.storeLocation.label")
          }}</label>
          <map-modal :readonly="isEdit && isAdmin()" :latProp="storeDto.lat" :lngProp="storeDto.long"
            @getLatLng="fillLatLong" />
        </b-col>
        <template v-if="isAdmin()">
          <b-col cols="12" v-if="products.length">
            <h6 class="title">المنتجات</h6>
          </b-col>
          <b-col cols="12" md="6" lg="3" class="pb-4" v-for="(product, i) in products" :key="i">
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
            </b-list-group-item>
          </b-col>
        </template>
      </b-row>
    </validation-observer>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { nullGuid } from "@core/util/global/index.js";
import mapModal from "../components/map-modal.vue";
import { isAdmin, isStore, currentUserId } from "@core/util/auth";

export default {
  components: {
    mapModal,
  },
  props: {
    id: String,
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
      countries: (state) => state.setting.countries,
      cities: (state) => state.setting.cities,
      areas: (state) => state.setting.areas,
      streets: (state) => state.setting.streets,
      categoryPathsListV2: (state) =>
        state["admin/categories"].categoryPathsListV2,
    }),
  },
  data: () => ({
    nullGuid,
    storeDto: {
      id: nullGuid,
      personalImage: [],
      personalImageFile: [],
      documents: [],
      storeFiles: [],
      userName: "",
      name: "",
      storeOwnerName: "",
      phoneNumber: "",
      email: "",
      streetId: null,
      password: "",
      description: "",
      dateBlocked: null,
      categoryIds: [],
      long: null,
      lat: null,
      isActive: true,
    },
    locationfilters: {
      country: null,
      city: null,
      area: null,
    },
    isEdit: false,
  }),
  created() {
    if ((isStore() && this.id == currentUserId()) || isAdmin()) {
      if (this.id != nullGuid) {
        this.isEdit = true;
        this.getStoreById({
          id: this.id,
          callback: ({ data }) => {
            data.personalImage = data.personalImage.src
              ? [data.personalImage]
              : [];
            data.categoryIds = data.categories.map((c) => c.id);
            Object.assign(this.storeDto, data);
          },
        });
      }
      this.getCountries();
      this.getCitiesByFilter();
      this.getAreasByFilter();
      this.getStreetByFilter();
      this.getTreePathsV2();
      this.getAllProducts(this.id);
    } else {
      this.$router.replace("/access-denied");
    }
  },
  methods: {
    isAdmin,
    isStore,
    ...mapActions([
      "addStore",
      "updateStore",
      "getStoreById",
      "storeDelete",
      "getCountries",
      "getCitiesByFilter",
      "getAreasByFilter",
      "getStreetByFilter",
      "getTreePathsV2",
      "getAllProducts",
    ]),
    submitStore() {
      this.$refs.observer.validate().then((success) => {
        if (success && (this.storeDto.personalImage.length || this.storeDto.personalImageFile.length) && (this.storeDto.documents.length || this.storeDto.storeFiles.length)) {
          if (this.storeDto.id == nullGuid) {
            this.addStore({
              dto: this.storeDto,
              callback: this.back,
            });
          } else {
            this.updateStore({
              dto: this.storeDto,
              callback: ({ data }) => {
                data.personalImage = data.personalImage
                  ? [data.personalImage]
                  : [];
                Object.assign(this.storeDto, data);
                this.$refs.personalImageFile.clear();
                this.$refs.storeFiles.clear();
                this.$store.commit("Set_Main_Loading", false);
              },
            });
          }
        }
      });
    },
    actionBlock(block) {
      this.storeDto.dateBlocked = block;
    },
    fillLatLong(lat, long) {
      this.storeDto.lat = lat;
      this.storeDto.long = long;
    },
    back() {
      this.$store.commit("Set_Main_Loading", true);
      this.$router.replace("/admin/stores");
    },
  },
  watch: {
    "locationfilters.country"(v) {
      this.locationfilters.city = null;
      this.locationfilters.area = null;
      this.storeDto.streetId = null;
      this.getCitiesByFilter(v);
      this.getAreasByFilter({
        countryId: v,
      });
      this.getStreetByFilter({
        countryId: v,
      });
    },
    "locationfilters.city"(v) {
      this.locationfilters.area = null;
      this.storeDto.streetId = null;
      this.getAreasByFilter({
        countryId: this.locationfilters.country,
        cityId: v,
      });
      this.getStreetByFilter({
        countryId: this.locationfilters.country,
        cityId: v,
      });
    },
    "locationfilters.area"(v) {
      this.storeDto.streetId = null;
      this.getStreetByFilter({
        countryId: this.locationfilters.country,
        cityId: this.locationfilters.city,
        areaId: v,
      });
    },
  },
};
</script>
