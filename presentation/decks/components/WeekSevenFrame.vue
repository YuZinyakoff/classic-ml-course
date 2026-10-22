<script setup lang="ts">
import SectionChrome from './SectionChrome.vue'
defineProps<{ title?: string; section?: string }>()
</script>
<template>
  <div class="w7-frame">
    <SectionChrome v-if="section" :section="section" />
    <h1 v-if="title">{{ title }}</h1>
    <div class="w7-body"><slot /></div>
  </div>
</template>
<style scoped>
.w7-frame { height:100%; display:flex; flex-direction:column; }
h1 { flex-shrink:0; margin-top:8px; }
.w7-body { flex:1; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:24px; }
:deep(.w7-row) { display:grid; grid-template-columns:minmax(0,1.35fr) minmax(0,1fr); gap:36px; align-items:center; }
:deep(.w7-equal) { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:42px; align-items:center; }
:deep(.w7-col) { display:flex; flex-direction:column; gap:24px; min-width:0; }
:deep(.w7-text) { font-size:28px; line-height:1.38; }
:deep(.w7-note) { font-size:22px; color:#66758b; line-height:1.35; }
:deep(.w7-result) { font-size:28px; color:#17845f; line-height:1.35; }
:deep(.w7-question) { font-size:31px; line-height:1.3; font-weight:550; }
:deep(.w7-math) { font-size:32px; }
:deep(.w7-large) { font-size:41px; }
:deep(.w7-inline) { display:inline-block; vertical-align:middle; }
:deep(.w7-header) { font-size:26px; color:#2864dc; font-weight:600; margin-bottom:14px; }
:deep(.w7-rail) { border-left:4px solid #2864dc; padding-left:24px; }
:deep(.w7-table) { font-size:26px; table-layout:fixed; }
:deep(.w7-table th),:deep(.w7-table td) { padding:13px 16px; vertical-align:middle; }
:deep(.w7-table .numeric) { text-align:center; font-variant-numeric:tabular-nums; }
:deep(.w7-table .focus) { background:#e7f6f0; color:#17845f; }
:deep(.w7-list) { margin:0; padding-left:30px; font-size:28px; line-height:1.45; }
:deep(.w7-list li) { margin:0 0 20px; }
:deep(.w7-pair) { display:grid; grid-template-columns:1fr 1fr; gap:34px; }
:deep(.w7-flow) { display:flex; align-items:center; justify-content:space-between; gap:20px; font-size:27px; }
:deep(.w7-flow > div) { border-top:3px solid #2864dc; padding-top:16px; }
:deep(.w7-flow > span) { color:#66758b; }
:deep(.w7-weights) { display:flex; height:60px; font-size:25px; text-align:center; }
:deep(.w7-weights > div) { display:flex; align-items:center; justify-content:center; border-right:3px solid white; }
:deep(.w7-chips) { display:flex; gap:20px; font-size:28px; }
:deep(.w7-chips > span) { padding:12px 22px; background:#eaf1ff; }
:deep(.w7-cover) { display:grid; grid-template-columns:1.2fr 1fr; gap:30px; align-items:center; }
:deep(.w7-cover h1) { font-size:52px; line-height:1.12; margin:32px 0; }
:deep(.w7-line) { border-top:2px solid #dce3ec; padding-top:22px; }
:deep(.w7-three) { display:grid; grid-template-columns:repeat(3,1fr); gap:30px; }
:deep(.w7-v2-derivation) { display:flex; flex-direction:column; gap:42px; }
:deep(.w7-v2-cases th),:deep(.w7-v2-cases td) { padding:22px 20px; }
.w7-v2-tight .w7-body { gap:18px; }
</style>
