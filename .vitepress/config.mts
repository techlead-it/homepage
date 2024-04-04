import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "株式会社テックリード",
  description: "株式会社テックリードのホームページ",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
    ],

    sidebar: [
      {
        text: '会社概要',
        link: '/pages/about',
      },
      {
        text: '会社説明',
        link: '/pages/introduction',
      },
      {
        text: '採用',
        link: '/pages/recruitment',
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/techlead-it/homepage' }
    ],

    search: {
      provider: 'local'
    }

  }
})
