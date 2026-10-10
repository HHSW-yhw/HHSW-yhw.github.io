import DefaultTheme from 'vitepress/theme'
import './custom.css'
// KaTeX 的样式表：数学公式的字体、符号、上下限位置全靠它
import 'katex/dist/katex.min.css'
import RatingCard from './components/RatingCard.vue'
import { setupOutlineCollapse } from './outline-collapse'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('RatingCard', RatingCard)

    // 右侧目录：一级条目加粗放大、二级条目可收起
    setupOutlineCollapse()
  }
}
