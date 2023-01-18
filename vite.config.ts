import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import path from "path";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
// vite 的mock加载器
import { viteMockServe } from "vite-plugin-mock";
// svg加载器
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    vue(),
    // * name 可以写在 script 标签上
    VueSetupExtend(),
    viteMockServe({
      mockPath: "./src/mock", // 设置模拟.ts 文件的存储文件夹
      localEnabled: true, // 设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
      prodEnabled: true, // 设置打包是否启用 mock 功能
      supportTs: true, // 打开后，可以读取 ts ⽂件模块。请注意，打开后将⽆法监视.js ⽂件。
      watchFiles: true, // 监视⽂件更改，并重新加载 mock 数据
      /* 如果生产环境开启了 mock 功能,即prodEnabled=true.则该代码会被注入到injectFile对应的文件的底部。默认为main.{ts,js}
      这样做的好处是,可以动态控制生产环境是否开启 mock 且在没有开启的时候 mock.js 不会被打包。
      如果代码直接写在main.ts内，则不管有没有开启,最终的打包都会包含mock.js
      */
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
    }),
    // 配置svg插件
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[name]",
    }),
  ],
});
