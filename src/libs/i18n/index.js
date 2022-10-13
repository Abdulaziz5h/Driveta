import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'

Vue.use(VueI18n)
function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
            const locale = matched['input'].split('/')[1]
            messages[locale] = Object.assign({}, messages[locale], locales(key))
        }
  })
  return messages
}

export function getSiteLanguage() {
  return localStorage.getItem('siteLanguage') || 'ar'
}
export const setSiteLanguage = (lang) => {
  localStorage.setItem('siteLanguage', lang)
}

export const setDir = () => {
  const html = document.getElementsByTagName('html')[0];
  html.dir = getSiteLanguage() == 'ar' ? 'rtl' : 'ltr'
  store.commit('Toggle_Lang')
}

export function isRtl() {
  return getSiteLanguage() == 'ar';
}

export default new VueI18n({
  locale: getSiteLanguage(),
  fallbackLocale: getSiteLanguage(),
  messages: loadLocaleMessages(),
})
