<script setup lang="ts">
import { computed } from 'vue'
const props=withDefaults(defineProps<{step?:number;changed?:boolean;focus?:string}>(),{step:2,changed:false,focus:''})
const scores=computed(()=>props.changed?[3,1,0]:[2,1,0])
const exps=computed(()=>scores.value.map(Math.exp))
const sum=computed(()=>exps.value.reduce((a,b)=>a+b,0))
</script>
<template>
  <div class="softmax" :data-step="step" :data-changed="changed">
    <table><thead><tr><th>Класс</th><th>Score</th><th :class="{concealed:step<1}">Экспонента</th><th :class="{concealed:step<2}">Вероятность</th></tr></thead>
    <tbody><tr v-for="(s,i) in scores" :key="i" :class="{focus:focus==='ABC'[i]}"><th :class="'class-'+i">{{ 'ABC'[i] }}</th><td>{{ s }}</td><td :class="{concealed:step<1}">{{ exps[i].toFixed(3) }}</td><td :class="{concealed:step<2}">{{ (exps[i]/sum).toFixed(3) }}</td></tr></tbody></table>
    <div class="denominator" :class="{concealed:step<1}">Общий знаменатель: {{ sum.toFixed(3) }}</div>
  </div>
</template>
<style scoped>
table { font-size:27px; width:100%; table-layout:fixed; }
th,td { padding:16px 9px; text-align:center; font-variant-numeric:tabular-nums; vertical-align:middle; }
thead th { font-size:23px; }
th.class-0 { color:#2864dc; } th.class-1 { color:#d97022; } th.class-2 { color:#17845f; }
.focus { background:#fff1e6; }
.concealed { opacity:0; }
.denominator { margin-top:24px; font-size:25px; text-align:center; color:#66758b; }
</style>
