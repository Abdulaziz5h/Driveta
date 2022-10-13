<template>
  <div class="location-container pl-3">
    <div
      @click="location = true"
      class="
        border
        location
        rounded
        py-1
        px-3
        d-flex
        align-items-center
        justify-content-between
      "
    >
      <div>
        <small>your location</small>
        <h6 class="text-primary">select a location</h6>
      </div>
      <i class="mdi mdi-crosshairs-gps"></i>
    </div>
    <b-modal
      hide-footer
      v-model="location"
      header-class="d-flex justify-content-between border-0 bg-white pb-0"
      body-class="p-0"
    >
      <template #modal-header>
        <div>
          <strong>Choose your Delivery Location</strong><br />
          <small
            >Enter your address and we will specify the offer for your
            area.</small
          >
          <a-input-text placeholder="search your area" name="area-search" />
        </div>
        <b-button variant="flat" class="btn-icon" @click="location = false">
          <i class="mdi mdi-close"></i>
        </b-button>
      </template>
      <template #default>
        <div class="loactions-container">
          <VuePerfectScrollbar class="scroll-area" :settings="settings">
            <b-list-group>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
                v-for="i in 10"
                :key="i"
              >
                Cras justo odio
                <b-badge class="border text-secondary" variant="flat" pill
                  >14</b-badge
                >
              </b-list-group-item>
            </b-list-group>
          </VuePerfectScrollbar>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar,
  },
  data: () => ({
    location: false,
    settings: {},
  }),
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/helpers/variables";
.location-container {
  flex-grow: 1;
  max-width: 240px;
  .location {
    border-radius: 6px!important;
    border-color: $borderColor;
    width: 100%;
    cursor: pointer;
    box-shadow: $shadow;
  }
  small {
    color: var(--font-color) !important;
  }
}
.loactions-container {
  ::v-deep {
    .list-group {
      min-height: 270px;
      height: calc(100vh - (124px + 3.5rem))
    }
  }
}
</style>
