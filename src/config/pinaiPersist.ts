import { PersistedStateOptions } from "pinia-plugin-persistedstate";

/**
 * 持久化参数配置
 * @param key 存储到持久化的name
 * @param paths 持久化的state name
 */
const piniaPersistConfig = (key: string, paths?: string[]) => {
  const persist: PersistedStateOptions = {
    key,
    storage: window.localStorage,
    paths,
  };
  return persist;
};

export default piniaPersistConfig;
