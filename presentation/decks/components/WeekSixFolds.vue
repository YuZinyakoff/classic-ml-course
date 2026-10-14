<script setup lang="ts">
import { computed } from 'vue'
import MathBlock from './MathBlock.vue'
import data from './week06-data.json'
const props=withDefaults(defineProps<{mode:string;step?:number;split?:number;pair?:number;candidate?:number}>(),{step:0,split:0,pair:0,candidate:0})
const fmt=(x:number)=>x.toFixed(3).replace('.',',')
const holdout=computed(()=>data.holdout[props.split])
const errors=['4{,}1','4{,}7','3{,}9','5{,}8','4{,}5']
const current=computed(()=>props.mode==='cycle'?(props.step<2?1:2):Math.min(5,props.step+1))
const shownSchemes=computed(()=>data.schemes.slice(props.pair*2,props.pair*2+2))
const descriptions=[
  'Четыре непересекающихся фолда. В исходном порядке классы сгруппированы: все положительные попали в последний фолд.',
  'Четыре случайных разбиения заново. Один объект может проверяться несколько раз, другой — ни разу.',
  'В каждом фолде 3 положительных и 21 отрицательный объект: сохраняем доли классов.',
  '12 пациентов по 8 записей. Проверяем на новых пациентах: все записи выбранного пациента целиком в validation.'
]
const errorFormula=(k:number)=>'\\mathrm{MSE}_'+k+'='+errors[k-1]
const gridLambda=computed(()=>data.cv[props.candidate].lambda)
</script>
<template>
  <div class="w6-fold-system" :data-fold-stage="step" :data-fold-mode="mode">
    <div v-if="mode==='holdout'" class="holdout">
      <div class="legend"><span class="blue">Train: 24 объекта</span><span class="orange">Validation: 6 объектов</span><span v-if="split===1">Обводка — объект сменил роль</span></div>
      <div class="object-grid">
        <div v-for="j in 30" :key="j" class="object" :class="{valid:holdout.validation.includes(j),changed:split===1 && holdout.validation.includes(j)!==data.holdout[0].validation.includes(j)}">{{j}}</div>
      </div>
      <div class="holdout-flow">
        <div>24 train<br><span>Обучающие объекты</span></div><i>→</i>
        <div :class="{concealed:step<1}">Модель {{split+1}}<br><span>Обучаем заново</span></div><i :class="{concealed:step<2}">→</i>
        <div :class="{concealed:step<2}">MSE = {{fmt(holdout.mse)}}<br><span>На 6 validation-объектах</span></div>
      </div>
      <div class="detail">Validation: № {{holdout.validation.join(', ')}}</div>
    </div>
    <div v-else-if="mode==='assemble'" class="assemble">
      <div class="data-source">100 исходных объектов</div>
      <div v-if="step===0" class="unpartitioned"><span v-for="j in 100" :key="j" /></div>
      <div v-else class="dev-test">
        <div class="dev"><h3>80 — данные для разработки (dev)</h3>
          <div v-if="step===1" class="unpartitioned blue-pixels"><span v-for="j in 80" :key="j" /></div>
          <div v-else class="five-parts"><div v-for="j in 5" :key="j"><MathBlock :formula="'F_'+j" :display="false" /><span>16 объектов</span></div></div>
        </div>
        <div class="test-block"><h3>20 — test</h3><div>Откладываем для<br>финальной проверки</div></div>
      </div>
      <div class="explanation">{{['Сначала сохраняем данные для независимой окончательной проверки.','Все решения и повторные train/validation-разбиения — внутри dev.','K-fold: делим dev на K непересекающихся частей — фолдов.'][step]}}</div>
    </div>
    <div v-else-if="mode==='schemes'" class="scheme-system">
      <div class="scheme-legend"><div class="role-key"><span class="swatch train-swatch"></span>Train<span class="swatch valid-swatch"></span>Validation</div><div class="class-key">Нижняя полоса:<span class="swatch zero-swatch"></span>Класс 0<span class="swatch one-swatch"></span>Класс 1</div></div>
      <div class="schemes">
      <div v-for="(scheme,i) in shownSchemes" :key="scheme.name" class="scheme">
        <h3>{{scheme.name}}</h3>
        <div class="strip-head"><span>Проход</span><span>Объекты 1–96 в исходном порядке</span><span>Класс 1</span></div>
        <div v-for="(indices,k) in scheme.validation" :key="k" class="strip">
          <span class="row-label">{{k+1}}</span><div class="pixels"><span v-for="j in 96" :key="j" :class="{valid:indices.includes(j-1)}" /></div>
          <span class="counts">{{scheme.positives[k]}} / 24</span>
        </div>
        <div class="strip"><span></span><div class="class-strip"><span v-for="j in 96" :key="j" :class="{positive:j>84}" /></div><span></span></div>
        <div class="class-caption">84 объекта класса 0 · 12 объектов класса 1</div>
        <div v-if="scheme.name==='Group K-fold'" class="group-strip"><span v-for="g in 12" :key="g">{{g}}</span></div>
        <div class="scheme-note">{{descriptions[pair*2+i]}}</div>
      </div>
      </div>
    </div>
    <div v-else-if="mode==='gridwalk'" class="gridwalk">
      <div class="grid-heading"><MathBlock :formula="'\\lambda='+gridLambda" :display="false" /><span>{{step<5?'Проход '+current:'Вычисляем среднее пяти ошибок'}}</span></div>
      <div class="grid-folds"><div v-for="j in 5" :key="j" class="fold" :class="{valid:j===current && step<5,neutral:step>=5}"><MathBlock :formula="'F_'+j" :display="false" /><span>{{step>=5?'30 объектов':j===current?'Validation':'Train'}}</span></div></div>
      <div class="detail">{{step<5?'Новая модель: 120 train → ошибка на 30 validation':'Пять отдельных моделей → пять отложенных ошибок → одна CV-MSE'}}</div>
    </div>
    <div v-else class="fold-story">
      <div class="legend"><span class="blue">Train</span><span class="orange">Validation</span><span class="grey">Финальный test — вне CV</span></div>
      <div class="fold-header"><div>Проход</div><div v-for="j in 5" :key="j"><MathBlock :formula="'F_'+j" :display="false" /></div><div>Модель</div><div>Ошибка</div></div>
      <div v-for="k in (mode==='all'?Math.min(5,step+1):1)" :key="k" class="fold-row">
        <div class="row-label">{{mode==='all'?k:current}}</div>
        <div v-for="j in 5" :key="j" class="fold" :class="{valid:j===(mode==='all'?k:current)}">{{j===(mode==='all'?k:current)?'Valid':'Train'}}</div>
        <div class="model">Модель {{mode==='all'?k:current}}</div>
        <MathBlock v-if="mode==='all' || step===1 || step===3" :formula="errorFormula(mode==='all'?k:current)" :display="false" class="error" />
        <div v-else class="pending">Считаем MSE</div>
      </div>
      <div v-if="mode==='cycle'" class="training">Обучаем новую модель на 64 объектах → проверяем на 16 других.</div>
      <div v-if="mode==='cycle' && step>=2" class="detail">На прошлом проходе: Модель 1, validation — первый фолд, MSE = 4,1.</div>
      <MathBlock v-if="mode==='all' && step>=5" formula="\mathrm{CV\text{-}MSE}=\frac{4{,}1+4{,}7+3{,}9+5{,}8+4{,}5}{5}=4{,}6" class="average" />
    </div>
  </div>
</template>
<style scoped>
.w6-fold-system {width:100%;font-size:24px;color:#172033}
.legend {display:flex;gap:30px;font-size:23px;margin-bottom:24px;align-items:center}
.blue {color:#2864dc}.orange {color:#d97022}.grey {color:#66758b;margin-left:auto}
.object-grid {display:grid;grid-template-columns:repeat(15,1fr);gap:10px}
.object {text-align:center;padding:10px 0;border-radius:5px;background:#2864dc;color:white;font-size:26px;border:3px solid transparent}
.object.valid {background:#d97022}
.object.changed {border-color:#172033}
.holdout-flow {display:flex;align-items:center;justify-content:space-between;gap:15px;margin-top:32px;font-size:27px}
.holdout-flow>div {padding:14px 16px;border-top:3px solid #dce3ec;background:#f8fafc}
.holdout-flow span {font-size:22px;color:#66758b}
.holdout-flow i {font-style:normal}
.detail {font-size:23px;color:#66758b;line-height:1.35;margin-top:24px;text-align:center}
.concealed {visibility:hidden}
.data-source {font-size:32px;text-align:center;margin-bottom:32px}
.unpartitioned {display:grid;grid-template-columns:repeat(20,1fr);gap:4px;padding:16px;background:#f8fafc}
.unpartitioned span {height:20px;background:#9aa7b9}
.blue-pixels span {background:#2864dc}
.dev-test {display:grid;grid-template-columns:4fr 1.15fr;gap:30px;align-items:stretch}
.dev {padding:20px;background:#eaf1ff}
.dev h3,.test-block h3 {font-size:26px;line-height:1.25;margin:0 0 24px}
.test-block {background:#eef0f3;padding:20px;line-height:1.4}
.five-parts {display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
.five-parts>div {display:flex;flex-direction:column;align-items:center;gap:12px;padding:12px 4px;background:white;color:#2864dc}
.five-parts span {font-size:21px;color:#66758b}
.explanation {margin-top:38px;font-size:27px;line-height:1.4;text-align:center}
.fold-header,.fold-row {display:grid;grid-template-columns:95px repeat(5,minmax(0,1fr)) 150px 160px;gap:8px;align-items:center}
.fold-header {margin-bottom:14px;text-align:center;font-size:23px}
.fold-row {margin-bottom:10px;font-size:23px}
.fold {padding:12px 2px;text-align:center;border-radius:4px;color:white;background:#2864dc}
.fold.valid {background:#d97022}
.model {text-align:center}.row-label {text-align:center}
.training {font-size:28px;text-align:center;margin-top:40px}
.error {font-size:25px;text-align:center}.pending {font-size:21px;color:#66758b}
.average {font-size:31px;margin-top:18px}
.schemes {display:grid;grid-template-columns:1fr 1fr;gap:40px}
.scheme h3 {font-size:30px;margin:0 0 18px;line-height:1.2}
.strip,.strip-head {display:grid;grid-template-columns:65px 1fr 82px;gap:10px;align-items:center;margin:4px 0}
.strip-head {font-size:19px;color:#66758b;line-height:1.2;text-align:center}
.pixels,.class-strip {display:grid;grid-template-columns:repeat(96,1fr);gap:0;height:32px}
.pixels span {background:#2864dc}.pixels .valid {background:#d97022}
.counts {font-size:23px;text-align:center}
.class-strip {height:18px}.class-strip span {background:#dce3ec}.class-strip .positive {background:#17845f}
.class-caption {font-size:20px;text-align:center;color:#66758b;margin-top:12px}
.group-strip {display:grid;grid-template-columns:repeat(12,1fr);gap:2px;margin:12px 92px 0 75px;font-size:18px;text-align:center}
.group-strip span {background:#eaf1ff;border:1px solid #9aa7b9}
.scheme-note {font-size:25px;margin-top:18px;line-height:1.35}
.grid-heading {display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;font-size:26px}
.grid-folds {display:grid;grid-template-columns:repeat(5,1fr);gap:16px}
.grid-folds .fold {display:flex;align-items:center;justify-content:center;gap:12px;padding:12px;font-size:24px}
.gridwalk .detail {margin-top:15px}
.grid-folds .neutral {background:#eaf1ff;color:#2864dc}
.scheme-legend {display:flex;justify-content:space-between;gap:24px;margin-bottom:26px;font-size:23px;line-height:1.3}
.role-key,.class-key {display:flex;align-items:center;gap:12px}
.swatch {display:inline-block;width:24px;height:20px;flex-shrink:0}
.train-swatch {background:#2864dc}.valid-swatch {background:#d97022}
.zero-swatch {background:#dce3ec}.one-swatch {background:#17845f}
</style>
