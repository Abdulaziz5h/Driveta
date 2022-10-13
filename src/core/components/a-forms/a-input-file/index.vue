<template>
  <b-form-group>
    <div class="d-flex justify-content-between align-items-center">
      <label class="m-0 text-capitalize" style="font-size: 14px;">{{ label }} <span v-if="required"
          class="text-danger">* مطلوب</span></label>
      <b-button @click="clear" variant="flat" size="sm" class="btn-icon">
        <i class="mdi mdi-delete text-danger"></i>
      </b-button>
    </div>
    <div>
      <label :for="'file_' + guid" class="title drop-label text-capitalize" :class="{ over: isDragging }"
        @dragover.prevent="dragOver" @dragleave.prevent="dragLeave" @drop.prevent="onFileChange">
        <small>{{ $t(title) }}</small>
      </label>
      <b-form-file :id="'file_' + guid" ref="file" class="d-none" :multiple="multiple" @input="onFileChange" />
      <div class="d-flex">
        <a-preview-gallery :multiple="multiple" :items="value" @remove="value.splice($event, 1)"
          :domain="$store.getters.domainHost" class="flex-grow-1 mx-1">
          <slot />
        </a-preview-gallery>
        <a-preview-gallery :multiple="multiple" @remove="removeFile" :items="previewImage" class="flex-grow-1 mx-1" />
      </div>
    </div>
  </b-form-group>
</template>
<script>
import Compressor from "compressorjs";
import { guid } from "@core/util/global/index.js";
// import { toast } from "@/libs/vue-toast.js";

export default {
  data: () => ({
    previewImage: [],
    innerValue: [],
    isDragging: false,
  }),
  props: {
    title: {
      type: String,
      default: () => "files.title",
    },
    label: String,
    multiple: Boolean,
    base64: Boolean,
    required: Boolean,
    height: String,
    value: null,
  },
  computed: {
    guid,
  },
  methods: {
    clear() {
      this.previewImage = [];
      this.innerValue = [];
      this.$refs.file.reset();
      this.isDragging = false;
      this.$emit("input", []);
    },
    removeFile(i) {
      this.previewImage.splice(i, 1);
      this.innerValue.splice(i, 1);
      this.$emit("input", this.innerValue);
    },
    dragOver() {
      this.isDragging = true;
    },
    dragLeave() {
      this.isDragging = false;
    },
    onFileChange(e) {
      if (e) {
        const data = e.dataTransfer == null ? e : [...e.dataTransfer.files];
        const files = !data[0] ? [data] : data;
        if (files.length) {
          this.previewImage = [];
          this.innerValue = [];
          const _vm = this;
          files.forEach((file, i, l) => {
            new Compressor(file, {
              quality: 0.6,
              success(result) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  _vm.previewImage.push({
                    name: file.name,
                    src: reader.result,
                  });
                  _vm.innerValue.push(
                    new File([result], file.name, {
                      lastModified: new Date().getTime(),
                      type: result.type,
                    })
                  );
                  if (i == l.length - 1) {
                    _vm.$emit("input", _vm.innerValue);
                  }
                };
              },
              error(err) {
                console.log(err.message);
                return false;
              },
            });
          });
        }
      }
    },
  },
};
</script>

<style lang="scss">
.over {
  background: #85e78330;
}

label.drop-label {
  display: flex;
  justify-content: center;
  align-items: center;
  border: dashed 1px var(--primary);
  padding: 1rem;
  color: var(--primary) !important;
  cursor: pointer;
  text-transform: capitalize;
}
</style>
