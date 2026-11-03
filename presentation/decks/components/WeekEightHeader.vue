<script setup>
import '../week08.css'
defineProps({section:String,title:String,cover:{type:Boolean,default:false}})
</script>
<template>
  <header :class="['w8-header',{'w8-header-cover':cover}]">
    <div class="w8-service"><span>Классическое машинное обучение</span><span>Бакалавриат · Неделя 8</span></div>
    <div class="w8-section">{{section}}</div>
    <h1>{{title}}</h1>
  </header>
</template>
