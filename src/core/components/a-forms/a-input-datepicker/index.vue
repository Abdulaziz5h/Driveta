<template>
  <ValidationProvider :vid="vid" :name="name" :rules="faildRules">
    <b-form-group
      slot-scope="{ valid, errors }"
      class="a-form-group a-form-datepicker"
      v-bind="$attrs"
      :label-for="'label-for-datepicker-' + id"
    >
      <VueDatePicker
        :id="'label-for-datepicker-' + id"
        class="picker"
        v-model="innerVal"
        v-bind="$attrs"
        ref="menu"
        :type="type"
        :placeholder="placeholder"
        :no-header="no_header"
        :min-date="min"
        :max-date="max"
        :state="faildRules ? (errors[0] ? false : valid ? true : null) : null"
        @onOpen="birthday ? setMenu() : () => {}"
        @onClose="birthday ? resetMenu() : () => {}"
      />
      <b-form-invalid-feedback>
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </b-form-group>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider, localize } from "vee-validate";
import { BFormGroup } from "bootstrap-vue";
import ar from "vee-validate/dist/locale/ar.json";
import {
  required,
  email,
  confirmed,
  regex,
  url,
  credit,
  password,
  between,
  alpha,
  integer,
  digits,
  alphaDash,
  alphaNum,
  length,
  no_spaces,
  positive,
  minVal,
  maxVal,
  english_letters_numbers,
  mobile,
  phone,
  time,
  username,
} from "@validations";
export default {
  components: {
    ValidationProvider,
    // bootstrap vue
    BFormGroup
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    birthday: Boolean,
    vid: {
      type: String,
    },
    rules: {
      type: Array,
      default: () => [],
    },
    type: String,
    value: {
      type: null,
    },
    min: Date,
    max: Date,
    no_header: Boolean,
    placeholder: String
  },
  data: () => ({
    innerVal: "",
    id: Math.random() * 100000,
    menu: false,

    // validation
    required,
    email,
    confirmed,
    regex,
    url,
    credit,
    password,
    between,
    alpha,
    integer,
    digits,
    alphaDash,
    alphaNum,
    length,
    no_spaces,
    positive,
    minVal,
    maxVal,
    english_letters_numbers,
    mobile,
    phone,
    time,
    username,
  }),
  setup(props) {
    let faildRules = "";
    let fields = {};
    props.rules.forEach((rule) => {
      faildRules += rule.type + "|";
      fields[rule.type.split(":")[0]] = rule.message;
    });
    faildRules = faildRules.slice(0, faildRules.length - 1);
    localize("ar", {
      messages: ar.messages,
      fields: {
        [props.name]: fields,
      },
    });
    return { faildRules };
  },
  mounted() {
    if (this.value) {
      this.innerVal = this.value;
    }
  },
  methods: {
    resetMenu() {
      this.menu = false
    },
    setMenu() {
      this.menu = true
    }
  },
  watch: {
    innerVal(v) {
      this.$emit("input", v);
    },
    value(v) {
      this.innerVal = v;
    },
    menu (val) {
      val && this.birthday && setTimeout(() => (this.$refs.menu.$refs.agenda.mode = 'year'));
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/helpers/variables";
.a-form-datepicker .picker{
  box-shadow: $shadow;
  border: solid 1px $borderColor;
  border-radius: 6px;
  padding-left: 8px;
  .vd-picker__input-icon {
    margin-top: 8px;
  }
  input {
    box-shadow: none!important;
    max-height: 38px;
  }
}
</style>