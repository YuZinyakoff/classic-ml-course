---
theme: default
title: Линейная модель, функция потерь и оптимизация
author: НИУ ВШЭ
info: |
  Неделя 2 магистерского курса классического машинного обучения.
  Линейная регрессия, функции потерь и численная оптимизация.
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
  class: text-[24px]
appendixSlides: 0
exportFilename: masters-2026-week-02
download: false
---

<!-- S01 -->

<div class="section-kicker">Классическое машинное обучение · Магистратура · Неделя 2</div>
<h1 class="deck-title mt-14">Линейная модель, функция потерь и оптимизация</h1>
<div class="lead mt-6">Линейная регрессия как прозрачный пример того, что происходит внутри <code>fit</code></div>

<div class="grid grid-cols-[1fr_auto_1.25fr_auto_1fr_auto_1fr] gap-6 items-center mt-14 text-center text-[28px]">
  <div class="plain-label py-10">модель</div><div class="flow-arrow text-[30px]">→</div>
  <div class="plain-label py-10 border-green-600">функция потерь</div><div class="flow-arrow text-[30px]">→</div>
  <div class="plain-label py-10 border-orange-500">оптимизатор</div><div class="flow-arrow text-[30px]">→</div>
  <div class="plain-label py-10">метрика</div>
</div>

---

<!-- S02 -->

<SectionChrome section="Линейная регрессия" />

# Задача регрессии и линейное семейство

<div class="grid grid-cols-[0.78fr_1.22fr] gap-12 items-center mt-9">
  <div>
    <MathBlock formula="x\in\mathcal X" class="text-center text-[31px]" />
    <div class="flow-arrow text-center my-6">↓</div>
    <MathBlock formula="f_\beta(x)\in\mathbb R" class="text-center text-[34px]" />
    <div class="micro text-center mt-5">числовой прогноз</div>
  </div>
  <div>
    <MathBlock formula="\boxed{f_\beta(x)=\beta_0+\beta_1x_1+\dots+\beta_px_p}" class="text-center text-[32px]" />
    <div class="key-line mt-10 text-[23px]">Разные значения <MathBlock formula="\beta" :display="false" class="inline-block text-[22px]" /> задают разные функции одного семейства.</div>
    <div class="success-line mt-7 text-[23px]">Обучение должно выбрать одну функцию из этого семейства.</div>
  </div>
</div>

---

<!-- S03 -->

<SectionChrome section="Линейная регрессия" />

# После обучения: прогнозы и остатки

<div class="grid grid-cols-[1.14fr_0.86fr] gap-8 items-center mt-2">
  <img src="/assets/week-02/regression-residuals.svg" alt="Вертикальные остатки между наблюдаемыми значениями и прогнозами" class="figure h-[400px]" />
  <div class="text-[25px] text-center">
    <MathBlock formula="\hat\beta=(\hat\beta_0,\ldots,\hat\beta_p)^\top" />
    <MathBlock v-click formula="\hat y_i=f_{\hat\beta}(x_i)" class="mt-8" />
    <MathBlock v-click formula="\boxed{r_i=y_i-\hat y_i}" class="mt-8 text-[32px]" />
    <div v-click class="grid grid-cols-1 gap-4 mt-9 text-[20px] text-left">
      <div class="key-line"><MathBlock formula="r_i>0" :display="false" class="inline-block text-[19px]" />: модель недооценила наблюдаемое значение.</div>
      <div class="warning-line"><MathBlock formula="r_i<0" :display="false" class="inline-block text-[19px]" />: модель переоценила его.</div>
    </div>
  </div>
</div>

---

<!-- S04 -->

<SectionChrome section="Линейная регрессия" />

# Метод наименьших квадратов

<div class="grid grid-cols-[0.88fr_1.12fr] gap-10 items-center mt-4">
  <img src="/assets/week-02/regression-residuals.svg" alt="Остатки относительно линейной модели" class="figure h-[360px]" />
  <div class="text-center">
    <MathBlock formula="r_i(\beta)=y_i-f_\beta(x_i)" class="text-[27px]" />
    <MathBlock v-click formula="RSS(\beta)=\sum_{i=1}^{n}r_i(\beta)^2" class="mt-10 text-[32px]" />
    <MathBlock v-click formula="\boxed{\hat\beta\in\arg\min_\beta RSS(\beta)}" class="mt-10 text-[34px]" />
  </div>
</div>

<div v-click class="success-line mt-7 text-center text-[23px]">Модель задаёт семейство прогнозов; RSS задаёт правило выбора параметров внутри него.</div>

---

<!-- S05 -->

<SectionChrome section="Линейная регрессия" />

# Аналитическое решение: короткое напоминание

<div class="text-center mt-8">
  <MathBlock formula="\frac{\partial RSS}{\partial\beta_0}=0,\qquad\frac{\partial RSS}{\partial\beta_1}=0" class="text-[35px]" />
  <div class="text-[34px] text-slate-400 my-9">↓</div>
  <div class="grid grid-cols-[1.25fr_0.75fr] gap-10 items-center">
    <MathBlock formula="\boxed{\hat\beta_1=\frac{\sum_i(x_i-\bar x)(y_i-\bar y)}{\sum_i(x_i-\bar x)^2}}" class="text-[30px]" />
    <MathBlock formula="\boxed{\hat\beta_0=\bar y-\hat\beta_1\bar x}" class="text-[29px]" />
  </div>
</div>

<div class="micro text-center mt-11">Решение существует в таком виде, если признак имеет ненулевую вариацию.</div>

---

<!-- S06 -->

<SectionChrome section="Линейная регрессия" />

# Матричная запись для нескольких признаков

<div class="grid grid-cols-[1.22fr_0.78fr] gap-12 items-center mt-7">
  <div class="text-center">
    <MathBlock formula="X\in\mathbb R^{n\times q},\qquad\beta\in\mathbb R^q,\qquad y\in\mathbb R^n" class="text-[29px]" />
    <MathBlock v-click formula="\hat y=X\beta,\qquad r=y-X\beta" class="mt-10 text-[34px]" />
    <MathBlock v-click formula="\boxed{\hat\beta\in\arg\min_\beta\|y-X\beta\|_2^2}" class="mt-11 text-[35px]" />
  </div>
  <div class="space-y-6 text-[22px]">
    <div class="plain-label"><b>строки X</b><br>обучающие объекты</div>
    <div class="plain-label"><b>столбцы X</b><br>признаки и свободный член</div>
    <div class="plain-label"><b>Xβ</b><br>по одному прогнозу на объект</div>
  </div>
</div>

---

<!-- S07 -->

<SectionChrome section="Линейная регрессия" />

# Нормальные уравнения — условие оптимума

<div class="text-center mt-12">
  <MathBlock formula="\boxed{X^\top X\hat\beta=X^\top y}" class="text-[42px]" />
  <div v-click class="mt-12">
    <div class="micro mb-5">если столбцы X линейно независимы</div>
    <MathBlock formula="\hat\beta=(X^\top X)^{-1}X^\top y" class="text-[38px]" />
  </div>
</div>

<div v-click class="key-line mt-14 text-center text-[23px]">На практике least-squares-задачу решают устойчивыми численными методами, не вычисляя обратную матрицу явно.</div>

---

<!-- S08 -->

<SectionChrome section="Линейная регрессия" />

# От формулы к вычислению

<div class="grid grid-cols-2 gap-10 mt-4">
  <div>
    <div class="section-label text-center mb-5">NUMPY: ЧИСЛЕННЫЙ РЕШАТЕЛЬ</div>

```python
beta_hat, *_ = np.linalg.lstsq(
    X, y, rcond=None
)
```

  </div>
  <div>
    <div class="section-label text-center mb-5">SCIKIT-LEARN: ESTIMATOR</div>

```python
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
```

  </div>
</div>

<div class="grid grid-cols-3 gap-6 mt-8 text-[19px]">
  <div class="key-line">Решается исходная задача <MathBlock formula="\min_\beta\|y-X\beta\|_2^2" :display="false" class="inline-block text-[18px]" />.</div>
  <div class="key-line">Практические методы используют QR/SVD, а не явное обращение <MathBlock formula="X^\top X" :display="false" class="inline-block text-[18px]" />.</div>
  <div class="warning-line">При нескольких решениях <code>lstsq</code> выбирает решение минимальной евклидовой нормы.</div>
</div>

---

<!-- S09 -->

<SectionChrome section="Линейная регрессия" />

# Точная мультиколлинеарность

<div class="grid grid-cols-[0.82fr_1.18fr] gap-10 items-center mt-7">
  <div class="text-center">
    <MathBlock formula="x_2=2x_1" class="text-[36px]" />
    <MathBlock formula="\beta'_1=\beta_1-2t,\qquad\beta'_2=\beta_2+t" class="mt-10 text-[27px]" />
  </div>
  <div>
    <MathBlock formula="\begin{aligned}\beta'_1x_1+\beta'_2x_2&=(\beta_1-2t)x_1+(\beta_2+t)2x_1\\&=\beta_1x_1+\beta_2x_2.\end{aligned}" class="text-[28px]" />
  </div>
</div>

<div v-click class="formula-box mt-11 px-8 py-5"><MathBlock formula="\boxed{\text{одинаковые прогнозы}\ \not\Rightarrow\ \text{одинаковые коэффициенты}}" class="text-center text-[31px]" /></div>
<div v-click class="micro text-center mt-5"><code>lstsq</code> возвращает конкретное решение, но не добавляет информации, которой нет в данных.</div>

---

<!-- S10 -->

<SectionChrome section="Линейная регрессия" />

# Приближённая мультиколлинеарность

<div class="grid grid-cols-[1.22fr_0.78fr] gap-9 items-center mt-2">
  <img src="/assets/week-02/multicollinearity.svg" alt="Почти зависимые признаки и изменение коэффициентов после малого возмущения данных" class="figure h-[405px]" />
  <div class="text-[21px]">
    <MathBlock formula="x_2\approx2x_1" class="text-center text-[31px]" />
    <div class="warning-line mt-9">Небольшое изменение данных может заметно изменить отдельные коэффициенты.</div>
    <div class="key-line mt-7">Прогнозы на знакомых комбинациях признаков могут измениться значительно слабее.</div>
    <div class="success-line mt-7">Для прогноза и для интерпретации коэффициентов важны разные свойства решения.</div>
  </div>
</div>

---

<!-- S11 -->

<SectionChrome section="Линейная регрессия" />

# Карта метрик регрессии

<div class="grid grid-cols-5 gap-5 mt-12 text-center">
  <div class="metric-column"><strong>MSE</strong><p>средний квадрат ошибки</p><span class="micro">усиливает крупные промахи</span></div>
  <div class="metric-column"><strong>RMSE</strong><p>корень из MSE</p><span class="micro">единицы целевой переменной</span></div>
  <div class="metric-column"><strong>MAE</strong><p>средний модуль ошибки</p><span class="micro">линейная цена величины промаха</span></div>
  <div class="metric-column"><strong>R²</strong><p>сравнение с постоянным прогнозом</p><span class="micro">безразмерная величина</span></div>
  <div class="metric-column"><strong>MAPE</strong><p>средняя относительная ошибка</p><span class="micro">проценты от фактического значения</span></div>
</div>

<div v-click class="success-line mt-10 text-center text-[23px]">Метрика — это способ агрегировать ошибки уже полученных прогнозов.</div>

---

<!-- S12 -->

<SectionChrome section="Линейная регрессия" />

# MSE, RMSE и MAE: крупные ошибки

<div class="grid grid-cols-3 gap-7 mt-4 text-center text-[18px]">
  <div class="metric-column"><MathBlock formula="MSE=\frac1m\sum_i(y_i-\hat y_i)^2" class="text-[23px]" /></div>
  <div class="metric-column"><MathBlock formula="RMSE=\sqrt{\frac1m\sum_i(y_i-\hat y_i)^2}" class="text-[23px]" /></div>
  <div class="metric-column"><MathBlock formula="MAE=\frac1m\sum_i|y_i-\hat y_i|" class="text-[23px]" /></div>
</div>

<div class="grid grid-cols-2 gap-10 mt-8 text-center">
  <div class="math-column !min-h-0"><MathBlock formula="A=(2,2,2,2)" class="text-[27px]" /><MathBlock v-click formula="MAE_A=2,\qquad RMSE_A=2" class="mt-7 text-[26px]" /></div>
  <div class="math-column !min-h-0"><MathBlock formula="B=(0,0,0,8)" class="text-[27px]" /><MathBlock v-click formula="MAE_B=2,\qquad RMSE_B=4" class="mt-7 text-[26px]" /></div>
</div>

<div v-click class="success-line mt-8 text-center text-[21px]">MAE одинаково оценивает общий модуль ошибок; RMSE сильнее реагирует на один крупный промах.</div>

---

<!-- S13 -->

<SectionChrome section="Линейная регрессия" />

# Коэффициент детерминации R²

<div class="text-center mt-7"><MathBlock formula="\boxed{R^2=1-\frac{\sum_i(y_i-\hat y_i)^2}{\sum_i(y_i-\bar y)^2}}" class="text-[39px]" /></div>
<div class="micro text-center mt-4"><MathBlock formula="\bar y" :display="false" class="inline-block" /> — среднее фактических значений на оцениваемой выборке</div>

<div class="grid grid-cols-3 gap-8 mt-11 text-center text-[21px]">
  <div class="key-line"><strong>R² = 1</strong><br>идеальные прогнозы</div>
  <div class="key-line"><strong>R² = 0</strong><br>уровень постоянного прогноза <MathBlock formula="\hat y_i=\bar y" :display="false" class="inline-block text-[19px]" /></div>
  <div class="warning-line"><strong>R² &lt; 0</strong><br>квадратичная ошибка выше этой точки отсчёта</div>
</div>

<div v-click class="micro text-center mt-8">На test это метрика готовых прогнозов; привычную фразу «доля объяснённой вариации» безопасно применять к OLS с константой на той же обучающей выборке.</div>

---

<!-- S14 -->

<SectionChrome section="Линейная регрессия" />

# MAPE: относительная ошибка

<div class="grid grid-cols-[0.9fr_1.1fr] gap-12 items-center mt-8">
  <div class="text-center">
    <MathBlock formula="\boxed{MAPE=\frac1m\sum_i\left|\frac{y_i-\hat y_i}{y_i}\right|}" class="text-[33px]" />
    <div class="micro mt-6">После умножения на 100% результат читают в процентах.</div>
  </div>
  <div class="text-[23px]">
    <div class="success-line">Удобна, когда важен размер ошибки относительно масштаба фактического значения.</div>
    <div class="warning-line mt-8"><MathBlock formula="y_i=0" :display="false" class="inline-block text-[21px]" />: выражение не определено.</div>
    <div class="warning-line mt-6">При <MathBlock formula="|y_i|\approx0" :display="false" class="inline-block text-[21px]" /> небольшая абсолютная ошибка может дать огромное значение.</div>
  </div>
</div>

---

<!-- S15 -->

<SectionChrome section="Линейная регрессия" />

# Остатки: есть ли структура ошибки?

<img src="/assets/week-02/residual-form-patterns.svg" alt="Три рисунка остатков: без явной структуры, с кривизной и с растущим разбросом" class="figure-wide h-[365px] mt-2" />

<div class="grid grid-cols-3 gap-7 mt-6 text-center text-[19px]">
  <div class="key-line">Явной структуры не видно.</div>
  <div class="warning-line">Кривизна: средняя зависимость описана не полностью.</div>
  <div class="warning-line">Разброс ошибки зависит от области данных.</div>
</div>

<div v-click class="success-line mt-7 text-center text-[22px]">Метрика показывает общий размер ошибки; график остатков помогает увидеть, где и как модель ошибается.</div>

---

<!-- S16 -->

<SectionChrome section="Линейная регрессия" />

# Кривизна в остатках → изменить семейство моделей

<div class="grid grid-cols-[0.9fr_1.1fr] gap-8 items-center mt-2">
  <div>
    <MathBlock formula="f_1(x)=\beta_0+\beta_1x" class="text-center text-[29px]" />
    <div class="flow-arrow text-center my-7">↓</div>
    <MathBlock formula="\boxed{f_2(x)=\beta_0+\beta_1x+\beta_2x^2}" class="text-center text-[31px]" />
    <div class="success-line mt-9">Модель нелинейна по исходному <MathBlock formula="x" :display="false" class="inline-block text-[20px]" />, но остаётся линейной по коэффициентам.</div>
  </div>
  <img src="/assets/week-02/transformed-features.svg" alt="Линейная и квадратичная модели на одних данных" class="figure h-[405px]" />
</div>

<div v-click class="micro text-center mt-3">После изменения признаков переобучаем модель и повторяем ту же диагностику.</div>

---

<!-- S17 -->

<SectionChrome section="Линейная регрессия" />

# Экстраполяция: продолжения расходятся

<div class="grid grid-cols-[1.35fr_0.65fr] gap-9 items-center mt-1">
  <img src="/assets/week-02/extrapolation.svg" alt="Близкие модели внутри наблюдаемого диапазона и расходящиеся продолжения" class="figure h-[410px]" />
  <div class="text-[22px]">
    <div class="key-line">Внутри наблюдаемого диапазона несколько функциональных форм могут давать близкие прогнозы.</div>
    <div v-click class="warning-line mt-8">За пределами данных поведение определяется выбранной формой модели.</div>
  </div>
</div>

<div v-click class="success-line mt-4 text-center text-[21px]">Хорошее качество внутри диапазона не обосновывает форму далёкой экстраполяции.</div>

---

<!-- S18 -->

<SectionChrome section="Линейная регрессия" />

# Таким образом

<div class="recap-list mt-9 text-[22px]">
  <div><b>Модель:</b> столбцы <MathBlock formula="X" :display="false" class="inline-block text-[20px]" /> задают семейство прогнозов <MathBlock formula="X\beta" :display="false" class="inline-block text-[20px]" />.</div>
  <div><b>Обучение:</b> МНК выбирает параметры, минимизирующие сумму квадратов остатков.</div>
  <div><b>Вычисление:</b> <code>lstsq</code> решает least-squares-задачу численно; нормальные уравнения характеризуют оптимум.</div>
  <div><b>Мультиколлинеарность:</b> коэффициенты могут быть неединственными или нестабильными, даже если прогнозы меняются слабее.</div>
  <div><b>Проверка:</b> метрики показывают общий размер ошибки, остатки — её структуру, а форма модели определяет экстраполяцию.</div>
</div>

---

<!-- S19 -->

<SectionChrome section="Функции потерь и целевая функция" />

# Четыре роли, которые важно различать

<div class="grid grid-cols-4 gap-5 mt-12 text-center">
  <div class="role-column"><strong>Модель</strong><p>Какие прогнозы можно представить?</p></div>
  <div class="role-column"><strong>Функция потерь<br>и целевая функция</strong><p>Какие ошибки дороги при обучении?</p></div>
  <div class="role-column"><strong>Оптимизатор<br>или решатель</strong><p>Как найти параметры?</p></div>
  <div class="role-column"><strong>Метрика</strong><p>Как оценить уже обученную модель?</p></div>
</div>

<div v-click class="grid grid-cols-2 gap-6 mt-10 text-center text-[20px]">
  <div class="plain-label py-5"><b>модель + функция потерь + решатель</b><span class="mx-3 text-blue-600">→</span><b>обученные параметры</b></div>
  <div class="plain-label py-5"><b>обученная модель + данные для оценки</b><span class="mx-3 text-blue-600">→</span><b>метрики и диагностика</b></div>
</div>

---

<!-- S20 -->

<SectionChrome section="Функции потерь и целевая функция" />

# Остаток превращается в цену ошибки

<div class="grid grid-cols-[1fr_auto_1fr] gap-8 items-center mt-10 text-center">
  <div class="math-column">
    <div class="section-label">ОШИБКА СО ЗНАКОМ</div>
    <MathBlock formula="r_i=y_i-\hat y_i" class="mt-8 text-[38px]" />
  </div>
  <div class="flow-arrow">→</div>
  <div class="math-column">
    <div class="section-label">ЦЕНА ОШИБКИ</div>
    <MathBlock formula="L(y_i,\hat y_i)" class="mt-8 text-[38px]" />
    <MathBlock v-click formula="L_{\rm sq}(y_i,\hat y_i)=(y_i-\hat y_i)^2=r_i^2" class="mt-7 text-[22px]" />
  </div>
</div>

<div v-click class="grid grid-cols-[1fr_auto] gap-8 items-center mt-8">
  <div class="key-line text-center text-[23px]">Функция потерь задаёт правило, по которому ошибка отдельного прогноза превращается в численную величину.</div>
  <div class="plain-label text-center px-7">
    <MathBlock formula="r_i=-2\ \Rightarrow\ L_{\rm sq}=4" class="text-[22px]" />
    <MathBlock formula="r=10\Rightarrow L_{\rm sq}=100,\qquad r=20\Rightarrow L_{\rm sq}=400=4\cdot100" class="mt-3 text-[18px]" />
  </div>
</div>

---

<!-- S21 -->

<SectionChrome section="Функции потерь и целевая функция" />

# От функции потерь к эмпирическому риску

<div class="grid grid-cols-[1.15fr_0.85fr] gap-10 items-center mt-3">
  <img src="/assets/week-03/residual-loss-objective.svg" alt="От фактического значения и прогноза к остатку, функции потерь и усреднению" class="figure h-[405px]" />
  <div class="text-center">
    <MathBlock formula="L_i(\theta)=L\bigl(y_i,f_\theta(x_i)\bigr)" class="text-[25px]" />
    <MathBlock v-click formula="R_n(\theta)=\frac1n\sum_{i=1}^{n}L_i(\theta)" class="mt-10 text-[32px]" />
    <MathBlock v-click formula="\boxed{\hat\theta\in\arg\min_\theta R_n(\theta)}" class="mt-11 text-[34px]" />
  </div>
</div>

<div v-click class="success-line mt-4 text-center text-[21px]">Функция потерь относится к одному объекту; эмпирический риск задаёт цель обучения по всей выборке.</div>

---

<!-- S22 -->

<SectionChrome section="Функции потерь и целевая функция" />

# Целевая функция и метрика: одна формула, разные роли

<div class="grid grid-cols-2 gap-11 mt-7">
  <div class="math-column">
    <div class="section-label">ОБУЧЕНИЕ</div>
    <MathBlock formula="R_{\rm train}(\theta)=\frac1{n_{\rm train}}\sum_{i\in train}L\bigl(y_i,f_\theta(x_i)\bigr)" class="mt-8 text-[23px]" />
    <div class="mt-9"><MathBlock formula="\theta" :display="false" class="inline-block text-[22px]" /> меняется: целевая функция выбирает параметры.</div>
  </div>
  <div class="math-column">
    <div class="section-label">ОЦЕНИВАНИЕ</div>
    <MathBlock formula="M_{\rm eval}=M\bigl(y,\hat y(\hat\theta)\bigr)" class="mt-8 text-[29px]" />
    <div class="mt-9">Параметры <MathBlock formula="\hat\theta" :display="false" class="inline-block text-[22px]" /> уже зафиксированы: метрика оценивает результат.</div>
  </div>
</div>

<div v-click class="formula-box mt-11 px-8 py-5"><MathBlock formula="MSE\ \text{может быть целевой функцией на train и метрикой на validation/test}" class="text-center text-[27px]" /></div>

---

<!-- S23 -->

<SectionChrome section="Функции потерь и целевая функция" />

# MSE как функция потерь

<div class="grid grid-cols-[0.86fr_1.14fr] gap-9 items-center mt-2">
  <div>
    <MathBlock formula="L_{\rm sq}(r)=r^2" class="text-center text-[34px]" />
    <MathBlock formula="R_{\rm MSE}(\theta)=\frac1n\sum_i\bigl(y_i-f_\theta(x_i)\bigr)^2" class="mt-9 text-[25px]" />
    <MathBlock formula="\frac{d}{dr}r^2=2r" class="mt-9 text-center text-[30px]" />
    <div class="warning-line mt-8">Чем больше <MathBlock formula="|r|" :display="false" class="inline-block text-[20px]" />, тем быстрее растут loss и модуль производной.</div>
  </div>
  <div class="text-center">
    <img src="/assets/week-03/loss-curves-focus-mse.svg" alt="Квадратичная, абсолютная и Huber функции с выделенной квадратичной" class="figure h-[370px]" />
    <div class="micro mt-1">На графике показана <MathBlock formula="\frac12r^2" :display="false" class="inline-block" />: положительный множитель не меняет минимум.</div>
  </div>
</div>

---

<!-- S24 -->

<SectionChrome section="Функции потерь и целевая функция" />

# MAE как функция потерь

<div class="grid grid-cols-[0.86fr_1.14fr] gap-9 items-center mt-2">
  <div>
    <MathBlock formula="L_{\rm abs}(r)=|r|" class="text-center text-[34px]" />
    <MathBlock formula="R_{\rm MAE}(\theta)=\frac1n\sum_i\bigl|y_i-f_\theta(x_i)\bigr|" class="mt-9 text-[25px]" />
    <div class="key-line mt-9">Цена ошибки растёт линейно по модулю остатка.</div>
    <div class="warning-line mt-7">В точке <MathBlock formula="r=0" :display="false" class="inline-block text-[20px]" /> обычной производной нет.</div>
  </div>
  <div class="text-center">
    <img src="/assets/week-03/loss-curves-focus-mae.svg" alt="Квадратичная, абсолютная и Huber функции с выделенной абсолютной" class="figure h-[370px]" />
    <div class="micro mt-1">Негладкость меняет требования к методу оптимизации, но не делает задачу некорректной.</div>
  </div>
</div>

---

<!-- S25 -->

<SectionChrome section="Функции потерь и целевая функция" />

# Функция потерь определяет, что считать лучшим

<div class="grid grid-cols-2 gap-12 mt-9 text-center">
  <div class="math-column">
    <div class="section-label">КВАДРАТИЧНАЯ ФУНКЦИЯ</div>
    <MathBlock formula="\underset{c}{\arg\min}\ \sum_i(y_i-c)^2=\bar y" class="mt-9 text-[29px]" />
    <div class="success-line mt-9">Лучший постоянный прогноз — среднее.</div>
  </div>
  <div class="math-column">
    <div class="section-label">АБСОЛЮТНАЯ ФУНКЦИЯ</div>
    <MathBlock formula="\hat c_{\rm MAE}\in\underset{c}{\arg\min}\ \sum_i|y_i-c|" class="mt-7 text-[24px]" />
    <MathBlock formula="\hat c_{\rm MAE}=\operatorname{median}(y_1,\ldots,y_n)" class="mt-4 text-[22px]" />
    <div class="success-line mt-9">Лучший постоянный прогноз — медиана.</div>
  </div>
</div>

<div v-click class="key-line mt-12 text-center text-[26px]">Функция потерь определяет, какой прогноз будет выбран при обучении.</div>

---

<!-- S26 -->

<SectionChrome section="Функции потерь и целевая функция" />

# Huber: квадратичный центр, линейные хвосты

<div class="grid grid-cols-[1.02fr_0.98fr] gap-9 items-center mt-1">
  <div>
    <MathBlock formula="L_\delta(r)=\begin{cases}\frac12r^2,&|r|\le\delta,\\[3pt]\delta\left(|r|-\frac12\delta\right),&|r|>\delta.\end{cases}" class="text-center text-[30px]" />
    <div class="grid grid-cols-2 gap-5 mt-8 text-[19px]">
      <div class="key-line">около нуля — гладкий квадратичный режим</div>
      <div class="key-line">в хвостах — линейный рост</div>
    </div>
    <div class="warning-line mt-7 text-[20px]">После порога модуль наклона перестаёт увеличиваться.</div>
  </div>
  <img src="/assets/week-03/loss-curves-focus-huber.svg" alt="Квадратичная, абсолютная и Huber функции с выделенной Huber" class="figure h-[395px]" />
</div>

---

<!-- S27 -->

<SectionChrome section="Функции потерь и целевая функция" />

# Одна модель — разные целевые функции

<div class="grid grid-cols-[1.28fr_0.72fr] gap-9 items-center mt-2">
  <img src="/assets/week-03/outlier-fits.svg" alt="Линейные модели, обученные с MSE, MAE и Huber" class="figure h-[425px]" />
  <div class="text-[22px]">
    <MathBlock formula="\hat y=f_\theta(x)" class="text-center text-[31px]" />
    <div class="key-line mt-8">Семейство допустимых функций остаётся тем же.</div>
    <div class="warning-line mt-7">Правило выбора параметров меняется.</div>
    <div class="success-line mt-7">Поэтому обычно меняются и найденные коэффициенты.</div>
  </div>
</div>

<div v-click class="formula-box mt-3 px-6 py-4"><MathBlock formula="\text{одна модель}+\text{разные функции потерь}\ \Longrightarrow\ \text{разные параметры}" class="text-center text-[27px]" /></div>

---

<!-- S28 -->

<SectionChrome section="Функции потерь и целевая функция" />

# Квантильная функция: цена ошибки зависит от направления

<div class="grid grid-cols-[1.05fr_0.95fr] gap-10 items-center mt-4">
  <div>
    <MathBlock formula="r=y-\hat y" class="text-center text-[30px]" />
    <MathBlock formula="\rho_\tau(r)=\tau\max(r,0)+(1-\tau)\max(-r,0)" class="mt-8 text-[28px]" />
    <div class="grid grid-cols-2 gap-6 mt-9 text-[19px]">
      <div class="warning-line"><MathBlock formula="r>0" :display="false" class="inline-block text-[18px]" />: недопрогноз</div>
      <div class="key-line"><MathBlock formula="r<0" :display="false" class="inline-block text-[18px]" />: перепрогноз</div>
    </div>
  </div>
  <div class="math-column text-center">
    <div class="lead">Дефицит в четыре раза дороже излишка</div>
    <MathBlock formula="\frac{\tau}{1-\tau}=4" class="mt-9 text-[31px]" />
    <MathBlock formula="\boxed{\tau=0.8}" class="mt-8 text-[38px]" />
  </div>
</div>

<div v-click class="success-line mt-9 text-center text-[22px]">Асимметричная функция потерь кодирует разную цену недопрогноза и перепрогноза.</div>

---

<!-- S29 -->

<SectionChrome section="Функции потерь и целевая функция" />

# Функция потерь и целевая функция: итог

<div class="grid grid-cols-2 gap-8 mt-9 text-[21px]">
  <div class="plain-label py-5"><b>Модель</b><p class="mt-3">задаёт семейство допустимых прогнозов.</p></div>
  <div class="plain-label py-5"><b>Функция потерь</b><p class="mt-3">назначает цену ошибке одного объекта.</p></div>
  <div class="plain-label py-5"><b>Эмпирический риск</b><p class="mt-3">усредняет потери и становится целевой функцией обучения.</p></div>
  <div class="plain-label py-5"><b>Выбор функции</b><p class="mt-3">меняет предпочтительное решение: среднее, медиану, компромисс Huber или асимметричный прогноз.</p></div>
</div>

<div v-click class="success-line mt-10 text-center text-[23px]">Запись <MathBlock formula="\arg\min" :display="false" class="inline-block text-[21px]" /> определяет цель; следующий вопрос — как найти её минимум.</div>

---

<!-- S30 -->

<SectionChrome section="Градиентный спуск" />

# `arg min` задаёт цель, но не алгоритм

<div class="text-center mt-11"><MathBlock formula="\boxed{\hat\theta\in\arg\min_\theta R_n(\theta)}" class="text-[43px]" /></div>

<div class="grid grid-cols-2 gap-12 mt-14 text-[25px]">
  <div class="key-line">Запись говорит, <b>что</b> ищем: параметры с минимальным значением целевой функции.</div>
  <div class="warning-line">Она не говорит, <b>как</b> эти параметры вычислить.</div>
</div>

<div v-click class="success-line mt-14 text-center text-[23px]">Для OLS есть специализированный решатель; для произвольной дифференцируемой целевой функции нужен более общий способ поиска.</div>

---

<!-- S31 -->

<SectionChrome section="Градиентный спуск" />

# Производная: локальный наклон

<div class="grid grid-cols-[0.82fr_1.18fr] gap-8 items-center mt-2">
  <div>
    <MathBlock formula="f'(w)=\lim_{h\to0}\frac{f(w+h)-f(w)}h" class="text-center text-[31px]" />
    <MathBlock formula="f(w)=(w-3)^2,\qquad f'(w)=2(w-3)" class="mt-9 text-[25px]" />
    <div class="key-line mt-8"><MathBlock formula="f'(w)>0" :display="false" class="inline-block text-[20px]" />: движение вправо увеличивает функцию.</div>
    <div class="warning-line mt-6"><MathBlock formula="f'(w)<0" :display="false" class="inline-block text-[20px]" />: движение вправо уменьшает функцию.</div>
  </div>
  <img src="/assets/week-03/derivative-tangents.svg" alt="Касательные в точках с отрицательной и положительной производной" class="figure h-[390px]" />
</div>

---

<!-- S32 -->

<SectionChrome section="Градиентный спуск" />

# При нескольких параметрах нужен градиент

<div class="grid grid-cols-2 gap-12 items-center mt-9">
  <div class="text-center">
    <MathBlock formula="\nabla f(\theta)=\begin{pmatrix}\partial f/\partial\theta_1\\\vdots\\\partial f/\partial\theta_d\end{pmatrix}" class="text-[36px]" />
  </div>
  <div class="text-[25px]">
    <div class="key-line">Каждая координата — локальное изменение функции при изменении одного параметра.</div>
    <div class="key-line mt-9">Ненулевой градиент указывает направление наиболее быстрого локального роста.</div>
    <div class="success-line mt-9">Антиградиент задаёт направление локального убывания.</div>
  </div>
</div>

<div class="micro text-center mt-11">Все утверждения локальны: они описывают поведение функции около текущей точки.</div>

---

<!-- S33 -->

<SectionChrome section="Градиентный спуск" />

# Градиент и линии уровня

<div class="grid grid-cols-[1.25fr_0.75fr] gap-8 items-center mt-2">
  <img src="/assets/week-03/gradient-geometry.svg" alt="Градиент, касательная и линии уровня" class="figure h-[425px]" />
  <div>
    <MathBlock formula="f(\theta_1,\theta_2)=c" class="text-center text-[29px]" />
    <div class="key-line mt-9">Вдоль линии уровня значение функции постоянно.</div>
    <div class="key-line mt-7">Ненулевой градиент перпендикулярен гладкой линии уровня.</div>
    <div class="success-line mt-7">Достаточно малый шаг против градиента уменьшает функцию.</div>
  </div>
</div>

---

<!-- S34 -->

<SectionChrome section="Градиентный спуск" />

# Ставим простейшую задачу минимизации

<div class="grid grid-cols-[0.72fr_1.28fr] gap-8 items-center mt-1">
  <div>
    <MathBlock formula="\min_w f(w),\qquad f(w)=(w-3)^2" class="text-[29px]" />
    <MathBlock formula="w_0=0,\qquad f'(w)=2(w-3)" class="mt-7 text-[25px]" />
    <MathBlock formula="f'(0)=-6" class="mt-6 text-[31px]" />
    <div class="success-line mt-7">Производная отрицательна: небольшое увеличение <MathBlock formula="w" :display="false" class="inline-block text-[19px]" /> уменьшает функцию.</div>
  </div>
  <img src="/assets/week-03/gd-parabola.svg" alt="Шаги градиентного спуска на параболе" class="figure h-[400px]" />
</div>

---

<!-- S35 -->

<SectionChrome section="Градиентный спуск" />

# Первый шаг градиентного спуска руками

<div class="grid grid-cols-[0.78fr_1.22fr] gap-8 items-center mt-1">
  <div>
    <MathBlock formula="\eta=0.1" class="text-center text-[34px]" />
    <MathBlock formula="w_1=w_0-\eta f'(w_0)=0.6" class="mt-8 text-[29px]" />
    <MathBlock formula="f'(0.6)=-4.8" class="mt-7" />
    <MathBlock formula="w_2=0.6-0.1(-4.8)=1.08" class="mt-5 text-[28px]" />
  </div>
  <img src="/assets/week-03/gd-parabola.svg" alt="Последовательные шаги градиентного спуска" class="figure h-[400px]" />
</div>

<div class="success-line text-center mt-2">После каждого перемещения локальный наклон вычисляется заново.</div>

---

<!-- S36 -->

<SectionChrome section="Градиентный спуск" />

# Градиентный спуск: общий алгоритм

<div class="lead mt-4">Вычисляем градиент в текущей точке и смещаем параметры в противоположную сторону.</div>

<div class="text-center mt-10"><MathBlock formula="\boxed{\theta^{(t+1)}=\theta^{(t)}-\eta\nabla R_n\bigl(\theta^{(t)}\bigr)}" class="text-[40px]" /></div>

<div class="grid grid-cols-3 gap-8 mt-12 text-center">
  <div class="plain-label"><MathBlock formula="t" class="text-[27px]" /><div class="mt-3">номер итерации</div></div>
  <div class="plain-label"><MathBlock formula="\theta^{(t)}" class="text-[27px]" /><div class="mt-3">текущие параметры</div></div>
  <div class="plain-label"><MathBlock formula="\eta>0" class="text-[27px]" /><div class="mt-3">темп обучения</div></div>
</div>

<div v-click class="micro text-center mt-9">Целевая функция определяет ландшафт; оптимизатор строит по нему последовательность параметров.</div>

---

<!-- S37 -->

<SectionChrome section="Градиентный спуск" />

# Малый темп обучения

<div class="grid grid-cols-[0.72fr_1.28fr] gap-9 items-center mt-1">
  <div>
    <MathBlock formula="f(w)=(w-3)^2" class="text-center text-[28px]" />
    <MathBlock formula="\eta=0.05" class="text-center text-[36px] mt-7" />
    <div class="key-line mt-7">Движение без перепрыгивания через минимум.</div>
    <div class="warning-line mt-6">Очень медленное приближение.</div>
  </div>
  <img src="/assets/week-03/gd-learning-rate-slow.svg" alt="Медленное монотонное движение градиентного спуска" class="figure h-[390px]" />
</div>

<div class="micro text-center mt-3">Значение <MathBlock formula="\eta" :display="false" class="inline-block" /> относится к этой параболе; в другой задаче масштаб темпа обучения будет другим.</div>

---

<!-- S38 -->

<SectionChrome section="Градиентный спуск" />

# Два сходящихся режима движения

<div class="grid grid-cols-[0.74fr_1.26fr] gap-8 items-center mt-1">
  <div>
    <MathBlock formula="f(w)=(w-3)^2" class="text-center text-[25px]" />
    <MathBlock formula="\eta=0.25" class="text-center text-[31px] mt-6" />
    <div class="key-line mt-4">Быстрое монотонное приближение.</div>
    <MathBlock formula="\eta=0.7" class="text-center text-[31px] mt-7" />
    <div class="warning-line mt-4">Сходящиеся колебания.</div>
  </div>
  <img src="/assets/week-03/gd-learning-rate-convergent.svg" alt="Монотонная и колебательная сходящиеся траектории" class="figure h-[365px]" />
</div>

<div class="micro text-center mt-3">Показанные значения относятся к этой параболе; в другой задаче масштаб темпа обучения будет другим.</div>

---

<!-- S39 -->

<SectionChrome section="Градиентный спуск" />

# Вечное перепрыгивание и расходимость

<div class="grid grid-cols-[0.74fr_1.26fr] gap-8 items-center mt-1">
  <div>
    <MathBlock formula="f(w)=(w-3)^2" class="text-center text-[25px]" />
    <MathBlock formula="\eta=1" class="text-center text-[31px] mt-6" />
    <div class="key-line mt-4">Расстояние до минимума не уменьшается.</div>
    <MathBlock formula="\eta=1.02" class="text-center text-[31px] mt-7" />
    <div class="warning-line mt-4">Расстояние растёт, итерации расходятся.</div>
  </div>
  <img src="/assets/week-03/gd-learning-rate-divergent.svg" alt="Незатухающие перепрыгивания и расходящаяся траектория" class="figure h-[365px]" />
</div>

<div class="micro text-center mt-3">Показанные значения относятся к этой параболе; в другой задаче масштаб темпа обучения будет другим.</div>

---

<!-- S40 -->

<SectionChrome section="Градиентный спуск" />

# Поверхность и карта линий уровня

<div class="text-center"><MathBlock formula="f(w_1,w_2)=(w_1-0.6)^2+3(w_2+0.4)^2" class="text-[28px]" /></div>
<img src="/assets/week-03/surface-contours-gd.svg" alt="Одна траектория градиентного спуска на поверхности и карте линий уровня" class="figure h-[345px] mt-1" />
<div class="grid grid-cols-3 gap-7 text-center text-[17px]">
  <div class="key-line">3D-график показывает значение функции третьей координатой.</div>
  <div class="key-line">Карта показывает множества точек с одинаковым значением функции.</div>
  <div class="success-line">На обоих изображениях отмечена одна последовательность параметров.</div>
</div>

---

<!-- S41 -->

<SectionChrome section="Градиентный спуск" />

# Невыпуклая функция: локальная информация имеет пределы

<div class="grid grid-cols-[1.25fr_0.75fr] gap-8 items-center mt-1">
  <img src="/assets/week-03/nonconvex-gd.svg" alt="Разные траектории градиентного спуска на невыпуклой функции" class="figure h-[430px]" />
  <div>
    <MathBlock formula="\ell(w)=(w^2-1)^2+0.9w" class="text-center text-[25px]" />
    <div class="success-line mt-10">Разные начальные точки могут привести к разным локальным минимумам.</div>
    <div class="warning-line mt-8">Градиент сообщает только о форме функции в текущей окрестности.</div>
  </div>
</div>

---

<!-- S42 -->

<SectionChrome section="Градиентный спуск" />

# Выпуклость: локальный минимум глобален

<div class="grid grid-cols-[1fr_1fr] gap-9 items-center mt-1">
  <img src="/assets/week-03/convexity-minima.svg" alt="Выпуклая функция с хордой и пример невыпуклой функции" class="figure h-[375px]" />
  <div>
    <MathBlock formula="f\bigl(\lambda x+(1-\lambda)y\bigr)\le\lambda f(x)+(1-\lambda)f(y),\quad0\le\lambda\le1" class="text-[22px]" />
    <div class="success-line mt-8 text-[22px]">У выпуклой функции любой локальный минимум является глобальным.</div>
    <div class="warning-line mt-7 text-[22px]">Глобальный минимум при этом может быть не единственным.</div>
  </div>
</div>

<div class="micro text-center mt-4">Квадратичная целевая функция линейной регрессии выпукла; при точной мультиколлинеарности множество минимизаторов может содержать несколько точек.</div>

---

<!-- S43 -->

<SectionChrome section="Градиентный спуск" />

# Градиентный спуск итеративный: когда остановиться?

<div class="grid grid-cols-2 gap-x-10 gap-y-8 mt-10">
  <div class="plain-label"><b>Лимит итераций</b><MathBlock formula="t=T" class="mt-4 text-[25px]" /></div>
  <div class="plain-label"><b>Малое изменение целевой функции</b><MathBlock formula="|R(\theta^{(t+1)})-R(\theta^{(t)})|<\varepsilon" class="mt-4 text-[20px]" /></div>
  <div class="plain-label"><b>Малая норма градиента</b><MathBlock formula="\|\nabla R(\theta^{(t)})\|_2<\varepsilon" class="mt-4 text-[22px]" /></div>
  <div class="plain-label"><b>Малое изменение параметров</b><MathBlock formula="\|\theta^{(t+1)}-\theta^{(t)}\|_2<\varepsilon" class="mt-4 text-[21px]" /></div>
</div>

<div v-click class="warning-line mt-10 text-center text-[22px]">Численный критерий остановки не гарантирует ни глобального минимума, ни хорошего качества на новых данных.</div>

---

<!-- S44 -->

<SectionChrome section="Практическая оптимизация" />

# Оптимизация на train и качество на новых данных

<div class="grid grid-cols-2 gap-12 mt-9">
  <div class="math-column"><div class="section-label">ОБУЧЕНИЕ</div><MathBlock formula="\hat\theta\in\arg\min_\theta R_{\rm train}(\theta)" class="mt-10 text-[30px]" /></div>
  <div class="math-column"><div class="section-label">ОЦЕНИВАНИЕ</div><MathBlock formula="M_{\rm val/test}=M\bigl(y,\hat y(\hat\theta)\bigr)" class="mt-10 text-[28px]" /></div>
</div>

<div class="formula-box mt-14 px-8 py-6"><MathBlock formula="R_{\rm train}\downarrow\quad\not\Rightarrow\quad M_{\rm val/test}\text{ улучшается}" class="text-center text-[36px]" /></div>

<div v-click class="micro text-center mt-8">Оптимизатор работает с обучающей целевой функцией; обобщающую способность проверяют отдельно.</div>

---

<!-- S45 -->

<SectionChrome section="Практическая оптимизация" />

# Масштаб признаков меняет геометрию MSE

<div class="grid grid-cols-[1.2fr_0.8fr] gap-8 items-center mt-1">
  <img src="/assets/week-03/feature-scaling-mse.svg" alt="Линии уровня MSE до и после стандартизации признаков" class="figure h-[420px]" />
  <div class="text-[19px]">
    <div class="key-line">Разные масштабы признаков дают вытянутые линии уровня.</div>
    <div class="warning-line mt-5">Один темп обучения трудно подобрать для крутого и пологого направлений.</div>
    <MathBlock formula="x'_j=\frac{x_j-\mu_j}{s_j}" class="mt-7 text-[25px]" />
    <div class="success-line mt-6">Стандартизация делает масштабы координат сопоставимее.</div>
  </div>
</div>

<div class="micro text-center mt-3">Параметры преобразования оценивают на train. Масштабирование не добавляет информацию и не устраняет мультиколлинеарность.</div>

---

<!-- S46 -->

<SectionChrome section="Практическая оптимизация" />

# Полный градиент: используем всю выборку

<div class="text-center mt-10">
  <MathBlock formula="R_n(\theta)=\frac1n\sum_{i=1}^{n}L_i(\theta)" class="text-[32px]" />
  <MathBlock formula="\boxed{\nabla R_n(\theta)=\frac1n\sum_{i=1}^{n}\nabla L_i(\theta)}" class="mt-10 text-[36px]" />
</div>

<div class="grid grid-cols-3 gap-8 mt-14 text-center text-[22px]">
  <div class="plain-label">Все <MathBlock formula="n" :display="false" class="inline-block text-[20px]" /> объектов участвуют перед обновлением.</div>
  <div class="key-line">Получаем точный градиент обучающей целевой функции.</div>
  <div class="warning-line">На большой выборке один шаг может быть дорогим.</div>
</div>

---

<!-- S47 -->

<SectionChrome section="Практическая оптимизация" />

# Mini-batch и SGD: дешевле шаг, шумнее направление

<div class="grid grid-cols-[0.9fr_1.1fr] gap-8 items-center mt-1">
  <div>
    <div class="plain-label text-[19px]">Mini-batch <MathBlock formula="B_t" :display="false" class="inline-block text-[18px]" /> — небольшое подмножество объектов для текущего шага.</div>
    <MathBlock formula="g_t=\frac1{\lvert B_t\rvert}\sum_{i\in B_t}\nabla L_i\bigl(\theta^{(t)}\bigr)" class="mt-7 text-[27px]" />
    <MathBlock formula="\theta^{(t+1)}=\theta^{(t)}-\eta g_t" class="mt-7 text-[27px]" />
    <div class="grid grid-cols-2 gap-5 mt-7 text-[18px]">
      <div class="key-line"><b>full batch:</b> <MathBlock formula="\lvert B_t\rvert=n" :display="false" class="inline-block text-[17px]" /></div>
      <div class="key-line"><b>SGD:</b> <MathBlock formula="\lvert B_t\rvert=1" :display="false" class="inline-block text-[17px]" /></div>
    </div>
  </div>
  <img src="/assets/week-03/gd-vs-sgd.svg" alt="Траектории полного градиента, mini-batch и SGD" class="figure h-[395px]" />
</div>

<div v-click class="success-line mt-4 text-center text-[20px]">Модель и функция потерь не меняются; меняется способ оценивания направления шага оптимизатора.</div>

---

<!-- S48 -->

<SectionChrome section="Градиент МНК" />

# Та же целевая функция МНК, теперь для градиентного спуска

<div class="grid grid-cols-3 gap-8 mt-14 text-center">
  <div class="plain-label"><div class="section-label mb-6">ПРОГНОЗЫ</div><MathBlock formula="X\beta" class="text-[36px]" /></div>
  <div class="plain-label"><div class="section-label mb-6">ОСТАТКИ</div><MathBlock formula="r(\beta)=y-X\beta" class="text-[31px]" /></div>
  <div class="plain-label"><div class="section-label mb-6">ЦЕЛЕВАЯ ФУНКЦИЯ</div><MathBlock formula="R(\beta)=\frac1n\|y-X\beta\|_2^2" class="text-[28px]" /></div>
</div>

<div v-click class="formula-box mt-13 px-8 py-5"><MathBlock formula="R(\beta)=\frac1n\sum_{i=1}^{n}r_i(\beta)^2" class="text-center text-[34px]" /></div>
<div v-click class="success-line mt-9 text-center text-[22px]">Это та же задача МНК, которую в начале лекции решал <code>lstsq</code>.</div>

---

<!-- S49 -->

<SectionChrome section="Градиент МНК" />

# Один объект: вклад в производную

<div class="text-center mt-4">
  <MathBlock formula="r_i(\beta)=y_i-\sum_{k=1}^{q}x_{ik}\beta_k" class="text-[31px]" />
  <MathBlock v-click formula="\frac{\partial r_i}{\partial\beta_j}=-x_{ij}" class="mt-6 text-[35px]" />
  <div v-click class="text-[34px] text-slate-400 my-4">↓</div>
  <MathBlock v-click formula="\boxed{\frac{\partial r_i^2}{\partial\beta_j}=2r_i\frac{\partial r_i}{\partial\beta_j}=-2x_{ij}r_i}" class="text-[36px]" />
</div>

<div v-click class="success-line text-center mt-6 text-[22px]">Вклад объекта — значение признака, умноженное на текущий остаток.</div>

---

<!-- S50 -->

<SectionChrome section="Градиент МНК" />

# Все координаты собираются в $X^\top r$

<div class="grid grid-cols-[0.9fr_1.1fr] gap-12 items-center mt-3">
  <div>
    <MathBlock formula="\frac{\partial R}{\partial\beta_j}=-\frac2n\sum_{i=1}^{n}x_{ij}r_i" class="text-center text-[28px]" />
    <MathBlock formula="X^\top r=\begin{pmatrix}\sum_i x_{i1}r_i\\\vdots\\\sum_i x_{iq}r_i\end{pmatrix}" class="mt-9 text-[27px]" />
  </div>
  <div>
    <div class="formula-box px-7 py-6"><MathBlock formula="\boxed{\nabla R(\beta)=-\frac2nX^\top(y-X\beta)}" class="text-[34px]" /></div>
    <div class="grid grid-cols-3 gap-4 mt-9 text-center text-[18px]">
      <div class="plain-label"><MathBlock formula="X^\top\in\mathbb R^{q\times n}" /></div>
      <div class="plain-label"><MathBlock formula="r\in\mathbb R^n" /></div>
      <div class="plain-label"><MathBlock formula="X^\top r\in\mathbb R^q" /></div>
    </div>
  </div>
</div>

---

<!-- S51 -->

<SectionChrome section="Градиент МНК" />

# Один шаг GD для линейной регрессии

<div class="formula-box mt-5 px-8 py-5"><MathBlock formula="\boxed{\beta^{(t+1)}=\beta^{(t)}+\frac{2\eta}{n}X^\top\bigl(y-X\beta^{(t)}\bigr)}" class="text-[35px]" /></div>

<div class="grid grid-cols-4 gap-5 mt-11 text-center">
  <div class="plain-label"><div class="step-number">1</div><b>Прогнозы</b><MathBlock formula="X\beta^{(t)}" class="mt-4" /></div>
  <div class="plain-label"><div class="step-number">2</div><b>Остатки</b><MathBlock formula="y-X\beta^{(t)}" class="mt-4 text-[19px]" /></div>
  <div class="plain-label"><div class="step-number">3</div><b>Направление</b><MathBlock formula="X^\top r^{(t)}" class="mt-4" /></div>
  <div class="plain-label"><div class="step-number">4</div><b>Параметры</b><MathBlock formula="\beta^{(t+1)}" class="mt-4" /></div>
</div>

<div v-click class="micro text-center mt-8">Градиент MSE содержит минус, поэтому после подстановки в общее правило обновления появляется плюс.</div>

---

<!-- S52 -->

<SectionChrome section="Градиент МНК" />

# Та же задача МНК, другой способ решения

<div class="grid grid-cols-[1.18fr_0.82fr] gap-9 items-center mt-1">
  <img src="/assets/week-03/linear-regression-gd.svg" alt="Последовательные приближения градиентного спуска к решению МНК" class="figure h-[420px]" />
  <div>
    <MathBlock formula="\min_\beta\frac1n\|y-X\beta\|_2^2" class="text-center text-[30px]" />
    <div class="plain-label mt-9"><b><code>lstsq</code></b><br>специализированный численный решатель least-squares-задачи</div>
    <div class="plain-label mt-6"><b>Градиентный спуск</b><br>приближается к тому же минимуму последовательностью шагов</div>
  </div>
</div>

<div v-click class="success-line text-center mt-3 text-[21px]">Меняется решатель; линейная модель и целевая функция MSE остаются прежними.</div>

---

<!-- S53 -->

<SectionChrome section="Градиент МНК" />

<div class="h-5"></div>

# Градиент равен нулю → нормальные уравнения

<div class="mt-7 text-center">
  <MathBlock formula="\nabla R(\hat\beta)=0" class="text-[36px]" />
  <div class="text-[34px] text-slate-400 my-4">↓</div>
  <MathBlock formula="X^\top(y-X\hat\beta)=0" class="text-[38px]" />
  <div class="text-[34px] text-slate-400 my-4">↓</div>
  <div class="formula-box inline-block px-12 py-4"><MathBlock formula="\boxed{X^\top X\hat\beta=X^\top y}" class="text-[41px]" /></div>
</div>

<div v-click class="success-line text-center mt-6 text-[22px]">Нормальные уравнения — условие оптимума MSE, а не самостоятельный численный решатель.</div>

---

<!-- S54 -->

<SectionChrome section="Что скрывается за fit" />

# Одна модель — разные целевые функции и способы поиска

<table class="comparison-table mt-9 text-[21px]">
  <thead><tr><th>Модель</th><th>Целевая функция</th><th>Способ поиска параметров</th></tr></thead>
  <tbody>
    <tr><td>линейная</td><td>MSE</td><td><code>lstsq</code></td></tr>
    <tr><td>линейная</td><td>MSE</td><td>полный градиентный спуск</td></tr>
    <tr><td>линейная</td><td>MSE</td><td>mini-batch / SGD</td></tr>
    <tr><td>линейная</td><td>Huber</td><td>градиентный оптимизатор</td></tr>
  </tbody>
</table>

<div class="grid grid-cols-2 gap-8 mt-9 text-[21px]">
  <div class="key-line">Меняем оптимизатор → сохраняем задачу выбора параметров.</div>
  <div class="warning-line">Меняем функцию потерь → меняем саму задачу оптимизации.</div>
</div>

---

<!-- S55 -->

<SectionChrome section="Что скрывается за fit" />

# Что скрывается за `fit`

<div class="final-role-flow mt-10">
  <div>модель</div><b>+</b><div>функция потерь / цель</div><b>+</b><div>оптимизатор</div><b>→</b><div class="result">обученные параметры</div>
</div>

<div class="grid grid-cols-[1fr_auto_1fr_auto_1.2fr] gap-4 items-center mt-12 text-center text-[22px] font-semibold">
  <div class="plain-label py-6">обученная модель</div>
  <b class="text-blue-600">+</b>
  <div class="plain-label py-6">данные для оценки</div>
  <b class="text-blue-600">→</b>
  <div class="plain-label py-6 border-green-600 bg-green-50">метрики и диагностика</div>
</div>

<div class="grid grid-cols-2 gap-10 mt-12 text-[23px]">
  <div class="key-line">Первые три компонента определяют обучение модели.</div>
  <div class="success-line">Метрики и остатки оценивают уже полученную модель.</div>
</div>

<div class="micro text-center mt-10">Разделяйте четыре вопроса: что моделируем, что минимизируем, как ищем параметры и как оцениваем результат.</div>
