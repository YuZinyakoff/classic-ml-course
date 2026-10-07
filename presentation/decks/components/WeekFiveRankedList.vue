<script setup lang="ts">
import { computed } from 'vue'
import data from './week05-data.json'

const props = withDefaults(defineProps<{
  layout?: 'ranked' | 'vertical' | 'scale'
  threshold?: number
  step?: number
  showTruth?: boolean
  showScores?: boolean
  valueMode?: 'probability' | 'score'
  highlightPositive?: boolean
  positiveBeforeRank?: number
  showMetrics?: boolean
  includeAccuracy?: boolean
  includeF1?: boolean
  showOutcomes?: boolean
  changedRank?: number
  compact?: boolean
  ribbon?: boolean
  numberedRibbon?: boolean
  showLegend?: boolean
}>(), { layout: 'ranked', step: -1, showTruth: true, showScores: true, valueMode: 'probability', highlightPositive: false, showMetrics: false, includeAccuracy: false, includeF1: true, showOutcomes: false, changedRank: -1, compact: false, showLegend: true })

const items = data.scores.map((p, i) => ({ p, y: data.labels[i], rank: i + 1 }))
const selected = computed(() => props.step >= 0 ? props.step : props.threshold === undefined ? -1 : items.filter(x => x.p >= props.threshold!).length)
const thresholdLabel = computed(() => props.threshold !== undefined ? `t = ${props.threshold.toFixed(2).replace(/0$/, '')}` : selected.value >= 0 ? `Отобраны первые ${selected.value}` : '')
const value = (p: number) => props.valueMode === 'score' ? Math.log(p / (1 - p)).toFixed(2) : p.toFixed(2)
const metrics = computed(() => {
  const k = selected.value
  const tp = items.slice(0, Math.max(k, 0)).reduce((a, x) => a + x.y, 0)
  const p = k > 0 ? tp / k : NaN
  const r = tp / 5
  const tn = 7 - (Math.max(k, 0) - tp)
  return (props.includeAccuracy ? `Accuracy ${((tp+tn)/12).toFixed(2)} · ` : '') + `Precision ${Number.isFinite(p) ? p.toFixed(2) : '—'} · Recall ${r.toFixed(2)}` + (props.includeF1 ? ` · F1 ${Number.isFinite(p) && p + r > 0 ? (2*p*r/(p+r)).toFixed(2) : '—'}` : '')
})
</script>

<template>
  <div class="rank-system" :class="[layout, { compact, ribbon, 'numbered-ribbon': numberedRibbon }]">
    <template v-if="layout === 'scale'">
      <div class="scale-canvas">
        <div class="scale-axis" />
        <div v-if="threshold !== undefined" class="selected-zone" :style="{ left: `${threshold * 100}%` }" />
        <div v-if="threshold !== undefined" class="scale-threshold" :style="{ left: `${threshold * 100}%` }"><b>{{ thresholdLabel }}</b></div>
        <div v-for="item in items" :key="item.rank" class="scale-item" :style="{ left: `${item.p * 100}%` }">
          <span class="score">{{ value(item.p) }}</span>
          <span class="truth" :class="showTruth ? `class-${item.y}` : 'unknown'" />
          <span class="rank">{{ item.rank }}</span>
          <span v-if="threshold !== undefined" class="decision" :class="{ chosen: item.p >= threshold }">{{ item.p >= threshold ? 1 : 0 }}</span>
        </div>
        <span class="axis-zero">0</span><span class="axis-one">1</span>
      </div>
      <div class="legend"><span v-if="showTruth"><i class="class-1" /> истинный класс 1</span><span v-if="showTruth"><i class="class-0" /> истинный класс 0</span><span v-if="threshold !== undefined">внизу — решение</span></div>
    </template>
    <template v-else>
      <div class="rank-caption">{{ valueMode === 'score' ? 'Линейный score z' : 'Оценка вероятности' }} · по убыванию</div>
      <div class="rank-items">
        <div v-for="(item, i) in items" :key="item.rank" class="rank-item" :class="{ selected: selected >= 0 && i < selected, 'positive-focus': (highlightPositive || (positiveBeforeRank && item.rank < positiveBeforeRank)) && item.y === 1, current: (step > 0 && i === step - 1) || item.rank === changedRank }">
          <span class="rank">{{ numberedRibbon ? `№${item.rank}` : item.rank }}</span>
          <span class="score" :class="{ faded: !showScores }">{{ value(item.p) }}</span>
          <span class="truth" :class="showTruth ? `class-${item.y}` : 'unknown'" />
          <span v-if="selected >= 0" class="decision" :class="{ chosen: i < selected }">{{ i < selected ? 1 : 0 }}</span>
          <span v-if="showOutcomes" class="outcome" :class="{ correct: item.y === Number(i < selected) }">{{ i < selected ? (item.y ? 'TP' : 'FP') : (item.y ? 'FN' : 'TN') }}</span>
          <div v-if="selected > 0 && selected < 12 && i === selected - 1" class="rank-divider" />
        </div>
      </div>
      <div v-if="showLegend" class="legend"><span><i class="class-1" /> класс 1</span><span><i class="class-0" /> класс 0</span><span v-if="selected >= 0">{{ thresholdLabel }}</span></div>
    </template>
    <div v-if="showMetrics && selected >= 0" class="metrics">{{ metrics }}</div>
  </div>
</template>

<style scoped>
.rank-system { color: var(--week-ink); }
.rank-caption { color: var(--week-muted); font-size: 20px; margin-bottom: 15px; }
.rank-items { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); }
.rank-item { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; padding: 18px 0; border-top: 2px solid var(--week-line); border-bottom: 2px solid var(--week-line); }
.rank { color: var(--week-muted); font-size: 18px; }
.score { color: var(--week-ink); font-size: 24px; font-weight: 650; font-variant-numeric: tabular-nums; }
.score.faded { opacity: .16; }
.metrics { text-align: center; margin-top: 24px; color: var(--week-ink); font-size: 24px; }
.compact .rank-item { gap: 8px; padding: 8px 0; }
.compact .rank-caption { margin-bottom: 8px; }
.compact .legend { margin-top: 12px; }
.ribbon .rank-caption, .ribbon .rank, .ribbon .legend { display: none; }
.ribbon .rank-item { gap: 10px; padding: 12px 0; }
.ribbon.numbered-ribbon .rank { display: block; }
.ribbon.numbered-ribbon .rank-item { gap: 6px; padding: 8px 0; }
.truth { display: block; width: 23px; height: 23px; }
.class-0 { background: var(--week-blue); border-radius: 3px; }
.class-1 { background: var(--week-orange); clip-path: polygon(50% 0, 100% 100%, 0 100%); }
.unknown { background: #8c99aa; border-radius: 50%; }
.selected { background: var(--week-green-soft); }
.positive-focus { background: var(--week-orange-soft); }
.current { outline: 2px solid var(--week-green); outline-offset: -2px; }
.decision { width: 30px; height: 30px; border-radius: 50%; background: #eff2f6; color: var(--week-muted); text-align: center; font-size: 21px; line-height: 30px; }
.decision.chosen { background: var(--week-green); color: white; }
.outcome { color: var(--week-orange); font-size: 24px; font-weight: 650; }
.outcome.correct { color: var(--week-green); }
.rank-divider { position: absolute; top: -8px; right: -2px; bottom: -8px; width: 3px; background: var(--week-green); z-index: 2; }
.legend { display: flex; justify-content: center; gap: 30px; margin-top: 24px; color: var(--week-muted); font-size: 19px; }
.legend span { display: inline-flex; align-items: center; gap: 9px; }
.legend i { display: inline-block; width: 16px; height: 16px; }
.vertical .rank-caption { font-size: 19px; margin-bottom: 9px; }
.vertical .rank-items { grid-template-columns: 1fr; }
.vertical .rank-item { flex-direction: row; justify-content: space-around; gap: 10px; padding: 3px 10px; height: 33px; border-top: 0; border-bottom: 1px solid var(--week-line); }
.vertical.compact .rank-item { height: 30px; }
.vertical .score { font-size: 21px; width: 64px; }
.vertical .rank { width: 24px; text-align: right; }
.vertical .truth { width: 18px; height: 18px; }
.vertical .decision { width: 24px; height: 24px; font-size: 17px; line-height: 24px; }
.vertical .rank-divider { top: auto; right: 0; left: 0; bottom: -2px; width: auto; height: 3px; }
.vertical .legend { margin-top: 14px; gap: 14px; font-size: 16px; flex-wrap: wrap; }
.scale-canvas { position: relative; height: 240px; margin: 15px 35px 0; }
.scale-axis { position: absolute; left: 0; right: 0; top: 86px; height: 2px; background: var(--week-line); }
.selected-zone { position: absolute; top: 60px; right: 0; height: 56px; background: var(--week-green-soft); }
.scale-item { position: absolute; top: 45px; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 12px; }
.scale-item .score { font-size: 21px; }
.scale-item .truth { margin-top: 6px; }
.scale-threshold { position: absolute; top: 75px; height: 115px; width: 3px; background: var(--week-green); z-index: 3; transition: left .25s; }
.scale-threshold b { position: absolute; top: -89px; transform: translateX(-50%); white-space: nowrap; color: var(--week-green); font-size: 22px; }
.axis-zero, .axis-one { position: absolute; top: 203px; color: var(--week-muted); font-size: 20px; }
.axis-zero { left: 0; }.axis-one { right: 0; }
</style>
