<template>
  <ValidationProvider :vid="vid" :name="name" :rules="faildRules">
    <b-form-group
      slot-scope="{ valid, errors }"
      v-bind="$attrs"
      class="a-form-group"
      :label-for="'label-for-text-' + id"
    >
      <b-form-input
        :id="'label-for-text-' + id"
        v-model="innerVal"
        v-bind="$attrs"
        @change="$emit('change', $event)"
        :class="fieldClass"
        trim
        size="sm"
        :min="min"
        :max="max"
        :type="type"
        :state="faildRules ? (errors[0] ? false : valid ? true : null) : null"
      ></b-form-input>
      <b-form-invalid-feedback>
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </b-form-group>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider, localize } from "vee-validate";
import { BFormGroup, BFormInput, BFormInvalidFeedback } from "bootstrap-vue";
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
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
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
    fieldClass: String,
    min: Number,
    max: Number,
  },
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
  data: () => ({
    innerVal: "",
    id: Math.random() * 100000,

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
  watch: {
    innerVal(v) {
      this.$emit("input", this.type == "number" ? +v : v ? v.trim() : "");
    },
    value(v) {
      this.innerVal = v;
    },
  },
};
</script>
