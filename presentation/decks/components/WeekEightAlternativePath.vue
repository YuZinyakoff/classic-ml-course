<script setup>
import '../week08.css'
defineProps({stage:{type:Number,default:0}})
</script>
<template>
<svg class="w8-visual" viewBox="0 0 640 445" role="img" aria-label="Возможный путь: 4 ошибки до разбиения, 4 после первого условия, 0 после второго">
  <template v-if="stage===0">
    <rect x="125" y="82" width="390" height="248" rx="8" class="w8-node" />
    <text x="320" y="119" text-anchor="middle" class="w8-big">12 объектов</text>
    <text x="320" y="153" text-anchor="middle" class="w8-label">8 нулей · 4 единицы</text>
    <g v-for="i in 12" :key="i">
      <circle v-if="i<=8" :cx="168+(i-1)%6*61" :cy="195+Math.floor((i-1)/6)*44" r="12" class="w8-zero" />
      <rect v-else :x="156+(i-1)%6*61" :y="183+Math.floor((i-1)/6)*44" width="24" height="24" class="w8-one" />
    </g>
    <text x="320" y="292" text-anchor="middle" class="w8-big">прогноз: класс 0</text>
  </template>
  <template v-else>
    <path d="M310 78 L132 165 M310 78 L465 165" class="w8-link" />
    <text x="174" y="119" class="w8-label">да</text><text x="415" y="119" class="w8-label">нет</text>
    <rect x="204" y="16" width="212" height="62" rx="7" class="w8-node" />
    <text x="310" y="55" text-anchor="middle" class="w8-big">x₂ ≤ 1.5?</text>
    <rect x="25" y="165" width="215" height="103" rx="7" fill="#edf7f1" stroke="#17845f" stroke-width="2" />
    <text x="132" y="200" text-anchor="middle" class="w8-big">4 нуля</text>
    <circle v-for="i in 4" :key="'l'+i" :cx="66+(i-1)*44" cy="233" r="12" class="w8-zero" />
    <template v-if="stage===1">
      <rect x="305" y="165" width="315" height="155" rx="7" class="w8-node" />
      <text x="462" y="204" text-anchor="middle" class="w8-label">4 нуля · 4 единицы</text>
      <g v-for="i in 8" :key="'r'+i">
        <circle v-if="i<=4" :cx="365+(i-1)%4*66" :cy="245+Math.floor((i-1)/4)*42" r="12" class="w8-zero" />
        <rect v-else :x="353+(i-1)%4*66" :y="233+Math.floor((i-1)/4)*42" width="24" height="24" class="w8-one" />
      </g>
    </template>
    <template v-else>
      <rect x="354" y="165" width="222" height="62" rx="7" class="w8-node" />
      <text x="465" y="204" text-anchor="middle" class="w8-big">x₁ ≤ 2.5?</text>
      <path d="M465 227 L350 322 M465 227 L550 322" class="w8-link" />
      <text x="373" y="275" class="w8-label">да</text><text x="540" y="275" class="w8-label">нет</text>
      <rect x="274" y="322" width="153" height="92" rx="7" fill="#edf7f1" stroke="#17845f" stroke-width="2" />
      <rect x="474" y="322" width="153" height="92" rx="7" fill="#fcf2e9" stroke="#d97022" stroke-width="2" />
      <text x="350" y="358" text-anchor="middle" class="w8-big">4 нуля</text><text x="550" y="358" text-anchor="middle" class="w8-big">4 единицы</text>
      <g v-for="i in 4" :key="'b'+i"><circle :cx="299+(i-1)*34" cy="389" r="10" class="w8-zero" /><rect :x="489+(i-1)*34" y="379" width="20" height="20" class="w8-one" /></g>
    </template>
  </template>
  <text x="132" y="302" v-if="stage>0" text-anchor="middle" class="w8-label">ошибок: 0</text>
  <text x="462" y="354" v-if="stage===1" text-anchor="middle" class="w8-label">ошибок: 4</text>
</svg>
</template>
