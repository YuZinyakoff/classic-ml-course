<script setup lang="ts">
defineProps<{ phase: 'build' | 'projection' }>()
</script>

<template>
  <svg viewBox="0 0 780 430" class="projection-story" role="img" aria-label="Пространство прогнозов линейной модели">
    <defs>
      <marker id="pp-arrow-orange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97022" />
      </marker>
      <marker id="pp-arrow-dark" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#172033" />
      </marker>
      <marker id="pp-arrow-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#17845f" />
      </marker>
      <marker id="pp-arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#c83e36" />
      </marker>
    </defs>

    <polygon
      v-if="phase === 'projection'"
      points="95,335 665,290 720,105 155,150"
      fill="#eaf1ff"
      stroke="#2864dc"
      stroke-width="4"
    />
    <polygon
      v-if="phase === 'build'"
      v-click="4"
      points="95,335 665,290 720,105 155,150"
      fill="#eaf1ff"
      stroke="#2864dc"
      stroke-width="4"
    />

    <g v-if="phase === 'build'" v-click="1">
      <line x1="145" y1="305" x2="365" y2="286" stroke="#d97022" stroke-width="5" marker-end="url(#pp-arrow-orange)" />
      <text x="330" y="327" fill="#d97022" font-size="31" font-weight="700">1</text>
    </g>
    <g v-else>
      <line x1="145" y1="305" x2="365" y2="286" stroke="#d97022" stroke-width="5" marker-end="url(#pp-arrow-orange)" />
      <text x="330" y="327" fill="#d97022" font-size="31" font-weight="700">1</text>
    </g>
    <g v-if="phase === 'build'" v-click="2">
      <line x1="145" y1="305" x2="240" y2="190" stroke="#d97022" stroke-width="5" marker-end="url(#pp-arrow-orange)" />
      <text x="223" y="175" fill="#d97022" font-size="31" font-style="italic">x</text>
    </g>
    <g v-else>
      <line x1="145" y1="305" x2="240" y2="190" stroke="#d97022" stroke-width="5" marker-end="url(#pp-arrow-orange)" />
      <text x="223" y="175" fill="#d97022" font-size="31" font-style="italic">x</text>
    </g>
    <g v-if="phase === 'build'" v-click="3" fill="#17845f">
      <circle cx="275" cy="250" r="8" />
      <circle cx="390" cy="245" r="8" />
      <circle cx="500" cy="215" r="8" />
      <circle cx="585" cy="260" r="8" />
    </g>
    <text v-if="phase === 'build'" v-click="4" x="425" y="365" fill="#2864dc" font-size="28">плоскость допустимых прогнозов</text>

    <g v-if="phase === 'projection'">
      <text x="500" y="360" fill="#2864dc" font-size="27">допустимые прогнозы</text>
      <g v-click="1">
        <line x1="145" y1="305" x2="492" y2="55" stroke="#172033" stroke-width="5" marker-end="url(#pp-arrow-dark)" />
        <circle cx="492" cy="55" r="9" fill="#172033" />
        <text x="507" y="50" fill="#172033" font-size="34" font-style="italic">y</text>
      </g>
      <g v-click="2" fill="#d97022">
        <circle cx="330" cy="250" r="7" />
        <circle cx="430" cy="236" r="7" />
        <circle cx="580" cy="214" r="7" />
      </g>
      <g v-click="3">
        <line x1="145" y1="305" x2="505" y2="217" stroke="#17845f" stroke-width="7" marker-end="url(#pp-arrow-green)" />
        <circle cx="505" cy="217" r="10" fill="#17845f" stroke="white" stroke-width="3" />
        <text x="535" y="247" fill="#17845f" font-size="31">ŷ</text>
      </g>
      <g v-click="4">
        <line x1="505" y1="217" x2="492" y2="55" stroke="#c83e36" stroke-width="6" marker-end="url(#pp-arrow-red)" />
        <text x="515" y="145" fill="#c83e36" font-size="28">r = y − ŷ</text>
      </g>
      <path v-click="5" d="M 505 217 L 480 219 L 478 194 L 503 192" fill="none" stroke="#172033" stroke-width="3" />
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
