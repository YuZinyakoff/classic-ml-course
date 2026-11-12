---
theme: default
title: Интерпретация и диагностика моделей
author: НИУ ВШЭ
info: Неделя 9. Интерпретация и диагностика моделей.
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
appendixSlides: 0
duration: 90min
exportFilename: week-09-model-inspection
download: false
---

<!-- S01 -->
<WeekNineHeader section="Лекция 9" title="Интерпретация и диагностика моделей" cover />
<div class="w9-body"><div class="w9-flow"><div>Данные</div><b>→</b><div>Обученная модель</div><b>→</b><div>Прогноз</div></div><div class="w9-question">Качество измерено.<br>Что определяет поведение этой модели?</div><div class="w9-text">Исследуем её правила, зависимость прогнозов от входов<br>и области, где предиктор ошибается.</div></div>

---

<!-- S02 -->
<WeekNineHeader section="Зачем исследовать модель" title="Почему одной общей метрики мало?" />
<div class="w9-body"><div class="w9-text">Предиктор аренды имеет небольшую MAE на отложенных данных.</div><div class="w9-question">Почему эта квартира получила высокий прогноз?</div><div class="w9-question">Зависит ли решение от номера объявления?</div><div class="w9-question">В каких районах ошибки особенно велики?</div><div class="w9-small">Средняя ошибка не отвечает ни на один из этих вопросов.<br>Для них нужны разные способы анализа обученного предиктора.</div></div>

---

<!-- S03 -->
<WeekNineHeader section="Предмет исследования" title="Интерпретируемость и объяснимый ИИ" />
<div class="w9-body"><div class="w9-text"><b>Интерпретируемость</b> — возможность получить понятное человеку и содержательно полезное описание поведения модели.</div><div class="w9-text"><b>XAI — Explainable Artificial Intelligence</b>, объяснимый искусственный интеллект: методы получения и анализа таких объяснений.</div><div class="w9-grid"><div class="w9-stack"><div class="w9-subtitle">Читаем устройство</div><div class="w9-text">Например, коэффициенты<br>линейной регрессии.</div></div><div class="w9-stack"><div class="w9-subtitle">Исследуем прогнозы</div><div class="w9-text">Меняем один вход,<br>наблюдаем ответы модели.</div></div></div><div class="w9-small">Знать алгоритм обучения ещё не означает понимать все свойства конкретной полученной функции.</div></div>

---

<!-- S04 -->
<WeekNineHeader section="Карта лекции" title="Четыре вопроса к обученной модели" />
<div class="w9-body"><div class="w9-map"><span class="w9-num">1</span><b>Как получен прогноз?</b><span>Коэффициенты и правила</span><span class="w9-num">2</span><b>Что модель использует?</b><span>Важность признаков</span><span class="w9-num">3</span><b>Как меняются прогнозы?</b><span>Форма зависимости</span><span class="w9-num">4</span><b>Где модель ошибается?</b><span>Диагностика качества</span></div><div class="w9-small">Важность признака, направление изменения прогноза и ошибка — разные характеристики. Будем различать их в каждом эксперименте.</div></div>

---

<!-- S05 -->
<WeekNineHeader section="Как описать метод объяснения" title="Два независимых основания классификации XAI" />
<div class="w9-body"><div class="w9-grid"><div class="w9-stack"><div class="w9-subtitle">1. Масштаб объяснения</div><div class="w9-text"><b>Глобальное:</b> поведение модели на множестве объектов.<br><b>Локальное:</b> один конкретный прогноз.</div></div><div class="w9-stack"><div class="w9-subtitle">2. Доступ к модели</div><div class="w9-text"><b>Модельно-специфическое:</b> используем её внутреннее устройство.<br><b>Модельно-независимое:</b> достаточно входов и прогнозов.</div></div></div><table class="w9-table"><thead><tr><th>Пример</th><th>Масштаб</th><th>Доступ</th></tr></thead><tbody><tr><td>Коэффициенты регрессии</td><td>Глобальное</td><td>Внутренние параметры</td></tr><tr><td>Путь объекта по дереву</td><td>Локальное</td><td>Узлы и условия дерева</td></tr></tbody></table><div class="w9-small">Каждый метод характеризуем по обоим основаниям: что он объясняет и какую информацию о модели использует.</div></div>

---

<!-- S06 -->
<WeekNineHeader section="Знакомые модели · линейная регрессия" title="Коэффициент задаёт постоянный предельный эффект" />
<div class="w9-body"><MathBlock class="w9-formula-big" formula="\hat f(x)=\hat\beta_0+\sum_{j=1}^{p}\hat\beta_jx_j" /><MathBlock class="w9-formula-big" formula="\frac{\partial\hat f}{\partial x_j}=\hat\beta_j" /><div class="w9-text">xⱼ — числовой признак; β̂ⱼ — его обученный коэффициент.<br>При фиксированных остальных входах предельный эффект<br>постоянен и одинаков для всех объектов.</div></div>

---

<!-- S07 -->
<WeekNineHeader section="Знакомые модели · логистическая регрессия" title="Эффект на вероятность зависит от объекта" />
<div class="w9-body"><MathBlock formula="\hat p(x)=\sigma(\hat\beta_0+\hat\beta^{\mathsf T}x),\qquad \frac{\partial\hat p}{\partial x_j}=\hat\beta_j\hat p(x)(1-\hat p(x))" /><div class="w9-text">p̂(x) — вероятность класса 1; β̂ⱼ меняет логарифм шансов.<br>Через сигмоиду одинаковое изменение логита даёт разные изменения вероятности.</div><table class="w9-table"><thead><tr><th>Текущая p̂</th><th>p̂(1 − p̂)</th><th>Предельный эффект</th></tr></thead><tbody><tr><td>0,50</td><td>0,2500</td><td>0,25 β̂ⱼ</td></tr><tr><td>0,99</td><td>0,0099</td><td>0,0099 β̂ⱼ</td></tr></tbody></table></div>

---

<!-- S08 -->
<WeekNineHeader section="Как дерево вычисляет прогноз" title="24 квартиры, три признака, два класса" />
<div class="w9-body w9-tree-body"><div class="w9-small">Синтетические объявления: площадь, время до центра, комнаты.<br>Класс 1 — высокая аренда (13 объектов), 0 — умеренная (11). Глубина — 3.</div><WeekNineTree /><div class="w9-small">n — размер узла; [n₀, n₁] — количества классов. «Да» влево, «нет» вправо.</div></div>

---
clicks: 3
---

<!-- S09 -->
<WeekNineHeader section="Локальное объяснение" title="Почему квартире предсказали класс 1?" />
<div class="w9-body w9-tree-body"><div class="w9-text">Площадь — 74 м²; до центра — 51 минута.</div><WeekNineTree focus="path" :step="$clicks" /><div class="w9-small" v-if="$clicks===0">Узел 0: 51 ≤ 33? Нет → вправо.</div><div class="w9-small" v-else-if="$clicks===1">Узел 6: 74 ≤ 66? Нет → вправо.</div><div class="w9-small" v-else-if="$clicks===2">Узел 8: 51 ≤ 51,5? Да → лист 9.</div><div class="w9-small" v-else>Путь 0 → 6 → 8 → 9. В листе два объекта класса 1 → прогноз 1.<br>Частота 2/2 ещё не гарантирует надёжной вероятности на новых объектах.</div></div>

---

<!-- S10 -->
<WeekNineHeader section="От отдельного пути ко всем правилам" title="Как оценить роль признака во всём дереве?" />
<div class="w9-body w9-tree-body"><WeekNineTree focus="features" /><div class="w9-small"><span class="w9-blue">Время: узлы 0, 3, 8.</span> <span class="w9-orange">Площадь: 1, 6.</span> Комнаты не выбраны.<br>Счёт узлов игнорирует выигрыш и охват. Одинаково ли они полезны?</div></div>

---

<!-- S11 -->
<WeekNineHeader section="Важность признаков" title="MDI — встроенная мера важности дерева" />
<div class="w9-body"><div class="w9-text"><b>Feature importance</b> — семейство оценок роли признаков.<br>Разные методы определяют эту роль по-разному.</div><div class="w9-question">MDI — Mean Decrease in Impurity</div><div class="w9-text">Распределяет уменьшение обучающей неоднородности дерева между признаками, по которым выполнялись разбиения.</div><div class="w9-flow"><div>Узлы</div><b>→</b><div>Взвешенные выигрыши</div><b>→</b><div>Суммы по признакам</div></div><div class="w9-small">Глобальный модельно-специфический метод: использует структуру дерева и обучающие объекты.</div></div>

---

<!-- S12 -->
<WeekNineHeader section="MDI · локальный выигрыш" title="Сколько Джини убрало разбиение?" />
<div class="w9-body"><div class="w9-grid w9-mdi-grid"><WeekNineTree focus="root" /><div class="w9-text">v — текущий узел;<br>L и R — потомки.<br>H — индекс Джини.<br>nᵥ, nL, nR — размеры.</div></div><MathBlock formula="G(v)=H(v)-\left[\frac{n_L}{n_v}H(L)+\frac{n_R}{n_v}H(R)\right]" /><div class="w9-text">Неоднородность родителя минус средняя неоднородность потомков.<br>Размеры дочерних групп определяют веса.</div></div>

---

<!-- S13 -->
<WeekNineHeader section="MDI · учитываем охват" title="Большой узел затрагивает больше объектов" />
<div class="w9-body"><div class="w9-grid"><div class="w9-box w9-text">500 объектов<br>Локальный выигрыш 0,1</div><div class="w9-box w9-text">5 объектов<br>Локальный выигрыш 0,1</div></div><div class="w9-text">Первый узел затрагивает в 100 раз больше обучающих объектов.<br>При одинаковом локальном выигрыше его вклад должен быть больше.</div><MathBlock formula="\Delta(v)=\frac{n_v}{n}G(v)" /><div class="w9-text">n — размер всего обучения. В нашем дереве n = 24:<br>вес корня 24/24, узла 1 — 14/24, узла 8 — 4/24.</div></div>

---
clicks: 1
---

<!-- S14 -->
<WeekNineHeader section="MDI · вклад корня" title="Время до центра ≤ 33 минуты" />
<div class="w9-body"><WeekNineTree focus="root" /><MathBlock formula="G(0)=0.49653-\frac{14}{24}\cdot0.33673-\frac{10}{24}\cdot0.32" /><div v-click="1" class="w9-stack w9-tight"><MathBlock formula="\Delta(0)=\frac{24}{24}G(0)\approx\boxed{0.16677}" /><div class="w9-small">Все 24 объекта прошли корень. Вклад записываем времени до центра.</div></div></div>

---
clicks: 1
---

<!-- S15 -->
<WeekNineHeader section="MDI · вклад второго узла" title="Площадь ≤ 46,5 м²" />
<div class="w9-body"><WeekNineTree focus="node1" /><MathBlock formula="\Delta(1)=\frac{14}{24}\left[0.33673-\frac3{14}\cdot0.44444-\frac{11}{14}\cdot0.16529\right]" /><div class="w9-text" v-click="1"><b>Δ(1) ≈ 0,06512 — вклад площади.</b><br>Сначала считаем выигрыш среди 14 объектов, затем учитываем их долю в 24.</div></div>

---

<!-- S16 -->
<WeekNineHeader section="MDI · все появления признака" title="Складываем вклады пяти внутренних узлов" />
<div class="w9-body w9-tree-body"><WeekNineTree focus="features" contributions /><div class="w9-small"><span class="w9-blue">Время: узлы 0 + 3 + 8 → A = 0,27030.</span><br><span class="w9-orange">Площадь: узлы 1 + 6 → A = 0,11512.</span> Комнаты: A = 0.<br>В узлах показан Δ — уже взвешенный выигрыш.</div></div>

---
clicks: 1
---

<!-- S17 -->
<WeekNineHeader section="MDI · нормировка" title="Приводим суммарные вклады к долям" />
<div class="w9-body"><MathBlock formula="A_j=\sum_{v:\,j(v)=j}\Delta(v),\qquad \operatorname{MDI}_j=\frac{A_j}{\sum_k A_k}" /><div class="w9-small">j(v) — признак узла v; Aⱼ — суммарный вклад по всем ветвям.<br>Знаменатель ≈ 0,38542 — общее снижение обучающего Джини.</div><div class="w9-bars" v-click="1"><div class="w9-bar"><span>До центра</span><div class="w9-bar-track"><span style="width:70.1%"></span></div><b>0,701</b></div><div class="w9-bar"><span>Площадь</span><div class="w9-bar-track"><span style="width:29.9%;background:#d97022"></span></div><b>0,299</b></div><div class="w9-bar"><span>Комнаты</span><div class="w9-bar-track"><span style="width:0"></span></div><b>0</b></div></div><div class="w9-small">При положительном снижении сумма важностей равна 1.<br>При нулевом знаменателе такую нормировку не выполняем.</div></div>

---

<!-- S18 -->
<WeekNineHeader section="MDI · практическая интерпретация" title="С каких признаков начать разбор правил дерева?" />
<div class="w9-body"><div class="w9-text">Узлы времени до центра дали 70,1% взвешенного снижения Джини.<br>Затем по вкладу идёт площадь; комнаты не вошли в правила.</div><WeekNineTree focus="root" /><div class="w9-text">Начинаем с порогов времени: они объясняют основную часть<br>разделения обучающих классов. Проверяем смысл условий<br>и какие группы квартир они отделяют.</div></div>

---

<!-- S19 -->
<WeekNineHeader section="Ограничение MDI · выбор среди многих порогов" title="Почему технический ID может получить высокую MDI?" />
<div class="w9-body"><div class="w9-text">Номер объявления — технический идентификатор.<br>Обычно от него не ожидают информации о стоимости аренды.</div><div class="w9-grid"><div class="w9-box w9-text">Бинарный признак<br>Один порог</div><div class="w9-box w9-text">24 разных номера<br>До 23 порогов</div></div><div class="w9-text">Из множества порогов легче выбрать тот, который случайно<br>разделил классы на train. Его выигрыш попадёт в MDI.</div><div class="w9-result">Высокая MDI номера — повод изучить выбранные пороги<br>и проверить полезность признака на отложенных объектах.</div></div>

---

<!-- S20 -->
<WeekNineHeader section="Ограничение MDI · зависимость от выбранных правил" title="Дублирующие признаки делят один источник информации" />
<div class="w9-body"><MathBlock formula="x_1=x_2" /><div class="w9-flow"><div>В узле выбран x₁</div><b>→</b><div>Вклад записан x₁</div><b>→</b><div>Вклад x₂ здесь 0</div></div><div class="w9-text">Условия x₁ ≤ t и x₂ ≤ t дают одно разбиение и равный выигрыш.<br>Узел содержит одно условие: при равенстве алгоритм выбирает<br>один столбец согласно своему правилу разрешения ничьей.</div><div class="w9-small">У сильно коррелированных признаков разбиения тоже могут быть близки по качеству. Распределение MDI зависит от того, какие правила выбрало дерево.</div></div>

---

<!-- S21 -->
<WeekNineHeader section="Итак · MDI" title="Что измеряет встроенная важность дерева" />
<div class="w9-body"><div class="w9-recap"><div><b>Расчёт:</b> выигрыш узла × доля объектов → сумма по признаку → нормировка.</div><div><b>Чтение:</b> 0,701 — 70,1% взвешенного снижения обучающего Джини в этом дереве.</div><div><b>Польза:</b> сначала разбираем признаки и пороги, внёсшие основной вклад в построенные правила.</div><div><b>Ограничения:</b> много порогов облегчает случайную подгонку; связанные признаки могут замещать друг друга.</div></div></div>

---

<!-- S22 -->
<WeekNineHeader section="От устройства модели к качеству прогнозов" title="Проверим зависимость качества от информации в признаке" />
<div class="w9-body"><div class="w9-text">Если информация в признаке помогает обученной модели,<br>её нарушение может ухудшить прогнозы.</div><div class="w9-question">Перемешаем значения одного столбца<br>и повторно измерим качество.</div><div class="w9-text">Связь столбца с объектами и ответами нарушится.<br>Сами числа сохранятся; остальные входы и ответы не меняем.</div><div class="w9-small">Используем одну фиксированную модель: обучение заново не проводим.</div></div>

---

<!-- S23 -->
<WeekNineHeader section="Фиксируем учебный классификатор" title="Каким правилом будем получать прогнозы?" />
<div class="w9-body"><MathBlock class="w9-formula-big" formula="\hat f(a,d)=\begin{cases}1,&a\ge50\;\text{и}\;d\le25,\\0,&\text{иначе}.\end{cases}" /><div class="w9-text">a — площадь, м²; d — время до центра, минуты.<br>Классы: 1 — высокая аренда, 0 — умеренная.</div><div class="w9-text">Эта функция не меняется до и после перестановки.<br>Новое обучение не проводится.</div><div class="w9-small">Это отдельный прозрачный пример; его правило не совпадает с предыдущим деревом из 24 квартир.</div></div>

---
clicks: 1
---

<!-- S24 -->
<WeekNineHeader section="Исходные данные и качество" title="На шести квартирах правило даёт верные ответы" />
<div class="w9-body"><div class="w9-small">Прогноз 1: площадь ≥ 50 м² и до центра ≤ 25 минут.</div><WeekNinePermutation mode="initial" :step="$clicks" /><div class="w9-result" v-click="1">До изменения таблицы: accuracy = 6/6 = 1.</div></div>

---
clicks: 2
---

<!-- S25 -->
<WeekNineHeader section="Меняем один столбец" title="Площади A ↔ B и E ↔ F: какие ответы изменятся?" />
<div class="w9-body"><WeekNinePermutation mode="permuted" :step="$clicks" /><div class="w9-small" v-click="1">Перестановка сохраняет все числа столбца, но меняет их принадлежность строкам. d, y и правило остаются прежними.</div><div class="w9-small" v-click="2"><b>A: 42 → 62 м², прогноз 0 → 1. B: 62 → 42 м², прогноз 1 → 0.</b><br>У E и F площадь тоже поменялась, но прогнозы остались верными.</div></div>

---
clicks: 1
---

<!-- S26 -->
<WeekNineHeader section="Результат одной перестановки" title="Accuracy уменьшилась на 2/6" />
<div class="w9-body"><div class="w9-text">Две ошибки вместо нуля. Верны четыре ответа из шести.</div><MathBlock class="w9-formula-big" formula="\mathrm{accuracy}:1\to\frac46" /><MathBlock v-click="1" class="w9-formula-big" formula="1-\frac46=\frac26\approx0.333" /><div class="w9-text" v-click="1">Снижение на <b>33,3 процентного пункта</b>.<br>Это один заданный порядок; другая перестановка может дать другой результат.</div></div>

---

<!-- S27 -->
<WeekNineHeader section="Название и определение метода" title="Permutation importance — перестановочная важность" />
<div class="w9-body"><div class="w9-text"><b>PI</b> — среднее ухудшение выбранной метрики фиксированной модели после перемешивания одного признака.</div><div class="w9-flow"><div>R перестановок</div><b>→</b><div>R оценок качества</div><b>→</b><div>Среднее ухудшение</div></div><div class="w9-text">Для простого анализа достаточно нескольких повторений.<br>При заметном разбросе увеличиваем R; в нашем опыте R = 12.</div><div class="w9-small">Повторы уточняют оценку на фиксированной выборке. Проверку на других данных они не заменяют. Метод глобальный и модельно-независимый.</div></div>

---

<!-- S28 -->
<WeekNineHeader section="Формализуем выполненный опыт" title="Исходное качество минус среднее после перестановок" />
<div class="w9-body"><div class="w9-text">S = (X, y) — оценочная выборка; Q — метрика «больше — лучше».<br>R — число повторов; r — номер повтора от 1 до R;<br>πᵣ — перестановка строк в повторе r.</div><MathBlock formula="\widehat{PI}_j=Q(\hat f,S)-\frac1R\sum_{r=1}^{R}Q(\hat f,S_j^{\pi_r})" /><div class="w9-text">В Sⱼ с перестановкой πᵣ изменён только столбец j; y сохранены.<br>У шести квартир Q — accuracy, j — площадь.</div></div>

---

<!-- S29 -->
<WeekNineHeader section="Как выбрать знак PI" title="Потеря качества или прирост ошибки?" />
<div class="w9-body"><table class="w9-table"><thead><tr><th>Что измеряем</th><th>Качество ухудшилось, если…</th><th>Положительная PI</th></tr></thead><tbody><tr><td>Accuracy, R² и другой score «больше — лучше»</td><td>Значение снизилось</td><td>Исходный score минус score после</td></tr><tr><td>MAE, MSE и другая ошибка «меньше — лучше»</td><td>Значение выросло</td><td>Ошибка после минус исходная</td></tr></tbody></table><div class="w9-text">Оба способа показывают ухудшение положительным числом.<br>На графике PI с MAE читаем <b>прирост ошибки</b> в единицах ответа.</div></div>

---

<!-- S30 -->
<WeekNineHeader section="Примеры шкалы PI" title="Accuracy и ошибки: один смысл, разные знаки" />
<div class="w9-body"><MathBlock formula="\mathrm{accuracy}:0.85\to0.68\quad\Rightarrow\quad PI=0.17" /><div class="w9-small">Потеря 0,17 accuracy — 17 процентных пунктов.</div><MathBlock formula="\mathrm{MSE}:4\to9,\quad Q:-4\to-9,\quad PI=(-4)-(-9)=+5" /><div class="w9-text">scikit-learn использует score «больше — лучше», поэтому<br><code>neg_mean_squared_error</code> равен минус MSE.<br>Для <code>neg_mean_absolute_error</code> PI равна приросту MAE.</div><div class="w9-small">+5 MSE — пять квадратных единиц ответа. PI разных признаков<br>не обязаны суммироваться до 1; отрицательная оценка тоже возможна.</div></div>

---

<!-- S31 -->
<WeekNineHeader section="Реальные данные · Capital Bikeshare" title="Одна строка — один день проката велосипедов" />
<div class="w9-body w9-tight-body"><div class="w9-text">Вашингтон, 2011–2012. Ответ <b>cnt</b> — число прокатов за день.<br>Три реальные строки, к которым мы вернёмся при построении PDP:</div><table class="w9-table w9-compact"><thead><tr><th>День</th><th>temp, °C</th><th>hum, %</th><th>Ветер, км/ч</th><th>Сезон</th><th>cnt</th></tr></thead><tbody><tr><td>A</td><td>10,7</td><td>55,1</td><td>22,9</td><td>Зима</td><td>1872</td></tr><tr><td>B</td><td>24,8</td><td>50,7</td><td>18,0</td><td>Весна</td><td>4891</td></tr><tr><td>C</td><td>21,1</td><td>49,3</td><td>9,5</td><td>Осень</td><td>7436</td></tr></tbody></table><div class="w9-small">Температура, влажность и ветер — числовые; сезон — категориальный.<br>Ещё два бинарных входа: праздник и рабочий день (да/нет).<br>Седьмой вход — категория погоды: ясно, туман, дождь/снег.</div><div class="w9-note">Данные: H. Fanaee-T и J. Gama, <a href="https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset">UCI Bike Sharing Dataset</a>, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.<br>Физические единицы восстановлены; числа округлены; подготовка и графики курса.</div></div>

---

<!-- S32 -->
<WeekNineHeader section="Предиктор и схема оценки" title="Обученная модель и отложенные месяцы" />
<div class="w9-body"><div class="w9-grid"><div class="w9-box w9-text"><b>487 дней</b><br>Обучение случайного леса</div><div class="w9-box w9-text"><b>243 дня</b><br>Оценка на целых месяцах</div></div><div class="w9-text">Отложены март, июнь, сентябрь и декабрь 2011 и 2012 годов.<br>MAE ≈ <b>1120 прокатов в день</b>.</div><div class="w9-text">Исследование ретроспективное: используем уже измеренную<br>погоду и проверяем модель на выбранных исторических днях.<br>Обучающие даты есть до и после оценочных месяцев.</div></div>

---

<!-- S33 -->
<WeekNineHeader section="PI · Capital Bikeshare" title="Перестановка температуры сильнее всего увеличивает MAE" />
<div class="w9-body"><img class="w9-plot w9-large-plot" src="/assets/week-09-v3/pi.svg" alt="Прирост MAE: температура 572,6, влажность 167,2, сезон 74,0, ветер 32,5" /><div class="w9-text">Ось X — прирост MAE, прокатов/день. Температура: +572,6;<br>влажность: +167,2; сезон: +74,0; ветер: +32,5.</div><div class="w9-small">Фиксированный лес, 243 отложенных дня, 12 перестановок каждого столбца.<br>Полосы — разброс между перестановками, не неопределённость всего обучения.</div></div>

---

<!-- S34 -->
<WeekNineHeader section="Как использовать PI в исследовании" title="Качество существенно зависит от температуры" />
<div class="w9-body"><MathBlock formula="\mathrm{MAE}_{\text{исходно}}\approx1120.2,\qquad \mathrm{MAE}_{\text{после temp}}\approx1692.9" /><div class="w9-text">При нарушении информации о температуре ошибка выросла<br>в среднем на 572,6 проката в день — это важный вход модели.</div><div class="w9-text">Если датчик температуры ненадёжен или поле часто пропадает,<br>качество может пострадать. В таком случае следует отдельно<br>проверить качество модели при сбоях входных данных.</div><div class="w9-small">PI показывает зависимость качества, но не направление реакции.<br>Следующий вопрос: как меняется прогноз при изменении температуры?</div></div>

---

<!-- S35 -->
<WeekNineHeader section="Ограничение PI · дубликаты" title="Одинаковые прогнозы — разные способы использовать столбцы" />
<div class="w9-body"><MathBlock formula="x_1=x_2=y=(0,1,2,3,4)" /><div class="w9-grid"><div class="w9-box"><MathBlock formula="\hat f_A=x_1" /></div><div class="w9-box"><MathBlock formula="\hat f_B=\frac{x_1+x_2}{2}" /></div></div><div class="w9-text">На исходных объектах прогнозы совпадают, обе MSE равны 0.<br>Но A использует только x₁, а B делит информацию между x₁ и x₂.</div><div class="w9-question">Будет ли одинаковым эффект перестановки x₁?</div></div>

---
clicks: 1
---

<!-- S36 -->
<WeekNineHeader section="Что показывает контрпример" title="Индивидуальная PI зависит от использования информации" />
<div class="w9-body w9-tight-body"><div class="w9-small">Одна перестановка: (0, 1, 2, 3, 4) → (4, 3, 2, 1, 0).<br>У A после изменения x₁: MSE = (16 + 4 + 0 + 4 + 16)/5 = 8.</div><table class="w9-table"><thead><tr><th>Переставили</th><th>Прирост MSE: A</th><th>Прирост MSE: B</th></tr></thead><tbody><tr><td>Только x₁</td><td>8</td><td>2</td></tr><tr><td>Только x₂</td><td>0</td><td>2</td></tr><tr v-click="1"><td>Оба одним порядком</td><td>8</td><td>8</td></tr></tbody></table><div class="w9-text">Одинаковые исходные прогнозы скрывают разные способы<br>использовать столбцы — поэтому индивидуальные PI различаются.</div><div class="w9-small">В последней строке оба столбца переставляются одним порядком:<br>одинаковые пары (x₁, x₂) переносятся вместе.<br>Удаление признака проверяют отдельным переобучением без него.</div></div>

---

<!-- S37 -->
<WeekNineHeader section="Итак · MDI и PI" title="Два разных вопроса о важности признака" />
<div class="w9-body"><table class="w9-table w9-summary"><thead><tr><th></th><th>MDI</th><th>PI</th></tr></thead><tbody><tr><td>Измеряет</td><td>Снижение неоднородности на train</td><td>Потерю качества при перестановке</td></tr><tr><td>Расчёт</td><td>Вклады узлов → суммы → доли</td><td>Фиксируем модель, меняем столбец</td></tr><tr><td>Шкала</td><td>Доля от общего выигрыша</td><td>Единицы выбранного score</td></tr><tr><td>Применение</td><td>Разбор правил дерева</td><td>Аудит зависимости качества от входов</td></tr><tr><td>Класс XAI</td><td>Глобальная,<br>модельно-специфическая</td><td>Глобальная,<br>модельно-независимая</td></tr></tbody></table><div class="w9-small">PI работает с любым предиктором. Обе меры зависят от замещения связанных признаков; оценку качества обобщения проводим на отложенных данных.</div></div>

---

<!-- S38 -->
<WeekNineHeader section="От важности признака к форме зависимости" title="Как температура меняет прогноз модели?" />
<div class="w9-body"><div class="w9-text">Перестановочная проверка показала зависимость качества<br>от информации о температуре.</div><div class="w9-question">Какие прогнозы выдаёт обученная модель<br>при разных значениях температуры?</div><div class="w9-text">Будем менять её значение в одной строке,<br>сохраняя остальные входы. Затем повторим для нескольких дней.</div></div>

---
clicks: 1
---

<!-- S39 -->
<WeekNineHeader section="Ceteris paribus · при прочих равных" title="Копируем строку и меняем только температуру" />
<div class="w9-body"><div class="w9-text">Исследуем зависимость <b>прогноза обученной модели</b> от температуры.<br>Сохраняем влажность, ветер, сезон, праздник, рабочий день и погоду.</div><table class="w9-table"><thead><tr><th>Вход модели</th><th>temp, °C</th><th>hum, %</th><th>Ветер</th><th>Сезон</th></tr></thead><tbody><tr><td>Исходная строка A</td><td>10,7</td><td class="w9-fixed">55,1</td><td class="w9-fixed">22,9</td><td class="w9-fixed">Зима</td></tr><tr v-click="1"><td>Копия A</td><td class="w9-changed">20,0</td><td class="w9-fixed">55,1</td><td class="w9-fixed">22,9</td><td class="w9-fixed">Зима</td></tr></tbody></table><div class="w9-flow" v-click="1"><div>Изменённая строка</div><b>→</b><div>Тот же predict</div><b>→</b><div>Новый прогноз</div></div><div class="w9-small">День A — одна из оценочных строк. Каждая копия проходит через ту же<br>обученную модель; меняется только температура.</div></div>

---
clicks: 1
---

<!-- S40 -->
<WeekNineHeader section="Один день · несколько температур" title="Одна строка даёт несколько прогнозов" />
<div class="w9-body"><div class="w9-grid"><table class="w9-table"><thead><tr><th>Копия дня A</th><th>Прогноз</th></tr></thead><tbody><tr><td>temp = 10 °C</td><td>1703</td></tr><tr><td>temp = 20 °C</td><td>4167</td></tr><tr><td>temp = 30 °C</td><td>4146</td></tr></tbody></table><img v-click="1" class="w9-plot" src="/assets/week-09-v3/cp-A-three.svg" alt="Прогноз одного дня A: 1703 при 10 °C, 4167 при 20, 4146 при 30" /></div><div class="w9-text">Остальные признаки во всех трёх копиях одинаковы.<br>X — подставленная температура; Y — прогноз одного дня.</div><div class="w9-small">Для A рост 10→20 °C сменяется почти неизменным прогнозом 20→30 °C.</div></div>

---

<!-- S41 -->
<WeekNineHeader section="Почему одного дня недостаточно" title="У других дней остаются другие признаки" />
<div class="w9-body"><div class="w9-text">Одна кривая описывает только один набор остальных характеристик.<br>Чтобы получить среднюю картину, возьмём дни A, B и C.</div><table class="w9-table"><thead><tr><th>День</th><th>Своя влажность, %</th><th>Свой ветер, км/ч</th><th>Свой сезон</th></tr></thead><tbody><tr><td>A</td><td>55,1</td><td>22,9</td><td>Зима</td></tr><tr><td>B</td><td>50,7</td><td>18,0</td><td>Весна</td></tr><tr><td>C</td><td>49,3</td><td>9,5</td><td>Осень</td></tr></tbody></table><div class="w9-text">Каждому подставим одинаковые 10, 20 и 30 °C.<br>У каждого дня сохраняем его собственные остальные входы.</div></div>

---

<!-- S42 -->
<WeekNineHeader section="Объекты × подставленные значения" title="Девять подстановок — девять прогнозов" />
<div class="w9-body"><table class="w9-table"><thead><tr><th>День</th><th>При 10 °C</th><th>При 20 °C</th><th>При 30 °C</th></tr></thead><tbody><tr><td>A</td><td>1703</td><td>4167</td><td>4146</td></tr><tr><td>B</td><td>2912</td><td>5383</td><td>5920</td></tr><tr><td>C</td><td>3512</td><td>6288</td><td>6491</td></tr></tbody></table><div class="w9-text">Строка — один день с разными температурами.<br>Столбец — одна общая температура у разных дней.</div><div class="w9-question">Каким будет средний прогноз при 20 °C?</div></div>

---
clicks: 1
---

<!-- S43 -->
<WeekNineHeader section="Усредняем каждый столбец" title="Одна температура — одно среднее" />
<div class="w9-body"><table class="w9-table"><thead><tr><th>День</th><th>10 °C</th><th>20 °C</th><th>30 °C</th></tr></thead><tbody><tr><td>A</td><td>1703</td><td>4167</td><td>4146</td></tr><tr><td>B</td><td>2912</td><td>5383</td><td>5920</td></tr><tr><td>C</td><td>3512</td><td>6288</td><td>6491</td></tr><tr class="w9-total" v-click="1"><td>Средний прогноз</td><td>2709</td><td>5279</td><td>5519</td></tr></tbody></table><MathBlock v-click="1" formula="\widehat{PD}(20)\approx\frac{4167+5383+6288}{3}\approx5279" /><div class="w9-small">Это среднее прогнозов модели, а не фактического cnt.<br>Средние рассчитаны по неокруглённым значениям.</div></div>

---
clicks: 2
---

<!-- S44 -->
<WeekNineHeader section="От средних к графику" title="Три средних становятся точками PDP" />
<div class="w9-body"><img class="w9-plot w9-large-plot" :src="`./assets/week-09-v3/pdp-three-${$clicks+1}.svg`" alt="Последовательно появляются точки 10 °C 2709, 20 °C 5279 и 30 °C 5519" /><div class="w9-text"><b>Partial Dependence Plot (PDP)</b> — график частичной зависимости.<br>Соединяем вычисленные средние для удобства чтения.</div><div class="w9-small">Дополнительную регрессию по этим точкам не обучаем.<br>Более частая сетка даст более подробное описание той же модели.</div></div>

---

<!-- S45 -->
<WeekNineHeader section="Прочитаем маленькую PDP" title="Быстрый рост сменяется насыщением" />
<div class="w9-body"><img class="w9-plot w9-large-plot" src="/assets/week-09-v3/pdp-three-3.svg" alt="Среднее растёт с 2709 до 5279, затем только до 5519" /><div class="w9-text">10→20 °C: средний прогноз увеличился примерно на 2570 прокатов.<br>20→30 °C: увеличение лишь около 240.</div><div class="w9-small">График показывает, в каких диапазонах предиктор реагирует сильнее.<br>Исследователь может проверить пороги, плато и неожиданное направление изменений.</div></div>

---

<!-- S46 -->
<WeekNineHeader section="Формула обобщает таблицу" title="Подстановка → прогнозы → среднее" />
<div class="w9-body"><div class="w9-text">j — исследуемый признак, t — его общее подставленное значение.<br>xᵢ,−ⱼ — остальные признаки объекта i; n — число объектов.</div><MathBlock class="w9-formula-big" formula="\widehat{PD}_j(t)=\frac1n\sum_{i=1}^{n}\hat f(t,x_{i,-j})" /><div class="w9-text">В нашей таблице j — температура, n = 3.<br>Фиксируем один столбец температуры и усредняем его три прогноза.</div><div class="w9-small">PDP — глобальный модельно-независимый метод. В регрессии усредняем прогноз ответа, в классификации можно усреднять вероятность выбранного класса.</div></div>

---

<!-- S47 -->
<WeekNineHeader section="PDP по всем оценочным дням" title="Температура: рост и насыщение у тёплой погоды" />
<div class="w9-body"><img class="w9-plot w9-large-plot" src="/assets/week-09-v3/pdp-temp.svg" alt="Температурная PDP по 243 дням: рост до примерно 23 °C, затем плато и колебания около верхней границы" /><div class="w9-text">X — подставленная температура; Y — среднее 243 прогнозов.<br>От прохладной к тёплой погоде — рост, затем плато с колебаниями у края.</div><div class="w9-small">Теперь усредняем по всем 243 дням вместо трёх: состав остальных<br>характеристик шире, поэтому значения средней кривой могут отличаться.</div></div>

---

<!-- S48 -->
<WeekNineHeader section="PDP зависит от обученного предиктора" title="У дерева и леса разные кривые" />
<div class="w9-body"><img class="w9-plot w9-large-plot" src="/assets/week-09-v3/tree-forest.svg" alt="Температурная PDP дерева ступенчатая, у леса более плавная" /><div class="w9-text">Те же 243 дня и та же сетка, но две разные обученные функции.<br>У дерева выражены ступени, усреднение деревьев даёт более плавную линию.</div><div class="w9-small">Форма PDP относится к выбранной модели. Сравнение помогает увидеть, какие особенности зависимости зависят от предиктора.</div></div>

---

<!-- S49 -->
<WeekNineHeader section="Итак · частичная зависимость" title="Что мы узнаём с помощью PDP" />
<div class="w9-body w9-recap"><div><b>Операция:</b> каждому объекту подставляем общее значение признака, сохраняя его остальные поля.</div><div><b>Точка графика:</b> средний прогноз по выбранным объектам. Новая подстановка даёт следующую точку.</div><div><b>Чтение:</b> находим рост, спад, плато и пороги прогнозной функции.</div><div><b>Применение:</b> находим диапазоны сильного изменения прогноза<br>и проверяем, содержательно ли модель реагирует на вход.</div></div>

---

<!-- S50 -->
<WeekNineHeader section="Новый вопрос об индивидуальном поведении" title="Что скрывается за средним прогнозом?" />
<div class="w9-body"><table class="w9-table"><thead><tr><th>День</th><th>10 °C</th><th>20 °C</th><th>30 °C</th></tr></thead><tbody><tr><td>A</td><td>1703</td><td>4167</td><td>4146</td></tr><tr><td>B</td><td>2912</td><td>5383</td><td>5920</td></tr><tr><td>C</td><td>3512</td><td>6288</td><td>6491</td></tr><tr class="w9-total"><td>PDP</td><td>2709</td><td>5279</td><td>5519</td></tr></tbody></table><div class="w9-text">Прогнозы каждого дня уже вычислены. Можно соединять значения <b>внутри каждой строки</b>, прежде чем усреднять.</div><div class="w9-question">Все дни реагируют на температуру одинаково?</div></div>

---

<!-- S51 -->
<WeekNineHeader section="Individual Conditional Expectation" title="ICE — индивидуальная кривая одного объекта" />
<div class="w9-body"><div class="w9-grid"><img class="w9-plot" src="/assets/week-09-v3/ice-three.svg" alt="Три индивидуальные линии A B C и их средняя PDP" /><div class="w9-stack"><MathBlock formula="ICE_i(t)=\hat f(t,x_{i,-j})" /><MathBlock formula="\widehat{PD}_j(t)=\frac1n\sum_i ICE_i(t)" /><div class="w9-small">i — объект, t — подставленное значение; остальные входы этого объекта фиксированы.</div></div></div><div class="w9-text">Одна строка таблицы → одна ICE. Среднее по строкам → PDP.<br>Операция модельно-независима, нового обучения нет.</div></div>

---
clicks: 1
---

<!-- S52 -->
<WeekNineHeader section="Контролируемый пример" title="Противоположные реакции исчезают в среднем" />
<div class="w9-body"><div class="w9-grid"><img class="w9-plot" src="/assets/week-09-v3/ice-cancellation.svg" alt="При z=1 прогноз x, при z=0 минус x, средняя PDP равна нулю" /><div class="w9-stack"><MathBlock formula="\hat f(x,z)=(2z-1)x" /><div class="w9-text">z = 1: прогноз растёт.<br>z = 0: прогноз падает.<br>Группы равны по размеру.</div><MathBlock v-click="1" formula="\widehat{PD}(x)=\tfrac12x+\tfrac12(-x)=0" class="w9-formula-small" /></div></div><div class="w9-text">Плоская PDP может скрывать сильную реакцию в каждой группе.<br>ICE позволяет увидеть её до усреднения.</div></div>

---

<!-- S53 -->
<WeekNineHeader section="ICE · реальная модель" title="Как различаются индивидуальные реакции на влажность?" />
<div class="w9-body w9-tight-body"><img class="w9-plot w9-large-plot" src="/assets/week-09-v3/ice.svg" alt="50 ICE влажности: разные уровни и неодинаковое снижение прогнозов; чёрная PDP по 243 дням" /><div class="w9-text">У влажности тоже заметная PI. Её линии наглядно показывают<br>различия дней: при высокой влажности многие прогнозы<br>снижаются, но сила и форма снижения неодинаковы.</div><div class="w9-small">Цвет — сезон; X — влажность, Y — прогноз. 50 линий для читаемости,<br>чёрная PDP — по всем 243 дням. Сравним средние сезонных групп.</div></div>

---

<!-- S54 -->
<WeekNineHeader section="ICE · групповые средние" title="Реакции на влажность различаются между сезонами" />
<div class="w9-body"><div class="w9-grid w9-curve-table"><img class="w9-plot" src="/assets/week-09-v3/ice-seasons.svg" alt="Сезонные средние ICE, выделен диапазон 60–80% влажности" /><table class="w9-table w9-compact"><thead><tr><th>Группа, n</th><th>60→80%</th></tr></thead><tbody><tr><td>Зима, 61</td><td>−532</td></tr><tr><td>Весна, 62</td><td>−956</td></tr><tr><td>Лето, 64</td><td>−1020</td></tr><tr><td>Осень, 56</td><td>−1042</td></tr></tbody></table></div><div class="w9-text">Числа — изменения средних прогнозов, прокатов/день.<br>На этих месяцах зимние дни реагируют слабее летних и осенних.</div><div class="w9-small">Каждая кривая усреднена по всем дням своего сезона, не по 50 показанным линиям. Группы различаются также температурой, погодой и календарём.</div></div>

---

<!-- S55 -->
<WeekNineHeader section="От ICE к следующему эксперименту" title="Разные сезонные реакции подсказывают гипотезу" />
<div class="w9-body"><div class="w9-text">При переходе влажности с 60% до 80% среднее снижение<br>прогнозов слабее у зимних дней (−532), чем у летних (−1020).</div><div class="w9-text">Чтобы проверить взаимодействие в линейной модели,<br>можно добавить произведения влажности на индикаторы сезонов:</div><MathBlock formula="\mathrm{hum}\cdot\mathbf{1}\{\mathrm{season}=s\}" /><div class="w9-small">Индикатор равен 1 для выбранного сезона и 0 для остальных.<br>Такие признаки позволяют задать разный наклон по влажности<br>для зимних и летних дней. Качество варианта с взаимодействиями<br>затем сравнивают с исходной моделью на одной и той же валидации.</div></div>

---

<!-- S56 -->
<WeekNineHeader section="Проблема разных базовых уровней" title="Одинаковые изменения выглядят далеко друг от друга" />
<div class="w9-body"><img class="w9-plot w9-large-plot" src="/assets/week-09-v3/centering-before.svg" alt="Две условные линии 2000→1600 и 7000→6600 одинаково уменьшаются на 400" /><div class="w9-text">Условные объекты: 2000→1600 и 7000→6600.<br>Стартовые прогнозы различаются на 5000, изменение у обоих −400.</div><div class="w9-question">Как сравнивать форму реакции без разницы стартовых уровней?</div></div>

---

<!-- S57 -->
<WeekNineHeader section="Centered ICE" title="Вычитаем собственный старт каждой линии" />
<div class="w9-body"><MathBlock formula="ICE_i^c(t)=ICE_i(t)-ICE_i(t_0)" /><div class="w9-text">t₀ — одно общее значение признака.<br>Из каждой линии вычитаем её значение при t₀: она начинается с нуля.</div><table class="w9-table"><thead><tr><th>Условная линия</th><th>При t₀</th><th>При t₁</th></tr></thead><tbody><tr><td>Первый объект</td><td>2000 − 2000 = 0</td><td>1600 − 2000 = −400</td></tr><tr><td>Второй объект</td><td>7000 − 7000 = 0</td><td>6600 − 7000 = −400</td></tr></tbody></table><div class="w9-small">Разности вдоль каждой линии сохраняются. Меняется только вертикальный уровень, а не модель или её взаимодействия.</div></div>

---

<!-- S58 -->
<WeekNineHeader section="Centered ICE · реальная модель" title="Теперь легче сравнить силу снижения" />
<div class="w9-body"><img class="w9-plot w9-large-plot" src="/assets/week-09-v3/ice-centered.svg" alt="50 центрированных ICE влажности: разные изменения относительно общей начальной влажности" /><div class="w9-text">Y — изменение прогноза от минимальной влажности сетки t₀.<br>После удаления базовых уровней видно, насколько сильнее падают одни линии по сравнению с другими.</div><div class="w9-small">Те же 50 дней. Чёрная линия — PDP по 243 дням минус её значение при t₀.<br>Непараллельные ICE указывают на зависимость реакции от других признаков.</div></div>

---

<!-- S59 -->
<WeekNineHeader section="Итак · индивидуальные реакции" title="Зачем смотреть ICE вместе с PDP" />
<div class="w9-body w9-recap"><div><b>PDP</b> показывает средний прогноз при одинаковой подстановке.</div><div><b>ICE</b> сохраняет траекторию каждого объекта — до усреднения видны разные направления и сила изменений.</div><div><b>Centered ICE</b> убирает различие стартовых уровней и облегчает сравнение формы.</div><div><b>Исследование:</b> разные реакции влажности у дней подсказывают проверить взаимодействия и устойчивость групповых различий.</div></div>

---

<!-- S60 -->
<WeekNineHeader section="Почему подстановки PDP требуют внимания" title="Температура связана с сезоном" />
<div class="w9-body"><img class="w9-plot w9-large-plot" src="/assets/week-09-v3/support-0.svg" alt="Наблюдавшиеся температуры в разных сезонах: лето обычно теплее зимы" /><div class="w9-text">Точки — 243 оценочных дня. Летом обычно теплее, чем зимой.<br>Температура и сезон связаны; некоторые их сочетания редки.</div><div class="w9-small">Даже значение из наблюдавшегося диапазона может оказаться<br>нетипичным для части строк, когда мы подставляем его всем дням.</div></div>

---

<!-- S61 -->
<WeekNineHeader section="Ограничение PDP при зависимых признаках" title="Подстановка создаёт редкие сочетания" />
<div class="w9-body"><img class="w9-plot w9-large-plot" src="/assets/week-09-v3/support-1.svg" alt="Подстановка 8 градусов всем дням создаёт редкое сочетание лето и 8 градусов" /><div class="w9-text">При 8 °C часть строк остаётся «летней». Оранжевые кресты —<br>искусственные входы модели, а не наблюдавшиеся дни.</div><div class="w9-result">PDP учитывает прогнозы для необычных сочетаний входов.<br>Если модель там нестабильна, это может изменить среднюю кривую.</div></div>

---

<!-- S62 -->
<WeekNineHeader section="Для самостоятельного изучения" title="Дополнительные методы: ALE, LIME и SHAP" />
<div class="w9-body w9-tight-body"><div class="w9-stack w9-tight"><div class="w9-text"><b>ALE — Accumulated Local Effects</b></div><div class="w9-text">Оцениваем локальные изменения прогнозов рядом с наблюдениями,<br>затем накапливаем приращения в общую кривую.</div></div><div class="w9-stack w9-tight"><div class="w9-text"><b>LIME — Local Interpretable Model-agnostic Explanations</b></div><div class="w9-text">Приближаем прогнозы сложной модели простой<br>интерпретируемой моделью около конкретного объекта.</div></div><div class="w9-stack w9-tight"><div class="w9-text"><b>SHAP — SHapley Additive exPlanations</b></div><div class="w9-text">Распределяем отклонение конкретного прогноза от базового уровня<br>между признаками на основе значений Шепли.</div></div><div class="w9-small">Подробный разбор ALE — в §8 текстовой лекции.<br>Все три метода — для самостоятельного изучения.</div></div>

---

<!-- S63 -->
<WeekNineHeader section="Куда двигаться дальше" title="Источники для самостоятельного изучения XAI" />
<div class="w9-body"><div class="w9-stack"><div class="w9-subtitle"><a href="https://christophm.github.io/interpretable-ml-book/">Christoph Molnar · Interpretable Machine Learning</a></div><div class="w9-text">Главы об ALE, LIME и SHAP: механизм каждого метода,<br>примеры, способы чтения объяснений и ограничения.</div></div><div class="w9-stack"><div class="w9-subtitle"><a href="https://ai-interpretability.school/">AI Interpretability School</a></div><div class="w9-text">Курс по интерпретируемости: методы объяснения<br>и практические примеры их применения.</div></div><div class="w9-result">Мы исследовали поведение прогнозной функции.<br>Теперь проверим, где её прогнозы расходятся с реальными ответами.</div></div>

---

<!-- S64 -->
<WeekNineHeader section="Диагностика ошибок" title="На каких объектах модель ошибается систематически?" />
<div class="w9-body"><div class="w9-text">Мы исследовали, как модель использует входы.<br>Теперь сопоставим прогнозы с фактическим числом прокатов.</div><div class="w9-flow"><div>Общая ошибка</div><b>→</b><div>Ошибки по группам</div><b>→</b><div>Гипотеза улучшения</div></div><div class="w9-question">Одинаково ли хорошо фиксированная модель описывает разные годы?</div><div class="w9-small">Группы помогают найти систематическую недооценку или переоценку, которую скрывает одна средняя метрика.</div></div>

---

<!-- S65 -->
<WeekNineHeader section="Размер и направление ошибки" title="Абсолютная ошибка и знаковый остаток" />
<div class="w9-body"><div class="w9-small">Условные три прогноза. Определим остаток как eᵢ = yᵢ − ŷᵢ.</div><table class="w9-table"><thead><tr><th>Факт y</th><th>Прогноз ŷ</th><th>Остаток e</th><th>|e|</th></tr></thead><tbody><tr><td>100</td><td>130</td><td>−30</td><td>30</td></tr><tr><td>200</td><td>170</td><td>+30</td><td>30</td></tr><tr><td>300</td><td>300</td><td>0</td><td>0</td></tr></tbody></table><MathBlock formula="MAE=\frac{1}{n}\sum_i|e_i|=20,\qquad ME=\frac{1}{n}\sum_i e_i=0" /><div class="w9-text">ME &gt; 0: модель в среднем недооценивает; ME &lt; 0: переоценивает.<br>Противоположные ошибки могут сократиться в ME, но не в MAE.</div></div>

---

<!-- S66 -->
<WeekNineHeader section="Ошибки по годам · 243 оценочных дня" title="Общая MAE ≈ 1120 скрывает два направления" />
<div class="w9-body"><div class="w9-grid"><img class="w9-plot" src="/assets/week-09-v3/errors-year.svg" alt="Распределения остатков по годам: преимущественно отрицательные в 2011 и положительные в 2012" /><table class="w9-table"><thead><tr><th>Год</th><th>n</th><th>MAE</th><th>ME</th></tr></thead><tbody><tr><td>2011</td><td>121</td><td>958</td><td>−911</td></tr><tr><td>2012</td><td>122</td><td>1281</td><td>+1171</td></tr></tbody></table></div><div class="w9-result">2011: прогнозы преимущественно завышены.<br>2012: преимущественно занижены; здесь и абсолютная ошибка выше.</div><div class="w9-small">Фиксированная базовая модель. Год ещё не входит в её семь признаков.<br>По Y — факт минус прогноз; отрицательные остатки означают переоценку.</div></div>

---

<!-- S67 -->
<WeekNineHeader section="Закономерность → гипотеза" title="Входам не хватает признака уровня спроса?" />
<div class="w9-body"><table class="w9-table"><thead><tr><th>Оценочные дни</th><th>Средний факт</th><th>Средний прогноз</th></tr></thead><tbody><tr><td>2011</td><td>≈ 3485</td><td>≈ 4396</td></tr><tr><td>2012</td><td>≈ 5820</td><td>≈ 4648</td></tr></tbody></table><div class="w9-text">Фактические уровни различаются сильнее, чем прогнозы.<br>Модель без года может усреднять дни с похожей погодой из разных лет.</div><div class="w9-question">Гипотеза: добавление года уменьшит это смещение.</div><div class="w9-small">Это проверяемое предположение о модели, а не доказательство причины роста прокатов.</div></div>

---

<!-- S68 -->
<WeekNineHeader section="Эксперимент · до просмотра результата" title="Переобучим ту же процедуру с годом" />
<div class="w9-body"><div class="w9-grid"><div class="w9-box w9-text"><b>Базовая модель</b><br>Сезон, праздник, рабочий день, погода, температура, влажность, ветер.</div><div class="w9-box w9-text"><b>Расширенная модель</b><br>Те же семь признаков<br>+ год: 2011 или 2012.</div></div><div class="w9-text">Тот же алгоритм случайного леса с теми же настройками.<br>Те же 487 обучающих и 243 оценочных дня; сравним MAE и ошибки по годам.</div><div class="w9-small">Здесь переобучаем модель; в опытах PI, PDP и ICE она оставалась фиксированной.<br>Год известен для этих дней. Лаги спроса и производные целевой не добавляем.</div></div>

---

<!-- S69 -->
<WeekNineHeader section="Эксперимент · результат" title="Год уменьшил ошибки в обеих группах" />
<div class="w9-body"><table class="w9-table"><thead><tr><th>MAE, прокатов/день</th><th>Семь признаков</th><th>+ год</th></tr></thead><tbody><tr><td>Все 243 дня</td><td>1120,24</td><td>569,49</td></tr><tr><td>2011</td><td>957,84</td><td>451,76</td></tr><tr><td>2012</td><td>1281,31</td><td>686,25</td></tr></tbody></table><div class="w9-result">MAE снизилась на 550,75, то есть примерно на 551 прокат/день.<br>Улучшилась не только средняя метрика: ошибки сократились в обоих годах.</div><div class="w9-small">Гипотезу и улучшение нашли на одной оценочной выборке.<br>Для подтверждения нужна новая независимая оценка.</div></div>

---

<!-- S70 -->
<WeekNineHeader section="Итак · диагностика" title="От ошибки к проверяемому изменению модели" />
<div class="w9-body w9-recap"><div><b>1.</b> Измерить общую ошибку и определить знак остатка.</div><div><b>2.</b> Найти группы с систематическим отклонением.</div><div><b>3.</b> Сформулировать содержательную гипотезу о недостающей информации.</div><div><b>4.</b> Сравнить процедуры, изменив один фактор.</div><div><b>5.</b> Отделить исследовательский результат от независимой проверки.</div></div>

---

<!-- S71 -->
<WeekNineHeader section="Итоги лекции" title="Каждому исследовательскому вопросу — свой инструмент" />
<div class="w9-body"><table class="w9-table w9-summary w9-final"><thead><tr><th>Вопрос</th><th>Инструмент и смысл ответа</th></tr></thead><tbody><tr><td>Как получен прогноз?</td><td>Коэффициенты и путь по дереву: устройство конкретного решения.</td></tr><tr><td>Что использует модель?</td><td>MDI: выигрыш правил на train.<br>PI: изменение качества при разрушении одного входа.</td></tr><tr><td>Как меняются прогнозы?</td><td>PDP: средняя форма. ICE: индивидуальные реакции.<br>Centered ICE: изменения от собственного старта.</td></tr><tr><td>Где модель ошибается?</td><td>Остатки и метрики по группам → гипотеза → эксперимент → проверка.</td></tr></tbody></table><div class="w9-text">Сначала формулируем исследовательский вопрос, затем выбираем:<br>важность входов, форму прогнозов или диагностику ошибок.</div></div>
