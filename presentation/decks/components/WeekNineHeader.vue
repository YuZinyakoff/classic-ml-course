<script setup>
import '../week09.css'
defineProps({section:String,title:String,cover:{type:Boolean,default:false}})
</script>
<template>
  <header :class="['w9-header',{'w9-cover':cover}]">
    <div class="w9-service"><span>Классическое машинное обучение</span><span>Бакалавриат · Неделя 9</span></div>
    <div class="w9-section">{{ section }}</div>
    <h1>{{ title }}</h1>
  </header>
</template>
