<script setup>
import '../week08.css'
const plural=(n,one,few,many)=>n%10===1&&n%100!==11?one:n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?few:many
defineProps({condition:{type:String,default:'x₁ ≤ 2.5?'},single:{type:Boolean,default:false},regression:{type:Boolean,default:false},sizes:{type:Boolean,default:false},blocked:{type:Boolean,default:false},n:{type:Number,default:12},left:{type:Number,default:6},right:{type:Number,default:6},leftZero:{type:Number,default:6},leftOne:{type:Number,default:0},rightZero:{type:Number,default:2},rightOne:{type:Number,default:4},leftValue:{type:String,default:'ŷ = 4/3'},rightValue:{type:String,default:'ŷ = 8'},leftDetail:{type:String,default:'RSS = 2/3'},rightDetail:{type:String,default:'RSS = 2'},caption:{type:String,default:''}})
</script>
<template>
<svg class="w8-visual" viewBox="0 0 640 370" role="img" :aria-label="single?'Один лист до разбиения':'Условие и два дочерних узла с составом или размером групп'">
  <template v-if="single">
    <rect x="104" y="62" width="432" height="234" rx="9" class="w8-node" />
    <text x="320" y="108" text-anchor="middle" class="w8-big">{{regression?'Один лист: 6 объектов':'Один лист: 12 объектов'}}</text>
    <template v-if="regression"><text x="320" y="166" text-anchor="middle" class="w8-big">ŷ = 14/3</text><text x="320" y="221" text-anchor="middle" class="w8-label">RSS = 208/3</text></template>
    <template v-else>
      <g v-for="i in 12" :key="i"><circle v-if="i<=8" :cx="149+(i-1)%6*68" :cy="150+Math.floor((i-1)/6)*44" r="12" class="w8-zero" /><rect v-else :x="137+(i-1)%6*68" :y="138+Math.floor((i-1)/6)*44" width="24" height="24" class="w8-one" /></g>
      <text x="320" y="260" text-anchor="middle" class="w8-big">прогноз: класс 0</text>
    </template>
  </template>
  <template v-else>
    <rect x="172" y="14" width="296" height="76" rx="7" class="w8-node" />
    <text x="320" y="47" text-anchor="middle" class="w8-big">{{sizes?n+' объектов':condition}}</text>
    <text x="320" y="76" text-anchor="middle" class="w8-label">{{sizes?'текущий узел':'условие разбиения'}}</text>
    <g :opacity="blocked?.6:1">
      <path d="M320 90 L160 172 M320 90 L480 172" class="w8-link" />
      <text x="194" y="129" class="w8-label">{{sizes?'':'да'}}</text><text x="429" y="129" class="w8-label">{{sizes?'':'нет'}}</text>
      <rect x="13" y="174" width="294" height="147" rx="7" fill="#f0f7f5" stroke="#17845f" stroke-width="2" />
      <rect x="333" y="174" width="294" height="147" rx="7" fill="#fcf4ee" stroke="#d97022" stroke-width="2" />
      <template v-if="regression">
        <text x="160" y="216" text-anchor="middle" class="w8-big">{{leftValue}}</text><text x="480" y="216" text-anchor="middle" class="w8-big">{{rightValue}}</text>
        <text x="160" y="257" text-anchor="middle" class="w8-label">{{leftDetail}}</text><text x="480" y="257" text-anchor="middle" class="w8-label">{{rightDetail}}</text>
        <text x="160" y="298" text-anchor="middle" class="w8-label">{{left}} объекта</text><text x="480" y="298" text-anchor="middle" class="w8-label">{{right}} объекта</text>
      </template>
      <template v-else-if="sizes">
        <text x="160" y="220" text-anchor="middle" class="w8-big">nL = {{left}}</text><text x="480" y="220" text-anchor="middle" class="w8-big">nR = {{right}}</text>
        <circle v-for="i in left" :key="'l'+i" :cx="62+(i-1)%6*38" :cy="264+Math.floor((i-1)/6)*30" r="9" fill="#526277" />
        <circle v-for="i in right" :key="'r'+i" :cx="382+(i-1)%6*38" :cy="264+Math.floor((i-1)/6)*30" r="9" fill="#526277" />
      </template>
      <template v-else>
        <text x="160" y="211" text-anchor="middle" class="w8-label">{{leftZero}} {{plural(leftZero,'ноль','нуля','нулей')}} · {{leftOne}} {{plural(leftOne,'единица','единицы','единиц')}}</text><text x="480" y="211" text-anchor="middle" class="w8-label">{{rightZero}} {{plural(rightZero,'ноль','нуля','нулей')}} · {{rightOne}} {{plural(rightOne,'единица','единицы','единиц')}}</text>
        <g v-for="side in [0,1]" :key="side"><g v-for="i in (side?rightZero+rightOne:leftZero+leftOne)" :key="i">
          <circle v-if="i<=(side?rightZero:leftZero)" :cx="49+side*320+(i-1)%6*44" :cy="251+Math.floor((i-1)/6)*42" r="11" class="w8-zero" />
          <rect v-else :x="38+side*320+(i-1)%6*44" :y="240+Math.floor((i-1)/6)*42" width="22" height="22" class="w8-one" />
        </g></g>
      </template>
    </g>
    <path v-if="blocked" d="M275 112 L365 158 M365 112 L275 158" stroke="#bd4d36" stroke-width="5" />
  </template>
  <text v-if="caption" x="320" y="360" text-anchor="middle" class="w8-label">{{caption}}</text>
</svg>
</template>
