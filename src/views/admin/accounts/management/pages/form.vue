<template>
  <validation-observer ref="observer">
    <b-row>
      <b-col cols="12" class="d-flex mb-2 align-items-center">
        <a-back path="/admin/management" />
        <b-button variant="primary" size="sm" class="ml-auto px-4" @click="submitForm()">{{ $t("ok") }}</b-button>
      </b-col>
      <b-col cols="12" v-if="!canEdit() && isEdit">
        <div class="card">
          <div class="card-header text-capitalize">تفاصيل المدير</div>
          <div class="card-body d-flex">
            <img v-if="
              managerDto.personalImage[0] && managerDto.personalImage[0].src
            " :src="
  $store.getters.domainHost +
  '/' +
  managerDto.personalImage[0].src
" width="120" height="120" :alt="managerDto.name + 'image'" class="mr-3" />
            <img v-else src="@/assets/images/placeholder-user-image.jpg" width="120" height="120"
              :alt="managerDto.name + 'image'" class="mr-3" />
            <div>
              <div>
                <label class="text-capitalize font-weight-bold mr-2">{{ $t("customer.details.name") }}: </label>{{
                    managerDto.name
                }}
              </div>
              <div>
                <label class="text-capitalize font-weight-bold mr-2">{{ $t("customer.details.username") }}: </label>{{
                    managerDto.userName
                }}
              </div>
              <div>
                <label class="text-capitalize font-weight-bold mr-2">{{ $t("customer.details.phonenumber") }}:
                </label>{{
                    managerDto.phoneNumber &&
                      isValidJsonString(managerDto.phoneNumber)
                      ? JSON.parse(managerDto.phoneNumber).formattedNumber
                      : "---"
                }}
              </div>
              <div>
                <label class="text-capitalize font-weight-bold mr-2 mb-0">{{ $t("customer.details.email") }}: </label>{{
                    managerDto.email
                }}
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="12" v-else>
        <b-row>
          <b-col cols="12" md="6">
            <a-input-text label="الاسم" name="name" :rules="[
              {
                type: 'required',
                message: $t('management.form.name.validation.required'),
              },
            ]" placeholder="اكتب الاسم هنا..." v-model="managerDto.name">
            </a-input-text>
          </b-col>
          <b-col cols="12" md="6">
            <a-input-text label="اسم المستخدم" name="username" :readonly="isEdit" :rules="[
              {
                type: 'required',
                message: $t('management.form.username.validation.required'),
              },
              {
                type: 'username',
                message: $t(
                  'management.form.username.validation.unValidUsername'
                ),
              },
            ]" placeholder="اكتب اسم المستخدم هنا..." v-model="managerDto.userName">
            </a-input-text>
          </b-col>
          <b-col cols="12" md="6">
            <a-input-text label="E-mail" name="email" :rules="[
              {
                type: 'required',
                message: $t('management.form.email.validation.required'),
              },
              {
                type: 'email',
                message: $t('management.form.email.validation.unValidEmail'),
              },
            ]" placeholder="اكتب E-mail هنا..." v-model="managerDto.email">
            </a-input-text>
          </b-col>
          <b-col cols="12" md="6">
            <a-input-phone-number label="رقم الموبايل" name="phonenumber" v-model="managerDto.phoneNumber" />
          </b-col>
          <b-col cols="12" md="6">
            <a-input-text label="كلمة المرور" type="password" name="password" :rules="[
              {
                type: 'password',
                message: $t(
                  'management.form.password.validation.unValidPassword'
                ),
              },
            ]" placeholder="اكتب كلمة المرور هنا..." v-model="managerDto.password">
            </a-input-text>
          </b-col>
          <b-col cols="12" md="6">
            <a-input-file ref="personalImage" required :label="$t('management.form.personalImage.label')"
              :value="managerDto.personalImage" @input="managerDto.personalImageFile = $event" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </validation-observer>
</template>
<script>
import { nullGuid } from "@core/util/global/index.js";
import { mapActions } from "vuex";
import { isValidJsonString } from "@core/util/global/index";
import { currentUserId } from "@core/util/auth";
import useJwt from "@core/util/auth/jwt/useJwt";
export default {
  props: {
    id: String,
  },
  data: () => ({
    isEdit: false,
    managerDto: {
      id: nullGuid,
      userName: "",
      name: "",
      phoneNumber: "",
      password: "",
      email: "",
      personalImageFile: [],
      personalImage: [],
      dateBlocked: null,
      isActive: true,
    },
  }),
  created() {
    this.isEdit = this.id != nullGuid;
    if (this.isEdit) {
      this.managerDetails({
        id: this.id,
        callback: ({ data }) => {
          data.personalImage = data.personalImage.src
            ? [data.personalImage]
            : [];
          Object.assign(this.managerDto, data);
          this.$store.commit("Set_Main_Loading", false);
        },
      });
    }
  },
  methods: {
    ...mapActions(["managerDetails", "addManager", "updateManager"]),
    isValidJsonString,
    canEdit() {
      return currentUserId() == this.managerDto.id;
    },
    submitForm() {
      this.$refs.observer.validate().then((success) => {
        if (success && (this.managerDto.personalImage.length || this.managerDto.personalImageFile.length)) {
          if (this.managerDto.id == nullGuid) {
            this.addManager({
              dto: this.managerDto,
              callback: this.resetDto,
            });
          } else {
            this.updateManager({
              dto: this.managerDto,
              callback: () => {
                this.resetDto();
                useJwt.logOut();
                this.$router.replace("/cpanel");
              },
            });
          }
        }
      });
    },
    resetDto() {
      this.$refs.observer.reset();
      Object.assign(this.managerDto, {
        id: nullGuid,
        userName: "",
        name: "",
        phoneNumber: "",
        password: "",
        email: "",
        personalImageFile: [],
        personalImage: [],
        dateBlocked: null,
        isActive: true,
      });
      this.$refs.personalImage.clear();
      this.$store.commit("Set_Main_Loading", false);
    },
  },
};
</script>
