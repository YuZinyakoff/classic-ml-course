<script setup>
import '../week08.css'
defineProps({stage:{type:Number,default:1}})
</script>
<template>
<svg class="w8-visual" viewBox="0 0 600 400" role="img" :aria-label="stage===1?'XOR: первый разрез оставляет обе группы смешанными':'XOR: второй уровень создаёт четыре чистые области'">
  <rect x="90" y="70" width="420" height="250" fill="#fafbfd" />
  <template v-if="stage>1"><rect x="90" y="70" width="210" height="125" fill="#d97022" opacity=".13" /><rect x="300" y="70" width="210" height="125" fill="#17845f" opacity=".13" /><rect x="90" y="195" width="210" height="125" fill="#17845f" opacity=".13" /><rect x="300" y="195" width="210" height="125" fill="#d97022" opacity=".13" /><line x1="90" y1="195" x2="510" y2="195" class="w8-cut" /></template>
  <path d="M90 57 V320 H530" class="w8-axis" /><line x1="300" y1="59" x2="300" y2="320" class="w8-cut" />
  <text x="300" y="34" text-anchor="middle" class="w8-label">x₁ ≤ 0.5</text>
  <text x="149" y="353" class="w8-label">0</text><text x="443" y="353" class="w8-label">1</text><text x="60" y="273" class="w8-label">0</text><text x="60" y="128" class="w8-label">1</text>
  <text x="537" y="358" class="w8-big">x₁</text><text x="42" y="49" class="w8-big">x₂</text>
  <circle cx="155" cy="265" r="16" class="w8-zero" /><circle cx="445" cy="120" r="16" class="w8-zero" /><rect x="139" y="104" width="32" height="32" class="w8-one" /><rect x="429" y="249" width="32" height="32" class="w8-one" />
  <text v-if="stage>1" x="300" y="391" text-anchor="middle" class="w8-label">x₂ ≤ 0.5 в каждой группе</text>
</svg>
</template>
