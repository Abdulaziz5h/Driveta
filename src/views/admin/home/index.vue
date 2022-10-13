<template>
  <b-container>
    <b-row v-if="userType == 0">
      <b-col lg="9">
        <b-row>
          <b-col sm="6">
            <b-card class="mb-3 text-center">
              <h5 class="title mb-4">السائقين</h5>
              {{ adminStatistics.driversCount }}
            </b-card>
          </b-col>
          <b-col sm="6">
            <b-card class="mb-3 text-center">
              <h5 class="title mb-4">مالكي الماركبات</h5>
              {{ adminStatistics.ownersCount }}
            </b-card>
          </b-col>
          <b-col sm="6">
            <b-card class="mb-3 text-center">
              <h5 class="title mb-4">المتاجر</h5>
              {{ adminStatistics.storesCount }}
            </b-card>
          </b-col>
          <b-col sm="6">
            <b-card class="mb-3 text-center">
              <h5 class="title mb-4">العملاء</h5>
              {{ adminStatistics.customersCount }}
            </b-card>
          </b-col>
          <b-col sm="6">
            <b-card class="mb-3 text-center">
              <h5 class="title mb-4">التوصيلات</h5>
              {{ adminStatistics.deliveriesCount }}
            </b-card>
          </b-col>
          <b-col sm="6">
            <b-card class="mb-3 text-center">
              <h5 class="title mb-4">المركبات</h5>
              {{ adminStatistics.vehiclesCount }}
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="3">
        <b-row>
          <b-col md="4" lg="12">
            <b-card class="mb-3 text-center">
              <h5 class="title mb-4">المرابح</h5>
              {{ adminStatistics.benfit }}
            </b-card>
          </b-col>
          <b-col md="4" lg="12">
            <b-card class="mb-3 text-center">
              <h5 class="title mb-4">الواردات</h5>
              {{ adminStatistics.income }}
            </b-card>
          </b-col>
          <b-col md="4" lg="12">
            <b-card class="mb-3 text-center">
              <h5 class="title mb-4">الصادرات</h5>
              {{ adminStatistics.outcome }}
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12">
        <b-card class="mb-3" no-body>
          <b-card-body class="pb-2">
            <h4 class="title mb-3">الاعلى تقييم شهريا</h4>
            <hr />
            <b-row>
              <b-col cols="12" class="mb-3">
                <b-row>
                  <b-col cols="6" class="text-center font-weight-bold"
                    >توصبلات</b-col
                  >
                  <b-col cols="6" class="text-center font-weight-bold"
                    >المركبات</b-col
                  >
                </b-row>
              </b-col>
              <b-col
                cols="12"
                v-for="(month, i) in barChartOptions.xaxis.categories"
                :key="i"
              >
                <div
                  class="mb-3"
                  v-if="
                    adminStatistics.bestDrivers[i] ||
                    adminStatistics.bestVehicles[i]
                  "
                >
                  <b-row>
                    <b-col
                      class="text-center mx-auto"
                      cols="5"
                      v-if="adminStatistics.bestDrivers[i]"
                    >
                      <b-card
                        class="text-center border-0"
                        style="cursor: pointer;"
                        @click="
                          $router.replace(
                            '/admin/drivers/' +
                              adminStatistics.bestDrivers[i].id
                          )
                        "
                      >
                        <img
                          :src="
                            $store.getters.domainHost +
                            '/' +
                            adminStatistics.bestDrivers[i].personalImage
                          "
                          width="80"
                          height="80"
                          class="rounded-circle mb-3"
                          style="object-fit: cover"
                          alt=""
                        />
                        <h5 class="title">
                          {{ adminStatistics.bestDrivers[i].name }}
                        </h5>
                        <strong>Deleveries: </strong>
                        {{ adminStatistics.bestDrivers[i].deliveriesCount }}
                      </b-card>
                    </b-col>
                    <b-col
                      class="text-center mx-auto"
                      cols="5"
                      v-if="adminStatistics.bestVehicles[i]"
                    >
                      <b-card
                        class="text-center border-0"
                        style="cursor: pointer;"
                        @click="
                          $router.replace(
                            '/admin/vehicles/' +
                              adminStatistics.bestVehicles[i].id
                          )
                        "
                      >
                        <img
                          :src="
                            $store.getters.domainHost +
                            '/' +
                            adminStatistics.bestVehicles[i].vehicleDocuments[0]
                          "
                          width="80"
                          height="80"
                          class="rounded-circle mb-3"
                          style="object-fit: cover"
                          alt=""
                        />
                        <h5 class="title">
                          {{ adminStatistics.bestVehicles[i].name }}
                        </h5>
                        <strong>Deliveries: </strong>
                        {{ adminStatistics.bestVehicles[i].deliveriesCount }}
                      </b-card>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" v-if="adminStatistics.deliveryMonthly.length || adminStatistics.distanceMonthly.length">
        <b-card class="mb-3">
          <h4 class="title mb-3">الفعالية</h4>
          <hr />
          <apexchart
            type="bar"
            height="400"
            :options="barChartOptions"
            :series="[
              {
                name: 'التوصيلات',
                data: adminStatistics.deliveryMonthly,
              },
              {
                name: 'المسافة',
                data: adminStatistics.distanceMonthly,
              },
            ]"
          ></apexchart>
        </b-card>
      </b-col>
      <b-col cols="12" v-if="adminStatistics.benfitMonthly.length || adminStatistics.incomeMonthly.length || adminStatistics.outcomeMonthly.length">
        <b-card class="mb-3">
          <h4 class="title mb-3">الحركات المالية</h4>
          <hr />
          <apexchart
            type="bar"
            height="400"
            :options="{
              ...barChartOptions,
              yaxis: {
                title: {
                  text: 'الكمية الكلية',
                },
              },
            }"
            :series="[
              {
                name: 'المرابح',
                data: adminStatistics.benfitMonthly,
              },
              {
                name: 'الواردات',
                data: adminStatistics.incomeMonthly,
              },
              {
                name: 'الصادرات',
                data: adminStatistics.outcomeMonthly,
              },
            ]"
          ></apexchart>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-if="userType == 1">
      <b-col md="6" lg="3">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">السمافة الكلية</h5>
          {{ driverStatistics.totalDistance }}
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">التوصيلات</h5>
          {{ driverStatistics.deliveriesCount }}
        </b-card>
      </b-col>
      <b-col md="6" lg="3">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">المسافة الكلية</h5>
          {{ adminStatistics.totalDistance }}
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">المركبات</h5>
          {{ driverStatistics.vehicleCount }}
        </b-card>
      </b-col>
      <b-col sm="6" lg="4">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">المرابح</h5>
          {{ driverStatistics.benfit }}
        </b-card>
      </b-col>
      <b-col sm="6" lg="4">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">الواردات</h5>
          {{ driverStatistics.income }}
        </b-card>
      </b-col>
      <b-col sm="6" lg="4">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">الصادرات</h5>
          {{ driverStatistics.outcome }}
        </b-card>
      </b-col>
      <b-col cols="12" v-if="driverStatistics.deliveryMonthly.length || driverStatistics.distanceMonthly.length">
        <b-card class="mb-3">
          <h4 class="title mb-3">النشاط</h4>
          <hr />
          <apexchart
            type="bar"
            height="400"
            :options="barChartOptions"
            :series="[
              {
                name: 'التوصيلات',
                data: driverStatistics.deliveryMonthly,
              },
              {
                name: 'المسافة',
                data: driverStatistics.distanceMonthly,
              },
            ]"
          ></apexchart>
        </b-card>
      </b-col>
      <b-col cols="12" v-if="driverStatistics.benfitMonthly.length || driverStatistics.incomeMonthly.length || driverStatistics.outcomeMonthly.length">
        <b-card class="mb-3">
          <h4 class="title mb-3">الحركات المالية</h4>
          <hr />
          <apexchart
            type="bar"
            height="400"
            :options="{
              ...barChartOptions,
              yaxis: {
                title: {
                  text: 'الكمية الكلية',
                },
              },
            }"
            :series="[
              {
                name: 'المرابح',
                data: driverStatistics.benfitMonthly,
              },
              {
                name: 'الواردات',
                data: driverStatistics.incomeMonthly,
              },
              {
                name: 'الصادرات',
                data: driverStatistics.outcomeMonthly,
              },
            ]"
          ></apexchart>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-if="userType == 2">
      <b-col md="6" lg="4">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">التوصيلات</h5>
          {{ ownerStatistics.driverCount }}
        </b-card>
      </b-col>
      <b-col md="6" lg="4">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">المسافة الكلية</h5>
          {{ ownerStatistics.totalDistance }}
        </b-card>
      </b-col>
      <b-col md="6" lg="4">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">التوصيلات</h5>
          {{ ownerStatistics.deliveriesCount }}
        </b-card>
      </b-col>
      <b-col md="6" lg="3">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">المركبات</h5>
          {{ ownerStatistics.vehicleCount }}
        </b-card>
      </b-col>
      <b-col md="6" lg="3">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">الارباح</h5>
          {{ ownerStatistics.benfit }}
        </b-card>
      </b-col>
      <b-col sm="6" md="3">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">الواردات</h5>
          {{ ownerStatistics.income }}
        </b-card>
      </b-col>
      <b-col sm="6" md="3">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">الصادرات</h5>
          {{ ownerStatistics.outcome }}
        </b-card>
      </b-col>
      <b-col cols="12" v-if="ownerStatistics.deliveryMonthly.length || ownerStatistics.distanceMonthly.length">
        <b-card class="mb-3">
          <h4 class="title mb-3">النشاط</h4>
          <hr />
          <apexchart
            type="bar"
            height="400"
            :options="barChartOptions"
            :series="[
              {
                name: 'التوصيلات',
                data: ownerStatistics.deliveryMonthly,
              },
              {
                name: 'المسافة',
                data: ownerStatistics.distanceMonthly,
              },
            ]"
          ></apexchart>
        </b-card>
      </b-col>
      <b-col cols="12" v-if="ownerStatistics.benfitMonthly.length || ownerStatistics.incomeMonthly.length || ownerStatistics.outcomeMonthly.length">
        <b-card class="mb-3">
          <h4 class="title mb-3">الحركات المالية</h4>
          <hr />
          <apexchart
            type="bar"
            height="400"
            :options="{
              ...barChartOptions,
              yaxis: {
                title: {
                  text: 'الكمية الكلية',
                },
              },
            }"
            :series="[
              {
                name: 'المرابح',
                data: ownerStatistics.benfitMonthly,
              },
              {
                data: ownerStatistics.incomeMonthly,
                name: 'الواردات',
              },
              {
                name: 'الصادرات',
                data: ownerStatistics.outcomeMonthly,
              },
            ]"
          ></apexchart>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-if="userType == 3">
      <b-col md="6" lg="3">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">الوصيلات</h5>
          {{ storeStatistics.deliveriesCount }}
        </b-card>
      </b-col>
      <b-col md="6" lg="3">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">المرابح</h5>
          {{ storeStatistics.benfit }}
        </b-card>
      </b-col>
      <b-col md="6" lg="3">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">الواردات</h5>
          {{ storeStatistics.income }}
        </b-card>
      </b-col>
      <b-col md="6" lg="3" v-if="storeStatistics.deliveryMonthly.length">
        <b-card class="mb-3 text-center">
          <h5 class="title mb-4">الصادرات</h5>
          {{ storeStatistics.outcome }}
        </b-card>
      </b-col>
      <b-col cols="12">
        <b-card class="mb-3">
          <h4 class="title mb-3">النشاط</h4>
          <hr />
          <apexchart
            type="bar"
            height="400"
            :options="barChartOptions"
            :series="[
              {
                name: 'التوصيلات',
                data: storeStatistics.deliveryMonthly,
              }
            ]"
          ></apexchart>
        </b-card>
      </b-col>
      <b-col cols="12" v-if="storeStatistics.benfitMonthly.length || storeStatistics.incomeMonthly.length || storeStatistics.outcomeMonthly.length">
        <b-card class="mb-3">
          <h4 class="title mb-3">الحركات المالية</h4>
          <hr />
          <apexchart
            type="bar"
            height="400"
            :options="{
              ...barChartOptions,
              yaxis: {
                title: {
                  text: 'الكمية الكلية',
                },
              },
            }"
            :series="[
              {
                name: 'المرابح',
                data: storeStatistics.benfitMonthly,
              },
              {
                name: 'الواردات',
                data: storeStatistics.incomeMonthly,
              },
              {
                name: 'الصادرات',
                data: storeStatistics.outcomeMonthly,
              },
            ]"
          ></apexchart>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import {
  isAdmin,
  isDriver,
  isOwner,
  isStore,
  currentUserId,
} from "@core/util/auth/index";
export default {
  computed: {
    ...mapState({
      adminStatistics: (state) => state.statistics.adminStatistics,
      ownerStatistics: (state) => state.statistics.ownerStatistics,
      driverStatistics: (state) => state.statistics.driverStatistics,
      storeStatistics: (state) => state.statistics.storeStatistics,
    }),
    userType() {
      if (isAdmin()) {
        return 0;
      } else if (isDriver()) {
        return 1;
      } else if (isOwner()) {
        return 2;
      } else if (isStore()) {
        return 3;
      } else {
        return -1;
      }
    },
  },
  data: () => ({
    barChartOptions: {
      chart: {
        type: "bar",
        height: 400,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Jun",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  }),
  created() {
    if (this.userType == 0) {
      this.getAdminStatistics();
    } else if (this.userType == 1) {
      this.getDriverStatistics(currentUserId());
    } else if (this.userType == 2) {
      this.getOwnerStatistics(currentUserId());
    } else if (this.userType == 3) {
      this.getStoreStatistics(currentUserId());
    }
  },
  methods: {
    ...mapActions([
      "getAdminStatistics",
      "getOwnerStatistics",
      "getDriverStatistics",
      "getStoreStatistics",
    ]),
  },
};
</script>
