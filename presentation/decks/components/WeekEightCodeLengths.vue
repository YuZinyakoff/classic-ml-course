<script setup>
import '../week08.css'
defineProps({step:{type:Number,default:0}})
const labels=['A','A','A','A','B','B','C','D']
const fixed={A:'00',B:'01',C:'10',D:'11'},variable={A:'0',B:'10',C:'110',D:'111'}
const rows=[fixed,variable].map((codes,r)=>({
  index:r, y:72+r*112, total:r?14:16,
  words:labels.map((label,i)=>({
    label, code:codes[label],
    bits:Array.from(codes[label],(bit,b)=>({
      bit, x:235+i*94-codes[label].length*14+b*28,
    })),
  })),
}))
</script>
<template>
<svg class="w8-visual w8-code-lengths" viewBox="0 0 1120 250" role="img" aria-label="В серии 4A, 2B, C, D постоянный код занимает 16 бит, переменный — 14 бит">
  <text v-for="(v,i) in labels" :key="'label'+i" :x="235+i*94" y="28" text-anchor="middle" class="w8-big">{{v}}</text>
  <g v-for="row in rows" :key="row.index" :opacity="row.index===0||step?1:0" :data-code-row="row.index" :data-total-bits="row.total">
    <text x="8" :y="row.y+28" class="w8-label">{{row.index?'Разная длина':'Равная длина'}}</text>
    <g v-for="(word,i) in row.words" :key="i" data-code-word :data-label="word.label" :data-code="word.code">
      <g v-for="(item,b) in word.bits" :key="b">
        <rect :x="item.x" :y="row.y" width="26" height="40" rx="4" fill="#edf3ff" stroke="#6d88b5" />
        <text :x="item.x+13" :y="row.y+28" text-anchor="middle" class="w8-big">{{item.bit}}</text>
      </g>
    </g>
    <text x="1060" :y="row.y+28" text-anchor="middle" class="w8-big">{{row.total}} бит</text>
  </g>
</svg>
</template>
