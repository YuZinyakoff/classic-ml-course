<script setup>
import { computed } from 'vue'
const props = defineProps({ focus: { type: String, default: 'all' }, step: { type: Number, default: 3 }, contributions: { type:Boolean, default:false } })
const nodes = [
  { id:0,x:550,y:38,label:'До центра ≤ 33 мин',n:24,zero:11,one:13,h:'0,49653' },
  { id:1,x:280,y:143,label:'Площадь ≤ 46,5 м²',n:14,zero:3,one:11,h:'0,33673' },
  { id:6,x:820,y:143,label:'Площадь ≤ 66 м²',n:10,zero:8,one:2,h:'0,32000' },
  { id:2,x:100,y:248,label:'Класс 0',n:3,zero:2,one:1,h:'0,44444',leaf:true },
  { id:3,x:390,y:248,label:'До центра ≤ 29,5',n:11,zero:1,one:10,h:'0,16529' },
  { id:7,x:680,y:248,label:'Класс 0',n:6,zero:6,one:0,h:'0',leaf:true },
  { id:8,x:960,y:248,label:'До центра ≤ 51,5',n:4,zero:2,one:2,h:'0,50000' },
  { id:4,x:310,y:355,label:'Класс 1',n:8,zero:0,one:8,leaf:true },
  { id:5,x:470,y:355,label:'Класс 1',n:3,zero:1,one:2,leaf:true },
  { id:9,x:880,y:355,label:'Класс 1',n:2,zero:0,one:2,leaf:true },
  { id:10,x:1040,y:355,label:'Класс 0',n:2,zero:2,one:0,leaf:true },
]
const edges = [[0,1,'да'],[0,6,'нет'],[1,2,'да'],[1,3,'нет'],[3,4,'да'],[3,5,'нет'],[6,7,'да'],[6,8,'нет'],[8,9,'да'],[8,10,'нет']]
const path = [0,6,8,9]
const highlighted = computed(() => props.focus === 'path' ? path.slice(0,props.step+1) : [])
const byId = id => nodes.find(n=>n.id===id)
const nodeLeft = n => n.leaf ? n.x - 75 : n.x - 120
const isEdge = (a,b) => highlighted.value.includes(a) && highlighted.value.includes(b)
const branch = computed(()=>props.focus==='node1' ? [byId(1),byId(2),byId(3)] : [byId(0),byId(1),byId(6)])
const branchXY = [[320,42],[155,170],[485,170]]
const gains = {0:'0,16677',1:'0,06512',3:'0,02020',6:'0,05000',8:'0,08333'}
const featureColor = n => [1,6].includes(n.id) ? '#d97022' : '#2864dc'
const grouped = computed(()=>props.focus==='features')
</script>
<template>
  <svg v-if="focus==='root'||focus==='node1'" viewBox="0 0 640 235" class="w9-tree w9-branch" role="img" :aria-label="focus==='root'?'Корень 0 и потомки 1 и 6':'Узел 1 и потомки 2 и 3'">
    <g v-for="(n,i) in branch" :key="n.id">
      <path v-if="i" :d="`M320 83 L${branchXY[i][0]} 126`" stroke="#2864dc" stroke-width="3" fill="none" />
      <text v-if="i" :x="i===1?221:416" y="108" text-anchor="middle" font-size="22" fill="#526277">{{i===1?'да':'нет'}}</text>
      <rect :x="branchXY[i][0]-147" :y="branchXY[i][1]-40" width="294" height="91" rx="8" :fill="i?'#f5f8fc':'#e8f0ff'" stroke="#2864dc" stroke-width="2" />
      <text :x="branchXY[i][0]" :y="branchXY[i][1]-12" text-anchor="middle" font-size="22" font-weight="650">Узел {{n.id}} · n = {{n.n}}</text>
      <text :x="branchXY[i][0]" :y="branchXY[i][1]+14" text-anchor="middle" font-size="22">{{n.label}}</text>
      <text :x="branchXY[i][0]" :y="branchXY[i][1]+40" text-anchor="middle" font-size="22">H = {{n.h}}</text>
    </g>
  </svg>
  <svg v-else viewBox="0 0 1152 408" class="w9-tree" role="img" aria-label="Дерево из 24 квартир: пять внутренних узлов, глубина 3" :data-tree-step="focus==='path'?step:null">
    <g v-for="[a,b,label] in edges" :key="a+'-'+b" :opacity="focus==='path'&&!isEdge(a,b)?.22:1">
      <path :d="`M${byId(a).x} ${byId(a).y+32} L${byId(b).x} ${byId(b).y-32}`" :stroke="isEdge(a,b)?'#d97022':'#9bb0ca'" :stroke-width="isEdge(a,b)?5:2" fill="none" />
      <text :x="(byId(a).x+byId(b).x)/2" :y="(byId(a).y+byId(b).y)/2-1" text-anchor="middle" font-size="21" fill="#526277">{{label}}</text>
    </g>
    <g v-for="n in nodes" :key="n.id" :opacity="focus==='path'&&!highlighted.includes(n.id)?.27:1" :data-node="n.id" :data-highlighted="highlighted.includes(n.id)">
      <rect :x="nodeLeft(n)" :y="n.y-32" :width="n.leaf?150:240" height="66" rx="7" :fill="highlighted.includes(n.id)?'#fff0df':n.leaf?'#f1f7f5':'#edf3fc'" :stroke="grouped&&!n.leaf?featureColor(n):highlighted.includes(n.id)?'#d97022':'#8299b7'" :stroke-width="grouped&&!n.leaf?3:highlighted.includes(n.id)?3:1.5" />
      <text :x="n.x" :y="n.y-7" text-anchor="middle" font-size="21" font-weight="650">{{n.id}} · {{n.label}}</text>
      <text :x="n.x" :y="n.y+20" text-anchor="middle" font-size="21">{{contributions&&!n.leaf?'Δ = '+gains[n.id]:`n=${n.n} · [${n.zero}, ${n.one}]`}}</text>
    </g>
  </svg>
</template>
