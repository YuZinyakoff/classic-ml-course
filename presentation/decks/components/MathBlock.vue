<script setup lang="ts">
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  formula: string
  display?: boolean
}>(), {
  display: true,
})

const rendered = computed(() => katex.renderToString(props.formula, {
  displayMode: props.display,
  throwOnError: true,
}))
</script>

<template>
  <div class="deck-math" v-html="rendered" />
</template>

<style scoped>
.deck-math :deep(.katex-display) {
  margin: 0;
}
</style>
