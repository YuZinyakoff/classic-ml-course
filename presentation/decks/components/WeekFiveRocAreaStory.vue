<script setup lang="ts">
import { computed, onMounted, ref, useId } from 'vue'

const props = withDefaults(defineProps<{ mode: 'single' | 'sum'; step?: number; height?: number }>(), { step: 0, height: 430 })
const stage = computed(() => Math.max(0, Math.min(props.mode === 'single' ? 4 : 5, props.step)))
const markup = ref('')
const prefix = `roc-area-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}-`

onMounted(async () => {
  const response = await fetch(`${import.meta.env.BASE_URL}assets/week-05/roc-area-layers.svg`)
  if (!response.ok) throw new Error('Cannot load Week 5 ROC area layers')
  // The plotting code owns all geometry. Only the layer visibility changes
  // here; namespace SVG references when the two slides are mounted together.
  const svg = await response.text()
  markup.value = svg
    .replace(/\bid="([^"]+)"/g, (_, id) => `id="${prefix}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`)
    .replace(/href="#([^"]+)"/g, (_, id) => `href="#${prefix}${id}"`)
})
</script>

<template>
  <div class="roc-area-story" :class="mode" :data-stage="stage" :style="{ height: `${height}px` }" role="img"
    :aria-label="mode === 'single' ? 'ROC: пошаговый вклад отрицательного объекта 0.68' : 'ROC: последовательно складываем семь прямоугольников'"
    v-html="markup" />
</template>

<style scoped>
.roc-area-story { width: 100%; height: 430px; }
.roc-area-story :deep(svg) { display: block; width: 100%; height: 100%; }
.roc-area-story :deep([id*="auc-rect-"]),
.roc-area-story :deep([id$="auc-outline"]),
.roc-area-story :deep([id$="auc-width"]),
.roc-area-story :deep([id$="auc-height"]),
.roc-area-story :deep([id$="auc-width-label"]),
.roc-area-story :deep([id$="auc-height-label"]),
.roc-area-story.sum :deep([id$="auc-focus"]) { display: none; }
.single[data-stage="2"] :deep([id$="auc-outline"]),
.single[data-stage="3"] :deep([id$="auc-outline"]),
.single[data-stage="4"] :deep([id$="auc-outline"]),
.single[data-stage="2"] :deep([id$="auc-width"]),
.single[data-stage="3"] :deep([id$="auc-width"]),
.single[data-stage="4"] :deep([id$="auc-width"]),
.single[data-stage="2"] :deep([id$="auc-height"]),
.single[data-stage="3"] :deep([id$="auc-height"]),
.single[data-stage="4"] :deep([id$="auc-height"]),
.single[data-stage="2"] :deep([id$="auc-width-label"]),
.single[data-stage="3"] :deep([id$="auc-width-label"]),
.single[data-stage="4"] :deep([id$="auc-width-label"]),
.single[data-stage="2"] :deep([id$="auc-height-label"]),
.single[data-stage="3"] :deep([id$="auc-height-label"]),
.single[data-stage="4"] :deep([id$="auc-height-label"]),
.single[data-stage="3"] :deep([id$="auc-rect-1"]),
.single[data-stage="4"] :deep([id$="auc-rect-1"]),
.sum :deep([id$="auc-rect-1"]),
.sum[data-stage="1"] :deep([id$="auc-rect-2"]),
.sum[data-stage="2"] :deep([id*="auc-rect-"]),
.sum[data-stage="3"] :deep([id*="auc-rect-"]),
.sum[data-stage="4"] :deep([id*="auc-rect-"]),
.sum[data-stage="5"] :deep([id*="auc-rect-"]) { display: inline; }
</style>
