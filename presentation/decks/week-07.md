---
theme: default
title: Метод ближайших соседей и многоклассовая классификация
author: НИУ ВШЭ
info: |
  Неделя 7. Метод ближайших соседей и многоклассовая классификация.
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
  class: week07 text-[23px]
duration: 90min
appendixSlides: 0
exportFilename: week-07-knn-multiclass
download: false
---

<!-- S01 -->
<WeekSevenFrame>
<div class="section-kicker">Классическое машинное обучение · Неделя 7</div>
<div class="w7-cover"><div><h1>Метод ближайших соседей<br>и многоклассовая классификация</h1><div class="w7-question">Как похожесть объектов<br>превращается в прогноз</div></div><WeekSevenPlot name="cover" :height="390" alt="Обучающие объекты двух классов и новая точка со знаком вопроса" /></div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S02 -->
<WeekSevenFrame section="Локальное правило" title="Что у нас уже есть">
<div class="w7-three w7-text"><div class="w7-rail">Линейная модель<br><br>Коэффициенты задают общую зависимость.</div><div class="w7-rail">Логистическая регрессия<br><br>Score превращается в вероятность.</div><div class="w7-rail">Кросс-валидация<br><br>Проверяем качество настройки.</div></div>
<div v-click="1" class="w7-question w7-line">Можно ли делать прогноз, не подбирая одну глобальную формулу?</div>
</WeekSevenFrame>

---

<!-- S03 -->
<WeekSevenFrame section="Локальное правило" title="Линейная граница и сложная геометрия классов">
<div class="w7-row"><WeekSevenPlot name="global" alt="Одна линейная граница не разделяет два переплетённых полумесяца" /><div class="w7-col"><div class="w7-text">В исходных признаках одной прямой недостаточно.</div><div class="w7-note">Преобразования признаков могут изменить ситуацию.</div><div class="w7-question">А если известны метки ближайших наблюдений?</div></div></div>
</WeekSevenFrame>

---
clicks: 2
---

<!-- S04 -->
<WeekSevenFrame section="Локальное правило" title="Предсказать по одному ближайшему объекту">
<div class="w7-row"><WeekSevenPlot name="nearest" :step="$clicks" alt="Обучающие точки, затем новая точка, затем выделенный ближайший сосед" /><div class="w7-col"><div class="w7-text">Обучающие точки имеют известные классы.</div><div v-click="1" class="w7-question">Какой класс назначить новой точке?</div><div v-click="2" class="w7-result">Ближайший — объект №7, класс A.<br>Прогноз новой точки — A.</div></div></div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S05 -->
<WeekSevenFrame section="Локальное правило" title="Запишем 1NN математически">
<div class="w7-row"><WeekSevenPlot name="nearest" :step="2" :height="325" alt="Номера обучающих объектов и ближайший к новой точке сосед" /><div class="w7-col"><MathBlock formula="i^*(x)\in\arg\min_{i=1,\ldots,n}d(x,x_i)" class="w7-math" /><div class="w7-text">Ищем <strong>индекс</strong> ближайшего объекта.</div><MathBlock v-click="1" formula="\hat y(x)=y_{i^*(x)}" class="w7-large" /></div></div>
<div class="w7-note"><MathBlock formula="x" :display="false" class="w7-inline" /> — новый объект; <MathBlock formula="i" :display="false" class="w7-inline" /> — номер обучающего; <MathBlock formula="d" :display="false" class="w7-inline" /> — расстояние. Для другого объекта ближайший индекс может быть другим.</div>
</WeekSevenFrame>

---
clicks: 3
---

<!-- S06 -->
<WeekSevenFrame section="Геометрия соседства" title="От ближайшей точки к областям Вороного">
<div class="w7-row"><WeekSevenPlot name="voronoi" :step="$clicks" :height="390" alt="Те же точки: одна ячейка ближайшего соседа, все ячейки, затем их окраска по классам" /><div class="w7-col"><div class="w7-question">Где ближайший объект остаётся тем же?</div><div v-click="1" class="w7-text">Все такие точки образуют его ячейку Вороного.</div><div v-click="2" class="w7-text">Каждому наблюдению — своя ячейка.</div><div v-click="3" class="w7-result">Граница классов проходит между ячейками разных классов.</div></div></div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S07 -->
<WeekSevenFrame section="Геометрия соседства" title="Цена избыточной локальности">
<div class="w7-row"><WeekSevenPlot name="outlier" :step="$clicks" alt="Добавленная необычная точка создаёт локальный участок своего класса в решении 1NN" /><div class="w7-col"><div class="w7-text">Одна обучающая точка получает собственную область решений.</div><div v-click="1" class="w7-result">Случайная ошибка разметки может изменить прогнозы вокруг неё.</div></div></div>
<div class="w7-question">Идеальная подстройка к train не гарантирует устойчивых новых прогнозов.</div>
</WeekSevenFrame>

---
clicks: 2
---

<!-- S08 -->
<WeekSevenFrame section="Голосование соседей" title="Не один, а k ближайших">
<div class="w7-row"><WeekSevenPlot name="vote" :step="$clicks" alt="Новая точка и последовательно один, три, пять ближайших наблюдений" /><div class="w7-col"><MathBlock :formula="'k='+[1,3,5][$clicks]" class="w7-large" /><div class="w7-text">Каждый выбранный сосед голосует за свой класс.</div><div class="w7-result">Класс с наибольшим числом голосов становится прогнозом.</div></div></div>
</WeekSevenFrame>

---
clicks: 2
---

<!-- S09 -->
<WeekSevenFrame section="Голосование соседей" title="Правило голосования">
<MathBlock formula="\mathcal N_k(x)\text{ — индексы }k\text{ ближайших обучающих объектов}" class="w7-math" />
<MathBlock v-click="1" formula="V_c(x)=\sum_{i\in\mathcal N_k(x)}\mathbb I(y_i=c)" class="w7-large" />
<div v-click="1" class="w7-text">Индикатор равен 1 для соседа класса c и 0 для остальных. Сумма — голоса за класс.</div>
<MathBlock v-click="2" formula="\hat y(x)\in\arg\max_{c\in\mathcal Y}V_c(x),\qquad \mathcal Y=\{1,\ldots,K\}" class="w7-math" />
<div v-click="2" class="w7-note">Argmax выбирает класс-победитель. Для ничьей нужно заранее заданное правило.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S10 -->
<WeekSevenFrame section="Голосование соседей" title="Одно голосование, три класса">
<div class="w7-row"><WeekSevenPlot name="vote" :step="2" :height="365" alt="Пять выбранных соседей: три A, один B и один C" /><div class="w7-col"><table class="w7-table"><thead><tr><th>Сосед</th><th>Расстояние</th><th>Класс</th></tr></thead><tbody><tr><td>1</td><td>0.4</td><td>A</td></tr><tr><td>2</td><td>0.6</td><td>B</td></tr><tr><td>3</td><td>0.7</td><td>A</td></tr><tr><td>4</td><td>0.9</td><td>C</td></tr><tr><td>5</td><td>1.1</td><td>A</td></tr></tbody></table><MathBlock v-click="1" formula="(V_A,V_B,V_C)=(3,1,1)\Rightarrow\hat y=A" class="text-[26px]" /></div></div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S11 -->
<WeekSevenFrame section="Голосование соседей" title="Локальные доли классов">
<MathBlock formula="\hat p_c(x)=\frac1k\sum_{i\in\mathcal N_k(x)}\mathbb I(y_i=c)" class="w7-large" />
<MathBlock v-click="1" formula="(3,1,1)\;\xrightarrow{\div5}\;(\hat p_A,\hat p_B,\hat p_C)=(0.6,0.2,0.2)" class="w7-math" />
<div class="w7-text">0.6 означает: 60% выбранных соседей относятся к A.</div>
<div v-click="1" class="w7-result">Доли классов — оценки условных вероятностей. Их качество проверяется на новых данных.</div>
</WeekSevenFrame>

---

<!-- S12 -->
<WeekSevenFrame section="Обучение и применение" title="Что происходит при fit и predict">
<div class="w7-equal"><div class="w7-col"><div class="w7-header">Логистическая регрессия</div><div class="w7-text"><code>fit</code>: оценить коэффициенты.</div><div class="w7-text"><code>predict</code>: применить общую функцию.</div></div><div class="w7-col"><div class="w7-header">kNN</div><div class="w7-text"><code>fit</code>: сохранить train, подготовить поиск.</div><div class="w7-text"><code>predict</code>: расстояния → соседи → голоса.</div></div></div>
<div class="w7-result w7-line">Обучение по примерам: существенная часть работы приходится на прогноз.</div>
<div class="w7-note">Instance-based / lazy learning. Настройки kNN: число соседей, расстояние и веса.</div>
</WeekSevenFrame>

---

<!-- S13 -->
<WeekSevenFrame section="Расстояния и масштаб" title="Какие объекты действительно близки?">
<div class="w7-question">Похожи по длине текста — но различаются по времени обращения.<br>Или наоборот. Какую пару считать более похожей?</div>
<div class="w7-text">Формула расстояния задаёт, какие различия признаков существенны для поиска соседей.</div>
<div class="w7-result w7-line">Разные способы измерять близость могут выбрать разных соседей для одного объекта.</div>
</WeekSevenFrame>

---

<!-- S14 -->
<WeekSevenFrame section="Расстояния и масштаб" title="Евклидово расстояние">
<div class="w7-row"><WeekSevenPlot name="euclidean" alt="Прямой отрезок между x=(1,2) и z=(4,6), стороны треугольника 3 и 4" /><div class="w7-col"><MathBlock formula="d_2(x,z)=\sqrt{\sum_{j=1}^p(x_j-z_j)^2}" class="w7-math" /><MathBlock formula="d_2=\sqrt{3^2+4^2}=5" class="w7-math" /><div class="w7-text">Привычная длина отрезка между точками.</div></div></div>
</WeekSevenFrame>

---

<!-- S15 -->
<WeekSevenFrame section="Расстояния и масштаб" title="Манхэттенское расстояние">
<div class="w7-row"><WeekSevenPlot name="v2-streets" :height="390" alt="Прямоугольная сетка улиц: из x=(1,2) в z=(4,6) идём три квартала вправо и четыре вверх" /><div class="w7-col"><div class="w7-text">По прямоугольной сетке улиц идём вдоль кварталов, без движения наискосок.</div><MathBlock formula="d_1(x,z)=\sum_{j=1}^p|x_j-z_j|" class="w7-math" /><MathBlock formula="d_1=3+4=7" class="w7-large" /></div></div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S16 -->
<WeekSevenFrame section="Расстояния и масштаб" title="Разные расстояния — разные соседи">
<div class="w7-row"><WeekSevenPlot name="metric" :step="$clicks" alt="Для x=(0,0) L1 выбирает A=(4,0), а L2 выбирает B=(2.5,2.5)" /><div class="w7-col"><MathBlock formula="\begin{aligned}x&=(0,0),\\A&=(4,0),\\B&=(2.5,2.5).\end{aligned}" class="text-[26px]" /><table class="w7-table"><thead><tr><th></th><th>До A</th><th>До B</th></tr></thead><tbody><tr :class="{focus:$clicks===0}"><td>L1</td><td>4</td><td>5</td></tr><tr :class="{focus:$clicks===1}"><td>L2</td><td>4</td><td>≈ 3.54</td></tr></tbody></table><div class="w7-result">Выбор метрики — часть задания модели.</div></div></div>
</WeekSevenFrame>

---

<!-- S17 -->
<WeekSevenFrame section="Расстояния и масштаб" title="Семейство расстояний Минковского">
<MathBlock formula="d_q(x,z)=\left(\sum_{j=1}^{p}|x_j-z_j|^q\right)^{1/q},\qquad q\ge1" class="w7-math" />
<div class="w7-row"><WeekSevenPlot name="v2-norms" :height="300" alt="Границы единичных окрестностей: ромб L1, окружность L2 и квадрат L бесконечность" /><div class="w7-col"><div class="w7-text">q = 1: манхэттенское.<br>q = 2: евклидово.<br>q → ∞: расстояние Чебышёва.</div><MathBlock formula="d_\infty(x,z)=\max_j|x_j-z_j|" class="text-[29px]" /><div class="w7-note">Определяется наибольшим различием координат.</div></div></div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S18 -->
<WeekSevenFrame section="Расстояния и масштаб" title="Когда важнее направление, чем длина">
<div class="w7-text">Тексты разного объёма могут иметь похожие относительные частоты слов. Сравним направления их векторов.</div>
<div class="w7-row" style="grid-template-columns:1fr 1.15fr"><WeekSevenPlot name="v2-cosine" :height="310" alt="Сонаправленные векторы x=(1,0) и z=(10,0): длины различны, но угол равен нулю" /><div class="w7-col"><MathBlock formula="\mathrm{sim}_{cos}(x,z)=\frac{x^\top z}{\|x\|_2\|z\|_2}=\cos\theta" class="text-[30px]" /><div class="w7-text">Для этих двух векторов сходство равно 1.</div><MathBlock v-click="1" formula="\mathrm{dist}_{cos}=1-\mathrm{sim}_{cos}" class="text-[29px]" /></div></div>
<div class="w7-result">Расстояние: меньше — ближе. Сходство: больше — похожее направление.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S19 -->
<WeekSevenFrame section="Расстояния и масштаб" title="Масштаб меняет ближайшего соседа">
<div class="w7-row" style="grid-template-columns:1fr 1.2fr"><WeekSevenPlot name="v2-scaling" :step="$clicks" alt="После деления второго признака на 10 точки x, A, B переходят в x', A', B'; ближайшей становится A' вместо B" /><div class="w7-col"><MathBlock v-if="$clicks===0" formula="x=(0,0),\ A=(1,8),\ B=(3,0)" class="text-[27px]" /><MathBlock v-else formula="x'=(0,0),\ A'=(1,0.8),\ B'=(3,0)" class="text-[27px]" /><MathBlock v-if="$clicks===0" formula="d(x,A)=\sqrt{65}\approx8.06" class="text-[29px]" /><MathBlock v-else formula="d(x',A')=\sqrt{1.64}\approx1.28" class="text-[29px]" /><MathBlock v-if="$clicks===0" formula="d(x,B)=3" class="w7-math" /><MathBlock v-else formula="d(x',B')=3" class="w7-math" /><div class="w7-result">Ближайший: {{ $clicks===0?'B':"A′" }}.</div></div></div>
<div class="w7-text">Объекты те же. Смена единиц измерения может изменить прогноз kNN.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S20 -->
<WeekSevenFrame section="Расстояния и масштаб" title="StandardScaler: различия относительно разброса">
<MathBlock formula="z=\frac{x-\mu_{\mathrm{train}}}{s_{\mathrm{train}}}" class="w7-large" />
<WeekSevenPlot name="v2-standard" :step="$clicks" :height="205" alt="Значения одного признака 10,20,30: среднее 20, стандартное отклонение 8.165; переход к -1.225,0,1.225" />
<div class="w7-text">В kNN разность по каждой координате теперь измеряется в единицах её обучающего стандартного отклонения.</div>
<div class="w7-note">Статистики — только по train, внутри CV — по train-фолду. При выбросах используют и другие способы, например RobustScaler.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S21 -->
<WeekSevenFrame section="Расстояния и масштаб" title="MinMaxScaler: обучающий диапазон в [0,1]">
<MathBlock formula="x_{\mathrm{scaled}}=\frac{x-\min_{\mathrm{train}}}{\max_{\mathrm{train}}-\min_{\mathrm{train}}}" class="w7-math" />
<WeekSevenPlot name="v2-minmax" :step="$clicks" :height="230" alt="Обучающие значения 10,20,30 переходят в 0,0.5,1; новое значение 40 переходит в 1.5" />
<MathBlock v-click="1" formula="x_{\mathrm{new}}=40\quad\Rightarrow\quad\frac{40-10}{30-10}=1.5" class="w7-math" />
<div class="w7-text">Новые значения могут выходить за [0,1]. Минимум и максимум берём только по соответствующей обучающей части.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S22 -->
<WeekSevenFrame section="Голосование соседей" title="От одинаковых голосов — к весам соседей">
<div class="w7-text">Более близкому соседу можно дать больший вес. Для выбранных k соседей задаём неотрицательные веса:</div>
<MathBlock formula="w_i(x)\ge0,\qquad\sum_{i\in\mathcal N_k(x)}w_i(x)>0" class="w7-math" />
<MathBlock v-click="1" formula="\hat p_c(x)=\frac{\sum_{i\in\mathcal N_k(x)}w_i(x)\mathbb I(y_i=c)}{\sum_{i\in\mathcal N_k(x)}w_i(x)}" class="w7-large" />
<div v-click="1" class="w7-text">Сверху — вес соседей класса c. Снизу — вес всех выбранных соседей.</div>
<div v-click="1" class="w7-result">Одинаковые веса возвращают обычную долю голосов.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S23 -->
<WeekSevenFrame section="Голосование соседей" title="Обычные и взвешенные голоса">
<div class="w7-row"><WeekSevenPlot name="weighted" alt="Один красный сосед на расстоянии 0.2 и два синих на расстояниях 1 и 1.2" /><div class="w7-col"><div class="w7-text">Без весов: красный — 1 голос, синий — 2.</div><MathBlock v-click="1" formula="w_i(x)=\frac1{d(x,x_i)}" class="w7-math" /><MathBlock v-click="1" formula="\begin{aligned}V_{red}&=5,\\V_{blue}&=1+\frac1{1.2}\approx1.83.\end{aligned}" class="text-[29px]" /><div v-click="1" class="w7-result">Близкий красный сосед перевесил двух дальних синих.</div></div></div>
<div class="w7-note">При ненулевых расстояниях. Нулевые расстояния требуют отдельного правила.</div>
</WeekSevenFrame>

---
clicks: 2
---

<!-- S24 -->
<WeekSevenFrame section="Число соседей и размерность" title="Что меняет число k?">
<div class="w7-row"><WeekSevenPlot name="boundaries" :step="$clicks" alt="Одна выборка, граница kNN при k=1, затем 5 и 25" /><div class="w7-col"><div class="w7-text">Малое k: сильнее реакция на отдельные точки.</div><div v-click="1" class="w7-text">Больше k: сглаживаем локальное голосование.</div><div v-click="2" class="w7-result">Слишком большое k может скрыть полезную структуру.</div></div></div>
<div class="w7-note">Управляем локальностью и гибкостью. Качество не обязано меняться монотонно.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S25 -->
<WeekSevenFrame section="Число соседей и размерность" title="Выбрать k по валидации">
<MathBlock formula="k\in\{1,3,5,7,11,15,21\}" class="w7-large" />
<div class="w7-flow"><div>Те же CV-разбиения</div><span>→</span><div>Обучение и прогнозы</div><span>→</span><div>Сравнение метрики</div></div>
<div class="w7-question">Почему train accuracy подталкивает к k = 1?</div>
<div v-click="1" class="w7-text">Если сама train-точка включена в поиск, она обычно оказывается своим ближайшим соседом. Проверка на новых объектах снимает это преимущество.</div>
<div class="w7-note">Подготовка признаков обучается внутри train-фолда. Финальный test остаётся отдельно.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S26 -->
<WeekSevenFrame section="Число соседей и размерность" title="Близкие соседи должны ещё и найтись">
<div class="w7-text">Хотим узкую окрестность и достаточно наблюдений в ней. При той же относительной стороне её доля пространства быстро уменьшается.</div>
<WeekSevenPlot name="v3-volume" :step="$clicks" :height="320" alt="Отрезок, квадрат и куб: окрестность со стороной 0.2 занимает 20 процентов длины, 4 процента площади и 0.8 процента объёма" />
<div class="w7-note">Идеализируем: равномерное распределение в единичном пространстве; вся окрестность лежит внутри него.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S27 -->
<WeekSevenFrame section="Число соседей и размерность" title="Сколько данных нужно для десяти соседей?">
<div class="w7-row"><WeekSevenPlot name="dimension" :step="1" :height="360" alt="Логарифмический график требуемого n при r=0.2: 50, 250, 31250 и 97656250 для 1,2,5,10 признаков" /><div class="w7-col"><MathBlock formula="\mathbb E[N_{\mathrm{inside}}]=nr^p" class="w7-math" /><MathBlock v-click="1" formula="r=0.2,\quad n\approx\frac{10}{0.2^p}" class="w7-math" /><div v-click="1" class="w7-text">p = 2: нужно 250.<br>p = 10: 97 656 250.</div></div></div>
<div class="w7-result">Если данных мало, kNN найдёт k соседей за счёт более широкой окрестности — ценой локальности.</div>
<div class="w7-note">Числа относятся к равномерному примеру, а не к любым данным с p признаками.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S28 -->
<WeekSevenFrame section="Число соседей и размерность" title="Шумовые координаты меняют само соседство">
<div class="w7-row"><WeekSevenPlot name="noise" :step="$clicks" :height="375" alt="Та же выборка и запрос: соседи по двум полезным или по 32 координатам, включая 30 шумовых" /><div class="w7-col"><div class="w7-header">{{ $clicks===0?'2 полезные координаты':'2 полезные + 30 шумовых' }}</div><div class="w7-text">Кольца и отрезки отмечают выбранных соседей.</div><div class="w7-note">На рисунке всегда показаны только первые две координаты.</div><div v-click="1" class="w7-result">Стандартизация меняет масштаб, но не устраняет нерелевантность признаков.</div></div></div>
<div class="w7-note">KD-tree и BallTree — структуры для ускорения поиска соседей. Их выигрыш зависит от геометрии и размерности данных.</div>
</WeekSevenFrame>

---

<!-- S29 -->
<WeekSevenFrame section="Локальное усреднение" title="Тот же механизм работает в регрессии">
<div class="w7-row"><WeekSevenPlot name="regression" :height="315" alt="kNN-регрессия с пятью соседями: локальные средние образуют ступенчатый прогноз" /><div class="w7-col"><MathBlock formula="\hat f(x)=\frac1k\sum_{i\in\mathcal N_k(x)}y_i" class="w7-math" /><div class="w7-text">Классы голосуют.<br>Числовые ответы усредняются.</div><MathBlock formula="(40+45+50)/3=45" class="text-[29px]" /></div></div>
<div class="w7-result">Цена локальности: fit сохраняет примеры; predict ищет соседей среди train.</div>
</WeekSevenFrame>

---

<!-- S30 -->
<WeekSevenFrame section="Несколько классов" title="От kNN к многоклассовой постановке">
<div class="w7-question">kNN уже выбирает между A, B и C.<br>Как расширить бинарную логистическую регрессию?</div>
<MathBlock formula="Y\in\{1,\ldots,K\}" class="w7-large" />
<div class="w7-text">В многоклассовой классификации объекту соответствует <strong>одна метка</strong> из K взаимоисключающих вариантов.</div>
</WeekSevenFrame>

---

<!-- S31 -->
<WeekSevenFrame section="Несколько классов" title="Что должна выдавать многоклассовая модель">
<div class="w7-three w7-text"><div><div class="w7-header">A · Оплата</div>Списание денег</div><div><div class="w7-header">B · Доставка</div>Движение заказа</div><div><div class="w7-header">C · Техподдержка</div>Ошибка сервиса</div></div>
<div class="w7-text">Для выбора класса достаточно оценок. В вероятностной модели хотим получить согласованный вектор классовых вероятностей:</div>
<MathBlock formula="x\longrightarrow(p_A(x),p_B(x),p_C(x))\longrightarrow\hat y(x)" class="w7-math" />
<MathBlock formula="p_c(x)\ge0,\qquad\sum_{c=1}^Kp_c(x)=1,\qquad\hat y(x)\in\arg\max_c p_c(x)" class="w7-math" />
</WeekSevenFrame>

---

<!-- S32 -->
<WeekSevenFrame section="Несколько классов" title="Начнём со знакомого бинарного классификатора">
<div class="w7-question">Можно ли построить многоклассовую модель из уже знакомых бинарных классификаторов?</div>
<div class="w7-text">Для обращения нужен один из трёх отделов. Но мы уже умеем отвечать на вопрос «относится ли оно к A?».</div>
<div class="w7-result w7-line">Поставим такой вопрос отдельно для каждого класса.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S33 -->
<WeekSevenFrame section="One-vs-Rest" title="One-vs-Rest: A против остальных">
<table class="w7-table"><thead><tr><th>Исходный класс</th><th>Смысл бинарного ответа</th><th>Новая метка</th></tr></thead><tbody><tr class="focus"><td>A · Оплата</td><td>A</td><td>1</td></tr><tr><td>B · Доставка</td><td>Не-A</td><td>0</td></tr><tr><td>C · Техническая проблема</td><td>Не-A</td><td>0</td></tr></tbody></table>
<div v-click="1" class="w7-result">На тех же признаках обучаем знакомую бинарную модель: A против всех остальных.</div>
</WeekSevenFrame>

---
clicks: 2
---

<!-- S34 -->
<WeekSevenFrame section="One-vs-Rest" title="Три самостоятельные бинарные модели">
<table class="w7-table"><thead><tr><th>Истинный класс</th><th>A vs rest</th><th :style="{opacity:$clicks>=1?1:0}">B vs rest</th><th :style="{opacity:$clicks>=2?1:0}">C vs rest</th></tr></thead><tbody><tr v-for="(c,i) in ['A','B','C']" :key="c"><td>{{ c }}</td><td>{{ i===0?1:0 }}</td><td :style="{opacity:$clicks>=1?1:0}">{{ i===1?1:0 }}</td><td :style="{opacity:$clicks>=2?1:0}">{{ i===2?1:0 }}</td></tr></tbody></table>
<div class="w7-text">Признаки объектов одни и те же; для каждой задачи меняем бинарные ответы.</div>
<div v-click="2" class="w7-result">Для K классов обучаем K отдельных классификаторов.</div>
</WeekSevenFrame>

---
clicks: 2
---

<!-- S35 -->
<WeekSevenFrame section="One-vs-Rest" title="Из трёх scores в одну метку">
<table class="w7-table"><thead><tr><th>Объект</th><th>Score A</th><th>Score B</th><th>Score C</th><th>Прогноз</th></tr></thead><tbody><tr><td>1</td><td class="focus">1.4</td><td>0.3</td><td>−0.8</td><td>A</td></tr><tr :style="{opacity:$clicks>=1?1:0}"><td>2</td><td>−0.2</td><td class="focus">1.8</td><td>0.6</td><td>B</td></tr><tr :style="{opacity:$clicks>=2?1:0}"><td>3</td><td>0.2</td><td>−0.1</td><td class="focus">1.1</td><td>C</td></tr></tbody></table>
<MathBlock formula="\hat y(x)\in\arg\max_c s_c(x)" class="w7-large" />
<div class="w7-note">Для бинарных логистических моделей сравнение сигмоид даёт тот же порядок: сигмоида строго возрастает.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S36 -->
<WeekSevenFrame section="One-vs-Rest" title="Три бинарные вероятности ещё не распределение">
<MathBlock formula="(\hat p_A^{bin},\hat p_B^{bin},\hat p_C^{bin})=(0.8,0.7,0.3),\qquad\sum_c\hat p_c^{bin}=1.8" class="text-[30px]" />
<div class="w7-question">У объекта один правильный класс. Можно ли считать эти числа его распределением?</div>
<MathBlock v-click="1" formula="\hat p_c^{OvR}=\frac{\hat p_c^{bin}}{\sum_j\hat p_j^{bin}}\quad\Rightarrow\quad(0.444,0.389,0.167)" class="w7-math" />
<div v-click="1" class="w7-result">Нормировка объединяет выходы. Параметры бинарных моделей всё ещё обучались независимо.</div>
</WeekSevenFrame>

---

<!-- S37 -->
<WeekSevenFrame section="One-vs-Rest" title="Что мы получили с помощью OvR">
<ul class="w7-list"><li>Обучили K независимых бинарных классификаторов.</li><li>По их оценкам выбираем один итоговый класс.</li><li>Бинарные вероятности могут не давать сумму 1; нормировка не меняет способа обучения.</li></ul>
<div class="w7-question w7-line">Можно ли обучить одну модель, в которой все классы учитываются совместно?</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S38 -->
<WeekSevenFrame section="Одна многоклассовая модель" title="По одной линейной оценке для каждого класса">
<div class="w7-text">Один объект описан двумя признаками. Каждый класс получает свою строку коэффициентов.</div>
<MathBlock formula="\begin{aligned}s_A(x)&=w_{A1}x_1+w_{A2}x_2+b_A,\\[10pt]s_B(x)&=w_{B1}x_1+w_{B2}x_2+b_B,\\[10pt]s_C(x)&=w_{C1}x_1+w_{C2}x_2+b_C.\end{aligned}" class="w7-math" />
<div v-click="1" class="w7-result">Три оценки одного объекта — параметры одной многоклассовой модели. Найдём их по общей функции потерь.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S39 -->
<WeekSevenFrame section="Одна многоклассовая модель" title="Соберём коэффициенты в матрицу W">
<MathBlock formula="W=\begin{pmatrix}w_{A1}&w_{A2}\\w_{B1}&w_{B2}\\w_{C1}&w_{C2}\end{pmatrix},\qquad b=\begin{pmatrix}b_A\\b_B\\b_C\end{pmatrix}" class="w7-large" />
<MathBlock v-click="1" formula="\underbrace{s(x)}_{K\times1}=\underbrace{W}_{K\times p}\;\underbrace{x}_{p\times1}+\underbrace{b}_{K\times1}" class="w7-large" />
<div class="w7-text">Строка W — коэффициенты одного класса. Столбец W — влияние одного признака на все классовые оценки.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S40 -->
<WeekSevenFrame section="Одна многоклассовая модель" title="Посчитаем три оценки одного объекта">
<MathBlock formula="W=\begin{pmatrix}1&0.5\\1&0\\0&0\end{pmatrix},\quad b=\begin{pmatrix}0\\0\\0\end{pmatrix},\quad x=\begin{pmatrix}1\\2\end{pmatrix}" class="w7-math" />
<div class="w7-equal"><MathBlock formula="\begin{aligned}s_A&=1\cdot1+0.5\cdot2=2,\\s_B&=1\cdot1+0\cdot2=1,\\s_C&=0.\end{aligned}" class="w7-math" /><MathBlock v-click="1" formula="s(x)=Wx+b=\begin{pmatrix}2\\1\\0\end{pmatrix}" class="w7-large" /></div>
<div class="w7-note">Один набор коэффициентов применяется ко всем объектам. Меняется x — меняются scores.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S41 -->
<WeekSevenFrame section="Softmax" title="Почему нельзя просто нормировать scores?">
<div class="w7-text">Попробуем разделить каждую линейную оценку на сумму оценок:</div>
<MathBlock formula="(s_A,s_B,s_C)=(2,1,-1),\qquad \sum_c s_c=2" class="w7-large" />
<MathBlock v-click="1" formula="\frac{(2,1,-1)}{2}=(1,0.5,-0.5)" class="w7-large" />
<div v-click="1" class="w7-result">Сумма равна 1, но вероятность C отрицательна. Нужен переход от любых scores к положительным значениям.</div>
</WeekSevenFrame>

---
clicks: 2
---

<!-- S42 -->
<WeekSevenFrame class="w7-v2-tight" section="Softmax" title="Экспоненты дают положительные веса классов">
<div class="w7-equal"><div class="w7-col"><MathBlock formula="p_c=\frac{e^{s_c}}{\sum_j e^{s_j}}>0" class="w7-math" /><div class="w7-text">Нормируем положительные веса: сумма p равна 1.</div></div><div class="w7-col"><MathBlock formula="s_A>s_B\Rightarrow e^{s_A}>e^{s_B}" class="w7-math" /><div class="w7-text">Порядок оценок сохраняется.</div></div></div>
<MathBlock v-click="1" formula="\frac{p_A(x)}{p_B(x)}=\frac{e^{s_A(x)}}{e^{s_B(x)}}=e^{s_A(x)-s_B(x)}" class="w7-math" />
<MathBlock v-click="2" formula="\boxed{\log\frac{p_A(x)}{p_B(x)}=s_A(x)-s_B(x)}" class="w7-large" />
<div v-click="2" class="w7-result">Логарифм отношения вероятностей снова линейно связан с признаками.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S43 -->
<WeekSevenFrame section="Softmax" title="Softmax: одна формула для всех классов">
<div class="w7-row" style="grid-template-columns:0.8fr 1.6fr"><div class="w7-col"><MathBlock formula="\boxed{p_c(x)=\frac{e^{s_c(x)}}{\sum_{j=1}^Ke^{s_j(x)}}}" class="text-[30px]" /><div class="w7-text">Свой числитель.<br>Общий знаменатель.</div></div><WeekSevenSoftmax :step="$clicks===0?1:2" /></div>
<div v-click="1" class="w7-result">Сумма вероятностей равна 1. Общий знаменатель связывает все классы.</div>
</WeekSevenFrame>

---

<!-- S44 -->
<WeekSevenFrame section="Softmax" title="Softmax продолжает сигмоиду">
<div class="w7-v2-derivation"><MathBlock formula="p_1=\frac{e^{s_1}}{e^{s_0}+e^{s_1}}=\frac1{1+e^{s_0-s_1}}" class="w7-large" /><MathBlock formula="\boxed{p_1=\sigma(s_1-s_0)}" class="w7-large" /><MathBlock formula="s_1(x)-s_0(x)=(w_1-w_0)^\top x+(b_1-b_0)" class="w7-math" /></div>
<div class="w7-result">Сигмоида применяется к разности двух scores. Эта разность сама линейна по признакам.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S45 -->
<WeekSevenFrame section="Совместное обучение" title="Вспомним бинарную log loss">
<MathBlock formula="L_{bin}(y,p)=-y\log p-\bigl(1-y\bigr)\log(1-p)" class="w7-large" />
<div class="w7-equal"><MathBlock formula="y=1:\quad L=-\log p" class="w7-math" /><MathBlock formula="y=0:\quad L=-\log(1-p)" class="w7-math" /></div>
<div v-click="1" class="w7-result">Берём отрицательный логарифм вероятности фактически наблюдённого ответа.</div>
</WeekSevenFrame>

---
clicks: 2
---

<!-- S46 -->
<WeekSevenFrame section="Совместное обучение" title="Cross-entropy одного многоклассового объекта">
<div class="w7-text">Модель выдала вероятности трёх классов. Истинный класс объекта — <strong>B</strong>.</div>
<table class="w7-table" style="text-align:center"><thead><tr><th>A</th><th class="focus">B · истинный класс</th><th>C</th></tr></thead><tbody><tr><td>≈ 0.665</td><td class="focus"><strong>≈ 0.245</strong></td><td>≈ 0.090</td></tr></tbody></table>
<MathBlock v-click="1" formula="L_i=-\log p_B\approx1.408" class="w7-large" />
<MathBlock v-click="2" formula="\boxed{L_i=-\log p_{y_i}(x_i)}" class="w7-large" />
<div v-click="2" class="w7-result">Чем меньшую вероятность модель назначает правильному классу, тем больше значение функции потерь.</div>
</WeekSevenFrame>

---

<!-- S47 -->
<WeekSevenFrame section="Совместное обучение" title="Почему cross-entropy подходит для вероятностей">
<div class="w7-text">Предположим, среди объектов с одними и теми же признаками 70% относятся к A, 20% — к B и 10% — к C.</div>
<div class="w7-equal"><div class="w7-col"><div class="w7-header">Реальные доли классов</div><div class="w7-chips"><span>A · 70%</span><span>B · 20%</span><span>C · 10%</span></div></div><div class="w7-col"><div class="w7-header">Идеальный вероятностный прогноз</div><MathBlock formula="(p_A,p_B,p_C)=(0.7,0.2,0.1)" class="text-[30px]" /></div></div>
<div class="w7-result">Если свободно выбирать вероятности, такой прогноз даёт наименьшую среднюю log loss при многократном повторении этих условий.</div>
<div class="w7-text">Softmax обеспечивает положительность и сумму 1. Соответствие реальным долям зависит от обученной модели и данных.</div>
<div class="w7-note">Линейная форма scores ограничивает модель, а обучающая выборка конечна. Поэтому найденные вероятности могут отличаться от реальных долей.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S48 -->
<WeekSevenFrame section="Совместное обучение" title="Меняем score A — меняется loss объекта B">
<MathBlock formula="p_B=\frac{e^{s_B}}{e^{s_A}+e^{s_B}+e^{s_C}},\qquad y_i=B" class="w7-math" />
<div class="w7-equal"><div class="w7-col"><div class="w7-header">До: scores (2, 1, 0)</div><MathBlock formula="p_B\approx0.245,\qquad L_B\approx1.408" class="text-[29px]" /></div><div v-click="1" class="w7-col"><div class="w7-header">После: scores (3, 1, 0)</div><MathBlock formula="p_B\approx0.114,\qquad L_B\approx2.170" class="text-[29px]" /></div></div>
<div class="w7-text">Увеличиваем только score A. Его экспонента увеличивает общий знаменатель.</div>
<div v-click="1" class="w7-result">Вероятность каждого класса зависит от коэффициентов всех классов. Поэтому параметры multinomial-модели обучаются совместно.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S49 -->
<WeekSevenFrame section="Совместное обучение" title="Одна целевая функция для всех коэффициентов">
<MathBlock formula="\boxed{R_n(W,b)=-\frac1n\sum_{i=1}^n\log p_{y_i}(x_i;W,b)}" class="w7-large" />
<div class="w7-text">Усредняем cross-entropy всех обучающих объектов.</div>
<MathBlock v-click="1" formula="\boxed{(\hat W,\hat b)\in\arg\min_{W,b}R_n(W,b)}" class="w7-large" />
<div v-click="1" class="w7-result">В одной минимизации участвуют все строки W и все свободные члены.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S50 -->
<WeekSevenFrame section="Совместное обучение" title="От признаков — к среднему риску">
<table class="w7-table"><thead><tr><th>Признаки x</th><th>Истинный y</th><th>Scores</th><th>Прогноз</th><th><MathBlock formula="p_y" :display="false" /></th><th>Loss</th></tr></thead><tbody><tr class="focus"><td>(1, 2)</td><td>B</td><td>(2, 1, 0)</td><td>A</td><td>0.245</td><td>1.408</td></tr><tr v-click="1"><td>(1, −2)</td><td>B</td><td>(0, 1, 0)</td><td>B</td><td>0.576</td><td>0.551</td></tr><tr v-click="1"><td>(−2, 0)</td><td>C</td><td>(−2, −2, 0)</td><td>C</td><td>0.787</td><td>0.240</td></tr><tr v-click="1"><td>(2, 2)</td><td>A</td><td>(3, 2, 0)</td><td>A</td><td>0.705</td><td>0.349</td></tr></tbody></table>
<MathBlock v-click="1" formula="R_4(W,b)\approx\frac{1.408+0.551+0.240+0.349}{4}=0.637" class="w7-math" />
<div v-click="1" class="w7-result">Меняем W,b — пересчитываются scores, вероятности и потери всей выборки.</div>
</WeekSevenFrame>

---

<!-- S51 -->
<WeekSevenFrame section="Совместное обучение" title="Что значит обучить многоклассовую модель">
<div class="w7-flow"><div>W, b</div><span>→</span><div>Линейные<br>scores</div><span>→</span><div>Softmax</div><span>→</span><div>Средняя<br>cross-entropy</div></div>
<div class="w7-text">Коэффициенты всех классов — параметры одной модели. Softmax связывает вероятности, поэтому общая функция потерь зависит от всего набора W,b.</div>
<div class="w7-result">Численный оптимизатор подбирает все параметры совместно. Можно добавить знакомый штраф на коэффициенты.</div>
<div class="w7-equal"><div class="w7-rail w7-text"><strong>OvR:</strong> K отдельных бинарных задач.</div><div class="w7-rail w7-text"><strong>Multinomial:</strong> одна совместная задача.</div></div>
<div class="w7-note">Например, для совместной минимизации используют L-BFGS.</div>
</WeekSevenFrame>

---
clicks: 3
---

<!-- S52 -->
<WeekSevenFrame section="Многоклассовые метрики" title="Матрица ошибок в общей форме">
<div class="w7-row"><WeekSevenConfusion symbolic focus="walk" :step="$clicks" /><div class="w7-col"><div class="w7-text">Строки — истинные классы.<br>Столбцы — прогноз модели.</div><MathBlock v-click="1" formula="TP_C=C_{CC}" class="w7-math" /><MathBlock v-click="2" formula="FP_C=C_{AC}+C_{BC}" class="w7-math" /><MathBlock v-click="3" formula="FN_C=C_{CA}+C_{CB}" class="w7-math" /></div></div>
<div class="w7-note">Выбрали C положительным классом, остальные — отрицательными. Для любого другого класса делаем то же самое.</div>
</WeekSevenFrame>

---

<!-- S53 -->
<WeekSevenFrame section="Многоклассовые метрики" title="Одна матрица: 60 обращений в поддержку">
<div class="w7-row"><WeekSevenConfusion focus="diag" /><div class="w7-col"><div class="w7-text">Истинных объектов:<br>A — 40, B — 15, C — 5.</div><MathBlock formula="\begin{aligned}Accuracy&=\frac{38+10+1}{60}\\&=\frac{49}{60}\approx0.817\end{aligned}" class="text-[28px]" /><div class="w7-question">Хорошо ли модель работает для каждого отдела?</div></div></div>
</WeekSevenFrame>

---
clicks: 3
---

<!-- S54 -->
<WeekSevenFrame section="Многоклассовые метрики" title="Для класса C: кто TP, FP и FN?">
<div class="w7-row"><WeekSevenConfusion focus="walk" :step="$clicks" /><div class="w7-col"><div class="w7-question">Считаем C положительным классом.</div><MathBlock v-click="1" formula="TP_C=1" class="w7-large" /><MathBlock v-click="2" formula="FP_C=0+1=1" class="w7-math" /><MathBlock v-click="3" formula="FN_C=2+2=4" class="w7-math" /></div></div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S55 -->
<WeekSevenFrame section="Многоклассовые метрики" title="Precision, recall и F1 для одного класса">
<div class="w7-row"><WeekSevenConfusion :focus="$clicks===0?'column':'row'" /><div class="w7-col"><MathBlock formula="Precision_C=\frac1{1+1}=0.5" class="w7-math" /><MathBlock v-click="1" formula="Recall_C=\frac1{1+4}=0.2" class="w7-math" /><MathBlock v-click="1" formula="F_{1,C}=\frac{2\cdot0.5\cdot0.2}{0.5+0.2}\approx0.286" class="text-[29px]" /></div></div>
<div class="w7-text">Precision: среди предсказанных C.<br>Recall: среди всех настоящих C.</div>
</WeekSevenFrame>

---

<!-- S56 -->
<WeekSevenFrame section="Многоклассовые метрики" title="Метрики по всем классам">
<table class="w7-table"><thead><tr><th>Класс</th><th>Support</th><th>Precision</th><th>Recall</th><th>F1</th></tr></thead><tbody><tr><td>A</td><td>40</td><td>0.864</td><td>0.950</td><td>0.905</td></tr><tr><td>B</td><td>15</td><td>0.714</td><td>0.667</td><td>0.690</td></tr><tr class="focus"><td>C</td><td>5</td><td>0.500</td><td>0.200</td><td>0.286</td></tr></tbody></table>
<div class="w7-text">Support — число объектов истинного класса: сумма его строки матрицы.</div>
<div class="w7-result">Общая accuracy ≈ 0.817 скрывает то, что найдена только пятая часть объектов C.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S57 -->
<WeekSevenFrame section="Усреднение метрик" title="Macro: классы имеют одинаковый вес">
<MathBlock formula="\boxed{F_1^{macro}=\frac1K\sum_{c=1}^KF_{1,c}}" class="w7-large" />
<div class="w7-weights"><div style="flex:1;background:#eaf1ff">A · 1/3</div><div style="flex:1;background:#fff1e6">B · 1/3</div><div style="flex:1;background:#e7f6f0">C · 1/3</div></div>
<MathBlock v-click="1" formula="F_1^{macro}\approx\frac{0.905+0.690+0.286}{3}\approx0.627" class="w7-math" />
<div class="w7-result">C встречается в восемь раз реже A, но его вес в macro остаётся тем же.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S58 -->
<WeekSevenFrame section="Усреднение метрик" title="Weighted: вес определяется долей класса">
<MathBlock formula="\boxed{F_1^{weighted}=\sum_c\frac{n_c}{n}F_{1,c}}" class="w7-large" />
<div class="w7-weights"><div style="flex:40;background:#eaf1ff">A · 40/60</div><div style="flex:15;background:#fff1e6">B · 15/60</div><div style="flex:5;background:#e7f6f0">C</div></div>
<MathBlock v-click="1" formula="\frac{40\cdot0.905+15\cdot0.690+5\cdot0.286}{60}\approx0.799" class="w7-math" />
<div class="w7-result">У крупных классов больше вес. Усредняем уже вычисленные классовые F1.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S59 -->
<WeekSevenFrame section="Усреднение метрик" title="Одинаковые F1 — разные веса классов">
<div class="w7-equal"><div class="w7-col"><div class="w7-header">Каждый класс весит 1/3</div><MathBlock formula="F_1^{macro}\approx0.627" class="w7-large" /></div><div class="w7-col"><div class="w7-header">Вес пропорционален доле класса</div><MathBlock formula="F_1^{weighted}\approx0.799" class="w7-large" /></div></div>
<div class="w7-text">Значения F1 классов A, B, C остались прежними: 0.905, 0.690, 0.286. Изменились только веса при усреднении.</div>
<div v-click="1" class="w7-question w7-line">А если сначала объединить количества ошибок по всем классам и уже потом вычислить метрику?</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S60 -->
<WeekSevenFrame section="Micro: общие количества" title="Сначала объединяем TP, FP и FN">
<div class="w7-text">В macro и weighted сначала считали метрики классов. В micro сначала складываем количества по всем классам:</div>
<div class="w7-three"><MathBlock formula="\boxed{TP_{\mathrm{all}}=\sum_{c=1}^{K}TP_c}" class="w7-math" /><MathBlock v-click="1" formula="\boxed{FP_{\mathrm{all}}=\sum_{c=1}^{K}FP_c}" class="w7-math" /><MathBlock v-click="1" formula="\boxed{FN_{\mathrm{all}}=\sum_{c=1}^{K}FN_c}" class="w7-math" /></div>
<div class="w7-note">Индекс all — итог по всем классам, а не имя отдельного класса.</div>
<div v-click="1" class="w7-result">Из этих общих количеств вычислим precision, recall и F1.</div>
</WeekSevenFrame>

---
clicks: 2
---

<!-- S61 -->
<WeekSevenFrame section="Micro: общие количества" title="Соберём суммы из той же матрицы">
<div class="w7-row"><WeekSevenConfusion :focus="['diag','off-rows','off-columns'][$clicks]" /><div class="w7-col"><div class="w7-header">60 объектов, прогнозы не меняются</div><MathBlock formula="TP_{\mathrm{all}}=38+10+1=49" class="text-[30px]" /><MathBlock v-click="1" formula="FN_{\mathrm{all}}=2+5+4=11" class="text-[30px]" /><MathBlock v-click="2" formula="FP_{\mathrm{all}}=6+4+1=11" class="text-[30px]" /><div class="w7-text">{{ ['Диагональ: верные ответы каждого класса.','По строкам: пропущенные A, B и C.','По столбцам: ошибочно назначенные A, B и C.'][$clicks] }}</div></div></div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S62 -->
<WeekSevenFrame section="Micro: общие количества" title="Одна ошибка учитывается в FN и FP">
<div class="w7-row"><WeekSevenConfusion focus="a-to-b" /><div class="w7-col"><div class="w7-text">Два обращения A ошибочно отправлены в B. Рассмотрим одно из них.</div><MathBlock formula="A\longrightarrow B" class="w7-large" /><div v-click="1" class="w7-text">Для A: не нашли настоящий A — один FN.<br>Для B: ошибочно назначили B — один FP.</div><MathBlock v-click="1" formula="+1\text{ в }FN_A,\qquad +1\text{ в }FP_B" class="text-[29px]" /></div></div>
<div class="w7-note">Это две записи об одном ошибочном прогнозе. Матрица остаётся прежней: 49 верных ответов и 11 ошибок.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S63 -->
<WeekSevenFrame section="Micro: общие количества" title="От одной ошибки — к общему подсчёту">
<MathBlock formula="n_{\mathrm{correct}}\text{ — верных},\qquad n_{\mathrm{errors}}=n-n_{\mathrm{correct}}\text{ — ошибок}" class="text-[31px]" />
<div class="w7-equal"><div class="w7-col"><div class="w7-header">Правильный прогноз</div><div class="w7-text">Один TP своему классу.</div><MathBlock formula="TP_{\mathrm{all}}=n_{\mathrm{correct}}" class="w7-math" /></div><div v-click="1" class="w7-col"><div class="w7-header">Неправильный прогноз</div><div class="w7-text">Один FN истинному классу и один FP предсказанному.</div><MathBlock formula="FP_{\mathrm{all}}=FN_{\mathrm{all}}=n_{\mathrm{errors}}" class="text-[28px]" /></div></div>
<div class="w7-note">У каждого объекта одна истинная и одна предсказанная метка. Считаем по всем классам.</div>
</WeekSevenFrame>

---
clicks: 2
---

<!-- S64 -->
<WeekSevenFrame section="Micro: общие количества" title="Почему micro совпадает с accuracy">
<MathBlock formula="Precision^{micro}=\frac{TP_{\mathrm{all}}}{TP_{\mathrm{all}}+FP_{\mathrm{all}}}=\frac{n_{\mathrm{correct}}}{n}" class="w7-math" />
<MathBlock v-click="1" formula="Recall^{micro}=\frac{TP_{\mathrm{all}}}{TP_{\mathrm{all}}+FN_{\mathrm{all}}}=\frac{n_{\mathrm{correct}}}{n}" class="w7-math" />
<MathBlock v-click="2" formula="\boxed{Precision^{micro}=Recall^{micro}=F_1^{micro}=Accuracy}" class="text-[32px]" />
<div v-click="2" class="w7-result">В нашем примере: 49/60 ≈ 0.817. Micro отражает общий подсчёт верных и ошибочных ответов и не даёт отдельной информации о редких классах.</div>
<div class="w7-note">Для single-label multiclass с учётом всех классов. При равных precision и recall их F1 равно тому же числу.</div>
</WeekSevenFrame>

---

<!-- S65 -->
<WeekSevenFrame section="Выбор метрики" title="Какую метрику выбрать для задачи?">
<table class="w7-table w7-v2-cases"><thead><tr><th>Задача</th><th>Что важно узнать</th><th>Основной ориентир</th></tr></thead><tbody><tr><td>Маршрутизация обращений</td><td>Какую долю направляем верно?</td><td>Accuracy при сопоставимой цене ошибок</td></tr><tr><td>Разные неисправности</td><td>Не теряем ли редкие типы?</td><td>Macro-F1 и результаты по классам</td></tr><tr><td>Критичный редкий исход</td><td>Сколько находим? Скольким сигналам верим?</td><td>Recall и precision этого класса</td></tr></tbody></table>
</WeekSevenFrame>

---
clicks: 2
---

<!-- S66 -->
<WeekSevenFrame section="Оценивание ранжирования" title="Как построить ROC-AUC, если классов больше двух?" class="w7-v2-tight">
<div class="w7-text">Для бинарной ROC нужны истинные бинарные ответы и числовые scores. Softmax-модель уже выдаёт вероятности A, B и C.</div>
<div class="w7-equal" style="align-items:start"><table class="w7-table"><thead><tr><th>Истинный класс</th><th>Вероятность A</th><th><span v-click="1">A / не A</span></th></tr></thead><tbody><tr><td>B</td><td>0.665</td><td><span v-click="1">0</span></td></tr><tr><td>B</td><td>0.212</td><td><span v-click="1">0</span></td></tr><tr><td>C</td><td>0.107</td><td><span v-click="1">0</span></td></tr><tr><td>A</td><td>0.705</td><td><span v-click="1">1</span></td></tr></tbody></table><div class="w7-col"><div v-click="1" class="w7-text"><strong>1.</strong> Отмечаем истинные ответы: A — 1, остальные — 0.</div><div v-click="2" class="w7-text"><strong>2.</strong> Берём вероятность A как score.<br><strong>3.</strong> Строим бинарную ROC-кривую.</div><div v-click="2" class="w7-result">Оцениваем, насколько хорошо модель ранжирует объекты класса A.</div></div></div>
<div class="w7-note">Обучать отдельные OvR-классификаторы не нужно. Здесь OvR — способ оценивания выходов уже обученной многоклассовой модели.</div>
</WeekSevenFrame>

---

<!-- S67 -->
<WeekSevenFrame section="Оценивание ранжирования" title="Multiclass ROC-AUC через One-vs-Rest">
<div class="w7-row"><WeekSevenPlot name="roc" :height="350" alt="Три ROC-кривые: каждый класс против остальных по вероятностям уже обученной модели" /><div class="w7-col"><div class="w7-text">Меняем порог по вероятности класса: получаем знакомые FPR и TPR.</div><MathBlock formula="z_i^{(c)}=\mathbb I(y_i=c),\qquad p_c(x_i)" class="text-[28px]" /><div class="w7-text">Отдельная AUC показывает качество ранжирования каждого класса; macro — среднее классовых AUC.</div></div></div>
<div class="w7-result">OvR-оценивание применимо и к совместно обученной softmax-модели.</div>
<div class="w7-note">Здесь OvR — способ оценивания. Переобучать отдельные бинарные модели не требуется.</div>
</WeekSevenFrame>

---

<!-- S68 -->
<WeekSevenFrame section="Оценивание ранжирования" title="Multiclass PR: тот же перенос бинарной задачи">
<div class="w7-row"><WeekSevenPlot name="pr" :height="370" alt="Для каждого класса строится своя precision-recall кривая по его вероятностям" /><div class="w7-col"><div class="w7-text">Берём вероятность одного класса и меняем порог.</div><div class="w7-text">Строим его PR-кривую и вычисляем AP.</div><div class="w7-result">AP можно усреднить по классам; редкие классы полезно смотреть отдельно.</div></div></div>
<div class="w7-note">ROC и PR оценивают ранжирование. Классовые precision/recall/F1 — уже выбранные метки.</div>
</WeekSevenFrame>

---

<!-- S69 -->
<WeekSevenFrame section="Оценивание качества" title="Метки и ранжирование отвечают на разные вопросы">
<div class="w7-equal"><div class="w7-col"><div class="w7-header">Уже выбраны метки</div><div class="w7-text">Кого и с кем путаем?</div><div class="w7-text">Матрица ошибок, precision, recall, F1 и accuracy.</div></div><div class="w7-col"><div class="w7-header">Есть классовые вероятности</div><div class="w7-text">Как объекты упорядочены по принадлежности классу?</div><div class="w7-text">ROC-AUC и PR/AP в бинарных постановках «класс против остальных».</div></div></div>
<div class="w7-result w7-line">Способ обучения модели и способ оценивания её выходов — разные решения.</div>
</WeekSevenFrame>

---

<!-- S70 -->
<WeekSevenFrame section="Многометочная классификация" title="А если правильных меток может быть несколько?">
<div class="w7-equal"><div class="w7-col"><div class="w7-header">Multiclass: один класс</div><div class="w7-text">Основной отдел для обращения.</div><MathBlock formula="Y\in\{1,\ldots,K\}" class="w7-math" /></div><div class="w7-col"><div class="w7-header">Multilabel: набор меток</div><div class="w7-text">Обращение: «оплата» и «безопасность».<br>Фильм: «драма» и «детектив».</div><MathBlock formula="Y\in\{0,1\}^K" class="w7-math" /></div></div>
<div class="w7-result">Один объект может иметь несколько верных меток одновременно.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S71 -->
<WeekSevenFrame section="Многометочная классификация" title="Как работают multilabel-прогнозы">
<div class="w7-text">По отдельной бинарной модели на каждую метку.</div>
<MathBlock formula="q_c(x)=\sigma(s_c(x)),\qquad\hat y_c(x)=\mathbb I[q_c(x)\ge0.5]" class="w7-math" />
<MathBlock v-click="1" formula="(0.85,0.70,0.15)\longrightarrow(1,1,0)" class="w7-large" />
<div v-click="1" class="w7-result">Вероятности меток не обязаны суммироваться в 1. Порог применяем к каждой отдельно.</div>
</WeekSevenFrame>

---

<!-- S72 -->
<WeekSevenFrame section="Многометочная классификация" title="Как оценивают multilabel">
<div class="w7-text">Precision, recall и F1 можно вычислять для каждой метки.</div>
<div class="w7-question">Exact match: совпал ли весь набор меток?</div>
<MathBlock formula="y=(1,1,0),\qquad\hat y=(1,0,0)" class="w7-large" />
<div class="w7-result">Две координаты совпали, но exact match не засчитывается.</div>
</WeekSevenFrame>

---

<!-- S73 -->
<WeekSevenFrame section="Многометочная классификация" title="Что изменилось в многометочной задаче">
<ul class="w7-list"><li>Один объект допускает несколько правильных меток одновременно.</li><li>Бинарные вероятности и пороги задают решение по каждой метке; сумма вероятностей не обязана равняться 1.</li><li>Метрики по меткам показывают отдельные ошибки, exact match — совпадение всего набора.</li></ul>
</WeekSevenFrame>

---

<!-- S74 -->
<WeekSevenFrame section="Категориальные признаки" title="Теперь посмотрим на входные признаки">
<table class="w7-table"><thead><tr><th>Тип признака</th><th>Пример</th><th>Что известно о значениях</th></tr></thead><tbody><tr><td>Числовой</td><td>Длина обращения</td><td>Количество, разности</td></tr><tr><td>Номинальный</td><td>Канал связи</td><td>Категории без порядка</td></tr><tr><td>Порядковый</td><td>Низкий / средний / высокий риск</td><td>Порядок, но не обязательно равные расстояния</td></tr></tbody></table>
<div class="w7-text">Номера классов в y обозначали ответы. Категории в X нужно закодировать так, чтобы kNN или линейная модель могли использовать их как признаки.</div>
</WeekSevenFrame>

---

<!-- S75 -->
<WeekSevenFrame section="Категориальные признаки" title="Как передать канал обращения в модель?">
<div class="w7-text"><strong>Целочисленное кодирование категорий (label encoding):</strong> заменяем названия каналов условными номерами.</div>
<div class="w7-chips"><span>Chat → 0</span><span>Email → 1</span><span>Phone → 2</span></div>
<MathBlock formula="d(Chat,Email)=1,\qquad d(Chat,Phone)=2" class="w7-math" />
<div class="w7-question">Почему между каналами возникло такое отношение расстояний?</div>
<div class="w7-result">Числа были произвольными метками. Подставив их в признаки, мы навязали категориям количественную шкалу.</div>
<div class="w7-note">В scikit-learn <code>LabelEncoder</code> кодирует целевую y,<br><code>OrdinalEncoder</code> — категориальные признаки X.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S76 -->
<WeekSevenFrame section="Категориальные признаки" title="One-hot: отдельный индикатор для категории">
<table class="w7-table"><thead><tr><th>Канал</th><th>Chat</th><th>Email</th><th>Phone</th></tr></thead><tbody><tr><td>Chat</td><td>1</td><td>0</td><td>0</td></tr><tr><td>Email</td><td>0</td><td>1</td><td>0</td></tr><tr><td>Phone</td><td>0</td><td>0</td><td>1</td></tr></tbody></table>
<MathBlock v-click="1" formula="g_j(x)=\mathbb I[f(x)=u_j]" class="w7-large" />
<div class="w7-text">Вместо условного номера создаём отдельный числовой индикатор: единица у своей категории, нули у остальных. Это dummy-переменные.</div>
</WeekSevenFrame>

---

<!-- S77 -->
<WeekSevenFrame section="Геометрия кодирования" title="Геометрия полного one-hot">
<div class="w7-row"><WeekSevenPlot name="v3-onehot" :height="390" alt="Единичные векторы Chat, Email и Phone в трёхмерном пространстве; все попарные расстояния равны корню из двух" /><div class="w7-col"><MathBlock formula="\begin{aligned}A&=(1,0,0),\\B&=(0,1,0),\\C&=(0,0,1).\end{aligned}" class="text-[28px]" /><MathBlock formula="\begin{gathered}d(A,B)=d(A,C)=d(B,C)\\=\sqrt2\end{gathered}" class="text-[28px]" /><div class="w7-result">Все разные известные категории равноудалены.</div><div class="w7-note">Полный one-hot и евклидова метрика.<br>A — Chat, B — Email, C — Phone.</div></div></div>
</WeekSevenFrame>

---

<!-- S78 -->
<WeekSevenFrame section="Геометрия кодирования" title="Зачем в линейной модели удаляют базовую dummy">
<div class="w7-text">При полном one-hot сумма индикаторов для каждого объекта равна 1:</div>
<MathBlock formula="g_{Chat}(x)+g_{Email}(x)+g_{Phone}(x)=1" class="w7-large" />
<div class="w7-text">В модели со свободным членом уже есть столбец единиц. Полный набор dummy создаёт точную линейную зависимость столбцов.</div>
<div class="w7-result">Удаление одной базовой dummy устраняет эту зависимость. В обычной линейной модели без регуляризации множество возможных прогнозов сохраняется.</div>
<div class="w7-question">А что произойдёт с расстояниями для kNN?</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S79 -->
<WeekSevenFrame section="Геометрия кодирования" title="Полный one-hot → удалена базовая категория">
<div class="w7-equal"><div class="w7-col"><div class="w7-header">Три индикатора</div><WeekSevenPlot name="v3-onehot" :height="255" alt="Полный one-hot: три единичных вектора Chat, Email и Phone вдоль трёх координатных осей; попарные расстояния равны корню из двух" /><MathBlock formula="\begin{gathered}d(A,B)=d(A,C)=d(B,C)\\=\sqrt2\end{gathered}" class="text-[28px]" /></div><div v-click="1" class="w7-col"><div class="w7-header">Удалили Chat, остаются Email и Phone</div><WeekSevenPlot name="v2-onehot" :step="1" :height="255" alt="Без базовой категории: A=(0,0), B=(1,0), C=(0,1); расстояния до A равны 1, между B и C — корень из двух" /><MathBlock formula="\begin{aligned}d(A,B)=d(A,C)&=1,\\d(B,C)&=\sqrt2\end{aligned}" class="text-[28px]" /></div></div>
<div v-click="1" class="w7-result">В kNN изменились расстояния. Могут измениться соседи и прогнозы.</div>
</WeekSevenFrame>

---
clicks: 1
---

<!-- S80 -->
<WeekSevenFrame section="Геометрия кодирования" title="Как объединить числовой признак и категорию?" class="w7-v2-tight">
<table class="w7-table"><thead><tr><th>Объект</th><th>Числовой z</th><th>Канал</th><th>One-hot</th></tr></thead><tbody><tr><td>A</td><td>0</td><td>Chat</td><td>(1, 0, 0)</td></tr><tr><td>B</td><td>1</td><td>Email</td><td>(0, 1, 0)</td></tr><tr><td>C</td><td>2</td><td>Chat</td><td>(1, 0, 0)</td></tr></tbody></table>
<div class="w7-note">z — числовой признак после выбранного масштабирования.</div>
<MathBlock formula="\begin{aligned}d_{\mathrm{num}}^2(A,B)&=(0-1)^2=1,\\d_{\mathrm{cat}}^2(A,B)&=(1-0)^2+(0-1)^2+(0-0)^2=2,\\d^2(A,B)&=d_{\mathrm{num}}^2(A,B)+d_{\mathrm{cat}}^2(A,B)=3.\end{aligned}" class="text-[28px]" />
<div v-click="1" class="w7-result"><MathBlock formula="d^2(A,C)=4>3=d^2(A,B)" :display="false" class="w7-inline" /> — B ближе, хотя у C совпадает канал.</div>
</WeekSevenFrame>

---

<!-- S81 -->
<WeekSevenFrame section="Реальная таблица" title="Пропуски и неизвестные категории" class="w7-v2-tight">
<div class="w7-equal" style="align-items:start"><div class="w7-col" style="gap:18px"><div class="w7-rail"><div class="w7-header" style="margin-bottom:6px">Числовые признаки</div><div class="w7-text">Заполнение пропусков<br>→ StandardScaler</div></div><div class="w7-rail"><div class="w7-header" style="margin-bottom:6px">Категориальные признаки</div><div class="w7-text">Заполнение пропусков<br>→ OneHotEncoder</div></div><div class="w7-text">↓ Объединяем в числовой вектор</div><div class="w7-note">Все обучаемые преобразования — только по соответствующей train-части.</div></div><div class="w7-col"><div class="w7-header">Известны Chat, Email, Phone</div><div class="w7-text">Пришёл новый канал Messenger.</div><div class="w7-text"><code>handle_unknown="ignore"</code></div><MathBlock formula="Messenger\longmapsto(0,0,0)" class="w7-math" /><div class="w7-note">One-hot индикаторы обычно не масштабируют как числовые столбцы. Для kNN выбор представления и вклада групп признаков остаётся содержательным решением.</div></div></div>
<div class="w7-result">Кодировщик обработал новое значение без ошибки. Но это соглашение не сообщает модели реальное сходство Messenger с известными каналами.</div>
</WeekSevenFrame>

---

<!-- S82 -->
<WeekSevenFrame section="Итоги" title="Главные выводы">
<ul class="w7-list"><li>kNN зависит от выбранного соседства и геометрии признаков.</li><li>Для multiclass нужно различать построение прогнозов и оценивание ошибок.</li><li>Кодирование категорий влияет на представление объектов и поведение модели.</li></ul>
</WeekSevenFrame>
