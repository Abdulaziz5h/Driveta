<template>
  <ValidationProvider :vid="vid" :name="name" :rules="faildRules">
    <b-form-group
      slot-scope="{ valid, errors }"
      v-bind="$attrs"
      class="a-form-group"
      :label-for="'label-for-text-' + id"
    >
      <b-form-textarea
        :id="'label-for-text-' + id"
        v-model="innerVal"
        v-bind="$attrs"
        :class="fieldClass"
        trim
        :rows="rows"
        size="sm"
        :type="type"
        :state="faildRules ? (errors[0] ? false : valid ? true : null) : null"
      ></b-form-textarea>
      <b-form-invalid-feedback>
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </b-form-group>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider, localize } from "vee-validate";
import { BFormGroup, BFormTextarea, BFormInvalidFeedback } from "bootstrap-vue";
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
  max,
  min,
  length,
  no_spaces,
  positive,
} from "@validations";
export default {
  components: {
    ValidationProvider,
    // bootstrap vue
    BFormGroup,
    BFormTextarea,
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
    rows: {
      type: String,
      default: () => "4",
    },
    fieldClass: String,
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
    max,
    min,
    length,
    no_spaces,
    positive,
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

<style scoped lang="scss">
.a-form-group ::v-deep label {
  margin: 0%;
  font-size: inherit;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: calc(0.438rem + 1px);
  padding-bottom: calc(0.438rem + 1px);
}
</style>
