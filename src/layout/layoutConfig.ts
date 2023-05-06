export interface ILayoutSetting {
  // 是否显示setting Panel
  showSetting: boolean;
  // 是否显示标签栏
  showTagsView: boolean;
  // 是否显示侧标栏
  showSidebarLogo: boolean;
  // 是否固定header
  fixedHeader: boolean;
  // 是否显示消息通知
  showNotify: boolean;
  // 是否显示切换主题按钮
  showThemeSwitch: boolean;
  //是否显示全屏
  showScreenFull: boolean;
  //是否显示灰色模式
  showGreyMode: boolean;
  // 是否显示色弱模式
  showColorWeakness: boolean;
}

const layoutSetting: ILayoutSetting = {
  showSetting: true,
  showTagsView: true,
  fixedHeader: true,
  showSidebarLogo: true,
  showNotify: true,
  showThemeSwitch: true,
  showScreenFull: true,
  showGreyMode: false,
  showColorWeakness: false,
};

export default layoutSetting;
