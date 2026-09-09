---
theme: default
title: Линейная регрессия
author: НИУ ВШЭ
info: |
  Неделя 2 курса классического машинного обучения.
  Метод наименьших квадратов, геометрия решения, мультиколлинеарность,
  метрики и диагностика остатков.
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
  class: text-[23px]
exportFilename: week-02-linear-regression
appendixSlides: 0
download: false
---

<!-- S01 -->

<div class="section-kicker">Классическое машинное обучение · Неделя 2</div>
<h1 class="deck-title">Линейная регрессия</h1>
<div class="lead max-w-4xl">Как выбираются коэффициенты и что можно узнать из ошибок модели</div>
<img src="/assets/week-02/opening-regression.svg" alt="Наблюдения и оценённая линейная зависимость" class="figure h-[330px] mt-4" />
<div class="micro text-center mt-2">На этой неделе разбираем, что происходит внутри <code>fit</code> у одной конкретной модели.</div>

---

<!-- S02 -->

<SectionChrome section="Задача регрессии и бейзлайн" />
# Задача регрессии
<div class="text-center text-[25px] mt-2"><MathBlock formula="D=\{(x_i,y_i)\}_{i=1}^{n},\qquad x_i\in\mathcal X,\quad y_i\in\mathbb R" /></div>
<div v-click class="grid grid-cols-[1fr_auto_1fr] gap-6 items-center mt-7 text-center"><div class="key-line">обучающая выборка</div><div class="flow-arrow">→</div><MathBlock formula="\boxed{f:\mathcal X\to\mathbb R}" class="text-[31px]" /></div>
<div v-click class="text-center mt-7 text-[30px]"><MathBlock formula="\text{новый объект }x\longmapsto\hat y=f(x)" /></div>
<div v-click class="grid grid-cols-4 gap-4 mt-8 text-center text-[20px]"><div class="plain-label">цена</div><div class="plain-label">спрос</div><div class="plain-label">время доставки</div><div class="plain-label">прочность</div></div>
<div v-click class="success-line mt-7 text-center">Целевая переменная числовая; модель выдаёт числовой прогноз для нового объекта.</div>

---

<!-- S03 -->

<SectionChrome section="Задача регрессии и бейзлайн" />
# Если признаков нет
<img src="/assets/week-02/baseline-strip-data.svg" alt="Наблюдаемые значения целевой переменной" class="figure-wide h-[250px] mt-4" />
<div class="lecture-question text-center mt-7">Какое одно число <span class="text-[#2864dc] font-650">c</span> предсказывать всем объектам?</div>
<div v-click class="grid grid-cols-2 gap-12 mt-7 text-center text-[27px]"><MathBlock formula="f_c(x)=c" /><MathBlock formula="RSS(c)=\sum_{i=1}^{n}(y_i-c)^2" /></div>

---

<!-- S04 -->

<SectionChrome section="Задача регрессии и бейзлайн" />
# Почему среднее — лучший постоянный прогноз
<div class="grid grid-cols-[0.9fr_1.1fr] gap-10 items-center mt-2">
  <img src="/assets/week-02/baseline-strip-mean.svg" alt="Наблюдаемые значения и выборочное среднее" class="figure h-[345px]" />
  <div class="proof-stack text-center text-[21px]">
    <MathBlock formula="y_i-c=(y_i-\bar y)+(\bar y-c)" />
    <div v-click><MathBlock formula="\sum_i(y_i-c)^2=\sum_i(y_i-\bar y)^2+2(\bar y-c)\sum_i(y_i-\bar y)+n(\bar y-c)^2" /></div>
    <div v-click><MathBlock formula="\sum_{i=1}^{n}(y_i-\bar y)=\sum_{i=1}^{n}y_i-n\bar y=0" /></div>
    <div v-click><MathBlock formula="\boxed{\sum_i(y_i-c)^2=\sum_i(y_i-\bar y)^2+n(\bar y-c)^2}" /></div>
    <div v-click class="text-[30px]"><MathBlock formula="\Longrightarrow\quad\boxed{\hat c=\bar y}" /></div>
  </div>
</div>
<div v-click class="mt-5 text-center text-[21px] font-600">Для квадратичной ошибки выборочное среднее — лучший постоянный прогноз.</div>

---

<!-- S05 -->

<SectionChrome section="МНК для одного признака" />
# Добавим один признак
<img src="/assets/week-02/candidate-lines.svg" alt="Одни наблюдения и несколько возможных прямых" class="figure h-[360px] -mt-2" />
<div class="grid grid-cols-[1fr_auto_1fr] gap-6 items-center -mt-1 text-[27px] text-center"><MathBlock formula="x\in\mathbb R" /><div class="flow-arrow">→</div><div class="statement">какую прямую выбрать?</div></div>
<div v-click class="micro text-center mt-4">Каждая прямая соответствует одному набору коэффициентов.</div>

---

<!-- S06 -->

<SectionChrome section="МНК для одного признака" />
# Семейство линейных моделей
<div class="grid grid-cols-[0.9fr_1.1fr] gap-10 items-center -mt-1"><img src="/assets/week-02/line-parameters.svg" alt="Свободный член и наклон прямой" class="figure h-[355px]" /><div><MathBlock formula="\boxed{f_\beta(x)=\beta_0+\beta_1x}" class="text-center text-[31px]" /><div v-click class="key-line mt-6"><strong>β₀</strong> — свободный член</div><div v-click class="key-line mt-4"><strong>β₁</strong> — изменение прогноза при увеличении x на единицу</div><div v-click class="micro mt-5">Единицы β₁: «единицы y на единицу x».</div><div v-click class="warning-line mt-5">Пока β₀ и β₁ — произвольные параметры семейства.</div></div></div>


---

<!-- S07 -->

<SectionChrome section="МНК для одного признака" />
# После обучения: прогнозы и остатки
<div class="grid grid-cols-[1.14fr_0.86fr] gap-8 items-center mt-2">
  <img src="/assets/week-02/regression-residuals.svg" alt="Вертикальные остатки между наблюдаемыми значениями и прогнозами" class="figure h-[390px]" />
  <div class="text-[25px] text-center">
    <MathBlock v-click formula="\hat\beta=(\hat\beta_0,\hat\beta_1)" />
    <MathBlock v-click formula="\hat y_i=f_{\hat\beta}(x_i)" class="mt-7" />
    <MathBlock v-click formula="\boxed{r_i=y_i-\hat y_i}" class="mt-7" />
    <div v-click class="grid grid-cols-1 gap-4 mt-8 text-[20px] text-left"><div class="key-line">rᵢ &gt; 0: прогноз ниже наблюдаемого значения</div><div class="warning-line">rᵢ &lt; 0: прогноз выше наблюдаемого значения</div></div>
  </div>
</div>

---

<!-- S08 -->

<SectionChrome section="МНК для одного признака" />
# Критерий МНК
<div class="grid grid-cols-[0.9fr_1.1fr] gap-10 items-center mt-3">
  <img src="/assets/week-02/regression-residuals.svg" alt="Вертикальные остатки относительно оценённой прямой" class="figure h-[365px]" />
  <div class="text-center text-[25px]">
    <MathBlock formula="r_i(\beta_0,\beta_1)=y_i-\beta_0-\beta_1x_i" />
    <div v-click class="mt-9"><MathBlock formula="RSS(\beta_0,\beta_1)=\sum_{i=1}^{n}r_i(\beta_0,\beta_1)^2" /></div>
    <div v-click class="mt-10 text-[29px]"><MathBlock formula="\boxed{(\hat\beta_0,\hat\beta_1)=\arg\min_{\beta_0,\beta_1}RSS(\beta_0,\beta_1)}" /></div>
  </div>
</div>
<div v-click class="success-line mt-6 text-center text-[21px]">МНК выбирает коэффициенты, для которых сумма квадратов остатков минимальна.</div>

---

<!-- S09 -->

<SectionChrome section="МНК для одного признака" />
# RSS как функция двух коэффициентов
<div class="text-center text-[25px] mt-2"><MathBlock formula="RSS(\beta_0,\beta_1)=\sum_i(y_i-\beta_0-\beta_1x_i)^2" /></div>
<img v-click src="/assets/week-02/rss-landscape.svg" alt="Поверхность RSS и линии уровня для одной и той же функции" class="figure-wide h-[355px] mt-1" />
<div v-click class="success-line mt-2 text-center text-[21px]">Поверхность и линии уровня показывают одну выпуклую квадратичную функцию; отмеченная точка — решение МНК.</div>

---

<!-- S10 -->

<SectionChrome section="МНК для одного признака" />
# Условия первого порядка
<div class="grid grid-cols-2 gap-10 text-center text-[22px] mt-8"><MathBlock formula="\frac{\partial RSS}{\partial\beta_0}=-2\sum_{i=1}^{n}(y_i-\beta_0-\beta_1x_i)" /><MathBlock v-click formula="\frac{\partial RSS}{\partial\beta_1}=-2\sum_{i=1}^{n}x_i(y_i-\beta_0-\beta_1x_i)" /></div>
<div v-click class="mt-10 text-center text-[23px]"><MathBlock formula="\boxed{\begin{cases}\sum_i(y_i-\hat\beta_0-\hat\beta_1x_i)=0,\\[0.8em]\sum_i x_i(y_i-\hat\beta_0-\hat\beta_1x_i)=0.\end{cases}}" /></div>
<div v-click class="key-line mt-9 text-center text-[21px]">В точке минимума обе частные производные равны нулю: получаем систему двух уравнений.</div>

---

<!-- S11 -->

<SectionChrome section="МНК для одного признака" />
# Сначала найдём свободный член
<div class="text-center text-[25px] mt-4"><MathBlock formula="n\hat\beta_0+\hat\beta_1\sum_i x_i=\sum_i y_i" /><div v-click class="mt-5"><MathBlock formula="\hat\beta_0+\hat\beta_1\bar x=\bar y" /></div><div v-click class="mt-5 text-[31px]"><MathBlock formula="\boxed{\hat\beta_0=\bar y-\hat\beta_1\bar x}" /></div></div>
<div v-click class="grid grid-cols-[0.8fr_1.2fr] gap-10 mt-10 items-center"><div class="key-line text-center text-[23px]"><MathBlock formula="\sum_i(x_i-\bar x)^2>0" /></div><div class="text-[20px] muted">Если все xᵢ = x₀, данные определяют только число β₀ + β₁x₀, но не разделяют свободный член и наклон.</div></div>


---

<!-- S12 -->

<SectionChrome section="МНК для одного признака" />
# Формула для наклона
<div class="text-center text-[23px] mt-3"><MathBlock formula="\sum_i(x_i-\bar x)(y_i-\bar y)=\hat\beta_1\sum_i(x_i-\bar x)^2" /></div>
<div v-click class="grid grid-cols-[1.35fr_0.75fr] gap-10 items-center mt-8 text-center"><MathBlock formula="\boxed{\hat\beta_1=\frac{\sum_i(x_i-\bar x)(y_i-\bar y)}{\sum_i(x_i-\bar x)^2}}" class="text-[27px]" /><MathBlock formula="\boxed{\hat\beta_0=\bar y-\hat\beta_1\bar x}" class="text-[25px]" /></div>
<div v-click class="grid grid-cols-2 gap-8 mt-9 text-center text-[20px]"><div class="key-line">числитель: совместное изменение x и y</div><div class="key-line">знаменатель: вариация x</div></div>

---

<!-- S13 -->

<SectionChrome section="МНК для одного признака" />
# Численный пример: коэффициенты
<div class="grid grid-cols-[1.05fr_0.95fr] gap-9 items-center mt-2"><div class="text-center text-[21px]"><MathBlock formula="x=(0,1,2)^\top,\qquad y=(1,2,2)^\top" /><div v-click class="grid grid-cols-2 gap-5 mt-5"><MathBlock formula="\bar x=1" /><MathBlock formula="\bar y=\frac53" /></div><div v-click class="grid grid-cols-2 gap-5 mt-5"><MathBlock formula="\sum_i(x_i-\bar x)^2=2" /><MathBlock formula="\sum_i(x_i-\bar x)(y_i-\bar y)=1" /></div><div v-click class="grid grid-cols-2 gap-5 mt-6 text-[27px]"><MathBlock formula="\hat\beta_1=\frac12" /><MathBlock formula="\hat\beta_0=\frac76" /></div><div v-click class="proof-result mt-6 text-[29px]"><MathBlock formula="\boxed{\hat f(x)=\frac76+\frac12x}" /></div></div><img v-click src="/assets/week-02/scalar-worked-example.svg" alt="Три точки и оценённая прямая" class="figure h-[370px]" /></div>

---

<!-- S14 -->

<SectionChrome section="МНК для одного признака" />
# Численный пример: прогнозы и остатки
<div class="grid grid-cols-[0.9fr_1.1fr] gap-8 items-center -mt-1"><div class="text-center text-[24px]"><MathBlock formula="\hat y=\left(\frac76,\frac53,\frac{13}{6}\right)^\top" /><div v-click class="mt-7"><MathBlock formula="r=y-\hat y=\left(-\frac16,\frac13,-\frac16\right)^\top" /></div><div v-click class="key-line mt-7 text-[25px]"><MathBlock formula="\boxed{\sum_i r_i=0}" /></div></div><img src="/assets/week-02/scalar-worked-example.svg" alt="Прогнозы и вертикальные остатки численного примера" class="figure h-[375px]" /></div>
<div v-click class="micro text-center -mt-2">Формула дала коэффициенты, коэффициенты — прогнозы, прогнозы — остатки.</div>


---

<!-- S15 -->

<SectionChrome section="МНК для одного признака" />
# Следствия решения МНК
<div class="grid grid-cols-[0.82fr_1.18fr] gap-10 items-start mt-3">
  <div class="text-center text-[29px] pt-7"><MathBlock formula="\boxed{\hat f(\bar x)=\bar y}" /><div class="mt-6 text-[21px]">OLS-прямая проходит через точку (x̄, ȳ).</div><div v-click class="mt-9"><MathBlock formula="\boxed{\hat\beta_1=\frac{s_{xy}}{s_x^2}=r_{xy}\frac{s_y}{s_x}}" /></div></div>
  <div class="definition-stack text-[20px]"><MathBlock formula="s_x^2=\frac1{n-1}\sum_i(x_i-\bar x)^2" /><MathBlock formula="s_y^2=\frac1{n-1}\sum_i(y_i-\bar y)^2" /><MathBlock formula="s_{xy}=\frac1{n-1}\sum_i(x_i-\bar x)(y_i-\bar y)" /><MathBlock formula="r_{xy}=\frac{s_{xy}}{s_xs_y}" /></div>
</div>
<ul v-click class="lecture-bullets mt-8 text-[21px]"><li>МНК минимизирует RSS.</li><li>Наклон сравнивает совместное изменение x и y с вариацией x.</li><li>При свободном члене сумма обучающих остатков равна нулю.</li></ul>

---

<!-- S16 -->

<SectionChrome section="Матричная запись" />
# От таблицы к матрице X
<div class="grid grid-cols-[0.75fr_auto_1.25fr] gap-7 items-center mt-5"><table class="text-[18px]"><thead><tr><th>объект</th><th>x₁</th><th>x₂</th></tr></thead><tbody><tr><td>1</td><td>2.1</td><td>5.0</td></tr><tr><td>2</td><td>3.4</td><td>7.2</td></tr><tr><td>⋮</td><td>⋮</td><td>⋮</td></tr><tr><td>n</td><td>4.8</td><td>9.1</td></tr></tbody></table><div class="flow-arrow">→</div><MathBlock formula="X=\begin{pmatrix}1&x_{11}&x_{12}\\1&x_{21}&x_{22}\\\vdots&\vdots&\vdots\\1&x_{n1}&x_{n2}\end{pmatrix}" class="text-[24px]" /></div>
<div v-click class="grid grid-cols-3 gap-6 mt-7 text-[19px] text-center"><div class="key-line">строки — объекты</div><div class="key-line">столбцы — признаки</div><div class="key-line">единицы — свободный член</div></div>

---

<!-- S17 -->

<SectionChrome section="Матричная запись" />
# X, β, Xβ, y: что есть что
<div class="grid grid-cols-[1.5fr_0.5fr] gap-10 items-center mt-6 text-center text-[25px]"><MathBlock formula="\underbrace{\begin{pmatrix}1&x_{11}&\cdots&x_{1p}\\\vdots&\vdots&&\vdots\\1&x_{n1}&\cdots&x_{np}\end{pmatrix}}_{X\in\mathbb R^{n\times q}}\underbrace{\begin{pmatrix}\beta_0\\\beta_1\\\vdots\\\beta_p\end{pmatrix}}_{\beta\in\mathbb R^q}=\underbrace{\begin{pmatrix}(X\beta)_1\\\vdots\\(X\beta)_n\end{pmatrix}}_{X\beta\in\mathbb R^n}" /><MathBlock v-click formula="y=\begin{pmatrix}y_1\\\vdots\\y_n\end{pmatrix}\in\mathbb R^n" class="text-[29px]" /></div>
<div v-click class="success-line mt-10 text-center text-[22px]">Произведение Xβ содержит по одному прогнозу для каждого из n объектов.</div>

---

<!-- S18 -->

<SectionChrome section="Матричная запись" />
# МНК в матричной записи
<div class="text-center text-[26px] mt-5"><MathBlock formula="r=y-X\beta" /><div v-click class="mt-7"><MathBlock formula="\|r\|_2^2=\|y-X\beta\|_2^2=\sum_i\left(y_i-(X\beta)_i\right)^2" /></div><div v-click class="mt-8 text-[32px]"><MathBlock formula="\boxed{\hat\beta\in\arg\min_\beta\|y-X\beta\|_2^2}" /></div></div>
<div v-click class="success-line mt-8 text-center">Скалярная и матричная записи описывают один и тот же критерий МНК.</div>

---

<!-- S19 -->

<SectionChrome section="Матричная запись" />
# Как читать коэффициент βⱼ
<MathBlock formula="\hat y=\beta_0+\beta_1x_1+\dots+\beta_jx_j+\dots+\beta_px_p" class="text-center text-[24px] -mt-1" />
<div v-click class="grid grid-cols-[1.25fr_auto_0.55fr] gap-5 items-center mt-4 text-[18px]"><div class="contrast-row"><span>объект A</span><span>x₁</span><span class="contrast-focus">xⱼ</span><span>xₚ</span></div><div class="flow-arrow">→</div><div class="prediction-chip">ŷ</div></div>
<div v-click class="grid grid-cols-[1.25fr_auto_0.55fr] gap-5 items-center mt-3 text-[18px]"><div class="contrast-row"><span>объект B</span><span>x₁</span><span class="contrast-focus">xⱼ + 1</span><span>xₚ</span></div><div class="flow-arrow">→</div><div class="prediction-chip success">ŷ + βⱼ</div></div>
<div v-click class="success-line mt-5 text-center text-[21px]">При фиксированных остальных признаках увеличение xⱼ на единицу меняет прогноз на βⱼ.</div>
<div v-click class="grid grid-cols-3 gap-5 mt-5 text-[17px]"><div class="key-line">единицы y на единицу xⱼ</div><div class="warning-line">зависит от других признаков</div><div class="warning-line">не является автоматически причинным эффектом</div></div>

---

<!-- S20 -->

<SectionChrome section="Геометрия МНК" />
# Два факта линейной алгебры
<div class="grid grid-cols-[1.05fr_0.75fr] gap-16 items-center mt-10"><div class="text-center text-[31px]"><MathBlock formula="\langle a,b\rangle=\sum_i a_ib_i" /><div v-click class="mt-10"><MathBlock formula="\|a\|_2^2=\langle a,a\rangle" /></div><div v-click class="mt-10"><MathBlock formula="a\perp b\Longleftrightarrow\langle a,b\rangle=0" /></div></div><img src="/assets/week-02/orthogonal-vectors.svg" alt="Два перпендикулярных вектора" class="figure h-[305px]" /></div>

---

<!-- S21 -->

<SectionChrome section="Геометрия МНК" />
# От n наблюдаемых значений к вектору y
<div class="grid grid-cols-[1fr_0.72fr] gap-16 items-center mt-10 text-center"><MathBlock formula="y=\begin{pmatrix}y_1\\\vdots\\y_n\end{pmatrix}\in\mathbb R^n" class="text-[31px]" /><MathBlock v-click formula="\mathbf1=\begin{pmatrix}1\\\vdots\\1\end{pmatrix}\in\mathbb R^n" class="text-[29px]" /></div>
<div v-click class="grid grid-cols-3 gap-8 mt-12 text-[21px] text-center"><div class="key-line">координата i соответствует объекту i</div><div class="key-line">y — наблюдаемые значения целевой переменной</div><div class="key-line">n прогнозов модели тоже образуют вектор в ℝⁿ</div></div>
<div v-click class="muted text-center mt-10 text-[21px]">Один набор координат можно рассматривать алгебраически как вектор и геометрически как точку.</div>

---

<!-- S22 -->

<SectionChrome section="Геометрия МНК" />
# Все постоянные прогнозы образуют прямую
<div class="grid grid-cols-[0.82fr_1.18fr] gap-8 items-center mt-4"><div class="text-center text-[25px]"><MathBlock formula="c\mathbf1=\begin{pmatrix}c\\\vdots\\c\end{pmatrix}" /><div v-click="4" class="mt-11"><MathBlock formula="L_0=\{c\mathbf1:c\in\mathbb R\}" /></div><div v-click="5" class="key-line mt-10 text-left text-[21px]">Меняя c, получаем все возможные прогнозы константной модели. Геометрически это одна прямая в ℝⁿ.</div></div><ConstantProjection phase="span" /></div>

---

<!-- S23 -->

<SectionChrome section="Геометрия МНК" />
# Средний прогноз как ортогональная проекция
<div class="grid grid-cols-[0.93fr_1.07fr] gap-8 items-center mt-1"><div class="proof-stack text-center text-[20px]"><MathBlock formula="RSS(c)=\|y-c\mathbf1\|_2^2" /><div v-click="2" class="text-left leading-[1.35]">Поэтому минимизировать RSS — значит среди всех допустимых прогнозов вида c𝟏 найти ближайший к наблюдаемому вектору y.</div><div v-click="3"><MathBlock formula="r=y-\hat y=y-\hat c\mathbf1,\qquad r\perp\mathbf1" /></div><div v-click="4" class="text-left leading-[1.35]">Для ближайшей точки остаточный вектор перпендикулярен прямой допустимых прогнозов.</div><div v-click="5"><MathBlock formula="\langle y-\hat c\mathbf1,\mathbf1\rangle=0\Longrightarrow\hat c=\frac{\langle y,\mathbf1\rangle}{\langle\mathbf1,\mathbf1\rangle}=\bar y" /></div><div v-click="6" class="text-[25px]"><MathBlock formula="\boxed{\hat y=\bar y\mathbf1}" /></div></div><ConstantProjection phase="projection" /></div>

---

<!-- S24 -->

<SectionChrome section="Геометрия МНК" />
# Добавляем один признак
<div class="grid grid-cols-[0.92fr_1.08fr] gap-8 items-center mt-1"><div class="text-center text-[21px]"><MathBlock formula="x=\begin{pmatrix}x_1\\\vdots\\x_n\end{pmatrix}\in\mathbb R^n" /><div class="mt-5"><MathBlock formula="X\beta=\beta_0\mathbf1+\beta_1x" /></div><div v-click="4" class="mt-6"><MathBlock formula="L_1=\{\beta_0\mathbf1+\beta_1x:\beta_0,\beta_1\in\mathbb R\}" /></div><div v-click="5" class="key-line mt-6 text-left text-[19px]">Мы всё ещё находимся в ℝⁿ: одна координата соответствует одному обучающему объекту.</div><div v-click="6" class="key-line mt-5 text-left text-[19px]">Добавили направление x: если 1 и x линейно независимы, прямая допустимых прогнозов превращается в двумерную плоскость.</div></div><PlaneProjection phase="build" /></div>

---

<!-- S25 -->

<SectionChrome section="Геометрия МНК" />
# Коэффициенты и прогнозы живут в разных пространствах
<div class="grid grid-cols-[1fr_auto_1.2fr] gap-10 items-center mt-11 text-center"><div class="math-column !min-h-0 text-[30px]"><MathBlock formula="\beta\in\mathbb R^q" /><div class="mt-5 text-[21px]">пространство коэффициентов</div></div><div class="text-[34px] text-[#2864dc]"><MathBlock formula="\xrightarrow{\;X\;}" /></div><div class="math-column !min-h-0 text-[29px]"><MathBlock formula="X\beta\in\operatorname{col}(X)\subseteq\mathbb R^n" /><div class="mt-5 text-[21px]">пространство прогнозов</div></div></div>
<div v-click class="key-line mt-11 text-[22px]"><strong>col(X)</strong> — пространство всех линейных комбинаций столбцов X; это множество всех допустимых векторов прогнозов Xβ.</div>
<div v-click class="muted text-center mt-7 text-[20px]">Каждый столбец X задаёт одно направление изменения прогнозов.</div>

---

<!-- S26 -->

<SectionChrome section="Геометрия МНК" />
# МНК ищет ближайший допустимый прогноз
<div class="grid grid-cols-[0.82fr_1.18fr] gap-8 items-center mt-2"><div class="text-center text-[22px]"><MathBlock formula="\hat\beta\in\arg\min_\beta\|y-X\beta\|_2^2" /><div v-click="2" class="mt-9"><MathBlock formula="\hat y=X\hat\beta\in\operatorname{col}(X)" /></div><div v-click="3" class="mt-9"><MathBlock formula="\boxed{\hat y=\text{ближайший к }y\text{ допустимый прогноз}}" /></div><div v-click="4" class="mt-9"><MathBlock formula="r=y-\hat y" /></div></div><PlaneProjection phase="projection" /></div>
<div v-click="6" class="success-line mt-3 text-center text-[21px]">Геометрически МНК — ортогональная проекция y на пространство столбцов X.</div>

---

<!-- S27 -->

<SectionChrome section="Геометрия МНК" />
# Численный пример: остаток ортогонален столбцам X
<div class="section-label">Парный случай</div>
<div class="grid grid-cols-2 gap-12 items-center mt-3 text-center text-[23px]"><MathBlock formula="X=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix}" /><MathBlock formula="r=\begin{pmatrix}-1/6\\1/3\\-1/6\end{pmatrix}" /></div>
<div class="grid grid-cols-2 gap-10 mt-5 text-center text-[20px]"><div class="math-column !min-h-0"><MathBlock formula="\mathbf1^\top r=0" class="text-[26px]" /><div v-click class="mt-5"><MathBlock formula="-\frac16+\frac13-\frac16=0" /></div></div><div class="math-column !min-h-0"><MathBlock formula="x^\top r=0" class="text-[26px]" /><div v-click class="mt-5"><MathBlock formula="0\cdot(-\frac16)+1\cdot\frac13+2\cdot(-\frac16)=0" /></div></div></div>
<div v-click class="success-line mt-6 text-center text-[21px]">Остаток ортогонален обоим столбцам X: вектору единиц и признаку x.</div>

---

<!-- S28 -->

<SectionChrome section="Геометрия МНК" />
# Обобщение на множественную регрессию
<div class="grid grid-cols-[0.76fr_1.24fr] gap-12 items-center mt-6 text-center"><MathBlock formula="X=\begin{pmatrix}|&|&&|\\X_{\cdot1}&X_{\cdot2}&\cdots&X_{\cdot q}\\|&|&&|\end{pmatrix}" class="text-[27px]" /><div class="text-[23px]"><MathBlock v-click formula="X^\top r=\begin{pmatrix}\langle X_{\cdot1},r\rangle\\\langle X_{\cdot2},r\rangle\\\vdots\\\langle X_{\cdot q},r\rangle\end{pmatrix}=\begin{pmatrix}0\\0\\\vdots\\0\end{pmatrix}" /><div v-click class="mt-9 text-[32px]"><MathBlock formula="\boxed{X^\top r=0}" /></div></div></div>
<div v-click class="success-line mt-9 text-center text-[21px]">Во множественной регрессии остаток ортогонален каждому столбцу X, следовательно, r ⟂ col(X).</div>

---

<!-- S29 -->

<SectionChrome section="Геометрия МНК" />
# Нормальные уравнения
<div class="text-center text-[28px] mt-4"><MathBlock formula="X^\top r=0" /><div v-click><MathBlock formula="X^\top(y-X\hat\beta)=0" class="mt-4" /></div><div v-click><MathBlock formula="X^\top y-X^\top X\hat\beta=0" class="mt-4" /></div><div v-click class="text-[34px] mt-5"><MathBlock formula="\boxed{X^\top X\hat\beta=X^\top y}" /></div></div>
<div v-click class="key-line mt-7 text-center">Это те же условия оптимальности, что для β₀ и β₁, записанные для произвольного числа признаков.</div>

---

<!-- S30 -->

<SectionChrome section="Геометрия МНК" />
# Геометрия МНК: итог
<div class="proof-stack text-center text-[26px] mt-4"><MathBlock formula="X\beta\in\operatorname{col}(X)" /><div v-click><MathBlock formula="\hat y=\text{ближайший к }y\text{ допустимый прогноз}" /></div><div v-click><MathBlock formula="r=y-\hat y\perp\operatorname{col}(X)" /></div><div v-click><MathBlock formula="\boxed{X^\top r=0}" /></div></div>
<div v-click class="muted text-center mt-6 text-[20px]">Нормальные уравнения: <MathBlock formula="X^\top X\hat\beta=X^\top y" class="inline-block ml-2" /></div>

---

<!-- S31 -->

<SectionChrome section="Ранг и мультиколлинеарность" />
# Когда коэффициенты определены однозначно
<div class="text-center text-[27px] mt-9"><MathBlock formula="\operatorname{rank}(X)=q" /><div class="micro mt-3">столбцы X линейно независимы</div></div>
<div v-click class="text-center text-[33px] mt-8"><MathBlock formula="\boxed{\hat\beta=(X^\top X)^{-1}X^\top y}" /></div>
<div v-click class="success-line mt-8 text-center">При полном столбцовом ранге одному вектору прогнозов Xβ соответствует один набор коэффициентов.</div>
<div v-click class="micro text-center mt-5">Формула полезна для теории; вычислительный способ обсудим отдельно.</div>

---

<!-- S32 -->

<SectionChrome section="Ранг и мультиколлинеарность" />
# Точная мультиколлинеарность: постановка
<div class="grid grid-cols-[0.72fr_1.28fr] gap-10 items-center mt-2"><table class="text-[19px]"><thead><tr><th>объект</th><th>x₁</th><th>x₂</th></tr></thead><tbody><tr><td>1</td><td>1</td><td>2</td></tr><tr><td>2</td><td>3</td><td>6</td></tr><tr><td>3</td><td>5</td><td>10</td></tr></tbody></table><div class="text-center text-[23px]"><MathBlock formula="\boxed{x_2=2x_1}" /><div v-click class="mt-5"><MathBlock formula="\beta_1x_1+\beta_2x_2" /></div><div v-click class="mt-5"><MathBlock formula="\boxed{\beta_1'=\beta_1-2t,\qquad\beta_2'=\beta_2+t}" /></div></div></div>
<div v-click class="statement text-center mt-7">Изменится ли прогноз?</div>

---

<!-- S33 -->

<SectionChrome section="Ранг и мультиколлинеарность" />
# Разные коэффициенты — тот же прогноз
<div class="text-center text-[20px] mt-2"><MathBlock formula="\begin{aligned}\beta_1'x_1+\beta_2'x_2&=(\beta_1-2t)x_1+(\beta_2+t)x_2\\&=(\beta_1-2t)x_1+(\beta_2+t)2x_1\\&=\beta_1x_1-2tx_1+2\beta_2x_1+2tx_1\\&=\beta_1x_1+\beta_2x_2.\end{aligned}" /></div>
<div v-click class="success-line mt-5 text-center text-[20px]">Данные определяют прогнозы, но не позволяют однозначно разделить вклад зависимых столбцов.</div>
<div v-click class="text-center text-[27px] mt-5"><MathBlock formula="\operatorname{rank}(X)<q\Longrightarrow\hat\beta\text{ может быть неединственным}" /></div>

---

<!-- S34 -->

<SectionChrome section="Ранг и мультиколлинеарность" />
# Приближённая мультиколлинеарность
<img src="/assets/week-02/near-collinearity-perturbation.svg" alt="Почти зависимые признаки и чувствительность коэффициентов" class="figure-wide h-[355px]" />
<div v-click class="success-line mt-2 text-center text-[20px]">После малого возмущения данных коэффициенты изменились заметно, а прогнозы на обучающей выборке — намного меньше.</div>
<div v-click class="warning-line mt-2 text-center text-[19px]">Стабильность прогнозов на наблюдавшихся комбинациях признаков не гарантирует такую же стабильность на новых комбинациях.</div>

---

<!-- S35 -->

<SectionChrome section="Ранг и мультиколлинеарность" />
# Точная и приближённая зависимость
<table class="text-[19px] mt-4"><thead><tr><th></th><th>Точная зависимость</th><th>Почти зависимость</th></tr></thead><tbody><tr><td><strong>Столбцы X</strong></td><td>линейно зависимы</td><td>почти линейно зависимы</td></tr><tr><td><strong>Ранг</strong></td><td>rank(X) &lt; q</td><td>полный</td></tr><tr><td><strong>Коэффициенты</strong></td><td>могут быть неединственными</td><td>единственны, но чувствительны к небольшим изменениям данных</td></tr><tr><td><strong>Прогнозы на наблюдавшихся данных</strong></td><td>могут совпадать точно</td><td>часто меняются меньше коэффициентов</td></tr></tbody></table>
<div v-click class="success-line mt-7 text-center text-[21px]">Мультиколлинеарность — точная или приближённая линейная зависимость столбцов матрицы признаков.</div>

---

<!-- S36 -->

<SectionChrome section="Численное решение" />
# Формула и вычислительный алгоритм — разные вещи
<div class="grid grid-cols-2 gap-10 mt-6"><div class="math-column !min-h-0"><MathBlock formula="\hat\beta=(X^\top X)^{-1}X^\top y" class="text-[29px]" /><div class="micro mt-6">теоретическая формула при полном столбцовом ранге</div></div><div class="warning-line text-[22px] flex items-center">В численном коде обычно не строят обратную матрицу (XᵀX)⁻¹ явно.</div></div>
<div v-click class="grid grid-cols-2 gap-8 mt-10 text-center text-[21px]"><div class="key-line"><MathBlock formula="X=QR" class="text-[27px]" /><div class="mt-4">QR-разложение сводит задачу к системе удобного вида.</div></div><div class="key-line"><MathBlock formula="X=U\Sigma V^\top" class="text-[27px]" /><div class="mt-4">SVD помогает обнаружить потерю ранга и плохо определённые направления.</div></div></div>

---

<!-- S37 -->

<SectionChrome section="Численное решение" />
# LinearRegression в scikit-learn
<div class="grid grid-cols-[1.15fr_0.85fr] gap-10 items-center mt-4"><div>

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)

model.intercept_
model.coef_

y_pred = model.predict(X_test)
```

 </div><div class="text-[21px]"><div class="key-line"><code>LinearRegression</code> — estimator scikit-learn.</div><div v-click class="key-line mt-5"><code>fit</code> оценивает параметры; <code>intercept_</code> и <code>coef_</code> хранят обученные коэффициенты.</div><div v-click class="key-line mt-5"><code>predict</code> применяет обученную модель к новым объектам.</div></div></div>
<div v-click class="success-line mt-7 text-center text-[21px]">При <code>fit_intercept=True</code> вручную добавлять столбец единиц в <code>X</code> не нужно.</div>

---

<!-- S38 -->

<SectionChrome section="Метрики регрессии" />
# Почему одного RSS мало
<div class="grid grid-cols-[0.8fr_1.2fr] gap-12 items-center mt-20"><div class="text-center"><MathBlock formula="RSS=\sum_i(y_i-\hat y_i)^2" class="text-[36px]" /><div class="statement mt-10">RSS = 12 480</div></div><ul v-click class="lecture-bullets text-[23px]"><li>зависит от количества объектов;</li><li>измеряется в квадратах единиц целевой переменной;</li><li>сам по себе не показывает, насколько модель лучше простой точки отсчёта.</li></ul></div>

---

<!-- S39 -->

<SectionChrome section="Метрики регрессии" />
# MSE, RMSE и MAE
<div class="grid grid-cols-3 gap-7 mt-8 text-center text-[19px]"><div class="metric-column"><MathBlock formula="\boxed{MSE=\frac1m\sum_i(y_i-\hat y_i)^2}" class="text-[24px]" /><div>квадраты единиц целевой переменной</div></div><div class="metric-column"><MathBlock formula="\boxed{RMSE=\sqrt{\frac1m\sum_i(y_i-\hat y_i)^2}}" class="text-[24px]" /><div>единицы целевой переменной</div></div><div class="metric-column"><MathBlock formula="\boxed{MAE=\frac1m\sum_i|y_i-\hat y_i|}" class="text-[24px]" /><div>единицы целевой переменной</div></div></div>
<div v-click class="grid grid-cols-2 gap-8 mt-10 text-[21px]"><div class="warning-line">RMSE сильнее реагирует на отдельные крупные ошибки.</div><div class="key-line">MAE учитывает абсолютный размер каждой ошибки линейно.</div></div>

---

<!-- S40 -->

<SectionChrome section="Метрики регрессии" />
# Одинаковый MAE, разный профиль ошибок
<div class="grid grid-cols-2 gap-10 mt-6 text-center text-[22px]"><div class="math-column !min-h-0"><MathBlock formula="A=(2,2,2,2)" class="text-[27px]" /><div v-click><MathBlock formula="MAE_A=2,\qquad RMSE_A=2" class="mt-8 text-[26px]" /></div></div><div class="math-column !min-h-0"><MathBlock formula="B=(0,0,0,8)" class="text-[27px]" /><div v-click><MathBlock formula="MAE_B=2,\qquad RMSE_B=4" class="mt-8 text-[26px]" /></div></div></div>
<div v-click class="success-line mt-10 text-center text-[21px]">MAE и RMSE по-разному агрегируют один и тот же набор ошибок; выбор зависит от того, насколько существенны крупные отклонения.</div>

---

<!-- S41 -->

<SectionChrome section="Метрики регрессии" />
# R² на обучающей выборке OLS
<div class="grid grid-cols-[1.05fr_0.95fr] gap-10 items-center mt-3"><div class="definition-stack text-center text-[22px]"><MathBlock formula="TSS=\sum_i(y_i-\bar y)^2" /><MathBlock formula="RSS=\sum_i(y_i-\hat y_i)^2" /><MathBlock formula="ESS=\sum_i(\hat y_i-\bar y)^2" /></div><div class="text-center text-[25px]"><MathBlock v-click formula="\boxed{TSS=ESS+RSS}" /><div v-click class="mt-9 text-[29px]"><MathBlock formula="\boxed{R^2=1-\frac{RSS}{TSS}=\frac{ESS}{TSS}}" /></div></div></div>
<div v-click class="success-line mt-8 text-center text-[21px]">Для OLS со свободным членом на той же обучающей выборке R² можно интерпретировать как долю объяснённой выборочной вариации.</div>

---

<!-- S42 -->

<SectionChrome section="Метрики регрессии" />
# R² для готовых прогнозов
<div class="grid grid-cols-[1.03fr_0.97fr] gap-9 items-center mt-2"><div class="text-center text-[25px]"><MathBlock formula="R^2=1-\frac{\sum_i(y_i-\hat y_i)^2}{\sum_i(y_i-\bar y)^2}" />
<div class="micro mt-4">ȳ — среднее <code>y_true</code> на оцениваемой выборке</div>

```python
from sklearn.metrics import r2_score
r2_score(y_true, y_pred)
```

</div><div v-click class="text-[20px]"><div class="key-line"><strong>R² = 1:</strong> прогнозы идеальны.</div><div class="key-line mt-4"><strong>R² = 0:</strong> тот же уровень квадратной ошибки, что у прогноза ŷᵢ = ȳ на этой выборке.</div><div class="warning-line mt-4"><strong>R² &lt; 0:</strong> квадратная ошибка выше этой опорной вариации.</div><div class="micro mt-5">На тестовой выборке это метрика готовых прогнозов, а не геометрическое тождество OLS. Поэтому не говорим автоматически: «модель объяснила X% тестовой вариации».</div></div></div>

---

<!-- S43 -->

<SectionChrome section="Диагностика и представление" />
# Диагностический протокол
<div class="diagnostic-flow mt-8 text-[19px]"><div><b>1. Диагностика</b><span>метрика · остатки<br>· обнаружили структуру</span></div><i>→</i><div><b>2. Гипотеза и эксперимент</b><span>сформулировали гипотезу<br>· изменили X · переобучили</span></div><i>→</i><div><b>3. Проверка</b><span>повторили диагностику<br>· зафиксировали решение · test</span></div></div>
<div class="text-center text-[28px] mt-10"><MathBlock formula="r_i=y_i-\hat y_i" /></div>
<div v-click class="success-line mt-8 text-center text-[21px]">График остатков формулирует проверяемую гипотезу; сам по себе он её не доказывает.</div>

---

<!-- S44 -->

<SectionChrome section="Диагностика и представление" />
# Остатки против прогноза: есть ли систематическая структура?
<div class="grid grid-cols-[1.08fr_0.92fr] gap-8 items-center mt-1"><img src="/assets/week-02/residual-curvature.svg" alt="Кривизна на графике остаток — прогноз" class="figure h-[390px]" /><div class="text-[20px]"><div class="question-line">Проблема вообще есть?</div><div v-click class="key-line mt-5"><strong>На краях остатки положительны:</strong> модель систематически занижает наблюдаемые значения целевой переменной.</div><div v-click class="key-line mt-5"><strong>В середине остатки отрицательны:</strong> модель систематически завышает наблюдаемые значения.</div><div v-click class="warning-line mt-5">Одной линейной формы средней зависимости недостаточно.</div></div></div>

---

<!-- S45 -->

<SectionChrome section="Диагностика и представление" />
# Остатки против признака: с чем связана структура?
<div class="key-line text-center text-[20px] -mt-1 mb-3">Обнаружили структуру → проверяем отдельные признаки.</div>
<div class="grid grid-cols-[1.08fr_0.92fr] gap-8 items-center"><img src="/assets/week-02/residual-vs-feature.svg" alt="U-образная структура остатков против признака" class="figure h-[360px]" /><div class="text-[20px]"><div class="question-line">С каким признаком связана проблема?</div><div v-click class="key-line mt-5">Остатки против xⱼ связывают обнаруженную структуру с конкретным признаком.</div><div v-click class="warning-line mt-5">U-образный рисунок предлагает гипотезу о нелинейной форме средней зависимости по xⱼ.</div></div></div>

---

<!-- S46 -->

<SectionChrome section="Диагностика и представление" />
# Одна гипотеза: добавить x²
<div class="grid grid-cols-2 gap-8 mt-1 text-center text-[22px]"><div class="math-column !min-h-0"><div>до</div><MathBlock formula="f_1(x)=\beta_0+\beta_1x" class="mt-5" /></div><div class="math-column !min-h-0"><div>после</div><MathBlock formula="f_2(x)=\beta_0+\beta_1x+\beta_2x^2" class="mt-5" /></div></div>
<div v-click class="grid grid-cols-[0.92fr_1.08fr] gap-8 items-center mt-6"><MathBlock formula="X=\begin{pmatrix}1&x_1&x_1^2\\\vdots&\vdots&\vdots\\1&x_n&x_n^2\end{pmatrix}" class="text-center text-[20px]" /><div><div class="success-line">Модель нелинейна как функция исходного x, но остаётся линейной по коэффициентам β.</div><div class="key-line mt-4">Переобучаем модель и повторяем ту же диагностику остатков.</div></div></div>

---

<!-- S47 -->

<SectionChrome section="Диагностика и представление" />
# Что изменилось после добавления x²
<div class="grid grid-cols-[0.88fr_1.12fr] gap-5 items-center mt-1"><img src="/assets/week-02/transformed-features.svg" alt="Линейная и квадратичная модели на одних данных" class="figure h-[325px]" /><img src="/assets/week-02/residual-before-after.svg" alt="Остатки до и после добавления квадрата признака" class="figure h-[325px]" /></div>
<div v-click class="grid grid-cols-3 gap-5 mt-6 text-[20px]"><div class="key-line">Представление расширило семейство доступных функций.</div><div class="key-line">Та же диагностика показывает, что U-структура уменьшилась.</div><div class="warning-line">Форму выбираем без использования тестовой выборки.</div></div>

---

<!-- S48 -->

<SectionChrome section="Диагностика и представление" />
# Экстраполяция: продолжения расходятся
<div class="grid grid-cols-[1.35fr_0.65fr] gap-8 items-center mt-1"><img src="/assets/week-02/extrapolation.svg" alt="Близкие модели внутри наблюдаемого диапазона и расходящиеся продолжения" class="figure h-[390px]" /><div class="text-[21px]"><div v-click class="warning-line">Хорошее качество внутри наблюдаемого диапазона не обосновывает форму далёкой экстраполяции.</div></div></div>
<div v-click class="success-line text-center mt-3 text-[20px]">Представление признаков определяет и подгонку внутри данных, и способ продолжения модели за их пределами.</div>

---

<!-- S49 -->

<SectionChrome section="Диагностика и представление" />
# Непостоянный разброс остатков
<div class="grid grid-cols-[1.08fr_0.92fr] gap-8 items-center mt-1"><img src="/assets/week-02/residual-fan.svg" alt="Увеличение вертикального разброса остатков при росте прогноза" class="figure h-[390px]" /><div class="text-[20px]"><div class="key-line">При больших прогнозах вертикальный разброс остатков выше.</div><div v-click class="key-line mt-5">Такой рисунок может указывать на гетероскедастичность — неодинаковую условную дисперсию ошибки в разных областях данных.</div><div v-click class="warning-line mt-5">Похожий рисунок может возникать и при неверно заданной форме средней зависимости; сначала проверяем спецификацию модели.</div></div></div>

---

<!-- S50 -->

<SectionChrome section="Диагностика и представление" />
# Диагностика: итог
<ul class="lecture-bullets text-[23px] mt-9"><li>Метрика показывает общий размер ошибки, но не её структуру.</li><li v-click>Остатки против прогноза и отдельных признаков отвечают на разные диагностические вопросы.</li><li v-click>Повторяющийся рисунок в остатках формулирует гипотезу о представлении.</li><li v-click>Гипотезу проверяем на обучающей выборке, затем повторяем ту же диагностику.</li><li v-click>Новое представление может менять и качество внутри данных, и экстраполяцию.</li></ul>

---

<!-- S51 -->

<SectionChrome section="Итоги" />
# Почему линейная регрессия остаётся полезной
<div class="grid grid-cols-3 gap-7 mt-8 text-[19px]"><div class="role-column"><strong>Бейзлайн</strong><p>Более сложная модель должна показать, чем она лучше.</p></div><div class="role-column"><strong>Рабочая модель</strong><p>Простая зависимость или удачное представление могут быть достаточны.</p></div><div class="role-column"><strong>Инструмент исследования</strong><p>Коэффициенты и остатки помогают предложить следующий эксперимент.</p></div></div>
<div v-click class="success-line mt-10 text-center text-[23px]">Качество прогнозов и интерпретация коэффициентов — связанные, но разные вопросы.</div>

---

<!-- S52 -->

<SectionChrome section="Итоги" />
# Единая схема недели
<div class="recap-grid mt-7"><div class="recap-panel"><div class="recap-label">Модель</div><MathBlock formula="X\beta" class="text-[31px]" /><p>Признаки задают семейство допустимых прогнозов.</p></div><div class="recap-panel"><div class="recap-label">Обучение</div><MathBlock formula="\hat\beta\in\arg\min_\beta\|y-X\beta\|_2^2" class="text-[25px]" /><p>МНК выбирает прогноз с минимальной квадратной ошибкой.</p></div><div class="recap-panel"><div class="recap-label">Геометрия и ранг</div><MathBlock formula="r=y-\hat y,\qquad r\perp\operatorname{col}(X)" class="text-[24px]" /><p>Ранг определяет, насколько однозначно определены коэффициенты.</p></div><div class="recap-panel"><div class="recap-label">Проверка</div><div class="text-[24px] font-600 text-center">метрики + остатки → гипотеза</div><p>Метрика отвечает, сколько мы ошибаемся; диагностика — как устроена ошибка и что проверить дальше.</p></div></div>
