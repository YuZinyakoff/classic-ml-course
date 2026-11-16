<script setup>
import '../masters-week05.css'
defineProps({ section: String, title: String, family: { type: String, default: 'w8' }, cover: Boolean })
</script>

<template>
  <header :class="[family + '-header', 'm5-header', { 'm5-cover': cover }]">
    <div class="m5-service"><span>Классическое машинное обучение</span><span>Магистратура · Неделя 5</span></div>
    <div :class="family + '-section'">{{ section }}</div>
    <h1>{{ title }}</h1>
  </header>
</template>
