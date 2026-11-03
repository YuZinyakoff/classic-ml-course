<script setup>
import '../week08.css'
defineProps({step:{type:Number,default:0}})
const links=[
  {d:'M230 40 L60 135',x:115,y:79,bit:'0',at:0},
  {d:'M230 40 L380 135',x:322,y:79,bit:'1',at:1},
  {d:'M380 135 L250 235',x:288,y:186,bit:'0',at:0},
  {d:'M380 135 L500 235',x:455,y:186,bit:'1',at:2},
  {d:'M500 235 L425 345',x:429,y:289,bit:'0',at:3},
  {d:'M500 235 L575 345',x:563,y:289,bit:'1',at:0},
]
const leaves=[{x:60,y:135,label:'A',code:'0'},{x:250,y:235,label:'B',code:'10'},
              {x:425,y:345,label:'C',code:'110'},{x:575,y:345,label:'D',code:'111'}]
</script>
<template>
<svg class="w8-visual" viewBox="0 0 640 420" role="img" aria-label="Дерево декодирования: 0 означает A, 10 — B, 110 — C, 111 — D">
  <g v-for="(e,i) in links" :key="i">
    <path :d="e.d" :class="['w8-code-link',{'w8-code-follow':e.at>0&&step>=e.at}]" :data-code-edge="e.at||null" />
    <text :x="e.x" :y="e.y" text-anchor="middle" class="w8-big" :style="e.at>0&&step>=e.at?'fill:#2864dc':''">{{e.bit}}</text>
  </g>
  <circle cx="230" cy="40" r="16" fill="#edf3ff" stroke="#6d88b5" stroke-width="2" />
  <text x="150" y="48" text-anchor="middle" class="w8-label">начало</text>
  <circle cx="380" cy="135" r="16" fill="#edf3ff" stroke="#6d88b5" stroke-width="2" />
  <circle cx="500" cy="235" r="16" fill="#edf3ff" stroke="#6d88b5" stroke-width="2" />
  <g v-for="leaf in leaves" :key="leaf.label">
    <circle :cx="leaf.x" :cy="leaf.y" r="25" :fill="leaf.label==='C'&&step>=3?'#dce9ff':'white'" :stroke="leaf.label==='C'&&step>=3?'#2864dc':'#6d88b5'" :stroke-width="leaf.label==='C'&&step>=3?4:2" />
    <text :x="leaf.x" :y="leaf.y+9" text-anchor="middle" class="w8-big">{{leaf.label}}</text>
    <text :x="leaf.x" :y="leaf.y+61" text-anchor="middle" class="w8-label">код {{leaf.code}}</text>
  </g>
</svg>
</template>
