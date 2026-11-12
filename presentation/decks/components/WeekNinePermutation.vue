<script setup>
import { computed } from 'vue'
const props=defineProps({mode:{type:String,default:'initial'},step:{type:Number,default:0}})
const rows=[['A',42,12,0,62],['B',62,20,1,42],['C',70,35,0,70],['D',38,30,0,38],['E',55,16,1,80],['F',80,44,0,55]]
const shuffled=computed(()=>props.mode==='preview'||(props.mode==='permuted'&&props.step>=1))
const predictions=computed(()=>props.mode==='initial'?props.step>=1:props.mode==='permuted'&&props.step>=2)
const predict=(a,d)=>Number(a>=50&&d<=25)
</script>
<template>
  <table class="w9-table w9-pi" :data-permutation-mode="mode" :data-step="step">
    <thead><tr><th>Квартира</th><th>Площадь, м²</th><th v-if="mode==='preview'">После обмена</th><th>До центра, мин</th><th>Факт y</th><th v-if="mode!=='preview'">Прогноз</th></tr></thead>
    <tbody><tr v-for="[id,a,d,y,after] in rows" :key="id" :class="{'w9-error-row':predictions&&predict(shuffled?after:a,d)!==y}">
      <td>{{id}}</td><td :class="{'w9-changed':mode==='permuted'&&shuffled&&a!==after}">{{mode==='permuted'&&shuffled?after:a}}</td>
      <td v-if="mode==='preview'" :class="{'w9-changed':a!==after}">{{after}}</td>
      <td>{{d}}</td><td>{{y}}</td><td v-if="mode!=='preview'"><span v-if="predictions" data-prediction>{{predict(shuffled?after:a,d)}}</span><span v-else class="w9-muted">?</span></td>
    </tr></tbody>
  </table>
</template>
