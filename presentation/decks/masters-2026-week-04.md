---
theme: default
title: Регуляризация, кросс-валидация и выбор модели
author: НИУ ВШЭ
info: |
  Магистратура · Неделя 4. Регуляризация, кросс-валидация и выбор модели.
colorSchema: light
highlighter: shiki
lineNumbers: false
aspectRatio: 16/9
canvasWidth: 1280
routerMode: hash
remoteAssets: false
wakeLock: false
favicon: /assets/favicon.svg
fonts:
  provider: none
  sans: Segoe UI, Arial, sans-serif
  mono: Cascadia Code, Consolas, monospace
defaults:
  layout: default
  transition: fade
  class: masters-week04 text-[24px] relative
exportFilename: masters-2026-week-04
download: false
duration: 90min
---

<!-- M04-S01 -->

<SectionChrome section="От модели — к проверяемому эксперименту" />
# Регуляризация, кросс-валидация<br>и выбор модели

<div class="section-kicker mt-5">Классическое машинное обучение · Магистратура · Неделя 4</div>
<div class="lead mt-10">Как ограничить подгонку и выбрать модель,<br>которая работает на новых объектах?</div>
<div class="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6 mt-12 text-center text-[29px]">
<div class="plain-label py-7">Регуляризация</div><span>→</span><div class="plain-label py-7">Сравнение по CV</div><span>→</span><div class="plain-label py-7">Выбор модели</div>
</div>
<div class="micro mt-9">Логистическая регрессия и kNN · многоклассовая задача</div>



---
clicks: 1
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S02 -->

<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>


<SectionChrome section="Зачем нужна регуляризация" />
# Меньше ошибка на train — лучше новые прогнозы?

<div class="w6-body">
<WeekSixPlot name="generalization" :step="$clicks" :height="360" alt="При росте гибкости train-ошибка падает, а ошибка на новых объектах может вырасти" />
<div class="w6-question">Если ошибка на обучении уменьшилась, обязательно ли она уменьшилась на новых наблюдениях?</div>
<div class="w6-note">Схематические кривые: показывают возможное поведение ошибок при росте гибкости. Их конкретная форма зависит от данных и модели.</div>
</div>



---
clicks: 1
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S03 -->

<script setup>
import WeekSixTable from './components/WeekSixTable.vue'
</script>


<SectionChrome section="Зачем нужна регуляризация" />
# Связанные признаки: две модели стоимости квартир

<div class="w6-body">
<div class="w6-note">Общая площадь — <MathBlock formula="x_1" :display="false" class="inline-block" />, жилая — <MathBlock formula="x_2" :display="false" class="inline-block" />. Прогноз — в условных единицах; свободного члена нет.</div>
<MathBlock formula="f_A(x)=3x_1-3x_2,\qquad f_B(x)=x_1" class="w6-formula text-[39px]" />
<WeekSixTable mode="apartments" :step="$clicks" />
<div class="w6-result" v-click="1">При <MathBlock formula="x_2=\frac23x_1" :display="false" class="inline-block" /> обе модели дают один и тот же прогноз.</div>
</div>



---
clicks: 1
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S04 -->

<script setup>
import WeekSixTable from './components/WeekSixTable.vue'
</script>


<SectionChrome section="Зачем нужна регуляризация" />
# Новое соотношение площадей — разные прогнозы

<div class="w6-body">
<MathBlock formula="f_A(x)=3x_1-3x_2,\qquad f_B(x)=x_1" class="w6-formula text-[36px]" />
<WeekSixTable mode="new-apartment" :step="$clicks" />
<div class="w6-equal" v-click="1"><MathBlock formula="f_A(60,50)=180-150=30" class="w6-formula text-[30px]" /><MathBlock formula="f_B(60,50)=60" class="w6-formula text-[30px]" /></div>
<div class="w6-result" v-click="1">Общая площадь осталась 60 м², жилая выросла с 40 до 50 м². Прогноз A снизился с 60 до 30, прогноз B остался 60.</div>
</div>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S05 -->

<SectionChrome section="Зачем нужна регуляризация" />
# Регуляризация: ограничиваем выбор решения

<div class="w6-body w6-definition">
<div class="w6-definition-text"><strong>Регуляризация</strong> — управление обучением с помощью ограничений на сложность модели или штрафов в целевой функции.</div>
<div class="w6-equal"><div><div class="w6-header">Контроль переобучения</div><div class="w6-question">Сдерживать подстройку к случайным особенностям обучающих данных.</div></div><div><div class="w6-header">Устойчивость решения</div><div class="w6-question">Сдерживать большие компенсирующие коэффициенты и их реакцию на изменение данных.</div></div></div>
<div class="w6-result">В линейных моделях будем ограничивать величину коэффициентов при сопоставимых масштабах признаков.</div>
<div class="w6-note">Слишком сильное ограничение может ухудшить прогнозы. Его пользу проверяем по отложенным данным.</div>
</div>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S06 -->

<SectionChrome section="Ridge" />
# Исходная задача — метод наименьших квадратов

<div class="w6-body">
<MathBlock formula="f_{\beta_0,\beta}(x)=\beta_0+x^\top\beta" class="w6-formula text-[42px]" /><div class="w6-note"><MathBlock formula="\beta_0" :display="false" class="inline-block" /> — свободный член; <MathBlock formula="\beta=(\beta_1,\ldots,\beta_p)^\top" :display="false" class="inline-block" /> — коэффициенты при признаках.</div><MathBlock formula="R_n(\beta_0,\beta)=\frac1n\sum_{i=1}^n(y_i-\beta_0-x_i^\top\beta)^2" class="w6-formula text-[36px]" /><MathBlock formula="(\hat\beta_0,\hat\beta)\in\arg\min_{\beta_0,\beta}R_n(\beta_0,\beta)" class="w6-formula text-[36px]" /><div class="w6-note">МНК выбирает минимальную MSE; Rₙ — эмпирический риск.</div>
</div>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S07 -->

<script setup>
import WeekSixTable from './components/WeekSixTable.vue'
</script>


<SectionChrome section="Ridge" />
# При одинаковых столбцах МНК видит только сумму

<div class="w6-body">
<MathBlock formula="x_2=x_1,\quad\beta_0=0\quad\Rightarrow\quad f(x)=(\beta_1+\beta_2)x_1" class="w6-formula text-[34px]" />
<WeekSixTable mode="coefficients" :step="3" />
<div class="w6-question">Если сумма коэффициентов равна 1, прогнозы и MSE одинаковы на всех таких обучающих объектах.</div>
<div class="w6-result">Если один набор оптимален по МНК, то оптимальны и все наборы с той же суммой. Коэффициенты определяются неоднозначно.</div>
</div>



---
clicks: 1
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S08 -->

<script setup>
import WeekSixTable from './components/WeekSixTable.vue'
</script>


<SectionChrome section="Ridge" />
# Добавим требование к величине коэффициентов

<div class="w6-body">
<WeekSixTable mode="norm" :step="$clicks" />
<div class="w6-question">Одинаковая подгонка допускает и большие компенсирующие коэффициенты, и более умеренные.</div>
<div class="w6-result" v-click="1">Идея Ridge: учитывать величину всего вектора коэффициентов при выборе решения.</div>
</div>



---
clicks: 2
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S09 -->

<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>


<SectionChrome section="Ridge" />
# L2-норма — длина вектора коэффициентов

<div class="w6-body">
<div class="w6-split"><WeekSixPlot name="norm" :step="$clicks" :height="415" alt="Точка коэффициентов, её длина и диск допустимых значений" /><div class="w6-stack">
<MathBlock formula="\|\beta\|_2=\sqrt{\sum_{j=1}^{p}\beta_j^2}" class="w6-formula text-[36px]" />
<MathBlock formula="\|\beta\|_2^2=\sum_{j=1}^{p}\beta_j^2" class="w6-formula text-[36px]" />
<div v-click="2"><MathBlock formula="\|\beta\|_2^2\le t" class="w6-formula text-[36px]" /><div class="w6-note">В двух координатах — диск радиуса <MathBlock formula="\sqrt t" :display="false" class="inline-block" />.</div></div>
</div></div>
</div>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S10 -->

<SectionChrome section="Ridge" />
# Ridge: минимизируем MSE в допустимой области

<div class="w6-body">
<MathBlock formula="\min_{\beta_0,\beta}R_n(\beta_0,\beta)" class="w6-formula text-[42px]" /><MathBlock formula="\text{при }\|\beta\|_2^2\le t,\qquad t\ge0" class="w6-formula text-[40px]" /><div class="w6-question">Меньшее t оставляет более узкую область допустимых коэффициентов. Ищем лучшую подгонку внутри неё.</div><div class="w6-equal"><div class="w6-note"><MathBlock formula="t=1:\quad(3,-2)" :display="false" class="inline-block" /> недопустимы: квадрат нормы 13.</div><div class="w6-note"><MathBlock formula="(1,0),\ (0.5,0.5)" :display="false" class="inline-block" /> допустимы: квадрат нормы 1 и 0,5.</div></div><div class="w6-result">Если решение МНК лежит внутри области, ограничение сохраняет его.</div>
</div>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S11 -->

<SectionChrome section="Ridge" />
# Та же идея через штраф: цена больших коэффициентов

<div class="w6-body">
<MathBlock formula="J_\lambda^{\mathrm{Ridge}}(\beta_0,\beta)=R_n(\beta_0,\beta)+\lambda\|\beta\|_2^2" class="w6-formula text-[37px]" /><div class="w6-equal"><div><div class="w6-question">Первое слагаемое — ошибка подгонки.</div></div><div><div class="w6-question">Второе — цена величины коэффициентов.</div></div></div><MathBlock formula="\lambda\ge0,\qquad \lambda=0\ \Rightarrow\ \text{МНК}" class="w6-formula text-[35px]" /><div class="w6-question">При большем λ уменьшение нормы получает больший вес относительно уменьшения MSE.</div><div class="w6-note">Регуляризация добавляет ограничение или штраф к критерию обучения. Свободный член β₀ не штрафуем; при согласованных t и λ две задачи имеют общее решение.</div>
</div>



---
clicks: 2
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S12 -->

<script setup>
import WeekSixTable from './components/WeekSixTable.vue'
</script>


<SectionChrome section="Ridge" />
# При равной MSE штраф различает решения

<div class="w6-body">
<MathBlock formula="R_n=2,\qquad\lambda=0.2,\qquad J_\lambda=R_n+\lambda\|\beta\|_2^2" class="w6-formula text-[34px]" />
<WeekSixTable mode="penalty" :step="$clicks" />
<div class="w6-result" v-click="2">Из трёх кандидатов меньший критерий у (0,5; 0,5).</div>
<div class="w6-note">Во всей задаче Ridge сопоставляет оба слагаемых: возможен обмен небольшой прибавки MSE на существенное уменьшение нормы.</div>
</div>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S13 -->

<SectionChrome section="Ridge" />
# Ridge уменьшает разброс оценённых коэффициентов

<div class="w6-body">
<div class="w6-split"><img class="w6-image" src="/assets/week-06/stability-00.svg" alt="Распределения двух коэффициентов по 100 независимым обучающим выборкам: МНК и Ridge" /><div class="w6-stack">
<div class="w6-note">Один прямоугольник — центральные 50% из 100 оценок соответствующего коэффициента; линия внутри — медиана.</div>
<div class="w6-question">У МНК большие положительные и отрицательные вклады компенсируют друг друга.</div>
<div class="w6-result">При выбранном штрафе Ridge оценки заметно менее изменчивы.</div>
<div class="w6-note">Качество на новых объектах проверяем отдельной валидацией.</div></div></div>
</div>



---
clicks: 2
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S14 -->

<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>


<SectionChrome section="Ridge" />
# Траектории Ridge: одна выборка, разные λ

<div class="w6-body">
<div class="w6-split"><div><WeekSixPlot name="ridge-path" :step="$clicks" :height="425" alt="Каждая линия — отдельный коэффициент Ridge в зависимости от силы штрафа" /><div class="w6-note">Признаки 1–2 сильно коррелируют; 3 и 5 информативны; 4 и 6 — шумовые.</div></div><div class="w6-stack">
<div class="w6-question">Для каждого λ обучаем отдельную модель на тех же данных.</div>
<div class="w6-note">130 объектов; 6 стандартизированных признаков. Каждая линия — один <MathBlock formula="\hat\beta_j(\lambda)" :display="false" class="inline-block" />.</div>
<div class="w6-result" v-click="1">Общий квадрат нормы не растёт. Отдельные коэффициенты могут перераспределять вклад.</div>
<div class="w6-question" v-click="2">При сильном штрафе наклоны стремятся к нулю, а прогнозы — к среднему y.</div>
</div></div>
</div>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S15 -->

<SectionChrome section="Ridge" />
# Одни прогнозы — разные единицы и штрафы

<div class="w6-body">
<div class="w6-equal"><div class="w6-stack"><div class="w6-header">Площадь в м²</div><MathBlock formula="x=60,\quad\beta=20" class="w6-formula text-[36px]" /><MathBlock formula="\beta x=1200" class="w6-formula text-[36px]" /><MathBlock formula="\beta^2=400" class="w6-formula text-[36px]" /></div><div class="w6-stack"><div class="w6-header">Та же площадь в см²</div><MathBlock formula="x'=600\,000,\quad\beta'=0.002" class="w6-formula text-[33px]" /><MathBlock formula="\beta'x'=1200" class="w6-formula text-[36px]" /><MathBlock formula="(\beta')^2=0.000004" class="w6-formula text-[36px]" /></div></div>
<div class="w6-result">Прогноз сохранился, цена этого коэффициента в L2-штрафе изменилась в 10⁸ раз.</div>
<div class="w6-equal"><MathBlock formula="x_{ij}^{\mathrm{std}}=\frac{x_{ij}-\bar x_j}{s_j}" class="w6-formula text-[36px]" /><div class="w6-note">Перед регуляризацией приводим признаки к сопоставимому масштабу. Средние и s считаем по обучающим данным.</div></div>
</div>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S16 -->

<SectionChrome section="Lasso и геометрия" />
# От Ridge к Lasso: ограничим сумму модулей

<div class="w6-body">
<MathBlock formula="\text{Ridge: }\|\beta\|_2^2=\sum_j\beta_j^2" class="w6-formula text-[36px]" /><MathBlock formula="\text{Lasso: }\|\beta\|_1=\sum_j|\beta_j|,\qquad\|(3,-2)\|_1=5" class="w6-formula text-[36px]" /><div class="w6-equal"><div class="w6-stack"><div class="w6-header">Ограниченная задача</div><MathBlock formula="\min_{\beta_0,\beta}R_n\quad\text{при }\|\beta\|_1\le t" class="w6-formula text-[32px]" /></div><div class="w6-stack"><div class="w6-header">Штрафная задача</div><MathBlock formula="J_\lambda^{\mathrm{Lasso}}=R_n+\lambda\|\beta\|_1" class="w6-formula text-[32px]" /></div></div><div class="w6-question">Lasso сдерживает величину коэффициентов с помощью L1. Формула линейного прогноза остаётся прежней; свободный член не штрафуется.</div>
</div>



---
clicks: 1
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S17 -->

<SectionChrome section="Lasso и геометрия" />
# L1 может давать разреженное решение

<div class="w6-body">
<div class="w6-question">L1-штраф имеет изломы при нулевых коэффициентах. Минимум может оказаться в одной из таких точек — механизм увидим на геометрии.</div><MathBlock formula="f(x)=\beta_0+\beta_1x_1+\beta_2x_2+\beta_3x_3" class="w6-formula text-[40px]" /><div v-click="1"><MathBlock formula="\hat\beta_2=0\quad\Rightarrow\quad\hat f(x)=\hat\beta_0+\hat\beta_1x_1+\hat\beta_3x_3" class="w6-formula text-[34px]" /></div><div class="w6-result" v-click="1">Нулевой коэффициент исключает признак из правила прогноза. Если многие коэффициенты равны нулю, решение называют разреженным.</div>
</div>



---
clicks: 1
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S18 -->

<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>


<SectionChrome section="Lasso и геометрия" />
# Плоскость коэффициентов и линии уровня

<div class="w6-body">
<div class="w6-split"><WeekSixPlot name="levels" :step="$clicks" :height="420" alt="levels: последовательное состояние визуального объяснения" /><div class="w6-stack"><div class="w6-question">Каждая точка <MathBlock formula="(\beta_1,\beta_2)" :display="false" class="inline-block" /> — одна модель.</div><div class="w6-question" v-click="1">На одной линии уровня — одинаковая MSE.</div><div class="w6-note" v-click="1">Если решение МНК единственно, линии уровня MSE в пространстве двух коэффициентов образуют вложенные эллипсы. В центре — минимум МНК.</div></div></div>
</div>



---
clicks: 1
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S19 -->

<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>


<SectionChrome section="Lasso и геометрия" />
# Круг L2 и ромб L1

<div class="w6-body">
<WeekSixPlot name="regions" :step="$clicks" :height="370" alt="regions: последовательное состояние визуального объяснения" /><div class="w6-equal"><MathBlock formula="\beta_1^2+\beta_2^2\le t" class="w6-formula " /><MathBlock formula="|\beta_1|+|\beta_2|\le t" class="w6-formula " v-click="1" /></div><div class="w6-note">Области допустимых коэффициентов; на рисунке t = 1.</div>
</div>



---
clicks: 4
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S20 -->

<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>


<SectionChrome section="Lasso и геометрия" />
# Как ограничение сдвигает минимум

<div class="w6-body">
<WeekSixPlot name="contact" :step="$clicks" :height="385" alt="contact: последовательное состояние визуального объяснения" /><div class="w6-question text-center">{{ ['Свободный минимум вне допустимой области.','Ограничили параметры кругом.','Первое касание — решение Ridge.','Добавили L1-область: какая координата станет нулём?','Касание вершины: второй коэффициент равен нулю.'][$clicks] }}</div><div class="w6-note">Расширяем линии уровня от центра до первого касания. Для Lasso касание вершины возможно, но не обязательно.</div>
</div>



---
clicks: 2
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S21 -->

<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>


<SectionChrome section="Lasso и геометрия" />
# Траектории Lasso: координаты доходят до нуля

<div class="w6-body">
<div class="w6-split"><div><WeekSixPlot name="lasso-path" :step="$clicks" :height="425" alt="Коэффициенты Lasso на 130 объектах с шестью стандартизированными признаками: некоторые точно зануляются" /><div class="w6-note">Признаки 1–2 сильно коррелируют; 3 и 5 информативны; 4 и 6 — шумовые.</div></div><div class="w6-stack">
<div class="w6-question">Эксперимент: 130 объектов, 6 стандартизированных признаков.</div>
<div class="w6-question">Ненулевых коэффициентов: <b>{{ [6,4,0][$clicks] }}</b></div>
<div class="w6-result" v-click="1">Lasso подбирает коэффициенты совместно: снижение ошибки сопоставляется с L1-штрафом.</div>
<div class="w6-note" v-click="2">При сильном штрафе все наклоны нулевые — остаётся постоянный прогноз.</div></div></div>
</div>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S22 -->

<SectionChrome section="Elastic Net и классификация" />
# Elastic Net сочетает L1 и L2

<div class="w6-body">
<MathBlock formula="J_{\lambda,\rho}=R_n+\lambda\left[\rho\|\beta\|_1+(1-\rho)\|\beta\|_2^2\right]" class="w6-formula text-[38px]" /><MathBlock formula="\lambda\ge0,\qquad0\le\rho\le1" class="w6-formula text-[36px]" /><div class="w6-equal"><div><MathBlock formula="\rho=1:\ \text{Lasso}" class="w6-formula text-[35px]" /></div><div><MathBlock formula="\rho=0:\ \text{Ridge с весом }\lambda" class="w6-formula text-[35px]" /></div></div><div class="w6-question">L1 сохраняет возможность отбора признаков; L2 помогает распределять вклад между связанными признаками.</div><div class="w6-note">λ задаёт общую силу регуляризации, ρ — соотношение двух штрафов.</div>
</div>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S23 -->

<SectionChrome section="Elastic Net и классификация" />
# К log loss тоже можно добавить штраф

<div class="w6-body">
<MathBlock formula="p_{\beta_0,\beta}(x)=\sigma(\beta_0+x^\top\beta)" class="w6-formula text-[42px]" /><MathBlock formula="R_n^{\mathrm{log}}=\frac1n\sum_i L(y_i,p_i)" class="w6-formula text-[36px]" /><MathBlock formula="J_\lambda^{\mathrm{log}}=R_n^{\mathrm{log}}+\lambda\|\beta\|_2^2" class="w6-formula text-[40px]" /><div class="w6-question">L1 или L2 ограничивают коэффициенты логистической регрессии. Это может стабилизировать решение и сдерживать подгонку к шуму.</div><div class="w6-result">В sklearn меньше C — сильнее регуляризация. Свободный член не штрафуем; численное соответствие C и λ зависит от нормировки.</div>
</div>



---
clicks: 1
class: masters-week04 text-[24px] relative
---

<!-- M04-S24 -->

<WeekSevenFrame section="Регуляризация: итоги" title="Что меняет регуляризация">
<ul class="w7-list"><li>Ridge сдерживает L2-норму; Lasso может занулять коэффициенты; Elastic Net сочетает L1 и L2.</li><li>Масштаб признаков влияет на штраф. Свободный член не штрафуем.</li><li>Сила ограничения — настройка модели. Меньшая train-ошибка не гарантирует лучший прогноз.</li></ul>
<div v-click="1" class="w7-question w7-line">Как выбрать силу штрафа и проверить, помогает ли он новым прогнозам?</div>
</WeekSevenFrame>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S25 -->

<SectionChrome section="Кросс-валидация" />
# Вспомним train/test: обучение и независимая проверка

<div class="w6-body">
<div class="w6-question">Разделяем данные до обучения, чтобы проверить прогнозы на объектах, которые модель ещё не видела.</div>
<div class="w6-recall-strip" aria-label="Обучающая и отдельная тестовая части данных"><div>Train</div><div>Test</div></div>
<div class="w6-split-recall"><div><div class="w6-header">Train — обучение</div><div class="w6-question">По этим объектам находим параметры модели.</div></div><div><div class="w6-header">Test — финальная проверка</div><div class="w6-question">Сравниваем прогнозы готовой модели с фактическими ответами.</div></div></div>
<div class="w6-note">Для сравнения вариантов внутри разработки используем train/validation. Финальный test оставляем отдельно от выбора.</div>
<div class="w6-question">Может ли оценка на отложенных объектах измениться, если по-другому разделить те же данные?</div>
</div>



---
clicks: 2
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S26 -->

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
</script>


<SectionChrome section="Кросс-валидация" />
# Одно разбиение: обучаем и оцениваем

<div class="w6-body">
<div class="w6-note">30 объектов из синтетической выборки. Фиксированная процедура: стандартизация по train → Ridge с λ = 1 → MSE на validation.</div>
<WeekSixFolds mode="holdout" :split="0" :step="$clicks" />
<div class="w6-question">Что изменится, если выбрать другие train/validation-объекты?</div>
</div>



---
clicks: 2
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S27 -->

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
</script>


<SectionChrome section="Кросс-валидация" />
# Изменили состав частей — обучаем новую модель

<div class="w6-body">
<div class="w6-note">Те же 30 объектов, та же процедура и λ = 1. Изменилось только разбиение; часть объектов поменяла роль.</div>
<WeekSixFolds mode="holdout" :split="1" :step="$clicks" />
<div class="w6-result" v-click="2">Оценка зависит и от обучающих объектов, и от состава отложенной части.</div>
</div>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S28 -->

<SectionChrome section="Кросс-валидация" />
# Кросс-валидация повторяет обучение и проверку

<div class="w6-body">
<div class="w6-question">Кросс-валидация (CV) оценивает процедуру обучения на нескольких разбиениях данных.</div><div class="w6-flow"><div>Текущие train<br>и validation</div><i>→</i><div>Заново обучаем<br>на train</div><i>→</i><div>Оцениваем<br>на validation</div></div><div class="w6-result">Повторяем цикл на других разбиениях и объединяем полученные оценки.</div><div class="w6-question">Пока фиксируем модель, настройки, преобразования и метрику. Каждый проход даёт отдельную обученную модель.</div>
</div>



---
clicks: 2
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S29 -->

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
</script>


<SectionChrome section="Кросс-валидация" />
# K-fold: от исходных данных к фолдам внутри dev

<div class="w6-body">
<WeekSixFolds mode="assemble" :step="$clicks" />
<div class="w6-note">Из 100 объектов 20 отложены для финального test, остальные 80 — для разработки и CV. При K = 5 каждый dev-объект проверяем ровно один раз.</div>
</div>



---
clicks: 3
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S30 -->

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
</script>


<SectionChrome section="Кросс-валидация" />
# Другой validation-фолд — другая обученная модель

<div class="w6-body">
<WeekSixFolds mode="cycle" :step="$clicks" />
<div class="w6-question">Когда F₂ становится validation, F₁ возвращается в train. Обучающая часть меняется — коэффициенты находим заново.</div>
</div>



---
clicks: 5
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S31 -->

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
</script>


<SectionChrome section="Кросс-валидация" />
# Пять моделей, пять ошибок, одно среднее

<div class="w6-body">
<WeekSixFolds mode="all" :step="$clicks" />
</div>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S32 -->

<SectionChrome section="Кросс-валидация" />
# CV-оценка относится к процедуре обучения

<div class="w6-body">
<div class="w6-equal"><div class="w6-stack"><div class="w6-header">Пять проходов CV</div><div class="w6-question">Каждая модель: 64 train → 16 validation.</div><MathBlock formula="\mathrm{CV\text{-}MSE}=4.6" class="w6-formula text-[38px]" /><div class="w6-note">Средняя отложенная ошибка пяти моделей при этих разбиениях.</div></div><div class="w6-stack"><div class="w6-header">Одна итоговая модель</div><div class="w6-question">Заново обучим на всех 80 dev-объектах.</div><div class="w6-note">Её параметры и размер обучения отличаются от CV-моделей. Для проверки выбранного решения сохранён test.</div></div></div><div class="w6-result">Мы оценили работу заданного способа обучения на 64 объектах, а не одну окончательную модель на 80.</div><div class="w6-note">Обучающие части пересекаются; пять ошибок не являются независимыми экспериментами.</div>
</div>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S33 -->

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
</script>


<SectionChrome section="Кросс-валидация" />
# K-fold и ShuffleSplit: как меняется состав проверки

<div class="w6-body m04-schemes">
<WeekSixFolds mode="schemes" :pair="0" />
<div class="w6-note">96 объектов; на каждом из четырёх проходов 24 объекта используются для валидации.</div>
</div>

<style>
.w6-body.m04-schemes { gap:12px; }
.m04-schemes :deep(.class-caption) { display:none; }
.m04-schemes :deep(.scheme-legend) { margin-bottom:18px; }
.m04-schemes :deep(.group-strip) { margin-top:8px; }
</style>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S34 -->

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
</script>


<SectionChrome section="Кросс-валидация" />
# Стратификация и группы отвечают разным задачам

<div class="w6-body m04-schemes">
<WeekSixFolds mode="schemes" :pair="1" />
<div class="w6-note">Если объектов класса меньше числа фолдов, стратификация не обеспечит его присутствие в каждом validation-фолде. Для временных данных учитываем порядок наблюдений.</div>
</div>

<style>
.w6-body.m04-schemes { gap:12px; }
.m04-schemes :deep(.class-caption) { display:none; }
.m04-schemes :deep(.scheme-legend) { margin-bottom:18px; }
.m04-schemes :deep(.group-strip) { margin-top:8px; }
</style>



---
clicks: 1
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S35 -->

<SectionChrome section="Выбор гиперпараметров" />
# Параметры и гиперпараметры

<div class="w6-body">
<div class="w6-equal"><div class="w6-stack"><MathBlock formula="\hat\beta_0,\ \hat\beta" class="w6-formula text-[50px]" /><div class="w6-question">Параметры</div><div class="w6-note">Находятся по данным внутри конкретного обучения.</div></div><div class="w6-stack" v-click="1"><MathBlock formula="\lambda,\ C,\ k" class="w6-formula text-[50px]" /><div class="w6-question">Гиперпараметры</div><div class="w6-note">Задаются до обучения; сравниваем процедуры с разными настройками.</div></div></div>
</div>



---
clicks: 1
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S36 -->

<script setup>
import WeekSixTable from './components/WeekSixTable.vue'
</script>


<SectionChrome section="Выбор гиперпараметров" />
# Почему минимальная train-MSE не выбирает полезный штраф

<div class="w6-body">
<div class="w6-equal"><div class="w6-stack">
<div class="w6-question">МНК уже минимизирует MSE на данной обучающей выборке.</div>
<MathBlock formula="\min_{\beta_0,\beta}R_n\le R_n(\hat\beta_{0,\lambda},\hat\beta_\lambda)" class="w6-formula text-[32px]" />
<div class="w6-question">Выбор по train-MSE предпочитает отсутствие регуляризации.</div>
<div class="w6-result" v-click="1">Для новых прогнозов сравниваем ошибку на отложенных объектах.</div>
</div><div class="w6-stack"><div class="w6-header">Учебный пример одной validation-части</div><WeekSixTable mode="holdout-selection" :step="$clicks" /></div></div>
</div>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S37 -->

<SectionChrome section="Выбор гиперпараметров" />
# CV-подбор Ridge: один набор данных и общие фолды

<div class="w6-body">
<div class="w6-question">Рассмотрим новый эксперимент: 150 объектов для разработки, 60 взаимосвязанных признаков и зашумлённая целевая переменная.</div><MathBlock formula="\Lambda=\{0.0001,\ 0.001,\ 0.01,\ 0.1,\ 1,\ 10,\ 100\}" class="w6-formula text-[37px]" /><div class="w6-five-parts"><div v-for="j in 5" :key="j"><MathBlock :formula="'F_'+j" class="w6-formula text-[32px]" /><span>30 объектов</span></div></div><div class="w6-question">Для каждого λ: пять новых моделей, 120 train / 30 validation на проходе. Для всех кандидатов используем одни и те же фолды.</div><div class="w6-note">Средние и стандартные отклонения признаков оцениваем отдельно на train каждого прохода.</div>
</div>



---
clicks: 5
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S38 -->

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
import WeekSixTable from './components/WeekSixTable.vue'
</script>


<SectionChrome section="Выбор гиперпараметров" />
# Первое λ: пять обучений и пять ошибок

<div class="w6-body">
<WeekSixFolds mode="gridwalk" :candidate="0" :step="$clicks" />
<WeekSixTable mode="cv-progress" :candidate="0" :step="$clicks" />
<div class="w6-question" v-if="$clicks<5">В ячейке — MSE новой модели на указанном validation-фолде.</div>
<div v-else><MathBlock formula="\mathrm{CV\text{-}MSE}(\lambda)=\frac{\mathrm{MSE}_1+\cdots+\mathrm{MSE}_5}{5}" class="w6-formula text-[33px]" /><div class="w6-result">Усредняем пять ошибок внутри одной строки.</div></div>
</div>



---
clicks: 5
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S39 -->

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
import WeekSixTable from './components/WeekSixTable.vue'
</script>


<SectionChrome section="Выбор гиперпараметров" />
# Второе λ: повторяем весь CV-цикл

<div class="w6-body">
<WeekSixFolds mode="gridwalk" :candidate="1" :step="$clicks" />
<WeekSixTable mode="cv-progress" :candidate="1" :step="$clicks" />
<div class="w6-question" v-if="$clicks<5">В ячейке — MSE новой модели на указанном validation-фолде.</div>
<div v-else><MathBlock formula="\mathrm{CV\text{-}MSE}(\lambda)=\frac{\mathrm{MSE}_1+\cdots+\mathrm{MSE}_5}{5}" class="w6-formula text-[33px]" /><div class="w6-result">Усредняем пять ошибок внутри одной строки.</div></div>
</div>



---
clicks: 1
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S40 -->

<script setup>
import WeekSixTable from './components/WeekSixTable.vue'
</script>


<SectionChrome section="Выбор гиперпараметров" />
# Полная таблица: сравниваем средние семи кандидатов

<div class="w6-body">
<WeekSixTable mode="cv-complete" :step="$clicks" />
<div class="w6-note">Каждая ячейка — валидационная ошибка. Фолды в столбцах одинаковы для всех λ; среднее в строке — CV-MSE.</div>
<div class="w6-result" v-click="1">Наименьшая средняя ошибка: λ = 1, CV-MSE = 2,339.</div>
</div>



---
clicks: 2
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S41 -->

<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>


<SectionChrome section="Выбор гиперпараметров" />
# Кривая CV — те же средние из таблицы

<div class="w6-body">
<WeekSixPlot name="cv-curve" :step="$clicks" :height="400" alt="cv-curve: последовательное состояние визуального объяснения" /><div class="w6-result" v-click="2">λ = 1 — лучший из семи проверенных кандидатов на этих данных.</div>
</div>



---
clicks: 0
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S42 -->

<SectionChrome section="Выбор гиперпараметров" />
# 35 обучений для выбора — и новое обучение после него

<div class="w6-body">
<div class="w6-equal w6-refit-summary"><div><div class="w6-header">Выбор: 7 значений λ × 5 фолдов</div><div class="w6-large-number">35 обучений</div><div class="w6-question">Сравниваем CV-MSE.<br>Выбираем λ = 1.</div></div><div><div class="w6-header">Окончательное обучение — refit</div><div class="w6-large-number">1 новая модель</div><div class="w6-question">Обучаем стандартизатор и Ridge при <MathBlock formula="\lambda=1" :display="false" class="inline-block" /> на всех 150 dev.</div></div></div>
<div class="w6-note">Пять CV-моделей выбранного λ дали среднюю ошибку 2,339. Их коэффициенты не объединяем: итоговую модель обучаем заново.</div>
</div>



---
clicks: 1
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S43 -->

<SectionChrome section="Выбор гиперпараметров" />
# Стандартизацию обучаем внутри каждого прохода

<div class="w6-body">
<div v-if="$clicks===0" class="w6-stack">
<div class="w6-header text-orange-600">Если стандартизировать заранее по всем dev</div>
<div class="w6-flow"><div>Все 150 dev</div><i>→</i><div>Общие средние и s</div><i>→</i><div>Разбиение CV</div></div>
<div class="w6-question">Будущие validation-объекты уже участвовали в вычислении преобразования.</div></div>
<div v-else class="w6-stack">
<div class="w6-header text-green-700">Порядок для каждого CV-прохода</div>
<ol class="w6-scaler-steps"><li><span>1</span><div>На 120 train оцениваем средние и стандартные отклонения.</div></li><li><span>2</span><div>По этим статистикам преобразуем train и 30 validation.</div></li><li><span>3</span><div>Обучаем Ridge на преобразованном train.</div></li><li><span>4</span><div>Прогнозируем для validation и считаем MSE.</div></li></ol></div>
<div class="w6-note">При refit и статистики стандартизации, и Ridge обучаем на всех dev. Test только преобразуем и используем для итоговой оценки.</div>
</div>



---
clicks: 3
class: masters-week04 week06 text-[23px] relative
---

<!-- M04-S44 -->

<SectionChrome section="Регуляризация и CV: итог" />
# Финальный протокол: dev и test идут разными ветвями

<div class="w6-body">
<div class="w6-protocol">
<div class="w6-source">Исходные<br>данные</div>
<div class="w6-branch-arrows"><span>↗&#xfe0e;</span><span>↘&#xfe0e;</span></div>
<div class="w6-dev-branch"><div class="w6-header">Данные для разработки — dev</div>
<div class="w6-protocol-stages"><div>CV внутри dev<br><span class="w6-note">7 λ × 5 фолдов<br>35 обучений</span></div><span>→</span>
<div v-click="1">Выбираем λ = 1<br><span class="w6-note">Минимум CV-MSE<br>среди кандидатов</span></div></div>
<div v-click="2" class="w6-refit">Refit: модель + стандартизатор на всех dev</div></div>
<div class="w6-test-branch"><div class="w6-header">Отдельный test</div><div class="w6-question">Не участвует в CV и выборе настроек.</div></div>
<div class="w6-final-eval" v-click="3"><div class="w6-question">Готовая модель + test</div><div class="w6-result">Одна независимая<br>итоговая оценка</div></div>
</div>
<div class="w6-note">По CV выбирали λ, поэтому лучшая CV-оценка может быть оптимистичной. Отдельный test проверяет зафиксированное решение.</div>
</div>



---
clicks: 1
class: masters-week04 text-[24px] relative
---

<!-- M04-S45 -->

<WeekSevenFrame section="CV и выбор: итоги" title="CV сравнивает процедуры обучения">
<ul class="w7-list"><li>В каждом проходе заново обучаем всю процедуру на train и проверяем на validation.</li><li>Настройки сравниваем на одинаковых фолдах по средней метрике.</li><li>После выбора — refit на всех dev. Отдельный test проверяет зафиксированное решение.</li></ul>
<div v-click="1" class="w7-result w7-line">Теперь можем сравнивать разные способы строить прогноз: общую формулу и локальное соседство.</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S46 -->

<WeekSevenFrame section="Локальное правило" title="Что у нас уже есть">
<div class="w7-three w7-text"><div class="w7-rail">Линейная модель<br><br>Коэффициенты задают общую зависимость.</div><div class="w7-rail">Логистическая регрессия<br><br>Score превращается в вероятность.</div><div class="w7-rail">Кросс-валидация<br><br>Проверяем качество настройки.</div></div>
<div v-click="1" class="w7-question w7-line">Можно ли делать прогноз, не подбирая одну глобальную формулу?</div>
</WeekSevenFrame>



---
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S47 -->

<WeekSevenFrame section="Локальное правило" title="Линейная граница и сложная геометрия классов">
<div class="w7-row"><WeekSevenPlot name="global" alt="Одна линейная граница не разделяет два переплетённых полумесяца" /><div class="w7-col"><div class="w7-text">В исходных признаках одной прямой недостаточно.</div><div class="w7-note">Преобразования признаков могут изменить ситуацию.</div><div class="w7-question">А если известны метки ближайших наблюдений?</div></div></div>
</WeekSevenFrame>



---
clicks: 2
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S48 -->

<WeekSevenFrame section="Локальное правило" title="Предсказать по одному ближайшему объекту">
<div class="w7-row"><WeekSevenPlot name="nearest" :step="$clicks" alt="Обучающие точки, затем новая точка, затем выделенный ближайший сосед" /><div class="w7-col"><div class="w7-text">Обучающие точки имеют известные классы.</div><div v-click="1" class="w7-question">Какой класс назначить новой точке?</div><div v-click="2" class="w7-result">Ближайший — объект №7, класс A.<br>Прогноз новой точки — A.</div></div></div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S49 -->

<WeekSevenFrame section="Локальное правило" title="Запишем 1NN математически">
<div class="w7-row"><WeekSevenPlot name="nearest" :step="2" :height="325" alt="Номера обучающих объектов и ближайший к новой точке сосед" /><div class="w7-col"><MathBlock formula="i^*(x)\in\arg\min_{i=1,\ldots,n}d(x,x_i)" class="w7-math" /><div class="w7-text">Ищем <strong>индекс</strong> ближайшего объекта.</div><MathBlock v-click="1" formula="\hat y(x)=y_{i^*(x)}" class="w7-large" /></div></div>
<div class="w7-note"><MathBlock formula="x" :display="false" class="w7-inline" /> — новый объект; <MathBlock formula="i" :display="false" class="w7-inline" /> — номер обучающего; <MathBlock formula="d" :display="false" class="w7-inline" /> — расстояние. Для другого объекта ближайший индекс может быть другим.</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S50 -->

<WeekSevenFrame section="Геометрия соседства" title="Цена избыточной локальности">
<div class="w7-row"><WeekSevenPlot name="outlier" :step="$clicks" alt="Добавленная необычная точка создаёт локальный участок своего класса в решении 1NN" /><div class="w7-col"><div class="w7-text">Одна обучающая точка получает собственную область решений.</div><div v-click="1" class="w7-result">Случайная ошибка разметки может изменить прогнозы вокруг неё.</div></div></div>
<div class="w7-question">Идеальная подстройка к train не гарантирует устойчивых новых прогнозов.</div>
</WeekSevenFrame>



---
clicks: 2
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S51 -->

<WeekSevenFrame section="Голосование соседей" title="Не один, а k ближайших">
<div class="w7-row"><WeekSevenPlot name="vote" :step="$clicks" alt="Новая точка и последовательно один, три, пять ближайших наблюдений" /><div class="w7-col"><MathBlock :formula="'k='+[1,3,5][$clicks]" class="w7-large" /><div class="w7-text">Каждый выбранный сосед голосует за свой класс.</div><div class="w7-result">Класс с наибольшим числом голосов становится прогнозом.</div></div></div>
</WeekSevenFrame>



---
clicks: 2
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S52 -->

<WeekSevenFrame section="Голосование соседей" title="Правило голосования">
<MathBlock formula="\mathcal N_k(x)\text{ — индексы }k\text{ ближайших обучающих объектов}" class="w7-math" />
<MathBlock v-click="1" formula="V_c(x)=\sum_{i\in\mathcal N_k(x)}\mathbb I(y_i=c)" class="w7-large" />
<div v-click="1" class="w7-text">Индикатор равен 1 для соседа класса c и 0 для остальных. Сумма — голоса за класс.</div>
<MathBlock v-click="2" formula="\hat y(x)\in\arg\max_{c\in\mathcal Y}V_c(x),\qquad \mathcal Y=\{1,\ldots,K\}" class="w7-math" />
<div v-click="2" class="w7-note">Argmax выбирает класс-победитель. Для ничьей нужно заранее заданное правило.</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S53 -->

<WeekSevenFrame section="Голосование соседей" title="Одно голосование, три класса">
<div class="w7-row"><WeekSevenPlot name="vote" :step="2" :height="365" alt="Пять выбранных соседей: три A, один B и один C" /><div class="w7-col"><table class="w7-table"><thead><tr><th>Сосед</th><th>Расстояние</th><th>Класс</th></tr></thead><tbody><tr><td>1</td><td>0.4</td><td>A</td></tr><tr><td>2</td><td>0.6</td><td>B</td></tr><tr><td>3</td><td>0.7</td><td>A</td></tr><tr><td>4</td><td>0.9</td><td>C</td></tr><tr><td>5</td><td>1.1</td><td>A</td></tr></tbody></table><MathBlock v-click="1" formula="(V_A,V_B,V_C)=(3,1,1)\Rightarrow\hat y=A" class="text-[26px]" /></div></div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S54 -->

<WeekSevenFrame section="Голосование соседей" title="Локальные доли классов">
<MathBlock formula="\hat p_c(x)=\frac1k\sum_{i\in\mathcal N_k(x)}\mathbb I(y_i=c)" class="w7-large" />
<MathBlock v-click="1" formula="(3,1,1)\;\xrightarrow{\div5}\;(\hat p_A,\hat p_B,\hat p_C)=(0.6,0.2,0.2)" class="w7-math" />
<div class="w7-text">0.6 означает: 60% выбранных соседей относятся к A.</div>
<div v-click="1" class="w7-result">Доли классов — оценки условных вероятностей. Их качество проверяется на новых данных.</div>
</WeekSevenFrame>



---
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S55 -->

<WeekSevenFrame section="Обучение и применение" title="Что происходит при fit и predict">
<div class="w7-equal"><div class="w7-col"><div class="w7-header">Логистическая регрессия</div><div class="w7-text"><code>fit</code>: оценить коэффициенты.</div><div class="w7-text"><code>predict</code>: применить общую функцию.</div></div><div class="w7-col"><div class="w7-header">kNN</div><div class="w7-text"><code>fit</code>: сохранить train, подготовить поиск.</div><div class="w7-text"><code>predict</code>: расстояния → соседи → голоса.</div></div></div>
<div class="w7-result w7-line">Обучение по примерам: существенная часть работы приходится на прогноз.</div>
<div class="w7-note">Instance-based / lazy learning. Настройки kNN: число соседей, расстояние и веса.</div>
</WeekSevenFrame>



---
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S56 -->

<WeekSevenFrame section="Расстояния и масштаб" title="Евклидово расстояние">
<div class="w7-row"><WeekSevenPlot name="euclidean" alt="Прямой отрезок между x=(1,2) и z=(4,6), стороны треугольника 3 и 4" /><div class="w7-col"><MathBlock formula="d_2(x,z)=\sqrt{\sum_{j=1}^p(x_j-z_j)^2}" class="w7-math" /><MathBlock formula="d_2=\sqrt{3^2+4^2}=5" class="w7-math" /><div class="w7-text">Привычная длина отрезка между точками.</div></div></div>
</WeekSevenFrame>



---
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S57 -->

<WeekSevenFrame section="Расстояния и масштаб" title="Манхэттенское расстояние">
<div class="w7-row"><WeekSevenPlot name="v2-streets" :height="390" alt="Прямоугольная сетка улиц: из x=(1,2) в z=(4,6) идём три квартала вправо и четыре вверх" /><div class="w7-col"><div class="w7-text">По прямоугольной сетке улиц идём вдоль кварталов, без движения наискосок.</div><MathBlock formula="d_1(x,z)=\sum_{j=1}^p|x_j-z_j|" class="w7-math" /><MathBlock formula="d_1=3+4=7" class="w7-large" /></div></div>
</WeekSevenFrame>



---
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S58 -->

<WeekSevenFrame section="Расстояния и масштаб" title="Семейство расстояний Минковского">
<MathBlock formula="d_q(x,z)=\left(\sum_{j=1}^{p}|x_j-z_j|^q\right)^{1/q},\qquad q\ge1" class="w7-math" />
<div class="w7-row"><WeekSevenPlot name="v2-norms" :height="300" alt="Границы единичных окрестностей: ромб L1, окружность L2 и квадрат L бесконечность" /><div class="w7-col"><div class="w7-text">q = 1: манхэттенское.<br>q = 2: евклидово.<br>q → ∞: расстояние Чебышёва.</div><MathBlock formula="d_\infty(x,z)=\max_j|x_j-z_j|" class="text-[29px]" /><div class="w7-note">Определяется наибольшим различием координат.</div></div></div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S59 -->

<WeekSevenFrame section="Расстояния и масштаб" title="Масштаб меняет ближайшего соседа">
<div class="w7-row" style="grid-template-columns:1fr 1.2fr"><WeekSevenPlot name="v2-scaling" :step="$clicks" alt="После деления второго признака на 10 точки x, A, B переходят в x', A', B'; ближайшей становится A' вместо B" /><div class="w7-col"><MathBlock v-if="$clicks===0" formula="x=(0,0),\ A=(1,8),\ B=(3,0)" class="text-[27px]" /><MathBlock v-else formula="x'=(0,0),\ A'=(1,0.8),\ B'=(3,0)" class="text-[27px]" /><MathBlock v-if="$clicks===0" formula="d(x,A)=\sqrt{65}\approx8.06" class="text-[29px]" /><MathBlock v-else formula="d(x',A')=\sqrt{1.64}\approx1.28" class="text-[29px]" /><MathBlock v-if="$clicks===0" formula="d(x,B)=3" class="w7-math" /><MathBlock v-else formula="d(x',B')=3" class="w7-math" /><div class="w7-result">Ближайший: {{ $clicks===0?'B':"A′" }}.</div></div></div>
<div class="w7-text">Объекты те же. Смена единиц измерения может изменить прогноз kNN.</div>
</WeekSevenFrame>



---
clicks: 2
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S60 -->

<WeekSevenFrame section="Число соседей и размерность" title="Что меняет число k?">
<div class="w7-row"><WeekSevenPlot name="boundaries" :step="$clicks" alt="Одна выборка, граница kNN при k=1, затем 5 и 25" /><div class="w7-col"><div class="w7-text">Малое k: сильнее реакция на отдельные точки.</div><div v-click="1" class="w7-text">Больше k: сглаживаем локальное голосование.</div><div v-click="2" class="w7-result">Слишком большое k может скрыть полезную структуру.</div></div></div>
<div class="w7-note">Управляем локальностью и гибкостью. Качество не обязано меняться монотонно.</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S61 -->

<WeekSevenFrame section="Число соседей и размерность" title="Выбрать k по валидации">
<MathBlock formula="k\in\{1,3,5,7,11,15,21\}" class="w7-large" />
<div class="w7-flow"><div>Те же CV-разбиения</div><span>→</span><div>Обучение и прогнозы</div><span>→</span><div>Сравнение метрики</div></div>
<div class="w7-question">Почему train accuracy подталкивает к k = 1?</div>
<div v-click="1" class="w7-text">Если сама train-точка включена в поиск, она обычно оказывается своим ближайшим соседом. Проверка на новых объектах снимает это преимущество.</div>
<div class="w7-note">Подготовка признаков обучается внутри train-фолда. Финальный test остаётся отдельно.</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S62 -->

<WeekSevenFrame section="Число соседей и размерность" title="Близкие соседи должны ещё и найтись">
<div class="w7-text">Хотим узкую окрестность и достаточно наблюдений в ней. При той же относительной стороне её доля пространства быстро уменьшается.</div>
<WeekSevenPlot name="v3-volume" :step="$clicks" :height="320" alt="Отрезок, квадрат и куб: окрестность со стороной 0.2 занимает 20 процентов длины, 4 процента площади и 0.8 процента объёма" />
<div class="w7-note">Идеализируем: равномерное распределение в единичном пространстве; вся окрестность лежит внутри него.</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S63 -->

<WeekSevenFrame section="Число соседей и размерность" title="Шумовые координаты меняют само соседство">
<div class="w7-row"><WeekSevenPlot name="noise" :step="$clicks" :height="375" alt="Та же выборка и запрос: соседи по двум полезным или по 32 координатам, включая 30 шумовых" /><div class="w7-col"><div class="w7-header">{{ $clicks===0?'2 полезные координаты':'2 полезные + 30 шумовых' }}</div><div class="w7-text">Кольца и отрезки отмечают выбранных соседей.</div><div class="w7-note">На рисунке всегда показаны только первые две координаты.</div><div v-click="1" class="w7-result">Стандартизация меняет масштаб, но не устраняет нерелевантность признаков.</div></div></div>
<div class="w7-note">KD-tree и BallTree — структуры для ускорения поиска соседей. Их выигрыш зависит от геометрии и размерности данных.</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 text-[24px] relative
---

<!-- M04-S64 -->

<WeekSevenFrame section="kNN: итоги" title="Прогноз определяется соседством">
<ul class="w7-list"><li>Класс выбираем по голосам ближайших обучающих объектов.</li><li>Соседей определяют расстояние и масштаб признаков; число k выбираем по CV.</li><li>Шумовые признаки и высокая размерность затрудняют поиск полезных соседей.</li></ul>
<div v-click="1" class="w7-question w7-line">kNN уже работает с несколькими классами. Как расширить логистическую модель?</div>
</WeekSevenFrame>



---
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S65 -->

<WeekSevenFrame section="Несколько классов" title="От kNN к многоклассовой постановке">
<div class="w7-question">kNN уже выбирает между A, B и C.<br>Как расширить бинарную логистическую регрессию?</div>
<MathBlock formula="Y\in\{1,\ldots,K\}" class="w7-large" />
<div class="w7-text">В многоклассовой классификации объекту соответствует <strong>одна метка</strong> из K взаимоисключающих вариантов.</div>
</WeekSevenFrame>



---
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S66 -->

<WeekSevenFrame section="Несколько классов" title="Что должна выдавать многоклассовая модель">
<div class="w7-three w7-text"><div><div class="w7-header">A · Оплата</div>Списание денег</div><div><div class="w7-header">B · Доставка</div>Движение заказа</div><div><div class="w7-header">C · Техподдержка</div>Ошибка сервиса</div></div>
<div class="w7-text">Для выбора класса достаточно оценок. В вероятностной модели хотим получить согласованный вектор классовых вероятностей:</div>
<MathBlock formula="x\longrightarrow(p_A(x),p_B(x),p_C(x))\longrightarrow\hat y(x)" class="w7-math" />
<MathBlock formula="p_c(x)\ge0,\qquad\sum_{c=1}^Kp_c(x)=1,\qquad\hat y(x)\in\arg\max_c p_c(x)" class="w7-math" />
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S67 -->

<WeekSevenFrame section="One-vs-Rest" title="One-vs-Rest: A против остальных">
<table class="w7-table"><thead><tr><th>Исходный класс</th><th>Смысл бинарного ответа</th><th>Новая метка</th></tr></thead><tbody><tr class="focus"><td>A · Оплата</td><td>A</td><td>1</td></tr><tr><td>B · Доставка</td><td>Не-A</td><td>0</td></tr><tr><td>C · Техническая проблема</td><td>Не-A</td><td>0</td></tr></tbody></table>
<div v-click="1" class="w7-result">На тех же признаках обучаем знакомую бинарную модель: A против всех остальных.</div>
</WeekSevenFrame>



---
clicks: 2
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S68 -->

<WeekSevenFrame section="One-vs-Rest" title="Три самостоятельные бинарные модели">
<table class="w7-table"><thead><tr><th>Истинный класс</th><th>A vs rest</th><th :style="{opacity:$clicks>=1?1:0}">B vs rest</th><th :style="{opacity:$clicks>=2?1:0}">C vs rest</th></tr></thead><tbody><tr v-for="(c,i) in ['A','B','C']" :key="c"><td>{{ c }}</td><td>{{ i===0?1:0 }}</td><td :style="{opacity:$clicks>=1?1:0}">{{ i===1?1:0 }}</td><td :style="{opacity:$clicks>=2?1:0}">{{ i===2?1:0 }}</td></tr></tbody></table>
<div class="w7-text">Признаки объектов одни и те же; для каждой задачи меняем бинарные ответы.</div>
<div v-click="2" class="w7-result">Для K классов обучаем K отдельных моделей. Прогноз — класс с наибольшей бинарной оценкой:</div>
<MathBlock v-click="2" formula="\hat y(x)\in\arg\max_c\hat p_c^{bin}(x)" class="w7-math" />
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S69 -->

<WeekSevenFrame section="One-vs-Rest" title="Три бинарные вероятности ещё не распределение">
<MathBlock formula="(\hat p_A^{bin},\hat p_B^{bin},\hat p_C^{bin})=(0.8,0.7,0.3),\qquad\sum_c\hat p_c^{bin}=1.8" class="text-[30px]" />
<div class="w7-question">У объекта один правильный класс. Можно ли считать эти числа его распределением?</div>
<MathBlock v-click="1" formula="\hat p_c^{OvR}=\frac{\hat p_c^{bin}}{\sum_j\hat p_j^{bin}}\quad\Rightarrow\quad(0.444,0.389,0.167)" class="w7-math" />
<div v-click="1" class="w7-result">Нормировка объединяет выходы. Параметры бинарных моделей всё ещё обучались независимо.</div>
</WeekSevenFrame>



---
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S70 -->

<WeekSevenFrame section="One-vs-Rest" title="Что мы получили с помощью OvR">
<ul class="w7-list"><li>Обучили K независимых бинарных классификаторов.</li><li>По их оценкам выбираем один итоговый класс.</li><li>Бинарные вероятности могут не давать сумму 1; нормировка не меняет способа обучения.</li></ul>
<div class="w7-question w7-line">Можно ли обучить одну модель, в которой все классы учитываются совместно?</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S71 -->

<WeekSevenFrame section="Одна многоклассовая модель" title="По одной линейной оценке для каждого класса">
<div class="w7-text">Один объект описан двумя признаками. Каждый класс получает свою строку коэффициентов.</div>
<MathBlock formula="\begin{aligned}s_A(x)&=w_{A1}x_1+w_{A2}x_2+b_A,\\[10pt]s_B(x)&=w_{B1}x_1+w_{B2}x_2+b_B,\\[10pt]s_C(x)&=w_{C1}x_1+w_{C2}x_2+b_C.\end{aligned}" class="w7-math" />
<div v-click="1" class="w7-result">Три оценки одного объекта — параметры одной многоклассовой модели. Найдём их по общей функции потерь.</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S72 -->

<WeekSevenFrame section="Одна многоклассовая модель" title="Соберём коэффициенты в матрицу W">
<MathBlock formula="W=\begin{pmatrix}w_{A1}&w_{A2}\\w_{B1}&w_{B2}\\w_{C1}&w_{C2}\end{pmatrix},\qquad b=\begin{pmatrix}b_A\\b_B\\b_C\end{pmatrix}" class="w7-large" />
<MathBlock v-click="1" formula="\underbrace{s(x)}_{K\times1}=\underbrace{W}_{K\times p}\;\underbrace{x}_{p\times1}+\underbrace{b}_{K\times1}" class="w7-large" />
<div class="w7-text">Строка W — коэффициенты одного класса. Столбец W — влияние одного признака на все классовые оценки.</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S73 -->

<WeekSevenFrame section="Одна многоклассовая модель" title="Посчитаем три оценки одного объекта">
<MathBlock formula="W=\begin{pmatrix}1&0.5\\1&0\\0&0\end{pmatrix},\quad b=\begin{pmatrix}0\\0\\0\end{pmatrix},\quad x=\begin{pmatrix}1\\2\end{pmatrix}" class="w7-math" />
<div class="w7-equal"><MathBlock formula="\begin{aligned}s_A&=1\cdot1+0.5\cdot2=2,\\s_B&=1\cdot1+0\cdot2=1,\\s_C&=0.\end{aligned}" class="w7-math" /><MathBlock v-click="1" formula="s(x)=Wx+b=\begin{pmatrix}2\\1\\0\end{pmatrix}" class="w7-large" /></div>
<div class="w7-note">Один набор коэффициентов применяется ко всем объектам. Меняется x — меняются scores.</div>
</WeekSevenFrame>



---
clicks: 2
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S74 -->

<WeekSevenFrame class="w7-v2-tight" section="Softmax" title="Экспоненты дают положительные веса классов">
<div class="w7-equal"><div class="w7-col"><MathBlock formula="p_c=\frac{e^{s_c}}{\sum_j e^{s_j}}>0" class="w7-math" /><div class="w7-text">Нормируем положительные веса: сумма p равна 1.</div></div><div class="w7-col"><MathBlock formula="s_A>s_B\Rightarrow e^{s_A}>e^{s_B}" class="w7-math" /><div class="w7-text">Порядок оценок сохраняется.</div></div></div>
<MathBlock v-click="1" formula="\frac{p_A(x)}{p_B(x)}=\frac{e^{s_A(x)}}{e^{s_B(x)}}=e^{s_A(x)-s_B(x)}" class="w7-math" />
<MathBlock v-click="2" formula="\boxed{\log\frac{p_A(x)}{p_B(x)}=s_A(x)-s_B(x)}" class="w7-large" />
<div v-click="2" class="w7-result">Логарифм отношения вероятностей снова линейно связан с признаками.</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S75 -->

<WeekSevenFrame section="Softmax" title="Softmax: одна формула для всех классов">
<div class="w7-row" style="grid-template-columns:0.8fr 1.6fr"><div class="w7-col"><MathBlock formula="\boxed{p_c(x)=\frac{e^{s_c(x)}}{\sum_{j=1}^Ke^{s_j(x)}}}" class="text-[30px]" /><div class="w7-text">Свой числитель.<br>Общий знаменатель.</div></div><WeekSevenSoftmax :step="$clicks===0?1:2" /></div>
<div v-click="1" class="w7-result">Положительные вероятности суммируются в 1. Общий знаменатель связывает классы, но нормировка не гарантирует калибровку.</div>
<div v-click="1" class="w7-note">Прогноз — класс с наибольшей вероятностью: в этом примере A.</div>
</WeekSevenFrame>



---
clicks: 2
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S76 -->

<WeekSevenFrame section="Совместное обучение" title="Cross-entropy одного многоклассового объекта">
<div class="w7-text">Модель выдала вероятности трёх классов. Истинный класс объекта — <strong>B</strong>.</div>
<table class="w7-table" style="text-align:center"><thead><tr><th>A</th><th class="focus">B · истинный класс</th><th>C</th></tr></thead><tbody><tr><td>≈ 0.665</td><td class="focus"><strong>≈ 0.245</strong></td><td>≈ 0.090</td></tr></tbody></table>
<MathBlock v-click="1" formula="L_i=-\log p_B\approx1.408" class="w7-large" />
<MathBlock v-click="2" formula="\boxed{L_i=-\log p_{y_i}(x_i)}" class="w7-large" />
<div v-click="2" class="w7-result">Чем меньшую вероятность модель назначает правильному классу, тем больше значение функции потерь.</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S77 -->

<WeekSevenFrame section="Совместное обучение" title="Одна целевая функция для всех коэффициентов">
<MathBlock formula="\boxed{R_n(W,b)=-\frac1n\sum_{i=1}^n\log p_{y_i}(x_i;W,b)}" class="w7-large" />
<div class="w7-text">Усредняем cross-entropy всех обучающих объектов.</div>
<MathBlock v-click="1" formula="\boxed{(\hat W,\hat b)\in\arg\min_{W,b}R_n(W,b)}" class="w7-large" />
<div v-click="1" class="w7-result">В одной минимизации участвуют все строки W и все свободные члены.</div>
</WeekSevenFrame>



---
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S78 -->

<WeekSevenFrame section="Совместное обучение" title="Что значит обучить многоклассовую модель">
<div class="w7-flow"><div>W, b</div><span>→</span><div>Линейные<br>scores</div><span>→</span><div>Softmax</div><span>→</span><div>Средняя<br>cross-entropy</div></div>
<div class="w7-text">Коэффициенты всех классов — параметры одной модели. Softmax связывает вероятности, поэтому общая функция потерь зависит от всего набора W,b.</div>
<div class="w7-result">Численный оптимизатор подбирает все параметры совместно. Можно добавить знакомый штраф на коэффициенты.</div>
<div class="w7-equal"><div class="w7-rail w7-text"><strong>OvR:</strong> K отдельных бинарных задач.</div><div class="w7-rail w7-text"><strong>Multinomial:</strong> одна совместная задача.</div></div>
<div class="w7-note">Далее: как оценить ошибки модели по отдельным классам?</div>
</WeekSevenFrame>



---
clicks: 3
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S79 -->

<WeekSevenFrame section="Многоклассовые метрики" title="Матрица ошибок в общей форме">
<div class="w7-row"><WeekSevenConfusion symbolic focus="walk" :step="$clicks" /><div class="w7-col"><div class="w7-text">Строки — истинные классы.<br>Столбцы — прогноз модели.</div><MathBlock v-click="1" formula="TP_C=C_{CC}" class="w7-math" /><MathBlock v-click="2" formula="FP_C=C_{AC}+C_{BC}" class="w7-math" /><MathBlock v-click="3" formula="FN_C=C_{CA}+C_{CB}" class="w7-math" /></div></div>
<div class="w7-note">Выбрали C положительным классом, остальные — отрицательными. Для любого другого класса делаем то же самое.</div>
</WeekSevenFrame>



---
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S80 -->

<WeekSevenFrame section="Многоклассовые метрики" title="Одна матрица: 60 обращений в поддержку">
<div class="w7-row"><WeekSevenConfusion focus="diag" /><div class="w7-col"><div class="w7-text">Истинных объектов:<br>A — 40, B — 15, C — 5.</div><MathBlock formula="\begin{aligned}Accuracy&=\frac{38+10+1}{60}\\&=\frac{49}{60}\approx0.817\end{aligned}" class="text-[28px]" /><div class="w7-question">Хорошо ли модель работает для каждого отдела?</div></div></div>
</WeekSevenFrame>



---
clicks: 3
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S81 -->

<WeekSevenFrame section="Многоклассовые метрики" title="Для класса C: кто TP, FP и FN?">
<div class="w7-row"><WeekSevenConfusion focus="walk" :step="$clicks" /><div class="w7-col"><div class="w7-question">Считаем C положительным классом.</div><MathBlock v-click="1" formula="TP_C=1" class="w7-large" /><MathBlock v-click="2" formula="FP_C=0+1=1" class="w7-math" /><MathBlock v-click="3" formula="FN_C=2+2=4" class="w7-math" /></div></div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S82 -->

<WeekSevenFrame section="Многоклассовые метрики" title="Precision, recall и F1 для одного класса">
<div class="w7-row"><WeekSevenConfusion :focus="$clicks===0?'column':'row'" /><div class="w7-col"><MathBlock formula="Precision_C=\frac1{1+1}=0.5" class="w7-math" /><MathBlock v-click="1" formula="Recall_C=\frac1{1+4}=0.2" class="w7-math" /><MathBlock v-click="1" formula="F_{1,C}=\frac{2\cdot0.5\cdot0.2}{0.5+0.2}\approx0.286" class="text-[29px]" /></div></div>
<div class="w7-text">Precision: среди предсказанных C.<br>Recall: среди всех настоящих C.</div>
</WeekSevenFrame>



---
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S83 -->

<WeekSevenFrame section="Многоклассовые метрики" title="Метрики по всем классам">
<table class="w7-table"><thead><tr><th>Класс</th><th>Support</th><th>Precision</th><th>Recall</th><th>F1</th></tr></thead><tbody><tr><td>A</td><td>40</td><td>0.864</td><td>0.950</td><td>0.905</td></tr><tr><td>B</td><td>15</td><td>0.714</td><td>0.667</td><td>0.690</td></tr><tr class="focus"><td>C</td><td>5</td><td>0.500</td><td>0.200</td><td>0.286</td></tr></tbody></table>
<div class="w7-text">Support — число объектов истинного класса: сумма его строки матрицы.</div>
<div class="w7-result">Общая accuracy ≈ 0.817 скрывает то, что найдена только пятая часть объектов C.</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S84 -->

<WeekSevenFrame section="Усреднение метрик" title="Macro: классы имеют одинаковый вес">
<MathBlock formula="\boxed{F_1^{macro}=\frac1K\sum_{c=1}^KF_{1,c}}" class="w7-large" />
<div class="w7-weights"><div style="flex:1;background:#eaf1ff">A · 1/3</div><div style="flex:1;background:#fff1e6">B · 1/3</div><div style="flex:1;background:#e7f6f0">C · 1/3</div></div>
<MathBlock v-click="1" formula="F_1^{macro}\approx\frac{0.905+0.690+0.286}{3}\approx0.627" class="w7-math" />
<div class="w7-result">C встречается в восемь раз реже A, но его вес в macro остаётся тем же.</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S85 -->

<WeekSevenFrame section="Усреднение метрик" title="Weighted: вес определяется долей класса">
<MathBlock formula="\boxed{F_1^{weighted}=\sum_c\frac{n_c}{n}F_{1,c}}" class="w7-large" />
<div class="w7-weights"><div style="flex:40;background:#eaf1ff">A · 40/60</div><div style="flex:15;background:#fff1e6">B · 15/60</div><div style="flex:5;background:#e7f6f0">C</div></div>
<MathBlock v-click="1" formula="\frac{40\cdot0.905+15\cdot0.690+5\cdot0.286}{60}\approx0.799" class="w7-math" />
<div class="w7-result">У крупных классов больше вес. Усредняем уже вычисленные классовые F1.</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S86 -->

<WeekSevenFrame section="Усреднение метрик" title="Одинаковые F1 — разные веса классов">
<div class="w7-equal"><div class="w7-col"><div class="w7-header">Каждый класс весит 1/3</div><MathBlock formula="F_1^{macro}\approx0.627" class="w7-large" /></div><div class="w7-col"><div class="w7-header">Вес пропорционален доле класса</div><MathBlock formula="F_1^{weighted}\approx0.799" class="w7-large" /></div></div>
<div class="w7-text">Значения F1 классов A, B, C остались прежними: 0.905, 0.690, 0.286. Изменились только веса при усреднении.</div>
<div v-click="1" class="w7-question w7-line">А если сначала объединить количества ошибок по всем классам и уже потом вычислить метрику?</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S87 -->

<WeekSevenFrame section="Micro: общие количества" title="Сначала объединяем TP, FP и FN">
<div class="w7-text">В macro и weighted сначала считали метрики классов. В micro сначала складываем количества по всем классам:</div>
<div class="w7-three"><MathBlock formula="\boxed{TP_{\mathrm{all}}=\sum_{c=1}^{K}TP_c}" class="w7-math" /><MathBlock v-click="1" formula="\boxed{FP_{\mathrm{all}}=\sum_{c=1}^{K}FP_c}" class="w7-math" /><MathBlock v-click="1" formula="\boxed{FN_{\mathrm{all}}=\sum_{c=1}^{K}FN_c}" class="w7-math" /></div>
<div class="w7-note">Индекс all — итог по всем классам, а не имя отдельного класса.</div>
<div v-click="1" class="w7-result">Из этих общих количеств вычислим precision, recall и F1.</div>
</WeekSevenFrame>



---
clicks: 1
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S88 -->

<WeekSevenFrame section="Micro: общие количества" title="От одной ошибки — к общему подсчёту">
<MathBlock formula="n_{\mathrm{correct}}\text{ — верных},\qquad n_{\mathrm{errors}}=n-n_{\mathrm{correct}}\text{ — ошибок}" class="text-[31px]" />
<div class="w7-equal"><div class="w7-col"><div class="w7-header">Правильный прогноз</div><div class="w7-text">Один TP своему классу.</div><MathBlock formula="TP_{\mathrm{all}}=n_{\mathrm{correct}}" class="w7-math" /></div><div v-click="1" class="w7-col"><div class="w7-header">Неправильный прогноз</div><div class="w7-text">Один FN истинному классу и один FP предсказанному.</div><MathBlock formula="FP_{\mathrm{all}}=FN_{\mathrm{all}}=n_{\mathrm{errors}}" class="text-[28px]" /></div></div>
<div class="w7-note">У каждого объекта одна истинная и одна предсказанная метка. В нашей матрице: 49 верных, 11 ошибок. Считаем по всем классам.</div>
</WeekSevenFrame>



---
clicks: 2
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S89 -->

<WeekSevenFrame class="w7-v2-tight" section="Micro: общие количества" title="Почему micro совпадает с accuracy">
<div class="w7-note">Верный прогноз даёт один TP. Ошибка — один FN истинному и один FP предсказанному классу.</div>
<MathBlock formula="Precision^{micro}=\frac{TP_{\mathrm{all}}}{TP_{\mathrm{all}}+FP_{\mathrm{all}}}=\frac{n_{\mathrm{correct}}}{n}" class="w7-math" />
<MathBlock v-click="1" formula="Recall^{micro}=\frac{TP_{\mathrm{all}}}{TP_{\mathrm{all}}+FN_{\mathrm{all}}}=\frac{n_{\mathrm{correct}}}{n}" class="w7-math" />
<MathBlock v-click="2" formula="\boxed{Precision^{micro}=Recall^{micro}=F_1^{micro}=Accuracy}" class="text-[32px]" />
<div v-click="2" class="w7-result">В нашем примере: 49/60 ≈ 0.817. Micro отражает общий подсчёт верных и ошибочных ответов и не даёт отдельной информации о редких классах.</div>
<div class="w7-note">Для single-label multiclass с учётом всех классов. При равных precision и recall их F1 равно тому же числу.</div>
</WeekSevenFrame>



---
class: masters-week04 week07 text-[23px] relative
---

<!-- M04-S90 -->

<WeekSevenFrame section="Выбор метрики" title="Какую метрику выбрать для задачи?">
<table class="w7-table w7-v2-cases"><thead><tr><th>Задача</th><th>Что важно узнать</th><th>Основной ориентир</th></tr></thead><tbody><tr><td>Маршрутизация обращений</td><td>Какую долю направляем верно?</td><td>Accuracy при сопоставимой цене ошибок</td></tr><tr><td>NYC Taxi: четыре интервала длительности</td><td>Как различаем все четыре класса?</td><td>Macro-F1, метрики классов и матрица ошибок</td></tr><tr><td>Критичный редкий исход</td><td>Сколько находим? Скольким сигналам верим?</td><td>Recall и precision этого класса</td></tr></tbody></table>
</WeekSevenFrame>



---
clicks: 2
class: masters-week04 text-[24px] relative
---

<!-- M04-S91 -->

<WeekSevenFrame section="Итоги лекции" title="Главные выводы">
<div class="w7-equal"><div class="w7-col"><div class="w7-header">Регуляризация</div><div class="w7-text">Штраф меняет выбор коэффициентов. Силу ограничения проверяем на отложенных данных.</div></div><div class="w7-col"><div class="w7-header">Кросс-валидация</div><div class="w7-text">Сравниваем всю процедуру на одинаковых фолдах. После выбора — refit на всех dev.</div></div></div>
<div v-click="1" class="w7-equal"><div class="w7-col"><div class="w7-header">kNN и геометрия</div><div class="w7-text">Расстояния, масштаб признаков и число k определяют соседей и прогноз.</div></div><div class="w7-col"><div class="w7-header">Многоклассовая задача</div><div class="w7-text">Различаем обучение и оценивание. Macro-F1 дополняем метриками классов и матрицей ошибок.</div></div></div>
<div v-click="2" class="w7-result w7-line">Фиксируем процедуру, проверяем на отдельном test и объясняем полученный результат.</div>
</WeekSevenFrame>
