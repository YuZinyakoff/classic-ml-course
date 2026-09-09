<script setup lang="ts">
import SourcePlaneProjection from '../../components/PlaneProjection.vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <SourcePlaneProjection v-bind="$attrs" />
</template>
