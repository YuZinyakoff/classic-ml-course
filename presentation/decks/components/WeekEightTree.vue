<script setup>
import '../week08.css'
defineProps({stage:{type:Number,default:2},route:{type:Number,default:0},counts:{type:Boolean,default:false},prune:{type:Boolean,default:false},terms:{type:Boolean,default:false},cut:{type:Boolean,default:false}})
</script>
<template>
<svg class="w8-visual" viewBox="0 0 620 420" role="img" aria-label="Двоичное дерево: x1 не больше 2.5, затем x2 не больше 1.5; три листа">
  <template v-if="stage > 0">
    <path d="M310 81 L130 180" :class="['w8-link',{'w8-active':route===3}]" />
    <path d="M310 81 L454 180" :class="['w8-link',{'w8-active':route>=1&&route!==3}]" />
    <text x="159" y="116" class="w8-label">да</text><text x="421" y="116" class="w8-label">нет</text>
    <template v-if="stage > 1 && !prune">
      <path d="M454 224 L341 324" class="w8-link" />
      <path d="M454 224 L536 324" :class="['w8-link',{'w8-active':route===2}]" />
      <text x="356" y="274" class="w8-label">да</text><text x="526" y="274" class="w8-label">нет</text>
    </template>
  </template>
  <rect x="211" y="22" width="198" height="60" rx="7" class="w8-node" />
  <text x="310" :y="terms?48:61" text-anchor="middle" class="w8-big">{{stage===0?'класс 0':'x₁ ≤ 2.5?'}}</text>
  <text v-if="terms" x="310" y="74" text-anchor="middle" style="font-size:23px">корень</text>
  <text v-if="stage===0" x="310" y="123" text-anchor="middle" class="w8-label">8 нулей · 4 единицы</text>
  <template v-if="stage > 0">
    <rect x="42" y="180" width="176" height="60" rx="7" fill="#edf7f1" stroke="#17845f" stroke-width="2" />
    <text x="130" :y="terms?205:218" text-anchor="middle" class="w8-big">класс 0</text>
    <text v-if="terms" x="130" y="232" text-anchor="middle" style="font-size:23px">лист</text>
    <text v-if="counts" x="130" y="277" text-anchor="middle" class="w8-label">6 нулей</text>
    <rect x="354" y="180" width="200" height="60" rx="7" :fill="prune||stage===1?'#fcf2e9':'white'" :stroke="prune||stage===1?'#d97022':'#8ca1bc'" stroke-width="2" />
    <text x="454" :y="terms?205:218" text-anchor="middle" class="w8-big">{{prune||stage===1?'класс 1':'x₂ ≤ 1.5?'}}</text>
    <text v-if="terms" x="454" y="231" text-anchor="middle" style="font-size:23px">{{stage>1&&!prune?'внутренний узел':'лист'}}</text>
    <text v-if="stage===1||prune" x="454" y="278" text-anchor="middle" class="w8-label">2 нуля · 4 единицы</text>
    <template v-if="stage>1&&!prune">
      <rect x="262" y="324" width="157" height="60" rx="7" fill="#edf7f1" stroke="#17845f" stroke-width="2" />
      <rect x="458" y="324" width="157" height="60" rx="7" fill="#fcf2e9" stroke="#d97022" stroke-width="2" />
      <text x="341" y="362" text-anchor="middle" class="w8-big">класс 0</text>
      <text x="536" y="362" text-anchor="middle" class="w8-big">класс 1</text>
      <text v-if="counts" x="341" y="415" text-anchor="middle" class="w8-label">2 нуля</text>
      <text v-if="counts" x="536" y="415" text-anchor="middle" class="w8-label">4 единицы</text>
    </template>
  </template>
  <template v-if="terms"><text x="7" y="23" style="font-size:23px">глубина</text><text x="9" y="64" class="w8-label">0</text><text x="9" y="220" class="w8-label">1</text><text v-if="stage>1" x="9" y="364" class="w8-label">2</text></template>
  <template v-if="cut"><path d="M280 165 L610 407 M610 165 L280 407" stroke="#bd4d36" stroke-width="5" opacity=".8" /><text x="454" y="160" text-anchor="middle" class="w8-label" style="fill:#bd4d36">удаляем поддерево</text></template>
</svg>
</template>
