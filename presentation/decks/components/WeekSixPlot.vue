<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(defineProps<{ name: string; step?: number; height?: number; alt: string }>(), { step: 0, height: 390 })
const path = computed(() => import.meta.env.BASE_URL+'assets/week-06/'+props.name+'-'+String(props.step).padStart(2,'0')+'.svg')
</script>
<template>
  <img class="w6-plot" :src="path" :alt="alt" :data-plot-step="step" :style="{ height: height+'px' }" />
</template>
<style scoped>
.w6-plot { display:block; width:100%; max-width:100%; object-fit:contain; }
</style>
