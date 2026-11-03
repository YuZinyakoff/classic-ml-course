<script setup>
import '../week08.css'
defineProps({strategy:{type:String,default:'impute'},step:{type:Number,default:1}})
</script>
<template>
<svg class="w8-visual" viewBox="0 0 1100 365" role="img" :aria-label="strategy==='impute'?'Импутация: медиана train 29, затем порог age не больше 30 и левая ветвь':'На train сравниваются два направления NaN, сохраняется правая ветвь; новая точка использует это правило'">
  <rect x="25" y="10" width="1050" height="62" rx="7" fill="#edf3fc" />
  <text x="550" y="49" text-anchor="middle" class="w8-big">{{strategy==='impute'?'Обучение: сохраняем медиану возраста на train — 29':step?'Обучение: выбрано и сохранено направление NaN → направо':'Обучение: сравниваем NaN налево и NaN направо по критерию'}}</text>
  <rect x="25" y="124" width="200" height="79" rx="7" class="w8-node" /><text x="125" y="155" text-anchor="middle" class="w8-label">Новый объект</text><text x="125" y="188" text-anchor="middle" class="w8-big">age = NaN</text>
  <path d="M225 164 H305" class="w8-link" /><path d="M294 156 L306 164 L294 172" stroke="#8ca1bc" fill="none" stroke-width="3" />
  <rect x="310" y="124" width="226" height="79" rx="7" class="w8-node" /><text x="423" y="155" text-anchor="middle" class="w8-label">{{strategy==='impute'?'Подставляем 29':'Правило узла'}}</text><text x="423" y="188" text-anchor="middle" class="w8-big">{{strategy==='impute'?'age = 29':step?'NaN → направо':'Выбор на train'}}</text>
  <path d="M536 164 H636" class="w8-link" /><path d="M625 156 L637 164 L625 172" stroke="#8ca1bc" fill="none" stroke-width="3" />
  <rect x="641" y="124" width="244" height="79" rx="7" class="w8-node" /><text x="763" y="172" text-anchor="middle" class="w8-big">age ≤ 30?</text>
  <path d="M763 203 L620 289" :class="['w8-link',{'w8-active':strategy==='impute'&&step}]" /><path d="M763 203 L945 289" :class="['w8-link',{'w8-active':strategy==='native'&&step}]" />
  <text x="592" y="243" class="w8-label">{{strategy==='impute'?'29 ≤ 30: да':'да'}}</text><text x="901" y="243" class="w8-label">{{strategy==='native'?'NaN':'нет'}}</text>
  <rect x="475" y="290" width="290" height="61" rx="7" :fill="strategy==='impute'?'#edf3fc':'white'" stroke="#8ca1bc" /><text x="620" y="329" text-anchor="middle" class="w8-big">Левая ветвь</text>
  <rect x="800" y="290" width="290" height="61" rx="7" :fill="strategy==='native'?'#edf3fc':'white'" stroke="#8ca1bc" /><text x="945" y="329" text-anchor="middle" class="w8-big">Правая ветвь</text>
</svg>
</template>
