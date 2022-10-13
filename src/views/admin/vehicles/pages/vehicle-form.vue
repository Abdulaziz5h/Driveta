<template>
  <validation-observer ref="observer">
    <b-row>
      <b-col cols="12" class="d-flex mb-2">
        <a-back path="/admin/vehicles" />
        <b-button size="sm" variant="primary" class="px-4 mr-2 ml-auto" @click="submitForm()">{{ $t("ok") }}</b-button>
        <b-button size="sm" variant="danger" class="px-3" @click="deleteVehicleLocal()" v-if="isEdit">{{ $t("delete") }}
        </b-button>
      </b-col>
      <b-col cols="12" md="6">
        <a-input-text :label="$t('vehicle.form.name.label')" :placeholder="$t('vehicle.form.name.placeholder')"
          name="name" v-model="vehicleDto.name" :rules="[
            {
              type: 'required',
              message: $t('vehicle.form.name.validation.required'),
            },
          ]" />
        <b-row>
          <b-col cols="12" sm="6" md="12" lg="6">
            <b-form-group>
              <label class="text-capitalize mb-1" style="font-size: 14px">{{
                  $t("vehicle.form.color.label")
              }}</label>
              <small class="text-info text-capitalize d-block mb-2">{{
                  $t("vehicle.form.color.tip")
              }}</small>
              <chrome-picker v-model="vehicleDto.color" />
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6" md="12" lg="6">
            <a-input-select :label="$t('vehicle.form.modelId.label')" :options="models" :rules="[
              {
                type: 'required',
                message: $t('vehicle.form.modelId.validation.required'),
              },
            ]" :placeholder="$t('vehicle.form.modelId.placeholder')" name="modelId" v-model="vehicleDto.modelId" />
            <a-input-text :label="$t('vehicle.form.vehicleNumber.label')"
              :placeholder="$t('vehicle.form.vehicleNumber.placeholder')" name="vehicleNumber"
              v-model="vehicleDto.vehicleNumber" :rules="[
                {
                  type: 'required',
                  message: $t('vehicle.form.vehicleNumber.validation.required'),
                },
              ]" />
            <a-input-select valueLabel="item2" textLabel="item1" :label="$t('vehicle.form.type.label')"
              :options="VehicleType" :rules="[
                {
                  type: 'required',
                  message: $t('vehicle.form.type.validation.required'),
                },
              ]" :placeholder="$t('vehicle.form.type.placeholder')" name="type" v-model="vehicleDto.type">
              <template slot="selected-option" slot-scope="options">
                <span v-if="options.label.item1">
                  {{
                      options.label.item1.replace('_', ' ')
                  }}
                </span>
              </template>
              <template slot="option" slot-scope="{ option }">
                <span v-if="option.item1">
                  {{ option.item1.replace('_', ' ') }}
                </span>
              </template>
            </a-input-select>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" md="6">
        <a-media-select :label="$t('vehicle.form.ownerId.label')" :placeholder="$t('vehicle.form.ownerId.placeholder')"
          :options="[defaultUser, ...ownersSelect]" :document="(item) => item ? item.src : ''"
          v-model="vehicleDto.ownerId">
          <template slot="title" slot-scope="{ item }">
            {{ item.name }}
          </template>
          <template slot="subTitle" slot-scope="{ item }">
            {{ item.userName }}
          </template>
        </a-media-select>
        <a-input-file key="ownerShip" required ref="ownerShip" :label="$t('vehicle.form.ownerShip.label')"
          :value="vehicleDto.ownerShip" @input="vehicleDto.ownerShipFile = $event" />
        <!-- <template v-else>
          <div class="card mb-3">
            <div class="card-header title">
              {{ $t("vehicle.vehicle-owner") }}
            </div>
            <div class="card-body">
              <div>
                <label class="text-capitalize" style="font-size: 14px">{{
                    $t("vehicle.form.ownerId.label")
                }}</label>
                <p class="m-0" style="font-size: 0.875rem">
                  {{ vehicleDto.ownerName }}
                </p>
              </div>
              <hr />
              <div>
                <label class="text-capitalize" style="font-size: 14px">{{
                    $t("vehicle.form.ownerShip.label")
                }}</label>
                <img v-if="vehicleDto.ownerShip[0]" :src="
                  $store.getters.domainHost +
                  '/' +
                  vehicleDto.ownerShip[0].src
                " class="w-100" alt="" />
              </div>
            </div>
          </div>
        </template> -->
        <a-media-select :label="$t('vehicle.form.driverId.label')"
          :placeholder="$t('vehicle.form.driverId.placeholder')" :options="[defaultUser, ...driversSelect]"
          :document="(item) => item.src" v-model="vehicleDto.driverId">
          <template slot="title" slot-scope="{ item }">
            {{ item.name }}
          </template>
          <template slot="subTitle" slot-scope="{ item }">
            {{ item.userName }}
          </template>
        </a-media-select>
        <a-input-file ref="files" multiple required :label="$t('vehicle.form.files.label')"
          :value="vehicleDto.documents" @input="vehicleDto.files = $event" />
      </b-col>
      <b-col cols="12" v-if="vehicleDto.driverVehicles.length">
        <b-card no-body class="mb-2">
          <b-card-header @click="driversLog = !driversLog" style="cursor: pointer">
            <h6 class="title mb-0">
              {{ $t("vehicle.drivers-table.title") }}
            </h6>
          </b-card-header>
          <a-v-datatable v-if="driversLog" :collapseOptoins="collapseOptoins" :headers="driverColumn"
            :items="vehicleDto.driverVehicles" classes="borderd cell-borderd striped" class="mb-2">
            <template slot="header-th" slot-scope="{ th }">
              <th class="text-capitalize" v-if="th.label != 'actions'">
                {{ $t("driver.table.columns." + th.label) }}
              </th>
              <th class="text-capitalize" v-else>
                {{ $t("details") }}
              </th>
            </template>
            <template slot="driverVehicleLogs.header-th" slot-scope="{ th }">
              <th class="text-capitalize">
                {{ $t("driver.table.columns." + th.label) }}
              </th>
            </template>
            <template slot="row-td.startDate" slot-scope="{ value }">
              {{ value ? moment(value).format("MMMM Do YYYY") : $t("present") }}
            </template>
            <template slot="row-td.endDate" slot-scope="{ value }">
              {{ value ? moment(value).format("MMMM Do YYYY") : $t("present") }}
            </template>
            <template slot="driverVehicleLogs.row-td.startDate" slot-scope="{ value }">
              {{ value ? moment(value).format("MMMM Do YYYY") : $t("present") }}
            </template>
            <template slot="driverVehicleLogs.row-td.endDate" slot-scope="{ value }">
              {{ value ? moment(value).format("MMMM Do YYYY") : $t("present") }}
            </template>
            <template slot="driverVehicleLogs.row-td.value" slot-scope="{ value }">
              {{ value }} %
            </template>
            <template slot="collapse-icon">
              <i class="mdi mdi-chevron-up"></i>
            </template>
            <template slot="row-td.actions" slot-scope="{ row }">
              <div class="text-center">
                <b-button size="sm" variant="flat-secondary" class="btn-icon rounded-circle"
                  style="padding: 2px 6px !important" @click="driverDetails(row)">
                  <i class="mdi mdi-dots-vertical"></i>
                </b-button>
              </div>
            </template>
          </a-v-datatable>
        </b-card>
      </b-col>
    </b-row>
  </validation-observer>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { nullGuid } from "@core/util/global/index.js";
import { Chrome } from "vue-color";
import { vehicleType } from "@/store/modules/shared.store";
import moment from "moment";

const defaultUser = {
  id: nullGuid,
  name: "SYSTEM",
  userName: "###",
};

export default {
  components: {
    "chrome-picker": Chrome,
  },
  props: {
    id: String,
  },
  computed: {
    ...mapState({
      models: (state) => state.setting.models,
      VehicleType: (state) => state.shared.VehicleType,
      driversSelect: (state) => state["admin/accounts/driver"].driversSelect,
      ownersSelect: (state) => state["admin/accounts/owner"].ownersSelect,
    }),
  },
  data: () => ({
    nullGuid,
    defaultUser,
    isEdit: false,
    driversLog: true,
    vehicleDto: {
      id: nullGuid,
      driverId: defaultUser,
      name: "",
      vehicleNumber: "0000000",
      modelId: null,
      color: "",
      type: 0,
      driverRate: 0,
      ownerRate: 0,
      ownerId: defaultUser,
      files: [],
      documents: [],
      ownerShipFile: [],
      ownerShip: [],
      ownerLogs: [],
      driverVehicles: [],
    },
    collapseOptoins: {
      enable: true,
      label: "driverVehicleLogs",
      headers: [
        {
          label: "rate",
          value: "value",
        },
        {
          label: "startDate",
          value: "startDate",
        },
        {
          label: "endDate",
          value: "endDate",
        },
      ],
    },
    driverColumn: [
      {
        label: "driverName",
        value: "driverName",
      },
      {
        label: "startDate",
        value: "startDate",
      },
      {
        label: "endDate",
        value: "endDate",
      },
      {
        label: "actions",
        value: "actions",
      },
    ],
  }),
  created() {
    if (this.id != nullGuid) {
      this.isEdit = true;
      this.getVehicle({
        id: this.id,
        callback: ({ data }) => {
          data.ownerShip = [data.ownerShip];
          Object.assign(this.vehicleDto, data);
          this.getDriversSelect({
            id: data.driverId,
            callback: () => {
              if (data.driverId && data.driverId != nullGuid)
                this.vehicleDto.driverId = this.driversSelect.find(
                  (driver) => driver.id == data.driverId
                );
              else this.vehicleDto.driverId = defaultUser;
            },
          });
          this.getOwnersSelect(() => {
            if (data.ownerId && data.ownerId != nullGuid)
              this.vehicleDto.ownerId = this.ownersSelect.find(
                (owner) => owner.id == data.ownerId
              );
            else this.vehicleDto.ownerId = defaultUser;
          });
          this.$store.commit("Set_Main_Loading", false);
        },
      });
    } else {
      this.getDriversSelect();
      this.getOwnersSelect();
    }
    this.getEnumSelect(vehicleType);
    this.getModels();
  },
  methods: {
    moment,
    ...mapActions([
      "getEnumSelect",
      "getOwnersSelect",
      "getDriversSelect",
      "getModels",
      "getVehicle",
      "addVehicle",
      "updateVehicle",
      "deleteVehicle",
    ]),
    ownerDetails(row) {
      this.$router.replace("/admin/owners/" + row.row.id);
    },
    driverDetails(row) {
      this.$router.replace("/admin/drivers/" + row.row.driverId);
    },
    submitForm() {
      this.$refs.observer.validate().then((success) => {
        if (success && (this.vehicleDto.documents.length || this.vehicleDto.files.length) && (this.vehicleDto.ownerShip.length || this.vehicleDto.ownerShipFile.length)) {
          if (this.vehicleDto.id == nullGuid) {
            this.addVehicle({
              dto: this.vehicleDto,
              callback: this.resetForm,
            });
          } else {
            this.updateVehicle({
              dto: this.vehicleDto,
              callback: ({ data }) => {
                this.resetForm();
                data.ownerShip = [data.ownerShip];
                Object.assign(this.vehicleDto, data);
                if (data.driverId && data.driverId != nullGuid)
                  this.vehicleDto.driverId = this.driversSelect.find(
                    (driver) => driver.id == data.driverId
                  );
                else this.vehicleDto.driverId = defaultUser;
                if (data.ownerId && data.ownerId != nullGuid)
                  this.vehicleDto.ownerId = this.ownersSelect.find(
                    (driver) => driver.id == data.ownerId
                  );
                else this.vehicleDto.ownerId = defaultUser;
                this.$store.commit("Set_Main_Loading", false);
              },
            });
          }
        }
      });
    },
    deleteVehicleLocal() {
      this.deleteVehicle({
        id: this.id,
        callback: () => {
          this.$router.replace("/admin/vehicles");
        },
      });
    },
    resetForm() {
      this.$refs.observer.reset();
      this.$refs.files.clear();
      this.$refs.ownerShip?.clear();
      Object.assign(this.vehicleDto, {
        id: nullGuid,
        driverId: defaultUser,
        name: "",
        vehicleNumber: "0000000",
        modelId: null,
        color: "",
        type: 0,
        driverRate: 0,
        ownerRate: 0,
        ownerId: defaultUser,
        files: [],
        documents: [],
        ownerShipFile: [],
        ownerShip: [],
        ownerLogs: [],
        driverVehicles: [],
      });
      this.$store.commit("Set_Main_Loading", false);
    }
  },
};
</script>

<style scoped lang="scss">
.vc-chrome {
  width: 100%;
  box-shadow: 0 0 8px #b3b3b3;
}
</style>
