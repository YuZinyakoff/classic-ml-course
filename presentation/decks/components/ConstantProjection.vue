<script setup lang="ts">
import SourceConstantProjection from '../../components/ConstantProjection.vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <SourceConstantProjection v-bind="$attrs" />
</template>
