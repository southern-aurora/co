import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CO",
  description: "为你冗长繁杂的脚本们设置一个简单易记的别名",
  locales: {
    root: {
      label: "中文",
      lang: "zh",
    },
    zh: {
      label: "English",
      lang: "en",
      link: "https://github.com/akirarika/co",
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [],

    sidebar: [
      {
        text: "入门",
        items: [
          { text: "指南", link: "/docs/000-guide" },
          { text: "安装", link: "/docs/001-install" },
          { text: "JavaScript 包管理器", link: "/docs/002-javascript-package-manager" },
        ],
      },
      {
        text: "命令",
        items: [
          { text: "自定义命令", link: "/docs/003-custom-commands" },
          { text: "模板语法", link: "/docs/004-template-syntax" },
          { text: "模板内置方法", link: "/docs/005-builtin-methods" },
          { text: "全局配置", link: "/docs/006-global-config" },
        ],
      },
      {
        text: "食谱",
        items: [
          { text: "Windows", link: "/docs/007-windows" },
          { text: "运行网络脚本", link: "/docs/008-run-web-scripts" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/akirarika/co" }],
  },
});
