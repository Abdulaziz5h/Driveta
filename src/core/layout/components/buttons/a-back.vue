<template>
  <b-button variant="outline-secondary" size="sm" @click="back()">
    <i class="mdi mdi-arrow-right"></i>
  </b-button>
</template>

<script>
export default {
  props: {
    path: String
  },
  methods: {
    back() {
      this.$router.replace(this.path);
    },
  }
}
</script>