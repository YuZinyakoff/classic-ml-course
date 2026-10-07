<script setup lang="ts">
import { computed } from 'vue'
import WeekFiveRankedList from './WeekFiveRankedList.vue'
import MathBlock from './MathBlock.vue'
import data from './week05-data.json'
const props = withDefaults(defineProps<{ mode?: 'roc' | 'pr'; step?: number; compact?: boolean }>(), { mode: 'roc', step: 0, compact: false })
const step = computed(() => Math.max(0, Math.min(12, props.step)))
const path = computed(() => `${import.meta.env.BASE_URL}assets/week-05/${props.mode}-step-${String(step.value).padStart(2, '0')}.svg`)
const tp = computed(() => data.labels.slice(0, step.value).reduce((a, b) => a + b, 0))
const fp = computed(() => step.value - tp.value)
const formula = computed(() => props.mode === 'roc'
  ? String.raw`(FPR,TPR)=\left(\frac{${fp.value}}7,\frac{${tp.value}}5\right)`
  : step.value === 0 ? '(Recall,Precision)=(0,1)'
  : String.raw`(Recall,Precision)=\left(\frac{${tp.value}}5,\frac{${tp.value}}{${step.value}}\right)`)
</script>

<template>
  <div class="curve-story" :class="{ compact }">
    <WeekFiveRankedList layout="vertical" :compact="compact" :show-legend="!compact" :step="step" />
    <div class="curve-panel">
      <img :src="path" :alt="`${mode.toUpperCase()}: отобраны первые ${step} объектов`" />
      <MathBlock :formula="formula" class="coordinates" />
    </div>
  </div>
</template>

<style scoped>
.curve-story { display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 45px; align-items: center; }
.curve-panel img { display: block; width: 100%; height: 418px; object-fit: contain; }
.coordinates { margin-top: 16px; text-align: center; font-size: 25px; }
.compact .curve-panel img { height: 340px; }
.compact .coordinates { margin-top: 8px; }
</style>
