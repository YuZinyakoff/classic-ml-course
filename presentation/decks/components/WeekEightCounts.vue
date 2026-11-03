<script setup>
import '../week08.css'
defineProps({zero:{type:Number,default:8},one:{type:Number,default:4},label:{type:String,default:''}})
</script>
<template>
<svg class="w8-visual" viewBox="0 0 540 165" role="img" :aria-label="`${zero} объектов класса 0, ${one} объектов класса 1`">
  <text x="270" y="30" text-anchor="middle" class="w8-big">{{label}}</text>
  <g v-for="i in zero+one" :key="i">
    <circle v-if="i<=zero" :cx="55+((i-1)%6)*82" :cy="72+Math.floor((i-1)/6)*54" r="15" class="w8-zero" />
    <rect v-else :x="40+((i-1)%6)*82" :y="57+Math.floor((i-1)/6)*54" width="30" height="30" class="w8-one" />
  </g>
</svg>
</template>
