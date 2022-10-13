<template>
  <b-container>
    <header class="py-5">
      <h4 class="title text-center mb-3">متاجر درافيتا</h4>
      <div class="mx-auto text-center pb-4" style="max-width: 480px">
        <a-input-text
          name="search"
          placeholder="ابحث عن متجر..."
          v-model="filterParams.name"
          @input="getStoresByFilter(filterParams)"
        />
        <div style="max-width: 400px" class="mx-auto">
          <small class="m-0"
            >تقدم منصة درافيتا العديد من فئات المتاجر التي يمكنك العثور على احتياجاتك معنا</small
          >
        </div>
      </div>
    </header>
    <section class="mb-5">
      <b-row>
        <b-col cols="12" lg="3">
          <aside class="mb-3">
            <h5 class="title mb-3">تصفية</h5>
            <a-input-select
              name="categories"
              label="حسب التصنيف"
              :options="categoryPathsListV2"
              placeholder="اختر تصنيف"
              textLabel="path"
              multiple
              v-model="filterParams.categoryIds"
              @input="getStoresByFilter(filterParams)"
            />
            <a-input-select
              name="country"
              label="حسب البلد"
              :options="countries"
              clearable
              placeholder="اختر بلد"
              v-model="filterParams.countryId"
              @input="getStoresByFilter(filterParams)"
            />
            <a-input-select
              name="city"
              label="حسب المدينة"
              :options="cities"
              clearable
              placeholder="اختر مدينة"
              v-model="filterParams.cityId"
              @input="getStoresByFilter(filterParams)"
            />
            <a-input-select
              name="area"
              label="areas"
              :options="areas"
              clearable
              placeholder="اختر منطقة"
              v-model="filterParams.areaId"
              @input="getStoresByFilter(filterParams)"
            />
            <a-input-select
              name="street"
              label="حسب الشارع"
              :options="streets"
              clearable
              placeholder="اختر شارع"
              v-model="filterParams.streetId"
              @input="getStoresByFilter(filterParams)"
            />
          </aside>
        </b-col>
        <b-col cols="12" lg="9">
          <section>
            <b-row v-if="filteredStores.stores.length">
              <b-col
                cols="12"
                md="6"
                class="mb-3"
                v-for="(store, index) in filteredStores.stores"
                :key="index"
              >
                <b-card
                  @click="$router.replace('stores/' + store.id)"
                  class="mx-auto h-100"
                  no-body
                  style="max-width: 320px; cursor: pointer"
                >
                  <img
                    class="w-100"
                    v-if="store.documents[0]"
                    :src="$store.getters.domainHost + store.documents[0].src"
                    style="object-fit: cover"
                    height="160"
                    :alt="store.name"
                  />
                  <b-card-body class="py-2 pc-3">
                    <h6 class="title">{{ store.name }}</h6>
                    <p class="m-0 text-justify">
                      {{ store.description }}
                    </p>
                  </b-card-body>
                </b-card>
              </b-col>
              <b-col cols="12 d-flex justify-content-center pt-5">
                <a-pagination
                  :pageLength="filterParams.pageSize"
                  :length="filteredStores.activeStoresCount"
                  @page="updatePage($event)"
                ></a-pagination>
              </b-col>
            </b-row>
            <h5 v-else class="text-center title">لا يوجد متاجر متاحة</h5>
          </section>
        </b-col>
      </b-row>
    </section>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    filterParams: {
      pageSize: 8,
      pageNumber: 1,
      name: "",
      categoryIds: [],
      countryId: null,
      cityId: null,
      areaId: null,
      streetId: null,
    },
  }),
  computed: {
    ...mapState({
      filteredStores: (state) => state["admin/accounts/stores"].filteredStores,
      countries: (state) => state.setting.countries,
      cities: (state) => state.setting.cities,
      areas: (state) => state.setting.areas,
      streets: (state) => state.setting.streets,
      categoryPathsListV2: (state) =>
        state["admin/categories"].categoryPathsListV2,
    }),
  },
  created() {
    this.getStoresByFilter(this.filterParams);
    this.getCountries();
    this.getCitiesByFilter();
    this.getAreasByFilter();
    this.getStreetByFilter();
    this.getTreePathsV2();
  },
  methods: {
    ...mapActions([
      "getStoresByFilter",
      "getCountries",
      "getStreetByFilter",
      "getAreasByFilter",
      "getCitiesByFilter",
      "getTreePathsV2",
    ]),
    updatePage(page) {
      this.filterParams.pageNumber = page;
      this.getStoresByFilter(this.filterParams);
    },
  },
  watch: {
    "filterParams.countryId"(v) {
      this.filterParams.cityId = null;
      this.filterParams.areaId = null;
      this.filterParams.streetId = null;
      this.getCitiesByFilter(v);
      this.getAreasByFilter(
        v
          ? {
              countryId: v,
            }
          : {}
      );
      this.getStreetByFilter(
        v
          ? {
              countryId: v,
            }
          : {}
      );
    },
    "filterParams.cityId"(v) {
      this.filterParams.areaId = null;
      this.filterParams.streetId = null;
      this.getAreasByFilter({
        countryId: this.filterParams.countryId,
        cityId: v,
      });
      this.getStreetByFilter(
        v
          ? {
              countryId: this.filterParams.countryId,
              cityId: v,
            }
          : {
              countryId: this.filterParams.countryId,
            }
      );
    },
    "filterParams.areaId"(v) {
      this.filterParams.streetId = null;
      this.getStreetByFilter(
        v
          ? {
              countryId: this.filterParams.countryId,
              cityId: this.filterParams.cityId,
              areaId: v,
            }
          : {
              countryId: this.filterParams.countryId,
              cityId: this.filterParams.cityId,
            }
      );
    },
  },
};
</script>
