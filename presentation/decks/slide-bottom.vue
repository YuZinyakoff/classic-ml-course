<script setup>
const appendixSlides = (slidev, total) => Number(
  slidev?.configs?.appendixSlides ?? (total === 66 ? 3 : 0),
)
</script>

<template>
  <div v-if="$page > 1" class="slide-number" aria-hidden="true">
    {{ $page <= $nav.total - appendixSlides($slidev, $nav.total)
      ? `${$page} / ${$nav.total - appendixSlides($slidev, $nav.total)}`
      : `A${$page - ($nav.total - appendixSlides($slidev, $nav.total))}` }}
  </div>
</template>
