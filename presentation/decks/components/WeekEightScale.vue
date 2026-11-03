<script setup>
import '../week08.css'
const ages=[15,17,19,20,23,25,29,34,38],pos=x=>180+(x-14)*35
</script>
<template>
<svg class="w8-visual" viewBox="0 0 1120 340" role="img" aria-label="Возраст в годах и месяцах: один и тот же состав групп при порогах 20 и 240">
  <g v-for="(unit,j) in ['лет','месяцев']" :key="unit">
    <text x="22" :y="28+j*155" class="w8-big">Возраст, {{unit}}</text>
    <rect x="180" :y="72+j*155" :width="pos(20)-180" height="47" fill="#17845f" opacity=".11" /><rect :x="pos(20)" :y="72+j*155" :width="1070-pos(20)" height="47" fill="#d97022" opacity=".11" />
    <line x1="180" :y1="95+j*155" x2="1070" :y2="95+j*155" class="w8-axis" />
    <line :x1="pos(20)" :y1="59+j*155" :x2="pos(20)" :y2="123+j*155" class="w8-cut" />
    <text :x="pos(20)+15" :y="47+j*155" class="w8-label">порог {{j?240:20}}</text>
    <g v-for="(age,i) in ages" :key="i">
      <circle v-if="age<=20" :cx="pos(age)" :cy="95+j*155" r="12" class="w8-zero" /><rect v-else :x="pos(age)-11" :y="84+j*155" width="22" height="22" class="w8-one" />
      <text :x="pos(age)" :y="68+j*155" text-anchor="middle" class="w8-label">{{String.fromCharCode(65+i)}}</text>
      <line v-if="j&&i===3" :x1="pos(age)" y1="276" :x2="pos(age)" y2="310" stroke="#8ca1bc" />
      <text :x="pos(age)" :y="146+j*155+(j&&i===3?27:0)" text-anchor="middle" class="w8-label">{{j?age*12:age}}</text>
    </g>
  </g>
</svg>
</template>
