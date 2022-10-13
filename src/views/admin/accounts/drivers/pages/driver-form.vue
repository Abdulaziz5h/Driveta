<template>
  <div>
    <validation-observer ref="observer">
      <b-row>
        <b-col cols="12" class="d-flex mb-2 align-items-center">
          <a-back path="/admin/drivers" v-if="isAdmin()" />
          <!-- <h6 class="title pl-3 m-0">
            <strong>{{ $t("driver.driver-balance") }}:
              <span class="text-info">
                {{ driverDto.balance
                }}<small class="font-weight-bold">{{ $t("sp") }}</small>
              </span>
            </strong>
          </h6> -->
          <b-button variant="primary" size="sm" class="ml-auto px-4" @click="submitDriverForm()">{{ $t("ok") }}
          </b-button>
          <a-block-user @input="actionBlock" :id="id" :dateBlock="driverDto.dateBlocked"
            v-if="driverDto.isActive && isAdmin() && driverDto.id != nullGuid" />
          <a-active-user @input="driverDto.isActive = true" :id="id"
            v-if="!driverDto.isActive && isAdmin() && driverDto.id != nullGuid" />
          <b-button variant="danger" size="sm" @click="deleteDriverLocal()" v-if="isEdit" class="px-3 ml-2">{{
              $t("delete")
          }}</b-button>
        </b-col>
        <b-col cols="12" md="6">
          <a-input-text :label="$t('driver.form.name.label')" :placeholder="$t('driver.form.name.placeholder')"
            name="name" v-model="driverDto.name" :rules="[
              {
                type: 'required',
                message: $t('driver.form.name.validation.required'),
              },
            ]" />
        </b-col>
        <b-col cols="12" md="6">
          <a-input-text :label="$t('driver.form.username.label')" :readonly="isEdit"
            :placeholder="$t('driver.form.username.placeholder')" name="username" v-model="driverDto.userName" :rules="[
              {
                type: 'required',
                message: $t('driver.form.username.validation.required'),
              },
              {
                type: 'username',
                message: $t('driver.form.username.validation.unValidUsername'),
              },
            ]" />
        </b-col>
        <b-col cols="12" md="6">
          <a-input-file ref="personalImage" required :label="$t('driver.form.personalImage.label')"
            :value="driverDto.personalImage" @input="driverDto.personalImageFile = $event" />
        </b-col>
        <b-col cols="12" md="6">
          <a-input-file ref="idPhoto" required :label="$t('driver.form.idPhoto.label')" :value="driverDto.idPhoto"
            @input="driverDto.idPhotoFile = $event" />
        </b-col>
        <b-col cols="12" md="6">
          <a-media-select :options="[defaultVehicle, ...availableVehicles]"
            :document="(item) => (item.documents ? item.documents[0].src : null)"
            :label="$t('driver.form.vehicleId.label')" :placeholder="$t('driver.form.vehicleId.placeholder')"
            ref="vehicleId" v-model="driverDto.vehicleId">
            <template slot="title" slot-scope="{ item }">
              <span v-if="item.modelName">
                {{ item.modelName }} - {{ item.name }}
              </span>
              <span v-else class="d-inline-block mt-2">
                {{ item.name }}
              </span>
            </template>
            <template slot="subTitle" v-if="item.ownerName" slot-scope="{ item }">
              {{ item.ownerName }}
            </template>
          </a-media-select>
          <a-input-text :label="$t('driver.form.rate.label')" readonly :placeholder="$t('driver.form.rate.placeholder')"
            name="rate" v-model="driverDto.rate" type="number" />
          <a-input-text :label="$t('driver.form.email.label')" :placeholder="$t('driver.form.email.placeholder')"
            name="email" v-model="driverDto.email" :rules="[
              {
                type: 'required',
                message: $t('driver.form.email.validation.required'),
              },
              {
                type: 'email',
                message: $t('driver.form.email.validation.unValidEmail'),
              },
            ]" />
          <a-input-phone-number :label="$t('driver.form.phone.label')"
            :placeholder="$t('driver.form.phone.placeholder')" v-model="driverDto.phoneNumber" />
          <a-input-text :label="$t('driver.form.password.label')" :placeholder="$t('driver.form.password.placeholder')"
            name="password" type="password" v-model="driverDto.password" :rules="[
              {
                type: 'password',
                message: $t('driver.form.password.validation.unValidPassword'),
              },
            ]" />
        </b-col>
        <b-col cols="12" md="6">
          <a-input-select :label="$t('driver.form.bloodType.label')" :options="BloodType" valueLabel="item2"
            textLabel="item1" :placeholder="$t('driver.form.bloodType.placeholder')" :rules="[
              {
                type: 'required',
                message: $t('driver.form.bloodType.validation.required'),
              },
            ]" name="bloodType" v-model="driverDto.bloodType" />
          <a-input-file ref="drivingCertificate" required :label="$t('driver.form.drivingCertificate.label')"
            :value="driverDto.drivingCertificate" @input="driverDto.drivingCertificateFile = $event" />
        </b-col>
        <b-col cols="12" v-if="driverDto.vehicles.length">
          <b-card no-body>
            <b-card-header>
              <h6 class="title mb-0">
                {{ $t("driver.vehicle-table.title") }}
              </h6>
            </b-card-header>
            <a-v-datatable :headers="vehicleColumn" :items="driverDto.vehicles" :collapseOptoins="collapseOptoins"
              classes="borderd cell-borderd striped" class="mb-2">
              <template slot="header-th" slot-scope="{ th }">
                <th class="text-capitalize" v-if="th.label != 'actions'">
                  {{ $t("vehicle.table.columns." + th.label) }}
                </th>
                <th class="text-capitalize" v-else>
                  {{ $t("details") }}
                </th>
              </template>
              <template slot="logs.header-th" slot-scope="{ th }">
                <th class="text-capitalize">
                  {{ $t("vehicle.table.columns." + th.label) }}
                </th>
              </template>
              <template slot="row-td.color" slot-scope="{ value }">
                <div class="d-flex align-items-center">
                  <i class="mdi mdi-palette pr-2" :style="'font-size: 22px; color:' + value"></i>
                  <i :style="'line-height: 1 ;color:' + value">{{ value }}</i>
                </div>
              </template>
              <template slot="row-td.startDate" slot-scope="{ value }">
                {{ value ? moment(value).format("MMMM Do YYYY") : $t("present") }}
              </template>
              <template slot="row-td.endDate" slot-scope="{ value }">
                {{ value ? moment(value).format("MMMM Do YYYY") : $t("present") }}
              </template>
              <template slot="logs.row-td.startDate" slot-scope="{ value }">
                {{ value ? moment(value).format("MMMM Do YYYY") : $t("present") }}
              </template>
              <template slot="logs.row-td.endDate" slot-scope="{ value }">
                {{ value ? moment(value).format("MMMM Do YYYY") : $t("present") }}
              </template>
              <template slot="collapse-icon">
                <i class="mdi mdi-chevron-up"></i>
              </template>
              <template slot="row-td.actions" slot-scope="{ row }">
                <div class="text-center">
                  <b-button size="sm" variant="flat-secondary" class="btn-icon rounded-circle"
                    style="padding: 2px 6px !important" @click="vehicleDetails(row)">
                    <i class="mdi mdi-dots-vertical"></i>
                  </b-button>
                </div>
              </template>
            </a-v-datatable>
          </b-card>
        </b-col>
        <b-col cols="12" v-if="isEdit">
          <div class="mt-3 mb-2">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn" :class="deliveryStatueTab == 0 ? 'btn-primary' : 'btn-outline-primary'"
                @click="setDeliveryType(0)">{{ deliveryStatue[0] }}</button>
              <button type="button" class="btn" :class="deliveryStatueTab == 1 ? 'btn-primary' : 'btn-outline-primary'"
                @click="setDeliveryType(1)">{{ deliveryStatue[1] }}</button>
              <button type="button" class="btn" :class="deliveryStatueTab == 2 ? 'btn-primary' : 'btn-outline-primary'"
                @click="setDeliveryType(2)">{{ deliveryStatue[2] }}</button>
              <button type="button" class="btn" :class="deliveryStatueTab == 3 ? 'btn-primary' : 'btn-outline-primary'"
                @click="setDeliveryType(3)">{{ deliveryStatue[3] }}</button>
              <button type="button" class="btn" :class="deliveryStatueTab == 4 ? 'btn-primary' : 'btn-outline-primary'"
                @click="setDeliveryType(4)">{{ deliveryStatue[4] }}</button>
            </div>
          </div>
          <a-table title="التوصيلات" :items="deliveries[deliveryStatueEn[deliveryStatueTab].split(' ').join('')]"
            :columns="columns" no_footer no_select @details="deliveryDetails($event.row)">
            <template slot="headers" slot-scope="{ props }">
              <template v-if="
                props.column.field != 'details' && props.column.field != 'status'
              ">
                {{ props.column.label }}
              </template>
              <template v-else-if="props.column.field == 'details'">
                <div class="text-center">
                  {{ $t("details") }}
                </div>
              </template>
              <template v-else>
                <div class="text-center">
                  {{ props.column.label }}
                </div>
              </template>
            </template>
            <template slot="items.distance" slot-scope="{ value }">
              <div class="text-center">
                {{ value }} متر
              </div>
            </template>
            <template slot="items.expectedTime" slot-scope="{ value }">
              <div class="text-center">
                {{ value }}
              </div>
            </template>
            <template slot="items.dateCreated" slot-scope="{ value }">
              {{ moment(value).format("MMM Do YY") }}
            </template>
            <template slot="items.type" slot-scope="{ value }">
              {{ deliveryType[value] }}
            </template>

            <template slot="items.price" slot-scope="{ value }">
              <div class="text-center">
                {{ value }} {{ $t('sp') }}
              </div>
            </template>
          </a-table>
        </b-col>
      </b-row>
    </validation-observer>
  </div>
</template>
<script>
import { nullGuid } from "@core/util/global/index.js";
import { mapActions, mapState } from "vuex";
import { bloodType } from "@/store/modules/shared.store";
import moment from "moment";
import { isAdmin, isDriver, currentUserId } from "@core/util/auth";

const defaultVehicle = {
  id: nullGuid,
  name: "no vehicle",
};
export default {
  props: {
    id: String,
  },
  data: () => ({
    deliveryStatueTab: 0,
    nullGuid,
    defaultVehicle,
    isEdit: false,
    driverDto: {
      id: nullGuid,

      vehicleId: defaultVehicle,
      vehicles: [],

      idPhotoFile: [],
      idPhoto: [],

      personalImageFile: [],
      personalImage: [],

      drivingCertificateFile: [],
      drivingCertificate: [],

      rate: 0,
      balance: 0,
      bloodType: 0,
      name: "",
      userName: "",
      phoneNumber: "",
      email: "",
      password: "",
      dateBlocked: null,
      isActive: true,
    },
    collapseOptoins: {
      enable: true,
      label: "logs",
      headers: [
        {
          label: "rate",
          value: "rate",
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
    vehicleColumn: [
      {
        label: "name",
        value: "vehicleName",
      },
      {
        label: "color",
        value: "color",
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
    columns: [
      {
        label: "إلتقاط",
        field: "pickUp",
        sortable: false,
      },
      {
        label: "الوجهة",
        field: "dropOff",
        sortable: false,
      },
      {
        label: "النوع",
        field: "type",
        sortable: false,
      },
      {
        label: "المسافة",
        field: "distance",
      },
      {
        label: "الوقت المتوقع",
        field: "expectedTime",
        sortable: false,
      },
      {
        label: "التاريخ",
        field: "dateCreated",
        sortable: false,
      },
      {
        label: "التكلفة",
        field: "price",
      },
      {
        label: "details",
        field: "details",
        sortable: false,
      },
    ],
  }),
  computed: {
    ...mapState({
      BloodType: (state) => state.shared.BloodType,
      availableVehicles: (state) => state["admin/vehicle"].availableVehicles,
      deliveryStatue: status => status['admin/deliveries'].deliveryStatue,
      deliveryStatueEn: status => status['admin/deliveries'].deliveryStatueEn,
      deliveries: (state) => state['admin/deliveries'].deliveries,
      deliveryType: status => status['admin/deliveries'].deliveryType
    }),
  },
  created() {
    this.isEdit = this.id != nullGuid;
    if ((isDriver() && this.id == currentUserId()) || isAdmin()) {
      if (this.isEdit) {
        this.$store.commit("Set_Main_Loading", true);
        this.getDriver({
          id: this.id,
          callback: ({ data }) => {
            data.personalImage = [data.personalImage];
            data.idPhoto = [data.idPhoto];
            data.drivingCertificate = [data.drivingCertificate];
            Object.assign(this.driverDto, data);
            this.getAvailable({
              id: data.vehicleId,
              callback: () => {
                if (data.vehicleId && data.vehicleId != nullGuid)
                  this.driverDto.vehicleId = this.availableVehicles.find(
                    (vehicle) => vehicle.id == data.vehicleId
                  );
                else this.driverDto.vehicleId = defaultVehicle;
              },
            });
            this.$store.commit("Set_Main_Loading", false);
          },
        });
        this.getDeliveriesByUserId({ id: this.id, type: 4 })
      } else this.getAvailable();
      this.getEnumSelect(bloodType);
    } else {
      this.$router.replace("/access-denied");
    }
  },
  methods: {
    moment,
    isAdmin,
    ...mapActions([
      "getEnumSelect",
      "getAvailable",
      "getDriver",
      "addDriver",
      "updateDriver",
      "driverDelete",
      "getDeliveriesByUserId"
    ]),
    actionBlock(block) {
      this.driverDto.dateBlocked = block;
    },
    submitDriverForm() {
      this.$refs.observer.validate().then((success) => {
        if (success &&
          (this.driverDto.idPhotoFile.length || this.driverDto.idPhoto.length) &&
          (this.driverDto.personalImage.length || this.driverDto.personalImageFile.length) &&
          (this.driverDto.drivingCertificate.length || this.driverDto.drivingCertificateFile.length)) {
          if (!this.isEdit) {
            this.addDriver({
              dto: this.driverDto,
              callback: () => {
                this.$store.commit("Remove_Vehicle", this.driverDto.vehicleId);
                this.resetForm();
                this.$store.commit("Set_Main_Loading", false);
              },
            });
          } else {
            this.updateDriver({
              dto: this.driverDto,
              callback: ({ data }) => {
                this.resetForm();
                data.personalImage = [data.personalImage];
                data.idPhoto = [data.idPhoto];
                data.drivingCertificate = [data.drivingCertificate];
                Object.assign(this.driverDto, data);
                if (data.vehicleId && data.vehicleId != nullGuid)
                  this.driverDto.vehicleId = this.availableVehicles.find(
                    (vehicle) => vehicle.id == data.vehicleId
                  );
                else this.driverDto.vehicleId = defaultVehicle;
                this.$store.commit("Set_Main_Loading", false);
              },
            });
          }
        }
      });
    },
    vehicleDetails(row) {
      this.$router.replace("/admin/vehicles/" + row.row.vehicleId);
    },
    setDeliveryType(type) {
      this.deliveryStatueTab = type;
    },
    deliveryDetails(row) {
      this.$router.push('/admin/deliveries/' + row.id)
    },
    deleteDriverLocal() {
      this.driverDelete({
        id: this.driverDto.id,
        callback: () => {
          this.$router.replace("/admin/drivers");
        },
      });
    },
    resetForm() {
      this.$refs.observer.reset();
      Object.assign(this.driverDto, {
        id: nullGuid,

        vehicleId: defaultVehicle,
        vehicles: [],

        idPhotoFile: [],
        idPhoto: [],

        personalImageFile: [],
        personalImage: [],

        drivingCertificateFile: [],
        drivingCertificate: [],

        rate: 0,
        balance: 0,
        bloodType: 0,
        name: "",
        userName: "",
        phoneNumber: "",
        email: "",
        password: "",
        dateBlocked: null,
        isActive: true,
      });
      this.$refs.idPhoto.clear();
      this.$refs.personalImage.clear();
      this.$refs.drivingCertificate.clear();
    },
  },
};
</script>
