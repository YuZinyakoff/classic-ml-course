<script setup lang="ts">
import SourceMathBlock from '../../components/MathBlock.vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <SourceMathBlock v-bind="$attrs" />
</template>
