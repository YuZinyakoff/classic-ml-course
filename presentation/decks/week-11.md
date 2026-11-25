---
theme: default
title: "Смещение, разброс и ансамбли: от нестабильного дерева к случайному лесу"
author: НИУ ВШЭ
info: Неделя 11 · Смещение, разброс и ансамбли
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
  class: week11
duration: 90min
exportFilename: week-11-bias-variance-ensembles-v4
download: false
---

<!-- S01 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Смещение, разброс и ансамбли" cover />
<div class="w11-body ">
<div class="w11-cover-sub">От нестабильного дерева к случайному лесу</div>
</div>

---
title: "Почему дерево меняется?"
clicks: 1
---

<!-- S02 -->
<WeekElevenHeader section="Смещение, разброс и шум" part="1" title="Почему дерево меняется?" />
<div class="w11-body ">
<div class="w11-lead">Повторим обучение регрессионного дерева.</div><div class="w11-grid w11-top"><div class="w11-rail"><b>Фиксируем</b><div>Распределение данных, число наблюдений, алгоритм и ограничение глубины: не больше 7.</div></div><div class="w11-rail"><b>Меняем</b><div>Конкретную обучающую выборку: в неё попадают другие объекты и другие значения ответа.</div></div></div><div v-click="1" class="w11-reveal"><div class="w11-flow"><div>Иные оценки качества порогов</div><b aria-hidden="true">→</b><div>Иные группы в дочерних узлах</div><b aria-hidden="true">→</b><div>Иные средние в листьях</div></div></div>
</div>



---
title: "Семь деревьев на независимых выборках"
clicks: 1
---

<!-- S03 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Семь деревьев на независимых выборках" />
<div class="w11-body ">
<div class="w11-grid w11-wide"><div class="w11-figure" style="--fig-h:455px"><div class="w11-image"><img src="/assets/week-11/01_repeated_trees-left.png" alt="Семь прогнозов и истинная зависимость" /><span aria-hidden="true" v-click="1" class="w11-rule" style="left:84.7%;top:10%;height:74%"></span></div></div><div class="w11-stack"><div class="w11-text">По горизонтали — признак x, по вертикали — прогноз.</div><div class="w11-text">Чёрная кривая — известное в эксперименте условное среднее. Каждая цветная ступень — постоянный прогноз листа.</div><div v-click="1" class="w11-reveal"><div class="w11-result">Около x₀ = 0,75 прогнозы сильно различаются. В других точках они могут быть близки.</div></div></div></div>
</div>

---
title: "Средний прогноз 48 деревьев"
---

<!-- S04 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Средний прогноз 48 деревьев" />
<div class="w11-body ">
<div class="w11-grid w11-wide"><div class="w11-figure" style="--fig-h:455px"><div class="w11-image"><img src="/assets/week-11/01_repeated_trees-right.png" alt="48 прогнозов; оранжевая линия — их среднее" /></div></div><div class="w11-stack"><div class="w11-text">Голубые линии — отдельные деревья. Оранжевая — среднее в каждой точке.</div><MathBlock formula="\bar f_{48}(x)=\frac1{48}\sum_{j=1}^{48}\hat f_{D_j}(x)" class="w11-compact-math" /><div class="w11-result">Среднее меняется плавнее, но у правого края остаётся ниже чёрной линии.</div></div></div><div class="w11-small">Здесь 48 выборок собраны независимо из одного распределения.</div>
</div>

---
title: "Процедура обучения и модель"
---

<!-- S05 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Процедура обучения и модель" />
<div class="w11-body ">
<div class="w11-text">Из совместного распределения P признаков и ответов получаем n независимых одинаково распределённых наблюдений:</div><MathBlock formula="D=\{(X_i,Y_i)\}_{i=1}^n,\qquad (X_i,Y_i)\overset{\mathrm{iid}}{\sim}P." /><div class="w11-flow"><div>Выборка <MathBlock formula="D_j" class="w11-inline" :display="false" /></div><b aria-hidden="true">→</b><div>Одна процедура <MathBlock formula="A" class="w11-inline" :display="false" /></div><b aria-hidden="true">→</b><div>Модель <MathBlock formula="\hat f_{D_j}=A(D_j)" class="w11-inline" :display="false" /></div></div><div class="w11-result">Алгоритм и гиперпараметры фиксированы. При заданной D считаем процедуру A детерминированной.</div>
</div>

---
title: "Один объект, много возможных прогнозов"
clicks: 1
---

<!-- S06 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Один объект, много возможных прогнозов" />
<div class="w11-body ">
<div class="w11-text">Фиксируем один вектор признаков x₀ и подаём его всем моделям. Индекс D у модели указывает, на какой выборке она обучена.</div><div class="w11-flow"><div>Модель на D₁ получает x₀</div><div>Модель на D₂ получает x₀</div><div>Модель на D₃ получает x₀</div></div><MathBlock formula="\hat f_{D_1}(x_0),\qquad\hat f_{D_2}(x_0),\qquad\hat f_{D_3}(x_0),\quad\ldots" /><div v-click="1" class="w11-reveal"><div class="w11-result">При фиксированном x₀ меняется обучающая выборка D, поэтому прогноз <MathBlock formula="\hat f_D(x_0)" class="w11-inline" :display="false" /> случаен. Разброс может быть неодинаковым в разных точках.</div></div>
</div>

---
title: "От прогнозов к ошибке"
---

<!-- S07 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="От прогнозов к ошибке" />
<div class="w11-body w11-v3 ">
<div class="w11-text">При повторном обучении получаем разные прогнозы для одного набора признаков <MathBlock formula="x_0" class="w11-inline" :display="false" />.</div>
<div class="w11-text">Чтобы оценить качество, нужно сравнить прогноз с фактическим ответом нового объекта.</div>
<div class="w11-question"><strong>Вопрос:</strong> если признаки известны точно, всегда ли можно точно предсказать ответ?</div>
</div>

---
title: "Условное распределение ответа"
clicks: 1
---

<!-- S08 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Условное распределение ответа" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-text">Прогнозируем месячный расход электроэнергии по площади дома и числу жильцов. При одинаковых признаках <MathBlock formula="x_0" class="w11-inline" :display="false" /> расход может различаться из-за отопления и бытовых приборов.</div>
<div class="w11-note">В учебном примере зададим условное распределение ответа: при <MathBlock formula="X=x_0" class="w11-inline" :display="false" /> возможны три значения с одинаковыми вероятностями.</div>
<svg class="w11-mini-bars" viewBox="0 0 690 216" role="img" aria-label="200, 300 и 400 кВт·ч, каждое значение с вероятностью одна треть"><path d="M107 28V149H620M107 45H620" stroke="#9cb1cf" stroke-width="2" fill="none"/><text x="99" y="52" text-anchor="end">1/3</text><text x="99" y="156" text-anchor="end">0</text><text x="108" y="23" text-anchor="start">Вероятность</text><text x="620" y="204" text-anchor="end">Расход, кВт·ч</text><rect x="169" y="45" width="50" height="104" rx="3" fill="#3268c8"/><text x="194" y="172" text-anchor="middle">200</text><rect x="326" y="45" width="50" height="104" rx="3" fill="#3268c8"/><text x="351" y="172" text-anchor="middle">300</text><rect x="483" y="45" width="50" height="104" rx="3" fill="#3268c8"/><text x="508" y="172" text-anchor="middle">400</text></svg>
<div v-click="1" class="w11-reveal "><div class="w11-note">Из лекции 2: при квадратичной ошибке оптимальный прогноз — условное среднее.</div><MathBlock formula="m(x)=\mathbb E[Y\mid X=x],\qquad m(x_0)=\frac{200+300+400}{3}=300." /></div>
</div>

---
title: "Отклонение ответа от условного среднего"
clicks: 1
---

<!-- S09 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Отклонение ответа от условного среднего" />
<div class="w11-body w11-v3 ">
<div class="w11-text">Определим случайную величину <MathBlock formula="\varepsilon" class="w11-inline" :display="false" /> — отклонение фактического ответа от условного среднего:</div>
<div class="w11-theorem"><MathBlock formula="\varepsilon=Y-m(X),\qquad Y=m(X)+\varepsilon." /></div>
<div v-click="1" class="w11-reveal "><div class="w11-note">При фиксированных признаках <MathBlock formula="X=x" class="w11-inline" :display="false" />:</div><MathBlock formula="\begin{aligned} \mathbb E[\varepsilon\mid X=x] &amp;=\mathbb E[Y\mid X=x]-m(x)\\ &amp;=0. \end{aligned}" /><div class="w11-insight">Нулевое условное среднее следует из определения <MathBlock formula="\varepsilon" class="w11-inline" :display="false" /> и <MathBlock formula="m(x)" class="w11-inline" :display="false" />.</div></div>
</div>

---
title: "Неустранимый шум (irreducible error)"
clicks: 1
---

<!-- S10 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Неустранимый шум (irreducible error)" />
<div class="w11-body w11-v3 w11-dense w11-comp">
<div class="w11-note">Даже оптимальный прогноз <MathBlock formula="m(x)" class="w11-inline" :display="false" /> может отличаться от фактического ответа.</div>
<div class="w11-definition"><strong>Неустранимый шум</strong> — минимально достижимая ожидаемая квадратичная ошибка при заданных признаках:</div>
<MathBlock formula="\sigma^2(x)=\mathbb E[\varepsilon^2\mid X=x]=\operatorname{Var}(\varepsilon\mid X=x)=\operatorname{Var}(Y\mid X=x)." />
<div v-click="1" class="w11-reveal "><div class="w11-note">При <MathBlock formula="X=x_0" class="w11-inline" :display="false" />:</div><table class="w11-table "><thead><tr><th scope="col">Фактический ответ, кВт·ч</th><th scope="col">200</th><th scope="col">300</th><th scope="col">400</th></tr></thead><tbody><tr><td>Оптимальный прогноз</td><td>300</td><td>300</td><td>300</td></tr><tr><td>Отклонение <MathBlock formula="\varepsilon" class="w11-inline" :display="false" /></td><td>−100</td><td>0</td><td>100</td></tr></tbody></table><MathBlock formula="\sigma^2(x_0)=\frac{(-100)^2+0^2+100^2}{3}=\frac{20\,000}{3}\;(\text{кВт·ч})^2." /><div class="w11-insight"><strong>Вывод:</strong> даже точное знание <MathBlock formula="m(x_0)" class="w11-inline" :display="false" /> не устраняет колебания ответа.</div></div>
</div>

---
title: "От чего зависит неустранимый шум?"
clicks: 1
---

<!-- S11 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="От чего зависит неустранимый шум?" />
<div class="w11-body w11-v3 ">
<div class="w11-note">При неизменном распределении данных и наборе признаков:</div>
<table class="w11-table "><thead><tr><th scope="col">Изменение</th><th scope="col">Неустранимый шум</th></tr></thead><tbody><tr><td>Дерево вместо kNN</td><td>Тот же</td></tr><tr><td>Увеличили глубину дерева</td><td>Тот же</td></tr><tr><td>Собрали больше обучающих наблюдений</td><td>Тот же</td></tr></tbody></table>
<div v-click="1" class="w11-reveal "><div class="w11-text">Если добавить информацию о типе отопления, часть различий между домами может стать предсказуемой. Минимально достижимая MSE может уменьшиться <strong>в среднем по объектам</strong>.</div><div class="w11-insight"><strong>Итог:</strong> неустранимый шум задаёт предел качества при доступной информации. Теперь исследуем ошибки, связанные с обучением модели.</div></div>
</div>

---
title: "Средний прогноз процедуры"
clicks: 1
---

<!-- S12 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Средний прогноз процедуры" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-text">Фиксируем <MathBlock formula="x_0" class="w11-inline" :display="false" /> и независимо повторяем обучение одной процедуры на <MathBlock formula="D_1,\ldots,D_M" class="w11-inline" :display="false" />.</div>
<div class="w11-grid w11-top"><div class="w11-rail"><div class="w11-note"><strong>Среднее полученных прогнозов</strong></div><MathBlock formula="\bar f_M(x_0)=\frac1M\sum_{j=1}^{M}\hat f_{D_j}(x_0)." class="w11-main-math" /></div><div v-click="1" class="w11-reveal "><div class="w11-rail"><div class="w11-note"><strong>Теоретический средний прогноз</strong> по возможным обучающим выборкам размера <MathBlock formula="n" class="w11-inline" :display="false" />:</div><MathBlock formula="\mu(x_0)=\mathbb E_D[\hat f_D(x_0)]." class="w11-main-math" /></div></div></div>
<div v-click="1" class="w11-reveal "><div class="w11-insight">По закону больших чисел <MathBlock formula="\bar f_M(x_0)\to\mu(x_0)" class="w11-inline" :display="false" /> при <MathBlock formula="M\to\infty" class="w11-inline" :display="false" /> (при независимых одинаково распределённых повторах и конечном ожидании).</div><div class="w11-note">Оранжевая кривая в эксперименте с 48 деревьями — оценка <MathBlock formula="\mu(x)" class="w11-inline" :display="false" /> по 48 обученным моделям.</div></div>
</div>

---
title: "Два средних при фиксированных признаках"
---

<!-- S13 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Два средних при фиксированных признаках" />
<div class="w11-body w11-v3 ">
<table class="w11-table w11-pair-table"><thead><tr><th scope="col">Истинное условное среднее ответа</th><th scope="col">Средний прогноз процедуры</th></tr></thead><tbody><tr><td><MathBlock formula="m(x_0)=\mathbb E[Y\mid X=x_0]" class="w11-inline" :display="false" /></td><td><MathBlock formula="\mu(x_0)=\mathbb E_D[\hat f_D(x_0)]" class="w11-inline" :display="false" /></td></tr><tr><td>Математическое ожидание ответа при заданных признаках <MathBlock formula="x_0" class="w11-inline" :display="false" />.</td><td>Усредняем прогнозы моделей, обученных на разных <MathBlock formula="D" class="w11-inline" :display="false" />, для тех же признаков.</td></tr><tr class="w11-big-values"><td>В примере: 300 кВт·ч</td><td>Допустим, 280 кВт·ч</td></tr></tbody></table>
<div class="w11-insight">Процедура в среднем занижает прогноз на 20 кВт·ч. Это систематическая составляющая её ошибки.</div>
</div>



---
title: "Смещение (bias) и разброс (variance)"
clicks: 1
---

<!-- S14 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Смещение (bias) и разброс (variance)" />
<div class="w11-body w11-v3 ">
<div class="w11-rail"><div class="w11-text"><strong>Смещение</strong> — разность между средним прогнозом процедуры и истинным условным средним:</div><MathBlock formula="\operatorname{Bias}(x_0)=\mu(x_0)-m(x_0)." /><div class="w11-note">Знак указывает, завышает или занижает процедура прогноз в среднем.</div></div>
<div v-click="1" class="w11-reveal "><div class="w11-rail"><div class="w11-text"><strong>Разброс</strong> — дисперсия прогноза при повторном обучении на разных выборках:</div><MathBlock formula="\operatorname{Var}_D(\hat f_D(x_0))=\mathbb E_D[(\hat f_D(x_0)-\mu(x_0))^2]." /><div class="w11-note">Он характеризует чувствительность прогноза к обучающей выборке.</div></div></div>
</div>

---
title: "Смещение и разброс в эксперименте"
clicks: 1
---

<!-- S15 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Смещение и разброс в эксперименте" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-note"><MathBlock formula="x_0=0{,}32" class="w11-inline" :display="false" />; 150 независимых обучений дерева. Горизонтальная ось — значение прогноза. Высота точек служит для разделения наложившихся точек.</div>
<div class="w11-figure" style="--fig-h:293px"><div class="w11-image"><img src="/assets/week-11/02_pointwise_bias_variance.png" alt="Прогнозы 150 деревьев, средние и полоса разброса" /></div></div>
<div v-click="1" class="w11-reveal "><div class="w11-repers "><div class="w11-note"><strong>Оценка смещения:</strong> разность между средним 150 прогнозов (оранжевая линия, ≈ 0,564) и истинным условным средним (чёрная линия, ≈ 0,534). Получаем приблизительно +0,030.</div><div class="w11-note"><strong>Разброс:</strong> ширина облака прогнозов. Затенённая полоса — эмпирическое среднее ± одно эмпирическое стандартное отклонение.</div></div></div>
</div>

---
title: "Мишень: центр группы и разброс"
---

<!-- S16 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Мишень: центр группы и разброс" />
<div class="w11-body w11-tiny-gap">
<div class="w11-grid w11-wide"><div class="w11-figure" style="--fig-h:392px"><div class="w11-image"><img src="/assets/week-11/10_target_metaphor.png" alt="Две мишени: плотная группа со смещением и рассеянная группа около центра" /></div></div><div class="w11-stack"><div class="w11-text">Центр — истинное среднее. Каждое попадание — прогноз после очередного обучения в одной точке.</div><div class="w11-small">Слева группа плотнее, но её центр смещён сильнее. Справа рассеяние больше, но центр группы ближе к цели.</div><div class="w11-result">Чтобы сравнить MSE, нужно учесть оба эффекта. В другой точке x соотношение может измениться.</div></div></div>
</div>

---
title: "Два источника случайности"
---

<!-- S17 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Два источника случайности" />
<div class="w11-body w11-v3 ">
<div class="w11-note">При фиксированных признаках <MathBlock formula="x_0" class="w11-inline" :display="false" />:</div>
<table class="w11-table w11-matrix-2"><thead><tr><th scope="col"></th><th scope="col">Новый ответ</th><th scope="col">Прогноз обученной модели</th></tr></thead><tbody><tr><th>Случайная величина</th><td><MathBlock formula="Y_0" class="w11-inline" :display="false" /> — ответ нового объекта</td><td><MathBlock formula="\hat f_D(x_0)" class="w11-inline" :display="false" /></td></tr><tr><th>Что меняется</th><td>Фактический ответ</td><td>Обучающая выборка <MathBlock formula="D" class="w11-inline" :display="false" /></td></tr><tr><th>Среднее</th><td><MathBlock formula="m(x_0)" class="w11-inline" :display="false" /></td><td><MathBlock formula="\mu(x_0)" class="w11-inline" :display="false" /></td></tr><tr><th>Дисперсия</th><td><MathBlock formula="\sigma^2(x_0)" class="w11-inline" :display="false" /></td><td><MathBlock formula="\operatorname{Var}_D(\hat f_D(x_0))" class="w11-inline" :display="false" /></td></tr></tbody></table>
<div class="w11-insight">Смещение связывает средние двух распределений: <MathBlock formula="\operatorname{Bias}(x_0)=\mu(x_0)-m(x_0)" class="w11-inline" :display="false" />.</div>
</div>

---
title: "Постановка задачи: ожидаемая ошибка процедуры"
---

<!-- S18 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Постановка задачи: ожидаемая ошибка процедуры" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-note">Обучаем модель на выборке <MathBlock formula="D" class="w11-inline" :display="false" /> и проверяем прогноз на новом наблюдении <MathBlock formula="(X_0,Y_0)" class="w11-inline" :display="false" />, независимом от <MathBlock formula="D" class="w11-inline" :display="false" />. Фиксируем <MathBlock formula="X_0=x_0" class="w11-inline" :display="false" />.</div>
<div class="w11-risk-flow"><div><div class="w11-box"><MathBlock formula="D\to A(D)\to\hat f_D(x_0)" class="w11-inline" :display="false" /></div><div class="w11-box">Новый ответ <MathBlock formula="Y_0" class="w11-inline" :display="false" /></div></div><svg viewBox="0 0 90 76" aria-hidden="true"><path d="M2 19H41V57H2M41 38H85M77 31L85 38L77 45" stroke="#7192c3" stroke-width="2" fill="none"/></svg><div class="w11-aggr"><MathBlock formula="(Y_0-\hat f_D(x_0))^2" class="w11-inline" :display="false" /></div></div>
<MathBlock formula="R(x_0)=\mathbb E_{D,Y_0}[(Y_0-\hat f_D(x_0))^2\mid X_0=x_0]." />
<div class="w11-note">Качество модели зависит от того, какая обучающая выборка нам досталась. Поточечный риск <MathBlock formula="R(x_0)" class="w11-inline" :display="false" /> характеризует ожидаемую квадратичную ошибку процедуры по возможным выборкам и новым ответам при одних и тех же признаках <MathBlock formula="x_0" class="w11-inline" :display="false" />.</div>
<div class="w11-insight"><strong>Задача:</strong> выразить <MathBlock formula="R(x_0)" class="w11-inline" :display="false" /> через шум, смещение и разброс.</div>
<div class="w11-plan-strip"><strong>План вывода:</strong><span>1. Ошибка фиксированного прогноза.</span><span>2. Учёт случайности обучающей выборки.</span><span>3. Выделение смещения и разброса.</span></div>
<div class="w11-note">Предпосылки: конечные вторые моменты ответа и прогноза.</div>
</div>



---
title: "Шаг 1. Разложим ошибку фиксированного прогноза"
clicks: 1
---

<!-- S19 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Шаг 1. Разложим ошибку фиксированного прогноза" />
<div class="w11-body ">
<div class="w11-text">Сначала найдём ожидаемую ошибку произвольного числового прогноза <MathBlock formula="a" class="w11-inline" :display="false" /> для объекта с признаками <MathBlock formula="x_0" class="w11-inline" :display="false" />. Возьмём <MathBlock formula="m=m(x_0)" class="w11-inline" :display="false" /> за точку отсчёта.</div><MathBlock formula="Y_0-a=\underbrace{(Y_0-m)}_{\text{отклонение ответа}}+\underbrace{(m-a)}_{\text{отклонение от прогноза до }m}." class="w11-main-math" /><div v-click="1" class="w11-reveal"><MathBlock formula="(Y_0-a)^2=(Y_0-m)^2+(m-a)^2+2(Y_0-m)(m-a)." /><div class="w11-small">Квадрат ошибки зависит от случайного ответа <MathBlock formula="Y_0" class="w11-inline" :display="false" />. Чтобы получить ожидаемую ошибку прогноза <MathBlock formula="a" class="w11-inline" :display="false" />, усредним по возможным ответам при <MathBlock formula="X_0=x_0" class="w11-inline" :display="false" />.</div></div>
</div>

---
title: "Ожидаемая ошибка фиксированного прогноза"
clicks: 2
---

<!-- S20 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Ожидаемая ошибка фиксированного прогноза" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-note">Усредняем квадрат ошибки по новым ответам при фиксированных <MathBlock formula="x_0" class="w11-inline" :display="false" /> и <MathBlock formula="a" class="w11-inline" :display="false" />. Здесь <MathBlock formula="m=m(x_0)" class="w11-inline" :display="false" />.</div>
<div class="w11-states"><div v-show="$clicks === 0"><MathBlock formula="\mathbb E[(Y_0-a)^2\mid X_0=x_0]" /></div><div v-show="$clicks >= 1"><MathBlock formula="\begin{aligned} \mathbb E[(Y_0-a)^2\mid X_0=x_0] &amp;=\underbrace{\mathbb E[(Y_0-m)^2\mid X_0=x_0]}_{\sigma^2(x_0)}+(m-a)^2\\ &amp;\quad+2(m-a)\underbrace{\mathbb E[Y_0-m\mid X_0=x_0]}_{0}. \end{aligned}" /></div></div>
<div v-click="1" class="w11-reveal"><MathBlock formula="\mathbb E[Y_0-m\mid X_0=x_0]=\mathbb E[Y_0\mid X_0=x_0]-m=m-m=0." /><div class="w11-note"><MathBlock formula="m-a" class="w11-inline" :display="false" /> постоянно, поэтому смешанное слагаемое равно нулю.</div></div>
<div v-click="2" class="w11-reveal "><div class="w11-theorem"><MathBlock formula="\boxed{\mathbb E[(Y_0-a)^2\mid X_0=x_0]=\sigma^2(x_0)+(m-a)^2.}" /></div><div class="w11-insight">Минимум достигается при <MathBlock formula="a=m" class="w11-inline" :display="false" />: остаётся только неустранимый шум.</div></div>
</div>

---
title: "Шаг 2. Прогноз при известной выборке"
---

<!-- S21 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Шаг 2. Прогноз при известной выборке" />
<div class="w11-body ">
<div class="w11-text">Теперь рассмотрим одну модель, уже обученную на выборке <MathBlock formula="D" class="w11-inline" :display="false" />. При фиксированных <MathBlock formula="D" class="w11-inline" :display="false" /> и <MathBlock formula="x_0" class="w11-inline" :display="false" /> её прогноз <MathBlock formula="\hat f_D(x_0)" class="w11-inline" :display="false" /> — известное число. К нему применим результат предыдущего шага.</div><MathBlock formula="\mathbb E[(Y_0-\hat f_D(x_0))^2\mid X_0=x_0,D]=\sigma^2(x_0)+(m-\hat f_D(x_0))^2." /><div class="w11-result">Новое наблюдение независимо от D. Поэтому при фиксированном x₀ распределение Y₀, его среднее m и шум остаются теми же при любой D.</div>
</div>



---
title: "Теперь усредним по выборкам"
clicks: 2
---

<!-- S22 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Теперь усредним по выборкам" />
<div class="w11-body w11-v3 ">
<div class="w11-text">Мы получили ожидаемую ошибку одной обученной модели. При другой обучающей выборке прогноз и его ожидаемая ошибка могли бы измениться. Чтобы оценить процедуру в целом, усредним полученную ошибку по возможным <MathBlock formula="D" class="w11-inline" :display="false" />.</div>
<div class="w11-derive"><MathBlock formula="R(x_0)=\underset{\text{по обучающим выборкам}}{\mathbb E_D}\!\left[\underbrace{\mathbb E[(Y_0-\hat f_D(x_0))^2\mid X_0=x_0,D]}_{\text{ожидаемая ошибка конкретной модели при }x_0}\right]" /><MathBlock formula="\begin{aligned}&amp;=\mathbb E_D[\sigma^2(x_0)+(m-\hat f_D(x_0))^2]\end{aligned}" v-click="1" /><MathBlock formula="\begin{aligned}&amp;=\sigma^2(x_0)+\mathbb E_D[(m-\hat f_D(x_0))^2].\end{aligned}" v-click="2" /></div>
<div v-click="2" class="w11-reveal"><div class="w11-insight">Мы отделили неустранимый шум. Оставшееся слагаемое измеряет квадраты отклонений обученных прогнозов от истинного среднего. Разделим его на квадрат систематического смещения и разброс.</div></div>
</div>

---
title: "Шаг 3. Отделим смещение от разброса"
clicks: 3
---

<!-- S23 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Шаг 3. Отделим смещение от разброса" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-note">Прогноз может отклоняться от <MathBlock formula="m" class="w11-inline" :display="false" /> из-за общего сдвига или из-за колебаний вокруг среднего прогноза. Сократим запись: <MathBlock formula="m=m(x_0)" class="w11-inline" :display="false" />, <MathBlock formula="\mu=\mu(x_0)" class="w11-inline" :display="false" />, <MathBlock formula="\hat f=\hat f_D(x_0)" class="w11-inline" :display="false" />.</div>
<MathBlock formula="m-\hat f=\underbrace{(m-\mu)}_{\text{систематический сдвиг}}+\underbrace{(\mu-\hat f)}_{\text{отклонение от среднего прогноза}}." v-click="1" />
<MathBlock formula="\begin{aligned} \mathbb E_D[(m-\hat f)^2] &amp;=(m-\mu)^2+\mathbb E_D[(\mu-\hat f)^2]\\ &amp;\quad+2(m-\mu)\mathbb E_D[\mu-\hat f]. \end{aligned}" v-click="2" />
<div v-click="3" class="w11-reveal "><div class="w11-note">По определению <MathBlock formula="\mu=\mathbb E_D[\hat f]" class="w11-inline" :display="false" />, поэтому <MathBlock formula="\mathbb E_D[\mu-\hat f]=0" class="w11-inline" :display="false" />.</div><MathBlock formula="\mathbb E_D[(m-\hat f)^2]=\underbrace{(m-\mu)^2}_{\text{квадрат смещения}}+\underbrace{\mathbb E_D[(\mu-\hat f)^2]}_{\text{разброс}}." /></div>
</div>



---
title: "Bias–variance decomposition"
---

<!-- S24 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Bias–variance decomposition" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-note">Разложение ожидаемой квадратичной ошибки:</div>
<div class="w11-theorem"><MathBlock formula="\boxed{R(x_0)=\sigma^2(x_0)+\operatorname{Bias}^2(x_0)+\operatorname{Var}_D(\hat f_D(x_0)).}" class="w11-main-math" /></div>
<table class="w11-table w11-pair-table"><thead><tr><th scope="col">Компонента</th><th scope="col">Смысл</th></tr></thead><tbody><tr><td><MathBlock formula="\sigma^2(x_0)=\operatorname{Var}(Y_0\mid X_0=x_0)" class="w11-inline" :display="false" /></td><td>Колебания фактического ответа при тех же признаках</td></tr><tr><td><MathBlock formula="\operatorname{Bias}^2(x_0)=(\mu(x_0)-m(x_0))^2" class="w11-inline" :display="false" /></td><td>Квадрат систематического сдвига среднего прогноза</td></tr><tr><td><MathBlock formula="\operatorname{Var}_D(\hat f_D(x_0))=\mathbb E_D[(\hat f_D(x_0)-\mu(x_0))^2]" class="w11-inline" :display="false" /></td><td>Колебания прогнозов при повторном обучении</td></tr></tbody></table>
<div class="w11-insight">При неизменной информации улучшение процедуры обучения связано с уменьшением суммы двух последних компонент.</div>
</div>

---
title: "Снижение разброса: что станет с поточечным риском?"
clicks: 1
---

<!-- S25 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Снижение разброса: что станет с поточечным риском?" />
<div class="w11-body">
<div class="w11-text">Условный пример в одной точке: m = 10, μ = 8, шум = 1. Исходное смещение равно −2. Пусть новая процедура даёт меньший разброс:</div>
<table class="w11-table"><thead><tr><th>Вариант</th><th>Шум</th><th>Смещение</th><th>Разброс</th><th>Риск <MathBlock formula="R(x_0)" class="w11-inline" :display="false" /></th></tr></thead><tbody><tr><td>Исходный</td><td>1</td><td>−2</td><td>3</td><td>1 + 4 + 3 = 8</td></tr><tr><td>Тот же средний прогноз</td><td>1</td><td>−2</td><td>1</td><td><span v-click="1">1 + 4 + 1 = 6</span></td></tr><tr><td>Средний прогноз упал до 7</td><td>1</td><td>−3</td><td>1</td><td><span v-click="1">1 + 9 + 1 = 11</span></td></tr></tbody></table>
<div v-click="1" class="w11-reveal"><div class="w11-result">При том же смещении снижение разброса помогает. Если процедура заодно увеличила квадрат смещения, поточечный риск может вырасти.</div></div>
</div>

---
title: "От одной точки к общему риску"
clicks: 1
---

<!-- S26 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="От одной точки к общему риску" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-note">До сих пор мы оценивали качество процедуры для фиксированных признаков <MathBlock formula="x_0" class="w11-inline" :display="false" />. В реальной задаче признаки новых объектов различаются. Общий риск учитывает, насколько часто встречаются разные значения признаков и какова ожидаемая ошибка при каждом из них.</div>
<table class="w11-table"><thead><tr><th scope="col">Вектор признаков</th><th scope="col">Вероятность</th><th scope="col">Поточечный риск (условный пример)</th></tr></thead><tbody><tr><td><MathBlock formula="x^{(1)}" class="w11-inline" :display="false" /></td><td>90%</td><td>4</td></tr><tr><td><MathBlock formula="x^{(2)}" class="w11-inline" :display="false" /></td><td>10%</td><td>20</td></tr></tbody></table>
<div class="w11-text">Общий риск: <MathBlock formula="0{,}9\cdot4+0{,}1\cdot20=5{,}6" class="w11-inline" :display="false" />.</div>
<div v-click="1" class="w11-reveal"><MathBlock formula="\begin{aligned}\mathcal R(A)&amp;=\mathbb E_{X_0}[R(X_0)]\\ &amp;=\mathbb E_{X_0}[\sigma^2(X_0)]+\mathbb E_{X_0}[\operatorname{Bias}^2(X_0)]+\mathbb E_{X_0}[\operatorname{Var}_D(\hat f_D(X_0))].\end{aligned}" /><div class="w11-insight">Разложение сохраняется для всей задачи: усредняем шум, квадрат смещения и разброс по распределению признаков.</div></div>
</div>



---
title: "Теоретический риск и проверочная ошибка"
---

<!-- S27 -->
<WeekElevenHeader section="Смещение, разброс и шум" title="Теоретический риск и проверочная ошибка" />
<div class="w11-body w11-v3 ">
<table class="w11-table w11-pair-table"><thead><tr><th scope="col">Теоретический риск процедуры <MathBlock formula="\mathcal R(A)" class="w11-inline" :display="false" /></th><th scope="col">Проверочная MSE</th></tr></thead><tbody><tr><td>Ожидаемая ошибка процедуры по возможным обучающим выборкам и новым объектам</td><td>Оценка ожидаемой ошибки конкретной обученной модели на независимых проверочных данных</td></tr></tbody></table>
<div class="w11-text">Из одной проверочной MSE нельзя непосредственно получить шум, квадрат смещения и разброс по отдельности.</div>
<div class="w11-insight"><strong>Итог блока:</strong> При заданной информации улучшение качества процедуры требует уменьшения суммы квадрата смещения и разброса. Рассмотрим, как на эти компоненты влияет гибкость модели.</div>
</div>



---
title: "Переобучение: вопрос из первой лекции"
---

<!-- S28 -->
<WeekElevenHeader section="Bias–variance trade-off" part="2" title="Переобучение: вопрос из первой лекции" />
<div class="w11-body ">
<div class="w11-grid w11-wide"><div class="w11-figure" style="--fig-h:424px"><div class="w11-image"><img src="/assets/week-01/complexity-errors.svg" alt="Ошибка на train и новых данных при увеличении гибкости" /></div></div><div class="w11-stack"><div class="w11-text">С ростом гибкости ошибка на train может снижаться, а ошибка на новых данных — снова расти.</div><div class="w11-lead">Какая часть ошибки могла вырасти?</div><div class="w11-small">Рисунок из лекции 1 · схематическая иллюстрация.</div></div></div>
</div>



---
title: "Что меняется при росте гибкости?"
---

<!-- S29 -->
<WeekElevenHeader section="Bias–variance trade-off" title="Что меняется при росте гибкости?" />
<div class="w11-body ">
<div class="w11-text">Фиксируем распределение, признаки, n и квадратичную потерю. Меняем только настройку c процедуры <MathBlock formula="A_c" class="w11-inline" :display="false" /> — например, глубину дерева.</div><MathBlock formula="\begin{aligned}R_{A_c}(x)=\underbrace{\sigma^2(x)}_{\text{задача}}+\underbrace{\operatorname{Bias}_{A_c}^2(x)+\operatorname{Var}_D(\hat f_{D,A_c}(x))}_{\text{процедура обучения}}.\end{aligned}" /><div class="w11-grid w11-top"><div class="w11-rail"><b>Возможный выигрыш</b><div>Более гибкий средний прогноз точнее приближает m.</div></div><div class="w11-rail"><b>Возможная цена</b><div>Результат обучения сильнее зависит от случайных деталей выборки.</div></div></div><div class="w11-result">Неустранимый шум при тех же признаках остаётся прежним.</div>
</div>

---
title: "Компромисс смещения и разброса (bias–variance trade-off)"
clicks: 4
---

<!-- S30 -->
<WeekElevenHeader section="Bias–variance trade-off" title="Компромисс смещения и разброса (bias–variance trade-off)" />
<div class="w11-body ">
<div class="w11-grid w11-wide"><div class="w11-figure" style="--fig-h:411px"><div class="w11-image"><img src="/assets/week-11/09_tradeoff_schematic.png" alt="Схема изменения смещения, дисперсии, шума и общей MSE с гибкостью" /></div></div><div class="w11-stack"><div class="w11-small">По x — гибкость процедуры, по y — ожидаемая MSE и её компоненты. Это типичный сценарий.</div><div v-click="1" class="w11-reveal"><div class="w11-small"><b>Квадрат смещения ↓.</b> Средний прогноз лучше приближает зависимость.</div></div><div v-click="2" class="w11-reveal"><div class="w11-small"><b>Разброс ↑.</b> Отдельные прогнозы сильнее реагируют на данные.</div></div><div v-click="3" class="w11-reveal"><div class="w11-small"><b>Шум постоянен.</b> Распределение и признаки те же.</div></div><div v-click="4" class="w11-reveal"><div class="w11-result">Зелёная сумма здесь имеет минимум. Формы кривых зависят от задачи.</div></div></div></div>
</div>

---
title: "Сколько выигрываем и сколько теряем?"
clicks: 1
---

<!-- S31 -->
<WeekElevenHeader section="Bias–variance trade-off" title="Сколько выигрываем и сколько теряем?" />
<div class="w11-body ">
<div class="w11-text">Условный теоретический пример: при какой гибкости ожидаемая MSE минимальна?</div><table class="w11-table"><thead><tr><th>Гибкость</th><th>Смещение²</th><th>Разброс</th><th>Шум</th><th>Ожидаемая MSE</th></tr></thead><tbody><tr><td>Низкая</td><td>9</td><td>0,5</td><td>1</td><td><span v-click="1">10,5</span></td></tr><tr><td>Умеренная</td><td>3</td><td>2</td><td>1</td><td><span v-click="1">6</span></td></tr><tr><td>Высокая</td><td>1</td><td>7</td><td>1</td><td><span v-click="1">9</span></td></tr></tbody></table><div v-click="1" class="w11-reveal"><div class="w11-grid "><div class="w11-rail"><b>Низкая → умеренная</b><div><MathBlock formula="-6+1.5=-4.5" /></div></div><div class="w11-rail"><b>Умеренная → высокая</b><div><MathBlock formula="-2+5=+3" /></div></div></div></div><div v-click="1" class="w11-reveal"><div class="w11-result">В первом переходе уменьшение квадрата смещения перевешивает рост разброса; во втором — наоборот.</div></div>
</div>



---
title: "Какие настройки меняют гибкость?"
---

<!-- S32 -->
<WeekElevenHeader section="Bias–variance trade-off" title="Какие настройки меняют гибкость?" />
<div class="w11-body ">
<div class="w11-grid w11-wide"><div class="w11-figure" style="--fig-h:365px"><div class="w11-image"><img src="/assets/week-11/10_target_metaphor.png" alt="Два схематических распределения прогнозов" /></div></div><div class="w11-stack"><div class="w11-rail"><b>Дерево: глубина ↑</b><div>Больше последовательных разбиений.</div></div><div class="w11-rail"><b>kNN: k ↓</b><div>Более узкая окрестность.</div></div><div class="w11-rail"><b>Ridge: λ ↓</b><div>Слабее ограничены коэффициенты.</div></div></div></div><div class="w11-result">Гибкость растёт: часто смещение² снижается, а разброс увеличивается. Это тенденция, а число параметров не универсальная мера гибкости.</div>
</div>

---
title: "Как исследовать bias–variance trade-off?"
---

<!-- S33 -->
<WeekElevenHeader section="Bias–variance trade-off" title="Как исследовать bias–variance trade-off?" />
<div class="w11-body w11-v3 ">
<div class="w11-text">В прикладной задаче истинное условное среднее <MathBlock formula="m(x)" class="w11-inline" :display="false" /> обычно неизвестно. Проведём контролируемый синтетический эксперимент.</div>
<div class="w11-steps "><div class="w11-step"><i aria-hidden="true">1</i><div class="w11-text">Зададим истинную зависимость и распределение шума.</div></div><div class="w11-step"><i aria-hidden="true">2</i><div class="w11-text">Сгенерируем много независимых обучающих выборок.</div></div><div class="w11-step"><i aria-hidden="true">3</i><div class="w11-text">Обучим на каждой модели разной гибкости.</div></div><div class="w11-step"><i aria-hidden="true">4</i><div class="w11-text">По полученным прогнозам оценим смещение, разброс и ожидаемую ошибку.</div></div></div>
<div class="w11-insight">Механизм генерации данных и размер выборки фиксированы. Меняется гибкость модели.</div>
</div>

---
title: "Как выглядят кривые на двух задачах?"
clicks: 1
---

<!-- S34 -->
<WeekElevenHeader section="Bias–variance trade-off" title="Как выглядят кривые на двух задачах?" />
<div class="w11-body w11-tiny-gap">
<div class="w11-small">100 выборок по 42 объекта, шум SD = 0,2. Полиномы со слабым Ridge. Синяя — смещение², оранжевая — разброс, зелёная — сумма с шумом. Все величины усреднены по сетке x.</div><div class="w11-states"><div v-show="$clicks === 0"><div class="w11-grid w11-wide"><div class="w11-figure" style="--fig-h:330px"><div class="w11-image"><img src="/assets/week-11/03_complexity_two_dgp-left.png" alt="Эксперимент с гладкой зависимостью" /></div></div><div class="w11-rail"><b>Гладкая зависимость</b><div>По горизонтали — степень полинома. После степени 3 смещение мало, риск почти не меняется.</div></div></div></div><div v-show="$clicks >= 1"><div class="w11-grid w11-top"><div class="w11-stack w11-tiny-gap"><div class="w11-figure" style="--fig-h:295px"><div class="w11-image"><img src="/assets/week-11/03_complexity_two_dgp-left.png" alt="Полиномиальный эксперимент: гладкая зависимость" /></div></div><div class="w11-small">Гладкая зависимость: после степени 3 риск почти выходит на плато.</div></div><div class="w11-stack w11-tiny-gap"><div class="w11-figure" style="--fig-h:295px"><div class="w11-image"><img src="/assets/week-11/03_complexity_two_dgp-right.png" alt="Полиномиальный эксперимент: зависимость со скачком" /></div></div><div class="w11-small">Зависимость со скачком: смещение остаётся заметным, риск колеблется.</div></div></div></div></div><div v-click="1" class="w11-reveal"><div class="w11-result">Разложение точно, но не предписывает форму кривых.</div></div>
</div>

---
title: "Как использовать разложение на практике"
---

<!-- S35 -->
<WeekElevenHeader section="Bias–variance trade-off" title="Как использовать разложение на практике" />
<div class="w11-body ">
<div class="w11-small">Условный пример настройки глубины дерева.</div><div class="w11-grid "><table class="w11-table"><thead><tr><th>Глубина</th><th>Train MSE</th><th>Validation MSE</th></tr></thead><tbody><tr><td>1</td><td>12</td><td>13</td></tr><tr><td>3</td><td>6</td><td>7</td></tr><tr><td>5</td><td>3</td><td>5</td></tr><tr><td>10</td><td>0,4</td><td>9</td></tr></tbody></table><div class="w11-stack"><div class="w11-text">Переход 5 → 10 улучшает подгонку, но повышает ошибку на проверке.</div><div class="w11-small">Это совместимо с ростом разброса, но разность train и validation не измеряет его.</div></div></div><div class="w11-result">Практический шаг: сравнить соседние глубины и минимальные размеры листьев на корректных проверочных разбиениях.</div>
</div>

---
title: "Как сохранить гибкость и снизить разброс?"
---

<!-- S36 -->
<WeekElevenHeader section="Bias–variance trade-off" title="Как сохранить гибкость и снизить разброс?" />
<div class="w11-body">
<div class="w11-grid w11-wide"><div class="w11-figure" style="--fig-h:396px"><div class="w11-image"><img src="/assets/week-11/01_repeated_trees-right.png" alt="Чёрная истинная зависимость, 48 голубых прогнозов и их оранжевое среднее" /></div></div><div class="w11-stack"><div class="w11-small">При тех же признаках шум фиксирован. Ограничив глубину, можно уменьшить разброс, но увеличить смещение.</div><div class="w11-small">На графике 48 деревьев оранжевое среднее сгладило голубые ступени. У правого края отклонение от чёрной истинной кривой сохранилось.</div><div class="w11-result">Можно ли уменьшить разброс, сохранив гибкость отдельных моделей? Проверим, что именно даёт усреднение.</div></div></div>
</div>

---
title: "Ансамбли моделей (ensemble methods)"
---

<!-- S37 -->
<WeekElevenHeader section="Ансамбли моделей" title="Ансамбли моделей (ensemble methods)" part="3" />
<div class="w11-body w11-v3 w11-dense w11-comp">
<div class="w11-definition"><strong>Ансамбль моделей</strong> — модель, итоговый прогноз которой формируется путём объединения прогнозов нескольких базовых моделей.</div>
<div class="w11-note"><MathBlock formula="B" class="w11-inline" :display="false" /> — число базовых моделей; <MathBlock formula="T_b" class="w11-inline" :display="false" /> — модель с номером <MathBlock formula="b" class="w11-inline" :display="false" />; <MathBlock formula="T_b(x)" class="w11-inline" :display="false" /> — её прогноз.</div>
<div class="w11-fork"><div class="w11-hub">Объект <MathBlock formula="x" class="w11-inline" :display="false" /></div><svg viewBox="0 0 40 147" aria-hidden="true"><path d="M0 73H17M17 17V130M17 17H39M17 73H39M17 130H39" stroke="#7192c3" stroke-width="2" fill="none"/></svg><div class="w11-ways"><div class="w11-way"><div class="w11-box"><MathBlock formula="T_1" class="w11-inline" :display="false" /></div><span aria-hidden="true">→</span><div class="w11-box"><MathBlock formula="T_1(x)" class="w11-inline" :display="false" /></div></div><div class="w11-way"><div class="w11-box"><MathBlock formula="T_2" class="w11-inline" :display="false" /></div><span aria-hidden="true">→</span><div class="w11-box"><MathBlock formula="T_2(x)" class="w11-inline" :display="false" /></div></div><div class="w11-way"><div class="w11-box"><MathBlock formula="T_B" class="w11-inline" :display="false" /></div><span aria-hidden="true">→</span><div class="w11-box"><MathBlock formula="T_B(x)" class="w11-inline" :display="false" /></div></div></div><svg style="transform:scaleX(-1)" viewBox="0 0 40 147" aria-hidden="true"><path d="M0 73H17M17 17V130M17 17H39M17 73H39M17 130H39" stroke="#7192c3" stroke-width="2" fill="none"/></svg><div><div class="w11-aggr">Агрегация</div><div class="w11-out">Итоговый прогноз</div></div></div>
<div class="w11-repers "><div class="w11-text">Регрессия: например, среднее числовых прогнозов.</div><div class="w11-text">Классификация: например, голосование или усреднение оценок вероятностей.</div></div>
<div class="w11-question"><strong>Вопрос:</strong> Как усреднение прогнозов нескольких моделей влияет на разброс итогового прогноза?</div>
</div>



---
title: "Как измерить устойчивость ансамбля?"
---

<!-- S38 -->
<WeekElevenHeader section="Ансамбли моделей" title="Как измерить устойчивость ансамбля?" />
<div class="w11-body">
<div class="w11-text">Фиксируем <MathBlock formula="x" class="w11-inline" :display="false" /> и мысленно повторяем обучение всего ансамбля на новых обучающих выборках. При каждом повторе получаем совместно прогнозы двух базовых моделей и их среднее. Числа условны.</div>
<table class="w11-table"><thead><tr><th>Повтор</th><th>Модель 1</th><th>Модель 2</th><th>Среднее</th></tr></thead><tbody><tr><td>1</td><td>8</td><td>12</td><td>10</td></tr><tr><td>2</td><td>12</td><td>9</td><td>10,5</td></tr><tr><td>3</td><td>9</td><td>11</td><td>10</td></tr><tr><td>4</td><td>11</td><td>8</td><td>9,5</td></tr></tbody></table>
<div class="w11-result">Нас интересует дисперсия <strong>последнего столбца</strong> между повторами. Как она связана с дисперсиями отдельных моделей?</div>
</div>



---
title: "Усреднение некоррелированных прогнозов"
---

<!-- S39 -->
<WeekElevenHeader section="Ансамбли моделей" title="Усреднение некоррелированных прогнозов" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-text">Фиксируем <MathBlock formula="x" class="w11-inline" :display="false" />. Сокращённо пишем <MathBlock formula="T_b" class="w11-inline" :display="false" /> вместо <MathBlock formula="T_b(x)" class="w11-inline" :display="false" />: это случайный прогноз при повторном обучении.</div>
<MathBlock formula="\bar T_B=\frac1B\sum_{b=1}^B T_b." class="w11-main-math" />
<div class="w11-note">Рассмотрим ансамбль однотипных моделей, обучаемых по одинаковым правилам. Если их случайные прогнозы имеют одинаковое распределение, то одинаковы и их дисперсии.</div>
<div class="w11-steps "><div class="w11-step"><i aria-hidden="true">1</i><div class="w11-text">Все прогнозы имеют одинаковую дисперсию <MathBlock formula="\operatorname{Var}(T_b)=\tau^2,\quad 0&lt;\tau^2&lt;\infty" class="w11-inline" :display="false" />.</div></div><div class="w11-step"><i aria-hidden="true">2</i><div class="w11-text">Для первого вывода дополнительно предположим, что попарные ковариации равны нулю (в частности, так будет при независимости).</div></div></div>
<div class="w11-insight">Найдём дисперсию <MathBlock formula="\bar T_B" class="w11-inline" :display="false" /> — меру устойчивости среднего прогноза между повторами обучения.</div>
</div>



---
title: "Дисперсия среднего некоррелированных прогнозов"
clicks: 2
---

<!-- S40 -->
<WeekElevenHeader section="Ансамбли моделей" title="Дисперсия среднего некоррелированных прогнозов" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-note">Используем два свойства дисперсии:</div>
<MathBlock formula="\operatorname{Var}(cT)=c^2\operatorname{Var}(T),\qquad \operatorname{Var}\!\bigl(\sum\nolimits_bT_b\bigr)=\sum\nolimits_b\operatorname{Var}(T_b)" />
<div class="w11-note">(второе равенство верно при нулевых попарных ковариациях).</div>
<div v-click="1" class="w11-reveal "><div class="w11-theorem"><MathBlock formula="\begin{aligned} \operatorname{Var}(\bar T_B)&amp;=\frac1{B^2}\operatorname{Var}\!\bigl(\sum\nolimits_{b=1}^B T_b\bigr)\\ &amp;=\frac1{B^2}\sum\nolimits_{b=1}^B\tau^2=\boxed{\frac{\tau^2}{B}}. \end{aligned}" /></div></div>
<div v-click="2" class="w11-reveal"><div class="w11-text">При <MathBlock formula="\tau^2=4" class="w11-inline" :display="false" />: 4 модели — дисперсия среднего 1; 16 моделей — 0,25.</div><div class="w11-insight">На практике прогнозы моделей могут коррелировать, например при обучении на связанных данных. Уточним, как совместные колебания влияют на дисперсию среднего.</div></div>
</div>

---
title: "Совместные колебания прогнозов"
---

<!-- S41 -->
<WeekElevenHeader section="Ансамбли моделей" title="Совместные колебания прогнозов" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-paired-legend w11-note"><span><svg viewBox="0 0 46 20" aria-hidden="true"><path d="M1 10h44" stroke="#245dcd" stroke-width="2.4"/><circle cx="23" cy="10" r="5.5" fill="white" stroke="#245dcd" stroke-width="2.6"/></svg>Модель 1</span><span><svg viewBox="0 0 46 20" aria-hidden="true"><path d="M1 10h44" stroke="#a34a16" stroke-width="3" stroke-dasharray="11 8"/><path d="M20 7l6 6m0 -6l-6 6" stroke="#a34a16" stroke-width="2.4"/></svg>Модель 2</span><span><svg viewBox="0 0 46 20" aria-hidden="true"><path d="M1 10h44" stroke="#31825c" stroke-width="7"/><path d="M23 2l8 8-8 8-8-8Z" fill="#31825c"/></svg>Среднее</span></div>
<div class="w11-grid w11-paired-plots">
  <div><img src="/assets/week-11/15_predictions_opposed.svg" alt="Противоположные колебания: прогнозы моделей 8, 12, 9, 11 и 12, 8, 11, 9. Среднее 10 в каждом повторе." /><div class="w11-text w11-centered">Среднее всегда равно 10</div></div>
  <div><img src="/assets/week-11/15_predictions_aligned.svg" alt="Согласованные колебания: прогнозы обеих моделей и среднее совпадают: 8, 12, 9, 11." /><div class="w11-text w11-centered">Среднее сохраняет колебания обеих моделей</div></div>
</div>
<div class="w11-insight">У каждой модели в обоих примерах одинаковый набор значений и одинаковый эмпирический разброс. Меняется только совместная изменчивость. Для расчёта дисперсии среднего нужно учесть её.</div>
</div>

---
title: "Ковариация прогнозов"
clicks: 1
---

<!-- S42 -->
<WeekElevenHeader section="Ансамбли моделей" title="Ковариация прогнозов" />
<div class="w11-body w11-v3 ">
<div class="w11-text">Ковариация измеряет совместную изменчивость двух случайных величин:</div>
<MathBlock formula="\operatorname{Cov}(T_1,T_2)=\mathbb E[(T_1-\mathbb ET_1)(T_2-\mathbb ET_2)]." />
<div v-click="1" class="w11-reveal "><div class="w11-note">В предыдущем примере оба средних равны 10.</div><table class="w11-table "><thead><tr><th scope="col">Отклонения от среднего в первом повторе</th><th scope="col">Произведение</th></tr></thead><tbody><tr><td><MathBlock formula="-2,\;+2" class="w11-inline" :display="false" /> (компенсация)</td><td><MathBlock formula="-4" class="w11-inline" :display="false" /></td></tr><tr><td><MathBlock formula="-2,\;-2" class="w11-inline" :display="false" /> (согласованные колебания)</td><td><MathBlock formula="+4" class="w11-inline" :display="false" /></td></tr></tbody></table><div class="w11-insight">Ковариация положительна, когда однонаправленные отклонения преобладают в среднем произведении. При противоположных колебаниях она может быть отрицательной.</div></div>
</div>

---
title: "Два прогноза: откуда берётся ковариация?"
clicks: 3
---

<!-- S43 -->
<WeekElevenHeader section="Ансамбли моделей" title="Два прогноза: откуда берётся ковариация?" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-note"><MathBlock formula="T_1,T_2" class="w11-inline" :display="false" /> — случайные прогнозы двух моделей в фиксированной точке.</div>
<MathBlock formula="\bar T_2=\tfrac{T_1+T_2}{2},\qquad \mathbb E[\bar T_2]=\tfrac{\mathbb E[T_1]+\mathbb E[T_2]}{2}." />
<div class="w11-grid w11-top w11-proof-pair">
  <div v-click="1" class="w11-reveal w11-rail">
    <div class="w11-note">По линейности ожидания:</div>
    <MathBlock formula="\begin{gathered}\bar T_2-\mathbb E[\bar T_2]=\tfrac{T_1+T_2}{2}-\tfrac{\mathbb E[T_1]+\mathbb E[T_2]}{2}\\ =\tfrac12\big[(T_1-\mathbb ET_1)+(T_2-\mathbb ET_2)\big]\\ =\tfrac12(\Delta_1+\Delta_2).\end{gathered}" />
    <div class="w11-note">Здесь <MathBlock formula="\Delta_b=T_b-\mathbb ET_b" class="w11-inline" :display="false" />.</div>
  </div>
  <div v-click="2" class="w11-reveal w11-rail">
    <div class="w11-note">По определению дисперсии:</div>
    <MathBlock formula="\begin{gathered}\operatorname{Var}(\bar T_2)=\mathbb E[(\bar T_2-\mathbb E\bar T_2)^2]\\ =\tfrac14\mathbb E[(\Delta_1+\Delta_2)^2]\\ =\tfrac14\bigl(\mathbb E\Delta_1^2+\mathbb E\Delta_2^2+2\mathbb E[\Delta_1\Delta_2]\bigr).\end{gathered}" />
  </div>
</div>
<div v-click="3" class="w11-reveal"><div class="w11-theorem"><MathBlock formula="\operatorname{Var}(\bar T_2)=\tfrac14\bigl[\operatorname{Var}(T_1)+\operatorname{Var}(T_2)+2\operatorname{Cov}(T_1,T_2)\bigr]." /></div><div class="w11-insight">При положительной ковариации дисперсия среднего больше, чем при нулевой (при тех же индивидуальных дисперсиях).</div></div>
</div>



---
title: "Два прогноза: влияние корреляции"
clicks: 2
---

<!-- S44 -->
<WeekElevenHeader section="Ансамбли моделей" title="Два прогноза: влияние корреляции" />
<div class="w11-body w11-v3 w11-dense w11-comp">
<div class="w11-note">При одинаковой дисперсии <MathBlock formula="\tau^2&gt;0" class="w11-inline" :display="false" />:</div>
<MathBlock formula="\rho=\frac{\operatorname{Cov}(T_1,T_2)}{\sqrt{\operatorname{Var}(T_1)\operatorname{Var}(T_2)}} \quad\Longrightarrow\quad \operatorname{Cov}(T_1,T_2)=\rho\tau^2." />
<div v-click="1" class="w11-reveal"><MathBlock formula="\operatorname{Var}(\bar T_2)=\tfrac{\tau^2+\tau^2+2\rho\tau^2}{4}=\boxed{\tfrac{\tau^2}{2}(1+\rho)}." class="w11-main-math" /></div>
<div v-click="2" class="w11-reveal"><MathBlock formula="\operatorname{Var}(\bar T_2)/\tau^2=(1+\rho)/2." /><table class="w11-table"><thead><tr><th scope="col">Корреляция <MathBlock formula="\rho" class="w11-inline" :display="false" /></th><th scope="col">Доля дисперсии одной модели</th></tr></thead><tbody><tr><td>0</td><td>1/2</td></tr><tr><td>0,5</td><td>3/4</td></tr><tr><td>1</td><td>1</td></tr></tbody></table><div class="w11-insight">Чем больше положительная корреляция, тем меньше выигрыш от усреднения.</div></div>
</div>

---
title: "Дисперсия среднего B прогнозов"
clicks: 3
---

<!-- S45 -->
<WeekElevenHeader section="Ансамбли моделей" title="Дисперсия среднего B прогнозов" />
<div class="w11-body w11-v3 w11-dense w11-comp">
<div class="w11-note">Для <MathBlock formula="B" class="w11-inline" :display="false" /> моделей центрируем каждый прогноз:</div>
<MathBlock formula="\bar T_B-\mathbb E\bar T_B=\tfrac1B\sum\nolimits_b\Delta_b,\qquad \Delta_b=T_b-\mathbb E T_b." />
<div v-click="1" class="w11-reveal"><MathBlock formula="\bigl(\sum\nolimits_{b=1}^B\Delta_b\bigr)^2=\sum\nolimits_{b=1}^B\sum\nolimits_{c=1}^B\Delta_b\Delta_c,\qquad \mathbb E[\Delta_b\Delta_c]=\operatorname{Cov}(T_b,T_c)." /></div>
<div v-click="2" class="w11-reveal"><div class="w11-theorem"><MathBlock formula="\operatorname{Var}(\bar T_B)=\tfrac1{B^2}\mathbb E\bigl[\sum\nolimits_b\sum\nolimits_c\Delta_b\Delta_c\bigr]=\tfrac1{B^2}\sum\nolimits_{b=1}^B\sum\nolimits_{c=1}^B\operatorname{Cov}(T_b,T_c)." /></div></div>
<div v-click="3" class="w11-reveal">
  <div class="w11-note w11-matrix-caption"><strong>Ковариационная матрица прогнозов при фиксированном <MathBlock formula="x" class="w11-inline" :display="false" /></strong></div>
  <div class="w11-grid w11-matrix-detail">
    <table class="w11-table"><thead><tr><th>Cov</th><th>T₁</th><th>T₂</th><th>T₃</th></tr></thead><tbody><tr><td>T₁</td><td class="w11-diag"><b>σ₁²</b></td><td>c₁₂</td><td>c₁₃</td></tr><tr><td>T₂</td><td>c₂₁</td><td class="w11-diag"><b>σ₂²</b></td><td>c₂₃</td></tr><tr><td>T₃</td><td>c₃₁</td><td>c₃₂</td><td class="w11-diag"><b>σ₃²</b></td></tr></tbody></table>
    <div class="w11-repers">
      <div class="w11-note">На диагонали <MathBlock formula="\operatorname{Cov}(T_b,T_b)=\operatorname{Var}(T_b)" class="w11-inline" :display="false" />.</div>
      <div class="w11-note">Вне диагонали — ковариации разных прогнозов; каждая пара входит дважды.</div>
      <div class="w11-note">Дисперсия среднего равна сумме всех элементов матрицы, делённой на <MathBlock formula="B^2" class="w11-inline" :display="false" />.</div>
    </div>
  </div>
</div>
</div>



---
title: "Много моделей с одинаковой корреляцией"
clicks: 1
---

<!-- S46 -->
<WeekElevenHeader section="Ансамбли моделей" title="Много моделей с одинаковой корреляцией" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-note">В ансамблях однотипных моделей, обучаемых по одинаковым правилам, естественно рассматривать симметричный случай: перестановка номеров моделей не меняет совместное распределение их прогнозов. Тогда все прогнозы имеют одинаковую дисперсию, а все пары различных прогнозов — одинаковую корреляцию.</div>
<div class="w11-text">У всех <MathBlock formula="B" class="w11-inline" :display="false" /> моделей одинаковая дисперсия <MathBlock formula="\tau^2" class="w11-inline" :display="false" /> и одинаковая попарная корреляция <MathBlock formula="0\le\rho\le1" class="w11-inline" :display="false" />.</div>
<div class="w11-note">В двойной сумме:</div>
<div class="w11-grid w11-repers w11-top"><div class="w11-text">На диагонали: <MathBlock formula="B" class="w11-inline" :display="false" /> слагаемых по <MathBlock formula="\tau^2" class="w11-inline" :display="false" />.</div><div class="w11-text">Вне диагонали: <MathBlock formula="B(B-1)" class="w11-inline" :display="false" /> слагаемых по <MathBlock formula="\rho\tau^2" class="w11-inline" :display="false" />.</div></div>
<div v-click="1" class="w11-reveal"><div class="w11-theorem"><MathBlock formula="\operatorname{Var}(\bar T_B)=\frac{B\tau^2+B(B-1)\rho\tau^2}{B^2}=\boxed{\tau^2\left(\rho+\frac{1-\rho}{B}\right)}." class="w11-main-math" /></div><div class="w11-insight">Такое упрощение позволяет отдельно исследовать влияние числа моделей, их индивидуального разброса и попарной корреляции на дисперсию среднего прогноза.</div></div>
</div>

---
title: "Что остаётся при большом числе моделей?"
---

<!-- S47 -->
<WeekElevenHeader section="Ансамбли моделей" title="Что остаётся при большом числе моделей?" />
<div class="w11-body w11-v3 w11-dense w11-curve-repers">
<div class="w11-grid w11-wide"><div class="w11-figure" style="--fig-h:401px"><div class="w11-image"><img src="/assets/week-11/06_corr_variance.png" alt="Доля дисперсии среднего по числу моделей" /></div></div><div class="w11-stack "><div class="w11-note">По горизонтали — число моделей <MathBlock formula="B" class="w11-inline" :display="false" />, по вертикали — <MathBlock formula="\operatorname{Var}(\bar T_B)/\tau^2" class="w11-inline" :display="false" />.</div><div class="w11-repers "><div class="w11-text"><MathBlock formula="\rho=0" class="w11-inline" :display="false" />: дисперсия убывает как <MathBlock formula="1/B" class="w11-inline" :display="false" />.</div><div class="w11-text"><MathBlock formula="\rho=0{,}2" class="w11-inline" :display="false" />: при <MathBlock formula="B=10" class="w11-inline" :display="false" /> остаётся 0,28, при <MathBlock formula="B=100" class="w11-inline" :display="false" /> — 0,208 от исходной дисперсии.</div><div class="w11-text"><MathBlock formula="\rho=1" class="w11-inline" :display="false" />: среднее сохраняет всю исходную дисперсию.</div></div></div></div>
<div class="w11-theorem w11-limit-note"><MathBlock formula="\lim_{B\to\infty}\operatorname{Var}(\bar T_B)=\rho\tau^2." /><div class="w11-note"><strong>Фиксируем</strong> дисперсию базового прогноза <MathBlock formula="\tau^2" class="w11-inline" :display="false" /> и попарную корреляцию <MathBlock formula="\rho" class="w11-inline" :display="false" />. Выигрыш от роста числа моделей постепенно уменьшается. При высокой положительной корреляции даже в большом ансамбле сохраняется значительная часть разброса.</div></div>
</div>



---
title: "Усреднение и смещение"
clicks: 1
---

<!-- S48 -->
<WeekElevenHeader section="Ансамбли моделей" title="Усреднение и смещение" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-text">Если математическое ожидание каждого базового прогноза равно <MathBlock formula="\mu_T(x)" class="w11-inline" :display="false" />, то</div>
<MathBlock formula="\mathbb E[\bar T_B(x)]=\tfrac1B\sum\nolimits_{b=1}^B\mathbb E[T_b(x)]=\mu_T(x)." class="w11-main-math" />
<MathBlock formula="\operatorname{Bias}(\bar T_B(x))=\mathbb E[\bar T_B(x)]-m(x)=\mu_T(x)-m(x)." />
<div class="w11-insight">При одинаковых средних прогнозах смещение ансамбля совпадает со смещением базового прогноза.</div>
<div class="w11-rail w11-note">Условный пример: <MathBlock formula="m(x)=10" class="w11-inline" :display="false" />, а средний прогноз каждой базовой модели по повторным обучениям равен 20.</div>
<div v-click="1" class="w11-reveal "><div class="w11-text">Тогда средний прогноз ансамбля также равен 20, его смещение равно <MathBlock formula="20-10=10" class="w11-inline" :display="false" />.</div><div class="w11-insight"><strong>Вывод:</strong> снижение разброса само по себе не устраняет систематический сдвиг.</div></div>
</div>



---
title: "Условия эффективного усреднения"
---

<!-- S49 -->
<WeekElevenHeader section="Ансамбли моделей" title="Условия эффективного усреднения" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-note">При одинаковых дисперсиях и одинаковой неотрицательной попарной корреляции:</div>
<MathBlock formula="\operatorname{Var}(\bar T_B)=\underbrace{\rho\tau^2}_{\text{остаётся при росте }B}+\underbrace{\frac{\tau^2(1-\rho)}{B}}_{\text{убывает при росте }B}." class="w11-main-math" />
<div class="w11-repers "><div class="w11-text"><strong>Больше моделей:</strong> уменьшается вклад индивидуальных колебаний.</div><div class="w11-text"><strong>Меньше корреляция:</strong> при прочих равных усреднение сильнее снижает дисперсию.</div><div class="w11-text"><strong>Точные средние прогнозы:</strong> небольшое смещение остаётся важным для MSE.</div></div>
<div class="w11-insight"><strong>Задача:</strong> построить много базовых моделей с небольшим смещением среднего прогноза и достаточно разнообразными прогнозами. Высокая корреляция ограничивает снижение разброса.</div>
<div class="w11-question">Как получить разнообразные модели, если у нас всего одна обучающая выборка?</div>
</div>

---
title: "Задача: как оценить изменчивость статистики?"
clicks: 1
---

<!-- S50 -->
<WeekElevenHeader section="Bootstrap и bagging" title="Задача: как оценить изменчивость статистики?" part="4" />
<div class="w11-body w11-v3 ">
<div class="w11-text">Получили пять наблюдений:</div>
<MathBlock formula="2,\quad4,\quad7,\quad9,\quad13." class="w11-main-math" />
<div class="w11-text">Их выборочное среднее:</div>
<MathBlock formula="\bar x=\frac{2+4+7+9+13}{5}=7." />
<div v-click="1" class="w11-reveal "><div class="w11-text">При повторном сборе пяти наблюдений из той же популяции среднее могло бы оказаться другим.</div><div class="w11-question"><strong>Задача:</strong> оценить изменчивость выборочного среднего, имея только исходную выборку.</div></div>
</div>



---
title: "Bootstrap: определение и основная идея"
---

<!-- S51 -->
<WeekElevenHeader section="Bootstrap и bagging" title="Bootstrap: определение и основная идея" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-definition"><strong>Бутстреп (bootstrap)</strong> — статистический метод, позволяющий приблизительно исследовать выборочное распределение статистики с помощью повторных выборок, построенных на основе исходных данных.</div>
<div class="w11-note">Идея классического непараметрического бутстрепа:</div>
<div class="w11-steps "><div class="w11-step"><i aria-hidden="true">1</i><div class="w11-text">Неизвестное распределение популяции приближаем эмпирическим распределением исходной выборки.</div></div><div class="w11-step"><i aria-hidden="true">2</i><div class="w11-text">Из этого распределения многократно генерируем новые наборы наблюдений.</div></div><div class="w11-step"><i aria-hidden="true">3</i><div class="w11-text">В каждом наборе рассчитываем интересующую нас статистику.</div></div></div>
<div class="w11-empr" role="img" aria-label="Пять значений, вероятность каждого одна пятая"><div><strong>2</strong><small>1/5</small></div><div><strong>4</strong><small>1/5</small></div><div><strong>7</strong><small>1/5</small></div><div><strong>9</strong><small>1/5</small></div><div><strong>13</strong><small>1/5</small></div></div>
<div class="w11-note">При равновероятном выборе исходных строк каждый индекс имеет вероятность <MathBlock formula="1/n" class="w11-inline" :display="false" />.</div>
</div>

---
title: "Классический непараметрический bootstrap"
clicks: 5
---

<!-- S52 -->
<WeekElevenHeader section="Bootstrap и bagging" title="Классический непараметрический bootstrap" />
<div class="w11-body w11-v3 w11-dense w11-rows-demo">
<div class="w11-text">Из исходных <MathBlock formula="n" class="w11-inline" :display="false" /> наблюдений делаем <MathBlock formula="n" class="w11-inline" :display="false" /> независимых равновероятных извлечений <strong>с возвращением</strong>.</div>
<div class="w11-steps "><div class="w11-step"><i aria-hidden="true">1</i><div class="w11-text">Случайно выбираем одну строку и записываем её в новую выборку.</div></div><div class="w11-step"><i aria-hidden="true">2</i><div class="w11-text">Возвращаем строку: снова доступны все <MathBlock formula="n" class="w11-inline" :display="false" /> наблюдений.</div></div><div class="w11-step"><i aria-hidden="true">3</i><div class="w11-text">Повторяем, пока новая выборка не содержит <MathBlock formula="n" class="w11-inline" :display="false" /> извлечений.</div></div></div>
<div class="w11-note">Исходные строки: №1 → 2; №2 → 4; №3 → 7; №4 → 9; №5 → 13.</div>
<div class="w11-chips"><span v-click="1">№2 · 4</span><span v-click="2">№5 · 13</span><span v-click="3">№2 · 4</span><span v-click="4">№1 · 2</span><span v-click="5">№5 · 13</span></div>
<div v-click="5" class="w11-reveal "><div class="w11-insight"><strong>Получили:</strong> пять извлечений; строки 2 и 5 повторились, строки 3 и 4 отсутствуют.</div></div>
</div>

---
title: "Пример: bootstrap выборочного среднего"
clicks: 2
---

<!-- S53 -->
<WeekElevenHeader section="Bootstrap и bagging" title="Пример: bootstrap выборочного среднего" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-figure" style="--fig-h:160px"><div class="w11-image"><img src="/assets/week-11/04_bootstrap_rows-indices.png" alt="Индексы исходной таблицы и трёх выборок с возвращением" /></div></div>
<table class="w11-table "><thead><tr><th scope="col">Индексы строк</th><th scope="col">Значения</th><th scope="col">Выборочное среднее</th></tr></thead><tbody><tr><td>2, 5, 2, 1, 5</td><td>4, 13, 4, 2, 13</td><td><span v-click="1">7,2</span></td></tr><tr><td>4, 1, 4, 2, 3</td><td>9, 2, 9, 4, 7</td><td><span v-click="2">6,2</span></td></tr><tr><td>3, 3, 5, 5, 1</td><td>7, 7, 13, 13, 2</td><td><span v-click="2">8,4</span></td></tr></tbody></table>
<div v-click="1" class="w11-reveal w11-note w11-centered"><MathBlock formula="(4+13+4+2+13)/5=7{,}2" class="w11-inline" :display="false" /></div>
<div v-click="2" class="w11-reveal "><div class="w11-insight">Из одной исходной выборки получились разные значения статистики.</div></div>
</div>

---
title: "Что даёт бутстреп?"
---

<!-- S54 -->
<WeekElevenHeader section="Bootstrap и bagging" title="Что даёт бутстреп?" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-note">Повторим процедуру много раз. Для каждой бутстреп-выборки рассчитываем среднее и получаем распределение бутстреп-средних.</div>
<div class="w11-figure" style="--fig-h:266px"><div class="w11-image"><img src="/assets/week-11/14_bootstrap_means_exact.svg" alt="Точное распределение средних по 3125 наборам; среднее исходной выборки равно 7" /></div></div>
<div class="w11-text">Ширина распределения позволяет оценить изменчивость выборочного среднего.</div>
<div class="w11-note"><strong>Бутстреп-повторы используют имеющиеся наблюдения.</strong> Они приближают повторный сбор из популяции и не добавляют новых наблюдений.</div>
<div class="w11-insight">Для ансамблей мы можем использовать полученные наборы строк как разные обучающие выборки.</div>
</div>

---
title: "Бэггинг: бутстреп и агрегация"
---

<!-- S55 -->
<WeekElevenHeader section="Bootstrap и bagging" title="Бэггинг: бутстреп и агрегация" />
<div class="w11-body">
<div class="w11-text"><strong>Бэггинг</strong> (bootstrap aggregating) — метод ансамблирования: из одной таблицы создаём много бутстреп-наборов, на каждом обучаем базовую модель и объединяем их прогнозы.</div><div class="w11-grid w11-top"><div class="w11-rail"><b>Зачем нужен бутстреп?</b>Повторное обучение детерминированной процедуры на одной таблице даёт одинаковые модели. Бутстреп создаёт разные обучающие наборы, поэтому прогнозы могут различаться.</div><div class="w11-rail"><b>Зачем объединять прогнозы?</b>При усреднении отдельные колебания могут компенсироваться. Особенно полезно это для нестабильных базовых моделей.</div></div><div class="w11-small">Базовой моделью может быть дерево или другой алгоритм, чувствительный к составу обучающей выборки.</div>
</div>



---
title: "Бэггинг: алгоритм обучения"
---

<!-- S56 -->
<WeekElevenHeader section="Bootstrap и bagging" title="Бэггинг: алгоритм обучения" />
<div class="w11-body w11-v3 ">
<div class="w11-text">Дано: исходная выборка <MathBlock formula="D" class="w11-inline" :display="false" />, базовая процедура обучения <MathBlock formula="A" class="w11-inline" :display="false" />, число моделей <MathBlock formula="B" class="w11-inline" :display="false" />.</div>
<div class="w11-note">Для <MathBlock formula="b=1,\ldots,B" class="w11-inline" :display="false" />:</div>
<div class="w11-grid w11-top"><div class="w11-steps "><div class="w11-step"><i aria-hidden="true">1</i><div class="w11-text">Формируем бутстреп-выборку <MathBlock formula="D_b^*" class="w11-inline" :display="false" /> из <MathBlock formula="D" class="w11-inline" :display="false" />.</div></div><div class="w11-step"><i aria-hidden="true">2</i><div class="w11-text">Обучаем модель <MathBlock formula="T_b=A(D_b^*)" class="w11-inline" :display="false" />.</div></div><div class="w11-step"><i aria-hidden="true">3</i><div class="w11-text">Сохраняем обученную модель <MathBlock formula="T_b" class="w11-inline" :display="false" />.</div></div></div><div class="w11-fork w11-training"><div class="w11-hub">Исходная выборка <MathBlock formula="D" class="w11-inline" :display="false" /></div><svg viewBox="0 0 40 147" aria-hidden="true"><path d="M0 73H17M17 17V130M17 17H39M17 73H39M17 130H39" stroke="#7192c3" stroke-width="2" fill="none"/></svg><div class="w11-ways"><div class="w11-way"><div class="w11-box"><MathBlock formula="D_1^*" class="w11-inline" :display="false" /></div><span aria-hidden="true">→</span><div class="w11-box"><MathBlock formula="T_1" class="w11-inline" :display="false" /></div></div><div class="w11-way"><div class="w11-box"><MathBlock formula="D_2^*" class="w11-inline" :display="false" /></div><span aria-hidden="true">→</span><div class="w11-box"><MathBlock formula="T_2" class="w11-inline" :display="false" /></div></div><div class="w11-way"><div class="w11-box"><MathBlock formula="D_B^*" class="w11-inline" :display="false" /></div><span aria-hidden="true">→</span><div class="w11-box"><MathBlock formula="T_B" class="w11-inline" :display="false" /></div></div></div></div></div>
<div class="w11-insight">Базовая процедура и её настройки одинаковы; модели обучены на разных наборах строк.</div>
</div>

---
title: "Бэггинг: прогнозирование"
---

<!-- S57 -->
<WeekElevenHeader section="Bootstrap и bagging" title="Бэггинг: прогнозирование" />
<div class="w11-body w11-v3 w11-dense w11-short-fork">
<div class="w11-text">Подаём один новый объект <MathBlock formula="x" class="w11-inline" :display="false" /> каждой обученной модели.</div>
<div class="w11-fork"><div class="w11-hub">Объект <MathBlock formula="x" class="w11-inline" :display="false" /></div><svg viewBox="0 0 40 147" aria-hidden="true"><path d="M0 73H17M17 17V130M17 17H39M17 73H39M17 130H39" stroke="#7192c3" stroke-width="2" fill="none"/></svg><div class="w11-ways"><div class="w11-way"><div class="w11-box"><MathBlock formula="T_1" class="w11-inline" :display="false" /></div><span aria-hidden="true">→</span><div class="w11-box"><MathBlock formula="T_1(x)" class="w11-inline" :display="false" /></div></div><div class="w11-way"><div class="w11-box"><MathBlock formula="T_2" class="w11-inline" :display="false" /></div><span aria-hidden="true">→</span><div class="w11-box"><MathBlock formula="T_2(x)" class="w11-inline" :display="false" /></div></div><div class="w11-way"><div class="w11-box"><MathBlock formula="T_B" class="w11-inline" :display="false" /></div><span aria-hidden="true">→</span><div class="w11-box"><MathBlock formula="T_B(x)" class="w11-inline" :display="false" /></div></div></div><svg style="transform:scaleX(-1)" viewBox="0 0 40 147" aria-hidden="true"><path d="M0 73H17M17 17V130M17 17H39M17 73H39M17 130H39" stroke="#7192c3" stroke-width="2" fill="none"/></svg><div><div class="w11-aggr">Среднее</div><div class="w11-out">Итоговый прогноз</div></div></div>
<div class="w11-note">В регрессии:</div>
<MathBlock formula="\boxed{\hat f_{\mathrm{bag}}(x)=\frac1B\sum\nolimits_{b=1}^B T_b(x).}" class="w11-main-math" />
<div class="w11-note">В классификации можно агрегировать голоса или оценки вероятностей.</div>
<div class="w11-question"><strong>Вопрос:</strong> для каких базовых моделей такой способ усреднения особенно полезен?</div>
</div>

---
title: "Бэггинг неглубоких деревьев"
---

<!-- S58 -->
<WeekElevenHeader section="Bootstrap и bagging" title="Бэггинг неглубоких деревьев" />
<div class="w11-body w11-v3 ">
<div class="w11-grid w11-wide"><div class="w11-figure" style="--fig-h:405px"><div class="w11-image"><img src="/assets/week-11/05_bagging_shallow_deep-left.png" alt="Бэггинг деревьев глубины 1 на одной исходной выборке" /></div></div><div class="w11-stack "><div class="w11-note">Одна синтетическая выборка. По горизонтали — признак <MathBlock formula="x" class="w11-inline" :display="false" />, по вертикали — ответ или прогноз.</div><div class="w11-repers "><div class="w11-text">Чёрная линия — истинная зависимость.</div><div class="w11-text">Голубая — дерево глубины 1, обученное на всей выборке (решающий пень).</div><div class="w11-text">Оранжевая — среднее 150 бутстреп-пней.</div></div></div></div>
<div class="w11-insight">Усреднение смягчает ступень, но в этом эксперименте ансамблю всё ещё трудно воспроизвести изгибы истинной зависимости.</div>
</div>

---
title: "Бэггинг глубоких деревьев"
---

<!-- S59 -->
<WeekElevenHeader section="Bootstrap и bagging" title="Бэггинг глубоких деревьев" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-grid w11-wide"><div class="w11-figure" style="--fig-h:315px"><div class="w11-image"><img src="/assets/week-11/05_bagging_shallow_deep-right.png" alt="Одно глубокое дерево и прогноз бэггинга глубоких деревьев" /></div></div><div class="w11-stack w11-tiny-gap"><div class="w11-note">Та же исходная выборка и те же оси.</div><div class="w11-repers "><div class="w11-note">Голубая — одно глубокое дерево.</div><div class="w11-note">Оранжевая — среднее 150 бутстреп-деревьев.</div><div class="w11-note">Чёрная — истинное условное среднее.</div></div></div></div>
<div class="w11-note">Отдельное глубокое дерево описывает изгибы, но его прогноз сильно меняется между листьями. Усреднение сглаживает часть скачков и сохраняет форму зависимости.</div>
<div class="w11-insight"><strong>Итог сравнения:</strong> бэггинг особенно полезен для гибких, нестабильных базовых моделей с относительно небольшим смещением и большим разбросом.</div>
<div class="w11-note">Здесь бутстрепы одной выборки, в начальном опыте — независимые выборки из популяции.</div>
</div>



---
title: "Как bagging влияет на смещение и разброс?"
---

<!-- S60 -->
<WeekElevenHeader section="Bootstrap и bagging" title="Как bagging влияет на смещение и разброс?" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-note">Для одинаково распределённых бутстреп-прогнозов:</div>
<MathBlock formula="\mathbb E[\bar T_B(x)]=\frac1B\sum_{b=1}^B\mathbb E[T_b(x)]=\mathbb E[T_1(x)]." />
<div class="w11-repers"><div class="w11-text"><strong>Смещение.</strong> Ансамбль сохраняет средний прогноз одного бутстреп-компонента. Он может отличаться от среднего прогноза модели, обучаемой на всей исходной выборке.</div><div class="w11-text"><strong>Разброс.</strong> Усреднение помогает сгладить колебания нестабильных моделей.</div><div class="w11-text"><strong>Ограничение.</strong> Все компоненты используют строки одной исходной таблицы; деревья могут строить похожие разбиения.</div></div>
<div class="w11-question">Как дополнительно разнообразить деревья?</div>
</div>

---
title: "Почему бутстреп-деревья бывают похожи"
clicks: 1
---

<!-- S61 -->
<WeekElevenHeader section="Random Forest" part="5" title="Почему бутстреп-деревья бывают похожи" />
<div class="w11-body ">
<div class="w11-text">Прогнозируем стоимость квартиры по шести признакам: площадь, район, этаж, возраст здания, лифт и число комнат.</div><div class="w11-grid "><div class="w11-rail"><b>Бутстреп №1</b><div>В корне: разбиение по площади.</div></div><div class="w11-rail"><b>Бутстреп №2</b><div>В корне: снова разбиение по площади.</div></div></div><div v-click="1" class="w11-reveal"><div class="w11-result">Похожие верхние разбиения могут давать сходные прогнозы. Если прогнозы меняются согласованно, часть колебаний сохраняется при усреднении.</div></div>
</div>



---
title: "Случайный лес: откуда берётся разнообразие?"
---

<!-- S62 -->
<WeekElevenHeader section="Random Forest" title="Случайный лес: откуда берётся разнообразие?" />
<div class="w11-body">
<div class="w11-text"><strong>Классический случайный лес</strong> (Random Forest) — ансамбль деревьев на бутстреп-выборках. В каждом узле каждого дерева случайно выбирается новый набор признаков-кандидатов.</div>
<div class="w11-grid w11-top"><div class="w11-rail"><b>Случайность</b>Иногда площадь не попадает в набор. Тогда дерево рассматривает разбиения по другим признакам.</div><div class="w11-rail"><b>Критерий дерева</b>Из доступных признаков и допустимых порогов выбирается лучшее разбиение, как в CART.</div></div>
<div class="w11-result">Случайный выбор признаков позволяет строить более разнообразные деревья и может уменьшать корреляцию их прогнозов. При этом ограничение набора кандидатов способно ухудшать качество отдельных разбиений.</div>
</div>

---
title: "Random Forest: новые кандидаты в каждом узле"
clicks: 2
---

<!-- S63 -->
<WeekElevenHeader section="Random Forest" title="Random Forest: новые кандидаты в каждом узле" />
<div class="w11-body ">
<div class="w11-small">Для дерева выбрали бутстреп строк. В каждом узле заново выбираем 3 из 6 признаков и ищем лучший порог среди них.</div><div class="w11-node-stage"><div class="w11-node"><div class="w11-small">Корень</div><div>Площадь · этаж · лифт</div><strong>Лучшее разбиение: площадь</strong></div><div class="w11-branches"><div v-click="1" class="w11-reveal"><div class="w11-node"><div class="w11-small">Левый потомок</div><div>Район · возраст · комнаты</div><strong>Лучшее разбиение: район</strong></div></div><div v-click="2" class="w11-reveal"><div class="w11-node"><div class="w11-small">Правый потомок</div><div>Площадь · возраст · лифт</div><strong>Лучшее разбиение: возраст</strong></div></div></div></div><div class="w11-result">Случайность задаёт список кандидатов; победителя выбирает критерий качества разбиения.</div>
</div>

---
title: "Правило разбиения в случайном лесу"
---

<!-- S64 -->
<WeekElevenHeader section="Random Forest" title="Правило разбиения в случайном лесу" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-note">Вспомним критерий CART <MathBlock formula="Q_v(j,t)" class="w11-inline" :display="false" /> — качество разбиения узла <MathBlock formula="v" class="w11-inline" :display="false" /> по признаку <MathBlock formula="j" class="w11-inline" :display="false" /> и порогу <MathBlock formula="t" class="w11-inline" :display="false" /> (например, взвешенная неоднородность потомков).</div>
<table class="w11-table "><thead><tr><th scope="col">Обычное дерево</th><th scope="col">Случайный лес</th></tr></thead><tbody><tr><td>Все <MathBlock formula="p" class="w11-inline" :display="false" /> признаков доступны.</td><td>Случайный набор <MathBlock formula="\mathcal F_v\subseteq\{1,\ldots,p\}" class="w11-inline" :display="false" />, <MathBlock formula="|\mathcal F_v|=m" class="w11-inline" :display="false" />.</td></tr></tbody></table>
<MathBlock formula="\begin{aligned} \text{CART:}\quad &amp;(j_v^*,t_v^*)\in\arg\min_{j\in\{1,\ldots,p\},\ t\in\mathcal T_j}Q_v(j,t),\\ \text{RF:}\quad &amp;(j_v^*,t_v^*)\in\arg\min_{j\in\mathcal F_v,\ t\in\mathcal T_j}Q_v(j,t). \end{aligned}" class="w11-main-math" />
<div class="w11-note"><MathBlock formula="\mathcal T_j" class="w11-inline" :display="false" /> — допустимые пороги по признаку <MathBlock formula="j" class="w11-inline" :display="false" /> в текущем узле.</div>
<div class="w11-insight"><strong>Вывод:</strong> изменяется множество кандидатов; выбираем лучшее доступное разбиение по прежнему критерию.</div>
</div>

---
title: "Обучение дерева, бэггинга и случайного леса"
---

<!-- S65 -->
<WeekElevenHeader section="Random Forest" title="Обучение дерева, бэггинга и случайного леса" />
<div class="w11-body w11-v3 w11-dense w11-comp w11-tight-copy">
<div class="w11-note">В лесу для каждого дерева берём бутстреп строк; признаки-кандидаты выбираем заново в каждом узле.</div>
<table class="w11-table"><thead><tr><th scope="col">Метод</th><th scope="col">Строки для каждого дерева</th><th scope="col">Кандидаты в узле</th></tr></thead><tbody><tr><td>Обычное дерево</td><td>Вся выборка</td><td>Все признаки</td></tr><tr><td>Бэггинг деревьев</td><td>Своя бутстреп-выборка</td><td>Все признаки</td></tr><tr><td>Random subspaces + bagging</td><td>Своя бутстреп-выборка</td><td>Один случайный набор на всё дерево</td></tr><tr><td>Классический RF</td><td>Своя бутстреп-выборка</td><td>Новый случайный набор в каждом узле</td></tr></tbody></table>
<div class="w11-note">В RF признак, отсутствующий среди кандидатов в одном узле, может стать доступным в другом.</div>
<div class="w11-insight">При <MathBlock formula="m=p" class="w11-inline" :display="false" /> и одинаковых прочих настройках получаем бэггинг деревьев.</div>
<div class="w11-note">Деревья можно обучать параллельно: каждому нужны исходные данные и собственные случайные решения, прогнозы других деревьев не требуются.</div>
</div>



---
title: "Прогноз леса в регрессии"
---

<!-- S66 -->
<WeekElevenHeader section="Random Forest" title="Прогноз леса в регрессии" />
<div class="w11-body">
<div class="w11-text">Каждое дерево b отправляет один и тот же новый объект x в свой лист. Получаем числовой прогноз Tᵦ(x) и усредняем прогнозы B деревьев:</div>
<MathBlock formula="\hat f_{\mathrm{RF}}(x)=\frac1B\sum_{b=1}^B T_b(x)." class="w11-main-math" />
<div class="w11-result">Условный пример: три дерева дали прогнозы 8, 10 и 12. Лес предсказывает 10. В классификации номера классов не имеют числового смысла.</div>
</div>

---
title: "Прогноз леса в классификации"
clicks: 1
---

<!-- S67 -->
<WeekElevenHeader section="Random Forest" title="Прогноз леса в классификации" />
<div class="w11-body w11-v3 w11-dense w11-comp">
<div class="w11-text">В scikit-learn дерево b оценивает вероятность класса k его долей в листе, куда попал x (с учётом весов). Лес усредняет оценки и выбирает класс с наибольшим средним.</div>
<MathBlock formula="\hat p_{\mathrm{RF}}(k\mid x)=\frac1B\sum_{b=1}^B\hat p_b(k\mid x),\qquad \hat y_{\mathrm{RF}}(x)\in\arg\max_k\hat p_{\mathrm{RF}}(k\mid x)." />
<table class="w11-table "><thead><tr><th scope="col">Дерево</th><th scope="col">Оценка вероятности класса 1</th><th scope="col">Голос</th></tr></thead><tbody><tr><td>1</td><td>0,90</td><td>1</td></tr><tr><td>2</td><td>0,49</td><td>0</td></tr><tr><td>3</td><td>0,49</td><td>0</td></tr></tbody></table><div v-click="1" class="w11-reveal"><div class="w11-result">Условный пример: оценки класса 1 равны 0,90; 0,49; 0,49. Голоса 1, 0, 0 дают класс 0. При усреднении оценок получаем 0,627 и класс 1. Правила агрегации могут дать разные ответы.</div></div>
</div>

---
title: "Как число признаков-кандидатов влияет на лес?"
---

<!-- S68 -->
<WeekElevenHeader section="Random Forest" title="Как число признаков-кандидатов влияет на лес?" />
<div class="w11-body w11-v3 ">
<div class="w11-text">Параметр <MathBlock formula="m" class="w11-inline" :display="false" /> (<code>max_features</code>) задаёт число признаков-кандидатов при поиске разбиения.</div>
<table class="w11-table w11-pair-table"><thead><tr><th scope="col">Мало кандидатов</th><th scope="col">Много кандидатов</th></tr></thead><tbody><tr><td>Деревья могут сильнее различаться.</td><td>Сильные признаки доступны чаще.</td></tr><tr><td>Возможна потеря качества отдельных разбиений.<div class="w11-chips" role="img" aria-label="2 из 6"><span>1</span><span>2</span><span class="w11-inactive">3</span><span class="w11-inactive">4</span><span class="w11-inactive">5</span><span class="w11-inactive">6</span></div></td><td>Деревья могут стать более похожими.<div class="w11-chips" role="img" aria-label="5 из 6"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span class="w11-inactive">6</span></div></td></tr></tbody></table>
<div class="w11-insight">Нужно учитывать качество базовых прогнозов и их сходство. Подходящее значение <MathBlock formula="m" class="w11-inline" :display="false" /> выбирают по проверочным данным.</div>
</div>

---
title: "Эксперимент: качество леса и сходство деревьев"
clicks: 1
---

<!-- S69 -->
<WeekElevenHeader section="Random Forest" title="Эксперимент: качество леса и сходство деревьев" />
<div class="w11-body w11-v3 w11-dense w11-rf-compare">
<div class="w11-note">2 информативных и 8 шумовых признаков (данные «полумесяцы»); 150 деревьев; одно разбиение train/validation. По горизонтали — число кандидатов <MathBlock formula="m" class="w11-inline" :display="false" />.</div>
<div class="w11-figure w11-rf-figure" style="--fig-h:268px"><div class="w11-image"><img src="/assets/week-11/07_rf_features_tradeoff.png" alt="Качество ансамбля и средняя корреляция вероятностных прогнозов" /></div></div>
<div class="w11-chart-copy"><div class="w11-note w11-panel-caption"><strong>Слева:</strong> ROC AUC леса на validation; в этом разбиении максимум при <MathBlock formula="m=4" class="w11-inline" :display="false" />.</div><div class="w11-note w11-panel-caption"><strong>Справа:</strong> средняя корреляция вероятностных прогнозов по 200 парам деревьев; сходство растёт.</div></div>
<div v-click="1" class="w11-reveal "><div class="w11-insight w11-narrow-note">Правая панель сравнивает прогнозы уже обученных деревьев на разных проверочных объектах. В теоретической формуле <MathBlock formula="\rho" class="w11-inline" :display="false" /> относилась к прогнозам в одном <MathBlock formula="x" class="w11-inline" :display="false" /> при повторном обучении. Эти корреляции измеряют разные величины.</div></div>
</div>



---
title: "Зачем лесу гибкие деревья?"
---

<!-- S70 -->
<WeekElevenHeader section="Random Forest" title="Зачем лесу гибкие деревья?" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-note">Фиксируем <MathBlock formula="x_0" class="w11-inline" :display="false" />. Каждая точка слева — прогноз отдельного дерева после обучения, справа — прогноз ансамбля после обучения.</div>
<div class="w11-grid w11-balanced"><div class="w11-figure" style="--fig-h:328px"><div class="w11-image"><img src="/assets/week-11/13_forest_target.png" alt="Мишени: глубокое дерево и ансамбль" /></div></div><div class="w11-repers"><div class="w11-note"><strong>Типичный полезный случай:</strong> глубокие деревья способны описывать сложную зависимость, имеют относительно небольшое смещение и большой разброс.</div><div class="w11-note"><strong>Усреднение:</strong> если прогнозы достаточно различаются, ансамбль может уменьшить разброс, сохранив небольшое смещение.</div></div></div>
<div class="w11-insight">Глубина и размер листьев влияют на обе компоненты ошибки; их подбирают по данным.</div>
</div>

---
title: "Сколько деревьев нужно?"
---

<!-- S71 -->
<WeekElevenHeader section="Random Forest" title="Сколько деревьев нужно?" />
<div class="w11-body w11-v3 ">
<div class="w11-note">В модели с одинаковыми дисперсиями и попарной корреляцией:</div>
<MathBlock formula="\operatorname{Var}(\bar T_B)=\tau^2\left(\rho+\frac{1-\rho}{B}\right)." class="w11-main-math" />
<div class="w11-note"><strong>При росте <MathBlock formula="B" class="w11-inline" :display="false" />:</strong></div>
<div class="w11-repers "><div class="w11-text">вклад индивидуальных колебаний уменьшается всё медленнее;</div><div class="w11-text">на фиксированной таблице средний прогноз леса стабилизируется;</div><div class="w11-text">затраты на обучение, хранение и прогнозирование растут.</div></div>
<div class="w11-note">На проверочных данных метрика может немного ухудшиться при добавлении дерева.</div>
<div class="w11-insight"><strong>Практически:</strong> построить кривую проверочного качества от числа деревьев и найти область небольших улучшений.</div>
</div>

---
title: "Почему лес плохо экстраполирует?"
---

<!-- S72 -->
<WeekElevenHeader section="Random Forest" title="Почему лес плохо экстраполирует?" />
<div class="w11-body">
<div class="w11-grid w11-wide"><div class="w11-figure" style="--fig-h:355px"><div class="w11-image"><img src="/assets/week-11/12_rf_extrapolation.png" alt="Прогноз случайного леса постоянен правее области обучения, истинная зависимость растёт" /></div></div><div class="w11-stack"><div class="w11-small">Синтетический пример: точки — train, чёрный пунктир — истина, синяя линия — лес. По x — признак; по y — ответ или прогноз.</div><div class="w11-text">Правее x = 2 нет обучающих точек. Лес усредняет значения крайних листьев и не продолжает растущий тренд.</div></div></div><MathBlock formula="\min_{i\in\mathrm{train}} y_i\le\hat f_{\mathrm{RF}}(x)\le\max_{i\in\mathrm{train}} y_i" /><div class="w11-small">Средние в листьях и по деревьям используют неотрицательные веса. Поэтому обычный регрессионный лес с такими листьями остаётся в диапазоне обучающих ответов.</div>
</div>

---
title: "Random Forest: итог и гиперпараметры"
---

<!-- S73 -->
<WeekElevenHeader section="Random Forest" title="Random Forest: итог и гиперпараметры" />
<div class="w11-body w11-v3 ">
<div class="w11-text">Random Forest сочетает бутстреп строк, случайный выбор признаков-кандидатов в каждом узле и агрегацию прогнозов деревьев.</div>
<table class="w11-table "><thead><tr><th scope="col">Гиперпараметр</th><th scope="col">Роль</th></tr></thead><tbody><tr><td><code>n_estimators</code></td><td>Число деревьев и вычислительные затраты</td></tr><tr><td><code>max_features</code></td><td>Размер случайного набора кандидатов в узле</td></tr><tr><td><code>max_depth</code></td><td>Максимальная глубина деревьев</td></tr><tr><td><code>min_samples_leaf</code></td><td>Минимальный размер листа</td></tr></tbody></table>
<div class="w11-insight">Эффективность ансамбля зависит от качества и совместной изменчивости его базовых прогнозов. Настройки сравниваем по проверочной ошибке.</div>
</div>

---
title: "Out-of-bag (OOB): объекты вне бутстреп-выборки"
clicks: 1
---

<!-- S74 -->
<WeekElevenHeader section="Out-of-bag" title="Out-of-bag (OOB): объекты вне бутстреп-выборки" part="6" />
<div class="w11-body w11-v3 ">
<div class="w11-text">Ошибка на обучающих данных обычно даёт слишком оптимистичную оценку качества. Но при бутстрепе часть исходных строк не участвует в обучении конкретного дерева.</div>
<div class="w11-definition"><strong>Out-of-bag (OOB)</strong> — исходные наблюдения, индексы которых ни разу не выбраны в бутстреп-выборку данного дерева.</div>
<table class="w11-table "><thead><tr><th scope="col">Исходные индексы</th><th scope="col">Бутстреп-выборка</th><th scope="col">OOB для этого дерева</th></tr></thead><tbody><tr><td>1, 2, 3, 4, 5</td><td>2, 5, 2, 1, 5</td><td><span v-click="1">3, 4</span></td></tr></tbody></table>
<div v-click="1" class="w11-reveal "><div class="w11-insight">Прогнозы этого дерева для строк 3 и 4 можно использовать для проверки: оно не обучалось на этих строках.</div></div>
</div>



---
title: "Вероятность остаться вне бутстреп-выборки"
clicks: 2
---

<!-- S75 -->
<WeekElevenHeader section="Out-of-bag" title="Вероятность остаться вне бутстреп-выборки" />
<div class="w11-body w11-v3 w11-dense">
<div class="w11-text">Выбираем <MathBlock formula="n" class="w11-inline" :display="false" /> строк с возвращением из <MathBlock formula="n" class="w11-inline" :display="false" /> исходных. <MathBlock formula="I_b" class="w11-inline" :display="false" /> — множество индексов, выбранных для дерева <MathBlock formula="b" class="w11-inline" :display="false" />.</div>
<div class="w11-text">Вероятность не выбрать фиксированный индекс <MathBlock formula="i" class="w11-inline" :display="false" /> при одном извлечении равна <MathBlock formula="1-1/n" class="w11-inline" :display="false" />. Извлечения независимы, поэтому</div>
<div v-click="1" class="w11-reveal "><MathBlock formula="P(i\notin I_b)=\left(1-\frac1n\right)^n." class="w11-main-math" /></div>
<div v-click="2" class="w11-reveal "><div class="w11-note">По второму замечательному пределу:</div><MathBlock formula="\lim_{n\to\infty}\left(1-\frac1n\right)^n=e^{-1}\approx0{,}368." class="w11-main-math" /><div class="w11-insight">У каждой из <MathBlock formula="n" class="w11-inline" :display="false" /> строк одинаковая вероятность отсутствовать. Поэтому ожидаемая доля OOB-строк равна этой вероятности: при больших <MathBlock formula="n" class="w11-inline" :display="false" /> около 36,8%.</div></div>
</div>



---
title: "Какие деревья оценят объект №1?"
clicks: 1
---

<!-- S76 -->
<WeekElevenHeader section="Out-of-bag" title="Какие деревья оценят объект №1?" />
<div class="w11-body w11-tiny-gap">
<div class="w11-small">Строки — деревья. Столбцы — исходные объекты. train: индекс был в бутстрепе; OOB: его не выбрали.</div><div class="w11-figure" style="--fig-h:302px"><div class="w11-image"><img src="/assets/week-11/08_oob_matrix.png" alt="Матрица из пяти деревьев и восьми объектов; в первом столбце OOB у деревьев 2 и 4" /><span aria-hidden="true" class="w11-frame" v-click="1" style="left:17%;width:9%;top:4%;height:83%"></span><span aria-hidden="true" class="w11-frame w11-row-mark" v-click="1" style="left:2.5%;width:23.4%;top:25%;height:12%"></span><span aria-hidden="true" class="w11-frame w11-row-mark" v-click="1" style="left:2.5%;width:23.4%;top:52.5%;height:12%"></span></div></div><div v-click="1" class="w11-reveal"><div class="w11-small"><MathBlock formula="\mathcal B_1" class="w11-inline" :display="false" /> — множество индексов деревьев, не обучавшихся на объекте №1.</div><MathBlock formula="\mathcal B_1=\{2,4\},\qquad \hat f_{\mathrm{OOB}}(x_1)=\tfrac12[T_2(x_1)+T_4(x_1)]." /><div class="w11-small">Условно: T₂ даёт 8, T₄ даёт 12. Средний прогноз — 10; при фактическом y₁ = 11 квадрат ошибки равен 1.</div></div>
</div>



---
title: "OOB-прогноз и OOB-ошибка"
clicks: 1
---

<!-- S77 -->
<WeekElevenHeader section="Out-of-bag" title="OOB-прогноз и OOB-ошибка" />
<div class="w11-body w11-v3 ">
<div class="w11-text"><strong>Шаг 1.</strong> Для каждой строки <MathBlock formula="i" class="w11-inline" :display="false" /> берём множество <MathBlock formula="\mathcal B_i=\{b:i\notin I_b\}" class="w11-inline" :display="false" /> деревьев, которые её не видели, и усредняем их прогнозы:</div>
<MathBlock formula="\hat f_{\mathrm{OOB}}(x_i)=\frac1{|\mathcal B_i|}\sum_{b\in\mathcal B_i}T_b(x_i),\qquad |\mathcal B_i|&gt;0." class="w11-main-math" />
<div v-click="1" class="w11-reveal "><div class="w11-text"><strong>Шаг 2.</strong> Сравниваем OOB-прогнозы с известными ответами. Например, если прогноз определён для всех <MathBlock formula="n" class="w11-inline" :display="false" /> строк:</div><MathBlock formula="\mathrm{MSE}_{\mathrm{OOB}}=\frac1n\sum_{i=1}^n(y_i-\hat f_{\mathrm{OOB}}(x_i))^2." class="w11-main-math" /><div class="w11-insight">При малом числе деревьев некоторые строки могут не иметь OOB-прогноза. Проверяем покрытие.</div></div>
</div>

---
title: "Train, OOB, validation, CV и test"
---

<!-- S78 -->
<WeekElevenHeader section="Out-of-bag" title="Train, OOB, validation, CV и test" />
<div class="w11-body w11-v3 ">
<table class="w11-table "><thead><tr><th scope="col">Способ оценки</th><th scope="col">Для чего</th><th scope="col">Ограничение</th></tr></thead><tbody><tr><td>Train</td><td>Диагностика подгонки</td><td>Обычно оптимистична</td></tr><tr><td>OOB</td><td>Сравнение настроек бутстреп-ансамбля</td><td>У каждого объекта свой набор деревьев</td></tr><tr><td>Validation</td><td>Сравнение моделей и настроек</td><td>Зависит от разбиения</td></tr><tr><td>CV</td><td>Сравнение на нескольких разбиениях</td><td>Требует нескольких обучений</td></tr><tr><td>Независимый test</td><td>Итоговая оценка после подбора</td><td>Не участвует в выборе</td></tr></tbody></table>
<div class="w11-insight">Обычный OOB не заменяет корректную проверку для временных рядов, связанных наблюдений или данных с утечкой при подготовке признаков.</div>
</div>

---
title: "Подбор гиперпараметров: CV или OOB"
---

<!-- S79 -->
<WeekElevenHeader section="Out-of-bag" title="Подбор гиперпараметров: CV или OOB" />
<div class="w11-body w11-v3 ">
<div class="w11-text">Одна сетка гиперпараметров. Для каждой комбинации:</div>
<table class="w11-table w11-pair-table"><thead><tr><th scope="col">Grid search + CV</th><th scope="col">Grid search + OOB</th></tr></thead><tbody><tr><td>Обучаем <MathBlock formula="K" class="w11-inline" :display="false" /> лесов, каждый раз оставляя один фолд для проверки; усредняем валидационные оценки.</td><td>Обучаем один бутстреп-лес и рассчитываем OOB-метрику.</td></tr><tr><td><code>GridSearchCV</code></td><td><code>ParameterGrid</code>, <code>oob_score=True</code></td></tr></tbody></table>
<div class="w11-note">OOB может потребовать меньше вычислений; выбор настройки по OOB и по CV может различаться.</div>
<div class="w11-insight"><strong>После подбора:</strong> проверяем выбранную модель на независимом test.</div>
<div class="w11-text">Бутстреп выполняет две роли: создаёт разнообразие обучающих наборов и оставляет наблюдения для внутренней проверки.</div>
</div>

---
title: "Два способа управлять обобщением"
---

<!-- S80 -->
<WeekElevenHeader section="Итоги" title="Два способа управлять обобщением" />
<div class="w11-body ">
<MathBlock formula="R(x)=\sigma^2(x)+\operatorname{Bias}^2(x)+\operatorname{Var}_D(\hat f_D(x))." /><div class="w11-grid w11-top"><div class="w11-rail"><b>Регулировать гибкость</b><div>Ограничения одиночной модели часто снижают разброс ценой увеличения смещения.</div></div><div class="w11-rail"><b>Агрегировать модели</b><div>Усреднение может снизить разброс, когда полезные базовые прогнозы не полностью коррелируют.</div></div></div><div class="w11-result">Шум при той же информации общий. Пользу любого изменения проверяем на новых данных.</div>
</div>



---
title: "От нестабильного дерева к случайному лесу"
---

<!-- S81 -->
<WeekElevenHeader section="Итоги" title="От нестабильного дерева к случайному лесу" />
<div class="w11-body w11-v3 ">
<div class="w11-steps w11-end-map"><div class="w11-step"><i aria-hidden="true">1</i><div class="w11-text"><strong>Bias–variance decomposition</strong> — отделяем шум, систематический сдвиг и разброс прогнозов.</div></div><div class="w11-step"><i aria-hidden="true">2</i><div class="w11-text"><strong>Усреднение</strong> — уменьшаем разброс; совместные колебания ограничивают выигрыш.</div></div><div class="w11-step"><i aria-hidden="true">3</i><div class="w11-text"><strong>Bagging</strong> — создаём разные обучающие выборки из одной таблицы с помощью bootstrap.</div></div><div class="w11-step"><i aria-hidden="true">4</i><div class="w11-text"><strong>Random Forest</strong> — дополнительно разнообразим деревья случайным выбором признаков в узлах.</div></div><div class="w11-step"><i aria-hidden="true">5</i><div class="w11-text"><strong>Out-of-bag</strong> — оцениваем прогнозы по деревьям, которые не видели проверяемую строку.</div></div></div>
<div class="w11-insight">Качество выбранной модели подтверждаем на независимых данных.</div>
</div>
