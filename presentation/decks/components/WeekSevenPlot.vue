<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(defineProps<{ name: string; step?: number; height?: number; alt: string }>(),{step:0,height:355})
const url = computed(()=>import.meta.env.BASE_URL+'assets/week-07/'+props.name+'-'+String(props.step).padStart(2,'0')+'.svg')
const classes = computed(()=>props.name==='vote'?['A','B','C']:['global','boundaries','nearest','cover','voronoi','outlier','noise'].includes(props.name)?['A','B']:[])
// Keep arithmetic out of the HTML attribute: UnoCSS variant groups also scan it.
const imageStyle = computed(()=>({height: (props.height - (classes.value.length ? 36 : 0)) + 'px'}))
</script>
<template>
  <div class="w7-plot-system" :style="{height:height+'px'}">
    <img :src="url" :alt="alt" :data-plot-step="step" class="w7-plot" :style="imageStyle" />
    <div v-if="classes.length" class="plot-legend"><span v-for="(c,i) in classes" :key="c"><b :style="{color:['#2864dc','#d97022','#17845f'][i]}">{{ ['●','▲','■'][i] }}</b> Класс {{ c }}</span></div>
  </div>
</template>
<style scoped>
.w7-plot { display:block; width:100%; object-fit:contain; }
.plot-legend { height:36px; display:flex; align-items:center; justify-content:center; gap:30px; font-size:22px; color:#66758b; }
.plot-legend b { font-size:23px; }
</style>
