// 构建时抓取 Codeforces / AtCoder 评分，写入 .vitepress/data/ratings.json
// 单个平台失败时沿用上一次的数据，绝不中断构建。

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, '.vitepress', 'data', 'ratings.json')

const HANDLES = {
  Codeforces: 'yanghuwei',
  AtCoder: 'huhushengwei'
}

async function getJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

async function fetchCodeforces() {
  const handle = HANDLES.Codeforces
  const data = await getJson(
    `https://codeforces.com/api/user.info?handles=${handle}`
  )
  if (data.status !== 'OK') throw new Error(data.comment || 'CF API 返回异常')
  const u = data.result[0]
  return {
    platform: 'Codeforces',
    handle: u.handle,
    rating: u.rating ?? null,
    maxRating: u.maxRating ?? null,
    rank: u.rank ?? 'unrated',
    url: `https://codeforces.com/profile/${u.handle}`
  }
}

async function fetchAtCoder() {
  const handle = HANDLES.AtCoder
  const list = await getJson(`https://atcoder.jp/users/${handle}/history/json`)
  const rated = list.filter((h) => h.IsRated)
  if (!rated.length) throw new Error('没有 rated 的比赛记录')
  const last = rated[rated.length - 1]
  return {
    platform: 'AtCoder',
    handle,
    rating: last.NewRating,
    maxRating: Math.max(...rated.map((h) => h.NewRating)),
    contests: rated.length,
    url: `https://atcoder.jp/users/${handle}`
  }
}

const settled = await Promise.allSettled([fetchCodeforces(), fetchAtCoder()])

let prev = {}
try {
  prev = JSON.parse(await fs.readFile(OUT, 'utf8'))
} catch {
  // 首次运行没有旧数据，正常
}

const next = { ...prev }
for (const r of settled) {
  if (r.status === 'fulfilled') {
    next[r.value.platform] = {
      ...r.value,
      updatedAt: new Date().toISOString().slice(0, 10)
    }
    console.log(`[ratings] ${r.value.platform} 更新成功 → ${r.value.rating}`)
  } else {
    console.warn(`[ratings] 抓取失败，沿用旧数据 → ${r.reason?.message}`)
  }
}

await fs.mkdir(path.dirname(OUT), { recursive: true })
await fs.writeFile(OUT, JSON.stringify(next, null, 2) + '\n', 'utf8')
