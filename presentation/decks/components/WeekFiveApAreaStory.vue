<script setup lang="ts">
import { computed, onMounted, ref, useId } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'

const props = withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const stage = computed(() => Math.max(0, Math.min(5, props.step)))
const nav = useNav()
const { $page } = useSlideContext()
const isPrint = nav.isPrintMode
const markup = ref('')
const prefix = `ap-area-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}-`
// Load the existing local plotting asset. Only visibility changes;
// neither controls nor Vue draw plot geometry.
onMounted(async () => {
  const response = await fetch(`${import.meta.env.BASE_URL}assets/week-05/pr-ap-area-layers.svg`)
  if (!response.ok) throw new Error('Cannot load Week 5 AP area layers')
  markup.value = (await response.text())
    .replace(/\bid="([^"]+)"/g, (_, id) => `id="${prefix}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`)
    .replace(/href="#([^"]+)"/g, (_, id) => `href="#${prefix}${id}"`)
})
const go = (value: number) => nav.go($page.value, Math.max(0, Math.min(5, value)))
</script>

<template>
  <div class="ap-area-story" :class="{ 'static-export': isPrint }" :data-stage="stage">
    <div class="ap-area-plot" role="img"
      :aria-label="`AP: показаны ${stage} из пяти прямоугольников под ступенчатой PR-кривой`"
      v-html="markup" />
    <div v-if="!isPrint" class="ap-area-controls" @click.stop @pointerdown.stop>
      <button type="button" data-ap-action="back" :disabled="stage === 0" @click="go(stage - 1)">← Назад</button>
      <span aria-live="polite">{{ stage }} / 5</span>
      <button type="button" data-ap-action="next" :disabled="stage === 5" @click="go(stage + 1)">Добавить →</button>
      <button type="button" data-ap-action="reset" :disabled="stage === 0" @click="go(0)">Сначала</button>
    </div>
  </div>
</template>

<style scoped>
.ap-area-story { width: 100%; height: 430px; }
.ap-area-plot { height: 380px; }
.static-export .ap-area-plot { height: 430px; }
.ap-area-story :deep(svg) { display: block; width: 100%; height: 100%; }
.ap-area-controls { display: flex; justify-content: center; align-items: center; gap: 14px; height: 40px; margin-top: 10px; font-size: 20px; }
.ap-area-controls button { border: 1px solid var(--week-line); border-radius: 5px; padding: 4px 10px; background: white; color: var(--week-blue); cursor: pointer; }
.ap-area-controls button:hover:not(:disabled) { background: #edf3fd; }
.ap-area-controls button:disabled { color: var(--week-muted); opacity: .5; cursor: default; }
.ap-area-controls button:focus-visible { outline: 2px solid var(--week-blue); outline-offset: 2px; }
.ap-area-controls span { color: var(--week-muted); font-variant-numeric: tabular-nums; }
.ap-area-story :deep([id*="ap-rect-"]),
.ap-area-story :deep([id$="ap-total"]) { display: none; }
.ap-area-story[data-stage="1"] :deep([id$="ap-rect-1"]),
.ap-area-story[data-stage="2"] :deep([id$="ap-rect-1"]),
.ap-area-story[data-stage="2"] :deep([id$="ap-rect-2"]),
.ap-area-story[data-stage="3"] :deep([id$="ap-rect-1"]),
.ap-area-story[data-stage="3"] :deep([id$="ap-rect-2"]),
.ap-area-story[data-stage="3"] :deep([id$="ap-rect-3"]),
.ap-area-story[data-stage="4"] :deep([id$="ap-rect-1"]),
.ap-area-story[data-stage="4"] :deep([id$="ap-rect-2"]),
.ap-area-story[data-stage="4"] :deep([id$="ap-rect-3"]),
.ap-area-story[data-stage="4"] :deep([id$="ap-rect-4"]),
.ap-area-story[data-stage="5"] :deep([id*="ap-rect-"]),
.ap-area-story[data-stage="5"] :deep([id$="ap-total"]) { display: inline; }
</style>
