<script setup lang="ts">
import data from './week05-data.json'
import MathBlock from './MathBlock.vue'
// Two consecutive halves of one list, already sorted by decreasing probability.
const rows = data.scores.map((p, rank) => ({ id: rank + 1, p, y: data.labels[rank] }))
</script>

<template>
  <div class="evaluation-tables">
    <table v-for="half in [rows.slice(0, 6), rows.slice(6)]" :key="half[0].id">
      <thead><tr><th>Объект</th><th><MathBlock formula="\hat p" :display="false" /></th><th>Настоящий класс <MathBlock formula="y" :display="false" /></th></tr></thead>
      <tbody><tr v-for="row in half" :key="row.id"><td>{{ row.id }}</td><td>{{ row.p.toFixed(2) }}</td><td>{{ row.y }}</td></tr></tbody>
    </table>
  </div>
</template>

<style scoped>
.evaluation-tables { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
table { width: 100%; border-collapse: collapse; font-size: 25px; text-align: center; }
th { font-size: 22px; font-weight: 500; color: var(--week-muted); }
td, th { padding: 10px 16px; border-bottom: 1px solid var(--week-line); }
td { font-variant-numeric: tabular-nums; }
th .deck-math { display: inline-block; }
</style>
