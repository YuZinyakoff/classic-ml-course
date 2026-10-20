---
theme: default
title: "Бинарная классификация: вероятность, метрики и решение"
author: НИУ ВШЭ
info: |
  Неделя 3 магистерского курса. Логистическая регрессия, метрики и решение.
colorSchema: light
highlighter: shiki
lineNumbers: false
aspectRatio: 16/9
canvasWidth: 1280
routerMode: hash
remoteAssets: false
favicon: /assets/favicon.svg
fonts:
  provider: none
  sans: Segoe UI, Arial, sans-serif
  mono: Cascadia Code, Consolas, monospace
defaults:
  layout: default
  transition: fade
  class: text-[24px] relative
exportFilename: masters-2026-week-03
download: false
duration: 90min
---

<!-- S01 -->

<SectionChrome section="Логистическая модель" />
# Бинарная классификация: вероятность, метрики и решение


<div class="section-kicker mt-5">Классическое машинное обучение · Магистратура · Неделя 3</div>
<div class="lead mt-9">Модель оценивает риск мошенничества.<br>Как использовать прогноз и как проверить качество?</div>
<div class="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1.2fr] gap-5 items-center mt-14 text-center text-[29px]">
<div class="plain-label py-8">score</div><b>→</b><div class="plain-label py-8">вероятность</div><b>→</b><div class="plain-label py-8">решение</div><b>→</b><div class="plain-label py-8">оценка качества</div>
</div>
<div class="micro mt-12">Сквозной пример: направить транзакцию на дополнительную проверку.</div>

---

<!-- S02 -->

<SectionChrome section="Логистическая модель" />
# Бинарная классификация: что прогнозируем?


<div class="grid grid-cols-2 gap-14 items-center mt-12">
<div><div class="section-label">Объект — транзакция</div><MathBlock formula="x=(x_1,\ldots,x_d)" class="text-[37px] mt-8" /><div class="lead mt-8">Признаки известны<br>к моменту прогноза.</div></div>
<div><MathBlock formula="Y\in\{0,1\}" class="text-[44px]" /><div class="lead mt-8">0 — обычная операция;<br>1 — мошенническая операция.</div></div></div>
<div class="formula-box mt-12 py-6"><MathBlock formula="p(x)=P(Y=1\mid X=x)" class="text-[37px]" /></div>
<div class="lead mt-7 text-center">Оцениваем вероятность положительного класса,<br>чтобы затем выбрать действие.</div>

---

<!-- S03 -->

<SectionChrome section="Логистическая модель" />
# При одинаковых признаках прогнозируем одно число


<div class="text-[25px] mt-7">Мысленный эксперимент: фиксируем один вектор признаков <i>X=x</i>.<br>Все 10 объектов получают один и тот же прогноз <i>c</i>.</div>
<div class="grid grid-cols-[1.1fr_0.9fr] gap-10 items-center mt-7">
<div><img src="/assets/week-04/binary-mean-example.svg" alt="Десять бинарных ответов: три единицы и семь нулей, среднее 0.3" class="figure h-[250px]" /></div>
<div><div class="section-label">Минимизируем сумму квадратов</div><MathBlock formula="\widehat c=\arg\min_c\sum_{i=1}^{10}(y_i-c)^2" class="text-[29px] mt-6" /><div class="formula-box mt-7 py-5"><MathBlock formula="\widehat c=\bar y=\frac3{10}=0.3" class="text-[35px]" /></div></div></div>
<div class="lead mt-5">0.3 — наблюдаемая доля положительного класса.<br>Истинная вероятность при этих признаках неизвестна; доля помогает её оценить.</div>

---

<!-- S04 -->

<SectionChrome section="Логистическая модель" />
# Линейная модель вероятности: модель и обучение


<div class="grid grid-cols-2 gap-14 mt-8 items-start">
<div><div class="section-label">Модель</div><MathBlock formula="p_\beta(x)=\beta_0+x^\top\beta" class="text-[34px] mt-10" /><div class="lead mt-10">Линейно приближаем<br>вероятность класса 1.</div></div>
<div><div class="section-label">Оценивание МНК</div><MathBlock formula="(\widehat\beta_0,\widehat\beta)\in\arg\min_{\beta_0,\beta}R_n" class="text-[29px] mt-10" /><MathBlock formula="R_n=\frac1n\sum_i(y_i-\beta_0-x_i^\top\beta)^2" class="text-[27px] mt-8" /></div></div>
<div class="success-line mt-8 text-[26px]">МНК нацелен на условное среднее. Для бинарного ответа:</div>
<MathBlock formula="\begin{aligned}\mathbb E[Y\mid X=x]&=0\cdot P(Y=0\mid X=x)+1\cdot P(Y=1\mid X=x)\\&=P(Y=1\mid X=x).\end{aligned}" class="text-[28px] mt-5" />
<div class="micro mt-6">Наблюдаем ответы yᵢ ∈ {0, 1}, а не готовые вероятности.</div>

---

<!-- S05 -->

<SectionChrome section="Логистическая модель" />
# Линейная вероятность может выйти за [0, 1]

<div class="grid grid-cols-[1.28fr_0.72fr] gap-8 items-center mt-0">
  <img src="/assets/week-04/lpm-vs-logistic-probabilities.svg" alt="Линейная модель вероятности на бинарных наблюдениях" class="figure h-[440px]" />
  <div>
    <MathBlock formula="\hat p(x)<0" class="warning-line text-[31px]" />
    <MathBlock formula="\hat p(x)>1" class="warning-line mt-8 text-[31px]" />
    <div class="success-line mt-8 text-[20px]">МНК находит лучшую линейную аппроксимацию; её коэффициенты и локальное поведение могут быть полезны.</div>
    <div class="micro mt-6 text-[18px]">Ограничение задаёт глобальная прямая: за пределами [0, 1] её прогнозы теряют вероятностный смысл.</div>
  </div>
</div>

---

<!-- S06 -->

<SectionChrome section="Логистическая модель" />
# Хотим сохранить линейный score, но не саму вероятность

<div class="grid grid-cols-[1.08fr_0.92fr] gap-8 items-center mt-2">
  <img src="/assets/week-04/probability-score-ranges.svg" alt="Шкалы линейного score и вероятности" class="figure h-[360px]" />
  <div>
    <MathBlock formula="z(x)=\beta_0+x^\top\beta\in\mathbb R" class="text-[29px]" />
    <MathBlock formula="p(x)\in[0,1]" class="mt-9 text-[31px]" />
    <div class="lecture-question mt-12">Как связать всю числовую прямую с вероятностью?</div>
  </div>
</div>



---

<!-- S07 -->

<SectionChrome section="Логистическая модель" />
# Odds: 20 событий на 80 несобытий

<div class="grid grid-cols-[1.05fr_0.95fr] gap-14 items-center mt-12">
  <div>
    <div class="flex items-end gap-3 h-[190px]">
      <div class="bg-blue-100 border-t-4 border-blue-600 w-1/2 h-[70px] grid place-items-center text-[28px] text-blue-700">20 событий</div>
      <div class="bg-green-100 border-t-4 border-green-700 w-1/2 h-[170px] grid place-items-center text-[28px] text-green-800">80 несобытий</div>
    </div>
    <div class="text-center text-[31px] mt-8">20 : 80 = 1 : 4</div>
  </div>
  <div class="text-center">
    <MathBlock formula="p=20/100=0.2" class="text-[34px]" />
    <MathBlock formula="\operatorname{odds}(p)=\frac{p}{1-p}=\frac14" class="mt-12 text-[34px]" />
    <div class="micro mt-8">odds — шансы: отношение событий к несобытиям.</div>
  </div>
</div>

---

<!-- S08 -->

<SectionChrome section="Логистическая модель" />
# Примеры odds при разных вероятностях

<table class="comparison-table mt-12 text-[27px]">
  <thead><tr><th>Вероятность p</th><th>События : несобытия</th><th>odds</th></tr></thead>
  <tbody>
    <tr><td>0.2</td><td>20 : 80</td><td>1 : 4</td></tr>
    <tr><td>0.5</td><td>50 : 50</td><td>1 : 1</td></tr>
    <tr><td>0.8</td><td>80 : 20</td><td>4 : 1</td></tr>
  </tbody>
</table>

<div class="formula-box mt-8 py-4"><MathBlock formula="0<p<1\quad\Longrightarrow\quad\operatorname{odds}(p)\in(0,+\infty)" class="text-[29px]" /></div>

<div class="grid grid-cols-2 gap-8 mt-6 text-center">
  <div class="plain-label"><MathBlock formula="p=0\Rightarrow\operatorname{odds}(p)=0" class="text-[22px]" /></div>
  <div class="plain-label"><MathBlock formula="p\to1\Rightarrow\operatorname{odds}(p)\to+\infty" class="text-[22px]" /></div>
</div>

<div class="micro text-center mt-5 text-[20px]">Вероятность вообще: <MathBlock formula="p\in[0,1]" :display="false" class="inline-block text-[20px]" />. Для перехода к logit рассматриваем <MathBlock formula="0<p<1" :display="false" class="inline-block text-[20px]" />.</div>

---

<!-- S09 -->

<SectionChrome section="Логистическая модель" />
# Логарифм шансов даёт вещественную шкалу


<div class="grid grid-cols-[0.95fr_1.05fr] gap-12 mt-9 items-center">
<div><MathBlock formula="\operatorname{logit}(p)=\log\frac p{1-p}" class="text-[36px]" /><MathBlock formula="0<p<1" class="text-[29px] mt-5" /><div class="micro mt-5">Здесь и далее log — натуральный логарифм.</div><MathBlock formula="(0,1)\xrightarrow{\mathrm{odds}}(0,+\infty)\xrightarrow{\log}\mathbb R" class="text-[27px] mt-8" /></div>
<table class="comparison-table text-[26px]"><thead><tr><th>p</th><th>odds</th><th>logit</th></tr></thead><tbody><tr><td>0.2</td><td>1 : 4</td><td>−1.386</td></tr><tr><td>0.5</td><td>1 : 1</td><td>0</td></tr><tr><td>0.8</td><td>4 : 1</td><td>1.386</td></tr></tbody></table></div>
<div class="lead mt-10 text-center">Логит переводит вероятность из (0, 1) на всю вещественную прямую.</div>

---

<!-- S10 -->

<SectionChrome section="Логистическая модель" />
# Сигмоида возвращает score на шкалу вероятности


<MathBlock  formula="e^z=\frac p{1-p}\ \Longrightarrow\ e^z(1-p)=p\ \Longrightarrow\ p=\frac1{1+e^{-z}}" class="text-[28px] mt-3" />
<div class="grid grid-cols-[1.3fr_0.7fr] gap-8 items-center mt-5"><div><img src="/assets/week-04/sigmoid-and-score.svg" alt="Сигмоида: конечный score задаёт вероятность строго между нулём и единицей" class="figure h-[345px]" /></div><div>
<MathBlock  formula="\sigma:\mathbb R\to(0,1)" class="text-[31px]" /><MathBlock  formula="\sigma(0)=0.5" class="text-[30px] mt-6" />
<div class="lead mt-7">Строго возрастает:<br>порядок объектов сохраняется.</div></div></div>
<div class="micro mt-4">При z → −∞ вероятность стремится к 0; при z → +∞ — к 1.</div>

---

<!-- S11 -->

<SectionChrome section="Логистическая модель" />
# Логистическая регрессия: определение модели


<MathBlock formula="\operatorname{logit}\bigl(p_\beta(x)\bigr)=\beta_0+x^\top\beta" class="text-[35px] mt-10" />
<div class="grid grid-cols-2 gap-12 mt-12">
<div><div class="section-label">Линейный score</div><MathBlock formula="z_\beta(x)=\beta_0+x^\top\beta\in\mathbb R" class="text-[30px] mt-9" /></div>
<div><div class="section-label">Вероятность</div><MathBlock formula="p_\beta(x)=\sigma\bigl(z_\beta(x)\bigr)\in(0,1)" class="text-[30px] mt-9" /></div></div>
<div class="formula-box mt-12 py-7"><MathBlock formula="x\longrightarrow z_\beta(x)\longrightarrow p_\beta(x)" class="text-[37px]" /></div>
<div class="lead text-center mt-8">Коэффициенты задают score.<br>Сигмоида превращает его в вероятностный прогноз.</div>

---
clicks: 2
---

<!-- S12 -->

<SectionChrome section="Логистическая модель" />
# Коэффициент задаёт множитель шансов


<div class="text-[25px] mt-7">Увеличиваем один признак на 1, остальные фиксируем.</div>
<MathBlock  formula="\log\operatorname{odds}_{\rm new}-\log\operatorname{odds}_{\rm old}=\beta_j" class="text-[32px] mt-9" />
<div v-click="1" class="formula-box mt-9 py-6"><MathBlock  formula="\frac{\operatorname{odds}_{\rm new}}{\operatorname{odds}_{\rm old}}=e^{\beta_j}" class="text-[38px]" /></div>
<div v-click="2" class="grid grid-cols-2 gap-12 mt-9 items-center"><div><MathBlock  formula="\beta_j=\log2\quad\Rightarrow\quad\mathrm{odds}\times2" class="text-[29px]" /></div><div><MathBlock  formula="p:\quad0.20\longrightarrow\frac13" class="text-[32px]" /><div class="micro mt-4">Вероятность меняется нелинейно: получаем не 0.4.</div></div></div>

---

<!-- S13 -->

<SectionChrome section="Логистическая модель" />
# Семейство прогнозов задано; коэффициенты неизвестны


<div class="formula-box mt-9 py-8"><MathBlock  formula="p_\beta(x)=\sigma\bigl(\beta_0+x^\top\beta\bigr)" class="text-[40px]" /></div>
<div class="grid grid-cols-3 gap-12 mt-12 text-[27px]"><div><div class="section-label">Модель</div><div class="mt-6">Линейный score<br>и сигмоида.</div></div><div><div class="section-label">Целевая функция</div><div class="mt-6">Что считать хорошими<br>коэффициентами?</div></div><div><div class="section-label">Оптимизатор</div><div class="mt-6">Как найти<br>эти коэффициенты?</div></div></div>
<div class="lecture-question mt-12">Как выбрать параметры по наблюдённым ответам 0 и 1?</div>

---
clicks: 1
---

<!-- S14 -->

<SectionChrome section="Функция потерь и обучение" />
# Распределение Бернулли: два исхода и их вероятности


<MathBlock formula="Y_i\mid X_i=x_i\sim\mathrm{Bernoulli}(p_i)" class="text-[35px] mt-10" />
<div class="grid grid-cols-2 gap-12 mt-12 text-center">
<div class="plain-label py-8"><div class="lead">Мошенническая операция</div><MathBlock formula="P(Y_i=1\mid x_i)=p_i" class="text-[33px] mt-8" /></div>
<div class="plain-label py-8"><div class="lead">Обычная операция</div><MathBlock formula="P(Y_i=0\mid x_i)=1-p_i" class="text-[33px] mt-8" /></div></div>
<div v-click="1" class="lead mt-10"><MathBlock formula="p_i=p_\beta(x_i)" :display="false" class="inline-block" /> — прогноз логистической модели для этого объекта.</div>
<div class="micro mt-7">Bernoulli допускает p ∈ [0, 1]; при конечном score наша модель выдаёт pᵢ ∈ (0, 1).</div>

---
clicks: 1
---

<!-- S15 -->

<SectionChrome section="Функция потерь и обучение" />
# Оба исхода записываются одной формулой


<div class="grid grid-cols-2 gap-12 mt-12">
<div class="plain-label py-7"><MathBlock formula="y_i=1:\quad p_i^1(1-p_i)^0=p_i" class="text-[29px]" /></div>
<div class="plain-label py-7"><MathBlock formula="y_i=0:\quad p_i^0(1-p_i)^1=1-p_i" class="text-[29px]" /></div></div>
<div v-click="1" class="formula-box mt-12 py-8"><MathBlock formula="P_\beta(Y_i=y_i\mid x_i)=p_i^{y_i}(1-p_i)^{1-y_i}" class="text-[35px]" /></div>
<div v-click="1" class="lead text-center mt-10">Наблюдённая метка выбирает нужную вероятность.</div>
<div class="micro mt-10">Далее для краткости включаем свободный член в β, а единицу — в xᵢ: zᵢ = xᵢᵀβ.</div>

---
clicks: 1
---

<!-- S16 -->

<SectionChrome section="Функция потерь и обучение" />
# Независимые ответы дают произведение вероятностей


<div class="lead mt-8">При заданных признаках и параметрах считаем<br>ответы объектов условно независимыми.</div>
<MathBlock formula="\mathcal L(\beta;D)=\prod_{i=1}^n p_i^{y_i}(1-p_i)^{1-y_i}" class="text-[37px] mt-10" />
<div class="grid grid-cols-2 gap-12 mt-12 items-center"><div><div class="section-label">Два наблюдённых ответа</div><MathBlock formula="y=(1,0),\quad p=(0.8,0.3)" class="text-[29px] mt-8" /></div><div v-click="1"><MathBlock formula="\mathcal L=0.8\cdot(1-0.3)=0.56" class="text-[33px]" /></div></div>
<div v-click="1" class="lead mt-10">Ответы и признаки зафиксированы.<br>Меняя β, меняем вероятности этих ответов.</div>

---
clicks: 2
---

<!-- S17 -->

<SectionChrome section="Функция потерь и обучение" />
# Выбираем параметры по правдоподобию ответов


<div class="lead mt-5">Те же ответы y = (1, 0). Две гипотетические настройки модели:</div>
<table class="comparison-table text-[27px] mt-6"><thead><tr><th>Настройка</th><th>p₁</th><th>p₂</th><th>Вероятность ответов (1, 0)</th></tr></thead>
<tbody><tr><td>A</td><td>0.8</td><td>0.3</td><td>0.8 × 0.7 = 0.56</td></tr><tr v-click="1"><td>B</td><td>0.6</td><td>0.4</td><td>0.6 × 0.6 = 0.36</td></tr></tbody></table>
<div v-click="2" class="formula-box mt-6 py-5"><MathBlock formula="\widehat\beta_{\mathrm{MLE}}\in\arg\max_\beta\mathcal L(\beta;D)" class="text-[36px]" /></div>
<div v-click="2" class="lead text-center mt-6">Параметры выбираем по максимальному правдоподобию.</div>
<div class="micro mt-4">Правдоподобие — функция параметров, а не вероятность самих параметров.</div>

---

<!-- S18 -->

<SectionChrome section="Функция потерь и обучение" />
# Логарифм превращает произведение в сумму

<div class="proof-stack mt-8 text-center">
  <MathBlock formula="\log\mathcal L(\beta)=\sum_i\log\!\left[p_i^{y_i}(1-p_i)^{1-y_i}\right]" class="text-[31px]" />
  <div class="text-[28px] text-slate-400">↓ степени становятся множителями</div>
  <MathBlock formula="=\sum_i\left[y_i\log p_i+(1-y_i)\log(1-p_i)\right]" class="proof-result py-6 text-[33px]" />
</div>

<div class="success-line text-center mt-12">Логарифм монотонен: положение максимума likelihood не меняется.</div>

---
clicks: 1
---

<!-- S19 -->

<SectionChrome section="Функция потерь и обучение" />
# Из максимума правдоподобия получаем среднюю log loss


<div class="grid grid-cols-2 gap-12 mt-7"><div class="plain-label py-5"><div class="section-label">Меняем знак</div><MathBlock  formula="\max\log\mathcal L\ \Longleftrightarrow\ \min(-\log\mathcal L)" class="text-[28px] mt-5" /></div><div class="plain-label py-5"><div class="section-label">Делим на n > 0</div><MathBlock  formula="R_n(\beta)=-\frac1n\log\mathcal L(\beta;D)" class="text-[29px] mt-5" /></div></div>
<div v-click="1" class="formula-box mt-8 py-6"><MathBlock  formula="L(y,p)=-y\log p-\bigl(1-y\bigr)\log(1-p),\quad0<p<1" class="text-[31px]" /></div>
<MathBlock v-click="1" formula="R_n(\beta)=\frac1n\sum_{i=1}^n L(y_i,p_i)" class="text-[35px] mt-8" />
<div class="micro mt-6">Смена знака заменяет максимум минимумом; положительный множитель не меняет положение минимума.</div>

---

<!-- S20 -->

<SectionChrome section="Функция потерь и обучение" />
# Уверенная ошибка стоит дорого

<div class="grid grid-cols-[1.25fr_0.75fr] gap-8 items-center mt-0">
  <div>
    <MathBlock formula="y=1:\qquad L(1,p)=-\log p" class="text-[27px]" />
    <img src="/assets/week-04/log-loss-confidence.svg" alt="Log loss для положительного объекта" class="figure h-[390px] mt-1" />
  </div>
  <div>
    <div class="plain-label"><MathBlock formula="p=0.9\Rightarrow L\approx0.105" class="text-[21px]" /></div>
    <div class="plain-label mt-6"><MathBlock formula="p=0.5\Rightarrow L\approx0.693" class="text-[21px]" /></div>
    <div class="warning-line mt-6"><MathBlock formula="p=0.01\Rightarrow L\approx4.605" class="text-[21px]" /></div>
    <div class="micro mt-10">Для y = 0 картина зеркальна.</div>
  </div>
</div>

---

<!-- S21 -->

<SectionChrome section="Функция потерь и обучение" />
# Log loss поощряет верную вероятностную шкалу


<div class="grid grid-cols-[1fr_1fr] gap-12 items-center mt-8">
<div><MathBlock formula="q=P(Y=1\mid X=x)" class="text-[30px]" /><div class="lead mt-6">q — истинная вероятность.<br>p ∈ (0, 1) — прогноз, который выбираем.</div>
<div class="text-[25px] mt-8">При повторении условий X = x:<br>исход 1 встречается с вероятностью q,<br>исход 0 — с вероятностью 1 − q.</div></div>
<img src="/assets/masters-week-03/expected-log-loss-compact.svg" class="figure h-[300px]" alt="При q = 0.2 ожидаемая log loss минимальна в p = 0.2" /></div>
<MathBlock formula="\Phi(p)=qL(1,p)+(1-q)L(0,p)" class="text-[31px] mt-8" />
<div class="success-line text-center mt-8"><MathBlock formula="0<q<1:\qquad\arg\min_{p\in(0,1)}\Phi(p)=q" class="text-[32px]" /></div>
<div class="micro mt-3">Это свойство ожидаемой потери; конечная обученная модель может ошибаться в вероятностях.</div>

---
clicks: 1
---

<!-- S22 -->

<SectionChrome section="Функция потерь и обучение" />
# Средний градиент и знакомый шаг спуска


<div class="text-[24px] mt-7">X — матрица признаков со столбцом единиц; <MathBlock formula="p=\sigma(X\beta)" :display="false" class="inline-block text-[28px]" />.</div>
<div class="formula-box mt-8 py-7"><MathBlock formula="\nabla_\beta R_n(\beta)=\frac1nX^\top(p-y)" class="text-[39px]" /></div>
<div class="grid grid-cols-2 gap-12 mt-7 text-[26px]"><div>p − y: ошибки вероятностных прогнозов<br>на обучающих объектах.</div><div>Xᵀ собирает вклады ошибок<br>по каждому признаку.</div></div>
<MathBlock v-click="1" formula="\beta^{(t+1)}=\beta^{(t)}-\eta\nabla_\beta R_n\bigl(\beta^{(t)}\bigr)" class="text-[35px] mt-8" />
<div v-click="1" class="lead text-center mt-6">Тот же цикл оптимизации; теперь минимизируем log loss.</div>
<div class="micro mt-5">Подробный вывод градиента приведён в тексте лекции.</div>

---
clicks: 2
---

<!-- S23 -->

<SectionChrome section="Функция потерь и обучение" />
# Один объект: от признаков к вероятности


<div class="micro mt-7">Отдельная учебная иллюстрация: коэффициенты заданы для примера, а не оценены по 12 транзакциям.</div>
<MathBlock formula="\widehat z(x)=-1.5+1.0x_1+0.5x_2" class="text-[37px] mt-10" />
<div class="grid grid-cols-3 gap-10 mt-12 items-start text-center">
<div class="plain-label py-7"><div class="section-label">Признаки</div><MathBlock formula="x_1=2,\quad x_2=1" class="text-[31px] mt-8" /></div>
<div v-click="1" class="plain-label py-7"><div class="section-label">Score</div><MathBlock formula="\begin{aligned}\widehat z&=-1.5+2+0.5\\&=1\end{aligned}" class="text-[29px] mt-8" /></div>
<div v-click="2" class="plain-label py-7"><div class="section-label">Вероятность</div><MathBlock formula="\widehat p=\sigma(1)\approx0.731" class="text-[29px] mt-8" /></div></div>
<div v-click="2" class="lead text-center mt-12">Модель выдала вероятность.<br>Для действия понадобится правило решения.</div>

---

<!-- S24 -->

<SectionChrome section="Функция потерь и обучение" />
# Таким образом: обучение даёт вероятностную модель


<div class="grid grid-cols-3 gap-12 text-[26px] mt-10">
<div><div class="section-label">Модель</div><div class="mt-7">Линейный score<br>и сигмоида.</div></div>
<div><div class="section-label">Критерий обучения</div><div class="mt-7">Bernoulli → правдоподобие<br>→ средняя log loss.</div></div>
<div><div class="section-label">Оптимизатор</div><div class="mt-7">Находит коэффициенты β̂,<br>минимизируя критерий.</div></div></div>
<div class="formula-box mt-12 py-8"><MathBlock formula="\widehat\beta\longrightarrow\widehat z(x)=x^\top\widehat\beta\longrightarrow\widehat p(x)=\sigma\bigl(\widehat z(x)\bigr)" class="text-[32px]" /></div>
<div class="lecture-question mt-12">Прогноз готов. Как решим, какие операции отправить на проверку?</div>

---

<!-- S25 -->

<SectionChrome section="Ошибки и метрики" />
# Наш пример: 12 транзакций, вероятности и истинные метки

<div class="grid grid-cols-2 gap-14 mt-8"><table class="comparison-table text-[27px]"><thead><tr><th>ID</th><th>p̂</th><th>y</th></tr></thead><tbody><tr><td style="padding:9px 18px">1</td><td style="padding:9px 18px">0.95</td><td style="padding:9px 18px">1</td></tr><tr><td style="padding:9px 18px">2</td><td style="padding:9px 18px">0.88</td><td style="padding:9px 18px">0</td></tr><tr><td style="padding:9px 18px">3</td><td style="padding:9px 18px">0.82</td><td style="padding:9px 18px">1</td></tr><tr><td style="padding:9px 18px">4</td><td style="padding:9px 18px">0.75</td><td style="padding:9px 18px">1</td></tr><tr><td style="padding:9px 18px">5</td><td style="padding:9px 18px">0.68</td><td style="padding:9px 18px">0</td></tr><tr><td style="padding:9px 18px">6</td><td style="padding:9px 18px">0.61</td><td style="padding:9px 18px">0</td></tr></tbody></table><table class="comparison-table text-[27px]"><thead><tr><th>ID</th><th>p̂</th><th>y</th></tr></thead><tbody><tr><td style="padding:9px 18px">7</td><td style="padding:9px 18px">0.55</td><td style="padding:9px 18px">1</td></tr><tr><td style="padding:9px 18px">8</td><td style="padding:9px 18px">0.48</td><td style="padding:9px 18px">0</td></tr><tr><td style="padding:9px 18px">9</td><td style="padding:9px 18px">0.35</td><td style="padding:9px 18px">1</td></tr><tr><td style="padding:9px 18px">10</td><td style="padding:9px 18px">0.30</td><td style="padding:9px 18px">0</td></tr><tr><td style="padding:9px 18px">11</td><td style="padding:9px 18px">0.18</td><td style="padding:9px 18px">0</td></tr><tr><td style="padding:9px 18px">12</td><td style="padding:9px 18px">0.08</td><td style="padding:9px 18px">0</td></tr></tbody></table></div><div class="lead mt-9">Цель — направить подозрительные операции на дополнительную проверку.</div><div class="micro mt-2">Учебные синтетические данные. Доля 5/12 не типична для реального потока мошенничества.</div>

---
clicks: 2
---

<!-- S26 -->

<SectionChrome section="Ошибки и метрики" />
# Порог превращает вероятность в решение

<MathBlock formula="\hat y_t(x)=\mathbb I[\hat p(x)\ge t],\quad0<t<1" class="text-[34px] mt-8" />
<div class="text-[22px] muted mt-6">Шкала вероятности: 0 → 1</div>
<div class="mt-8"><WeekFiveRankedList layout="scale" :show-truth="false" :threshold="$clicks === 0 ? undefined : $clicks === 1 ? 0.5 : 0.8" /></div>
<div v-click="1" class="lead mt-8 text-center">Ручная проверка и автоматическая блокировка могут требовать разных порогов.</div>

---

<!-- S27 -->

<SectionChrome section="Ошибки и метрики" />
# Порог сдвигает границу решения


<MathBlock  formula="\widehat p(x)\ge t\quad\Longleftrightarrow\quad\widehat z(x)\ge\log\frac t{1-t},\qquad0<t<1" class="text-[31px] mt-5" />
<div class="grid grid-cols-[1.3fr_0.7fr] gap-10 items-center mt-7"><div><img src="/assets/masters-week-03/linear-boundary-threshold.svg" alt="Две параллельные границы одной модели при порогах 0.5 и 0.8" class="figure h-[345px]" /></div><div><div class="section-label">Два признака</div>
<MathBlock  formula="\widehat\beta_0+\widehat\beta_1x_1+\widehat\beta_2x_2=\operatorname{logit}(t)" class="text-[26px] mt-7" /><div class="lead mt-8">Меняем порог —<br>сдвигаем прямую.<br>Коэффициенты фиксированы.</div></div></div>

---
clicks: 2
---

<!-- S28 -->

<SectionChrome section="Ошибки и метрики" />
# Двенадцать транзакций: фиксируем порог 0.5

<div class="mt-8"><WeekFiveRankedList :threshold="$clicks >= 1 ? 0.5 : undefined" /></div>
<div v-click="1" class="lead text-center mt-6">7 объектов получили прогноз класса 1.</div>
<div v-click="2" class="lecture-question text-center mt-6">Как у каждого объекта<br>могут согласоваться прогноз и настоящий класс?</div><div class="micro text-center mt-4">Учебный набор искусственный; высокая доля мошенничества здесь нетипична для реального потока.</div>

---
clicks: 3
---

<!-- S29 -->

<SectionChrome section="Ошибки и метрики" />
# Четыре вида исходов: TN, FP, FN, TP


<div class="grid grid-cols-[540px_1fr] gap-12 mt-9 items-center"><WeekFiveConfusion :show-values="false" /><div class="text-[26px] space-y-6"><div><b>TN:</b> обычную операцию пропустили.</div><div v-click="1"><b>FP:</b> обычную отправили на проверку.</div><div v-click="2"><b>FN:</b> мошенничество пропустили.</div><div v-click="3"><b>TP:</b> мошенничество направили на проверку.</div></div></div>
<div class="micro mt-7">Строки — истинный класс, столбцы — прогноз. Положительный класс 1 означает мошенничество.</div>

---
clicks: 2
---

<!-- S30 -->

<SectionChrome section="Ошибки и метрики" />
# Заполняем матрицу для порога 0.5


<div class="grid grid-cols-[380px_1fr] gap-12 mt-6 items-center"><WeekFiveRankedList layout="vertical" compact :threshold="0.5" show-outcomes /><div><WeekFiveConfusion :show-values="$clicks >= 1" /><div v-click="2" class="mt-6">
<MathBlock  formula="TP+FN=5,\qquad TN+FP=7" class="text-[27px]" /><MathBlock  formula="TP+FP=7,\qquad N=12" class="text-[27px] mt-4" /></div></div></div>

---
clicks: 2
---

<!-- S31 -->

<SectionChrome section="Ошибки и метрики" />
# Accuracy: сколько правильных из всех?

<div class="grid grid-cols-[540px_1fr] gap-10 mt-12 items-center">
  <WeekFiveConfusion focus="accuracy" :stage="$clicks" />
  <div><div v-click="2"><MathBlock formula="Accuracy=\frac{TP+TN}{N}" class="text-[32px]" /><MathBlock formula="=\frac8{12}\approx0.667" class="text-[34px] mt-5" /></div><div class="lead mt-8">Знаменатель:<br>все объекты.</div></div>
</div>

---
clicks: 2
---

<!-- S32 -->

<SectionChrome section="Ошибки и метрики" />
# Precision: насколько чиста очередь проверки?

<div class="grid grid-cols-[540px_1fr] gap-10 mt-12 items-center">
  <WeekFiveConfusion focus="precision" :stage="$clicks" />
  <div><MathBlock v-click="2" formula="Precision=\frac{TP}{TP+FP}=\frac47" class="text-[29px]" /><div class="lead mt-12">Среди прогнозов класса 1:<br>какая доля действительно<br>принадлежит классу 1?</div></div>
</div>

---
clicks: 2
---

<!-- S33 -->

<SectionChrome section="Ошибки и метрики" />
# Recall: какую долю мошенничества обнаружили?

<div class="grid grid-cols-[540px_1fr] gap-10 mt-12 items-center">
  <WeekFiveConfusion focus="recall" :stage="$clicks" />
  <div><MathBlock v-click="2" formula="Recall=\frac{TP}{TP+FN}=\frac45" class="text-[30px]" /><div class="lead mt-12">Среди настоящих объектов<br>класса 1: какую долю<br>нашла модель?</div></div>
</div>

---

<!-- S34 -->

<SectionChrome section="Ошибки и метрики" />
# Precision и Recall начинают с разных групп

<div class="grid grid-cols-2 gap-16 mt-14">
  <div><div class="section-label">Начинаем с решения модели</div><MathBlock formula="Precision=\widehat P(Y=1\mid\hat Y=1)" class="text-[28px] mt-12" /><div class="lead mt-12">Насколько чиста<br>выбранная группа?</div></div>
  <div><div class="section-label">Начинаем с настоящего класса</div><MathBlock formula="Recall=\widehat P(\hat Y=1\mid Y=1)" class="text-[28px] mt-12" /><div class="lead mt-12">Какую долю класса 1<br>мы охватили?</div></div>
</div>

---
clicks: 2
---

<!-- S35 -->

<SectionChrome section="Ошибки и метрики" />
# Specificity: Recall для класса 0

<div class="grid grid-cols-[540px_1fr] gap-10 mt-12 items-center">
  <WeekFiveConfusion focus="specificity" :stage="$clicks" />
  <div>
    <MathBlock v-click="2" formula="Specificity=\frac{TN}{TN+FP}=\frac47" class="text-[29px]" />
    <div class="lead mt-12">Какую долю класса 0<br>правильно оставили отрицательной?</div>
    <div class="lead mt-10">Specificity — это Recall класса 0.</div>
  </div>
</div><div class="micro text-center mt-5"><MathBlock :display="false" formula="FPR=1-Specificity" class="inline-block text-[25px]" /></div>

---
clicks: 3
---

<!-- S36 -->

<SectionChrome section="Ошибки и метрики" />
# Одна матрица — четыре вопроса

<div class="grid grid-cols-[540px_1fr] gap-12 mt-12 items-center">
  <WeekFiveConfusion :focus="['accuracy','precision','recall','specificity'][Math.min($clicks,3)]" />
  <div class="space-y-10">
    <div class="section-label">{{ ['Все объекты','Прогноз класса 1','Настоящий класс 1','Настоящий класс 0'][Math.min($clicks,3)] }}</div>
    <div class="text-[36px]">{{ ['Accuracy','Precision','Recall','Specificity'][Math.min($clicks,3)] }}</div>
    <div class="lead">{{ ['Как часто решение верно?','Насколько чиста выбранная группа?','Какую долю положительных нашли?','Какую долю отрицательных не тревожим?'][Math.min($clicks,3)] }}</div>
  </div>
</div>

---
clicks: 1
---

<!-- S37 -->

<SectionChrome section="Ошибки и метрики" />
# F1: гармоническое среднее Precision и Recall


<MathBlock formula="F_1=\frac{2\,Precision\cdot Recall}{Precision+Recall}=\frac{2TP}{2TP+FP+FN}" class="text-[34px] mt-12" />
<div class="grid grid-cols-[480px_1fr] gap-12 items-center mt-8"><WeekFiveConfusion />
<div><MathBlock formula="TP=4,\quad FP=3,\quad FN=1" class="text-[30px]" /><MathBlock v-click="1" formula="F_1=\frac8{8+3+1}=\frac23\approx0.667" class="text-[33px] mt-10" /></div></div>
<div v-click="1" class="micro mt-3">F1 объединяет две доли. Стоимость ошибок и ресурс проверки задаём отдельно.</div>

---
clicks: 2
---

<!-- S38 -->

<SectionChrome section="Ошибки и метрики" />
# Как параметр F-меры меняет приоритет

<MathBlock formula="F_\beta=\frac{(1+\beta^2)\,Precision\cdot Recall}{\beta^2Precision+Recall}" class="text-[33px] mt-6" />
<MathBlock formula="Precision=0.9,\qquad Recall=0.1" class="text-[30px] mt-8" />
<div class="grid grid-cols-3 gap-12 mt-10 text-center">
  <div><MathBlock formula="F_{0.5}\approx0.346" class="text-[30px]" /><div v-click="1" class="text-[25px] mt-6">При <MathBlock formula="\beta<1" :display="false" class="inline-block" /><br>важнее Precision.</div></div>
  <div><MathBlock formula="F_1=0.18" class="text-[30px]" /><div v-click="1" class="text-[25px] mt-6">При <MathBlock formula="\beta=1" :display="false" class="inline-block" /><br>равные приоритеты.</div></div>
  <div><MathBlock formula="F_2\approx0.122" class="text-[30px]" /><div v-click="1" class="text-[25px] mt-6">При <MathBlock formula="\beta>1" :display="false" class="inline-block" /><br>важнее Recall.</div></div>
</div>
<div v-click="2" class="lead text-center mt-10">Меняя <MathBlock formula="\beta" :display="false" class="inline-block" />, по-разному объединяем те же Precision и Recall.</div>
<div v-click="2" class="text-[24px] mt-3">β здесь — параметр F-меры, не коэффициенты модели. Приоритет не задаёт стоимость FP/FN: <MathBlock formula="\beta=2" :display="false" class="inline-block" /> не означает, что пропуск вдвое дороже.</div>

---
clicks: 3
---

<!-- S39 -->

<SectionChrome section="Ошибки и метрики" />
# Проверим решение на редком классе

<div class="grid grid-cols-[540px_1fr] gap-12 mt-10 items-center">
  <div v-if="$clicks === 0" class="space-y-8 lead"><div>Отдельный пример:<br>10 000 операций.</div><div>Класс 1 составляет 1%.</div><div>Всем предсказываем класс 0.</div><div class="text-[32px]">Какой будет Accuracy?</div></div>
  <WeekFiveConfusion v-else :values="[9900,0,100,0]" />
  <div class="space-y-10 text-[29px]"><div v-click="1">Accuracy = 99%</div><div v-click="2">Recall = 0</div><div v-click="3">Нет прогнозов класса 1:<br>Precision не определён.</div></div>
</div>
<div v-click="3" class="lead mt-10">Accuracy верна, но недостаточна для вопроса «находим ли мы редкий класс?»</div>

---
clicks: 2
---

<!-- S40 -->

<SectionChrome section="Порог и прикладное решение" />
# Скрининг: сначала задаём допустимый пропуск

<div class="grid grid-cols-[1fr_100px_1fr] gap-10 items-center mt-8 text-center">
  <div><div class="section-label">Первый этап</div><div class="lead mt-5">Дешёвый первичный скрининг</div></div><MathBlock formula="\longrightarrow" class="text-[35px]" />
  <div><div class="section-label">Положительный результат</div><div class="lead mt-5">Более точное<br>и дорогое обследование</div></div>
</div>
<div class="text-[30px] text-center mt-10">Какая ошибка опаснее? Какой показатель вы бы контролировали?</div>
<div class="grid grid-cols-2 gap-16 mt-10">
  <div v-click="1"><div class="section-label">FN · пропуск</div><div class="text-[25px] mt-4">Болезнь пропущена.<br>Важен высокий Recall.</div></div>
  <div v-click="2"><div class="section-label">FP · ложная тревога</div><div class="text-[25px] mt-4">Перегружает второй этап, повышает расходы и тревогу.<br>Precision тоже важен.</div></div>
</div>
<div v-click="2" class="text-[25px] mt-5">Например, требуем Recall ≥ 0.98.<br>Среди допустимых порогов оцениваем Precision и нагрузку второго этапа.</div>

---
clicks: 2
---

<!-- S41 -->

<SectionChrome section="Порог и прикладное решение" />
# Антифрод: одна модель, два действия

<div class="grid grid-cols-2 gap-16 mt-12">
  <div><div class="section-label">Автоматическая блокировка</div><div class="lead mt-6">Отклоняем платёж.</div><div v-click="1" class="lead mt-10">FP напрямую вредит<br>невиновному пользователю.</div></div>
  <div><div class="section-label">Ручная проверка</div><div class="lead mt-6">Формируем очередь проверки.</div><div v-click="1" class="lead mt-10">FP расходует время<br>и вместимость очереди.</div></div>
</div>
<div class="lecture-question text-center mt-12">Нужны ли здесь одинаковые порог<br>и основная метрика?</div>
<div v-click="2" class="lead text-center mt-10">Последствия ошибок и ограничения различаются —<br>требования к решению тоже будут разными.</div>

---
clicks: 1
---

<!-- S42 -->

<SectionChrome section="Порог и прикладное решение" />
# Лимит проверки: не более 50 из 200


<div class="lead mt-7">Отдельная очередь из 200 операций.<br>Упорядочим их по убыванию score и проверим первые 50.</div>
<div class="grid grid-cols-4 gap-3 mt-8 text-center text-[28px]"><div class="bg-blue-100 border-t-4 border-blue-600 py-7">№1–50</div><div class="bg-slate-100 py-7">№51–100</div><div class="bg-slate-100 py-7">№101–150</div><div class="bg-slate-100 py-7">№151–200</div></div>
<div v-click="1" class="grid grid-cols-2 gap-12 mt-10"><MathBlock formula="Precision@50=\frac{TP@50}{50}" class="text-[31px]" /><MathBlock formula="Recall@50=\frac{TP@50}{N_+}" class="text-[31px]" /></div>
<div v-click="1" class="text-[26px] mt-10">TP@50 — число положительных в верхних 50; N₊ — во всех 200.<br>Для расчёта нужны истинные y: оцениваем очередь на размеченной validation.</div>
<div class="micro mt-7">Для нового потока ответы ещё неизвестны. Численные TP для этих 200 объектов здесь не заданы.</div>

---

<!-- S43 -->

<SectionChrome section="Порог и прикладное решение" />
# Высокая F1 не заменяет прикладное ограничение


<div class="grid grid-cols-3 gap-9 text-center mt-14"><div class="plain-label py-8"><MathBlock  formula="Recall\ge0.98" class="text-[30px]" /><div class="lead mt-7">Найти достаточно<br>много событий.</div></div><div class="plain-label py-8"><MathBlock  formula="Precision\ge0.4" class="text-[30px]" /><div class="lead mt-7">Получить достаточно<br>чистую очередь.</div></div><div class="plain-label py-8"><div class="text-[30px]">Не более 50</div><div class="lead mt-7">Уложиться в ресурс<br>ручной проверки.</div></div></div>
<div class="lead mt-12">F1 объединяет две доли, но сама не задаёт ни один из этих лимитов.</div>

---
clicks: 2
---

<!-- S44 -->

<SectionChrome section="Порог и прикладное решение" />
# Почему Accuracy одинакова при трёх разных порогах?

<MathBlock :formula="`t=${[0.8,0.5,0.35][Math.min($clicks,2)]}`" class="text-[38px] mt-8" />
<div class="mt-10"><WeekFiveRankedList layout="scale" show-metrics include-accuracy :include-f1="false" :threshold="[0.8,0.5,0.35][Math.min($clicks,2)]" /></div>
<div class="text-[26px] text-center mt-1">Во всех трёх режимах TP + TN = 8 из 12.<br>Меняется состав ошибок; модель остаётся прежней.</div>

---
clicks: 2
---

<!-- S45 -->

<SectionChrome section="Порог и прикладное решение" />
# Порог меняет матрицу ошибок
<div class="grid grid-cols-3 gap-8 mt-12 text-center">
<div><MathBlock  formula="t=0.80" class="text-[30px] mb-7" /><WeekFiveConfusion compact :values="[6,1,3,2]" /></div>
<div v-click="1"><MathBlock  formula="t=0.50" class="text-[30px] mb-7" /><WeekFiveConfusion compact :values="[4,3,1,4]" /></div>
<div v-click="2"><MathBlock  formula="t=0.35" class="text-[30px] mb-7" /><WeekFiveConfusion compact :values="[3,4,0,5]" /></div></div>
<div class="micro mt-10 text-center">Те же 12 объектов. Модель и вероятности не изменяются.</div>

---

<!-- S46 -->

<SectionChrome section="Порог и прикладное решение" />
# При снижении порога Recall не убывает


<table class="comparison-table text-[26px] mt-7"><thead><tr><th style="padding:8px 16px">t</th><th style="padding:8px 16px">TP</th><th style="padding:8px 16px">FP</th><th style="padding:8px 16px">FN</th><th style="padding:8px 16px">TN</th><th style="padding:8px 16px">Precision</th><th style="padding:8px 16px">Recall</th></tr></thead><tbody><tr><td style="padding:8px 16px">0.80</td><td style="padding:8px 16px">2</td><td style="padding:8px 16px">1</td><td style="padding:8px 16px">3</td><td style="padding:8px 16px">6</td><td style="padding:8px 16px">2/3</td><td style="padding:8px 16px">0.40</td></tr><tr><td style="padding:8px 16px">0.50</td><td style="padding:8px 16px">4</td><td style="padding:8px 16px">3</td><td style="padding:8px 16px">1</td><td style="padding:8px 16px">4</td><td style="padding:8px 16px">4/7</td><td style="padding:8px 16px">0.80</td></tr><tr><td style="padding:8px 16px">0.35</td><td style="padding:8px 16px">5</td><td style="padding:8px 16px">4</td><td style="padding:8px 16px">0</td><td style="padding:8px 16px">3</td><td style="padding:8px 16px">5/9</td><td style="padding:8px 16px">1.00</td></tr></tbody></table>
<div class="mt-6"><img src="/assets/masters-week-03/threshold-metrics-wide.svg" alt="Recall монотонен по порогу, Precision может меняться в обе стороны" class="figure h-[220px]" /></div>
<div class="lead text-center mt-4">Recall не убывает; Precision может и расти, и падать.</div>

---

<!-- S47 -->

<SectionChrome section="Порог и прикладное решение" />
# Порог выбираем на validation; test оставляем для проверки


<div class="mt-6"><img src="/assets/masters-week-03/validation-flow.svg" alt="Разные роли train, validation и test: параметры, настройки, итоговая проверка" class="figure h-[330px]" /></div>
<div class="grid grid-cols-3 gap-10 text-[26px] mt-8"><div><b>Train:</b><br>обучаем коэффициенты.</div><div><b>Validation:</b><br>выбираем порог.</div><div><b>Test:</b><br>проверяем готовую систему.</div></div>
<div class="micro mt-7">На маленькой validation-выборке выбранный порог может быть неустойчив.</div>

---

<!-- S48 -->

<SectionChrome section="Порог и прикладное решение" />
# Один порог — одно решение; все пороги — ранжирование


<div class="formula-box mt-12 py-7"><MathBlock formula="\widehat p(x)\ge t\quad\Longrightarrow\quad\widehat y_t(x)=1" class="text-[38px]" /></div>
<div class="grid grid-cols-2 gap-14 mt-12"><div><div class="section-label">Порог задан</div><div class="lead mt-8">Получаем метки, матрицу ошибок<br>и значения метрик.</div></div><div><div class="section-label">Порог ещё выбираем</div><div class="lead mt-8">Изучаем все рабочие режимы<br>и качество порядка объектов.</div></div></div>
<div class="lecture-question mt-12">Как увидеть все сочетания найденных событий и ложных тревог?</div>

---
clicks: 1
---

<!-- S49 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Знакомые доли: TPR и FPR

<div class="grid grid-cols-2 gap-14 mt-12">
  <div><MathBlock formula="\boxed{TPR=Recall=\frac{TP}{TP+FN}}" class="text-[31px]" /><div class="lead mt-10">Какую долю положительных нашли?</div><MathBlock formula="TPR=\frac{TP}{N_+},\quad N_+=5" class="text-[31px] mt-10" /></div>
  <div v-click="1"><MathBlock formula="\boxed{FPR=\frac{FP}{FP+TN}}" class="text-[28px]" /><MathBlock formula="FPR=1-Specificity" class="text-[28px] mt-5" /><div class="lead mt-10">Какую долю отрицательных ошибочно выбрали?</div><MathBlock formula="FPR=\frac{FP}{N_-},\quad N_-=7" class="text-[31px] mt-10" /></div>
</div>

---
clicks: 1
---

<!-- S50 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Снижаем порог: наблюдаем TPR и FPR

<div class="mt-10"><img :src="`./assets/week-05/tpr-fpr-${String(Math.min($clicks,1)).padStart(2,'0')}.svg`" class="figure h-[470px]" alt="TPR и FPR при снижении порога" /></div>

---
clicks: 1
---

<!-- S51 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Убираем порог с оси — получаем ROC

<div class="grid grid-cols-[1fr_560px] gap-12 mt-8 items-center"><div><MathBlock formula="t\longmapsto(FPR(t),TPR(t))" class="text-[29px]" /><div class="lead mt-12">Каждый порог —<br>точка в этих координатах.</div></div><img v-click="1" src="/assets/week-05/roc-step-00.svg" class="figure h-[460px]" alt="Оси FPR и TPR перед построением ROC" /></div>

---
clicks: 12
---

<!-- S52 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Строим ROC: проходим все 12 объектов


<div class="text-[25px] mb-0">Класс 1: шаг вверх по TPR на 1/5; класс 0: шаг вправо по FPR на 1/7.</div>
<WeekFiveCurveStory mode="roc" compact :step="$clicks" />
<div class="text-[23px] mt-2"><span v-if="$clicks === 0">Никого не выбрали: начинаем в (0, 0).</span><span v-else-if="$clicks === 12">Выбрали всех: пришли в (1, 1).</span><span v-else-if="[1,3,4,7,9].includes($clicks)">Добавили положительный объект: шаг вверх на 1/5.</span><span v-else>Добавили отрицательный объект: шаг вправо на 1/7.</span></div>
<div class="micro mt-1">Здесь оценки различны. При равных score объекты пересекают порог вместе.</div>

---

<!-- S53 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Как прочитать ROC-точку и диагональ

<div class="grid grid-cols-[650px_1fr] gap-10 items-center">
  <img src="/assets/week-05/roc-one-point.svg" class="figure h-[445px]" alt="ROC-точка FPR = 1/7, TPR = 3/5: отобраны первые четыре объекта" />
  <div>
    <MathBlock formula="(FPR,TPR)=\left(\frac17,\frac35\right)" class="text-[30px]" />
    <MathBlock formula="\approx(0.14,0.60)" class="text-[32px] mt-8" />
    <div class="lead mt-10">Нашли 60%<br>положительных объектов.</div>
    <div class="lead mt-8">Ошибочно выбрали около 14%<br>отрицательных объектов.</div>
  </div>
</div>
<div class="micro text-center mt-3">Диагональ TPR ≈ FPR — ориентир случайного порядка; на конечной выборке совпадение не обязано быть точным.</div>

---
clicks: 3
---

<!-- S54 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Как читать ROC

<div class="grid grid-cols-[650px_1fr] gap-10 items-center">
  <img src="/assets/week-05/roc-read.svg" class="figure h-[455px]" alt="ROC, диагональ случайного порядка и идеальная точка" />
  <div class="space-y-7 text-[25px]">
    <div v-click="1">(0, 0): никого не выбираем.<br>(1, 1): выбираем всех.</div>
    <div v-click="2">(0, 1): идеальная точка.<br>Лучше — ближе к верхнему левому углу.</div>
    <div v-click="3">Случайный порядок: доли выбранных объектов обоих классов растут примерно одинаково.<MathBlock formula="TPR\approx FPR" class="text-[29px] mt-4" /></div>
    <div v-click="3" class="text-[23px]">Конечная случайная кривая не обязана лежать точно на диагонали.</div>
  </div>
</div>

---

<!-- S55 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Та же механика — больше значений score

<div class="grid grid-cols-[690px_1fr] gap-10 mt-6 items-center">
  <img src="/assets/week-05/roc-typical.svg" class="figure h-[470px]" alt="ROC на 2000 объектах: много маленьких шагов" />
  <div class="space-y-10 lead"><div>Отдельный пример:<br>2000 объектов,<br>100 положительных.</div><div>Много небольших шагов выглядят почти как гладкая кривая.</div><div>Каждая точка по-прежнему соответствует порогу.</div></div>
</div>

---
clicks: 1
---

<!-- S56 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# ROC-AUC: площадь под ROC-кривой

<div class="grid grid-cols-[650px_1fr] gap-12 items-center">
  <img src="/assets/week-05/roc-auc-intro.svg" class="figure h-[460px]" alt="Заштрихованная площадь под ROC-кривой учебного набора" />
  <div><div class="section-label">AUC</div><div class="lead mt-6">Area Under the ROC Curve —<br>площадь под ROC-кривой.</div><div v-click="1" class="lead mt-14">AUC лежит в [0, 1].<br>0.5 — ориентир случайного порядка;<br>ниже — обратное ранжирование.</div></div>
</div>

---
clicks: 1
---

<!-- S57 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Положительно-отрицательная пара: кто выше?


<div class="lead mt-8">Выбираем случайно по одному объекту каждого класса.</div>
<div class="grid grid-cols-2 gap-14 mt-10 text-center"><div class="plain-label py-8"><div class="section-label">Пара 1</div><MathBlock  formula="score_+=0.75>score_-=0.68" class="text-[30px] mt-8" /><div v-click="1" class="success-line mt-7">Правильный порядок.</div></div><div class="plain-label py-8"><div class="section-label">Пара 2</div><MathBlock  formula="score_+=0.55<score_-=0.61" class="text-[30px] mt-8" /><div v-click="1" class="warning-line mt-7">Неправильный порядок.</div></div></div>
<div class="micro mt-10">При равных оценках паре засчитываем половину. Здесь все оценки различны.</div>

---
clicks: 2
---

<!-- S58 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Из 35 пар правильно упорядочены 26


<div class="mt-5"><WeekFivePairGrid :stage="$clicks" /></div>
<div v-click="2" class="grid grid-cols-[1.15fr_0.85fr] gap-8 items-center mt-5"><MathBlock formula="5\cdot7=35,\quad7+6+6+4+3=26" class="text-[31px]" /><MathBlock formula="AUC=\frac{26}{35}\approx0.743" class="text-[36px]" /></div>
<div class="micro text-center mt-5">Это доля правильно упорядоченных пар, а не доля верных меток.</div>

---
clicks: 4
---

<!-- S59 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Один отрицательный объект — один прямоугольник под ROC

<div class="mt-2"><WeekFiveRankedList ribbon numbered-ribbon :show-legend="false" :changed-rank="5" :positive-before-rank="$clicks >= 1 ? 5 : 0" /></div>
<div class="grid grid-cols-[580px_minmax(0,1fr)] gap-10 mt-2 items-start">
  <WeekFiveRocAreaStory mode="single" :step="$clicks" :height="360" />
  <div>
    <div class="text-[26px]">Один новый FP: объект №5 (0.68, класс 0).</div>
    <div v-click="1" class="text-[25px] mt-4">j — число положительных с большим score.<br>Выше №5 — №1, №3, №4: j = 3.</div>
    <div v-click="2" class="grid grid-cols-2 gap-8 mt-4 text-center">
      <div><div class="text-[25px]">Ширина: шаг FPR</div><MathBlock formula="\frac1{N_-}=\frac17" class="text-[30px] mt-2" /></div>
      <div><div class="text-[25px]">Высота: TPR</div><MathBlock formula="\frac3{N_+}=\frac35" class="text-[30px] mt-2" /></div>
    </div>
    <MathBlock v-click="3" formula="\text{площадь}=\frac17\cdot\frac35=\frac3{35}" class="text-[30px] mt-4" />
  </div>
</div>
<div v-click="4" class="text-[26px] mt-0">Это вклад трёх правильно упорядоченных пар с объектом №5.</div>

---
clicks: 5
---

<!-- S60 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Складываем вклады всех отрицательных объектов

<div class="grid grid-cols-[600px_minmax(0,1fr)] gap-10 mt-6 items-start">
  <WeekFiveRocAreaStory mode="sum" :step="$clicks" />
  <div>
    <div class="text-[26px]" v-if="$clicks === 0">Начинаем с прямоугольника<br>для отрицательного 0.68.</div>
    <div class="text-[26px]" v-else-if="$clicks === 1">Добавляем следующий<br>отрицательный объект: 0.61.</div>
    <div class="text-[26px]" v-else-if="$clicks === 2">Добавляем прямоугольники<br>для остальных отрицательных.</div>
    <MathBlock v-if="$clicks < 2" :formula="$clicks === 0 ? '\\text{вклад}=3/35' : '\\text{ещё один вклад}=3/35'" class="text-[30px] mt-6" />
    <div v-click="3" class="text-[26px] mt-6">Число положительных выше<br>каждого из семи отрицательных:</div>
    <MathBlock v-click="3" formula="1,\;3,\;3,\;4,\;5,\;5,\;5" class="text-[30px] mt-6" />
    <div v-click="4" class="text-[26px] mt-6">Суммарная площадь:</div>
    <MathBlock v-click="4" formula="\frac{1+3+3+4+5+5+5}{35}" class="text-[29px] mt-4" />
    <MathBlock v-click="4" formula="=\frac{26}{35}" class="text-[38px] mt-6" />
  </div>
</div>
<div v-click="5" class="lead text-center mt-4">Каждая правильно упорядоченная пара учтена ровно один раз.<br>Суммарная площадь — те же 26 пар из 35.</div>

---
clicks: 1
---

<!-- S61 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Та же ROC-точка — разная чистота выбранной группы

<div class="micro mt-4">Два отдельных потока по 10 000 объектов; одинаковые TPR и FPR.</div>
<MathBlock formula="N=10000,\quad TPR=0.8,\quad FPR=0.05" class="text-[32px] mt-5" />
<div class="grid grid-cols-2 gap-16 mt-12 text-center"><div><div class="section-label">Положительных 20%</div><MathBlock formula="TP=1600,\quad FP=400" class="text-[29px] mt-10" /><MathBlock formula="Precision=\frac{1600}{2000}=80\%" class="text-[32px] mt-10" /></div><div v-click="1"><div class="section-label">Положительных 1%</div><MathBlock formula="TP=80,\quad FP=495" class="text-[29px] mt-10" /><MathBlock formula="Precision=\frac{80}{575}\approx14\%" class="text-[32px] mt-10" /></div></div>
<div v-click="1" class="lead text-center mt-12">Precision зависит от распространённости положительного класса.</div>

---
clicks: 1
---

<!-- S62 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Что нам дала ROC — и чего она не показывает

<div class="grid grid-cols-2 gap-16 mt-14">
  <div><div class="section-label">ROC</div><MathBlock formula="t\longmapsto(FPR,TPR)" class="text-[36px] mt-10" /><div class="lead mt-10">Все рабочие режимы<br>при изменении порога.</div></div>
  <div><div class="section-label">ROC-AUC</div><MathBlock formula="26/35\approx0.743" class="text-[38px] mt-10" /><div class="lead mt-10">Качество ранжирования<br>в одном числе.</div></div>
</div>
<div v-click="1" class="lead mt-12">Чистоту выбранной очереди ROC напрямую не показывает.<br>Для этого перейдём к Precision и Recall.</div>

---
clicks: 2
---

<!-- S63 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Вернёмся к очереди ручной проверки

<div class="text-[26px] mt-6">ROC показывает охват двух настоящих классов при разных порогах;<br>чистоту выбранной положительной группы показывает пара Precision–Recall.</div>
<div class="grid grid-cols-2 gap-16 mt-8">
  <div><div class="lead">Какую долю всего мошенничества поймаем?</div><MathBlock v-click="1" formula="Recall" class="text-[42px] mt-10" /></div>
  <div><div class="lead">Какая доля проверяемых платежей действительно мошенническая?</div><MathBlock v-click="1" formula="Precision" class="text-[42px] mt-10" /></div>
</div>
<MathBlock v-click="2" formula="t\longmapsto(Recall(t),Precision(t))" class="text-[37px] mt-14" />
<div v-click="2" class="lead mt-10 text-center">Две стороны одного отбора: охват класса 1 и чистота очереди.</div>

---
clicks: 12
---

<!-- S64 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Строим PR по тем же порогам

<WeekFiveCurveStory mode="pr" compact :step="$clicks" />
<div class="text-[24px] mt-4">
  <span v-if="$clicks === 0">(0, 1) — условность изображения: при пустой группе Precision не определён.</span>
  <span v-else-if="[1,3,4,7,9].includes(Math.min($clicks,12))">Вошёл положительный: Recall увеличился, Precision пересчитали.</span>
  <span v-else>Вошёл отрицательный: Recall прежний, Precision уменьшился.</span>
</div>
<div class="text-[23px] mt-4">Точки — отдельные пороговые состояния. Ступени — выбранный способ изображения между ними.</div>

---
clicks: 1
---

<!-- S65 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# PR-кривая и её базовый уровень


<div class="grid grid-cols-2 gap-10 mt-5"><div><div class="section-label text-center">Наши 12 объектов</div><img src="/assets/week-05/pr-step-12.svg" alt="Полная PR-кривая учебного списка из двенадцати объектов" class="figure h-[310px]" /><MathBlock  formula="\pi=\frac5{12}\approx0.417" class="text-[29px] mt-4" /></div><div v-click="1"><div class="section-label text-center">Другой набор: редкий класс</div><img src="/assets/week-05/pr-typical.svg" alt="PR-кривая на большой выборке с редким положительным классом" class="figure h-[310px]" /><MathBlock  formula="\pi=0.05" class="text-[29px] mt-4" /></div></div>
<div class="lead mt-5 text-center">При случайном ранжировании ожидаемая Precision ≈ π.<br>Конкретная PR-кривая может колебаться вокруг этого уровня.</div>

---
clicks: 1
---

<!-- S66 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Average Precision: среднее на позициях положительных


<div class="mt-5"><WeekFiveRankedList ribbon numbered-ribbon highlight-positive :show-legend="false" /></div>
<div class="text-[26px] mt-7">Положительные объекты стоят на позициях 1, 3, 4, 7 и 9.</div>
<MathBlock  formula="AP=\frac15\left(1+\frac23+\frac34+\frac47+\frac59\right)\approx0.709" class="text-[37px] mt-9" />
<div v-click="1" class="lead mt-9">При встрече очередного положительного берём Precision<br>от начала списка до этой позиции включительно.</div>
<div class="micro mt-6">При разных score это обычное среднее пяти значений. AP не равна автоматически трапецеидальной площади PR.</div>

---
clicks: 2
---

<!-- S67 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Почему в общей формуле появляется прирост Recall

<div class="lead mt-6">Каждый найденный положительный увеличивает Recall на:</div>
<MathBlock formula="\Delta Recall=\frac1{N_+}=\frac15" class="text-[34px] mt-6" />
<MathBlock v-click="1" formula="AP=\frac15\cdot1+\frac15\cdot\frac23+\frac15\cdot\frac34+\frac15\cdot\frac47+\frac15\cdot\frac59" class="text-[33px] mt-8" />
<MathBlock v-click="2" formula="\boxed{AP=\sum_k\Delta Recall_k\cdot Precision_k}" class="text-[39px] mt-7" />
<div v-click="2" class="text-[26px] mt-4">Если Recall не изменился, вес шага равен нулю.<br>При равных score используем группы и фактический прирост Recall.</div>


---
clicks: 5
---

<!-- S68 -->

<script setup lang="ts">
import WeekFiveApAreaStory from './components/WeekFiveApAreaStory.vue'
</script>

<SectionChrome section="Ранжирование: ROC и PR" />
# AP как площадь под ступенчатой PR-кривой

<div class="grid grid-cols-[600px_minmax(0,1fr)] gap-10 mt-6 items-start">
  <WeekFiveApAreaStory :step="$clicks" />
  <div>
    <MathBlock formula="\text{ширина}=\Delta Recall_k" class="text-[29px]" />
    <MathBlock formula="\text{высота}=Precision_k" class="text-[29px] mt-8" />
    <div v-click="1" class="text-[26px] mt-8">Площадь прямоугольника:</div>
    <MathBlock v-click="1" formula="\Delta Recall_k\cdot Precision_k" class="text-[30px] mt-4" />
    <div v-click="5" class="lead mt-10">Пять прямоугольников<br>дают AP ≈ 0.709.</div>
  </div>
</div>
<div v-click="5" class="text-[26px] mt-6">Сумма площадей пяти прямоугольников — та же AP.</div>

---

<!-- S69 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# AP и площадь с линейной интерполяцией — не одно и то же

<div class="mt-8"><img src="/assets/week-05/pr-ap-interpolation.svg" class="figure h-[400px]" alt="AP как прямоугольники и площадь PR при линейной интерполяции" /></div>
<div class="lead text-center mt-4">AP — площадь ступенчатой конструкции;<br>трапеции соответствуют другой интерполяции между теми же точками.</div>
<div class="micro text-center mt-4">Те же точки и разные интерполяции дают разные площади.</div>

---

<!-- S70 -->

<SectionChrome section="Ранжирование: ROC и PR" />
# Выбираем оценку ранжирования под задачу


<table class="comparison-table text-[27px] mt-12"><thead><tr><th>Инструмент</th><th>На какой вопрос отвечает?</th></tr></thead><tbody><tr><td>ROC / ROC-AUC</td><td>Как разделяются положительные и отрицательные?</td></tr><tr><td>PR / AP</td><td>Насколько чиста выбранная группа при росте Recall?</td></tr><tr><td>Верхние k объектов</td><td>Сколько событий найдём в доступной очереди?</td></tr></tbody></table>
<div class="lead mt-10">Хорошая глобальная метрика не гарантирует лучшую очередь<br>из первых 50 или 100 кандидатов.</div>

---

<!-- S71 -->

<SectionChrome section="Качество вероятностей" />
# Один порядок — две вероятностные шкалы

<div class="lead mt-6">Порядок групп одинаковый, вероятностные шкалы разные.</div>
<div class="mt-4"><WeekFiveCalibrationTable /></div>
<div class="text-[26px] mt-6">Модель A согласуется с наблюдаемыми частотами; модель B даёт более крайние значения.<br>ROC-AUC и AP одинаковы: ранжирование не изменилось.</div>

---
clicks: 2
---

<!-- S72 -->

<SectionChrome section="Качество вероятностей" />
# От группы прогнозов к точке на диаграмме


<div class="grid grid-cols-[0.85fr_1.15fr] gap-10 mt-6 items-center"><div>
<div class="text-[25px]">Отдельная иллюстративная группа:<br>10 объектов с прогнозами около 0.8.</div>
<div class="grid grid-cols-5 gap-3 mt-7"><div v-for="i in 10" :key="i" class="text-center py-3 text-[26px] border border-slate-200" :class="$clicks >= 1 ? (i <= 8 ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700') : 'bg-slate-100'">{{ $clicks >= 1 ? (i <= 8 ? 1 : 0) : '?' }}</div></div>
<MathBlock  formula="\overline p_B\approx0.8" class="text-[31px] mt-7" /><MathBlock v-click="1" formula="\overline y_B=\frac8{10}=0.8" class="text-[31px] mt-6" />
<div class="micro mt-6">Средний прогноз и доля событий задают координаты одной точки.</div></div>
<div><img :src="$clicks < 2 ? './assets/masters-week-03/calibration-base.svg' : './assets/masters-week-03/calibration-point.svg'" class="figure h-[350px]" alt="Калибровочная диаграмма: из группы получаем точку 0.8, 0.8" /></div></div>
<div class="micro text-center mt-5">8 из 10 иллюстрирует механику. Надёжность вывода зависит от числа объектов и группировки.</div>

---
clicks: 2
---

<!-- S73 -->

<SectionChrome section="Качество вероятностей" />
# От групп данных к reliability diagram

<div class="grid grid-cols-[510px_1fr] gap-12 mt-4 items-center">
  <div v-if="$clicks < 2"><WeekFiveCalibrationTable construction :step="$clicks" /><div class="text-[24px] mt-6">Используем модель B.<br>Одна группа — один уровень прогноза.</div></div>
  <div v-else>
    <div class="text-[25px]">Для группы <MathBlock formula="B_k" :display="false" class="inline-block" />:</div>
    <MathBlock formula="\boxed{\bar p_k=\frac1{\lvert B_k\rvert}\sum_{i\in B_k}\hat p_i}" class="text-[31px] mt-4" />
    <div class="text-[24px] mt-2">Средний прогноз модели B в группе.</div>
    <MathBlock formula="\boxed{\bar y_k=\frac1{\lvert B_k\rvert}\sum_{i\in B_k}y_i}" class="text-[31px] mt-6" />
    <div class="text-[24px] mt-2">Наблюдаемая доля положительных исходов.</div>
    <MathBlock formula="(\bar p_k,\bar y_k)" class="text-[29px] mt-4" />
    <MathBlock formula="(\bar p_1,\bar y_1)=(0.0122,0.10)" class="text-[29px] mt-3" />
  </div>
  <div v-if="$clicks === 0"><div class="lead">1. В реальных данных близкие прогнозы объединяют в интервалы.<br><br>В нашем примере пять групп уже заданы. Обозначим группу <MathBlock formula="B_k" :display="false" class="inline-block" />.</div></div>
  <div v-else-if="$clicks === 1">
    <div class="text-[25px]">2. Для группы <MathBlock formula="B_k" :display="false" class="inline-block" /> считаем:</div>
    <MathBlock formula="\boxed{\bar p_k=\frac1{\lvert B_k\rvert}\sum_{i\in B_k}\hat p_i}" class="text-[31px] mt-4" />
    <div class="text-[24px] mt-2">Средний прогноз в группе.</div>
    <MathBlock formula="\boxed{\bar y_k=\frac1{\lvert B_k\rvert}\sum_{i\in B_k}y_i}" class="text-[31px] mt-6" />
    <div class="text-[24px] mt-2">Наблюдаемая доля положительных исходов.</div>
    <MathBlock formula="(\bar p_k,\bar y_k)" class="text-[29px] mt-4" />
    <MathBlock formula="(\bar p_1,\bar y_1)=(0.0122,0.10)" class="text-[29px] mt-3" />
  </div>
  <div v-else><img src="/assets/week-05/reliability-build-02.svg" class="figure h-[390px]" alt="Модель B: средний прогноз по горизонтали, наблюдаемая частота по вертикали" /><div class="text-[25px] text-center mt-4">3. Наносим все пять пар:<br>получаем калибровочную диаграмму.</div></div>
</div>

---
clicks: 2
---

<!-- S74 -->

<SectionChrome section="Качество вероятностей" />
# Как читать калибровочную диаграмму


<div class="grid grid-cols-[1.25fr_0.75fr] gap-9 mt-5 items-center"><div><img src="/assets/week-05/calibration-reliability.svg" alt="Диагональ калибровки и отклонения прогнозов вверх или вниз" class="figure h-[340px]" /></div><div class="text-[25px]"><div>Диагональ: средний прогноз совпадает с частотой.</div><div v-click="1" class="mt-8">Ниже диагонали: вероятность завышена.</div><div v-click="2" class="mt-8">Выше диагонали: вероятность занижена.</div></div></div>
<div class="micro mt-7">Маленькие группы дают шумную оценку; вид диаграммы зависит от группировки.</div>

---

<!-- S75 -->

<SectionChrome section="Качество вероятностей" />
# Хорошая калибровка: различает ли модель объекты?

<div class="lead mt-2">Отдельный пример: положительный класс составляет 10% выборки.</div>
<div class="grid grid-cols-2 gap-16 mt-2">
  <div><div class="section-label">Модель 1 · постоянный прогноз</div><MathBlock formula="\hat p(x)=0.10" class="text-[38px] mt-6" /><div class="lead mt-6">Всем объектам выдаёт 0.10.<br>Около 10% положительных —<br>прогноз откалиброван.</div><div class="lead mt-6">Вероятности одинаковы:<br>модель не различает объекты.</div></div>
  <div><div class="section-label">Модель 2 · две группы</div><div class="lead mt-4">Половине объектов выдаёт 0.02;<br>в этой группе около 2% положительных.</div><div class="lead mt-4">Другой половине — 0.18;<br>там около 18% положительных.</div><MathBlock formula="\frac12\cdot0.02+\frac12\cdot0.18=0.10" class="text-[29px] mt-6" /></div>
</div>
<div class="text-[26px] mt-4">Обе модели откалиброваны, но вторая различает группы.<br>Сравним общее качество вероятностных прогнозов через log loss и Brier.</div>

---
clicks: 1
---

<!-- S76 -->

<SectionChrome section="Качество вероятностей" />
# Log loss: один объект и вся выборка

<div class="section-label mt-8">Loss одного наблюдения</div>
<MathBlock formula="L(y_i,\widehat p_i)=-y_i\log\widehat p_i-\left(1-y_i\right)\log(1-\widehat p_i)" class="text-[35px] mt-6" />
<div v-click="1" class="mt-12"><div class="section-label">Средняя log loss на оценочной выборке из m объектов</div><MathBlock formula="\operatorname{LogLoss}=\frac1m\sum_{i=1}^m L(y_i,\hat p_i)" class="text-[38px] mt-6" /></div>
<div v-click="1" class="grid grid-cols-2 gap-14 lead mt-14"><div>На обучении это была эмпирическая целевая функция Rₙ.</div><div>На отложенных прогнозах то же выражение — метрика качества.</div></div>

---
clicks: 1
---

<!-- S77 -->

<SectionChrome section="Качество вероятностей" />
# Brier score: MSE вероятностных прогнозов

<div class="grid grid-cols-2 gap-16 mt-8">
  <MathBlock formula="y=1,\ p=0.9\Rightarrow(1-0.9)^2=0.01" class="text-[29px]" />
  <MathBlock formula="y=1,\ p=0.2\Rightarrow(1-0.2)^2=0.64" class="text-[29px]" />
</div>
<MathBlock v-click="1" formula="\boxed{Brier=\frac1m\sum_{i=1}^m(y_i-\hat p_i)^2}" class="text-[41px] mt-12" />
<div v-click="1" class="text-[27px] mt-10">Меньше — лучше. Сравниваем модели на одной выборке и с baseline.</div>
<div v-click="1" class="lead mt-9">Это знакомая квадратичная ошибка:<br>сравниваем вероятность с бинарным исходом.</div>

---

<!-- S78 -->

<SectionChrome section="Качество вероятностей" />
# Диаграмма и численная оценка дополняют друг друга

<div class="mt-12 text-[27px]">

| Инструмент | Что показывает |
|---|---|
| Reliability diagram | Где вероятности систематически завышены или занижены |
| Log loss / Brier | Общее качество вероятностных прогнозов одним числом |

</div>
<div class="lead mt-14">Одно число удобно для сравнения моделей;<br>диаграмма показывает структуру ошибок калибровки.</div>
<div class="text-[24px] mt-10">Меньшие Log loss или Brier сами по себе не доказывают лучшую калибровку.</div>

---
clicks: 3
---

<!-- S79 -->

<SectionChrome section="Качество вероятностей" />
# Один прогноз — три вопроса о качестве


<div class="micro mt-5">Бинарная задача: Y ∈ {0, 1}. Для нового объекта известны признаки x.</div>
<MathBlock  formula="x\longrightarrow\widehat z(x)\longrightarrow\sigma\bigl(\widehat z(x)\bigr)=\widehat p(x)" class="text-[36px] mt-7" />
<div class="grid grid-cols-3 gap-10 mt-10 text-[26px]"><div v-click="1"><div class="section-label">Решение при пороге</div><div class="mt-7">Матрица ошибок<br>Precision / Recall / F1<br>Ресурс и цена ошибок</div></div><div v-click="2"><div class="section-label">Ранжирование</div><div class="mt-7">ROC / ROC-AUC<br>PR / AP<br>Качество верхних k</div></div><div v-click="3"><div class="section-label">Шкала вероятностей</div><div class="mt-7">Калибровочная диаграмма<br>Log loss / Brier<br>Соответствие частотам</div></div></div>
<div v-click="3" class="lead mt-10">На следующей неделе — честное сравнение моделей<br>и задачи с несколькими классами.</div>
