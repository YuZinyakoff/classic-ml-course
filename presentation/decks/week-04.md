---
theme: default
title: Линейная классификация
author: НИУ ВШЭ
info: |
  Неделя 4 курса классического машинного обучения.
  Бинарная логистическая регрессия: score, вероятность, log loss и решение.
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
  class: text-[23px]
exportFilename: week-04-logistic-regression
appendixSlides: 5
download: false
---

<!-- S01 -->

<div class="section-kicker mt-8">Классическое машинное обучение · Неделя 4</div>
<h1 class="deck-title mt-8">Линейная классификация</h1>
<div class="lead mt-3">От линейного score к вероятности и решению</div>
<div class="mt-8"><img src="/assets/week-04/opening-linear-classification.svg" alt="Два класса объектов и линейная разделяющая граница" class="figure h-[335px]" /></div>


---

<!-- S02 -->

<SectionChrome section="От класса к вероятности" />
# Числовой код класса не делает его числовой величиной

<div class="grid grid-cols-2 gap-12 mt-12">
  <div class="role-column text-center">
    <div class="section-label">порядок содержателен</div>
    <div class="text-[30px] mt-10">низкий → средний → высокий</div>
  </div>
  <div class="role-column text-center">
    <div class="section-label">естественного порядка нет</div>
    <div class="text-[30px] mt-10">договор · резюме · счёт</div>
  </div>
</div>

<div class="success-line text-center mt-14 text-[25px]">Кодировка может отражать смысл задачи, но не должна незаметно добавлять порядок или расстояния между классами.</div>

---

<!-- S03 -->

<SectionChrome section="От класса к вероятности" />
# Бинарный случай: классы 0 и 1

<div class="grid grid-cols-[0.88fr_1.12fr] gap-12 items-center mt-8">
  <div class="text-center">
    <MathBlock formula="Y\in\{0,1\}" class="text-[48px]" />
    <div class="grid grid-cols-2 gap-5 mt-10">
      <div class="prediction-chip">0 — отрицательный класс</div>
      <div class="prediction-chip success">1 — положительный класс</div>
    </div>
  </div>
  <div>
    <div class="case-box text-[24px] leading-relaxed">
      <b>Пример:</b> 1 — клиент отменил подписку в следующие 30 дней; 0 — сохранил её.
    </div>
    <MathBlock formula="p(x)=P(Y=1\mid X=x)" class="mt-8 text-[31px]" />
    <div class="micro text-center mt-3">вероятность принадлежности объекта к положительному классу</div>
  </div>
</div>

<div class="micro text-center mt-10">Для бинарной задачи удобно обозначить отрицательный класс нулём, а положительный — единицей.</div>

---

<!-- S04 -->

<SectionChrome section="От класса к вероятности" />
# У кодировки 0/1 есть полезное свойство

<div class="proof-stack mt-16 text-center">
  <MathBlock formula="\mathbb E[Y\mid X=x]" class="text-[38px]" />
  <div class="text-[30px] text-slate-400">↓</div>
  <MathBlock formula="=0\cdot P(Y=0\mid X=x)+1\cdot P(Y=1\mid X=x)" class="text-[34px]" />
  <div class="proof-result mt-5 py-5">
    <MathBlock formula="\boxed{\mathbb E[Y\mid X=x]=P(Y=1\mid X=x)=p(x)}" class="text-[37px]" />
  </div>
</div>

<div class="success-line text-center mt-12">Поэтому для бинарной целевой переменной условное среднее равно вероятности положительного класса.</div>

---

<!-- S05 -->

<SectionChrome section="От класса к вероятности" />
# При одинаковых признаках средний ответ равен доле положительного класса

<div class="micro text-center mt-0">Мысленный эксперимент: фиксируем один вектор признаков <i>x</i>; модель не различает 10 объектов по <i>X</i> и прогнозирует всем одно значение <i>c</i>.</div>

<div class="grid grid-cols-[1.15fr_0.85fr] gap-10 items-center mt-0">
  <img src="/assets/week-04/binary-mean-example.svg" alt="Семь объектов класса 0, три объекта класса 1 и их среднее 0.3" class="figure h-[225px]" />
  <div>
    <div class="lecture-question">Какое одно число <i>c</i> минимизирует среднюю квадратичную ошибку?</div>
    <MathBlock formula="\sum_{i=1}^{10}(y_i-c)^2" class="mt-3 text-[30px]" />
    <div class="formula-box mt-4 py-4">
      <MathBlock formula="\boxed{c=\bar y=\frac3{10}=0.3}" class="text-[34px]" />
    </div>
  </div>
</div>

---

<!-- S06 -->

<SectionChrome section="От класса к вероятности" />
# Линейная модель вероятности: моделируем p(x) линейно, оцениваем МНК

<div class="grid grid-cols-2 gap-12 items-center mt-9">
  <div class="math-column">
    <div class="section-label">модель вероятности</div>
    <MathBlock formula="P(Y=1\mid X=x)=\beta_0+x^\top\beta" class="mt-11 text-[30px]" />
  </div>
  <div class="math-column">
    <div class="section-label">обучение</div>
    <MathBlock formula="(\hat\beta_0,\hat\beta)\in\arg\min_{\beta_0,\beta}\sum_i(y_i-\beta_0-x_i^\top\beta)^2" class="mt-9 text-[24px]" />
  </div>
</div>

<div class="key-line text-center mt-8 text-[22px]">
  Наблюдаем <MathBlock formula="y_i\in\{0,1\}" :display="false" class="inline-block text-[22px]" />, а не готовые вероятности.
  OLS нацелен на <MathBlock formula="\mathbb E[Y\mid X=x]=P(Y=1\mid X=x)" :display="false" class="inline-block text-[22px]" />.
</div>

---

<!-- S07 -->

<SectionChrome section="От класса к вероятности" />
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

<!-- S08 -->

<SectionChrome section="От класса к вероятности" />
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

<!-- S09 -->

<SectionChrome section="От класса к вероятности" />
# Odds: 20 событий против 80 несобытий

<div class="grid grid-cols-[1.05fr_0.95fr] gap-14 items-center mt-12">
  <div>
    <div class="flex items-end gap-3 h-[190px]">
      <div class="bg-blue-100 border-t-4 border-blue-600 w-1/2 h-[70px] grid place-items-center text-[28px] text-blue-700">20 событий</div>
      <div class="bg-green-100 border-t-4 border-green-700 w-1/2 h-[170px] grid place-items-center text-[28px] text-green-800">80 несобытий</div>
    </div>
    <div class="text-center text-[31px] mt-8">20 : 80 = 1 : 4</div>
  </div>
  <div class="text-center">
    <MathBlock formula="p=0.2" class="text-[34px]" />
    <MathBlock formula="\operatorname{odds}(p)=\frac{p}{1-p}=\frac14" class="mt-12 text-[34px]" />
    <div class="micro mt-8">odds — шансы: отношение событий к несобытиям.</div>
  </div>
</div>

---

<!-- S10 -->

<SectionChrome section="От класса к вероятности" />
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

<!-- S11 -->

<SectionChrome section="От класса к вероятности" />
# Чтобы получить вещественную шкалу, берём логарифм odds

<div class="grid grid-cols-[1.15fr_0.85fr] gap-10 items-center mt-0">
  <img src="/assets/week-04/log-positive-axis.svg" alt="Натуральный логарифм переводит положительную полуось на всю вещественную прямую" class="figure h-[400px]" />
  <div>
    <MathBlock formula="(0,+\infty)\stackrel{\log}{\longrightarrow}\mathbb R" class="text-[31px]" />
    <div class="success-line mt-8 text-[21px]"><b>log монотонен:</b> порядок значений сохраняется.</div>
    <div class="key-line mt-7 text-[21px]"><b>Умножение превращается в сложение:</b><MathBlock formula="\log(ab)=\log a+\log b" class="mt-3 text-[23px]" /></div>
  </div>
</div>

---

<!-- S12 -->

<SectionChrome section="От класса к вероятности" />
# Это преобразование называется logit

<div class="text-center mt-1"><MathBlock formula="\boxed{\operatorname{logit}(p)=\log\frac{p}{1-p}}" class="text-[38px]" /></div>
<div class="text-center mt-1"><MathBlock formula="0<p<1" class="text-[24px]" /></div>

<table class="comparison-table mt-2 text-[25px]">
  <thead><tr><th>p</th><th>odds</th><th>logit</th></tr></thead>
  <tbody>
    <tr><td>0.2</td><td>1 : 4</td><td>−1.386</td></tr>
    <tr><td>0.5</td><td>1 : 1</td><td>0</td></tr>
    <tr><td>0.8</td><td>4 : 1</td><td>1.386</td></tr>
  </tbody>
</table>

<div class="success-line text-center mt-2">Logit — вещественное число, а не вероятность. Здесь и далее <i>log</i> означает натуральный логарифм.</div>


---

<!-- S13 -->

<SectionChrome section="От класса к вероятности" />
# Логистическая регрессия моделирует log-odds линейно

<div class="formula-box mt-20 py-10">
  <MathBlock formula="\boxed{\operatorname{logit}p(x)=\log\frac{p(x)}{1-p(x)}=\beta_0+x^\top\beta}" class="text-[39px]" />
</div>

<div class="success-line text-center mt-16 text-[30px]">Линейна не вероятность, а её log-odds.</div>

---

<!-- S14 -->

<SectionChrome section="От класса к вероятности" />
# Линейный score и logit — одна величина

<div class="text-center mt-5">
  <MathBlock formula="z(x)=\beta_0+x^\top\beta" class="text-[35px]" />
  <MathBlock formula="\boxed{z(x)=\operatorname{logit}p(x)}" class="mt-7 text-[38px]" />
</div>

<div class="grid grid-cols-3 gap-8 mt-14 text-center">
  <div class="prediction-chip"><MathBlock formula="z<0\Rightarrow p<0.5" class="text-[22px]" /></div>
  <div class="prediction-chip success"><MathBlock formula="z=0\Rightarrow p=0.5" class="text-[22px]" /></div>
  <div class="prediction-chip"><MathBlock formula="z>0\Rightarrow p>0.5" class="text-[22px]" /></div>
</div>

<div class="micro text-center mt-12">В логистической регрессии линейный score имеет вероятностный смысл: это log-odds положительного класса.</div>

---

<!-- S15 -->

<SectionChrome section="От класса к вероятности" />
# Решаем уравнение относительно вероятности p

<div class="proof-stack mt-0 text-center">
  <MathBlock formula="z=\log\frac{p}{1-p}" class="text-[23px]" />
  <MathBlock formula="e^z=\frac{p}{1-p}" class="text-[23px]" />
  <MathBlock formula="e^z(1-p)=p" class="text-[23px]" />
  <MathBlock formula="e^z-e^zp=p" class="text-[23px]" />
  <MathBlock formula="e^z=p+e^zp" class="text-[23px]" />
  <MathBlock formula="e^z=p(1+e^z)" class="text-[23px]" />
  <div class="proof-result mt-2 py-3"><MathBlock formula="\boxed{p=\frac{e^z}{1+e^z}=\frac1{1+e^{-z}}}" class="text-[34px]" /></div>
</div>

<div class="micro text-center mt-3">Для конечного score <i>z</i> получаем 0 &lt; <i>p</i> &lt; 1.</div>
<MathBlock formula="p\to0^+\Rightarrow\operatorname{logit}(p)\to-\infty,\qquad p\to1^-\Rightarrow\operatorname{logit}(p)\to+\infty" class="mt-2 text-[21px]" />


---

<!-- S16 -->

<SectionChrome section="От класса к вероятности" />
# Сигмоида переводит любой score в вероятность

<div class="grid grid-cols-[1.25fr_0.75fr] gap-8 items-center mt-0">
  <img src="/assets/week-04/sigmoid-and-score.svg" alt="Сигмоида переводит score в вероятность" class="figure h-[440px]" />
  <div>
    <MathBlock formula="\sigma(z)=\frac1{1+e^{-z}}" class="text-[31px]" />
    <MathBlock formula="\sigma:\mathbb R\to(0,1)" class="mt-5 text-[27px]" />
    <div class="key-line mt-6"><MathBlock formula="z\to-\infty\Rightarrow p\to0" class="text-[21px]" /></div>
    <div class="success-line mt-6"><MathBlock formula="z=0\Rightarrow p=0.5" class="text-[21px]" /></div>
    <div class="key-line mt-6"><MathBlock formula="z\to+\infty\Rightarrow p\to1" class="text-[21px]" /></div>
  </div>
</div>


---

<!-- S17 -->

<SectionChrome section="От класса к вероятности" />
# Определение логистической регрессии

<div class="formula-box mt-16 py-10">
  <MathBlock formula="\boxed{p(x)=P(Y=1\mid X=x)=\sigma\!\left(\beta_0+x^\top\beta\right)}" class="text-[38px]" />
</div>

<div class="flow-row mt-14 max-w-[820px] mx-auto">
  <div class="flow-node">объект x</div><div class="flow-arrow">→</div><div class="flow-node">score z ∈ ℝ</div><div class="flow-arrow">→</div><div class="flow-node">вероятность p ∈ (0,1)</div>
</div>

<div class="micro text-center mt-10">Модель определена. Теперь разберём смысл её коэффициентов, а затем перейдём к обучению.</div>

---

<!-- S18 -->

<SectionChrome section="От класса к вероятности" />
# Коэффициент: сдвиг log-odds и отношение шансов

<div class="micro text-center mt-1">Увеличиваем <i>x</i><sub>j</sub> на 1 при фиксированных остальных признаках.</div>

<div class="grid grid-cols-2 gap-10 mt-3">
  <div class="math-column text-center">
    <div class="section-label">линейная модель вероятности</div>
    <MathBlock formula="p_{\rm new}-p_{\rm old}=\beta_j" class="mt-7 text-[29px]" />
    <div class="micro mt-4">постоянный эффект на вероятность</div>
  </div>
  <div class="math-column text-center">
    <div class="section-label">логистическая регрессия</div>
    <MathBlock formula="\log\operatorname{odds}_{\rm new}-\log\operatorname{odds}_{\rm old}=\beta_j" class="mt-7 text-[26px]" />
  </div>
</div>

<div class="text-center mt-4">
  <div class="text-[25px] text-slate-400">возводим <i>e</i> в степень обеих частей</div>
  <MathBlock formula="\boxed{\frac{\operatorname{odds}_{\rm new}}{\operatorname{odds}_{\rm old}}=e^{\beta_j}}" class="mt-2 text-[34px]" />
</div>

<div class="grid grid-cols-[0.72fr_1.28fr] gap-8 mt-4 items-center">
  <div class="case-box text-center py-4"><MathBlock formula="\beta_j=\log2\Rightarrow e^{\beta_j}=2" class="text-[25px]" /></div>
  <div class="success-line text-[22px]">Увеличение <i>x</i><sub>j</sub> на единицу удваивает odds, а не вероятность.</div>
</div>


---

<!-- S19 -->

<SectionChrome section="Вероятностный вывод" />
# Распределение Бернулли для бинарного ответа

<div class="grid grid-cols-[0.94fr_1.06fr] gap-8 items-center mt-1">
  <div>
    <MathBlock formula="Y_i\in\{0,1\}" class="text-[34px]" />
    <MathBlock formula="p_i=\sigma(x_i^\top\beta)" class="mt-8 text-[31px]" />
    <div class="formula-box mt-8 py-4"><MathBlock formula="Y_i\mid X=x_i\sim\operatorname{Bernoulli}(p_i)" class="text-[28px]" /></div>
  </div>
  <img src="/assets/week-04/bernoulli-two-outcomes.svg" alt="Два исхода распределения Бернулли" class="figure h-[285px]" />
</div>
<div class="grid grid-cols-2 gap-10 mt-3 text-center">
  <MathBlock formula="P(Y_i=1\mid x_i)=p_i" class="plain-label py-3 text-[27px]" />
  <MathBlock formula="P(Y_i=0\mid x_i)=1-p_i" class="plain-label py-3 text-[27px]" />
</div>
<div class="micro text-center mt-5 text-[20px]">Распределение Бернулли допускает <MathBlock formula="p\in[0,1]" :display="false" class="inline-block text-[20px]" />; здесь <MathBlock formula="p_i=\sigma(z_i)\in(0,1)" :display="false" class="inline-block text-[20px]" /> при конечном <i>z</i><sub>i</sub>.</div>


---

<!-- S20 -->

<SectionChrome section="Вероятностный вывод" />
# Два случая объединяются одной формулой

<div class="formula-box mt-8 py-8"><MathBlock formula="\boxed{P(Y_i=y_i\mid x_i)=p_i^{y_i}(1-p_i)^{1-y_i}}" class="text-[38px]" /></div>

<div class="grid grid-cols-2 gap-12 mt-12">
  <div class="math-column"><div class="section-label">если yᵢ = 1</div><MathBlock formula="p_i^1(1-p_i)^0=p_i" class="mt-10 text-[31px]" /></div>
  <div class="math-column"><div class="section-label">если yᵢ = 0</div><MathBlock formula="p_i^0(1-p_i)^1=1-p_i" class="mt-10 text-[31px]" /></div>
</div>

<div class="success-line text-center mt-7">Степени выбирают вероятность наблюдавшегося исхода.</div>

---

<!-- S21 -->

<SectionChrome section="Вероятностный вывод" />
# Правдоподобие всей выборки

<div class="lecture-question text-center mt-4 text-[24px]">Наблюдаемые <i>y</i><sub>i</sub> фиксированы. Меняем β и спрашиваем, при каких параметрах эти значения наиболее правдоподобны.</div>

<div class="proof-stack mt-8 text-center">
  <MathBlock formula="\mathcal L(\beta)=\prod_{i=1}^nP(Y_i=y_i\mid x_i)" class="text-[34px]" />
  <div class="text-[30px] text-slate-400">↓ подставляем Bernoulli</div>
  <div class="proof-result py-6"><MathBlock formula="\boxed{\mathcal L(\beta)=\prod_{i=1}^np_i^{y_i}(1-p_i)^{1-y_i}}" class="text-[38px]" /></div>
</div>

<div class="micro text-center mt-12">Произведение используется при условной независимости объектов.</div>

---

<!-- S22 -->

<SectionChrome section="Вероятностный вывод" />
# MLE: выбираем коэффициенты

<div class="lecture-question text-center mt-18">Данные фиксированы; меняем параметры модели.</div>

<div class="formula-box mt-14 py-12"><MathBlock formula="\boxed{\hat\beta\in\arg\max_\beta\mathcal L(\beta)}" class="text-[48px]" /></div>

---

<!-- S23 -->

<SectionChrome section="Вероятностный вывод" />
# Логарифм превращает произведение в сумму

<div class="proof-stack mt-8 text-center">
  <MathBlock formula="\log\mathcal L(\beta)=\sum_i\log\!\left[p_i^{y_i}(1-p_i)^{1-y_i}\right]" class="text-[31px]" />
  <div class="text-[28px] text-slate-400">↓ степени становятся множителями</div>
  <MathBlock formula="=\sum_i\left[y_i\log p_i+(1-y_i)\log(1-p_i)\right]" class="proof-result py-6 text-[33px]" />
</div>

<div class="success-line text-center mt-12">Логарифм монотонен: положение максимума likelihood не меняется.</div>

---

<!-- S24 -->

<SectionChrome section="Вероятностный вывод" />
# Из максимума правдоподобия получаем минимум NLL

<div class="proof-stack mt-10 text-center">
  <MathBlock formula="\arg\max_\beta\log\mathcal L(\beta)=\arg\min_\beta[-\log\mathcal L(\beta)]" class="text-[32px]" />
  <div class="text-[28px] text-slate-400">↓ меняем знак</div>
  <MathBlock formula="-\log\mathcal L(\beta)=-\sum_i\left[y_i\log p_i+(1-y_i)\log(1-p_i)\right]" class="formula-box py-6 text-[30px]" />
</div>

<div class="success-line text-center mt-12">Модель Бернулли задаёт новую функцию потерь через отрицательное log-правдоподобие.</div>

---

<!-- S25 -->

<SectionChrome section="Вероятностный вывод" />
# В языке эмпирического риска делим на n

<div class="formula-box mt-7 py-7"><MathBlock formula="R_n(\beta)=-\frac1n\sum_i\left[y_i\log p_i+(1-y_i)\log(1-p_i)\right]" class="text-[34px]" /></div>

<div class="text-center mt-10"><MathBlock formula="\arg\min_\beta[-\log\mathcal L(\beta)]=\arg\min_\beta R_n(\beta)" class="text-[30px]" /></div>

<div class="grid grid-cols-2 gap-10 mt-10">
  <div class="key-line">Произведение likelihood уже агрегирует все объекты.</div>
  <div class="success-line">Множитель 1/n переводит сумму в среднюю потерю на объект и не меняет минимум.</div>
</div>

---

<!-- S26 -->

<SectionChrome section="Вероятностный вывод" />
# Log loss одного объекта

<div class="formula-box mt-4 py-6"><MathBlock formula="\boxed{L(y,p)=-y\log p-\left(1-y\right)\log(1-p)}" class="text-[38px]" /></div>
<div class="micro text-center mt-3 text-[20px]">Здесь <MathBlock formula="0<p<1" :display="false" class="inline-block text-[20px]" />: в логистической регрессии <MathBlock formula="p=\sigma(z)" :display="false" class="inline-block text-[20px]" />, поэтому оба логарифма определены.</div>

<div class="grid grid-cols-2 gap-12 mt-10 text-center">
  <div class="math-column"><MathBlock formula="y=1\Rightarrow L=-\log p" class="mt-8 text-[31px]" /></div>
  <div class="math-column"><MathBlock formula="y=0\Rightarrow L=-\log(1-p)" class="mt-8 text-[31px]" /></div>
</div>

<div class="micro text-center mt-7"><MathBlock formula="p_i=p_\beta(x_i)=\sigma(x_i^\top\beta)" :display="false" class="inline-block text-[21px]" />: при обучении loss зависит от β через <i>p</i><sub>i</sub>.</div>
<div class="micro text-center mt-4"><b>binary cross-entropy (BCE)</b> — распространённое альтернативное название той же функции.</div>


---

<!-- S27 -->

<SectionChrome section="Вероятностный вывод" />
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

<!-- S28 -->

<SectionChrome section="Вероятностный вывод" />
# Что должен выдавать хороший вероятностный прогноз?

<div class="grid grid-cols-2 gap-12 items-center mt-7">
  <div class="text-center">
    <div class="text-[32px] text-blue-700">100 случаев при одинаковом X = x</div>
    <div class="grid grid-cols-2 gap-6 mt-10">
      <div class="warning-box text-[29px]">20 единиц</div>
      <div class="success-box text-[29px]">80 нулей</div>
    </div>
  </div>
  <div>
    <div class="section-label">истинная вероятность</div>
    <MathBlock formula="q=P(Y=1\mid X=x)=0.2" class="mt-5 text-[33px]" />
    <div class="section-label mt-10">прогноз модели</div>
    <MathBlock formula="p\in(0,1)" class="mt-5 text-[33px]" />
  </div>
</div>

<div class="lecture-question text-center mt-10 text-[28px]">Какое <i>p</i> минимизирует среднюю log loss, если такие условия повторяются много раз?</div>


---

<!-- S29 -->

<SectionChrome section="Вероятностный вывод" />
# От двух исходов к ожидаемой log loss

<div class="micro text-center mt-2 text-[21px]">Фиксируем <MathBlock formula="X=x" :display="false" class="inline-block text-[21px]" /> и используем один прогноз <MathBlock formula="p" :display="false" class="inline-block text-[21px]" /> при каждом повторении условий.</div>

<div class="grid grid-cols-2 gap-10 mt-8 text-center">
  <div class="math-column py-6">
    <MathBlock formula="P(Y=1\mid X=x)=q" class="text-[27px]" />
    <MathBlock formula="L(1,p)=-\log p" class="mt-6 text-[30px]" />
    <div class="micro mt-4">при q = 0.2 — около 20% случаев</div>
  </div>
  <div class="math-column py-6">
    <MathBlock formula="P(Y=0\mid X=x)=1-q" class="text-[27px]" />
    <MathBlock formula="L(0,p)=-\log(1-p)" class="mt-6 text-[30px]" />
    <div class="micro mt-4">при q = 0.2 — около 80% случаев</div>
  </div>
</div>

<div class="formula-box mt-7 py-5"><MathBlock formula="\Phi(p)=\mathbb E[L(Y,p)\mid X=x]=qL(1,p)+(1-q)L(0,p)" class="text-[27px]" /></div>
<MathBlock formula="\Phi(p)=-q\log p-\bigl(1-q\bigr)\log(1-p)" class="mt-5 text-[28px]" />
<div class="micro text-center mt-4 text-[20px]">Ожидаемая log loss — средняя цена одного прогноза <i>p</i> при многократном повторении условий <i>X</i> = <i>x</i>.</div>


---

<!-- S30 -->

<SectionChrome section="Вероятностный вывод" />
# Почему минимум именно при p = q

<div class="text-center mt-1">
  <MathBlock formula="\Phi'(p)=\frac{p-q}{p(1-p)},\qquad 0<p<1\Rightarrow p(1-p)>0" class="text-[28px]" />
</div>

<div class="grid grid-cols-[0.9fr_1.1fr] gap-8 items-center mt-4">
  <div class="text-[21px]">
    <div class="plain-label py-3"><MathBlock formula="p<q\Rightarrow\Phi'(p)<0" class="text-[23px]" /><div class="micro mt-1">Увеличение p уменьшает потерю.</div></div>
    <div class="plain-label py-3 mt-4"><MathBlock formula="p=q\Rightarrow\Phi'(p)=0" class="text-[23px]" /></div>
    <div class="plain-label py-3 mt-4"><MathBlock formula="p>q\Rightarrow\Phi'(p)>0" class="text-[23px]" /><div class="micro mt-1">Увеличение p повышает потерю.</div></div>
  </div>
  <img src="/assets/week-04/expected-log-loss.svg" alt="Ожидаемая log loss при q равно 0.2: минимум в p равно q" class="figure h-[315px]" />
</div>

<div class="text-center mt-1 text-[20px]">Функция убывает до <i>p</i> = <i>q</i> и растёт после; важно само значение вероятности, а не только класс.</div>
<div class="formula-box mt-3 py-3"><MathBlock formula="\boxed{0<q<1:\quad\arg\min_{p\in(0,1)}\mathbb E[L(Y,p)\mid X=x]=q=P(Y=1\mid X=x)}" class="text-[27px]" /></div>


---

<!-- S31 -->

<SectionChrome section="Вероятностный вывод" />
# От модели Бернулли к целевой функции

<div class="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-5 items-center mt-16 text-center">
  <div class="math-column py-7"><div class="section-label">модель Бернулли</div><MathBlock formula="Y_i\mid x_i\sim\operatorname{Bernoulli}(p_i)" class="mt-7 text-[24px]" /></div>
  <div class="text-[34px] text-slate-400">→</div>
  <div class="math-column py-7"><div class="section-label">правдоподобие и NLL</div><MathBlock formula="-\log\mathcal L(\beta)" class="mt-7 text-[27px]" /></div>
  <div class="text-[34px] text-slate-400">→</div>
  <div class="math-column py-7"><div class="section-label">эмпирический риск</div><MathBlock formula="R_n(\beta)=\frac1n\sum_iL_i" class="mt-7 text-[27px]" /></div>
</div>

<div class="success-line text-center mt-12 text-[27px]">Модель и целевая функция определены. Осталось получить градиент по параметрам.</div>

---

<!-- S32 -->

<SectionChrome section="Как обучаем" />
# Целевая функция уже известна; нужен градиент

<div class="grid grid-cols-2 gap-12 items-center mt-9">
  <div class="math-column"><div class="section-label">прогнозы</div><MathBlock formula="p=\sigma(X\beta)" class="mt-12 text-[35px]" /></div>
  <div class="math-column"><div class="section-label">целевая функция</div><MathBlock formula="R_n(\beta)=-\frac1n\sum_i[y_i\log p_i+(1-y_i)\log(1-p_i)]" class="mt-8 text-[22px]" /></div>
</div>

<div class="lecture-question text-center mt-14">Что передать уже знакомому градиентному спуску?</div>

---

<!-- S33 -->

<SectionChrome section="Как обучаем" />
# Для одного объекта есть цепочка β → z → p → L

<div class="process-chain mt-16 !grid-cols-[1fr_auto_1.3fr_auto_1.25fr_auto_1.2fr]">
  <div><span>параметры</span><MathBlock formula="\beta" /></div><i>→</i>
  <div><span>score</span><MathBlock formula="z_i=x_i^\top\beta" /></div><i>→</i>
  <div><span>вероятность</span><MathBlock formula="p_i=\sigma(z_i)" /></div><i>→</i>
  <div><span>loss</span><MathBlock formula="L_i=L(y_i,p_i)" /></div>
</div>

<div class="formula-box mt-16 py-7"><MathBlock formula="\frac{\partial L_i}{\partial z_i}=\frac{\partial L_i}{\partial p_i}\frac{\partial p_i}{\partial z_i}" class="text-[36px]" /></div>

---

<!-- S34 -->

<SectionChrome section="Как обучаем" />
# Первая производная: log loss по p

<div class="proof-stack mt-16 text-center">
  <MathBlock formula="L_i=-y_i\log p_i-\left(1-y_i\right)\log(1-p_i)" class="text-[33px]" />
  <div class="text-[30px] text-slate-400">↓ дифференцируем по pᵢ</div>
  <div class="proof-result py-7"><MathBlock formula="\boxed{\frac{\partial L_i}{\partial p_i}=-\frac{y_i}{p_i}+\frac{1-y_i}{1-p_i}}" class="text-[38px]" /></div>
</div>

---

<!-- S35 -->

<SectionChrome section="Как обучаем" />
# Вторая производная: sigmoid по z

<div class="proof-stack mt-18 text-center">
  <MathBlock formula="p_i=\sigma(z_i)" class="text-[37px]" />
  <div class="text-[30px] text-slate-400">↓ производная сигмоиды</div>
  <div class="proof-result py-8"><MathBlock formula="\boxed{\frac{\partial p_i}{\partial z_i}=p_i(1-p_i)}" class="text-[42px]" /></div>
  <MathBlock formula="\sigma'(z)=\sigma(z)(1-\sigma(z))" class="mt-8 text-[29px]" />
</div>

---

<!-- S36 -->

<SectionChrome section="Как обучаем" />
# Подставляем правило цепочки

<div class="proof-stack mt-14 text-center">
  <MathBlock formula="\frac{\partial L_i}{\partial z_i}=\left(-\frac{y_i}{p_i}+\frac{1-y_i}{1-p_i}\right)p_i(1-p_i)" class="text-[36px]" />
  <div class="text-[30px] text-slate-400">↓ подставляем и упрощаем</div>
  <div class="proof-result py-8"><MathBlock formula="=-y_i(1-p_i)+(1-y_i)p_i" class="text-[39px]" /></div>
</div>

---

<!-- S37 -->

<SectionChrome section="Как обучаем" />
# Красивое сокращение: pᵢ − yᵢ

<div class="proof-stack mt-8 text-center">
  <MathBlock formula="-y_i(1-p_i)+(1-y_i)p_i" class="text-[34px]" />
  <MathBlock formula="=-y_i+y_ip_i+p_i-y_ip_i" class="text-[34px]" />
  <div class="text-[30px] text-slate-400">↓ одинаковые слагаемые сокращаются</div>
  <div class="proof-result py-8"><MathBlock formula="\boxed{\frac{\partial L_i}{\partial z_i}=p_i-y_i}" class="text-[45px]" /></div>
</div>

<div class="success-line text-center mt-11">Получили особенно простой результат: производная log loss по score равна <i>p</i><sub>i</sub> − <i>y</i><sub>i</sub>.</div>

---

<!-- S38 -->

<SectionChrome section="Как обучаем" />
# Нам нужна производная по параметрам β

<div class="text-center mt-4"><MathBlock formula="\nabla_\beta L_i" class="formula-box py-4 text-[34px]" /></div>

<div class="proof-stack mt-7 text-center">
  <MathBlock formula="z_i=x_i^\top\beta=x_{i1}\beta_1+\dots+x_{iq}\beta_q" class="text-[33px]" />
  <MathBlock formula="\frac{\partial z_i}{\partial\beta_j}=x_{ij}" class="text-[34px]" />
  <div class="text-[30px] text-slate-400">↓ собираем производные по всем коэффициентам</div>
  <div class="proof-result py-8"><MathBlock formula="\boxed{\nabla_\beta z_i=x_i}" class="text-[44px]" /></div>
</div>

---

<!-- S39 -->

<SectionChrome section="Как обучаем" />
# Получили градиент loss по параметрам

<div class="proof-stack mt-16 text-center">
  <MathBlock formula="\nabla_\beta L_i=\frac{\partial L_i}{\partial z_i}\nabla_\beta z_i" class="text-[37px]" />
  <div class="text-[30px] text-slate-400">↓ подставляем два полученных результата</div>
  <div class="proof-result py-9"><MathBlock formula="\boxed{\nabla_\beta L_i=(p_i-y_i)x_i}" class="text-[45px]" /></div>
</div>

<div class="micro text-center mt-10">Это то, что нужно оптимизатору для одного объекта.</div>

---

<!-- S40 -->

<SectionChrome section="Как обучаем" />
# Складываем вклады всех объектов

<div class="proof-stack mt-16 text-center">
  <MathBlock formula="\nabla_\beta R_n(\beta)=\frac1n\sum_{i=1}^n\nabla_\beta L_i" class="text-[36px]" />
  <div class="text-[30px] text-slate-400">↓ подставляем градиент одного объекта</div>
  <div class="proof-result py-8"><MathBlock formula="=\frac1n\sum_{i=1}^n(p_i-y_i)x_i" class="text-[42px]" /></div>
</div>

<div class="success-line text-center mt-6">Градиент риска — среднее вкладов всех обучающих объектов.</div>

---

<!-- S41 -->

<SectionChrome section="Как обучаем" />
# Та же сумма в матричной записи

<div class="grid grid-cols-[0.9fr_1.1fr] gap-9 items-center mt-0">
  <div class="formula-box py-5 px-4">
    <MathBlock formula="X=\begin{pmatrix}x_1^\top\\\vdots\\x_n^\top\end{pmatrix}\in\mathbb R^{n\times q}" class="text-[26px]" />
    <MathBlock formula="p-y=\begin{pmatrix}p_1-y_1\\\vdots\\p_n-y_n\end{pmatrix}\in\mathbb R^n" class="mt-7 text-[25px]" />
  </div>
  <div>
    <MathBlock formula="X^\top(p-y)=\sum_{i=1}^n(p_i-y_i)x_i" class="text-[29px]" />
    <div class="micro mt-5">i-я строка X и i-я ошибка вероятности образуют один взвешенный вклад.</div>
    <div class="proof-result mt-8 py-6"><MathBlock formula="\boxed{\nabla_\beta R_n(\beta)=\frac1nX^\top(p-y)}" class="text-[35px]" /></div>
  </div>
</div>

<div class="micro text-center mt-6">Размерность результата — q: по одной компоненте градиента на каждый коэффициент.</div>

---

<!-- S42 -->

<SectionChrome section="Как обучаем" />
# Один шаг градиентного спуска

<div class="formula-box mt-7 py-8"><MathBlock formula="\boxed{\beta^{(t+1)}=\beta^{(t)}-\eta\frac1nX^\top\!\left(p^{(t)}-y\right)}" class="text-[40px]" /></div>

<div class="grid grid-cols-2 gap-10 mt-10 text-center">
  <MathBlock formula="z^{(t)}=X\beta^{(t)}" class="plain-label text-[30px]" />
  <MathBlock formula="p^{(t)}=\sigma(z^{(t)})=\sigma(X\beta^{(t)})" class="plain-label text-[27px]" />
</div>

<div class="success-line text-center mt-12">После обновления коэффициентов score и вероятности пересчитываются заново.</div>

---

<!-- S43 -->

<SectionChrome section="Как обучаем" />
# Тот же цикл градиентного спуска, новые части логистической регрессии

<div class="grid grid-cols-[1.15fr_0.85fr] gap-12 items-center mt-0">
  <div class="geometry-chain text-center">
    <MathBlock formula="\beta" class="text-[26px]" /><div>↓</div>
    <MathBlock formula="z=X\beta" class="text-[26px]" /><div>↓</div>
    <MathBlock formula="p=\sigma(z)" class="text-[26px]" /><div>↓</div>
    <div class="text-[25px]">log loss</div><div>↓</div>
    <MathBlock formula="\frac1nX^\top(p-y)" class="text-[27px]" /><div>↓</div>
    <div class="text-[25px]">обновление β</div>
  </div>
  <div class="recap-list text-[22px]">
    <div>Прогноз — новый.</div>
    <div>Функция потерь — новая.</div>
    <div>Формула градиента — новая.</div>
    <div><b>Цикл оптимизатора — тот же.</b></div>
  </div>
</div>

---

<!-- S44 -->

<SectionChrome section="Как обучаем" />
# Выпуклость: одна важная идея

<div class="grid grid-cols-[1.15fr_0.85fr] gap-9 items-center mt-0">
  <img src="/assets/week-04/convex-logistic-objective.svg" alt="Одномерный срез выпуклой целевой функции логистической регрессии" class="figure h-[430px]" />
  <div>
    <div class="statement">У нерегуляризованной логистической регрессии log loss выпукла по коэффициентам.</div>
    <div class="micro mt-8">На рисунке — срез целевой функции вдоль одного направления.</div>
    <div class="success-line mt-9 text-[23px]">Выпуклость исключает отдельные локальные минимумы.</div>
    <div class="micro mt-8">Полное доказательство через Hessian вынесено в приложение.</div>
  </div>
</div>

---

<!-- S45 -->

<SectionChrome section="От вероятности к решению" />
# После обучения есть три разных уровня результата

<div class="geometry-chain mt-5 text-center gap-y-4">
  <div class="formula-box py-5"><MathBlock formula="\hat z(x)=x^\top\hat\beta\qquad\text{score / log-odds}" class="text-[31px]" /></div>
  <div class="my-2">↓</div>
  <div class="formula-box py-5"><MathBlock formula="\hat p(x)=\sigma(\hat z(x))\qquad\text{оценка вероятности}" class="text-[31px]" /></div>
  <div class="my-2">↓ порог</div>
  <div class="formula-box py-5"><MathBlock formula="\hat y_t(x)\qquad\text{жёсткая метка класса}" class="text-[31px]" /></div>
</div>

<div class="success-line text-center mt-8">Чтобы получить класс, к вероятности нужно добавить правило решения.</div>

---

<!-- S46 -->

<SectionChrome section="От вероятности к решению" />
# В scikit-learn эти уровни тоже разделены

<table class="comparison-table mt-12 text-[26px]">
  <thead><tr><th>Смысл</th><th>scikit-learn</th></tr></thead>
  <tbody>
    <tr><td>score</td><td><code>decision_function</code></td></tr>
    <tr><td>вероятности классов</td><td><code>predict_proba</code></td></tr>
    <tr><td>жёсткая метка</td><td><code>predict</code></td></tr>
  </tbody>
</table>

<div class="warning-line text-center mt-14 text-[25px]"><code>predict_proba</code> возвращает оценки вероятностей, а не гарантированно точные частоты.</div>

---

<!-- S47 -->

<SectionChrome section="От вероятности к решению" />
# Порог превращает вероятность в метку

<div class="formula-box mt-8 py-7"><MathBlock formula="\boxed{\hat y_t(x)=I[\hat p(x)\ge t],\qquad 0<t<1}" class="text-[38px]" /></div>

<div class="relative mt-16 mx-auto w-[900px] h-[155px]">
  <div class="absolute left-0 top-[42px] w-[58%] h-[58px] bg-blue-100 border-y-2 border-blue-300 grid place-items-center text-blue-800"><MathBlock formula="p<t\quad\Rightarrow\quad\text{класс }0" class="text-[25px]" /></div>
  <div class="absolute left-[58%] right-0 top-[42px] h-[58px] bg-green-100 border-y-2 border-green-300 grid place-items-center text-green-800"><MathBlock formula="p\ge t\quad\Rightarrow\quad\text{класс }1" class="text-[25px]" /></div>
  <div class="absolute left-[58%] top-[8px] h-[120px] border-l-4 border-orange-500"></div>
  <div class="absolute left-[55.5%] top-[-18px] text-orange-700 font-bold text-[24px]">порог <i>t</i></div>
  <div class="absolute left-0 top-[112px] text-[22px]">0</div><div class="absolute right-0 top-[112px] text-[22px]">1</div>
</div>

<div class="key-line text-center mt-6"><MathBlock formula="I[\cdot]=1" :display="false" class="inline-block text-[22px]" /> при выполненном условии; иначе 0. Изменение порога не переобучает модель.</div>


---

<!-- S48 -->

<SectionChrome section="От вероятности к решению" />
# Почему порог 0.5 означает score ≥ 0

<div class="grid grid-cols-[1.05fr_0.95fr] gap-10 items-center mt-0">
  <img src="/assets/week-04/sigmoid-threshold-half.svg" alt="Сигмоида с отмеченными z равно нулю и p равно 0.5" class="figure h-[400px]" />
  <div class="proof-stack text-center">
    <MathBlock formula="\hat p(x)\ge0.5" class="text-[29px]" />
    <MathBlock formula="\Longleftrightarrow\sigma(\hat z(x))\ge\sigma(0)" class="text-[29px]" />
    <MathBlock formula="\Longleftrightarrow\hat z(x)\ge0" class="text-[29px]" />
    <div class="proof-result py-5"><MathBlock formula="\Longleftrightarrow x^\top\hat\beta\ge0" class="text-[36px]" /></div>
  </div>
</div>

<div class="success-line text-center mt-4">Сигмоида строго возрастает, поэтому сохраняет порядок score.</div>

---

<!-- S49 -->

<SectionChrome section="От вероятности к решению" />
# При t = 0.5 граница решения — z(x) = 0

<div class="grid grid-cols-[0.78fr_1.22fr] gap-8 items-center mt-0">
  <div>
    <MathBlock formula="\boxed{\hat\beta_0+\hat\beta_1x_1+\hat\beta_2x_2=0}" class="text-[30px]" />
    <div class="key-line mt-10">В двух признаках граница — прямая.</div>
    <div class="success-line mt-7">По разные стороны от неё score имеет разные знаки.</div>
    <div class="micro mt-8">В большем числе признаков это гиперплоскость.</div>
  </div>
  <img src="/assets/week-04/linear-boundary-2d.svg" alt="Два класса и линейная граница решения в координатах двух признаков" class="figure h-[450px]" />
</div>

---

<!-- S50 -->

<SectionChrome section="От вероятности к решению" />
# Любой порог вероятности можно перевести в порог score

<div class="text-center mt-1"><MathBlock formula="0<t<1" class="text-[25px]" /></div>
<div class="proof-stack mt-4 text-center">
  <MathBlock formula="\hat p(x)\ge t" class="text-[28px]" />
  <MathBlock formula="\Longleftrightarrow\operatorname{logit}(\hat p(x))\ge\operatorname{logit}(t)" class="text-[29px]" />
  <MathBlock formula="\Longleftrightarrow x^\top\hat\beta\ge\log\frac{t}{1-t}" class="text-[34px]" />
</div>

<div class="grid grid-cols-2 gap-10 mt-10 text-center">
  <div class="plain-label py-5"><MathBlock formula="t=0.2\Rightarrow z\ge-1.386" class="text-[27px]" /></div>
  <div class="plain-label py-5"><MathBlock formula="t=0.8\Rightarrow z\ge1.386" class="text-[27px]" /></div>
</div>

<div class="micro text-center mt-8">Порог 0.5 выделен только тем, что logit(0.5) = 0.</div>


---

<!-- S51 -->

<SectionChrome section="От вероятности к решению" />
# Одна модель, два порога, разные решения

<div class="grid grid-cols-[150px_repeat(5,minmax(0,1fr))] gap-3 mt-16 text-center items-stretch text-[25px]">
  <div class="section-label grid place-items-center">p̂</div><div class="plain-label grid place-items-center">0.91</div><div class="plain-label grid place-items-center">0.72</div><div class="plain-label grid place-items-center">0.48</div><div class="plain-label grid place-items-center">0.31</div><div class="plain-label grid place-items-center">0.08</div>
  <div class="section-label grid place-items-center">t = 0.5</div><div class="prediction-chip success grid place-items-center">1</div><div class="prediction-chip success grid place-items-center">1</div><div class="prediction-chip grid place-items-center">0</div><div class="prediction-chip grid place-items-center">0</div><div class="prediction-chip grid place-items-center">0</div>
  <div class="section-label grid place-items-center">t = 0.3</div><div class="prediction-chip success grid place-items-center">1</div><div class="prediction-chip success grid place-items-center">1</div><div class="prediction-chip success grid place-items-center">1</div><div class="prediction-chip success grid place-items-center">1</div><div class="prediction-chip grid place-items-center">0</div>
</div>

<div class="success-line text-center mt-12">Вероятности не изменились; изменились только жёсткие решения.</div>

---

<!-- S52 -->

<SectionChrome section="От вероятности к решению" />
# Самая простая проверка жёстких меток: accuracy

<div class="grid grid-cols-[120px_repeat(8,minmax(0,1fr))] gap-2 mt-8 text-center items-stretch text-[23px]">
  <div class="section-label grid place-items-center">y</div><div class="plain-label grid place-items-center">1</div><div class="plain-label grid place-items-center">0</div><div class="plain-label grid place-items-center">1</div><div class="plain-label grid place-items-center">1</div><div class="plain-label grid place-items-center">0</div><div class="plain-label grid place-items-center">0</div><div class="plain-label grid place-items-center">1</div><div class="plain-label grid place-items-center">0</div>
  <div class="section-label grid place-items-center">ŷ</div>
  <div class="relative grid place-items-center bg-green-50 text-green-800 font-bold rounded-lg">1<span class="absolute right-2 top-1 text-[11px]">✓</span></div>
  <div class="relative grid place-items-center bg-green-50 text-green-800 font-bold rounded-lg">0<span class="absolute right-2 top-1 text-[11px]">✓</span></div>
  <div class="grid place-items-center bg-orange-50 text-orange-700 font-bold rounded-lg">0</div>
  <div class="relative grid place-items-center bg-green-50 text-green-800 font-bold rounded-lg">1<span class="absolute right-2 top-1 text-[11px]">✓</span></div>
  <div class="relative grid place-items-center bg-green-50 text-green-800 font-bold rounded-lg">0<span class="absolute right-2 top-1 text-[11px]">✓</span></div>
  <div class="grid place-items-center bg-orange-50 text-orange-700 font-bold rounded-lg">1</div>
  <div class="relative grid place-items-center bg-green-50 text-green-800 font-bold rounded-lg">1<span class="absolute right-2 top-1 text-[11px]">✓</span></div>
  <div class="relative grid place-items-center bg-green-50 text-green-800 font-bold rounded-lg">0<span class="absolute right-2 top-1 text-[11px]">✓</span></div>
</div>

<div class="formula-box mt-14 py-7"><MathBlock formula="\boxed{\operatorname{accuracy}=\frac1n\sum_{i=1}^n I[\hat y_i=y_i]}" class="text-[38px]" /></div>

<div class="success-line text-center mt-9 text-[25px]">Доля правильных классификаций: здесь 6 из 8, то есть 0.75.</div>

---

<!-- S53 -->

<SectionChrome section="От вероятности к решению" />
# Почему 0.5 не обязано быть правильным решением

<div class="grid grid-cols-2 gap-12 mt-9">
  <div class="warning-box text-[25px]"><b>Событие произошло, модель оставила класс 0</b><br><br>Пропустили событие.</div>
  <div class="success-box text-[25px]"><b>События не было, модель поставила класс 1</b><br><br>Получили ложную тревогу.</div>
</div>

<div class="lecture-question text-center mt-14">Эти ошибки всегда одинаково дороги?</div>

<div class="success-line text-center mt-9 text-[27px]">Нет: порог должен зависеть от задачи принятия решения.</div>

---

<!-- S54 -->

<SectionChrome section="От вероятности к решению" />
# Что осталось неразрешённым

<div class="sequence-list mt-9 text-[27px]">
  <div><span>1</span><div>Как отдельно считать разные типы ошибок?</div></div>
  <div><span>2</span><div>Что делать, если положительный класс редкий?</div></div>
  <div><span>3</span><div>Как выбирать порог, если цели конфликтуют?</div></div>
</div>

<div class="success-line text-center mt-12 text-[28px]">Для этого понадобится больше одной метрики классификации.</div>

---

<!-- S55 -->

<SectionChrome section="От вероятности к решению" />
# Вся логистическая регрессия на одном экране

<div class="grid grid-cols-[1.05fr_0.95fr] gap-10 items-center mt-0">
  <div class="geometry-chain text-center gap-y-3">
    <MathBlock formula="z=X\beta=\operatorname{logit}(p)" class="text-[25px]" /><div class="my-1">↓ σ</div>
    <MathBlock formula="p=P(Y=1\mid X)" class="text-[25px]" /><div class="my-1">↓</div>
    <div class="text-[23px]">правдоподобие Бернулли</div><div class="my-1">↓ −log</div>
    <div class="text-[23px]">log loss</div><div class="my-1">↓</div>
    <MathBlock formula="\nabla R=\frac1nX^\top(p-y)" class="text-[25px]" /><div class="my-1">↓ обновление β</div>
    <MathBlock formula="\hat p\quad\xrightarrow{\ t\ }\quad\hat y" class="text-[27px]" />
  </div>
  <div class="recap-list text-[23px]">
    <div><b>Score, вероятность и класс — разные объекты.</b></div>
    <div>Модель Бернулли приводит к log loss; её градиент позволяет обучить параметры.</div>
    <div>Цикл градиентного спуска остаётся тем же.</div>
    <div>После обучения порог меняет решение, но не вероятностный прогноз.</div>
  </div>
</div>

---

<!-- A01 -->

<SectionChrome section="Приложение" />
# Предельный эффект вероятности зависит от p

<div class="grid grid-cols-[0.85fr_1.15fr] gap-9 items-center mt-0">
  <div>
    <MathBlock formula="\frac{\partial p(x)}{\partial x_j}=\beta_jp(x)(1-p(x))" class="text-[31px]" />
    <div class="success-line mt-9">Один и тот же сдвиг score сильнее меняет вероятность около p = 0.5.</div>
  </div>
  <img src="/assets/week-04/marginal-effect-sigmoid.svg" alt="Предельный эффект на разных участках сигмоиды" class="figure h-[420px]" />
</div>

---

<!-- A02 -->

<SectionChrome section="Приложение" />
# Вторая кодировка: −1/+1 и отступ

<div class="text-center mt-10">
  <MathBlock formula="\tilde y=2y-1,\qquad M=\tilde y z" class="text-[36px]" />
  <div class="formula-box mt-12 py-8"><MathBlock formula="L(\tilde y,z)=\log\!\left(1+e^{-\tilde yz}\right)" class="text-[41px]" /></div>
</div>

<div class="grid grid-cols-2 gap-10 mt-12 text-center">
  <div class="key-line"><MathBlock formula="M>0" :display="false" class="inline-block text-[21px]" /> — правильная сторона границы.</div>
  <div class="warning-line"><MathBlock formula="M<0" :display="false" class="inline-block text-[21px]" /> — неправильная сторона.</div>
</div>

---

<!-- A03 -->

<SectionChrome section="Приложение" />
# Почему целевая функция выпукла

<div class="proof-stack mt-12 text-center">
  <MathBlock formula="\nabla^2R_n(\beta)=\frac1nX^\top W X,\qquad W=\operatorname{diag}(p_i(1-p_i))" class="text-[31px]" />
  <div class="text-[30px] text-slate-400">↓ для любого v</div>
  <div class="proof-result py-8"><MathBlock formula="v^\top\nabla^2R_n v=\frac1n(Xv)^\top W(Xv)\ge0" class="text-[39px]" /></div>
</div>

<div class="success-line text-center mt-12">Диагональные элементы W неотрицательны, поэтому Hessian положительно полуопределён.</div>

---

<!-- A04 -->

<SectionChrome section="Приложение" />
# Perfect separation

<div class="grid grid-cols-[1.2fr_0.8fr] gap-10 items-center mt-0">
  <img src="/assets/week-04/linear-separability.svg" alt="Линейно разделимые и неразделимые бинарные данные" class="figure h-[430px]" />
  <div class="warning-line text-[24px]">При полной линейной разделимости максимум правдоподобия нерегуляризованной модели может не достигаться при конечных коэффициентах.</div>
</div>

---

<!-- A05 -->

<SectionChrome section="Приложение" />
# Практическая оговорка о scikit-learn

<div class="mt-16 text-center">
  <code class="text-[31px]">LogisticRegression()</code>
  <div class="statement mt-12">по умолчанию использует регуляризацию.</div>
</div>

<div class="grid grid-cols-2 gap-10 mt-14">
  <div class="key-line">В основной части лекции мы выводили нерегуляризованную MLE-задачу.</div>
  <div class="warning-line">Поэтому библиотечные коэффициенты могут не совпасть с ручным решением буквально.</div>
</div>
