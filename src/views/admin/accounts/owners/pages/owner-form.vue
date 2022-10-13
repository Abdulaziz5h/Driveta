<template>
  <validation-observer ref="observer">
    <b-row>
      <b-col cols="12" class="d-flex mb-2 align-items-center">
        <a-back path="/admin/owners" v-if="isAdmin()" />
        <!-- <h6 class="title pl-3 m-0">
          <strong>{{ $t("owner.owner-balance") }}:
            <span class="text-info">
              {{ ownerDto.balance
              }}<small class="font-weight-bold">{{ $t("sp") }}</small>
            </span>
          </strong>
        </h6> -->
        <b-button variant="primary" class="px-4 ml-auto" size="sm" @click="submitForm()">{{ $t("ok") }}</b-button>
        <a-block-user @input="actionBlock" :id="id" :dateBlock="ownerDto.dateBlocked"
          v-if="ownerDto.isActive && isAdmin() && isEdit" />
        <a-active-user @input="ownerDto.isActive = true" :id="id" v-if="!ownerDto.isActive && isAdmin() && ownerDto.id != nullGuid" />
        <b-button variant="danger" size="sm" class="px-3 ml-2" @click="deleteLocal()" v-if="isEdit">{{ $t("delete") }}
        </b-button>
      </b-col>
      <b-col cols="12" md="6">
        <a-input-text :label="$t('owner.form.name.label')" :placeholder="$t('owner.form.name.placeholder')" name="name"
          v-model="ownerDto.name" :rules="[
            {
              type: 'required',
              message: $t('owner.form.name.validation.required'),
            },
          ]" />
        <a-input-file ref="personalImage" required :label="$t('owner.form.personalImage.label')"
          :value="ownerDto.personalImage" @input="ownerDto.personalImageFile = $event" />
      </b-col>
      <b-col cols="12" md="6">
        <a-input-text :label="$t('owner.form.userName.label')" :readonly="isEdit"
          :placeholder="$t('owner.form.userName.placeholder')" name="userName" v-model="ownerDto.userName" :rules="[
            {
              type: 'required',
              message: $t('owner.form.userName.validation.required'),
            },
            {
              type: 'username',
              message: $t('owner.form.userName.validation.unValidUsername'),
            },
          ]" />
        <a-input-phone-number :label="$t('owner.form.phone.label')" :placeholder="$t('owner.form.phone.placeholder')"
          v-model="ownerDto.phoneNumber" />
        <a-input-text :label="$t('owner.form.rate.label')" readonly :placeholder="$t('owner.form.rate.placeholder')"
          name="rate" :value="ownerDto.rate" type="number" />
        <a-input-text :label="$t('owner.form.email.label')" :placeholder="$t('owner.form.email.placeholder')"
          name="email" v-model="ownerDto.email" :rules="[
            {
              type: 'required',
              message: $t('owner.form.email.validation.required'),
            },
            {
              type: 'email',
              message: $t('owner.form.email.validation.unValidEmail'),
            },
          ]" />
        <a-input-text :label="$t('owner.form.password.label')" :placeholder="$t('owner.form.password.placeholder')"
          name="password" type="password" v-model="ownerDto.password" :rules="[
            {
              type: 'password',
              message: $t('owner.form.password.validation.unValidPassword'),
            },
          ]" />
      </b-col>
      <b-col cols="12" v-if="ownerDto.vehicles.length">
        <b-card no-body>
          <b-card-header>
            <h6 class="title mb-0">
              {{ $t("owner.vehicle-table.title") }}
            </h6>
          </b-card-header>
          <a-v-datatable :headers="vehicleColumn" :items="ownerDto.vehicles" :collapseOptoins="collapseOptoins"
            classes="borderd cell-borderd striped" class="mb-2">
            <template slot="header-th" slot-scope="{ th }">
              <th class="text-capitalize" v-if="th.label != 'actions'">
                {{ $t("vehicle.table.columns." + th.label) }}
              </th>
              <th class="text-capitalize" v-else>
                {{ $t("details") }}
              </th>
            </template>
            <template slot="vehicleLogs.header-th" slot-scope="{ th }">
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
            <template slot="row-td.model" slot-scope="{ value }">
              {{ value.name }}
            </template>
            <template slot="vehicleLogs.row-td.startDate" slot-scope="{ value }">
              {{ value ? moment(value).format("MMMM Do YYYY") : $t("present") }}
            </template>
            <template slot="vehicleLogs.row-td.endDate" slot-scope="{ value }">
              {{ value ? moment(value).format("MMMM Do YYYY") : $t("present") }}
            </template>
            <template slot="vehicleLogs.row-td.value" slot-scope="{ value }">
              {{ value }} %
            </template>
            <template slot="collapse-icon">
              <i class="mdi mdi-chevron-up"></i>
            </template>
            <template slot="row-td.actions" slot-scope="{ row }">
              <div class="text-center">
                <b-button size="sm" variant="flat-secondary" class="btn-icon rounded-circle"
                  style="padding: 2px 6px !important" @click="vehicolDetails(row)">
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
import { nullGuid } from "@core/util/global/index.js";
import { mapActions } from "vuex";
import moment from "moment";
import { isAdmin, isOwner, currentUserId } from "@core/util/auth";
export default {
  props: {
    id: String,
  },
  data: () => ({
    nullGuid,
    ownerDto: {
      id: nullGuid,
      name: "",
      userName: "",
      personalImageFile: [],
      personalImage: [],
      vehicles: [],
      balance: 0,
      phoneNumber: "",
      email: "",
      password: "",
      dateBlocked: null,
      isActive: true,
    },
    collapseOptoins: {
      enable: true,
      label: "vehicleLogs",
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
    vehicleColumn: [
      {
        label: "name",
        value: "name",
      },
      {
        label: "color",
        value: "color",
      },
      {
        label: "vehicleNumber",
        value: "vehicleNumber",
      },
      {
        label: "modelName",
        value: "model",
      },
      {
        label: "actions",
        value: "actions",
      },
    ],
    isEdit: false,
  }),
  created() {
    this.isEdit = this.id != nullGuid;
    if ((isOwner() && this.id == currentUserId()) || isAdmin()) {
      if (this.isEdit) {
        this.GetOwner({
          id: this.id,
          callback: ({ data }) => {
            data.personalImage = [data.personalImage];
            Object.assign(this.ownerDto, data);
            this.$store.commit("Set_Main_Loading", false);
          },
        });
      }
    } else {
      this.$router.replace("/access-denied");
    }
  },
  methods: {
    moment,
    isAdmin,
    ...mapActions(["GetOwner", "addOwner", "updateOwner", "ownerDelete"]),
    submitForm() {
      this.$refs.observer.validate().then((success) => {
        if (success && (this.ownerDto.personalImageFile.length || this.ownerDto.personalImage.length)) {
          if (this.ownerDto.id == nullGuid) {
            this.addOwner({
              dto: this.ownerDto,
              callback: this.resetForm,
            });
          } else {
            this.updateOwner({
              dto: this.ownerDto,
              callback: ({ data }) => {
                this.resetForm();
                data.personalImage = [data.personalImage];
                Object.assign(this.ownerDto, data);
              },
            });
          }
        }
      });
    },
    actionBlock(block) {
      this.ownerDto.dateBlocked = block;
    },
    vehicolDetails(row) {
      this.$router.replace("/admin/vehicles/" + row.row.id);
    },
    deleteLocal() {
      this.ownerDelete({
        id: this.ownerDto.id,
        callback: () => {
          this.$router.replace("/admin/owners");
        },
      });
    },
    resetForm() {
      this.$refs.observer.reset();
      this.$refs.personalImage.clear();
      Object.assign(this.ownerDto, {
        id: nullGuid,
        name: "",
        userName: "",
        personalImageFile: [],
        personalImage: [],
        vehicles: [],
        balance: 0,
        phoneNumber: "",
        email: "",
        password: "",
        dateBlocked: null,
        isActive: true,
      });
      this.$store.commit("Set_Main_Loading", false);
    },
  },
};
</script>
