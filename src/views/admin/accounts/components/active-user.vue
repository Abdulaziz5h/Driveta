<template>
  <span>
    <b-button variant="success" size="sm" @click="activateUser" class="px-3 ml-2"
      v-b-popover.hover.top="$t('activate')"><i class="mdi mdi-lock-open" style="line-height: 1; font-size: 17px;"></i></b-button>
  </span>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    id: String,
  },
  methods: {
    ...mapActions(["active"]),
    activateUser() {
      this.active({
        id: this.id,
        callback: () => {
          this.$emit("input");
          this.$store.commit("Set_Main_Loading", false);
        },
      });
    },
  },
};
</script>
