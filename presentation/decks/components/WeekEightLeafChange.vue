<script setup>
import '../week08.css'
const props=defineProps({n:Number,ones:Number,step:{type:Number,default:0}})
const x=i=>props.n===2?200+i*140:70+(i%5)*100
const y=(i,after)=>85+Math.floor(i/5)*40+(after?120:0)
const isOne=(i,after)=>i>=props.n-props.ones&&!(after&&i===props.n-1)
</script>
<template>
<svg class="w8-visual" viewBox="0 0 540 280" role="img" :aria-label="`Лист из ${n} объектов: в выделенном наблюдении метка 1 меняется на 0`">
  <text x="270" y="28" text-anchor="middle" class="w8-big">{{n===2?'Лист из двух объектов':'Лист из десяти объектов'}}</text>
  <text x="20" y="62" class="w8-label">До</text>
  <g data-phase="before"><g v-for="i in n" :key="'before'+i">
    <rect v-if="isOne(i-1,false)" :x="x(i-1)-14" :y="y(i-1,false)-14" width="28" height="28" class="w8-one" />
    <circle v-else :cx="x(i-1)" :cy="y(i-1,false)" r="14" class="w8-zero" />
    <circle v-if="i===n" :cx="x(i-1)" :cy="y(i-1,false)" r="22" class="w8-halo" />
  </g></g>
  <g data-phase="after" :opacity="step?1:0">
    <text x="270" y="164" text-anchor="middle" class="w8-label" style="fill:#2864dc">Выделенная метка: 1 → 0</text>
    <text x="20" y="184" class="w8-label">После</text>
    <g v-for="i in n" :key="'after'+i">
      <rect v-if="isOne(i-1,true)" :x="x(i-1)-14" :y="y(i-1,true)-14" width="28" height="28" class="w8-one" />
      <circle v-else :cx="x(i-1)" :cy="y(i-1,true)" r="14" class="w8-zero" />
      <circle v-if="i===n" :cx="x(i-1)" :cy="y(i-1,true)" r="22" class="w8-halo" />
    </g>
  </g>
</svg>
</template>
