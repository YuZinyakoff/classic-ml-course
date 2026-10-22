<script setup lang="ts">
import MathBlock from './MathBlock.vue'
const props = withDefaults(defineProps<{ symbolic?:boolean; focus?:string; step?:number }>(), {symbolic:false,focus:'',step:0})
const classes=['A','B','C']
const matrix=[[38,2,0],[4,10,1],[2,2,1]]
function cell(row:number,col:number){
  const focus=props.focus==='walk'?['','tp','fp','fn'][Math.min(props.step,3)]:props.focus
  const active=focus==='all'||focus==='diag'&&row===col||focus==='tp'&&row===2&&col===2||focus==='fp'&&row!==2&&col===2||focus==='fn'&&row===2&&col!==2||focus==='column'&&col===2||focus==='row'&&row===2||focus.startsWith('off-')&&row!==col||focus==='a-to-b'&&row===0&&col===1
  return {active, diagonal:row===col, tp:active&&row===2&&col===2, fp:focus==='fp'&&col===2&&row!==2, fn:focus==='fn'&&row===2&&col!==2, paired:focus==='a-to-b'&&row===0&&col===1}
}
function groupStyle(row:number,col:number){
  if(row===col||!props.focus.startsWith('off-'))return {}
  const group=props.focus==='off-rows'?row:col
  return {borderColor:['#2864dc','#d97022','#17845f'][group],background:['#eaf1ff','#fff1e6','#e7f6f0'][group]}
}
</script>
<template>
  <div class="confusion" :data-focus="focus" :data-step="step">
    <div class="prediction">Прогноз модели →</div>
    <div class="matrix-area"><div class="truth">Истинный класс</div>
      <table aria-label="Матрица ошибок: строки — истинный класс, столбцы — прогноз">
        <thead><tr><th></th><th v-for="c in classes" :key="c">{{ c }}</th></tr></thead>
        <tbody><tr v-for="(label,r) in classes" :key="label"><th>{{ label }}</th><td v-for="(label2,c) in classes" :key="label2" :class="cell(r,c)" :style="groupStyle(r,c)"><MathBlock v-if="symbolic" :formula="'C_{'+label+label2+'}'" :display="false" /><span v-else>{{ matrix[r][c] }}</span></td></tr></tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>
.confusion { width:100%; max-width:540px; margin:auto; }
.prediction { text-align:center; font-size:25px; margin:0 0 15px 55px; color:#66758b; }
.matrix-area { position:relative; padding-left:44px; }
.truth { position:absolute; transform:rotate(-90deg); transform-origin:center; left:-78px; top:164px; width:240px; text-align:center; font-size:24px; color:#66758b; }
table { width:100%; border-collapse:separate; border-spacing:5px; table-layout:fixed; }
th { border:0; font-size:29px; text-align:center; color:#66758b; font-weight:550; }
th:first-child { width:42px; }
td { height:88px; background:#f1f4f8; border:3px solid transparent; text-align:center; vertical-align:middle; font-size:38px; font-variant-numeric:tabular-nums; }
.diagonal { background:#e7f6f0; }
.active { border-color:#2864dc; background:#eaf1ff; }
.tp { border-color:#17845f; background:#e7f6f0; }
.fp,.fn,.paired { border-color:#d97022; background:#fff1e6; }
</style>
