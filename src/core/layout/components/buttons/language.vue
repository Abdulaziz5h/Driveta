<template>
  <b-button size="sm" variant="outline-primary" class="lang" @click="setLang()">{{lang == 'ar' ? 'en' : 'ar'}}</b-button>
</template>

<script>
import { getSiteLanguage, setSiteLanguage, setDir } from "@/libs/i18n";
export default {
  data: () => {
    let lang = getSiteLanguage()
    return {
      lang
    }
  },
  methods: {
    getSiteLanguage,
    setLang() {
      this.lang = getSiteLanguage() == 'ar' ? 'en' : 'ar';
      this.$i18n.locale = this.lang
      setSiteLanguage(this.lang)
      setDir()
    }
  }
}
</script>

<style scoped>
.lang {
  text-transform: uppercase!important;
}
</style>