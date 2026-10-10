import { defineConfig } from 'vitepress'
import markdownItKatexModule from '@vscode/markdown-it-katex'

// 这个包是用 CommonJS 打包的，真正的函数挂在 .default 上。
// 不同的打包器对 CJS 的处理不一样，这里两种形式都兜住：
// 拿到的是 { default: fn } 就取 .default，拿到的是 fn 就直接用。
const markdownItKatex =
  (markdownItKatexModule as any).default ?? markdownItKatexModule

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "HHSW的Blog",
  description: "个人博客与学习记录",

  // 数学公式：让 Markdown 里的 $公式$ / $$公式$$ 渲染成真正的数学排版
  markdown: {
    config: (md) => {
      md.use(markdownItKatex, { throwOnError: false })
    }
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 顶栏：全站唯一的导航入口
    nav: [
      { text: '主页', link: '/' },
      { text: '模板', link: '/templates/' },
      { text: '心得', link: '/problems/' },
      { text: '关于', link: '/about' }
    ],

    // 不要左侧栏：导航只靠顶栏，避免同一批链接重复出现
    sidebar: false,

    // 关掉每页底部的「上一页 / 下一页」翻页按钮
    docFooter: {
      prev: false,
      next: false
    },

    // 右侧「On this page」目录显示到三级标题（h2 + h3）
    // 模板页的每个模板都是 h3，这样目录里就能直接跳到想看的那个模板
    outline: [2, 3],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/HHSW-yhw/HHSW-yhw.github.io' }
    ]
  }
})
