<script setup>
import '../week08.css'
const props=defineProps({mode:{type:String,default:'codes'},swapped:{type:Boolean,default:false}})
const cities=['Москва','Казань','Пермь','Омск']
const groups=()=>props.mode==='ohe'?[[1,2,3],[0]]:props.mode==='set'?[[0,2],[1,3]]:props.swapped?[[0,2],[1,3]]:[[0,1],[2,3]]
const question=()=>props.mode==='ohe'?'city_Москва ≤ 0.5?':props.mode==='set'?'city ∈ {Москва, Пермь}?':'code ≤ 2.5?'
</script>
<template>
<svg class="w8-visual" viewBox="0 0 1080 275" role="img" :aria-label="question()+' — показаны две группы городов'">
  <rect x="333" y="12" width="414" height="58" rx="6" class="w8-node" /><text x="540" y="50" text-anchor="middle" class="w8-big">{{question()}}</text>
  <path d="M540 70 L260 143 M540 70 L820 143" class="w8-link" /><text x="362" y="107" class="w8-label">да</text><text x="700" y="107" class="w8-label">нет</text>
  <g v-for="(group,j) in groups()" :key="j">
    <rect :x="j?570:10" y="145" width="500" height="114" rx="7" fill="#f3f7fd" stroke="#9fb4d0" />
    <text :x="j?820:260" y="181" text-anchor="middle" class="w8-label">{{j?'Правая':'Левая'}} группа</text>
    <text :x="j?820:260" y="226" text-anchor="middle" class="w8-big">{{group.map(i=>cities[i]).join(' · ')}}</text>
  </g>
</svg>
</template>
