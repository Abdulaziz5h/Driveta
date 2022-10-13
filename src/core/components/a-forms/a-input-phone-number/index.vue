<template>
  <b-form-group
    v-if="!readonly"
    v-bind="$attrs"
    class="a-form-group vue-phone-number-input-container"
  >
    <vue-phone-number-input
      v-bind="$attrs"
      v-model="innerVal"
      @update="obj = $event"
      :default-country-code="obj.countryCode"
      @phone-number-focused="tuched = true"
      :translations="{
        countrySelectorLabel: 'رمز البلد',
        countrySelectorError: 'اختر البلد',
        phoneNumberLabel: 'اكتب رقم الجوال هنا',
        example: 'مثال :'
      }"
    />
    <small class="text-danger" v-if="!obj.isValid && tuched">
      {{ $t(errorMessage) }}
    </small>
  </b-form-group>
  <a-input-text v-bind="$attrs" :name="name" :value="obj.formattedNumber" v-else readonly>
  </a-input-text>
</template>

<script>
import { BFormGroup } from "bootstrap-vue";
import { isValidJsonString } from "@core/util/global/index";
export default {
  components: {
    BFormGroup,
  },
  props: {
    value: {
      type: null,
    },
    name: {
      type: String
    },
    readonly: Boolean,
    errorMessage: {
      type: String,
      default: () => "رقم الجوال غير مقبول",
    },
  },
  mounted() {
    if (this.value && isValidJsonString(this.value)) {
      let value =
        typeof this.value == ("string" && isValidJsonString(value))
          ? JSON.parse(this.value)
          : this.value;
      if (isValidJsonString(value)) Object.assign(this.obj, JSON.parse(value));
      this.innerVal = this.obj.phoneNumber;
    }
  },
  data: () => ({
    innerVal: "",
    tuched: false,
    obj: {
      countryCode: "",
      isValid: false,
      phoneNumber: "",
      countryCallingCode: "",
      formattedNumber: "",
      nationalNumber: "",
      formatInternational: "",
      formatNational: "",
      uri: "",
      e164: "",
    },
  }),
  watch: {
    innerVal() {
      this.$emit("input", JSON.stringify(this.obj));
    },
    value(v) {
      if (isValidJsonString(v)) {
        Object.assign(this.obj, JSON.parse(v));
        this.innerVal = JSON.parse(v).phoneNumber;
      }
    },
  },
};
</script>

<style lang="scss">
.vue-phone-number-input-container {
  legend {
    font-size: 14px;
    text-transform: capitalize;
  }
  .vue-phone-number-input {
    height: 31px;
    .country-selector__label {
      display: none;
    }
    .country-selector__country-flag {
      top: 11px !important;
    }
    .country-selector__toggle {
      top: calc(50% - 12px) !important;
    }
    input.country-selector__input {
      padding-top: 0 !important;
      border-radius: 0;
      height: 31px !important;
      min-height: 31px !important;
    }
    .input-tel__label {
      font-size: 11px !important;
      top: 3px !important;
    }
    .has-value .input-tel__input {
      padding-top: 10px !important;
    }
    .country-selector {
      height: 31px;
      min-height: 31px;
    }
    .input-tel__input {
      padding-top: 0px !important;
      height: 31px !important;
      min-height: 31px !important;
    }
  }
}
</style>
