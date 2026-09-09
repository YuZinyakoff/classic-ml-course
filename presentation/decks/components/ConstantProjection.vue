<script setup lang="ts">
defineProps<{ phase: 'span' | 'projection' }>()
</script>

<template>
  <svg viewBox="0 0 760 430" class="projection-story" role="img" aria-label="Геометрия постоянных прогнозов">
    <defs>
      <marker id="cp-arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#2864dc" />
      </marker>
      <marker id="cp-arrow-dark" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#172033" />
      </marker>
      <marker id="cp-arrow-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#17845f" />
      </marker>
      <marker id="cp-arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#c83e36" />
      </marker>
    </defs>

    <g v-if="phase === 'span'">
      <g v-click="1">
        <line x1="105" y1="335" x2="300" y2="285" stroke="#2864dc" stroke-width="6" marker-end="url(#cp-arrow-blue)" />
        <text x="245" y="255" fill="#2864dc" font-size="34" font-weight="700">1</text>
      </g>
      <g v-click="2" fill="#17845f">
        <circle cx="202" cy="310" r="8" />
        <circle cx="300" cy="285" r="8" />
        <circle cx="398" cy="260" r="8" />
        <circle cx="496" cy="235" r="8" />
        <text x="188" y="350" fill="#66758b" font-size="24">c₁1</text>
        <text x="480" y="205" fill="#66758b" font-size="24">c₄1</text>
      </g>
      <line v-click="3" x1="45" y1="350" x2="690" y2="185" stroke="#2864dc" stroke-width="5" />
      <text v-click="4" x="405" y="330" fill="#2864dc" font-size="30">постоянные прогнозы</text>
    </g>

    <g v-else>
      <line x1="45" y1="350" x2="690" y2="185" stroke="#2864dc" stroke-width="5" />
      <text x="465" y="345" fill="#2864dc" font-size="27">все постоянные прогнозы</text>
      <line x1="105" y1="335" x2="300" y2="285" stroke="#2864dc" stroke-width="5" marker-end="url(#cp-arrow-blue)" />
      <text x="245" y="255" fill="#2864dc" font-size="31" font-weight="700">1</text>

      <g v-click="1">
        <line x1="105" y1="335" x2="394" y2="70" stroke="#172033" stroke-width="5" marker-end="url(#cp-arrow-dark)" />
        <circle cx="394" cy="70" r="9" fill="#172033" />
        <text x="408" y="63" fill="#172033" font-size="34" font-style="italic">y</text>
      </g>
      <g v-click="2" fill="#d97022">
        <circle cx="250" cy="298" r="7" />
        <circle cx="345" cy="273" r="7" />
        <circle cx="440" cy="249" r="7" />
      </g>
      <g v-click="3">
        <line x1="105" y1="335" x2="440" y2="249" stroke="#17845f" stroke-width="7" marker-end="url(#cp-arrow-green)" />
        <circle cx="440" cy="249" r="10" fill="#17845f" stroke="white" stroke-width="3" />
        <text x="455" y="285" fill="#17845f" font-size="31">ȳ1</text>
      </g>
      <g v-click="4">
        <line x1="440" y1="249" x2="394" y2="70" stroke="#c83e36" stroke-width="6" marker-end="url(#cp-arrow-red)" />
        <text x="385" y="165" fill="#c83e36" font-size="31" font-style="italic">r</text>
      </g>
      <path v-click="5" d="M 440 249 L 417 255 L 411 232 L 434 226" fill="none" stroke="#172033" stroke-width="3" />
    </g>
  </svg>
</template>

<style scoped>
.projection-story {
  display: block;
  width: auto;
  max-width: 100%;
  height: 405px;
  margin: 0 auto;
}

.projection-story text {
  font-size: 22px !important;
}
</style>
