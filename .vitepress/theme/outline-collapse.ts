/**
 * 右侧目录（On this page）交互增强
 *
 * 做三件事：
 *   1. 给每个「一级条目」（对应正文的 ##）右边补一个三角按钮
 *   2. 点三角展开 / 收起它下面的「二级条目」（对应正文的 ###）
 *   3. 默认全部收起，否则模板页那种几十条小节的目录太长
 *
 * 为什么需要脚本、不能纯 CSS：
 *   目录的 DOM 是 VitePress 内置组件 VPDocOutlineItem.vue 递归渲染的，
 *   我们改不了它的模板，所以没法在 HTML 里预先写好按钮，
 *   只能在它渲染完之后用脚本补一个进去。
 *
 * 为什么要用 MutationObserver：
 *   VitePress 是单页应用，切换路由时目录整块重新渲染，
 *   之前补进去的按钮会连同旧 DOM 一起消失，必须重新补。
 *   监听 childList 就够了 —— 滚动只会改 class，不会增删节点。
 */

/** 目录最外层那个 ul */
const ROOT_SELECTOR = '.VPDocAsideOutline .VPDocOutlineItem.root'

/** 加在 li 上，表示这一节被收起了 */
const COLLAPSED = 'hhsw-outline-collapsed'

/** 加在 li 上，表示它下面还有子条目（也就是有三角） */
const HAS_CHILDREN = 'hhsw-outline-has-children'

/** 加在 a 上，防止同一个元素被重复处理 */
const DECORATED = 'hhswDecorated'

function decorate(): void {
  const root = document.querySelector<HTMLElement>(ROOT_SELECTOR)
  if (!root) return

  for (const li of Array.from(root.children)) {
    if (!(li instanceof HTMLLIElement)) continue

    const link = li.querySelector<HTMLAnchorElement>(':scope > .outline-link')
    const sub = li.querySelector<HTMLElement>(':scope > .VPDocOutlineItem')
    if (!link || !sub) continue

    // 没有子条目的 li 不需要三角；已经处理过的直接跳过
    if (link.dataset[DECORATED] === '1') continue
    link.dataset[DECORATED] = '1'

    li.classList.add(HAS_CHILDREN, COLLAPSED)

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'hhsw-outline-toggle'
    button.setAttribute('aria-label', '展开或收起子目录')
    button.setAttribute('aria-expanded', 'false')
    button.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()

      const collapsed = li.classList.toggle(COLLAPSED)
      button.setAttribute('aria-expanded', collapsed ? 'false' : 'true')

      // 收起 / 展开会改变各条目的纵向位置，而左侧那条紫色指示线是
      // VitePress 用 offsetTop 算出来的，不会自动跟着更新。
      // 手动派发一次 scroll，让它重算。
      window.dispatchEvent(new Event('scroll'))
    })

    // 插在链接后面，保证键盘 Tab 顺序是「链接 → 三角 → 子条目」
    link.insertAdjacentElement('afterend', button)
  }
}

export function setupOutlineCollapse(): void {
  if (typeof window === 'undefined') return

  decorate()
  window.addEventListener('load', decorate)

  let queued = false
  const observer = new MutationObserver(() => {
    if (queued) return
    queued = true
    requestAnimationFrame(() => {
      queued = false
      decorate()
    })
  })
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  })
}
