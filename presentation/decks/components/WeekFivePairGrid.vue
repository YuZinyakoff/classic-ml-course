<script setup lang="ts">
import data from './week05-data.json'
withDefaults(defineProps<{ stage?: number }>(), { stage: 2 })
const positives = data.scores.filter((_, i) => data.labels[i] === 1)
const negatives = data.scores.filter((_, i) => data.labels[i] === 0)
</script>

<template>
  <div class="pair-grid">
    <div class="axis">Класс 1 ↓<br />Класс 0 →</div>
    <div v-for="p in negatives" :key="p" class="axis">{{ p.toFixed(2) }}</div>
    <template v-for="(p, row) in positives" :key="p">
      <div class="axis positive">{{ p.toFixed(2) }}</div>
      <div v-for="(n, col) in negatives" :key="n" class="pair" :class="{ correct: p > n, incorrect: p < n, unrevealed: stage < 2 && (row > 0 || (stage === 0 && col > 0)) }">{{ p > n ? '✓' : '×' }}</div>
    </template>
  </div>
</template>

<style scoped>
.pair-grid { display: grid; grid-template-columns: 115px repeat(7, 1fr); grid-template-rows: 58px repeat(5, 57px); gap: 7px; max-width: 1000px; margin: auto; }
.axis { display: grid; place-content: center; font-size: 22px; color: var(--week-blue); text-align: center; font-variant-numeric: tabular-nums; }
.axis:first-child { font-size: 16px; color: var(--week-muted); }.positive { color: var(--week-orange); }
.pair { display: grid; place-content: center; font-size: 30px; border-radius: 5px; }
.correct { background: var(--week-green-soft); color: var(--week-green); }.incorrect { background: #eff2f6; color: var(--week-muted); }
.unrevealed { color: transparent; background: #fafbfc; border: 1px solid var(--week-line); }
</style>
