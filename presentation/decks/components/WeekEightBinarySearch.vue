<script setup>
import { computed, unref } from 'vue'
import '../week08.css'
const props=defineProps({step:{default:0}})
const reveal=computed(()=>{
  const n=Number(unref(props.step))
  return Number.isFinite(n)?Math.max(0,Math.min(3,Math.floor(n))):0
})
const rows=[
  {before:[1,2,3,4,5,6,7,8],after:[5,6,7,8],cut:4,answer:'Да',bit:1},
  {before:[5,6,7,8],after:[5,6],cut:6,answer:'Нет',bit:0},
  {before:[5,6],after:[6],cut:5,answer:'Да',bit:1},
]
</script>
<template>
<div class="w8-binary-scheme" role="img" aria-label="Номер больше 4: да, бит 1, остаются 5–8; больше 6: нет, бит 0, остаются 5–6; больше 5: да, бит 1, остаётся 6" :data-reveal="reveal">
  <div v-for="(row,r) in rows" :key="r" class="w8-binary-row" :data-binary-transition="r+1" :style="r<=reveal?'':'visibility:hidden'">
    <div class="w8-binary-options" data-before>
      <span v-for="v in row.before" :key="v" :data-option="v">{{v}}</span>
    </div>
    <div class="w8-binary-question">
      <span class="w8-blue">→</span>
      <div><div>Номер больше {{row.cut}}?</div><div class="w8-blue" :style="r<reveal?'':'visibility:hidden'" data-answer>{{row.answer}} → бит {{row.bit}}</div></div>
      <span class="w8-blue" :style="r<reveal?'':'visibility:hidden'">→</span>
    </div>
    <div class="w8-binary-options" data-after :style="r<reveal?'':'visibility:hidden'">
      <span v-for="v in row.after" :key="v" :data-option="v">{{v}}</span>
    </div>
  </div>
</div>
</template>
