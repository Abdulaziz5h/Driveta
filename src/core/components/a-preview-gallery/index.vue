<template>
  <div class="bg-light rounded border p-2" :class="{ 'text-center': !multiple }" v-if="items.length">
    <template v-for="(img, index) in items">
      <slot :items="items" :remove="removeFile">
        <span :key="index" class="
            d-inline-block
            position-relative
            text-center
            border
            rounded
            m-2
            p-2
          ">
          <b-button variant="outline-danger" class="btn-icon p-1 remove" @click="removeFile(index)" size="sm">
            <i class="mdi mdi-close"></i>
          </b-button>
          <img :src="domain + img.src" :width="multiple ? 80 : 180" :height="multiple ? 80 : 180" alt=""
            @click="showDialog(img)" class="image" />
          <small b.popover.bottom :title="img.name" class="d-block">{{ (img.name || '').slice(0, 10) }}
            {{ (img.name || '').length > 10 ? "..." : "" }}</small>
        </span>
      </slot>
    </template>
    <b-modal ref="preview" hide-footer header-class="pb-2" size="xl" title-class="h6 title" body-class="p-0" :title="titleSrc">
      <img :src="previewSrc" class="w-100"/>
    </b-modal>
  </div>
</template>

<script>
export default {
  data: () => ({
    titleSrc: '',
    previewSrc: '',
  }),
  props: {
    domain: {
      type: String,
      default: () => "",
    },
    items: {
      type: Array,
      require: true,
      default: () => [],
    },
    multiple: Boolean,
  },
  methods: {
    removeFile(index) {
      this.$emit("remove", index);
    },
    showDialog(img) {
      this.titleSrc = img.name.split('.')[0];
      this.previewSrc = this.domain + img.src;
      this.$refs['preview'].show()
    }
  },
};
</script>

<style scoped lang="scss">
.remove {
  position: absolute;
  top: 3px;
  left: 3px;
  z-index: 10;
  height: 20px !important;
  font-size: 14px !important;
}

.image {
  object-fit: cover;
  transition: 0.4s;
  cursor: pointer;
  border-radius: 0.25rem;

  &:hover {
    transform: scale(1.5);
  }
}
</style>
