<script setup>
import {computed} from 'vue'
import data from '../assets/week-08/plot-data.json'
import '../week08.css'
const props=defineProps({kind:{type:String,default:'depth'},variant:{type:Number,default:0}})
const spec=computed(()=>{
  if(props.kind==='depth')return {...data.depth,rects:data.depth.models[props.variant].rects}
  if(props.kind==='nonlinear')return {...data.nonlinear,rects:props.variant?data.nonlinear.rects:[]}
  if(props.kind==='instability')return {...data.instability,points:props.variant?data.instability.after:data.instability.points,rects:props.variant?data.instability.after_rects:data.instability.before_rects}
  if(props.kind==='validation')return {bounds:[1,18,0,.5]}
  if(props.kind==='extrapolation')return {bounds:[0,8,0,9],points:data.extrapolation.points}
  if(props.kind==='regdepth')return {bounds:[0,7,-1.2,2.5],points:data.regdepth.points}
  return {bounds:[0,1,0,props.kind==='entropy'?1.05:.55]}
})
const sx=x=>65+(x-spec.value.bounds[0])/(spec.value.bounds[1]-spec.value.bounds[0])*475
// Не сворачивать в `a - (b-c)/d`: установленный minifier исказил скобки.
const sy=y=>326 + (y-spec.value.bounds[2])*(-263)/(spec.value.bounds[3]-spec.value.bounds[2])
const poly=pts=>pts.map(([x,y])=>`${sx(x)},${sy(y)}`).join(' ')
const path=computed(()=>Array.from({length:101},(_,i)=>{
  const p=i/100
  return [p,props.kind==='entropy'?(p===0||p===1?0:-p*Math.log2(p)-(1-p)*Math.log2(1-p)):2*p*(1-p)]
}))
const xticks=computed(()=>['depth','nonlinear','instability'].includes(props.kind)?[spec.value.bounds[0],0,spec.value.bounds[1]]:props.kind==='validation'?[1,5,10,15,18]:props.kind==='extrapolation'?[0,2,4,6,8]:props.kind==='regdepth'?[0,2,4,6]:[0,.5,1])
const yticks=computed(()=>props.kind==='validation'?[0,.2,.4]:props.kind==='gini'?[0,.25,.5]:props.kind==='entropy'?[0,.5,1]:props.kind==='extrapolation'?[0,3,6,9]:props.kind==='regdepth'?[-1,0,1,2]:[0,1])
const root=computed(()=>data.instability.roots[props.variant])
</script>
<template>
<svg class="w8-visual" viewBox="0 0 600 410" role="img" :aria-label="`Авторский воспроизводимый график: ${kind}, вариант ${variant+1}`">
  <rect x="65" y="63" width="475" height="263" fill="#fafbfd" />
  <g v-for="(r,i) in spec.rects||[]" :key="'r'+i">
    <rect :x="sx(r[0])" :y="sy(r[3])" :width="Math.max(0,sx(r[1])-sx(r[0]))" :height="Math.max(0,sy(r[2])-sy(r[3]))" :fill="r[4]?'#d97022':'#17845f'" opacity=".16" stroke="#66758b" stroke-width="1" />
  </g>
  <rect v-if="kind==='extrapolation'" :x="sx(5)" y="63" :width="sx(8)-sx(5)" height="263" fill="#eaf0f9" />
  <line v-for="v in yticks" :key="'gy'+v" x1="65" :y1="sy(v)" x2="540" :y2="sy(v)" class="w8-gridline" />
  <path d="M65 46 V326 H553" class="w8-axis" />
  <text v-for="v in xticks" :key="'xt'+v" :x="sx(v)" y="360" text-anchor="middle" class="w8-label">{{Number(v.toFixed(1))}}</text>
  <text v-for="v in yticks" :key="'yt'+v" x="42" :y="sy(v)+8" text-anchor="middle" class="w8-label">{{v}}</text>
  <template v-if="['depth','nonlinear','instability'].includes(kind)">
    <text x="551" y="391" class="w8-big">x₁</text><text x="22" y="41" class="w8-big">x₂</text>
    <g v-for="(p,i) in spec.points" :key="'p'+i">
      <circle v-if="!p[2]" :cx="sx(p[0])" :cy="sy(p[1])" :r="kind==='nonlinear'?4:5" class="w8-zero" />
      <rect v-else :x="sx(p[0])-4.5" :y="sy(p[1])-4.5" width="9" height="9" class="w8-one" />
      <circle v-if="kind==='instability'&&i===spec.changed" :cx="sx(p[0])" :cy="sy(p[1])" r="12" class="w8-halo" />
    </g>
    <line v-if="kind==='nonlinear'&&!variant" :x1="sx(-2.05)" :y1="sy(-(spec.coef[0]*-2.05+spec.intercept)/spec.coef[1])" :x2="sx(2.05)" :y2="sy(-(spec.coef[0]*2.05+spec.intercept)/spec.coef[1])" stroke="#2864dc" stroke-width="3" />
    <template v-if="kind==='instability'">
      <line v-if="root[0]===1" :x1="sx(root[1])" y1="63" :x2="sx(root[1])" y2="326" class="w8-cut" />
      <line v-else x1="65" :y1="sy(root[1])" x2="540" :y2="sy(root[1])" class="w8-cut" />
      <text x="300" y="27" text-anchor="middle" class="w8-label">корень: x{{root[0]===1?'₁':'₂'}} ≤ {{root[1].toFixed(2)}}</text>
    </template>
    <text v-if="kind==='depth'" x="300" y="27" text-anchor="middle" class="w8-label">глубина {{spec.models[variant].depth??'не ограничена'}} · листьев {{spec.models[variant].leaves}}</text>
  </template>
  <template v-else-if="kind==='validation'">
    <polyline :points="poly(data.validation.map(v=>[v[0],v[1]]))" fill="none" stroke="#2864dc" stroke-width="4" />
    <polyline :points="poly(data.validation.map(v=>[v[0],v[2]]))" fill="none" stroke="#d97022" stroke-width="4" stroke-dasharray="10 6" />
    <text x="83" y="26" class="w8-label" style="fill:#2864dc">train</text><text x="267" y="26" class="w8-label" style="fill:#d97022">validation</text>
    <text x="18" y="41" class="w8-label">ошибка</text><text x="302" y="402" text-anchor="middle" class="w8-label">максимальная глубина</text>
  </template>
  <template v-else-if="kind==='regdepth'||kind==='extrapolation'">
    <circle v-for="(p,i) in spec.points" :key="i" :cx="sx(p[0])" :cy="sy(p[1])" r="4.5" fill="#172033" opacity=".7" />
    <polyline v-if="kind==='regdepth'" :points="poly(data.regdepth.lines[variant])" fill="none" stroke="#2864dc" stroke-width="3" />
    <template v-else>
      <polyline :points="poly(data.extrapolation.tree)" fill="none" stroke="#2864dc" stroke-width="3.5" />
      <polyline :points="poly(data.extrapolation.linear)" fill="none" stroke="#d97022" stroke-width="3" stroke-dasharray="9 5" />
      <text x="428" y="89" text-anchor="middle" class="w8-label">вне train</text>
    </template>
    <text x="28" y="39" class="w8-big">y</text><text x="550" y="395" class="w8-big">x</text>
  </template>
  <template v-else>
    <polyline :points="poly(path)" fill="none" stroke="#2864dc" stroke-width="4" />
    <text x="21" y="39" class="w8-big">{{kind==='entropy'?'H':'G'}}</text>
    <text x="300" y="402" text-anchor="middle" class="w8-label">доля класса 1, p</text>
  </template>
</svg>
</template>
