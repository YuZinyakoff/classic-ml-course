<script setup lang="ts">
import { computed } from 'vue'
import MathBlock from './MathBlock.vue'
import data from './week06-data.json'
const props = withDefaults(defineProps<{ mode: string; step?: number; candidate?: number }>(), { step: 0, candidate: 0 })
const fmt = (x: number, digits=3) => x.toFixed(digits).replace('.', ',')
const beta = (j: number) => '\\beta_'+j
const coefficientRows = [[3,-2,1,13],[1,0,1,1],[.5,.5,1,.5]]
const apartmentRows = [[60,40,60,60],[75,50,75,75],[60,50,30,60]]
const lassoRows = [[.01,.48,1.22,-1.07,-.14,.66,0],[.3,.34,1.23,-.95,0,.54,0],[3,0,.35,0,0,0,0]]
const gridHeaders = ['F_1','F_2','F_3','F_4','F_5']
const gridCellShown = (row: number, col: number) => props.step >= (row*5+col+1)
const cvSummary = computed(() => props.step === 0 ? data.cv.filter(row=>row.lambda===1) : data.cv)
const progressRows = computed(() => data.cv.slice(0,2))
const progressShown = (row:number,col:number) => row < props.candidate || (row === props.candidate && col <= props.step)
</script>
<template>
  <div class="w6-table" :data-table-mode="mode" :data-stage="step">
    <table v-if="mode==='apartments' || mode==='new-apartment'">
      <thead><tr><th>Квартира</th><th><MathBlock formula="x_1" :display="false" />Общая, м²</th><th><MathBlock formula="x_2" :display="false" />Жилая, м²</th><th>A</th><th>B</th></tr></thead>
      <tbody><tr v-for="(row,i) in apartmentRows.slice(0,mode==='apartments'?2:3)" :key="i" :class="{focus:i===2}">
        <td>{{ i===2?'Новая':i+1 }}</td><td>{{row[0]}}</td><td>{{row[1]}}</td>
        <td>{{ (mode==='new-apartment' && (i<2 || step>=1)) || (mode==='apartments' && step>=1) ? row[2] : '?' }}</td>
        <td>{{ (mode==='new-apartment' && (i<2 || step>=1)) || (mode==='apartments' && step>=1) ? row[3] : '?' }}</td>
      </tr></tbody>
    </table>
    <table v-else-if="['coefficients','norm','penalty'].includes(mode)">
      <thead><tr><th><MathBlock formula="\beta_1" :display="false" /></th><th><MathBlock formula="\beta_2" :display="false" /></th><th>Сумма</th><th v-if="mode!=='coefficients'"><MathBlock formula="\|\beta\|_2^2" :display="false" /></th><th v-if="mode==='penalty'">Штраф</th><th v-if="mode==='penalty'"><MathBlock formula="J_{0.2}" :display="false" /></th></tr></thead>
      <tbody><tr v-for="(row,i) in coefficientRows" :key="i" :class="{concealed:mode==='coefficients' && step<i+1,focus:mode==='penalty' && step>=2 && i===2}">
        <td>{{row[0]}}</td><td>{{row[1]}}</td><td>1</td><td v-if="mode!=='coefficients'">{{mode==='norm' && step===0?'?':row[3]}}</td>
        <td v-if="mode==='penalty'">{{step>=1?fmt(.2*row[3],1):'?'}}</td><td v-if="mode==='penalty'">{{step>=2?fmt(2+.2*row[3],1):'?'}}</td>
      </tr></tbody>
    </table>
    <table v-else-if="mode==='lasso'">
      <thead><tr><th><MathBlock formula="\lambda" :display="false" /></th><th v-for="j in 6" :key="j"><MathBlock :formula="beta(j)" :display="false" /></th></tr></thead>
      <tbody><tr v-for="(row,i) in lassoRows" :key="i" :class="{concealed:i===2 && step<2}">
        <td>{{row[0]}}</td><td v-for="(val,j) in row.slice(1)" :key="j" :class="{zero:step>=1 && val===0,focus:step>=2 && i===2 && j===2}">{{fmt(val,2)}}</td>
      </tr></tbody>
    </table>
    <table v-else-if="mode==='foldplan'">
      <thead><tr><th><MathBlock formula="\lambda" :display="false" /></th><th v-for="h in gridHeaders" :key="h"><MathBlock :formula="h" :display="false" /></th></tr></thead>
      <tbody><tr v-for="(value,i) in [.01,.1,1]" :key="i" :class="{concealed:step<i}"><td>{{value}}</td><td v-for="j in 5" :key="j" class="same-fold">Тот же фолд</td></tr></tbody>
    </table>
    <table v-else-if="mode==='cv-grid'" class="compact">
      <thead><tr><th><MathBlock formula="\lambda" :display="false" /></th><th v-for="h in gridHeaders" :key="h"><MathBlock :formula="h" :display="false" /></th><th>Среднее</th></tr></thead>
      <tbody><tr v-for="(row,i) in data.cv" :key="i" :class="{focus:i===Math.min(1,Math.floor(Math.max(0,step-1)/5))}">
        <td>{{row.lambda}}</td><td v-for="(err,j) in row.fold_mse" :key="j" :class="{active:step===i*5+j+1}">{{gridCellShown(i,j)?fmt(err):'—'}}</td><td>{{step>=(i+1)*5?fmt(row.cv_mse):'—'}}</td>
      </tr></tbody>
    </table>
    <table v-else-if="mode==='cv-progress'">
      <thead><tr><th><MathBlock formula="\lambda" :display="false" /></th><th v-for="h in gridHeaders" :key="h"><MathBlock :formula="h" :display="false" /></th><th>Среднее</th></tr></thead>
      <tbody><tr v-for="(row,i) in progressRows" :key="i" :class="{focus:i===candidate}">
        <td>{{String(row.lambda).replace('.',',')}}</td>
        <td v-for="(err,j) in row.fold_mse" :key="j" :class="{active:i===candidate && step===j}">{{progressShown(i,j)?fmt(err):'—'}}</td>
        <td :class="{active:i===candidate && step===5}">{{i<candidate || (i===candidate && step>=5)?fmt(row.cv_mse):'—'}}</td>
      </tr></tbody>
    </table>
    <table v-else-if="mode==='cv-complete'" class="compact">
      <thead><tr><th><MathBlock formula="\lambda" :display="false" /></th><th v-for="h in gridHeaders" :key="h"><MathBlock :formula="h" :display="false" /></th><th>CV-MSE</th></tr></thead>
      <tbody><tr v-for="row in data.cv" :key="row.lambda" :class="{focus:step>=1 && row.lambda===1}">
        <td>{{String(row.lambda).replace('.',',')}}</td><td v-for="(err,j) in row.fold_mse" :key="j">{{fmt(err)}}</td><td class="mean">{{fmt(row.cv_mse)}}</td>
      </tr></tbody>
    </table>
    <table v-else-if="mode==='holdout-selection'">
      <thead><tr><th><MathBlock formula="\lambda" :display="false" /></th><th>MSE на train</th><th>MSE на validation</th></tr></thead>
      <tbody><tr v-for="row in [[0,1.2,3.8],[.1,1.4,2.6],[1,1.9,2.2],[10,3.1,3.4]]" :key="row[0]" :class="{focus:step>=1 && row[0]===1}"><td>{{String(row[0]).replace('.',',')}}</td><td>{{fmt(row[1],1)}}</td><td>{{step>=1?fmt(row[2],1):'?'}}</td></tr></tbody>
    </table>
    <table v-else-if="mode==='cv-summary'" class="compact">
      <thead><tr><th><MathBlock formula="\lambda" :display="false" /></th><th>Средняя train MSE</th><th>CV-MSE</th></tr></thead>
      <tbody><tr v-for="row in cvSummary" :key="row.lambda" :class="{focus:step>=2 && row.lambda===1}"><td>{{row.lambda}}</td><td>{{fmt(row.train_mse)}}</td><td>{{fmt(row.cv_mse)}}</td></tr></tbody>
    </table>
    <table v-else-if="mode==='two-grid'">
      <thead><tr><th><MathBlock formula="\lambda\backslash\rho" :display="false" /></th><th>0,25</th><th>0,75</th></tr></thead>
      <tbody><tr v-for="(value,i) in [.01,.1,1]" :key="i"><td>{{value}}</td><td>{{['A','C','E'][i]}}</td><td>{{['B','D','F'][i]}}</td></tr></tbody>
    </table>
  </div>
</template>
<style scoped>
.w6-table table { table-layout:fixed; font-size:27px; width:100%; }
.w6-table th,.w6-table td { text-align:center; padding:12px 10px; vertical-align:middle; }
.w6-table th { font-size:23px; font-weight:600; }
.w6-table th .deck-math { display:inline-block; margin-right:6px; }
.w6-table .compact { font-size:25px; }
.w6-table .compact th,.w6-table .compact td { padding:8px 7px; line-height:1.15; }
.concealed { visibility:hidden; }
.focus { background:#e7f6f0; }
.zero { color:#17845f; background:#e7f6f0; font-weight:700; }
.active { outline:3px solid #d97022; outline-offset:-3px; background:#fff1e6; }
.same-fold { font-size:21px; color:#2864dc; }
.mean { font-weight:650; border-left:2px solid #dce3ec; }
</style>
