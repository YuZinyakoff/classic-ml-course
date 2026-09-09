<script setup lang="ts">
defineProps<{ section: string }>()
</script>

<template>
  <div class="section-chrome" aria-hidden="true">
    <span>{{ section }}</span>
    <span>МАШИННОЕ ОБУЧЕНИЕ</span>
  </div>
</template>
