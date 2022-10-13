<template>
  <validation-observer ref="observer">
    <b-container>
      <b-row class="pb-5 pt-3">
        <b-col cols="12" class="d-flex mb-2 align-items-center">
          <!-- <h6 class="title m-0">
            <strong>الرصيد:
              <span class="text-info">
                {{ dto.balance
                }}<small class="font-weight-bold">{{ $t("sp") }}</small>
              </span>
            </strong>
          </h6> -->
          <b-button variant="primary" class="px-4 ml-auto" size="sm" @click="submitForm()">{{ $t("ok") }}</b-button>
        </b-col>
        <b-col cols="12" lg="6">
          <a-input-text name="name" v-model="dto.name" label="الاسم" placeholder="اكتب الاسم هنا ..." :rules="[
            {
              type: 'required',
              message: 'الاسم مطلوب',
            },
          ]"></a-input-text>
          <a-input-file ref="personalImage" required label="الصورة الشخصية" :value="dto.personalImage"
            @input="dto.personalImageFile = $event" />
        </b-col>
        <b-col cols="12" lg="6">
          <a-input-text name="username" v-model="dto.userName" label="اسم المستخدم" placeholder="اكتب اسم المستخدم ..."
            :rules="[
              {
                type: 'required',
                message: 'اسم المستخدم مطلوب',
              },
              {
                type: 'username',
                message:
                  'اسم المستخدم يجب ان يحتوي على احرف انجليزية وارقام فقط ويطلب 6 محارف على الاقل',
              },
            ]"></a-input-text>
          <a-input-phone-number label="رقم الجوال" v-model="dto.phoneNumber" />
          <a-input-text name="email" v-model="dto.email" abel="البريد الالكترني"
            placeholder="اكتب البريد الالكترني هنا ..." :rules="[
              {
                type: 'required',
                message: 'البريد الالكترني مطلوب',
              },
              {
                type: 'email',
                message: 'البريد الالكترني غير مقبول مثال: example@gmail.com',
              },
            ]"></a-input-text>
          <a-input-text name="password" type="password" v-model="dto.password" label="كلمة المرور"
            placeholder="اكتب كلمة المرور هنا ..." :rules="[
              {
                type: 'password',
                message:
                  'كلمة المرور يجب ان تحتوي على الاقل حرف كبير وحرف صغير من اللغة الانجليزية ومحرف مخصص [!@#..] ورقم وبطول 8 محارف على الاقل',
              },
            ]"></a-input-text>
        </b-col>
        <b-col cols="12">
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
          <a-table title="التوصيلات" :items="deliveries[deliveryStatueEn[deliveryStatueTab].split(' ').join('')]" :columns="columns"
            no_footer no_select @details="deliveryDetails($event.row)">
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
    </b-container>
  </validation-observer>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { nullGuid } from "@core/util/global/index.js";
import useJwt from "@core/util/auth/jwt/useJwt";
import moment from "moment";
export default {
  props: {
    id: String,
  },
  computed: {
    ...mapState({
      deliveries: (state) => state['admin/deliveries'].deliveries,
      deliveryStatue: status => status['admin/deliveries'].deliveryStatue,
      deliveryStatueEn: status => status['admin/deliveries'].deliveryStatueEn,
      deliveryType: status => status['admin/deliveries'].deliveryType
    }),
  },
  data: () => ({
    deliveryStatueTab: 0,
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
    dto: {
      id: nullGuid,
      userName: "",
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
      balance: 0,
      personalImageFile: [],
      personalImage: [],
      deliveries: [],
      dateBlocked: null,
      isActive: true,
    },
  }),
  created() {
    this.getCustomerById({
      id: this.id,
      callback: ({ data }) => {
        data.personalImage = data.personalImage.src ? [data.personalImage] : [];
        Object.assign(this.dto, data);
        this.$store.commit("Set_Main_Loading", false);
      },
    });
    this.getDeliveriesByUserId({ id: this.id, type: 2 })
  },
  methods: {
    moment,
    ...mapActions(["getCustomerById", "modifyCustomer", "getDeliveriesByUserId"]),
    submitForm() {
      this.$refs.observer.validate().then((success) => {
        if (success && (this.dto.personalImage.length || this.dto.personalImageFile.length)) {
          this.dto.isActive = true
          this.modifyCustomer({
            dto: this.dto,
            callback: () => {
              this.resetForm();
              useJwt.logOut();
              this.$router.replace("/login");
              this.$store.commit("Set_Main_Loading", false);
            },
          });
        }
      });
    },
    setDeliveryType(type) {
      this.deliveryStatueTab = type;
    },
    deliveryDetails(row) {
      this.$router.push('/admin/deliveries/' + row.id)
    },
    resetForm() {
      this.$refs.observer.reset();
      this.$refs.personalImage.clear();
      Object.assign(this.dto, {
        id: nullGuid,
        userName: "",
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        balance: 0,
        personalImageFile: [],
        personalImage: [],
        deliveries: [],
        dateBlocked: null,
        isActive: true,
      });
    },
  },
};
</script>
