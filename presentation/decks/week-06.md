---
theme: default
title: Регуляризация и кросс-валидация
author: НИУ ВШЭ
info: |
  Неделя 6. Регуляризация и кросс-валидация.
colorSchema: light
highlighter: shiki
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
  class: week06 text-[23px]
duration: 100min
appendixSlides: 0
exportFilename: week-06-regularization-cv
download: false
---

<!-- S01 -->
<div class="section-kicker mt-8">Классическое машинное обучение · Неделя 6</div>
<h1 class="deck-title mt-12">Регуляризация<br>и кросс-валидация</h1>
<div class="w6-stack mt-18">
<div class="lecture-question">Как ограничивать подгонку?</div>
<div class="lecture-question">Как надёжнее оценивать модель?</div>
</div>




---
clicks: 1
---

<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>

<!-- S02 -->
<SectionChrome section="Зачем нужна регуляризация" />
# Меньше ошибка на train — лучше новые прогнозы?

<div class="w6-body">
<WeekSixPlot name="generalization" :step="$clicks" :height="360" alt="При росте гибкости train-ошибка падает, а ошибка на новых объектах может вырасти" />
<div class="w6-question">Если ошибка на обучении уменьшилась, обязательно ли она уменьшилась на новых наблюдениях?</div>
<div class="w6-note">Схематические кривые: показывают возможное поведение ошибок при росте гибкости. Их конкретная форма зависит от данных и модели.</div>
</div>


---
clicks: 1
---

<!-- S03 -->
<SectionChrome section="Зачем нужна регуляризация" />
# Гибкая модель может подстроиться к шуму

<div class="w6-body">
<div class="w6-split">
<div><img class="w6-image" :src="$clicks===0?'./assets/week-01/regression-moderate.svg':'./assets/week-01/regression-interpolation.svg'" alt="На одних train-точках сравниваем умеренную зависимость и интерполяционный полином" /></div>
<div class="w6-stack"><div class="w6-question">Один признак, одни обучающие точки.</div><div class="w6-question" v-click="1">Более гибкая функция проходит через все наблюдения — вместе с их случайными отклонениями.</div><div class="w6-result" v-click="1">Малая train-ошибка может сопровождаться худшими прогнозами между точками.</div></div></div>
<div class="w6-plot-legend"><div><span class="w6-key-dot"></span>Обучающие наблюдения</div><div><span class="w6-key-diamond"></span>Новые фактические значения</div><div><span class="w6-key-square"></span>Прогнозы для новых объектов</div><div><span class="w6-key-dash"></span>Исходная синтетическая зависимость</div></div>
</div>




---
clicks: 1
---

<script setup>
import WeekSixTable from './components/WeekSixTable.vue'
</script>

<!-- S04 -->
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
---

<script setup>
import WeekSixTable from './components/WeekSixTable.vue'
</script>

<!-- S05 -->
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
---

<!-- S06 -->
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
---

<!-- S07 -->
<SectionChrome section="Ridge" />
# Исходная задача — метод наименьших квадратов

<div class="w6-body">
<MathBlock formula="f_{\beta_0,\beta}(x)=\beta_0+x^\top\beta" class="w6-formula text-[42px]" /><div class="w6-note"><MathBlock formula="\beta_0" :display="false" class="inline-block" /> — свободный член; <MathBlock formula="\beta=(\beta_1,\ldots,\beta_p)^\top" :display="false" class="inline-block" /> — коэффициенты при признаках.</div><MathBlock formula="R_n(\beta_0,\beta)=\frac1n\sum_{i=1}^n(y_i-\beta_0-x_i^\top\beta)^2" class="w6-formula text-[36px]" /><MathBlock formula="(\hat\beta_0,\hat\beta)\in\arg\min_{\beta_0,\beta}R_n(\beta_0,\beta)" class="w6-formula text-[36px]" /><div class="w6-note">МНК выбирает минимальную MSE; Rₙ — эмпирический риск.</div>
</div>


---
clicks: 0
---

<script setup>
import WeekSixTable from './components/WeekSixTable.vue'
</script>

<!-- S08 -->
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
---

<script setup>
import WeekSixTable from './components/WeekSixTable.vue'
</script>

<!-- S09 -->
<SectionChrome section="Ridge" />
# Добавим требование к величине коэффициентов

<div class="w6-body">
<WeekSixTable mode="norm" :step="$clicks" />
<div class="w6-question">Одинаковая подгонка допускает и большие компенсирующие коэффициенты, и более умеренные.</div>
<div class="w6-result" v-click="1">Идея Ridge: учитывать величину всего вектора коэффициентов при выборе решения.</div>
</div>


---
clicks: 2
---

<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>

<!-- S10 -->
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
---

<!-- S11 -->
<SectionChrome section="Ridge" />
# Ridge: минимизируем MSE в допустимой области

<div class="w6-body">
<MathBlock formula="\min_{\beta_0,\beta}R_n(\beta_0,\beta)" class="w6-formula text-[42px]" /><MathBlock formula="\text{при }\|\beta\|_2^2\le t,\qquad t\ge0" class="w6-formula text-[40px]" /><div class="w6-question">Меньшее t оставляет более узкую область допустимых коэффициентов. Ищем лучшую подгонку внутри неё.</div><div class="w6-equal"><div class="w6-note"><MathBlock formula="t=1:\quad(3,-2)" :display="false" class="inline-block" /> недопустимы: квадрат нормы 13.</div><div class="w6-note"><MathBlock formula="(1,0),\ (0.5,0.5)" :display="false" class="inline-block" /> допустимы: квадрат нормы 1 и 0,5.</div></div><div class="w6-result">Если решение МНК лежит внутри области, ограничение сохраняет его.</div>
</div>


---
clicks: 0
---

<!-- S12 -->
<SectionChrome section="Ridge" />
# Та же идея через штраф: цена больших коэффициентов

<div class="w6-body">
<MathBlock formula="J_\lambda^{\mathrm{Ridge}}(\beta_0,\beta)=R_n(\beta_0,\beta)+\lambda\|\beta\|_2^2" class="w6-formula text-[37px]" /><div class="w6-equal"><div><div class="w6-question">Первое слагаемое — ошибка подгонки.</div></div><div><div class="w6-question">Второе — цена величины коэффициентов.</div></div></div><MathBlock formula="\lambda\ge0,\qquad \lambda=0\ \Rightarrow\ \text{МНК}" class="w6-formula text-[35px]" /><div class="w6-question">При большем λ уменьшение нормы получает больший вес относительно уменьшения MSE.</div><div class="w6-note">При согласованном выборе t и λ ограниченная и штрафная задачи имеют общее оптимальное решение.</div>
</div>


---
clicks: 2
---

<script setup>
import WeekSixTable from './components/WeekSixTable.vue'
</script>

<!-- S13 -->
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
---

<!-- S14 -->
<SectionChrome section="Ridge" />
# Чувствительность: изменим только второй признак

<div class="w6-body w6-sensitivity">
<MathBlock formula="x=(10,10),\qquad x'=(10,10.1),\qquad f(x)=10" class="w6-formula text-[36px]" /><table class="w6-plain-table w6-sensitivity-table"><thead><tr><th>Коэффициенты</th><th>Новый прогноз</th><th>Изменение</th></tr></thead><tbody><tr class="w6-sensitive"><td>(30; −29)</td><td>7,1</td><td>−2,9</td></tr><tr><td>(3; −2)</td><td>9,8</td><td>−0,2</td></tr><tr><td>(1; 0)</td><td>10</td><td>0</td></tr><tr><td>(0,5; 0,5)</td><td>10,05</td><td>+0,05</td></tr></tbody></table><MathBlock formula="\Delta f=\beta^\top\Delta x" class="w6-formula text-[38px]" /><div class="w6-result">При коэффициенте −29 изменение признака на 0,1 сдвигает прогноз на −2,9.</div>
</div>




---
clicks: 1
---

<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>

<!-- S15 -->
<SectionChrome section="Ridge" />
# Свободный член отвечает за сдвиг прогноза

<div class="w6-body">
<div class="w6-split"><WeekSixPlot name="intercept" :step="$clicks" :height="405" alt="При прибавлении 50 к целевой переменной весь линейный прогноз сдвигается на 50" /><div class="w6-stack">
<MathBlock formula="y_i'=y_i+50" class="w6-formula text-[36px]" />
<div v-click="1"><MathBlock formula="\beta_0'=\beta_0+50,\quad\beta'=\beta" class="w6-formula text-[32px]" /></div>
<div class="w6-question" v-click="1">Остатки и MSE сохраняются. Штраф на наклоны тоже остаётся прежним.</div>
<div class="w6-result" v-click="1">Обычно не штрафуем свободный член: смена уровня y должна сдвигать прогнозы, сохраняя наклоны.</div>
</div></div>
</div>


---
clicks: 0
---

<!-- S16 -->
<SectionChrome section="Ridge" />
# Как изменились нормальные уравнения Ridge?

<div class="w6-body">
<div class="w6-note">Центрируем признаки и y. <MathBlock formula="X_c" :display="false" class="inline-block" /> содержит p признаков без столбца единиц; свободный член восстановим отдельно.</div>
<div class="w6-equal"><div class="w6-stack"><div class="w6-header">МНК</div><MathBlock formula="X_c^\top X_c\hat\beta=X_c^\top y_c" class="w6-formula text-[33px]" /></div><div class="w6-stack"><div class="w6-header">Ridge</div><MathBlock formula="(X_c^\top X_c+\textcolor{#2864dc}{n\lambda I})\hat\beta=X_c^\top y_c" class="w6-formula text-[31px]" /></div></div>
<div class="w6-result">При λ &gt; 0 матрица Ridge обратима и коэффициенты единственны — даже при линейно зависимых признаках.</div>
<MathBlock formula="\hat\beta_0=\bar y-\bar x^\top\hat\beta" class="w6-formula text-[35px]" />
<div class="w6-note">Множитель n появляется из нормировки <MathBlock formula="R_n=RSS/n" :display="false" class="inline-block" />; I — единичная матрица размера p × p.</div>
</div>




---
clicks: 0
---

<!-- S17 -->
<SectionChrome section="Ridge" />
# Эксперимент: повторные выборки со связанными признаками

<div class="w6-body">
<div class="w6-equal"><div class="w6-stack"><MathBlock formula="x_1=z+\varepsilon_1,\qquad x_2=z+\varepsilon_2" class="w6-formula text-[31px]" /><MathBlock formula="y=3z+\varepsilon_y" class="w6-formula text-[38px]" /><div class="w6-note">Оба признака повторяют одну скрытую величину z с небольшим независимым шумом.</div></div><div class="w6-stack"><div class="w6-question">100 независимых выборок по 70 объектов.</div><div class="w6-question">На каждой заново обучаем МНК и Ridge, записываем два коэффициента.</div><MathBlock formula="\lambda=8/70\approx0.114" class="w6-formula text-[32px]" /></div></div>
<div class="w6-note">z — стандартная нормальная величина; стандартные отклонения шумов признаков 0,035, шума y — 0,75.</div>
<div class="w6-question">Насколько меняются коэффициенты от выборки к выборке?</div>
</div>


---
clicks: 0
---

<!-- S18 -->
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
---

<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>

<!-- S19 -->
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
---

<!-- S20 -->
<SectionChrome section="Ridge" />
# Одни прогнозы — разные единицы и штрафы

<div class="w6-body">
<div class="w6-equal"><div class="w6-stack"><div class="w6-header">Площадь в м²</div><MathBlock formula="x=60,\quad\beta=20" class="w6-formula text-[36px]" /><MathBlock formula="\beta x=1200" class="w6-formula text-[36px]" /><MathBlock formula="\beta^2=400" class="w6-formula text-[36px]" /></div><div class="w6-stack"><div class="w6-header">Та же площадь в см²</div><MathBlock formula="x'=600\,000,\quad\beta'=0.002" class="w6-formula text-[33px]" /><MathBlock formula="\beta'x'=1200" class="w6-formula text-[36px]" /><MathBlock formula="(\beta')^2=0.000004" class="w6-formula text-[36px]" /></div></div>
<div class="w6-result">Прогноз сохранился, цена этого коэффициента в L2-штрафе изменилась в 10⁸ раз.</div>
<div class="w6-equal"><MathBlock formula="x_{ij}^{\mathrm{std}}=\frac{x_{ij}-\bar x_j}{s_j}" class="w6-formula text-[36px]" /><div class="w6-note">Перед регуляризацией приводим признаки к сопоставимому масштабу. Средние и s считаем по обучающим данным.</div></div>
</div>


---
clicks: 0
---

<!-- S21 -->
<SectionChrome section="Lasso и геометрия" />
# От Ridge к Lasso: ограничим сумму модулей

<div class="w6-body">
<MathBlock formula="\text{Ridge: }\|\beta\|_2^2=\sum_j\beta_j^2" class="w6-formula text-[36px]" /><MathBlock formula="\text{Lasso: }\|\beta\|_1=\sum_j|\beta_j|,\qquad\|(3,-2)\|_1=5" class="w6-formula text-[36px]" /><div class="w6-equal"><div class="w6-stack"><div class="w6-header">Ограниченная задача</div><MathBlock formula="\min_{\beta_0,\beta}R_n\quad\text{при }\|\beta\|_1\le t" class="w6-formula text-[32px]" /></div><div class="w6-stack"><div class="w6-header">Штрафная задача</div><MathBlock formula="J_\lambda^{\mathrm{Lasso}}=R_n+\lambda\|\beta\|_1" class="w6-formula text-[32px]" /></div></div><div class="w6-question">Lasso сдерживает величину коэффициентов с помощью L1. Формула линейного прогноза остаётся прежней; свободный член не штрафуется.</div>
</div>


---
clicks: 1
---

<!-- S22 -->
<SectionChrome section="Lasso и геометрия" />
# L1 может давать разреженное решение

<div class="w6-body">
<div class="w6-question">L1-штраф имеет изломы при нулевых коэффициентах. Минимум может оказаться в одной из таких точек — механизм увидим на геометрии.</div><MathBlock formula="f(x)=\beta_0+\beta_1x_1+\beta_2x_2+\beta_3x_3" class="w6-formula text-[40px]" /><div v-click="1"><MathBlock formula="\hat\beta_2=0\quad\Rightarrow\quad\hat f(x)=\hat\beta_0+\hat\beta_1x_1+\hat\beta_3x_3" class="w6-formula text-[34px]" /></div><div class="w6-result" v-click="1">Нулевой коэффициент исключает признак из правила прогноза. Если многие коэффициенты равны нулю, решение называют разреженным.</div>
</div>


---
clicks: 1
---


<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>

<!-- S23 -->
<SectionChrome section="Lasso и геометрия" />
# Плоскость коэффициентов и линии уровня

<div class="w6-body">
<div class="w6-split"><WeekSixPlot name="levels" :step="$clicks" :height="420" alt="levels: последовательное состояние визуального объяснения" /><div class="w6-stack"><div class="w6-question">Каждая точка <MathBlock formula="(\beta_1,\beta_2)" :display="false" class="inline-block" /> — одна модель.</div><div class="w6-question" v-click="1">На одной линии уровня — одинаковая MSE.</div><div class="w6-note" v-click="1">Если решение МНК единственно, линии уровня MSE в пространстве двух коэффициентов образуют вложенные эллипсы. В центре — минимум МНК.</div></div></div>
</div>




---
clicks: 1
---


<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>

<!-- S24 -->
<SectionChrome section="Lasso и геометрия" />
# Круг L2 и ромб L1

<div class="w6-body">
<WeekSixPlot name="regions" :step="$clicks" :height="370" alt="regions: последовательное состояние визуального объяснения" /><div class="w6-equal"><MathBlock formula="\beta_1^2+\beta_2^2\le t" class="w6-formula " /><MathBlock formula="|\beta_1|+|\beta_2|\le t" class="w6-formula " v-click="1" /></div><div class="w6-note">Области допустимых коэффициентов; на рисунке t = 1.</div>
</div>




---
clicks: 4
---


<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>

<!-- S25 -->
<SectionChrome section="Lasso и геометрия" />
# Как ограничение сдвигает минимум

<div class="w6-body">
<WeekSixPlot name="contact" :step="$clicks" :height="385" alt="contact: последовательное состояние визуального объяснения" /><div class="w6-question text-center">{{ ['Свободный минимум вне допустимой области.','Ограничили параметры кругом.','Первое касание — решение Ridge.','Добавили L1-область: какая координата станет нулём?','Касание вершины: второй коэффициент равен нулю.'][$clicks] }}</div><div class="w6-note">От центра расширяем линии уровня до первого касания с областью.</div>
</div>




---
clicks: 1
---


<!-- S26 -->
<SectionChrome section="Lasso и геометрия" />
# Два варианта касания L1-области

<div class="w6-body">
<div class="relative"><img class="w6-image" src="/assets/week-06/lasso-contact-variants.svg" alt="lasso-contact-variants" /><div v-if="$clicks === 0" class="absolute inset-y-0 right-0 w-1/2 bg-white"></div></div><div class="w6-question" v-click="1">Касание может происходить в вершине или на стороне.</div><div class="w6-result" v-click="1">Lasso способствует разреженности; результат зависит от данных и λ.</div>
</div>




---
clicks: 3
---

<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>

<!-- S27 -->
<SectionChrome section="Lasso и геометрия" />
# Излом может быть минимумом без обычной производной

<div class="w6-body">
<div class="w6-split"><WeekSixPlot name="soft-threshold" :step="$clicks" :height="425" alt="Для J=(b−2)²+λ|b| минимум b=2 при λ=0, b=1 при λ=2 и b=0 при λ≥4" /><div class="w6-stack">
<MathBlock formula="J_\lambda(b)=(b-2)^2+\lambda|b|" class="w6-formula text-[32px]" />
<div class="w6-question">{{ ['Без штрафа минимум в b = 2.','При λ = 2 минимум в b = 1.','При λ = 4 минимум доходит до b = 0.','При λ = 5 минимум остаётся в b = 0.'][$clicks] }}</div>
<div class="w6-result" v-click="2">При λ ≥ 4 движение из нуля в любую сторону увеличивает функцию.</div>
<div class="w6-note" v-click="2">В изломе нет обычной производной, но сравнение значений слева и справа всё равно определяет минимум.</div>
</div></div>
</div>




---
clicks: 2
---

<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>

<!-- S28 -->
<SectionChrome section="Lasso и геометрия" />
# Траектории Lasso: координаты доходят до нуля

<div class="w6-body">
<div class="w6-split"><div><WeekSixPlot name="lasso-path" :step="$clicks" :height="425" alt="Коэффициенты Lasso на тех же 130 объектах и шести признаках: некоторые точно зануляются" /><div class="w6-note">Признаки 1–2 сильно коррелируют; 3 и 5 информативны; 4 и 6 — шумовые.</div></div><div class="w6-stack">
<div class="w6-question">Те же данные, что для Ridge: 130 объектов, 6 стандартизированных признаков.</div>
<div class="w6-question">Ненулевых коэффициентов: <b>{{ [6,4,0][$clicks] }}</b></div>
<div class="w6-result" v-click="1">Lasso подбирает коэффициенты совместно: снижение ошибки сопоставляется с L1-штрафом.</div>
<div class="w6-note" v-click="2">При сильном штрафе все наклоны нулевые — остаётся постоянный прогноз.</div></div></div>
</div>


---
clicks: 2
---

<script setup>
import WeekSixTable from './components/WeekSixTable.vue'
</script>

<!-- S29 -->
<SectionChrome section="Lasso и геометрия" />
# Какие признаки исключены в этом эксперименте?

<div class="w6-body">
<div class="w6-note">Признаки 1 и 2 почти дублируются; 3 и 5 связаны с y; 4 и 6 — шумовые. Коэффициенты оценены совместно на тех же данных.</div>
<WeekSixTable mode="lasso" :step="$clicks" />
<div class="w6-result" v-click="1">При λ = 0,3 шумовые координаты нулевые.</div>
<div class="w6-question" v-click="2">При λ = 3 исчезает и полезный третий признак, из связанной пары остаётся второй.</div>
</div>


---
clicks: 0
---

<!-- S30 -->
<SectionChrome section="Elastic Net и классификация" />
# Elastic Net сочетает L1 и L2

<div class="w6-body">
<MathBlock formula="J_{\lambda,\rho}=R_n+\lambda\left[\rho\|\beta\|_1+\frac{1-\rho}{2}\|\beta\|_2^2\right]" class="w6-formula text-[38px]" /><MathBlock formula="\lambda\ge0,\qquad0\le\rho\le1" class="w6-formula text-[36px]" /><div class="w6-equal"><div><MathBlock formula="\rho=1:\ \text{Lasso}" class="w6-formula text-[35px]" /></div><div><MathBlock formula="\rho=0:\ \text{L2 с весом }\lambda/2" class="w6-formula text-[35px]" /></div></div><div class="w6-question">L1 сохраняет возможность отбора признаков; L2 помогает распределять вклад между связанными признаками.</div><div class="w6-note">λ задаёт общую силу регуляризации, ρ — соотношение двух штрафов.</div>
</div>


---
clicks: 2
---

<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>

<!-- S31 -->
<SectionChrome section="Elastic Net и классификация" />
# Группирующий эффект: близкие признаки делят вклад

<div class="w6-body">
<div class="w6-split"><WeekSixPlot name="elastic-path" :step="$clicks" :height="425" alt="При увеличении силы Elastic Net коэффициенты почти одинаковых признаков сближаются" /><div class="w6-stack">
<div class="w6-note">ρ = 0,5. Корреляция первых двух признаков ≈ 0,994.</div>
<div v-click="1"><MathBlock formula="\lambda=0.1" class="w6-formula text-[32px]" /><MathBlock formula="(\hat\beta_1,\hat\beta_2)\approx(0.76,0.90)" class="w6-formula text-[32px]" /></div>
<div v-click="2"><MathBlock formula="\lambda=1" class="w6-formula text-[32px]" /><MathBlock formula="(\hat\beta_1,\hat\beta_2)\approx(0.66,0.68)" class="w6-formula text-[32px]" /></div>
<div class="w6-result" v-click="2">L2-часть способствует более равномерному распределению вклада близких признаков.</div>
</div></div>
</div>




---
clicks: 0
---

<!-- S32 -->
<SectionChrome section="Elastic Net и классификация" />
# К log loss тоже можно добавить штраф

<div class="w6-body">
<MathBlock formula="p_{\beta_0,\beta}(x)=\sigma(\beta_0+x^\top\beta)" class="w6-formula text-[42px]" /><MathBlock formula="R_n^{\mathrm{log}}=\frac1n\sum_i L(y_i,p_i)" class="w6-formula text-[36px]" /><MathBlock formula="J_\lambda^{\mathrm{log}}=R_n^{\mathrm{log}}+\lambda\|\beta\|_2^2" class="w6-formula text-[40px]" /><div class="w6-question">L1 или L2 ограничивают коэффициенты логистической регрессии. Это может стабилизировать решение и сдерживать подгонку к шуму.</div><div class="w6-result">Формула вероятности прежняя; меняется критерий обучения и найденные параметры.</div>
</div>


---
clicks: 0
---

<!-- S33 -->
<SectionChrome section="Elastic Net и классификация" />
# Особый случай: классы линейно разделимы

<div class="w6-body">
<div class="w6-split"><img class="w6-image" src="/assets/week-06/logistic-separation-data.svg" alt="У класса 0 x отрицательный, у класса 1 положительный; x=0 разделяет классы" /><div class="w6-stack">
<div class="w6-question">Все объекты класса 0 слева от нуля, класса 1 — справа.</div>
<MathBlock formula="p_b(x)=\sigma(bx),\qquad b>0" class="w6-formula text-[35px]" />
<div class="w6-result">При пороге 0,5 метки уже правильные для любого b &gt; 0.</div>
<div class="w6-question">Что будет с вероятностями и log loss, если увеличить b?</div>
</div></div>
</div>


---
clicks: 2
---


<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>

<!-- S34 -->
<SectionChrome section="Elastic Net и классификация" />
# Почему log loss продолжает уменьшаться?

<div class="w6-body">
<div class="w6-equal"><div><WeekSixPlot name="sigmoids" :step="Math.min($clicks,1)" :height="320" alt="sigmoids: последовательное состояние визуального объяснения" /><MathBlock formula="p_b(x)=\sigma(bx),\quad b>0" class="w6-formula text-[28px]" /></div><div><div v-if="$clicks < 2"><div class="w6-question">Для разделимых данных метки уже правильные.<br>Что меняется при росте b?</div></div><div v-else><WeekSixPlot name="logistic-objective" :step="0" :height="320" alt="logistic-objective: последовательное состояние визуального объяснения" /></div></div></div><div class="w6-result" v-click="2">Для разделимых данных растёт уверенность в правильных классах; log loss уменьшается к нулю при b → ∞.</div>
</div>




---
clicks: 2
---


<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>

<!-- S35 -->
<SectionChrome section="Elastic Net и классификация" />
# L2 создаёт конечный минимум

<div class="w6-body">
<div class="w6-split"><WeekSixPlot name="logistic-objective" :step="$clicks" :height="420" alt="logistic-objective: последовательное состояние визуального объяснения" /><div class="w6-stack"><MathBlock formula="J_\lambda^{\mathrm{log}}(b)=R_n^{\mathrm{log}}(b)+\lambda b^2" class="w6-formula text-[30px]" /><div class="w6-note">На рисунке λ = 0,015.</div><div class="w6-question" v-click="1">Log loss уменьшается, но квадратный штраф растёт.</div><div class="w6-result" v-click="2">Оптимальный коэффициент становится конечным.</div></div></div>
</div>




---
clicks: 0
---

<!-- S36 -->
<SectionChrome section="Регуляризация: итог" />
# Регуляризация: что меняется в обучении?

<div class="w6-body">
<div class="w6-split"><table class="w6-plain-table w6-recap-table"><thead><tr><th>Метод</th><th>Штраф</th><th>Типичное действие</th></tr></thead><tbody><tr><td>Ridge</td><td><MathBlock formula="\|\beta\|_2^2" class="w6-formula text-[30px]" /></td><td>Сжатие и стабилизация коэффициентов</td></tr><tr><td>Lasso</td><td><MathBlock formula="\|\beta\|_1" class="w6-formula text-[30px]" /></td><td>Возможность разреженности и отбора признаков</td></tr><tr><td>Elastic Net</td><td>L1 + L2</td><td>Разреженность и совместный вклад связанных признаков</td></tr></tbody></table><div class="w6-stack"><MathBlock formula="J_\lambda=R_n+\lambda\Omega" class="w6-formula text-[36px]" /><div class="w6-question">Тот же принцип добавления штрафа работает и для log loss.</div><div class="w6-result">Сила регуляризации настраивается. Её влияние на новые прогнозы ещё предстоит оценить.</div></div></div>
</div>


---
clicks: 0
---

<!-- S37 -->
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
---

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
</script>

<!-- S38 -->
<SectionChrome section="Кросс-валидация" />
# Одно разбиение: обучаем и оцениваем

<div class="w6-body">
<div class="w6-note">30 объектов из синтетической выборки. Фиксированная процедура: стандартизация по train → Ridge с λ = 1 → MSE на validation.</div>
<WeekSixFolds mode="holdout" :split="0" :step="$clicks" />
<div class="w6-question">Что изменится, если выбрать другие train/validation-объекты?</div>
</div>




---
clicks: 2
---

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
</script>

<!-- S39 -->
<SectionChrome section="Кросс-валидация" />
# Изменили состав частей — обучаем новую модель

<div class="w6-body">
<div class="w6-note">Те же 30 объектов, та же процедура и λ = 1. Изменилось только разбиение; часть объектов поменяла роль.</div>
<WeekSixFolds mode="holdout" :split="1" :step="$clicks" />
<div class="w6-result" v-click="2">Оценка зависит и от обучающих объектов, и от состава отложенной части.</div>
</div>




---
clicks: 0
---

<!-- S40 -->
<SectionChrome section="Кросс-валидация" />
# Кросс-валидация повторяет обучение и проверку

<div class="w6-body">
<div class="w6-question">Кросс-валидация (CV) оценивает процедуру обучения на нескольких разбиениях данных.</div><div class="w6-flow"><div>Текущие train<br>и validation</div><i>→</i><div>Заново обучаем<br>на train</div><i>→</i><div>Оцениваем<br>на validation</div></div><div class="w6-result">Повторяем цикл на других разбиениях и объединяем полученные оценки.</div><div class="w6-question">Пока фиксируем модель, настройки, преобразования и метрику. Каждый проход даёт отдельную обученную модель.</div>
</div>


---
clicks: 2
---

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
</script>

<!-- S41 -->
<SectionChrome section="Кросс-валидация" />
# K-fold: от исходных данных к фолдам внутри dev

<div class="w6-body">
<WeekSixFolds mode="assemble" :step="$clicks" />
<div class="w6-note">Из 100 объектов 20 отложены для финального test, остальные 80 — для разработки и CV. При K = 5 каждый dev-объект проверяем ровно один раз.</div>
</div>




---
clicks: 3
---

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
</script>

<!-- S42 -->
<SectionChrome section="Кросс-валидация" />
# Другой validation-фолд — другая обученная модель

<div class="w6-body">
<WeekSixFolds mode="cycle" :step="$clicks" />
<div class="w6-question">Когда F₂ становится validation, F₁ возвращается в train. Обучающая часть меняется — коэффициенты находим заново.</div>
</div>




---
clicks: 5
---

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
</script>

<!-- S43 -->
<SectionChrome section="Кросс-валидация" />
# Пять моделей, пять ошибок, одно среднее

<div class="w6-body">
<WeekSixFolds mode="all" :step="$clicks" />
</div>




---
clicks: 0
---

<!-- S44 -->
<SectionChrome section="Кросс-валидация" />
# CV-оценка относится к процедуре обучения

<div class="w6-body">
<div class="w6-equal"><div class="w6-stack"><div class="w6-header">Пять проходов CV</div><div class="w6-question">Каждая модель: 64 train → 16 validation.</div><MathBlock formula="\mathrm{CV\text{-}MSE}=4.6" class="w6-formula text-[38px]" /><div class="w6-note">Средняя отложенная ошибка пяти моделей при этих разбиениях.</div></div><div class="w6-stack"><div class="w6-header">Одна итоговая модель</div><div class="w6-question">Заново обучим на всех 80 dev-объектах.</div><div class="w6-note">Её параметры и размер обучения отличаются от CV-моделей. Для проверки выбранного решения сохранён test.</div></div></div><div class="w6-result">Мы оценили работу заданного способа обучения на 64 объектах, а не одну окончательную модель на 80.</div><div class="w6-note">Обучающие части пересекаются; пять ошибок не являются независимыми экспериментами.</div>
</div>


---
clicks: 0
---

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
</script>

<!-- S45 -->
<SectionChrome section="Кросс-валидация" />
# K-fold и ShuffleSplit: как меняется состав проверки

<div class="w6-body">
<WeekSixFolds mode="schemes" :pair="0" />
<div class="w6-note">96 объектов; на каждом из четырёх проходов 24 объекта используются для валидации.</div>
</div>




---
clicks: 0
---

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
</script>

<!-- S46 -->
<SectionChrome section="Кросс-валидация" />
# Стратификация и группы отвечают разным задачам

<div class="w6-body">
<WeekSixFolds mode="schemes" :pair="1" />
</div>




---
clicks: 0
---

<!-- S47 -->
<SectionChrome section="Кросс-валидация: итог" />
# Кросс-валидация: повторяем и объединяем оценки

<div class="w6-body">
<ul class="w6-recap-list">
<li>На каждом проходе заново обучаем модель, включая преобразования, по текущему train.</li>
<li>Проверяем на объектах, которые не участвовали в этом обучении.</li>
<li>Объединяем оценки; схему разбиений выбираем под будущие новые объекты.</li>
<li>CV оценивает фиксированную процедуру и позволяет сравнивать несколько вариантов.</li>
</ul>
<div class="w6-note">Leave-one-out: K = n; каждый раз проверяем один объект, обучаем на остальных. Нужно n обучений.</div>
<div class="w6-result">Теперь применим уже изученную CV для выбора настройки модели.</div>
</div>


---
clicks: 1
---


<!-- S48 -->
<SectionChrome section="Выбор гиперпараметров" />
# Параметры и гиперпараметры

<div class="w6-body">
<div class="w6-equal"><div class="w6-stack"><MathBlock formula="\hat\beta_0,\ \hat\beta" class="w6-formula text-[50px]" /><div class="w6-question">Параметры</div><div class="w6-note">Находятся по данным внутри конкретного обучения.</div></div><div class="w6-stack" v-click="1"><MathBlock formula="\lambda,\ \rho" class="w6-formula text-[50px]" /><div class="w6-question">Гиперпараметры</div><div class="w6-note">Задаются до обучения; сравниваем процедуры с разными настройками.</div></div></div>
</div>




---
clicks: 1
---

<script setup>
import WeekSixTable from './components/WeekSixTable.vue'
</script>

<!-- S49 -->
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
---

<!-- S50 -->
<SectionChrome section="Выбор гиперпараметров" />
# CV-подбор Ridge: один набор данных и общие фолды

<div class="w6-body">
<div class="w6-question">Рассмотрим новый эксперимент: 150 объектов для разработки, 60 взаимосвязанных признаков и зашумлённая целевая переменная.</div><MathBlock formula="\Lambda=\{0.0001,\ 0.001,\ 0.01,\ 0.1,\ 1,\ 10,\ 100\}" class="w6-formula text-[37px]" /><div class="w6-five-parts"><div v-for="j in 5" :key="j"><MathBlock :formula="'F_'+j" class="w6-formula text-[32px]" /><span>30 объектов</span></div></div><div class="w6-question">Для каждого λ: пять новых моделей, 120 train / 30 validation на проходе. Для всех кандидатов используем одни и те же фолды.</div><div class="w6-note">Средние и стандартные отклонения признаков оцениваем отдельно на train каждого прохода.</div>
</div>




---
clicks: 5
---

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
import WeekSixTable from './components/WeekSixTable.vue'
</script>

<!-- S51 -->
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
---

<script setup>
import WeekSixFolds from './components/WeekSixFolds.vue'
import WeekSixTable from './components/WeekSixTable.vue'
</script>

<!-- S52 -->
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
---

<script setup>
import WeekSixTable from './components/WeekSixTable.vue'
</script>

<!-- S53 -->
<SectionChrome section="Выбор гиперпараметров" />
# Полная таблица: сравниваем средние семи кандидатов

<div class="w6-body">
<WeekSixTable mode="cv-complete" :step="$clicks" />
<div class="w6-note">Каждая ячейка — валидационная ошибка. Фолды в столбцах одинаковы для всех λ; среднее в строке — CV-MSE.</div>
<div class="w6-result" v-click="1">Наименьшая средняя ошибка: λ = 1, CV-MSE = 2,339.</div>
</div>


---
clicks: 2
---


<script setup>
import WeekSixPlot from './components/WeekSixPlot.vue'
</script>

<!-- S54 -->
<SectionChrome section="Выбор гиперпараметров" />
# Кривая CV — те же средние из таблицы

<div class="w6-body">
<WeekSixPlot name="cv-curve" :step="$clicks" :height="400" alt="cv-curve: последовательное состояние визуального объяснения" /><div class="w6-result" v-click="2">λ = 1 — лучший из семи проверенных кандидатов на этих данных.</div>
</div>




---
clicks: 2
---


<!-- S55 -->
<SectionChrome section="Выбор гиперпараметров" />
# Откуда берутся значения сетки?

<div class="w6-body">
<MathBlock formula="\lambda\ge0" class="w6-formula " /><MathBlock formula="\Lambda=\{10^{-4},10^{-3},10^{-2},10^{-1},1,10,10^2\}" class="w6-formula text-[38px]" /><div class="w6-question">Логарифмическая сетка покрывает несколько порядков величины.</div><div class="w6-result" v-click="1">Минимум на краю → расширяем диапазон.</div><div class="w6-result" v-click="2">При необходимости уточняем сетку рядом с лучшим кандидатом.</div><div class="w6-note">Универсального полезного диапазона λ нет.</div>
</div>




---
clicks: 1
---


<script setup>
import WeekSixTable from './components/WeekSixTable.vue'
</script>

<!-- S56 -->
<SectionChrome section="Выбор гиперпараметров" />
# Поиск по сетке с двумя настройками

<div class="w6-body">
<WeekSixTable mode="two-grid" :step="$clicks" /><MathBlock formula="3\cdot2=6\text{ комбинаций};\qquad6\cdot5=30\text{ обучений}" class="w6-formula " v-click="1" /><div class="w6-note" v-click="1">Для каждой комбинации заново проводим CV. GridSearchCV автоматизирует этот перебор.</div>
</div>




---
clicks: 0
---

<!-- S57 -->
<SectionChrome section="Выбор гиперпараметров" />
# 35 обучений для выбора — и новое обучение после него

<div class="w6-body">
<div class="w6-equal w6-refit-summary"><div><div class="w6-header">Выбор: 7 значений λ × 5 фолдов</div><div class="w6-large-number">35 обучений</div><div class="w6-question">Сравниваем CV-MSE.<br>Выбираем λ = 1.</div></div><div><div class="w6-header">Окончательное обучение — refit</div><div class="w6-large-number">1 новая модель</div><div class="w6-question">Обучаем стандартизатор и Ridge при <MathBlock formula="\lambda=1" :display="false" class="inline-block" /> на всех 150 dev.</div></div></div>
<div class="w6-note">Пять CV-моделей выбранного λ дали среднюю ошибку 2,339. Их коэффициенты не объединяем: итоговую модель обучаем заново.</div>
</div>


---
clicks: 1
---

<!-- S58 -->
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
---

<!-- S59 -->
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
<div class="w6-note">CV-MSE использована для выбора λ. Финальный test отдельно проверяет уже зафиксированное решение.</div>
</div>




---
clicks: 0
---

<!-- S60 -->
<SectionChrome section="Регуляризация и CV: итог" />
# Что мы научились делать?

<div class="w6-body">
<div class="w6-equal w6-closing"><div><div class="w6-header">Регуляризация</div><ul><li>Менять выбор коэффициентов с помощью ограничения или штрафа.</li><li>Использовать Ridge для сжатия и устойчивости, Lasso — для разреженности, Elastic Net — для сочетания этих свойств.</li></ul></div><div><div class="w6-header">Кросс-валидация</div><ul><li>Заново обучать и оценивать процедуру на нескольких разбиениях.</li><li>Сравнивать настройки по средней отложенной ошибке, обучая преобразования внутри каждого train.</li></ul></div></div>
<div class="w6-result">После выбора заново обучаем на всех dev и один раз проверяем на независимом test.</div>
</div>
