<template>
  <span>
    <b-button variant="secondary" v-if="dateBlock" size="sm" @click="blockUser" class="ptn-icon px-3 ml-2"
      v-b-popover.hover.top="$t('unblock')"><i class="mdi mdi-lock-open" style="line-height: 1.1;"></i></b-button>
    <b-button variant="warning" @click="blockUser" size="sm" v-else class="ptn-icon px-3 ml-2"
      v-b-popover.hover.top="$t('block')"><i class="mdi mdi-block-helper" style="line-height: 1.11;"></i></b-button>
  </span>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    id: String,
    dateBlock: String,
  },
  methods: {
    ...mapActions(["block"]),
    blockUser() {
      this.block({
        id: this.id,
        callback: ({ data }) => {
          this.$emit('input', data.message == 'unblocked' ? null : new Date().toLocaleDateString("en-gb"));
          this.$store.commit("Set_Main_Loading", false);
        },
      });
    },
  },
};
</script>
