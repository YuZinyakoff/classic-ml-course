---
theme: default
title: Функции потерь и градиентный спуск
author: НИУ ВШЭ
info: |
  Неделя 3 курса классического машинного обучения.
  Функции потерь, вероятностная интерпретация и градиентный спуск.
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
exportFilename: week-03-loss-and-gd
appendixSlides: 3
download: false
---

<!-- S01 -->

<div class="section-kicker mt-12">Классическое машинное обучение · Неделя 3</div>
<h1 class="deck-title mt-14">Функции потерь и градиентный спуск</h1>
<div class="lead mt-5">Что минимизируем и как обучаем</div>
<div class="flow-row mt-24"><div class="flow-node">линейная регрессия</div><div class="flow-arrow">→</div><div class="flow-node">цель обучения</div><div class="flow-arrow">→</div><div class="flow-node">механизм обучения</div></div>

---

<!-- S02 -->

<SectionChrome section="Что минимизируем" />
# Два вопроса после линейной регрессии
<div class="grid grid-cols-2 gap-12 items-center mt-8 text-center"><div><div class="section-label">прогнозы</div><MathBlock formula="\hat y=X\beta" class="mt-8 text-[34px]" /></div><div><div class="section-label">задача МНК</div><MathBlock formula="\hat\beta\in\arg\min_\beta\frac1n\|y-X\beta\|_2^2" class="mt-8 text-[29px]" /></div></div>
<div class="grid grid-cols-2 gap-10 mt-16 text-[27px]"><div class="question-line">Почему именно такой критерий ошибки?</div><div class="question-line">Как искать параметры без специального способа решения?</div></div>

---

<!-- S03 -->

<SectionChrome section="Что минимизируем" />
# Четыре компонента, которые важно различать
<div class="grid grid-cols-4 gap-5 mt-11 text-center"><div class="role-column"><strong>Модель</strong><p>Какие прогнозы можно представить.</p></div><div class="role-column"><strong>Функция потерь</strong><p>Как оценивается ошибка одного объекта.</p></div><div class="role-column"><strong>Оптимизатор</strong><p>Как ищутся параметры.</p></div><div class="role-column"><strong>Метрика качества</strong><p>Как оценивается уже обученная модель.</p></div></div>

---

<!-- S04 -->

<SectionChrome section="Что минимизируем" />
# Остаток: ошибка со знаком
<div class="grid grid-cols-[1.08fr_0.92fr] gap-10 items-center mt-3"><img src="/assets/week-02/regression-residuals.svg" alt="Вертикальные остатки между прогнозами и наблюдаемыми значениями" class="figure h-[400px]" /><div class="text-[25px]"><MathBlock formula="r_i=y_i-\hat y_i" class="text-center text-[35px]" /><div class="key-line mt-9 flex items-center gap-2"><MathBlock formula="r_i>0" :display="false" class="inline-block text-[22px]" /><span>прогноз ниже наблюдаемого значения.</span></div><div class="warning-line mt-6 flex items-center gap-2"><MathBlock formula="r_i<0" :display="false" class="inline-block text-[22px]" /><span>прогноз выше наблюдаемого значения.</span></div><div class="success-line mt-9">Остаток описывает ошибку со знаком, но ещё не определяет её цену.</div></div></div>

---

<!-- S05 -->

<SectionChrome section="Что минимизируем" />
# Функция потерь: цена ошибки одного объекта
<div class="lead mt-6">Функция потерь задаёт правило, по которому ошибка отдельного прогноза превращается в численную величину.</div>
<div class="grid grid-cols-2 gap-12 mt-10 text-center"><div class="math-column"><div class="section-label">общая запись</div><MathBlock formula="L_i(\theta)=L(y_i,\hat y_i)" class="mt-7 text-[31px]" /><MathBlock formula="r_i=y_i-\hat y_i" class="mt-7 text-[29px]" /></div><div class="math-column"><div class="section-label">квадратичная функция</div><MathBlock formula="L_{\rm sq}(y_i,\hat y_i)=(y_i-\hat y_i)^2=r_i^2" class="mt-12 text-[29px]" /></div></div>

---

<!-- S06 -->

<SectionChrome section="Что минимизируем" />
# От функции потерь к эмпирическому риску
<div class="text-center mt-2"><MathBlock formula="R_n(\theta)=\frac1n\sum_{i=1}^n L_i(\theta)" class="text-[35px]" /></div>
<div class="grid grid-cols-3 gap-7 mt-7 text-center"><div class="plain-label"><MathBlock formula="L_i" class="text-[22px]" /><span class="muted">функция потерь на объекте</span></div><div class="plain-label"><MathBlock formula="R_n" class="text-[22px]" /><span class="muted">эмпирический риск</span></div><div class="plain-label"><MathBlock formula="R_n" class="text-[22px]" /><span class="muted">целевая функция при обучении</span></div></div>
<div class="grid grid-cols-2 gap-10 items-center mt-7"><MathBlock formula="\hat\theta\in\arg\min_\theta R_n(\theta)" class="text-center text-[29px]" /><div><MathBlock formula="RSS(\beta)=\sum_i(y_i-x_i^\top\beta)^2" /><MathBlock formula="MSE(\beta)=\frac1nRSS(\beta)" /></div></div>
<div class="success-line text-center mt-4">RSS и MSE достигают минимума при одних и тех же значениях параметров.</div>

---

<!-- S07 -->

<SectionChrome section="Что минимизируем" />
# Путь от прогноза к цели обучения
<div class="process-chain mt-16"><div><span>наблюдаемое</span><MathBlock formula="y_i" /></div><i>→</i><div><span>прогноз</span><MathBlock formula="\hat y_i=f_\theta(x_i)" /></div><i>→</i><div><span>остаток</span><MathBlock formula="r_i" /></div><i>→</i><div><span>функция потерь</span><MathBlock formula="L_i" /></div><i>→</i><div><span>усреднение</span><b>по train</b></div><i>→</i><div><span>риск</span><MathBlock formula="R_n(\theta)" /></div><i>→</i><div><span>обучение</span><b>arg min</b></div></div>
<div class="success-line text-center mt-16 text-[27px]">Функция потерь оценивает один объект; эмпирический риск собирает цель обучения по всей выборке.</div>

---

<!-- S08 -->

<SectionChrome section="Что минимизируем" />
# Целевая функция и метрика качества
<div class="grid grid-cols-2 gap-10 mt-6"><div class="math-column"><div class="section-label">обучение</div><MathBlock formula="R_{\rm train}(\beta)=\frac1{n_{\rm train}}\sum_{i\in train}L\bigl(y_i,f_\beta(x_i)\bigr)" class="mt-7 text-[23px]" /><div class="mt-7 flex items-center gap-2"><MathBlock formula="\beta" :display="false" class="inline-block text-[21px]" /><span>— переменная оптимизации.</span></div></div><div class="math-column"><div class="section-label">оценивание</div><MathBlock formula="M_{\rm eval}=M\bigl(y,\hat y(\hat\beta)\bigr)" class="mt-7 text-[28px]" /><div class="mt-7 flex items-center gap-2"><span>Оценённые параметры</span><MathBlock formula="\hat\beta" :display="false" class="inline-block text-[21px]" /><span>уже зафиксированы.</span></div></div></div>
<div class="success-line text-center mt-12 text-[25px]">Одна формула, например MSE, может быть целью обучения и метрикой: роль определяется местом в эксперименте.</div>

---

<!-- S09 -->

<SectionChrome section="Что минимизируем" />
# Одна ошибка, разные правила оценки
<div class="text-center text-[32px] mt-7"><MathBlock formula="r=y-\hat y" /></div>
<div class="sequence-list mt-10 text-[25px]"><div><span>1</span><div>Ошибка 20 насколько хуже ошибки 10?</div></div><div><span>2</span><div>Как реагировать на редкие крупные остатки?</div></div><div><span>3</span><div>Нужна ли гладкость для выбранного метода оптимизации?</div></div></div>

---

<!-- S10 -->

<SectionChrome section="Что минимизируем" />
# MSE: средняя квадратичная ошибка
<div class="grid grid-cols-[0.86fr_1.14fr] gap-8 items-center mt-1"><div><div class="lead"><b>MSE = Mean Squared Error</b><br>средняя квадратичная ошибка</div><MathBlock formula="L_{\rm sq}(r)=r^2" class="mt-8 text-[31px]" /><MathBlock formula="MSE=\frac1n\sum_i r_i^2=\frac1nRSS" class="mt-5 text-[27px]" /><MathBlock formula="10^2=100,\qquad20^2=400" class="mt-7" /><div class="success-line mt-7">Вдвое больший по модулю остаток даёт вчетверо больший вклад.</div></div><div class="text-center"><img src="/assets/week-03/loss-curves-focus-mse.svg" alt="Квадратичная, абсолютная и Huber функции потерь с выделенной MSE" class="figure h-[365px]" /><div class="micro mt-1 flex items-center justify-center gap-1 flex-wrap"><span>На графике квадратичная функция показана как</span><MathBlock formula="\frac12r^2" :display="false" class="inline-block text-[16px]" /><span>для сравнения формы; положительный множитель не меняет минимум.</span></div></div></div>

---

<!-- S11 -->

<SectionChrome section="Что минимизируем" />
# MAE: средняя абсолютная ошибка
<div class="grid grid-cols-[0.86fr_1.14fr] gap-8 items-center mt-1"><div><div class="lead"><b>MAE = Mean Absolute Error</b><br>средняя абсолютная ошибка</div><MathBlock formula="L_{\rm abs}(r)=|r|" class="mt-9 text-[31px]" /><MathBlock formula="MAE=\frac1n\sum_i|r_i|" class="mt-6 text-[29px]" /><div class="success-line mt-10">Ошибка 20 ровно вдвое дороже ошибки 10.</div></div><div class="text-center"><img src="/assets/week-03/loss-curves-focus-mae.svg" alt="Квадратичная, абсолютная и Huber функции потерь с выделенной MAE" class="figure h-[365px]" /><div class="micro mt-1 flex items-center justify-center gap-1 flex-wrap"><span>На графике квадратичная функция показана как</span><MathBlock formula="\frac12r^2" :display="false" class="inline-block text-[16px]" /><span>для сравнения формы; положительный множитель не меняет минимум.</span></div></div></div>

---

<!-- S12 -->

<SectionChrome section="Что минимизируем" />
# MAE среди постоянных прогнозов выбирает медиану
<div class="text-center text-[27px]"><MathBlock formula="1,2,4,5,20" /></div>
<div class="grid grid-cols-2 gap-12 items-center mt-8"><div><MathBlock formula="Q(c)=\sum_i|y_i-c|" class="text-center text-[31px]" /><MathBlock formula="Q(2)=24,\quad Q(4)=22,\quad Q(5)=23" class="mt-8" /><div class="success-line mt-8 text-center">Минимум при c=4 — на медиане.</div></div><div class="lead">Пока справа от c точек больше, движение вправо уменьшает сумму расстояний. После медианы движение вправо уже увеличивает её.</div></div>

---

<!-- S13 -->

<SectionChrome section="Что минимизируем" />
# MAE и излом в нуле
<div class="grid grid-cols-2 gap-12 items-center mt-7"><div class="text-center"><MathBlock formula="\frac{d|r|}{dr}=\begin{cases}-1,&r<0,\\1,&r>0.\end{cases}" class="text-[34px]" /></div><div class="text-[27px]"><div class="warning-line">В точке r=0 обычной производной нет.</div><div class="success-line mt-10">Задача решаема, но нужен метод, умеющий работать с негладкой целевой функцией.</div></div></div>

---

<!-- S14 -->

<SectionChrome section="Что минимизируем" />
# Huber: зачем нужна третья форма
<div class="grid grid-cols-[0.88fr_1.12fr] gap-8 items-center mt-1"><div><div class="lead">Хотим сохранить квадратичную форму для обычных ошибок, но ограничить влияние отдельных больших остатков.</div><div class="sequence-list mt-9"><div><span>1</span><div>около нуля — квадратичный режим;</div></div><div><span>2</span><div>в хвостах — линейный рост;</div></div><div><span>3</span><div>между режимами — гладкая склейка.</div></div></div></div><div class="text-center"><img src="/assets/week-03/loss-curves-focus-huber.svg" alt="Квадратичная, абсолютная и Huber функции потерь с выделенной Huber" class="figure h-[365px]" /><div class="micro mt-1 flex items-center justify-center gap-1 flex-wrap"><span>На графике квадратичная функция показана как</span><MathBlock formula="\frac12r^2" :display="false" class="inline-block text-[16px]" /><span>для сравнения формы; положительный множитель не меняет минимум.</span></div></div></div>

---

<!-- S15 -->

<SectionChrome section="Что минимизируем" />
# Huber: формула и роль δ
<div class="grid grid-cols-[1.05fr_0.95fr] gap-10 items-center mt-2"><div class="text-center"><MathBlock formula="L_\delta(r)=\begin{cases}\frac12r^2,&|r|\le\delta,\\\delta\left(|r|-\frac12\delta\right),&|r|>\delta.\end{cases}" class="text-[31px]" /><MathBlock formula="\delta=2,\ r>2:\quad L_2(r)=2(r-1)" class="mt-8" /></div><div><div class="key-line">Меньшая δ: линейный режим начинается раньше.</div><div class="key-line mt-6">Большая δ: квадратичный режим длится дольше.</div><div class="warning-line mt-6">δ измеряется в единицах остатка.</div><div class="success-line mt-7">В ±δ совпадают значение и наклон ветвей.</div></div></div>

---

<!-- S16 -->

<SectionChrome section="Что минимизируем" />
# Одна модель, три целевые функции
<div class="text-center"><MathBlock formula="\hat y_i=f_\theta(x_i)" class="text-[31px]" /><div class="muted">Семейство прогнозов остаётся тем же.</div></div>
<div class="grid grid-cols-3 gap-7 mt-7 text-center"><div class="metric-column"><div class="section-label">MSE</div><MathBlock formula="R_{\rm MSE}(\theta)=\frac1n\sum_i(y_i-f_\theta(x_i))^2" class="mt-7 text-[22px]" /></div><div class="metric-column"><div class="section-label">MAE</div><MathBlock formula="R_{\rm MAE}(\theta)=\frac1n\sum_i|y_i-f_\theta(x_i)|" class="mt-7 text-[22px]" /></div><div class="metric-column"><div class="section-label">Huber</div><MathBlock formula="R_{\rm Huber}(\theta)=\frac1n\sum_iL_\delta(y_i-f_\theta(x_i))" class="mt-7 text-[21px]" /></div></div>
<div class="success-line text-center mt-8">Меняется цель обучения — обычно меняется и найденный набор параметров.</div>

---

<!-- S17 -->

<SectionChrome section="Что минимизируем" />
# Производная показывает чувствительность к остатку
<div class="grid grid-cols-[1.25fr_0.75fr] gap-9 items-center mt-1"><img src="/assets/week-03/loss-derivatives.svg" alt="Производные нормированной квадратичной, абсолютной и Huber функций потерь по остатку" class="figure h-[430px]" /><div class="text-[19px]"><div class="plain-label"><b>Квадратичная:</b> <MathBlock formula="|L'(r)|" :display="false" class="inline-block text-[18px]" /> растёт вместе с <MathBlock formula="|r|" :display="false" class="inline-block text-[18px]" />.</div><div class="plain-label mt-5"><b>MAE:</b> вне нуля <MathBlock formula="|L'(r)|" :display="false" class="inline-block text-[18px]" /> постоянно.</div><div class="plain-label mt-5"><b>Huber:</b> сначала <MathBlock formula="|L'(r)|" :display="false" class="inline-block text-[18px]" /> растёт, после <MathBlock formula="\delta" :display="false" class="inline-block text-[18px]" /> перестаёт расти.</div><div class="success-line mt-8">Поэтому квадратичная функция всё сильнее реагирует на крупные остатки, а Huber ограничивает эту реакцию.</div></div></div>

<div class="micro text-center">На первой панели: <MathBlock formula="L(r)=\frac12r^2,\quad L'(r)=r" :display="false" class="inline-block" />.</div>

---

<!-- S18 -->

<SectionChrome section="Что минимизируем" />
# Разные функции потерь по-разному реагируют на крупные остатки
<div class="grid grid-cols-[1.3fr_0.7fr] gap-9 items-center mt-2"><img src="/assets/week-03/outlier-fits.svg" alt="Линейные модели, обученные с разными функциями потерь" class="figure h-[440px]" /><div class="statement">Разная целевая функция<br><span class="muted">→</span><br>разные коэффициенты.</div></div>

---

<!-- S19 -->

<SectionChrome section="Что минимизируем" />
# Log-Cosh: ещё один гладкий робастный вариант
<div class="grid grid-cols-[0.76fr_1.24fr] gap-8 items-center mt-2"><div><MathBlock formula="L(r)=\log\cosh r" class="text-center text-[31px]" /><div class="key-line mt-8">около нуля: примерно ½r²;</div><div class="key-line mt-6">в хвостах: примерно |r|−log 2;</div><div class="success-line mt-6">кривизна меняется плавно.</div></div><img src="/assets/week-03/logcosh-comparison.svg" alt="Log-Cosh рядом с квадратичной и абсолютной функциями" class="figure h-[400px]" /></div>

---

<!-- S20 -->

<SectionChrome section="Что минимизируем" />
# MAPE как метрика относительной ошибки
<div class="lead"><b>MAPE = Mean Absolute Percentage Error</b> — средняя абсолютная процентная ошибка.</div>
<div class="grid grid-cols-[0.92fr_1.08fr] gap-8 mt-5 items-center"><div><MathBlock formula="MAPE=\frac1n\sum_i\left|\frac{y_i-\hat y_i}{y_i}\right|" class="text-center text-[30px]" /><div class="success-line mt-6">Полезна, когда процентная ошибка содержательна, а положительные y не близки к нулю.</div><div class="warning-line mt-4">Ноль не допустим; малые |yᵢ| получают огромный вес.</div></div><div class="plain-label"><MathBlock formula="y=(200,1000),\qquad \hat y=(100,900)" class="text-[22px]" /><MathBlock formula="RMSE=100" class="mt-4 text-[25px]" /><div class="mt-4">Относительные ошибки: 50% и 10%.</div><MathBlock formula="MAPE=30\%" class="mt-4 text-[25px]" /><div class="micro mt-4">RMSE показывает абсолютный масштаб промаха; MAPE — его размер относительно фактического значения.</div></div></div>

---

<!-- S21 -->

<SectionChrome section="Что минимизируем" />
# Зачем появился SMAPE
<div class="grid grid-cols-[0.78fr_1.22fr] gap-10 items-center mt-4"><div><MathBlock formula="y=100,\ \hat y=50\Rightarrow50\%" /><MathBlock formula="y=100,\ \hat y=200\Rightarrow100\%" class="mt-7" /><div class="warning-line mt-9">MAPE по-разному оценивает занижение и завышение в одинаковое число раз.</div></div><div><div class="lead"><b>SMAPE = Symmetric Mean Absolute Percentage Error</b></div><MathBlock formula="SMAPE=\frac1n\sum_i\frac{|y_i-\hat y_i|}{(|y_i|+|\hat y_i|)/2}" class="mt-8 text-[27px]" /><div class="success-line mt-8">Симметрична при обмене факта и прогноза; для ненулевого знаменателя значения от 0 до 2.</div></div></div>
<div class="micro text-center mt-7">Проблемы около нуля полностью не исчезают.</div>

---

<!-- S22 -->

<SectionChrome section="Что минимизируем" />
# Три прикладных вопроса перед выбором функции потерь
<div class="grid grid-cols-3 gap-7 mt-8 text-center"><div class="role-column"><strong>Время доставки</strong><p>Насколько критичны редкие крупные опоздания?</p><div class="key-line mt-5 text-left text-[17px]">Если крупные промахи особенно дороги, важна скорость роста функции при больших |r|.</div></div><div class="role-column"><strong>Спрос разного масштаба</strong><p>Нужна абсолютная или относительная ошибка?</p><div class="success-line mt-5 text-left text-[17px]">Если важна ошибка относительно уровня спроса, смотрим на относительные ошибки.</div></div><div class="role-column"><strong>Складской запас</strong><p>Одинакова ли цена недо- и перепрогноза?</p><div class="warning-line mt-5 text-left text-[17px]">Если недо- и перепрогноз имеют разную стоимость, нужна асимметричная функция потерь.</div></div></div>

---

<!-- S23 -->

<SectionChrome section="Что минимизируем" />
# Кейс: дефицит дороже излишка
<div class="text-center text-[28px] mt-3 flex items-center justify-center gap-2"><span>Сегодня выбираем запас</span><MathBlock formula="\hat y" :display="false" class="inline-block text-[26px]" /><span>, затем реализуется спрос</span><MathBlock formula="y" :display="false" class="inline-block text-[26px]" /><span>.</span></div>
<div class="text-center mt-5"><MathBlock formula="r=y-\hat y" class="text-[34px]" /></div>
<div class="grid grid-cols-2 gap-10 mt-7"><div class="warning-box"><b>r &gt; 0: недопрогноз</b><br><br>Спрос выше запаса → часть спроса не обслужена → стоимость 4 за единицу.</div><div class="success-box"><b>r &lt; 0: перепрогноз</b><br><br>Запас выше спроса → остаётся излишек → стоимость 1 за единицу.</div></div>
<div class="success-line text-center mt-10">Знак одного остатка теперь имеет разную прикладную цену.</div>

---

<!-- S24 -->

<SectionChrome section="Что минимизируем" />
# Квантильная функция потерь: форма
<div class="grid grid-cols-[0.9fr_1.1fr] gap-7 items-center mt-1"><div><div class="micro">ρ — традиционный символ; встречается название pinball loss.</div><MathBlock formula="\rho_\tau(r)=\tau\max(r,0)+(1-\tau)\max(-r,0)" class="mt-4 text-[24px]" /><MathBlock formula="\rho_\tau(r)=\begin{cases}\tau r,&r\ge0,\\(\tau-1)r,&r<0.\end{cases}" class="mt-4 text-[24px]" /><MathBlock formula="R_\tau(\theta)=\frac1n\sum_i\rho_\tau\bigl(y_i-f_\theta(x_i)\bigr)" class="mt-4 text-[21px]" /><MathBlock formula="\tau>0.5\Rightarrow\text{недопрогноз дороже}" class="mt-4 text-[18px]" /></div><div class="text-center"><img src="/assets/week-03/quantile-loss-states.svg" alt="Квантильная функция потерь при tau 0.2, 0.5 и 0.8" class="figure h-[292px]" /><MathBlock formula="\tau=0.5\Rightarrow\rho_{0.5}(r)=\frac12|r|\Rightarrow\rho_{0.5}\propto MAE" class="mt-3 text-[20px]" /><div class="micro mt-2">Символ «пропорционально» означает: минимум тот же, поскольку функции отличаются только положительным множителем.</div></div></div>

---

<!-- S25 -->

<SectionChrome section="Что минимизируем" />
# Как стоимость ошибок задаёт τ
<div class="grid grid-cols-2 gap-10 items-center mt-2"><div><div class="section-label text-center">ПРИКЛАДНАЯ СТОИМОСТЬ</div><MathBlock formula="C(r)=4\max(r,0)+\max(-r,0)" class="mt-6 text-[28px]" /><div class="section-label text-center mt-8">КВАНТИЛЬНАЯ ФУНКЦИЯ</div><MathBlock formula="\rho_\tau(r)=\tau\max(r,0)+(1-\tau)\max(-r,0)" class="mt-6 text-[25px]" /></div><div class="text-center"><div class="lead">Отношение наклонов должно совпасть с отношением стоимостей:</div><MathBlock formula="\frac{\tau}{1-\tau}=\frac41\Rightarrow\boxed{\tau=0.8}" class="mt-6 text-[32px]" /><MathBlock formula="5\rho_{0.8}(r)=4\max(r,0)+\max(-r,0)" class="mt-7 text-[25px]" /><div class="success-line mt-7 text-left text-[18px]">При линейной стоимости ошибок выбираем τ так, чтобы отношение наклонов двух ветвей совпало с отношением стоимостей недо- и перепрогноза.</div></div></div>

---

<!-- S26 -->

<SectionChrome section="Что минимизируем" />
# Постоянный прогноз: разные критерии дают разные решения
<div class="text-center text-[24px]"><MathBlock formula="40,44,46,48,49,50,52,54,57,61,66,82" /></div>
<div class="grid grid-cols-2 gap-10 mt-6"><div class="math-column"><div class="section-label">MSE</div><MathBlock formula="c_{\rm MSE}=\bar y\approx54.1" class="mt-7 text-[31px]" /><div class="mt-5">выбирает среднее</div></div><div class="math-column"><div class="section-label"><MathBlock formula="\rho_\tau,\quad\tau=0.8" class="text-[18px]" /></div><MathBlock formula="c_{0.8}=61" class="mt-7 text-[34px]" /><div class="mt-5">выбирает 0.8-квантиль</div></div></div>
<div class="key-line text-center mt-6">0.8-квантиль — значение, ниже которого находится примерно 80% распределения спроса.</div>
<div class="success-line text-center mt-5 text-[23px]">Более высокая цена дефицита сдвигает оптимальный постоянный прогноз вверх — от среднего к верхнему квантилю спроса.</div>

---

<!-- S27 -->

<SectionChrome section="Что минимизируем" />
# Что мы уже поняли о функции потерь
<div class="recap-list mt-4 text-[20px]"><div>Остаток описывает ошибку со знаком; функция потерь задаёт её цену для одного объекта.</div><div>Эмпирический риск агрегирует значения на train и становится целью обучения.</div><div>Форма функции задаёт чувствительность к крупным ошибкам, гладкость, масштаб и асимметрию.</div><div>Одна модель при разных функциях потерь может получить разные параметры.</div></div>
<div class="success-line mt-8 text-center">Второй путь выбора функции потерь — вывести её из вероятностной модели данных.</div>

---

<!-- S28 -->

<SectionChrome section="Вероятностный мост" />
# Вероятностная модель регрессии
<div class="text-center mt-3"><MathBlock formula="Y=f_\theta(X)+\varepsilon" class="text-[38px]" /></div>
<div class="grid grid-cols-2 gap-10 mt-9"><div class="key-line text-center"><MathBlock formula="f_\theta(X)" class="text-[29px]" /><div class="mt-3">систематическая часть зависимости</div></div><div class="warning-line text-center"><MathBlock formula="\varepsilon" class="text-[29px]" /><div class="mt-3">случайная вариативность</div></div></div>
<div class="success-line text-center mt-10 text-[24px]">Систематическая часть задаёт положение условного распределения, а распределение случайной ошибки — характер отклонений вокруг него.</div>

---

<!-- S29 -->

<SectionChrome section="Вероятностный мост" />
# Формула Бернулли: вероятность результата
<div class="lead mt-1">Бросаем одну и ту же монету n = 10 раз; вероятность орла в каждом броске равна p.</div>
<div class="grid grid-cols-[0.94fr_1.06fr] gap-8 items-center mt-2"><div><MathBlock formula="P(K=k\mid p)=\binom nkp^k(1-p)^{n-k}" class="text-center text-[28px]" /><div class="key-line mt-5">Cₙᵏ: выбираем k бросков с орлом.</div><div class="key-line mt-3">pᵏ: вероятность этих k орлов.</div><div class="key-line mt-3">(1−p)ⁿ⁻ᵏ: вероятность остальных исходов.</div><MathBlock formula="n=10,\ p=0.7:\quad k\text{ меняется}" class="mt-4" /></div><img src="/assets/week-03/bernoulli-probability.svg" alt="Вероятность получить k орлов в десяти бросках при p равном 0.7" class="figure h-[355px]" /></div>

---

<!-- S30 -->

<SectionChrome section="Вероятностный мост" />
# Правдоподобие: результат уже получен
<div class="grid grid-cols-[0.9fr_1.1fr] gap-9 items-center mt-1"><div class="text-center"><MathBlock formula="K=7" class="text-[38px]" /><MathBlock formula="\mathcal L(p;K=7)=\binom{10}{7}p^7(1-p)^3" class="mt-6 text-[28px]" /><div class="key-line text-left mt-8">Данные фиксированы, p меняется.</div><div class="success-line text-left mt-6">Правдоподобие — функция параметра, а не распределение параметра.</div></div><img src="/assets/week-03/bernoulli-likelihood.svg" alt="Правдоподобие параметра p после наблюдения семи орлов" class="figure h-[390px]" /></div>

---

<!-- S31 -->

<SectionChrome section="Вероятностный мост" />
# Зачем максимизировать правдоподобие
<div class="lead mt-5"><b>MLE = Maximum Likelihood Estimation</b> — метод максимального правдоподобия.</div>
<div class="text-center mt-12"><MathBlock formula="\hat\theta_{\rm MLE}\in\arg\max_\theta\mathcal L(\theta;D)" class="text-[38px]" /></div>
<div class="grid grid-cols-2 gap-10 mt-12"><div class="warning-line">p=0.2: семь орлов из десяти малоправдоподобны.</div><div class="success-line">p=0.7: такой результат правдоподобен.</div></div>
<div class="success-line text-center mt-11">Выбираем параметры, при которых наблюдаемые данные лучше согласуются с моделью.</div>

---

<!-- S32 -->

<SectionChrome section="Вероятностный мост" />
# Вероятность и правдоподобие: один экран
<div class="grid grid-cols-[0.9fr_1.1fr] gap-8 items-center mt-1"><table class="text-[20px]"><thead><tr><th class="p-3"></th><th class="p-3">Фиксируем</th><th class="p-3">Меняется</th></tr></thead><tbody><tr><td class="p-3 font-650">Вероятность</td><td class="p-3">параметр</td><td class="p-3">результат</td></tr><tr><td class="p-3 font-650">Likelihood</td><td class="p-3">данные</td><td class="p-3">параметр</td></tr></tbody></table><img src="/assets/week-03/probability-vs-likelihood.svg" alt="Вероятность результата и правдоподобие параметра" class="figure h-[390px]" /></div>
<div class="success-line text-center mt-3">Одна формула отвечает на два вопроса при разном выборе фиксированных величин.</div>

---

<!-- S33 -->
<SectionChrome section="Вероятностный мост" />
# Та же смена ролей в регрессии

<div class="grid grid-cols-2 gap-12 mt-8">
  <div class="math-column">
    <div class="section-label">до наблюдения ответа</div>
    <MathBlock formula="p_\theta(y\mid x)" class="mt-8 text-[34px]" />
    <div class="mt-7">
      <MathBlock formula="x,\theta\ \text{фиксированы},\qquad Y\ \text{случайна}" class="text-[20px]" />
    </div>
    <div class="mt-6">
      Условная модель описывает возможные значения целевой переменной при данных признаках.
    </div>
  </div>

  <div class="math-column">
    <div class="section-label">после наблюдения ответа</div>
    <MathBlock formula="p_\theta(y_i\mid x_i)" class="mt-8 text-[34px]" />
    <div class="mt-7">
      <MathBlock formula="x_i,y_i\ \text{фиксированы},\qquad \theta\ \text{меняется}" class="text-[20px]" />
    </div>
    <div class="mt-6">
      То же выражение рассматриваем как функцию кандидата параметров.
    </div>
  </div>
</div>

<div class="success-line text-center mt-10">
  Как у монеты: сначала параметры задают распределение возможных данных; после наблюдения данных сравниваем параметры.
</div>
---

<!-- S34 -->

<SectionChrome section="Вероятностный мост" />
# В непрерывной регрессии используем условную плотность

<div class="grid grid-cols-[0.42fr_1fr] gap-x-10 gap-y-7 items-center mt-5">
  <MathBlock formula="Y\mid X=x_i" class="text-center text-[34px]" />
  <div class="key-line text-[21px]">
    Условное распределение целевой переменной при фиксированных признаках объекта.
  </div>

  <MathBlock formula="p_\theta(y\mid x_i)" class="text-center text-[34px]" />
  <div class="plain-label text-[21px]">
    Условная плотность возможных значений целевой переменной.
  </div>

  <MathBlock formula="p_\theta(y_i\mid x_i)" class="text-center text-[34px]" />
  <div class="success-line text-[21px]">
    После наблюдения конкретного
    <MathBlock formula="y_i" :display="false" class="inline-block text-[20px]" />
    значение плотности в этой точке становится вкладом объекта в likelihood.
  </div>
</div>

<div class="formula-box mt-7 px-6 py-4">
  <MathBlock
    formula="p_\theta(y\mid x_i)\ge0,\qquad \int_{-\infty}^{\infty}p_\theta(y\mid x_i)\,dy=1"
    class="text-center text-[22px]"
  />
  <MathBlock
    formula="P(a\le Y\le b\mid X=x_i)=\int_a^b p_\theta(y\mid x_i)\,dy"
    class="text-center mt-3 text-[21px]"
  />
</div>

<div class="micro text-center mt-4">
  Для непрерывного распределения вероятность отдельной точки равна нулю; значение плотности не является вероятностью и может превышать единицу.
</div>
---

<!-- S35 -->

<SectionChrome section="Вероятностный мост" />
# Правдоподобие всей обучающей выборки

<div class="text-center mt-1">
  <MathBlock formula="D=\{(x_i,y_i)\}_{i=1}^n" class="text-[29px]" />
</div>

<div class="section-label text-center mt-5">ПРИ ФИКСИРОВАННЫХ ПАРАМЕТРАХ</div>
<div class="text-center mt-3">
  <MathBlock
    formula="p_\theta(y_1,\ldots,y_n\mid x_1,\ldots,x_n)"
    class="text-[28px]"
  />
</div>
<div class="micro text-center mt-2">
  совместная условная плотность наблюдаемых ответов
</div>
<div class="success-line text-center mt-6">
  Если ответы условно независимы при заданных признаках и параметрах:
</div>
<div class="text-center mt-4">
  <MathBlock
    formula="p_\theta(y_1,\ldots,y_n\mid x_1,\ldots,x_n)=\prod_{i=1}^n p_\theta(y_i\mid x_i)"
    class="text-[29px]"
  />
</div>

<div class="section-label text-center mt-3">ПОСЛЕ ФИКСАЦИИ НАБЛЮДЁННЫХ ДАННЫХ</div>
<div class="text-center mt-3">
  <MathBlock
    formula="\boxed{\mathcal L(\theta;D)=\prod_{i=1}^n p_\theta(y_i\mid x_i)}"
    class="text-[34px]"
  />
</div>
<div class="micro text-center mt-3">
  Факторизация следует из условной независимости данных; likelihood — это полученное выражение, рассматриваемое как функция параметров.
</div>
---

<!-- S36 -->

<SectionChrome section="Вероятностный мост" />
# От likelihood к log-likelihood и NLL
<div class="text-center mt-1"><MathBlock formula="\arg\max_\theta\mathcal L=\arg\max_\theta\log\mathcal L=\arg\min_\theta[-\log\mathcal L]" class="text-[31px]" /></div>
<div class="grid grid-cols-2 gap-10 mt-8"><div class="key-line">Логарифм строго возрастает: максимум не меняется.</div><div class="warning-line">Знак минус превращает максимум в минимум.</div></div>
<MathBlock formula="\log\mathcal L(\theta;D)=\sum_i\log p_\theta(y_i\mid x_i)" class="text-center mt-8 text-[29px]" />
<div class="grid grid-cols-2 gap-8 mt-8"><div class="plain-label"><b>log-likelihood</b><br>логарифмическое правдоподобие</div><div class="plain-label"><b>NLL = negative log-likelihood</b><br>отрицательное логарифмическое правдоподобие</div></div>

---

<!-- S37 -->

<SectionChrome section="Вероятностный мост" />
# NLL раскладывается в сумму функций потерь

<div class="lead mt-2">Отрицательное логарифмическое правдоподобие — сумма отдельных вкладов объектов.</div>

<div class="grid grid-cols-2 gap-10 items-center mt-4">
<div>
<MathBlock formula="-\log\mathcal L(\theta;D)=\sum_i[-\log p_\theta(y_i\mid x_i)]" class="text-[23px]" />
<div class="section-label text-center mt-7">ИНДИВИДУАЛЬНЫЙ ВКЛАД ОПРЕДЕЛЯЕМ КАК ФУНКЦИЮ ПОТЕРЬ</div>
<MathBlock formula="\boxed{L_i(\theta)=-\log p_\theta(y_i\mid x_i)}" class="mt-5 text-[29px]" />
</div>
<div>
<MathBlock formula="R_n(\theta)=\frac1n\sum_iL_i(\theta)=\frac1n[-\log\mathcal L(\theta;D)]" class="text-[24px]" />
<div class="micro text-center mt-5">Положительный множитель 1/n не меняет точку минимума.</div>
</div>
</div>

<div class="grid grid-cols-2 gap-8 mt-7 text-[18px]">
<div class="success-line">Выше условная плотность наблюдённого значения при текущих параметрах → меньше вклад объекта в NLL.</div>
<div class="warning-line">Ниже условная плотность наблюдённого значения при текущих параметрах → больше вклад объекта в NLL.</div>
</div>

<div class="success-line text-center mt-5 text-[20px]">Мы снова получили знакомую форму: обучение минимизирует сумму или среднее функций потерь отдельных объектов.</div>

---

<!-- S38 -->

<SectionChrome section="Вероятностный мост" />
# Нормальный шум задаёт условное нормальное распределение
<div class="grid grid-cols-[0.82fr_1.18fr] gap-10 items-center mt-5"><div><MathBlock formula="Y=f_\theta(X)+\varepsilon" class="text-center text-[31px]" /><MathBlock formula="\varepsilon_i\mid X_i=x_i\sim\mathcal N(0,\sigma^2)" class="text-center mt-5 text-[31px]" /><MathBlock formula="Y_i\mid X_i=x_i\sim\mathcal N\bigl(f_\theta(x_i),\sigma^2\bigr)" class="text-center mt-8 text-[25px]" /></div><div><div class="key-line text-center"><MathBlock formula="f_\theta(x_i)" class="text-[27px]" /><div class="mt-2">центр распределения и точечный прогноз</div></div><div class="warning-line mt-7 text-center"><MathBlock formula="\sigma" class="text-[27px]" /><div class="mt-2">масштаб вариативности вокруг центра</div></div><div class="success-line mt-7">При нормальной модели значения y, расположенные ближе к центру условного распределения, имеют более высокую условную плотность.</div></div></div>

---

<!-- S39 -->

<SectionChrome section="Вероятностный мост" />
# Нормальная плотность превращается в квадрат остатка
<MathBlock formula="p_\theta(y_i\mid x_i)=\frac1{\sqrt{2\pi\sigma^2}}\exp\left(-\frac{(y_i-f_\theta(x_i))^2}{2\sigma^2}\right)" class="text-center text-[27px]" />
<div class="sequence-list mt-5 text-[20px]"><div><span>1</span><div>В экспоненте находится квадрат остатка.</div></div><div><span>2</span><div><MathBlock formula="-\log p_\theta(y_i\mid x_i)=\frac12\log(2\pi\sigma^2)+\frac{(y_i-f_\theta(x_i))^2}{2\sigma^2}" class="text-[23px]" /></div></div><div><span>3</span><div><MathBlock formula="=C+\frac{r_i^2}{2\sigma^2}" class="text-[28px]" /></div></div></div>

---

<!-- S40 -->

<SectionChrome section="Вероятностный мост" />
# Maximum likelihood превращается в МНК
<div class="text-center mt-3"><MathBlock formula="-\log\mathcal L(\theta;D)=C+\frac1{2\sigma^2}\sum_{i=1}^n\bigl(y_i-f_\theta(x_i)\bigr)^2" class="text-[29px]" /></div>
<div class="text-center mt-10"><MathBlock formula="\hat\theta_{\rm MLE}\in\arg\min_\theta\sum_i\bigl(y_i-f_\theta(x_i)\bigr)^2" class="text-[34px]" /></div>
<div class="success-line text-center mt-8 text-[22px]">При предположении о нормальном шуме максимизация правдоподобия приводит к той же задаче минимизации суммы квадратов остатков — МНК.</div>
<div class="micro text-center mt-4">Масштаб шума фиксирован и одинаков для всех объектов. Деление на n не меняет минимум.</div>

<div class="micro text-center mt-4">Нормальная модель обосновывает MSE через правдоподобие; использовать MSE можно и без предположения о нормальности.</div>

---

<!-- S41 -->

<SectionChrome section="Вероятностный мост" />
# Нормальный шум → MSE; лапласовский шум → MAE
<div class="grid grid-cols-[1.08fr_0.92fr] gap-7 items-center mt-1"><img src="/assets/week-03/noise-density-loss.svg" alt="Плотности шума и соответствующие отрицательные логарифмы" class="figure h-[360px]" /><div><MathBlock formula="\varepsilon\mid X=x\sim\mathcal N(0,\sigma^2)\Longrightarrow-\log p(r)=C+\frac{r^2}{2\sigma^2}" class="text-[19px]" /><MathBlock formula="p(r)=\frac1{2b}e^{-|r|/b}" class="mt-5 text-[22px]" /><MathBlock formula="-\log p(r)=\log(2b)+\frac{|r|}{b}" class="mt-4 text-[21px]" /><div class="success-line mt-5 text-[18px]">Более тяжёлые хвосты дают медленнее растущий штраф за крупные отклонения.</div></div></div>
<div class="formula-box mt-3 px-5 py-3"><MathBlock formula="\boxed{\hat\theta_{\rm MLE}\in\arg\min_\theta\sum_{i=1}^n|y_i-f_\theta(x_i)|}" class="text-center text-[27px]" /></div>

<div class="micro text-center mt-3">Распределения ошибок заданы при фиксированных признаках; масштабы σ и b фиксированы и одинаковы для всех объектов.</div>

---

<!-- S42 -->

<SectionChrome section="Вероятностный мост" />
# Что дал вероятностный взгляд
<div class="sequence-list mt-3 text-[19px]"><div><span>1</span><div>Задаём условную плотность.<MathBlock formula="p_\theta(y\mid x)" class="mt-1 text-[21px]" /></div></div><div><span>2</span><div>MLE выбирает параметры, при которых обучающая выборка наиболее правдоподобна.</div></div><div><span>3</span><div>Логарифм превращает произведение плотностей в сумму.</div></div><div><span>4</span><div>NLL превращает сумму в минимизируемый критерий; его слагаемые становятся функциями потерь.</div></div><div><span>5</span><div><MathBlock formula="\mathcal N\to MSE,\qquad Laplace\to MAE" class="text-[24px]" /></div></div></div>
<div class="success-line text-center mt-7">Функцию потерь можно мотивировать прикладной ценой ошибок или вероятностной моделью данных.</div>

---

<!-- S43 -->

<SectionChrome section="Как минимизируем" />
# arg min задаёт цель, но не способ вычисления
<div class="text-center mt-6"><MathBlock formula="\hat\theta\in\arg\min_\theta R_n(\theta)" class="text-[39px]" /></div>
<div class="grid grid-cols-2 gap-12 mt-12"><div class="key-line">Запись говорит, <b>что</b> ищем: параметры с минимальным значением цели.</div><div class="warning-line">Она не говорит, <b>как</b> вычислить эти параметры.</div></div>
<div class="success-line text-center mt-12">Для МНК есть специальная структура задачи и специализированные методы решения; для произвольной целевой функции такого может не быть.</div>

---

<!-- S44 -->

<SectionChrome section="Как минимизируем" />
# Производная: локальный наклон
<div class="grid grid-cols-[0.82fr_1.18fr] gap-8 items-center mt-2"><div><MathBlock formula="f'(w)=\lim_{h\to0}\frac{f(w+h)-f(w)}h" class="text-center text-[31px]" /><div class="key-line mt-9">f′(w)&gt;0: движение вправо увеличивает функцию.</div><div class="warning-line mt-6">f′(w)&lt;0: движение вправо уменьшает функцию.</div></div><img src="/assets/week-03/derivative-tangents.svg" alt="Касательные к функции в точках с отрицательной и положительной производной" class="figure h-[390px]" /></div>

---

<!-- S45 -->

<SectionChrome section="Как минимизируем" />
# При нескольких параметрах нужен градиент
<div class="grid grid-cols-2 gap-12 items-center mt-7"><div class="text-center"><MathBlock formula="\nabla f(\theta)=\begin{pmatrix}\partial f/\partial\theta_1\\\vdots\\\partial f/\partial\theta_d\end{pmatrix}" class="text-[34px]" /></div><div class="text-[27px]"><div class="key-line">Для дифференцируемой функции ненулевой градиент задаёт направление наискорейшего локального роста.</div><div class="success-line mt-10">Достаточно малый шаг против ненулевого градиента уменьшает функцию.</div><div class="micro mt-10">Доказательство через производную по направлению — в appendix.</div></div></div>

---

<!-- S46 -->

<SectionChrome section="Как минимизируем" />
# Градиент и линии уровня
<div class="grid grid-cols-[1.25fr_0.75fr] gap-8 items-center mt-2"><img src="/assets/week-03/gradient-geometry.svg" alt="Градиент, касательная и линии уровня" class="figure h-[420px]" /><div><MathBlock formula="f(\theta_1,\theta_2)=c" class="text-center text-[29px]" /><div class="key-line mt-8">Вдоль линии значение постоянно.</div><div class="key-line mt-6">Ненулевой градиент перпендикулярен гладкой линии уровня.</div><div class="success-line mt-6">Достаточно малый шаг против градиента уменьшает функцию.</div></div></div>

---

<!-- S47 -->

<SectionChrome section="Как минимизируем" />
# Ставим простейшую задачу минимизации
<div class="grid grid-cols-[0.72fr_1.28fr] gap-8 items-center mt-1"><div><MathBlock formula="\min_w f(w),\qquad f(w)=(w-3)^2" class="text-[29px]" /><MathBlock formula="w_0=0,\qquad f'(w)=2(w-3)" class="mt-7 text-[25px]" /><MathBlock formula="f'(0)=-6" class="mt-6 text-[31px]" /><div class="success-line mt-7">Производная отрицательна: небольшое увеличение w уменьшает f.</div></div><img src="/assets/week-03/gd-parabola.svg" alt="Шаги градиентного спуска на параболе" class="figure h-[400px]" /></div>

---

<!-- S48 -->

<SectionChrome section="Как минимизируем" />
# Первый шаг градиентного спуска руками
<div class="grid grid-cols-[0.78fr_1.22fr] gap-8 items-center mt-1"><div><MathBlock formula="\eta=0.1" class="text-center text-[34px]" /><MathBlock formula="w_1=w_0-\eta f'(w_0)=0.6" class="mt-8 text-[29px]" /><MathBlock formula="f'(0.6)=-4.8" class="mt-7" /><MathBlock formula="w_2=0.6-0.1(-4.8)=1.08" class="mt-5 text-[28px]" /></div><img src="/assets/week-03/gd-parabola.svg" alt="Последовательные шаги градиентного спуска" class="figure h-[400px]" /></div>
<div class="success-line text-center mt-2">После каждого перемещения локальный наклон вычисляется заново.</div>

---

<!-- S49 -->

<SectionChrome section="Как минимизируем" />
# Градиентный спуск: общий алгоритм
<div class="lead mt-4">Градиентный спуск — итеративный алгоритм минимизации: вычисляем градиент в текущей точке и смещаем параметры в противоположную сторону.</div>
<div class="text-center mt-9"><MathBlock formula="\boxed{\theta^{(t+1)}=\theta^{(t)}-\eta_t\nabla f\bigl(\theta^{(t)}\bigr)}" class="text-[39px]" /></div>
<div class="grid grid-cols-3 gap-8 mt-10 text-center"><div class="plain-label"><MathBlock formula="t" class="text-[26px]" /><div class="mt-2">номер итерации</div></div><div class="plain-label"><MathBlock formula="\theta^{(t)}" class="text-[26px]" /><div class="mt-2">текущие параметры</div></div><div class="plain-label"><MathBlock formula="\eta_t" class="text-[26px]" /><div class="mt-2">темп обучения</div></div></div>

<div class="plain-label mt-6 text-center"><MathBlock formula="\widetilde f=af,\ a>0\quad\Rightarrow\quad\nabla\widetilde f=a\nabla f" class="text-[23px]" /><div class="mt-2 text-[20px]">Минимум тот же; для тех же шагов темп обучения делим на a.</div></div>

---

<!-- S50 -->

<SectionChrome section="Как минимизируем" />
# Малый темп обучения
<div class="grid grid-cols-[0.72fr_1.28fr] gap-9 items-center mt-1"><div><MathBlock formula="f(w)=(w-3)^2" class="text-center text-[28px]" /><MathBlock formula="\eta=0.05" class="text-center text-[36px] mt-7" /><div class="key-line mt-7">Движение без перепрыгивания через минимум.</div><div class="warning-line mt-6">Очень медленное приближение.</div></div><img src="/assets/week-03/gd-learning-rate-slow.svg" alt="Медленное монотонное движение градиентного спуска при eta 0.05" class="figure h-[390px]" /></div>
<div class="micro text-center mt-3">Показанное значение темпа обучения относится к этой параболе; в другой задаче его масштаб будет другим.</div>

---

<!-- S51 -->

<SectionChrome section="Как минимизируем" />
# Два сходящихся режима движения
<div class="grid grid-cols-[0.74fr_1.26fr] gap-8 items-center mt-1"><div><MathBlock formula="f(w)=(w-3)^2" class="text-center text-[25px]" /><MathBlock formula="\eta=0.25" class="text-center text-[31px] mt-6" /><div class="key-line mt-4">Быстрое монотонное приближение.</div><MathBlock formula="\eta=0.7" class="text-center text-[31px] mt-7" /><div class="warning-line mt-4">Сходящиеся колебания.</div></div><img src="/assets/week-03/gd-learning-rate-convergent.svg" alt="Монотонная и колебательная сходящиеся траектории градиентного спуска" class="figure h-[365px]" /></div>
<div class="micro text-center mt-3">Показанные значения темпа обучения относятся к этой параболе; в другой задаче их масштаб будет другим.</div>

---

<!-- S52 -->

<SectionChrome section="Как минимизируем" />
# Вечное перепрыгивание и расходимость
<div class="grid grid-cols-[0.74fr_1.26fr] gap-8 items-center mt-1"><div><MathBlock formula="f(w)=(w-3)^2" class="text-center text-[25px]" /><MathBlock formula="\eta=1" class="text-center text-[31px] mt-6" /><div class="key-line mt-4">Расстояние до минимума не уменьшается.</div><MathBlock formula="\eta=1.02" class="text-center text-[31px] mt-7" /><div class="warning-line mt-4">Расстояние растёт, итерации расходятся.</div></div><img src="/assets/week-03/gd-learning-rate-divergent.svg" alt="Незатухающие перепрыгивания и расходящаяся траектория градиентного спуска" class="figure h-[365px]" /></div>
<div class="micro text-center mt-3">Показанные значения темпа обучения относятся к этой параболе; в другой задаче их масштаб будет другим.</div>

---

<!-- S53 -->

<SectionChrome section="Как минимизируем" />
# Невыпуклая функция: локальная информация имеет пределы
<div class="grid grid-cols-[1.25fr_0.75fr] gap-8 items-center mt-1"><img src="/assets/week-03/nonconvex-gd.svg" alt="Разные траектории градиентного спуска на невыпуклой функции" class="figure h-[430px]" /><div><MathBlock formula="\ell(x)=(x^2-1)^2+0.9x" class="text-center text-[25px]" /><div class="success-line mt-10">Разные старты могут привести к разным локальным минимумам.</div><div class="micro mt-8">Градиент использует локальную информацию.</div></div></div>

---

<!-- S54 -->

<SectionChrome section="Как минимизируем" />
# Поверхность и карта линий уровня
<div class="text-center"><MathBlock formula="f(w_1,w_2)=(w_1-0.6)^2+3(w_2+0.4)^2" class="text-[28px]" /></div>
<img src="/assets/week-03/surface-contours-gd.svg" alt="Одна траектория на поверхности и карте линий уровня" class="figure h-[345px] mt-1" />
<div class="grid grid-cols-3 gap-7 text-center text-[17px]"><div class="key-line">3D-график показывает значение функции как третью координату.</div><div class="key-line">Линии уровня задают множества одинаковых значений функции в плоскости параметров.</div><div class="success-line"><div>Одни и те же точки</div><MathBlock formula="(w_1^{(t)},w_2^{(t)})" class="my-1 text-[18px]" /><div>нанесены слева на 3D-график функции, справа — на карту её линий уровня.</div></div></div>

---

<!-- S55 -->

<SectionChrome section="Как минимизируем" />
# Градиентный спуск итеративный: когда остановиться?
<div class="lead">Условия остановки сами по себе не гарантируют нахождение минимума.</div>
<div class="grid grid-cols-2 gap-x-10 gap-y-8 mt-8"><div class="plain-label"><b>Лимит итераций</b><MathBlock formula="t=T" class="mt-3" /></div><div class="plain-label"><b>Малое изменение цели</b><MathBlock formula="|f(\theta^{(t+1)})-f(\theta^{(t)})|<\varepsilon" class="mt-3 text-[20px]" /></div><div class="plain-label"><b>Малый градиент</b><MathBlock formula="\|\nabla f(\theta^{(t)})\|_2<\varepsilon" class="mt-3 text-[22px]" /></div><div class="plain-label"><b>Малый шаг параметров</b><MathBlock formula="\|\theta^{(t+1)}-\theta^{(t)}\|_2<\varepsilon" class="mt-3 text-[21px]" /></div></div>
<div class="plain-label mt-5 text-center"><MathBlock formula="f(w)=(w-3)^2,\quad\eta=1:\quad 0\leftrightarrow6,\quad f=9" class="text-[23px]" /><div class="mt-2 text-[20px]">Значение функции не меняется, но сходимости к минимуму нет.</div></div>
<div class="micro text-center mt-4">Ранняя остановка по validation — отдельная идея.</div>

---

<!-- S56 -->

<SectionChrome section="Как минимизируем" />
# Выпуклость: локальный минимум глобален
<div class="grid grid-cols-[0.92fr_1.08fr] gap-8 items-center mt-1"><img src="/assets/week-03/convexity-minima.svg" alt="Выпуклая функция с хордой и пример невыпуклой функции" class="figure h-[365px]" /><div><MathBlock formula="f(\lambda x+(1-\lambda)y)\le\lambda f(x)+(1-\lambda)f(y),\quad0\le\lambda\le1" class="text-[21px]" /><div class="key-line mt-5"><MathBlock formula="\lambda f(x)+(1-\lambda)f(y)" :display="false" class="inline-block text-[18px]" /> — координата по вертикали соответствующей точки на отрезке, соединяющем <MathBlock formula="(x,f(x))" :display="false" class="inline-block text-[18px]" /> и <MathBlock formula="(y,f(y))" :display="false" class="inline-block text-[18px]" />.</div><div class="plain-label mt-5"><MathBlock formula="f(x)=x^2,\quad x=-1,\quad y=1,\quad\lambda=\frac12" class="text-[19px]" /><MathBlock formula="z=\lambda x+(1-\lambda)y=0,\qquad f(z)=0" class="mt-3 text-[19px]" /><MathBlock formula="\frac12f(-1)+\frac12f(1)=1,\qquad0\le1" class="mt-3 text-[19px]" /></div></div></div>
<div class="success-line text-center mt-2 text-[19px]">Следствие для оптимизации: у выпуклой функции любой локальный минимум является глобальным.</div>

---

<!-- S57 -->

<SectionChrome section="Как минимизируем" />
# Выпуклость не гарантирует единственность параметров
<div class="grid grid-cols-[0.76fr_1.24fr] gap-8 items-center mt-1"><div><MathBlock formula="x_2=x_1" class="text-center text-[31px]" /><MathBlock formula="\beta_1x_1+\beta_2x_2=(\beta_1+\beta_2)x_1" class="mt-7 text-[25px]" /><div class="success-line mt-9">У выпуклой функции любой локальный минимум глобален, но глобальный минимум может быть не единственным.</div><div class="warning-line mt-6">При дефиците ранга коэффициенты могут быть неидентифицируемы.</div></div><img src="/assets/week-03/rank-deficiency-minima.svg" alt="Множество минимумов при дефиците ранга" class="figure h-[405px]" /></div>

---

<!-- S58 -->

<SectionChrome section="Как минимизируем" />
# Оптимизация на train и качество на новых данных — разные задачи
<div class="grid grid-cols-2 gap-12 mt-8"><div class="math-column"><div class="section-label">обучение</div><MathBlock formula="\hat\theta\in\arg\min_\theta R_{\rm train}(\theta)" class="mt-9 text-[30px]" /></div><div class="math-column"><div class="section-label">оценивание</div><MathBlock formula="M_{\rm val/test}=M\bigl(y,\hat y(\hat\theta)\bigr)" class="mt-9 text-[28px]" /></div></div>
<div class="formula-box mt-12 px-8 py-5"><MathBlock formula="R_{\rm train}\downarrow\quad\not\Rightarrow\quad M_{\rm val/test}\text{ улучшается}" class="text-center text-[35px]" /></div>

---

<!-- S59 -->

<SectionChrome section="Как минимизируем" />
# Масштаб признаков меняет геометрию MSE
<div class="grid grid-cols-[1.2fr_0.8fr] gap-8 items-center mt-1"><img src="/assets/week-03/feature-scaling-mse.svg" alt="Линии уровня до и после стандартизации признаков" class="figure h-[420px]" /><div class="text-[19px]"><div class="key-line">Разные масштабы дают вытянутые линии уровня.</div><div class="warning-line mt-4">Один η трудно подобрать; траектория часто меняет направление и может сходиться медленно.</div><MathBlock formula="x'_j=\frac{x_j-\mu_j}{s_j}" class="mt-6 text-[25px]" /><div class="success-line mt-5">Стандартизация делает масштабы координат сопоставимее.</div><div class="micro mt-5">Средние и масштабы считаем на train и сохраняем для новых объектов. Постоянные столбцы не стандартизируем.</div></div></div>

<div class="micro text-center mt-2">Стандартизация не добавляет информацию и не устраняет мультиколлинеарность.</div>

---

<!-- S60 -->

<SectionChrome section="Как минимизируем" />
# Полный градиент: используем всю выборку
<div class="text-center mt-4"><MathBlock formula="R_n(\theta)=\frac1n\sum_iL_i(\theta)" class="text-[30px]" /><MathBlock formula="\nabla R_n(\theta)=\frac1n\sum_i\nabla L_i(\theta)" class="mt-7 text-[33px]" /></div>
<div class="grid grid-cols-3 gap-8 mt-12 text-center"><div class="plain-label">Все n объектов перед одним обновлением.</div><div class="plain-label">Точный градиент training objective.</div><div class="warning-line">Один шаг может быть дорогим.</div></div>

---

<!-- S61 -->

<SectionChrome section="Как минимизируем" />
# Mini-batch: более дешёвая оценка градиента
<div class="grid grid-cols-2 gap-12 items-center mt-8"><div><div class="plain-label mb-5">Mini-batch — небольшое подмножество обучающих объектов, выбранное для текущего шага.<MathBlock formula="B_t:\ \text{mini-batch},\qquad |B_t|:\ \text{число объектов}" class="mt-3 text-[18px]" /></div><MathBlock formula="g_t=\frac1{|B_t|}\sum_{i\in B_t}\nabla L_i(\theta^{(t)})" class="text-[27px]" /><MathBlock formula="\theta^{(t+1)}=\theta^{(t)}-\eta_tg_t" class="mt-6 text-[27px]" /></div><div><div class="success-line">Шаг дешевле, направление шумнее полного градиента.</div><MathBlock formula="\mathbb E[g_t\mid\theta^{(t)}]=\nabla R_n(\theta^{(t)})" class="mt-7 text-[22px]" /><div class="key-line mt-6 text-[19px]">На каждом шаге выбираем новый мини-батч равномерно из всей выборки, независимо от предыдущих выборов. Среднее по таким оценкам равно полному градиенту.</div></div></div>

---

<!-- S62 -->

<SectionChrome section="Как минимизируем" />
# SGD: mini-batch размера 1
<div class="grid grid-cols-[0.72fr_1.28fr] gap-8 items-center mt-1"><div><div class="lead"><b>SGD = Stochastic Gradient Descent</b></div><MathBlock formula="|B_t|=1" class="text-center mt-9 text-[38px]" /><div class="success-line mt-9">Меняется способ оценить градиент.</div><div class="key-line mt-6">Модель и целевая функция остаются теми же.</div></div><img src="/assets/week-03/gd-vs-sgd.svg" alt="Траектории полного градиента, mini-batch и SGD" class="figure h-[410px]" /></div>

<div class="micro text-center mt-3">При постоянном шаге и сохраняющемся шуме возможны колебания около решения, а не точная сходимость.</div>

---

<!-- S63 -->

<SectionChrome section="Сборка на линейной регрессии" />
# Возвращаемся к линейной регрессии

<div class="grid grid-cols-3 gap-8 mt-16 text-center">
  <div class="plain-label"><div class="micro mb-5">ПРОГНОЗЫ ПРИ ПОДБОРЕ</div><MathBlock formula="X\beta" class="text-[36px]" /></div>
  <div class="plain-label"><div class="micro mb-5">ОСТАТКИ</div><MathBlock formula="r(\beta)=y-X\beta" class="text-[31px]" /></div>
  <div class="plain-label"><div class="micro mb-5">ЭМПИРИЧЕСКИЙ РИСК</div><MathBlock formula="R(\beta)=\frac1n\|y-X\beta\|_2^2" class="text-[28px]" /></div>
</div>

<div class="text-center mt-6"><MathBlock formula="\text{После обучения: }\hat y=X\hat\beta" class="text-[26px]" /></div>
<div class="success-line text-center mt-7">Теперь выведем градиент MSE по коэффициентам линейной модели.</div>

---

<!-- S64 -->

<SectionChrome section="Сборка на линейной регрессии" />
# Что именно нужно продифференцировать

<div class="grid grid-cols-[1.15fr_0.85fr] gap-12 items-center mt-6">
  <div>
    <MathBlock formula="R(\beta)=\frac1n\sum_{i=1}^n r_i(\beta)^2" class="text-[31px]" />
    <MathBlock formula="r_i(\beta)=y_i-\sum_{k=1}^q x_{ik}\beta_k" class="mt-10 text-[29px]" />
    <div class="key-line mt-10 text-center">Нужна производная по одному выбранному коэффициенту βⱼ.</div>
  </div>
  <div class="space-y-5">
    <div class="plain-label"><b>i</b> — индекс объекта</div>
    <div class="plain-label"><b>j</b> — выбранный коэффициент</div>
    <div class="plain-label"><b>k</b> — индекс суммирования по коэффициентам</div>
  </div>
</div>

---

<!-- S65 -->

<SectionChrome section="Сборка на линейной регрессии" />
# Один объект: применяем цепное правило

<div class="mt-10 text-center">
  <MathBlock formula="\frac{\partial r_i}{\partial\beta_j}=-x_{ij}" class="text-[38px]" />
  <div class="text-[34px] text-slate-400 my-7">↓</div>
  <MathBlock formula="\frac{\partial r_i^2}{\partial\beta_j}=2r_i\frac{\partial r_i}{\partial\beta_j}=-2x_{ij}r_i" class="text-[36px]" />
</div>

<div class="success-line text-center mt-12">Вклад одного объекта в производную — значение признака, умноженное на текущий остаток.</div>

---

<!-- S66 -->

<SectionChrome section="Сборка на линейной регрессии" />
# Суммируем вклады всех объектов

<div class="mt-10 text-center">
  <MathBlock formula="\frac{\partial R}{\partial\beta_j}=\frac1n\sum_{i=1}^n\frac{\partial r_i^2}{\partial\beta_j}" class="text-[34px]" />
  <div class="text-[34px] text-slate-400 my-8">↓</div>
  <div class="formula-box inline-block px-12 py-5">
    <MathBlock formula="\frac{\partial R}{\partial\beta_j}=-\frac2n\sum_{i=1}^n x_{ij}r_i" class="text-[39px]" />
  </div>
</div>

<div class="key-line text-center mt-12">Каждая координата градиента складывает такие вклады по всей обучающей выборке.</div>

---

<!-- S67 -->

<SectionChrome section="Сборка на линейной регрессии" />
# Все координаты собираются в $X^\top r$

<div class="grid grid-cols-[0.9fr_1.1fr] gap-12 items-center mt-1">
  <MathBlock formula="X^\top r=\begin{pmatrix}\sum_i x_{i1}r_i\\ \vdots\\ \sum_i x_{iq}r_i\end{pmatrix}" class="text-[29px]" />
  <div>
    <div class="formula-box px-6 py-5"><MathBlock formula="\nabla_\beta R(\beta)=-\frac2nX^\top(y-X\beta)" class="text-[31px]" /></div>
    <div class="mt-9 space-y-4 text-[22px]">
      <MathBlock formula="X^\top\in\mathbb R^{q\times n}" />
      <MathBlock formula="r\in\mathbb R^n" />
      <MathBlock formula="X^\top r\in\mathbb R^q" />
    </div>
  </div>
</div>

---

<!-- S68 -->

<SectionChrome section="Сборка на линейной регрессии" />
# Один шаг GD для линейной регрессии

<div class="formula-box mt-5 px-8 py-5">
  <MathBlock formula="\beta^{(t+1)}=\beta^{(t)}+\frac{2\eta}{n}X^\top\bigl(y-X\beta^{(t)}\bigr)" class="text-[35px]" />
</div>

<div class="grid grid-cols-4 gap-5 mt-11 text-center">
  <div class="plain-label"><div class="step-number">1</div><b>Прогнозы</b><MathBlock formula="X\beta^{(t)}" class="mt-4" /></div>
  <div class="plain-label"><div class="step-number">2</div><b>Остатки</b><MathBlock formula="y-X\beta^{(t)}" class="mt-4 text-[19px]" /></div>
  <div class="plain-label"><div class="step-number">3</div><b>Направление</b><MathBlock formula="X^\top r" class="mt-4" /></div>
  <div class="plain-label"><div class="step-number">4</div><b>Новые параметры</b><MathBlock formula="\beta^{(t+1)}" class="mt-4" /></div>
</div>

<div class="micro text-center mt-7">В общем правиле стоит минус; градиент MSE уже содержит минус, поэтому здесь появляется плюс.</div>

---

<!-- S69 -->

<SectionChrome section="Сборка на линейной регрессии" />
# Та же задача МНК, другой способ решения

<div class="grid grid-cols-[1.18fr_0.82fr] gap-9 items-center mt-1">
  <img src="/assets/week-03/linear-regression-gd.svg" alt="Последовательные приближения градиентного спуска к решению МНК" class="figure h-[420px]" />
  <div>
    <MathBlock formula="\min_\beta\frac1n\|y-X\beta\|_2^2" class="text-[30px]" />
    <div class="plain-label mt-8"><b>lstsq</b><br/>специализированный численный решатель задачи наименьших квадратов</div>
    <div class="plain-label mt-5"><b>Градиентный спуск</b><br/>приближается к тому же минимуму последовательностью шагов</div>
  </div>
</div>

<div class="success-line text-center mt-2">Меняется способ поиска коэффициентов, а не модель и не целевая функция MSE.</div>

---

<!-- S70 -->

<SectionChrome section="Сборка на линейной регрессии" />
# Нулевой градиент возвращает знакомое условие

<div class="mt-16 text-center">
  <MathBlock formula="\nabla R(\hat\beta)=0" class="text-[36px]" />
  <div class="text-[34px] text-slate-400 my-5">↓</div>
  <MathBlock formula="X^\top(y-X\hat\beta)=0" class="text-[38px]" />
  <div class="text-[34px] text-slate-400 my-5">↓</div>
  <div class="formula-box inline-block px-12 py-5"><MathBlock formula="X^\top X\hat\beta=X^\top y" class="text-[40px]" /></div>
</div>

<div class="success-line text-center mt-10">Градиент и ортогональность остатков приводят к тем же нормальным уравнениям.</div>

---

<!-- S71 -->

<SectionChrome section="Сборка на линейной регрессии" />
# Одна модель — разные функции потерь и способы оптимизации

<table class="comparison-table mt-8 text-[21px]">
  <thead><tr><th>Модель</th><th>Функция потерь</th><th>Способ поиска параметров</th></tr></thead>
  <tbody>
    <tr><td>линейная</td><td>MSE</td><td>lstsq / аналитический МНК</td></tr>
    <tr><td>линейная</td><td>MSE</td><td>градиентный спуск</td></tr>
    <tr><td>линейная</td><td>MAE</td><td>специализированный метод негладкой оптимизации</td></tr>
    <tr><td>линейная</td><td>Huber</td><td>градиентные методы</td></tr>
  </tbody>
</table>

<div class="micro text-center mt-8">Нормальные уравнения характеризуют оптимум; lstsq — практический численный решатель.</div>

---

<!-- S72 -->

<SectionChrome section="Сборка на линейной регрессии" />
# Что теперь происходит внутри `fit` — и после него

<div class="final-role-flow mt-5">
  <div>модель</div><b>+</b><div>функция потерь</div><b>+</b><div>оптимизатор</div><b>→</b><div class="result"><MathBlock formula="\hat\theta" /></div>
</div>

<div class="final-role-flow secondary mt-7">
  <div><MathBlock formula="\hat\theta+\text{данные для оценки}" class="text-[20px]" /></div><b>→</b><div class="result">метрика</div>
</div>

<div class="grid grid-cols-2 gap-x-10 gap-y-4 mt-9 text-[20px]">
  <div>• Функция потерь задаёт, какие ошибки считаются дорогими.</div>
  <div>• Оптимизатор ищет параметры по целевой функции на train.</div>
  <div>• Поведение GD зависит от геометрии, темпа обучения, масштаба и старта.</div>
  <div>• Хороший минимум на train не гарантирует качество на новых данных.</div>
</div>

---

<!-- A01 -->

<SectionChrome section="Резерв" />
# Производная по направлению и линии уровня

<div class="grid grid-cols-2 gap-12 items-center mt-8">
  <div class="plain-label text-center">
    <div class="micro mb-7">ИЗМЕНЕНИЕ В НАПРАВЛЕНИИ <i>u</i></div>
    <MathBlock formula="D_u f(\theta)=\nabla f(\theta)^\top u" class="text-[33px]" />
    <div class="mt-8 flex items-center justify-center gap-2">
      <span>Для единичного u максимальный рост при</span>
      <MathBlock formula="u\parallel\nabla f" class="text-[22px]" />
    </div>
  </div>
  <div class="plain-label text-center">
    <div class="micro mb-7">КАСАТЕЛЬНАЯ К ЛИНИИ УРОВНЯ</div>
    <MathBlock formula="f(\gamma(s))=c" class="text-[29px]" />
    <MathBlock formula="\nabla f(\theta_0)^\top\gamma'(0)=0" class="mt-7 text-[29px]" />
    <div class="mt-8">Градиент перпендикулярен линии уровня.</div>
  </div>
</div>

<div class="micro text-center mt-6">Функция непрерывно дифференцируема в окрестности точки; градиент в ней ненулевой.</div>

---

<!-- A02 -->

<SectionChrome section="Резерв" />
# Student-t и тяжёлые хвосты

<div class="grid grid-cols-[1.25fr_0.75fr] gap-9 items-center mt-2">
  <img src="/assets/week-03/noise-density-loss.svg" alt="Плотности ошибок и соответствующие отрицательные логарифмические правдоподобия" class="figure h-[420px]" />
  <div>
    <div class="key-line">Тяжёлые хвосты делают крупные отклонения менее невероятными.</div>
    <div class="success-line mt-7">Соответствующая NLL растёт медленнее квадратичной.</div>
    <div class="micro mt-8">Эта функция потерь не выпукла на всей числовой прямой.</div>
  </div>
</div>

---

<!-- A03 -->

<SectionChrome section="Резерв" />
# Матричное дифференцирование MSE

<div class="mt-4 text-center">
  <MathBlock formula="R(\beta)=\frac1n(y-X\beta)^\top(y-X\beta)" class="text-[31px]" />
  <MathBlock formula="=\frac1n\left(y^\top y-2\beta^\top X^\top y+\beta^\top X^\top X\beta\right)" class="mt-8 text-[28px]" />
  <div class="text-[32px] text-slate-400 my-6">↓</div>
  <MathBlock formula="\nabla_\beta R(\beta)=\frac2n(X^\top X\beta-X^\top y)=-\frac2nX^\top(y-X\beta)" class="text-[31px]" />
</div>

<div class="success-line text-center mt-10">Это тот же градиент, который получили покоординатно на основных слайдах.</div>
