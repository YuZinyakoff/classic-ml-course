<script setup lang="ts">
withDefaults(defineProps<{
  values?: number[]
  focus?: 'none' | 'accuracy' | 'precision' | 'recall' | 'specificity'
  stage?: number
  showValues?: boolean
  compact?: boolean
}>(), { values: () => [4, 3, 1, 4], focus: 'none', stage: 2, showValues: true, compact: false })
const codes = ['TN', 'FP', 'FN', 'TP']
const denominators = { none: [], accuracy: [0, 1, 2, 3], precision: [1, 3], recall: [2, 3], specificity: [0, 1] }
const numerators = { none: [], accuracy: [0, 3], precision: [3], recall: [3], specificity: [0] }
</script>

<template>
  <div class="confusion" :class="{ compact }">
    <div class="blank" /><div class="axis">Прогноз 0</div><div class="axis">Прогноз 1</div>
    <template v-for="row in [0, 1]" :key="row">
      <div class="axis row-axis">Истинный {{ row }}</div>
      <div v-for="col in [0, 1]" :key="col" class="cell" :class="{ denominator: focus !== 'none' && denominators[focus].includes(2 * row + col), numerator: stage >= 1 && focus !== 'none' && numerators[focus].includes(2 * row + col), error: focus === 'none' && row !== col }">
        <span class="code">{{ codes[2 * row + col] }}</span>
        <span class="value" :style="{ visibility: showValues ? 'visible' : 'hidden' }">{{ values[2 * row + col] }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.confusion { display: grid; grid-template-columns: 120px 1fr 1fr; grid-template-rows: 56px 148px 148px; gap: 4px; width: 100%; max-width: 500px; margin: auto; }
.axis { display: grid; place-items: center; color: var(--week-muted); font-size: 21px; }
.row-axis { justify-content: start; }
.cell { display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 15px; border: 2px solid var(--week-line); background: #f7f9fc; }
.code { font-size: 29px; font-weight: 650; }
.value { font-size: 36px; font-weight: 700; font-variant-numeric: tabular-nums; }
.error { background: var(--week-orange-soft); }
.denominator { background: var(--week-blue-soft); border-color: #9cb7ec; }
.numerator { color: var(--week-green); border: 3px solid var(--week-green); background: var(--week-green-soft); }
.compact { grid-template-columns: 88px 1fr 1fr; grid-template-rows: 52px 112px 112px; }
.compact .axis { font-size: 18px; }.compact .code { font-size: 24px; }.compact .value { font-size: 31px; }
</style>
