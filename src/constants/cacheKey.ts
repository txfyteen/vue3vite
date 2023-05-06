const SYSTEM_NAME = "admin-vite";
//"isolatedModules": false, 设置true无法使用constant
class CacheKey {
  static TOKEN = `${SYSTEM_NAME}-token-key`;
  static SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-key`;
  static ACTIVE_THEME_NAME = `${SYSTEM_NAME}-active-theme-name-key`;
  static LANGUAGE = `${SYSTEM_NAME}-language`;
}
export default CacheKey;
