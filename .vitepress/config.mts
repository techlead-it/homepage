import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "株式会社テックリード",
  description: "株式会社テックリードホームページ",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '会社概要', link: '/pages/about' },
      { text: '会社説明', link: '/pages/overview' },
    ],

    sidebar: [
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/techlead-it/homepage' }
    ]
  }
})
