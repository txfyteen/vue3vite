import { createI18n } from "vue-i18n";
import { LANG_VALUE } from "@/common/enum";
import zh from "./zh";
import en from "./en";
import { getItem } from "@/utils/localStorage";
import CacheKey from "@/constants/cacheKey";
import { App } from "vue";
const getLanguage = () => {
  // 获取本地的缓存
  const localLanguage = getItem(CacheKey.LANGUAGE);
  if (localLanguage) return localLanguage;
  const language = navigator.language.toLowerCase();
  const locales = [LANG_VALUE.En, LANG_VALUE.Zh];

  for (const lang of locales) {
    // 是否包含这个关键字
    if (language.indexOf(lang) > -1) {
      debugger;
      return lang;
    }
  }
  return LANG_VALUE.Zh;
};

const i18n = createI18n({
  legacy: false,
  local: getLanguage(),
  messages: {
    [LANG_VALUE.Zh]: zh,
    [LANG_VALUE.En]: en,
  },
});

export default i18n;
export function setupI18n(app: App<Element>) {
  app.use(i18n);
}
