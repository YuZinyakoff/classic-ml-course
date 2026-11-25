<script setup>
import '../week11.css'
defineProps({ section: String, title: String, cover: Boolean, part: String })
</script>

<template>
  <header :class="['w11-header', { 'w11-cover': cover }]">
    <div class="w11-service"><span>Классическое машинное обучение</span><span>Бакалавриат · Неделя 11</span></div>
    <div v-if="!cover" class="w11-section">
      <span v-if="part" class="w11-part" :aria-label="'Блок ' + part">{{ part }}</span>{{ section }}
    </div>
    <h1>{{ title }}</h1>
  </header>
</template>
