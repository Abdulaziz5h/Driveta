<template>
  <b-row>
    <b-col class="mb-3" cols="12" md="6" lg="4">
      <a-table
        :title="$t('country.table.title')"
        :items="countries"
        :columns="columns"
        no_footer
        accordion
        autoclosed
        isPlus
        @details="open('countries', true, $event.row.id)"
        @delete-selected="deleteSelected('countries', $event)"
        @plus="open('countries')"
      >
        <template slot="headers" slot-scope="{ props }">
          <template v-if="props.column.field != 'details'">
            {{ $t("country.table.columns")[props.column.field] }}
          </template>
          <template v-else>
            <div class="text-center">
              {{ $t("details") }}
            </div>
          </template>
        </template>
      </a-table>
      <countryForm ref="countries" />
    </b-col>

    <b-col class="mb-3" cols="12" md="6" lg="4">
      <a-table
        :title="$t('city.table.title')"
        :items="cities"
        :columns="columns"
        no_footer
        accordion
        autoclosed
        isPlus
        @details="open('cities', true, $event.row.id)"
        @delete-selected="deleteSelected('cities', $event)"
        @plus="open('cities')"
      >
        <template slot="headers" slot-scope="{ props }">
          <template v-if="props.column.field != 'details'">
            {{ $t("city.table.columns")[props.column.field] }}
          </template>
          <template v-else>
            <div class="text-center">
              {{ $t("details") }}
            </div>
          </template>
        </template>
      </a-table>
      <cityForm ref="cities" />
    </b-col>

    <b-col class="mb-3" cols="12" md="6" lg="4">
      <a-table
        :title="$t('area.table.title')"
        :items="areas"
        :columns="columns"
        no_footer
        accordion
        autoclosed
        isPlus
        @details="open('areas', true, $event.row.id)"
        @delete-selected="deleteSelected('areas', $event)"
        @plus="open('areas')"
      >
        <template slot="headers" slot-scope="{ props }">
          <template v-if="props.column.field != 'details'">
            {{ $t("area.table.columns")[props.column.field] }}
          </template>
          <template v-else>
            <div class="text-center">
              {{ $t("details") }}
            </div>
          </template>
        </template>
      </a-table>
      <areaForm ref="areas" />
    </b-col>

    <b-col class="mb-3" cols="12" md="6">
      <a-table
        :title="$t('street.table.title')"
        :items="streets"
        :columns="columns"
        no_footer
        accordion
        autoclosed
        isPlus
        @details="open('streets', true, $event.row.id)"
        @delete-selected="deleteSelected('streets', $event)"
        @plus="open('streets')"
      >
        <template slot="headers" slot-scope="{ props }">
          <template v-if="props.column.field != 'details'">
            {{ $t("street.table.columns")[props.column.field] }}
          </template>
          <template v-else>
            <div class="text-center">
              {{ $t("details") }}
            </div>
          </template>
        </template>
      </a-table>
      <streetForm ref="streets" />
    </b-col>

    <b-col class="mb-3" cols="12" md="6">
      <a-table
        :title="$t('model.table.title')"
        :items="models"
        :columns="modelColumns"
        no_footer
        accordion
        autoclosed
        isPlus
        @details="open('models', true, $event.row.id)"
        @delete-selected="deleteSelected('models', $event)"
        @plus="open('models')"
      >
        <template slot="headers" slot-scope="{ props }">
          <template v-if="props.column.field != 'details'">
            {{ $t("model.table.columns")[props.column.field] }}
          </template>
          <template v-else>
            <div class="text-center">
              {{ $t("details") }}
            </div>
          </template>
        </template>
        <template slot="items.date" slot-scope="{ value }">
          {{ new Date(value).getFullYear() }}
        </template>
      </a-table>
      <modelForm ref="models" />
    </b-col>
  </b-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import countryForm from "./components/country-form.vue";
import cityForm from "./components/city-form.vue";
import areaForm from "./components/area-form.vue";
import streetForm from "./components/street-form.vue";
import modelForm from "./components/model-form.vue";

export default {
  components: {
    countryForm,
    cityForm,
    areaForm,
    streetForm,
    modelForm,
  },
  data: () => ({
    columns: [
      {
        label: "name",
        field: "name",
      },
      {
        label: "details",
        field: "details",
        sortable: false,
      },
    ],
    modelColumns: [
      {
        label: "name",
        field: "name",
      },
      {
        label: "date",
        field: "date",
      },
      {
        label: "details",
        field: "details",
        sortable: false,
      },
    ],
  }),
  computed: {
    ...mapGetters(["countries", "cities", "areas", "streets", "models"]),
  },
  created() {
    this.getAreas();
    this.getCities();
    this.getCountries();
    this.getStreets();
    this.getModels();
  },
  methods: {
    ...mapActions([
      "getAreas",
      "getCities",
      "getCountries",
      "getStreets",
      "getModels",
    ]),
    open(modalName, is, e) {
      this.$refs[modalName].open(!!is, e);
    },
    deleteSelected(modalName, e) {
      this.$refs[modalName].delete(e);
    },
  },
  beforeDestroy() {
    this.$store.commit("Reset_Shared");
  },
};
</script>
