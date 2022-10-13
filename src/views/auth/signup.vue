<template>
  <validation-observer ref="observer">
    <div class="pb-5">
      <b-form @submit.prevent>
        <h4 class="title text-center mt-5 pb-4">
          {{ $t("auth.signup.welcome") }}
          <span class="text-primary appName text-nowrap">منصة {{ appName }} 👋</span>
          <p class="title mb-0 mt-3 lead">
            {{ $t("auth.signup.we-are-happy") }} 🎉
          </p>
        </h4>
        <a-input-text label="الاسم" name="fullname" placeholder="اكتب الاسم هنا ..." v-model="userDto.name" :rules="[
          {
            type: 'required',
            message: 'الاسم مطلوب',
          },
        ]"></a-input-text>
        <a-input-text label="اسم المستخدم" name="username" placeholder="اكتب اسم المستخدم ..."
          v-model="userDto.userName" :rules="[
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
        <a-input-phone-number label="رقم الجوال" v-model="userDto.phoneNumber" />
        <a-input-text label="البريد الالكترني" name="email" placeholder="اكتب البريد الالكترني هنا ..."
          v-model="userDto.email" :rules="[
            {
              type: 'required',
              message: 'البريد الالكترني مطلوب',
            },
            {
              type: 'email',
              message: 'البريد الالكترني غير مقبول مثال: example@gmail.com',
            },
          ]"></a-input-text>

        <!-- <a-input-datepicker label="تاريخ الميلاد" no-header placeholder="اختر الميلاد" name="date" birthday
          :max="new Date()" v-model="date"/> -->
        <a-input-select :options="usersTypes" :label="$t('auth.login.form.type.label')"
          :placeholder="$t('auth.login.form.type.placeholder')" v-model="userDto.userType" name="type" />
        <a-input-text label="كلمة المرور" name="password" type="password" v-model="userDto.password"
          placeholder="اكتب كلمة المرور هنا ..." :rules="[
            {
              type: 'required',
              message: 'كلمة المرور مطلوبة',
            },
            {
              type: 'password',
              message:
                'كلمة المرور يجب ان تحتوي على الاقل حرف كبير وحرف صغير من اللغة الانجليزية ومحرف مخصص [!@#..] ورقم وبطول 8 محارف على الاقل',
            },
          ]"></a-input-text>
        <a-input-text label="تأكيد كلمة المرور" name="confirm-password" type="password"
          placeholder="اكتب تأكيد كلمة المرور هنا ..." :rules="[
            {
              type: 'required',
              message: 'تأكيد كلمة المرور مطلوب',
            },
            {
              type: 'confirmed:password',
              message: 'لا تطابق',
            },
          ]"></a-input-text>
        <b-button type="submit" variant="primary" size="sm" class="px-5" @click="_signup(userDto)">
          {{ $t("auth.signup.title") }}
        </b-button>
      </b-form>
    </div>
  </validation-observer>
</template>

<script>
import { nullGuid } from "@core/util/global/index.js";
import { mapActions } from "vuex";
import { usersTypes } from "@/store/modules/admin/accounts/index.js";
export default {
  props: {
    appName: String,
  },
  data: () => ({
    date: new Date(new Date().getFullYear() - 18),
    usersTypes,
    userDto: {
      id: nullGuid,
      userName: "",
      phoneNumber: "",
      email: "",
      bloodType: 0,
      password: "",
      userType: 0,
      isActive: false,
    },
  }),
  methods: {
    ...mapActions(["signup"]),
    _signup(userDto) {
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.signup({
            dto: userDto,
            callback: () => {
              this.$router.replace("/login");
              this.$store.commit("Set_Main_Loading", false);
            },
          });
        }
      });
    },
  },
};
</script>
