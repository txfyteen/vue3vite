import { defineStore } from "pinia";
import layoutSetting from "@/layout/layoutConfig";
export const useSettingStore = defineStore({
  id: "setting",
  state: () => ({
    settingConfig: {
      fixedHeader: layoutSetting.fixedHeader,
      showSetting: layoutSetting.showSetting,
      showTagsView: layoutSetting.showTagsView,
      showSidebarLogo: layoutSetting.showSidebarLogo,
      showNotify: layoutSetting.showNotify,
      showThemeSwitch: layoutSetting.showThemeSwitch,
      showScreenFull: layoutSetting.showScreenFull,
      showGreyMode: layoutSetting.showGreyMode,
      showColorWeakness: layoutSetting.showColorWeakness,
    },
  }),
});
