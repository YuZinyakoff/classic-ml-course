<script setup lang="ts">
import data from './week05-calibration.json'
withDefaults(defineProps<{ construction?: boolean; step?: number }>(), { construction: false, step: 0 })
</script>

<template>
  <table v-if="!construction" class="calibration-table">
    <thead><tr><th>Наблюдаемая частота<br>события</th><th>Модель A</th><th>Модель B</th></tr></thead>
    <tbody><tr v-for="(q, i) in data.q" :key="i"><td>{{ data.p[i].toFixed(2) }}</td><td>{{ data.p[i].toFixed(2) }}</td><td>{{ q.toFixed(4) }}</td></tr></tbody>
  </table>
  <table v-else class="calibration-table construction">
    <thead><tr><th>Группа</th><th>Средний<br>прогноз</th><th>Частота<br>события</th></tr></thead>
    <tbody><tr v-for="(q, i) in data.q" :key="i" :class="{ focus: step === 1 && i === 0 }"><td>{{ i + 1 }}</td><td>{{ q.toFixed(4) }}</td><td>{{ data.p[i].toFixed(2) }}</td></tr></tbody>
  </table>
</template>

<style scoped>
.calibration-table { width: 100%; table-layout: fixed; border-collapse: collapse; font-size: 26px; text-align: center; }
th, td { padding: 9px 10px; border-bottom: 1px solid var(--week-line); }
th { text-align: center; font-size: 23px; font-weight: 500; color: var(--week-muted); }
th .deck-math { display: inline-block; }
td { font-variant-numeric: tabular-nums; }
.focus { background: var(--week-green-soft); color: var(--week-green); }
.construction { font-size: 25px; }
.construction th, .construction td { padding: 12px 6px; }
</style>
