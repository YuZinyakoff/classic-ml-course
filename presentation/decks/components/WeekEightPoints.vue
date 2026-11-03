<script setup>
import {computed} from 'vue'
import '../week08.css'
const props=defineProps({axis:{type:String,default:''},threshold:{type:Number,default:2.5},local:{type:Boolean,default:false},regions:{type:Number,default:0},query:{type:Boolean,default:false},interaction:{type:Boolean,default:false}})
const pts=computed(()=>[1,2,3,4].flatMap(a=>[1,2,3].map(b=>({a,b,y:Number(a>=3&&b>=2)}))))
const px=x=>72+(x-.5)*117, py=y=>338+(.5-y)*87
</script>
<template>
<svg class="w8-visual" viewBox="0 0 600 410" role="img" aria-label="12 объектов на плоскости: восемь класса 0 и четыре класса 1">
  <rect x="72" y="77" width="468" height="261" fill="#f9fbfd" />
  <template v-if="regions">
    <rect x="72" y="77" width="234" height="261" fill="#17845f" opacity=".11" />
    <rect x="306" y="77" width="234" height="261" fill="#d97022" opacity=".11" />
    <rect v-if="regions>1" x="306" :y="py(1.5)" width="234" :height="338-py(1.5)" fill="#17845f" opacity=".2" />
  </template>
  <line v-for="a in [1,2,3,4]" :key="'x'+a" :x1="px(a)" y1="77" :x2="px(a)" y2="338" class="w8-gridline" />
  <line v-for="b in [1,2,3]" :key="'y'+b" x1="72" :y1="py(b)" x2="540" :y2="py(b)" class="w8-gridline" />
  <path d="M72 64 V338 H559" class="w8-axis" />
  <text x="560" y="370" class="w8-big">x₁</text><text x="34" y="67" class="w8-big">x₂</text>
  <text v-for="a in [1,2,3,4]" :key="'tx'+a" :x="px(a)" y="370" text-anchor="middle" class="w8-label">{{a}}</text>
  <text v-for="b in [1,2,3]" :key="'ty'+b" x="49" :y="py(b)+8" text-anchor="middle" class="w8-label">{{b}}</text>
  <template v-for="(p,i) in pts" :key="i">
    <g :opacity="local&&p.a<3?.12:1">
      <circle v-if="!p.y" :cx="px(p.a)" :cy="py(p.b)" r="12" class="w8-zero" />
      <rect v-else :x="px(p.a)-11" :y="py(p.b)-11" width="22" height="22" class="w8-one" />
    </g>
  </template>
  <line v-if="axis==='x1'||regions" :x1="px(axis==='x1'?threshold:2.5)" y1="65" :x2="px(axis==='x1'?threshold:2.5)" y2="338" class="w8-cut" />
  <line v-if="axis==='x2'||regions>1" :x1="local||regions>1?px(2.5):72" :y1="py(axis==='x2'?threshold:1.5)" x2="550" :y2="py(axis==='x2'?threshold:1.5)" class="w8-cut" />
  <g v-if="query">
    <path :d="`M${px(3.4)-10} ${py(2.2)} h20 M${px(3.4)} ${py(2.2)-10} v20`" stroke="#2864dc" stroke-width="4" />
    <text :x="px(3.4)-52" :y="py(2.2)-24" class="w8-label" fill="#2864dc">новый x</text>
  </g>
  <g v-if="interaction">
    <g v-for="a in [1.5,3.5]" :key="a">
      <line :x1="px(a)" :y1="py(.8)" :x2="px(a)" :y2="py(3.2)" stroke="#2864dc" stroke-width="4" />
      <path :d="`M${px(a)-7} ${py(3.2)+12} L${px(a)} ${py(3.2)} L${px(a)+7} ${py(3.2)+12}`" fill="none" stroke="#2864dc" stroke-width="3" />
      <circle :cx="px(a)" :cy="py(.8)" r="9" class="w8-zero" />
      <circle v-if="a<2.5" :cx="px(a)" :cy="py(3.2)" r="9" class="w8-zero" /><rect v-else :x="px(a)-9" :y="py(3.2)-9" width="18" height="18" class="w8-one" />
    </g>
  </g>
  <circle cx="113" cy="24" r="10" class="w8-zero" /><text x="133" y="32" class="w8-label">класс 0</text>
  <rect x="310" y="14" width="20" height="20" class="w8-one" /><text x="342" y="32" class="w8-label">класс 1</text>
</svg>
</template>
