<script setup lang="ts">
import raw from '../../data/ratings.json'

const data = raw as Record<string, any>
const items = ['Codeforces', 'AtCoder'].map((k) => data[k]).filter(Boolean)

const CF_COLORS: Record<string, string> = {
  newbie: '#808080',
  pupil: '#008000',
  specialist: '#03A89E',
  expert: '#0000FF',
  'candidate master': '#AA00AA',
  master: '#FF8C00',
  'international master': '#FF8C00',
  grandmaster: '#FF0000',
  'international grandmaster': '#FF0000',
  'legendary grandmaster': '#FF0000'
}

const CF_NAMES: Record<string, string> = {
  newbie: 'Newbie',
  pupil: 'Pupil',
  specialist: 'Specialist',
  expert: 'Expert',
  'candidate master': 'Candidate Master',
  master: 'Master',
  'international master': 'International Master',
  grandmaster: 'Grandmaster',
  'international grandmaster': 'International Grandmaster',
  'legendary grandmaster': 'Legendary Grandmaster'
}

function acColor(r: number): string {
  if (r >= 2800) return '#FF0000'
  if (r >= 2400) return '#FF8C00'
  if (r >= 2000) return '#C0C000'
  if (r >= 1600) return '#0000FF'
  if (r >= 1200) return '#00C0C0'
  if (r >= 800) return '#008000'
  if (r >= 400) return '#804000'
  return '#808080'
}

function acName(r: number): string {
  if (r >= 2800) return 'Red'
  if (r >= 2400) return 'Orange'
  if (r >= 2000) return 'Yellow'
  if (r >= 1600) return 'Blue'
  if (r >= 1200) return 'Cyan'
  if (r >= 800) return 'Green'
  if (r >= 400) return 'Brown'
  return 'Gray'
}

function color(item: any): string {
  if (item.platform === 'Codeforces') return CF_COLORS[item.rank] ?? '#808080'
  return acColor(item.rating ?? 0)
}

function label(item: any): string {
  if (item.platform === 'Codeforces') return CF_NAMES[item.rank] ?? item.rank
  return acName(item.rating ?? 0)
}
</script>

<template>
  <div class="rating-grid">
    <a
      v-for="item in items"
      :key="item.platform"
      class="rating-card"
      :href="item.url"
      target="_blank"
      rel="noreferrer"
    >
      <div class="rating-head">
        <span class="rating-platform">{{ item.platform }}</span>
        <span class="rating-handle">{{ item.handle }}</span>
      </div>
      <div class="rating-main" :style="{ color: color(item) }">
        {{ item.rating ?? '—' }}
      </div>
      <div class="rating-meta">
        <span :style="{ color: color(item) }">{{ label(item) }}</span>
        <span>最高 {{ item.maxRating ?? '—' }}</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.rating-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin: 16px 0;
}

.rating-card {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  text-decoration: none !important;
  transition: border-color 0.25s;
}

.rating-card:hover {
  border-color: var(--vp-c-brand-1);
}

.rating-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 13px;
}

.rating-platform {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.rating-handle {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.rating-main {
  font-size: 32px;
  font-weight: 500;
  line-height: 1.2;
  margin: 8px 0 4px;
}

.rating-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
</style>
