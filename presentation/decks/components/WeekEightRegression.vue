<script setup>
import '../week08.css'
const props=defineProps({split:{type:Number,default:0},prediction:{type:Boolean,default:false},residuals:{type:Boolean,default:false},scan:{type:Boolean,default:false}})
const ys=[1,2,1,7,8,9],px=x=>58+(x-.6)*79,py=y=>331-y*29
const mean=x=>!props.split?14/3:x<=props.split?(props.split===3.5?4/3:2.75):(props.split===3.5?8:8.5)
const rss=[53.2,39.25,8/3,25.25,46.8]
</script>
<template>
<svg class="w8-visual" viewBox="0 0 600 410" role="img" :aria-label="scan?'RSS пяти порогов; минимум при 3.5':'Шесть регрессионных объектов и постоянные прогнозы в листьях'">
  <template v-if="!scan">
    <path d="M58 40 V331 H556" class="w8-axis" />
    <line v-for="y in [2,4,6,8]" :key="y" x1="58" :y1="py(y)" x2="550" :y2="py(y)" class="w8-gridline" />
    <text v-for="y in [0,2,4,6,8]" :key="'t'+y" x="37" :y="py(y)+7" text-anchor="middle" class="w8-label">{{y}}</text>
    <text x="28" y="35" class="w8-big">y</text><text x="557" y="366" class="w8-big">x</text>
    <text v-for="x in [1,2,3,4,5,6]" :key="x" :x="px(x)" y="366" text-anchor="middle" class="w8-label">{{x}}</text>
    <template v-if="prediction">
      <line v-if="!split" x1="58" :y1="py(14/3)" x2="550" :y2="py(14/3)" stroke="#2864dc" stroke-width="4" />
      <template v-else>
        <line x1="58" :y1="py(mean(1))" :x2="px(split)" :y2="py(mean(1))" stroke="#2864dc" stroke-width="4" />
        <line :x1="px(split)" :y1="py(mean(6))" x2="550" :y2="py(mean(6))" stroke="#2864dc" stroke-width="4" />
      </template>
    </template>
    <line v-if="split" :x1="px(split)" y1="42" :x2="px(split)" y2="331" class="w8-cut" />
    <line v-if="residuals" v-for="(y,i) in ys" :key="'r'+i" :x1="px(i+1)" :y1="py(y)" :x2="px(i+1)" :y2="py(mean(i+1))" stroke="#d97022" stroke-width="3" />
    <circle v-for="(y,i) in ys" :key="'p'+i" :cx="px(i+1)" :cy="py(y)" r="8" fill="#172033" />
    <text v-if="split" :x="px(split)" y="398" text-anchor="middle" class="w8-label">порог {{split}}</text>
  </template>
  <template v-else>
    <path d="M65 40 V331 H550" class="w8-axis" />
    <text x="17" y="30" class="w8-big">RSS</text>
    <text v-for="v in [0,20,40,60]" :key="v" x="39" :y="337-v*4" text-anchor="middle" class="w8-label">{{v}}</text>
    <polyline :points="rss.map((v,i)=>`${100+i*100},${331-v*4}`).join(' ')" fill="none" stroke="#2864dc" stroke-width="3" />
    <g v-for="(v,i) in rss" :key="i">
      <circle :cx="100+i*100" :cy="331-v*4" r="8" :fill="i===2?'#17845f':'#2864dc'" />
      <text :x="100+i*100" y="366" text-anchor="middle" class="w8-label">{{i+1.5}}</text>
      <text :x="100+i*100" :y="311-v*4" text-anchor="middle" class="w8-label">{{v.toFixed(2)}}</text>
    </g>
    <text x="302" y="402" text-anchor="middle" class="w8-label">порог t</text>
  </template>
</svg>
</template>
