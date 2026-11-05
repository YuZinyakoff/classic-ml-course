---
theme: default
title: Решающие деревья
author: НИУ ВШЭ
info: |
  Неделя 8. Решающие деревья.
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
appendixSlides: 16
exportFilename: week-08-decision-trees
download: false
---

<!-- S01 -->
<WeekEightHeader section="Модель из пороговых условий" title="Решающие деревья" cover />
<div class="w8-body"><div class="w8-grid">
<div class="w8-stack"><div class="w8-question">Как последовательность простых вопросов становится моделью?</div><div class="w8-text mt-7">Разбиваем объекты на группы,<br>в которых достаточно простого прогноза.</div></div>
<WeekEightTree />
</div>
</div>

---

<!-- S02 -->
<WeekEightHeader section="Готовая модель" title="Устройство дерева" />
<div class="w8-body"><div class="w8-grid">
<WeekEightTree terms />
<div class="w8-stack"><div class="w8-text"><b>Корень</b> — начальный узел дерева.<br>Над ним нет других узлов.</div><div class="w8-text"><b>Внутренний узел</b> проверяет условие.<br><b>Лист</b> возвращает прогноз.</div><div class="w8-text"><b>Ветвь</b> выбирается по ответу:<br>да → налево, нет → направо.</div><div class="w8-result">Глубина узла — число рёбер от корня.<br>В дереве из одного листа корень сам является листом.</div></div>
</div></div>

---
clicks: 1
---

<!-- S03 -->
<WeekEightHeader section="Готовая модель" title="Пороговое условие" />
<div class="w8-body">
<MathBlock formula="x_j\le t" class="w8-formula" />
<div class="w8-flow"><div>Выбираем признак<br><b>j</b></div><b>+</b><div>Выбираем порог<br><b>t</b></div><b>→</b><div>Получаем ответ<br><b>да / нет</b></div></div>
<div v-click="1" class="w8-stack"><MathBlock formula="\mathbb I\{x_j\le t\}=\begin{cases}1,&\text{условие выполнено},\\0,&\text{условие не выполнено}.\end{cases}" /><div class="w8-note text-center">Такую проверку называют предикатом. Значение индикатора — не прогноз класса.</div></div>
</div>

---
clicks: 2
---

<!-- S04 -->
<WeekEightHeader section="Готовая модель" title="Путь нового объекта" />
<div class="w8-body"><div class="w8-grid">
<WeekEightTree :route="$clicks" />
<div class="w8-stack"><MathBlock formula="3.4\le2.5\;?\quad\text{Нет}" /><div v-click="1"><MathBlock formula="2.2\le1.5\;?\quad\text{Нет}" /></div><div v-click="2" class="w8-result">Достигнут правый нижний лист.<br>Прогноз: <span class="w8-orange">класс 1</span>.</div></div>
</div></div>

---

<!-- S05 -->
<WeekEightHeader section="Готовая модель" title="Длина пути" />
<div class="w8-body"><div class="w8-grid"><WeekEightTree :route="3" terms /><div class="w8-stack"><div class="w8-text">Для x = (1, 3) первое условие выполнено: 1 ≤ 2.5.</div><div class="w8-result">Левый лист: класс 0.<br>Путь содержит одно ребро, глубина этого листа — 1.</div><div class="w8-text">У разных объектов путь по одному дереву может иметь разную длину.</div></div></div></div>

---
clicks: 2
---

<!-- S06 -->
<WeekEightHeader section="Готовая модель" title="Прогнозы листа" />
<div class="w8-body"><div class="w8-note">В другой задаче в достигнутый лист при обучении попали 10 объектов.</div><div class="w8-grid"><WeekEightCounts :zero="3" :one="7" label="3 нуля · 7 единиц" /><div class="w8-stack"><div v-click="1"><MathBlock formula="\hat p_k(x)=\frac{n_{\text{leaf},k}}{n_{\text{leaf}}}" /><MathBlock formula="\hat p_0(x)=0.3,\quad\hat p_1(x)=0.7" /></div><div v-click="2" class="w8-result"><b>predict:</b> класс большинства — 1.<br><b>predict_proba:</b> (0.3, 0.7), доли обучающих объектов этого листа.</div></div></div></div>

---
clicks: 2
---

<!-- S07 -->
<WeekEightHeader section="Готовая модель" title="Области постоянного прогноза" />
<div class="w8-body"><div class="w8-grid"><WeekEightTree :stage="$clicks===0?1:2" /><WeekEightPoints :regions="$clicks===0?1:2" :query="$clicks>=2" /></div><div class="w8-result">Первый порог делит всю плоскость. Второй — только правую область.<br>Внутри каждой конечной области прогноз постоянен.</div></div>

---

<!-- S08 -->
<WeekEightHeader section="Готовая модель" title="Регрессионное дерево" />
<div class="w8-body"><div class="w8-grid w8-pair"><WeekEightSplit regression :left="3" :right="3" condition="x ≤ 3.5?" left-detail="y: 1, 2, 1" right-detail="y: 7, 8, 9" /><WeekEightRegression :split="3.5" prediction /></div><div class="w8-result">В регрессии листья хранят числа. Каждому листу соответствует интервал с постоянным прогнозом — ступенька графика.</div></div>

---

<!-- S09 -->
<WeekEightHeader section="Готовая модель" title="От условий к прогнозу" />
<div class="w8-body"><div class="w8-flow"><div><b>Внутренние узлы</b><br>проверяют условия</div><b>→</b><div><b>Путь объекта</b><br>выбирает область</div><b>→</b><div><b>Лист</b><br>возвращает прогноз</div></div><div class="w8-grid"><div class="w8-stack"><div class="w8-subtitle">Классификация</div><div class="w8-text">Класс большинства и доли классов в листе.</div></div><div class="w8-stack"><div class="w8-subtitle">Регрессия</div><div class="w8-text">Постоянное число в каждом листе.</div></div></div><div class="w8-result">Теперь нужно научиться находить условия и прогнозы листьев по данным.</div></div>

---

<!-- S10 -->
<WeekEightHeader section="Обучение: общий принцип" title="Дерево из одного листа" />
<div class="w8-body"><div class="w8-grid"><WeekEightPoints /><WeekEightSplit single /></div><div class="w8-result">Начальная модель состоит из одного листа: всем 12 объектам назначается класс большинства — 0.</div></div>

---
clicks: 1
---

<!-- S11 -->
<WeekEightHeader section="Обучение: общий принцип" title="Кандидаты на разбиение" />
<div class="w8-body"><div class="w8-grid"><WeekEightPoints :axis="$clicks?'x1':'x2'" :threshold="$clicks?2.5:1.5" /><WeekEightSplit :condition="$clicks?'x₁ ≤ 2.5?':'x₂ ≤ 1.5?'" :left-zero="$clicks?6:4" :right-zero="$clicks?2:4" :right-one="4" /></div><div class="w8-result">Проверка условия создаёт две дочерние группы. Меняя признак и порог, получаем разные разбиения тех же объектов.</div></div>

---
clicks: 1
---

<!-- S12 -->
<WeekEightHeader section="Обучение: общий принцип" title="Рекурсивный рост" />
<div class="w8-body"><div class="w8-grid"><WeekEightTree :stage="$clicks===0?1:2" counts /><div class="w8-stack"><div class="w8-text">Покажем возможное продолжение роста: левый узел чист, правый ещё смешан.</div><div v-click="1" class="w8-result">В правом узле повторяем тот же поиск условия, используя только его объекты. Это рекурсивный шаг.</div><div class="w8-note">Пока демонстрируем механизм. После введения критерия проверим, какие условия действительно лучшие.</div></div></div></div>

---

<!-- S13 -->
<WeekEightHeader section="Обучение: общий принцип" title="Когда узел становится листом" />
<div class="w8-body"><div class="w8-grid"><WeekEightTree counts /><div class="w8-stack"><div class="w8-text">Поиск в узле заканчивается, когда:</div><ul class="w8-bullets w8-text"><li>все объекты имеют один класс;</li><li>нет допустимого разбиения;</li><li>достигнуто ограничение сложности.</li></ul><div class="w8-result">Если дальше не разбиваем, узел становится листом. В нём сохраняем прогноз по объектам этого узла.</div></div></div></div>

---

<!-- S14 -->
<WeekEightHeader section="Обучение: общий принцип" title="Обучение и применение" />
<div class="w8-body"><div class="w8-grid"><div class="w8-stack"><div class="w8-subtitle">fit: найти структуру</div><div class="w8-text">Выбрать условия разбиения и посчитать прогнозы листьев по train.</div></div><div class="w8-stack"><div class="w8-subtitle">predict: применить структуру</div><div class="w8-text">Пройти по сохранённым условиям и вернуть прогноз листа.</div></div></div><div class="w8-question">Как сравнить два варианта разбиения?</div><div class="w8-result">Нужна численная мера того, насколько уменьшилась неоднородность ответов в дочерних группах.</div></div>

---

<!-- S15 -->
<WeekEightHeader section="Регрессия: выбор разбиения" title="Данные для регрессии" />
<div class="w8-body"><div class="w8-grid"><WeekEightRegression /><div class="w8-stack"><table class="w8-table w8-table-compact"><tbody><tr><th>x</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr><tr><th>y</th><td>1</td><td>2</td><td>1</td><td>7</td><td>8</td><td>9</td></tr></tbody></table><div class="w8-question">Какой постоянный прогноз выбрать в одном листе?</div></div></div></div>

---
clicks: 1
---

<!-- S16 -->
<WeekEightHeader section="Регрессия: выбор разбиения" title="Среднее в листе" />
<div class="w8-body"><div class="w8-grid"><WeekEightRegression prediction /><div class="w8-stack"><MathBlock formula="\hat y_{\text{leaf}}=\bar y=\frac1n\sum_{i=1}^{n}y_i" /><div v-click="1"><MathBlock formula="\bar y=\frac{1+2+1+7+8+9}{6}" /><MathBlock formula="\bar y=\frac{14}{3}\approx4.67" /></div><div class="w8-note">Среднее минимизирует сумму квадратов отклонений от постоянного прогноза.</div></div></div></div>

---
clicks: 1
---

<!-- S17 -->
<WeekEightHeader section="Регрессия: выбор разбиения" title="RSS и MSE" />
<div class="w8-body"><div class="w8-grid"><WeekEightRegression prediction residuals /><div class="w8-stack"><MathBlock formula="\operatorname{RSS}(S)=\sum_{i\in S}(y_i-\bar y_S)^2" /><div v-click="1"><MathBlock formula="\operatorname{RSS}=\frac{208}{3}\approx69.33" /><MathBlock formula="\operatorname{MSE}=\frac{\operatorname{RSS}}{6}=\frac{104}{9}\approx11.56" /></div><div class="w8-note">RSS — сумма. MSE — средняя квадратичная ошибка на объект.</div></div></div></div>

---
clicks: 1
---

<!-- S18 -->
<WeekEightHeader section="Регрессия: выбор разбиения" title="Порог 3.5" />
<div class="w8-body"><div class="w8-grid"><WeekEightRegression :split="3.5" prediction /><div class="w8-stack"><div class="w8-text">Слева: y = (1, 2, 1).</div><MathBlock formula="\bar y_L=\frac43" /><div v-click="1"><div class="w8-text">Справа: y = (7, 8, 9).</div><MathBlock formula="\bar y_R=8" /></div><div class="w8-result">Порог x ≤ 3.5 выделил группы объектов с низкими и высокими значениями y.</div></div></div></div>

---
clicks: 2
---

<!-- S19 -->
<WeekEightHeader section="Регрессия: выбор разбиения" title="Ошибка двух листьев" />
<div class="w8-body">
<MathBlock formula="\operatorname{RSS}_L=(1-\tfrac43)^2+(2-\tfrac43)^2+(1-\tfrac43)^2=\frac23" />
<div v-click="1"><MathBlock formula="\operatorname{RSS}_R=(7-8)^2+(8-8)^2+(9-8)^2=2" /></div>
<div v-click="2" class="w8-result"><MathBlock formula="\operatorname{RSS}_{\text{after}}=\frac23+2=\frac83\approx2.67" /><div class="text-center">Было 69.33 → стало 2.67 на тех же шести объектах.</div></div>
</div>

---
clicks: 1
---

<!-- S20 -->
<WeekEightHeader section="Регрессия: выбор разбиения" title="От одного листа к двум" />
<div class="w8-body"><div class="w8-grid w8-pair"><WeekEightSplit regression :single="$clicks===0" condition="x ≤ 3.5?" :left="3" :right="3" /><WeekEightRegression :split="$clicks?3.5:0" prediction /></div><div class="w8-result">Порог 3.5 создаёт два листа со своими средними.<br>Сумма их RSS равна 8/3 вместо 208/3 у исходного листа.</div></div>

---
clicks: 1
---

<!-- S21 -->
<WeekEightHeader section="Регрессия: выбор разбиения" title="Порог 4.5" />
<div class="w8-body"><div class="w8-grid"><WeekEightRegression :split="4.5" prediction residuals /><div class="w8-stack"><div class="w8-text">Слева: (1, 2, 1, 7), среднее 2.75.<br>Справа: (8, 9), среднее 8.5.</div><MathBlock formula="\operatorname{RSS}_L=24.75,\quad\operatorname{RSS}_R=0.5" /><div v-click="1" class="w8-result"><MathBlock formula="\operatorname{RSS}_{\text{after}}=\operatorname{RSS}_L+\operatorname{RSS}_R=25.25" />Порог 3.5 лучше: суммарная ошибка меньше.</div></div></div><div class="w8-text">Каждая RSS уже суммирует ошибки всех объектов своей группы. Складываем суммы без дополнительных весов.</div></div>

---

<!-- S22 -->
<WeekEightHeader section="Регрессия: выбор разбиения" title="Перебор порогов" />
<div class="w8-body"><div class="w8-grid"><WeekEightRegression scan /><div class="w8-stack"><div class="w8-text">Упорядоченные x:<br>1, 2, 3, 4, 5, 6.</div><div class="w8-text">Кандидаты:<br>1.5, 2.5, 3.5, 4.5, 5.5.</div><div class="w8-result">Минимум RSS — при 3.5.<br>Сравниваем разбиения одних и тех же объектов.</div></div></div></div>

---
clicks: 1
---

<!-- S23 -->
<WeekEightHeader section="Регрессия: выбор разбиения" title="От суммы ошибок к средней" />
<div class="w8-body"><div class="w8-grid"><WeekEightSplit sizes :n="6" :left="4" :right="2" caption="Тот же порог 4.5: четыре объекта и два" /><div class="w8-stack"><div class="w8-text">Теперь хотим среднюю ошибку на объект. MSE каждой группы — её RSS, делённая на размер.</div><MathBlock formula="\operatorname{MSE}_L=\frac{24.75}{4}=6.1875" /><MathBlock formula="\operatorname{MSE}_R=\frac{0.5}{2}=0.25" /></div></div><div v-click="1" class="w8-result"><MathBlock formula="\operatorname{MSE}_{\text{after}}=\frac46\cdot6.1875+\frac26\cdot0.25=\frac{25.25}{6}\approx4.2083" />В среднюю по всем объектам большая группа вносит больший вклад.</div></div>

---
clicks: 1
---

<!-- S24 -->
<WeekEightHeader section="Выбор разбиения: общая схема" title="Мера неоднородности узла" />
<div class="w8-body"><div class="w8-text">S — объекты текущего узла; S<sub>L</sub> и S<sub>R</sub> — левая и правая дочерние группы.<br>H(S) — выбранная для задачи мера неоднородности ответов.</div><MathBlock formula="n=|S|,\qquad n_L=|S_L|,\qquad n_R=|S_R|,\qquad n_L+n_R=n" /><div class="w8-text">После разбиения усредняем неоднородности дочерних групп с весами по долям объектов:</div><MathBlock formula="H_{\text{after}}=\frac{n_L}{n}H(S_L)+\frac{n_R}{n}H(S_R)" class="w8-formula" /><div v-click="1" class="w8-result">Для нашей регрессии выбираем H(S) = MSE(S).<br>В классификации понадобится другая функция H.</div></div>

---
clicks: 1
---

<!-- S25 -->
<WeekEightHeader section="Регрессия: выбор разбиения" title="RSS и взвешенная MSE" />
<div class="w8-body"><div class="w8-text">Подставим H(S) = MSE(S) = RSS(S) / |S| в общую формулу.</div><MathBlock formula="H_{\text{after}}=\frac{n_L}{n}\frac{\operatorname{RSS}_L}{n_L}+\frac{n_R}{n}\frac{\operatorname{RSS}_R}{n_R}" class="w8-formula" /><div v-click="1" class="w8-stack"><MathBlock formula="H_{\text{after}}=\frac{\operatorname{RSS}_L+\operatorname{RSS}_R}{n}" class="w8-formula" /><div class="w8-result">Для одного исходного узла n постоянно. Минимум суммарной RSS и минимум взвешенной MSE выбирают одно и то же разбиение.</div></div></div>

---
clicks: 1
---

<!-- S26 -->
<WeekEightHeader section="Регрессия: выбор разбиения" title="Взвешенная MSE: порог 3.5" />
<div class="w8-body"><div class="w8-text">Вернёмся к лучшему порогу: по три объекта в каждой группе, RSS слева — 2/3, справа — 2.</div><MathBlock formula="H(S_L)=\frac{2/3}{3}=\frac29,\qquad H(S_R)=\frac23" /><div v-click="1" class="w8-stack"><MathBlock formula="H_{\text{after}}=\frac36\cdot\frac29+\frac36\cdot\frac23=\frac49" class="w8-formula" /><div class="w8-result">Та же ошибка в другом масштабе:<MathBlock formula="\frac{\operatorname{RSS}_L+\operatorname{RSS}_R}{n}=\frac{8/3}{6}=\frac49" /></div></div></div>

---
clicks: 1
---

<!-- S27 -->
<WeekEightHeader section="Выбор разбиения: общая схема" title="Уменьшение неоднородности" />
<div class="w8-body"><div class="w8-text">Для каждого допустимого условия сравниваем неоднородность до и после разбиения:</div><MathBlock formula="\Delta H=H(S)-H_{\text{after}}" class="w8-formula" /><div class="w8-text">Выбираем наибольший ΔH. При фиксированном узле это означает наименьший H<sub>after</sub>.</div><div v-click="1"><MathBlock formula="\Delta H_{\mathrm{MSE}}=\frac{104}{9}-\frac49=\frac{100}{9}\approx11.11" /></div><div class="w8-result">В регрессии использовали MSE. Для классификации сохраним схему выбора, но определим другую неоднородность H.</div></div>

---

<!-- S28 -->
<WeekEightHeader section="Классификация: выбор разбиения" title="Выбор разбиения для классов" />
<div class="w8-body"><div class="w8-grid"><WeekEightPoints /><div class="w8-stack"><WeekEightCounts label="8 нулей · 4 единицы" /><div class="w8-text">Вернёмся к тем же 12 объектам. В листе предсказываем класс большинства.</div><div class="w8-question">Можно ли взять долю ошибок как неоднородность H?</div></div></div></div>

---
clicks: 1
---

<!-- S29 -->
<WeekEightHeader section="Классификация: выбор разбиения" title="Ошибка класса большинства" />
<div class="w8-body"><div class="w8-grid"><WeekEightCounts label="8 верных прогнозов · 4 ошибки" /><div class="w8-stack"><div class="w8-text">Лучший постоянный прогноз — класс большинства. Доля верных ответов равна наибольшей доле класса pₖ.</div><MathBlock formula="H_{\mathrm{error}}(S)=1-\max_k p_k" /><div v-click="1"><MathBlock formula="H_{\mathrm{error}}(S)=1-\frac8{12}=\frac13" /></div></div></div><div class="w8-result">Это мера неоднородности: у чистого узла она равна 0. Для двух классов максимум — 1/2, когда классы представлены поровну.</div></div>

---
clicks: 2
---

<!-- S30 -->
<WeekEightHeader section="Классификация: выбор разбиения" title="Разбиение без снижения ошибки" />
<div class="w8-body"><div class="w8-grid"><WeekEightPoints axis="x2" :threshold="1.5" /><div class="w8-stack"><div><span class="w8-green">Слева: 4 нуля.</span><br>Чистый лист, ошибок 0.</div><div v-click="1">Справа: 4 нуля и 4 единицы.<br>При любом выборе класса — 4 ошибки.</div><div v-click="2" class="w8-result"><MathBlock formula="H_{\text{after}}=\frac4{12}\cdot0+\frac8{12}\cdot\frac12=\frac13" />Было 4 ошибки → осталось 4.</div></div></div></div>

---
clicks: 2
---

<!-- S31 -->
<WeekEightHeader section="Классификация: выбор разбиения" title="Полезный промежуточный шаг" />
<div class="w8-body"><div class="w8-grid"><WeekEightAlternativePath :stage="$clicks" /><div class="w8-stack"><div class="w8-subtitle">Один из возможных маршрутов</div><div class="w8-text">До: 8 нулей и 4 единицы.<br>Прогноз класса 0 → 4 ошибки.</div><div v-click="1" class="w8-text">После x₂ ≤ 1.5: чистая группа и смешанная 4/4 → всё ещё 4 ошибки.</div><div v-click="2" class="w8-result">В смешанной группе проверка x₁ ≤ 2.5 даёт две чистые группы → 0 ошибок на train.</div></div></div><div v-click="2" class="w8-text">Нужен критерий, замечающий изменение долей классов ещё до уменьшения числа ошибок.</div></div>

---
clicks: 1
---

<!-- S32 -->
<WeekEightHeader section="Классификация: выбор разбиения" title="Неоднородность Gini" />
<div class="w8-body"><MathBlock formula="G(S)=1-\sum_{k=1}^{K}p_k^2,\qquad p_k=\frac{n_k}{n}" class="w8-formula" /><div class="w8-text text-center">pₖ — доля класса k среди объектов текущего узла.<br>Сумма долей классов равна 1.</div><div v-click="1" class="w8-result">Меньше Gini → классы смешаны слабее.<br>У чистого узла Gini равен 0.</div><div class="w8-note">Здесь Gini — критерий неоднородности классов.</div></div>

---
clicks: 1
---

<!-- S33 -->
<WeekEightHeader section="Классификация: выбор разбиения" title="Gini для двух классов" />
<div class="w8-body"><div class="w8-grid"><WeekEightPlot kind="gini" /><div class="w8-stack"><div class="w8-text">Бинарный случай: K = 2,<br>p — доля класса 1 в узле.</div><MathBlock formula="G(p)=1-p^2-\left(1-p\right)^2" /><MathBlock formula="G(p)=2p(1-p)" /><div class="w8-text">Чистый узел: G = 0.<br>При 50/50: G = 0.5, максимум.</div><div v-click="1" class="w8-result">p = 0.2 → G = 0.32.</div></div></div></div>

---
clicks: 1
---

<!-- S34 -->
<WeekEightHeader section="Классификация: выбор разбиения" title="Gini исходного узла" />
<div class="w8-body"><div class="w8-grid"><WeekEightCounts label="8 нулей · 4 единицы" /><div class="w8-stack"><MathBlock formula="p_0=\frac8{12}=\frac23,\quad p_1=\frac4{12}=\frac13" /><div v-click="1"><MathBlock formula="G(S)=1-\left(\frac23\right)^2-\left(\frac13\right)^2=\frac49" /></div></div></div><div class="w8-note text-center">Это общая отправная точка для всех кандидатов в данном узле.</div></div>

---
clicks: 2
---

<!-- S35 -->
<WeekEightHeader section="Классификация: выбор разбиения" title="Кандидат A: x₂ ≤ 1.5" />
<div class="w8-body"><div class="w8-grid"><WeekEightPoints axis="x2" :threshold="1.5" /><div class="w8-stack"><div class="w8-text">Слева: (4 нуля, 0 единиц), G = 0.<br>Справа: (4 нуля, 4 единицы), G = 1/2.</div><div v-click="1"><MathBlock formula="G_{\text{after}}=\frac4{12}\cdot0+\frac8{12}\cdot\frac12=\frac13" /></div><div v-click="2" class="w8-result"><MathBlock formula="\Delta G_A=\frac49-\frac13=\frac19" />Gini заметил полезное изменение.</div></div></div></div>

---
clicks: 2
---

<!-- S36 -->
<WeekEightHeader section="Классификация: выбор разбиения" title="Кандидат B: x₁ ≤ 2.5" />
<div class="w8-body"><div class="w8-grid"><WeekEightPoints axis="x1" :threshold="2.5" /><div class="w8-stack"><div class="w8-text">Слева: 6 нулей, G = 0.<br>Справа: 2 нуля и 4 единицы.</div><MathBlock formula="G_R=1-\left(\frac13\right)^2-\left(\frac23\right)^2=\frac49" /><div v-click="1"><MathBlock formula="G_{\text{after}}=\frac6{12}\cdot0+\frac6{12}\cdot\frac49=\frac29" /></div><div v-click="2" class="w8-result"><MathBlock formula="\Delta G_B=\frac49-\frac29=\frac29" /></div></div></div></div>

---

<!-- S37 -->
<WeekEightHeader section="Классификация: выбор разбиения" title="Выбор по Gini" />
<div class="w8-body"><table class="w8-table"><thead><tr><th>Кандидат</th><th>Размеры групп</th><th>G после</th><th>ΔG</th></tr></thead><tbody><tr><td>A: x₂ ≤ 1.5</td><td>4 и 8</td><td>1/3</td><td>1/9</td></tr><tr class="w8-win"><td>B: x₁ ≤ 2.5</td><td>6 и 6</td><td>2/9</td><td>2/9</td></tr></tbody></table><div class="w8-result">Gini заметил улучшение состава групп при A и больший выигрыш при B. Оцениваем всё разбиение с учётом размеров групп.</div><div class="w8-text">Gini — не единственная мера: можно оценивать неопределённость класса через энтропию.</div></div>

---

<!-- S38 -->
<WeekEightHeader section="Классификация: выбор разбиения" title="Неопределённость класса" />
<div class="w8-body"><div class="w8-text">Известны доли классов в узле. Хотим измерить неопределённость класса случайного объекта до того, как узнаем его значение.</div><div class="w8-three"><div><WeekEightCounts :zero="5" :one="5" label="50% / 50%" /><div class="w8-text text-center">Два одинаково вероятных класса.</div></div><div><WeekEightCounts :zero="9" :one="1" label="90% / 10%" /><div class="w8-text text-center">Один класс встречается гораздо чаще.</div></div><div><WeekEightCounts :zero="10" :one="0" label="100% / 0%" /><div class="w8-text text-center">Класс уже известен.</div></div></div><div class="w8-question">Как количественно измерить эту неопределённость?</div></div>

---
clicks: 1
---

<!-- S39 -->
<WeekEightHeader section="Классификация: энтропия" title="Энтропия Шеннона" />
<div class="w8-body w8-entropy-tight"><div class="w8-text">Энтропия измеряет неопределённость класса по его распределению в узле.</div><MathBlock formula="H_{\mathrm{ent}}(S)=-\sum_{k=1}^{K}p_k\log_2p_k" class="w8-formula" /><div class="w8-grid"><div class="w8-text">S — объекты текущего узла;<br>K — число возможных классов;<br>p<sub>k</sub> — доля класса k в узле.</div><div class="w8-text">Равномернее доли → выше неопределённость.<br>Один возможный класс → энтропия 0.</div></div><div v-click="1" class="w8-result">Основание логарифма 2 задаёт единицу — <b>бит</b>.<br>Два равновероятных класса: 1 бит.</div><div class="w8-note">Подробное объяснение через информацию и коды — в приложении A1–A16 после итогов лекции.</div></div>

---

<!-- S40 -->
<WeekEightHeader section="Классификация: энтропия" title="Неопределённость: два примера" />
<div class="w8-body w8-entropy-examples"><div class="w8-grid"><div class="w8-stack"><WeekEightCounts :zero="5" :one="5" label="50% / 50%" /><MathBlock formula="\begin{aligned}H_{\mathrm{ent}}&=-0.5\log_2 0.5-0.5\log_2 0.5\\&=1\ \text{бит}\end{aligned}" /><div class="w8-text text-center">Ни один класс не преобладает.</div></div><div class="w8-stack"><WeekEightCounts :zero="9" :one="1" label="90% / 10%" /><MathBlock formula="\begin{aligned}H_{\mathrm{ent}}&=-0.9\log_2 0.9-0.1\log_2 0.1\\&\approx0.469\ \text{бита}\end{aligned}" /><div class="w8-text text-center">Один класс гораздо вероятнее.</div></div></div><div class="w8-result">При 90/10 класс в среднем предсказуемее, чем при 50/50.<br>Энтропия ниже, хотя неопределённость ещё не исчезла.</div></div>

---

<!-- S41 -->
<WeekEightHeader section="Классификация: энтропия" title="Энтропия двух классов" />
<div class="w8-body w8-entropy-tight w8-entropy-shape"><div class="w8-grid"><WeekEightPlot kind="entropy" /><div class="w8-stack"><div class="w8-text">p — доля класса 1,<br>1 − p — доля класса 0.</div><MathBlock formula="\begin{aligned}H(p)={}&-(1-p)\log_2(1-p)\\&-p\log_2p\end{aligned}" /><div class="w8-result">Чистый узел: 0 бит.<br>Доли 50/50: максимум 1 бит.</div><div class="w8-text">Как и Gini, энтропия — мера неоднородности классов.</div></div></div><div class="w8-note">Для отсутствующего класса вклад принимаем равным 0: это предел −p log₂ p при p → 0+, а не подстановка log₂ 0.</div></div>

---

<!-- S42 -->
<WeekEightHeader section="Классификация: выбор разбиения" title="Энтропия в узлах дерева" />
<div class="w8-body w8-entropy-tight"><div class="w8-note">Снова прежние 12 обучающих объектов: 8 нулей и 4 единицы. Энтропию долей классов узла S обозначаем H<sub>ent</sub>(S).</div><MathBlock formula="H_{\mathrm{ent}}(S)=-\frac8{12}\log_2\frac8{12}-\frac4{12}\log_2\frac4{12}\approx0.918\ \text{бита}" /><div class="w8-grid"><WeekEightSplit condition="x₂ ≤ 1.5?" :left-zero="4" :right-zero="4" :right-one="4" /><div class="w8-stack"><div class="w8-text">Слева доли (1, 0): класс уже известен.</div><MathBlock formula="H_{\mathrm{ent}}(S_L)=-1\log_2 1=0" /><div class="w8-text">Справа доли (1/2, 1/2):</div><MathBlock formula="H_{\mathrm{ent}}(S_R)=-\frac12\log_2\frac12-\frac12\log_2\frac12=1" /></div></div></div>

---
clicks: 1
---

<!-- S43 -->
<WeekEightHeader section="Классификация: выбор разбиения" title="Информационный выигрыш" />
<div class="w8-body w8-entropy-tight"><div class="w8-grid"><WeekEightSplit condition="x₂ ≤ 1.5?" :left-zero="4" :right-zero="4" :right-one="4" /><div class="w8-stack"><div class="w8-text">Используем энтропию как H в общей схеме. До разбиения H<sub>ent</sub>(S) ≈ 0.918 бита.</div><MathBlock formula="H_{\mathrm{ent,after}}=\frac4{12}\cdot0+\frac8{12}\cdot1=\frac23" /><div v-click="1" class="w8-result"><MathBlock formula="\begin{aligned}IG&=H_{\mathrm{ent}}(S)-H_{\mathrm{ent,after}}\\&\approx0.918296-0.666667\\&\approx0.252\ \text{бита}\end{aligned}" /></div></div></div><div class="w8-text">IG — среднее уменьшение неопределённости истинной метки, когда известна дочерняя группа объекта.</div><div class="w8-note">IG не равен числу бит в ответе на условие. Качество прогнозов на validation проверяют отдельно.</div></div>

---
clicks: 1
---

<!-- S44 -->
<WeekEightHeader section="Классификация: выбор разбиения" title="Энтропия после разбиения B" />
<div class="w8-body w8-entropy-tight"><div class="w8-grid"><WeekEightSplit condition="x₁ ≤ 2.5?" :left-zero="6" :right-zero="2" :right-one="4" /><div class="w8-stack"><div class="w8-text">Слева 6 нулей: H<sub>ent</sub>(S<sub>L</sub>) = 0.</div><div class="w8-text">Справа 2 нуля и 4 единицы:<br>доли (1/3, 2/3).</div><MathBlock formula="\begin{aligned}H_{\mathrm{ent}}(S_R)&=H_{\mathrm{ent}}(1/3,2/3)\\&\approx0.918\end{aligned}" /><div class="w8-note">Это те же доли 2/3 и 1/3, что в исходном узле, только в обратном порядке.</div></div></div><div v-click="1" class="w8-result"><MathBlock formula="H_{\mathrm{ent,after},B}=\frac6{12}\cdot0+\frac6{12}\cdot0.918296\approx0.459148" />Обе группы содержат по 6 из 12 объектов: их веса равны 1/2.</div></div>

---
clicks: 1
---

<!-- S45 -->
<WeekEightHeader section="Классификация: выбор разбиения" title="Выбор по информационному выигрышу" />
<div class="w8-body"><div class="w8-text">Берём H = H<sub>ent</sub>: для 12 объектов H<sub>ent</sub>(S) ≈ 0.918296 бита.</div><MathBlock formula="H_{\mathrm{after}}=\frac{n_L}{n}H(S_L)+\frac{n_R}{n}H(S_R),\quad IG=\Delta H=H(S)-H_{\mathrm{after}}" /><table class="w8-table w8-table-compact"><thead><tr><th>Разбиение</th><th>Энтропия после, бит</th><th>IG, бит</th></tr></thead><tbody><tr><td>A: x₂ ≤ 1.5</td><td>2/3 ≈ 0.667</td><td>≈ 0.252</td></tr><tr :class="$clicks>=1?'w8-win':''"><td>B: x₁ ≤ 2.5</td><td>(1/2) · H<sub>ent</sub>(1/3, 2/3) ≈ 0.459</td><td>≈ 0.459</td></tr></tbody></table><div v-click="1" class="w8-result">Больший IG у B: 0.918296 − 0.459148 ≈ 0.459 бита.<br>В этом примере и Gini, и энтропия выбирают B.</div><div class="w8-note">В других данных критерии могут ранжировать кандидатов по-разному. Далее строим CART по Gini.</div></div>

---

<!-- S46 -->
<WeekEightHeader section="Классификация: выбор разбиения" title="Что сравнивает алгоритм" />
<div class="w8-body"><div class="w8-flow"><div><b>Распределение классов</b><br>в текущем узле</div><b>→</b><div><b>Gini или энтропия</b><br>выбираем меру H</div><b>→</b><div><b>Наибольший ΔH</b><br>выбираем условие</div></div><div class="w8-result">Gini и энтропия — альтернативные меры неоднородности классов.</div><div class="w8-question">Далее построим CART целиком, используя Gini.</div></div>

---

<!-- S47 -->
<WeekEightHeader section="Рекурсивное обучение CART" title="Пять кандидатов в корне" />
<div class="w8-body"><table class="w8-table"><thead><tr><th>Условие</th><th>nL / nR</th><th>Выигрыш Gini</th></tr></thead><tbody><tr><td>x₁ ≤ 1.5</td><td>3 / 9</td><td>2/27 ≈ 0.074</td></tr><tr class="w8-win"><td>x₁ ≤ 2.5</td><td>6 / 6</td><td>2/9 ≈ 0.222</td></tr><tr><td>x₁ ≤ 3.5</td><td>9 / 3</td><td>2/27 ≈ 0.074</td></tr><tr><td>x₂ ≤ 1.5</td><td>4 / 8</td><td>1/9 ≈ 0.111</td></tr><tr><td>x₂ ≤ 2.5</td><td>8 / 4</td><td>1/36 ≈ 0.028</td></tr></tbody></table><div class="w8-note">12 объектов, 8 нулей и 4 единицы. Во всех строках Gini до разбиения равен 4/9.</div></div>

---
clicks: 1
---

<!-- S48 -->
<WeekEightHeader section="Рекурсивное обучение CART" title="Первое выбранное условие" />
<div class="w8-body"><div class="w8-grid"><WeekEightTree :stage="1" counts /><WeekEightPoints :regions="1" /></div><div v-click="1" class="w8-result">Слева — чистый лист. Справа — ещё смешанная группа.<br>Продолжаем обучение только в правом узле.</div></div>

---

<!-- S49 -->
<WeekEightHeader section="Рекурсивное обучение CART" title="Правый дочерний узел" />
<div class="w8-body"><div class="w8-grid"><WeekEightPoints local /><div class="w8-stack"><WeekEightCounts :zero="2" :one="4" label="2 нуля · 4 единицы" /><MathBlock formula="G(S_R)=1-\left(\frac13\right)^2-\left(\frac23\right)^2=\frac49" /><div class="w8-result">Доли, веса и кандидатов теперь считаем по шести объектам, а не по двенадцати.</div></div></div></div>

---

<!-- S50 -->
<WeekEightHeader section="Рекурсивное обучение CART" title="Три локальных кандидата" />
<div class="w8-body"><table class="w8-table"><thead><tr><th>Условие</th><th>nL / nR</th><th>Выигрыш Gini</th></tr></thead><tbody><tr><td>x₁ ≤ 3.5</td><td>3 / 3</td><td>0</td></tr><tr class="w8-win"><td>x₂ ≤ 1.5</td><td>2 / 4</td><td>4/9</td></tr><tr><td>x₂ ≤ 2.5</td><td>4 / 2</td><td>1/9</td></tr></tbody></table><div class="w8-result">После x₂ ≤ 1.5 оба дочерних узла чистые:<MathBlock formula="\Delta G=\frac49-\left(\frac26\cdot0+\frac46\cdot0\right)=\frac49" /></div></div>

---
clicks: 1
---

<!-- S51 -->
<WeekEightHeader section="Рекурсивное обучение CART" title="Второе выбранное условие" />
<div class="w8-body"><div class="w8-grid"><WeekEightPoints local axis="x2" :threshold="1.5" :regions="2" /><div class="w8-stack"><div class="w8-text">x₂ ≤ 1.5 → два объекта класса 0.</div><div class="w8-text">x₂ > 1.5 → четыре объекта класса 1.</div><div v-click="1" class="w8-result">Все конечные узлы чистые.<br>На этих данных можно остановиться.</div></div></div></div>

---

<!-- S52 -->
<WeekEightHeader section="Рекурсивное обучение CART" title="Обученная модель" />
<div class="w8-body"><div class="w8-grid"><WeekEightTree counts /><WeekEightPoints :regions="2" /></div><div class="w8-result">Fit завершён: оба условия выбраны по обучающим данным, в листьях сохранены прогнозы. Получили три чистых листа и три области постоянного прогноза.</div></div>

---

<!-- S53 -->
<WeekEightHeader section="Рекурсивное обучение CART" title="Алгоритм CART" />
<div class="w8-body"><div class="w8-stack w8-text"><div>1. Получить объекты текущего узла S.</div><div>2. Проверить остановку; если она выполнена, сохранить прогноз листа.</div><div>3. Перебрать допустимые условия и выбрать наибольшее уменьшение неоднородности.</div><div>4. Разделить S и повторить процедуру для каждого дочернего узла.</div></div><div class="w8-result">CART — Classification and Regression Trees.<br>Жадный поиск выбирает лучшее текущее условие, не перебирая будущие деревья целиком.</div></div>

---

<!-- S54 -->
<WeekEightHeader section="Рекурсивное обучение CART" title="Нулевой первый выигрыш: XOR" />
<div class="w8-body"><div class="w8-grid"><WeekEightXor :stage="1" /><div class="w8-stack"><div class="w8-text">В исходном узле классы поровну: G = 1/2.</div><div class="w8-text">После первого вопроса в каждой группе снова по одному объекту каждого класса.</div><MathBlock formula="\Delta G=\frac12-\left(\frac12\cdot\frac12+\frac12\cdot\frac12\right)=0" /><div class="w8-result">Первый шаг не уменьшает неоднородность.</div></div></div></div>

---

<!-- S55 -->
<WeekEightHeader section="Рекурсивное обучение CART" title="Полезный второй уровень: XOR" />
<div class="w8-body"><div class="w8-grid"><WeekEightXor :stage="2" /><div class="w8-stack"><div class="w8-text">В каждой из двух групп задаём вопрос x₂ ≤ 0.5.</div><div class="w8-result">Получаем четыре чистые области: G каждого листа равен 0.</div><div class="w8-text">Если нулевой выигрыш разрешён, дерево для XOR можно построить. Если требуется строго положительное улучшение, алгоритм остановится до полезного второго уровня.</div></div></div></div>

---

<!-- S56 -->
<WeekEightHeader section="Сложность и переобучение" title="Переобучение дерева" />
<div class="w8-body"><div class="w8-grid"><WeekEightTree counts /><div class="w8-stack"><div class="w8-question">Разбиения могут становиться всё мельче.</div><div class="w8-text">Дерево подстраивается и под закономерность, и под случайные особенности отдельных наблюдений.</div><div class="w8-result">Хорошее качество на train нужно проверить на новых объектах.</div></div></div></div>

---
clicks: 1
---

<!-- S57 -->
<WeekEightHeader section="Сложность и переобучение" title="Глубина и граница классов" />
<div class="w8-body"><div class="w8-grid"><WeekEightPlot kind="depth" :variant="0" /><div v-click="1"><WeekEightPlot kind="depth" :variant="1" /></div></div><div class="w8-note">Те же 180 объектов; цветные области — прогноз модели, точки и квадраты — истинные классы.</div></div>

---

<!-- S58 -->
<WeekEightHeader section="Сложность и переобучение" title="Мелкие области и шум" />
<div class="w8-body"><div class="w8-grid"><WeekEightPlot kind="depth" :variant="2" /><div class="w8-stack"><div class="w8-text">Некоторые листья обслуживают очень небольшие группы.</div><div class="w8-text">Вместе с закономерностью дерево подстраивается под шум.</div><div class="w8-result">Нулевая ошибка на train не означает нулевую ошибку на validation.</div></div></div></div>

---

<!-- S59 -->
<WeekEightHeader section="Сложность и переобучение" title="Глубина регрессионного дерева" />
<div class="w8-body"><div class="w8-grid"><div><div class="w8-text text-center">Глубина 2</div><WeekEightPlot kind="regdepth" :variant="0" /></div><div><div class="w8-text text-center">Без ограничения глубины</div><WeekEightPlot kind="regdepth" :variant="1" /></div></div><div class="w8-note">Независимый синтетический пример: 80 наблюдений с шумом. Справа дерево реагирует на локальные колебания y.</div></div>

---

<!-- S60 -->
<WeekEightHeader section="Сложность и переобучение" title="Ошибка на новых объектах" />
<div class="w8-body"><div class="w8-grid"><WeekEightPlot kind="validation" /><div class="w8-stack"><div class="w8-text">В этом опыте — 115 train и 735 validation-объектов.</div><div class="w8-text">С ростом глубины train-ошибка снижается, но validation перестаёт улучшаться.</div><div class="w8-result">Сложность выбираем по validation или CV.</div></div></div></div>

---

<!-- S61 -->
<WeekEightHeader section="Сложность и переобучение" title="Два способа ограничить дерево" />
<div class="w8-body"><div class="w8-grid w8-pair"><div><div class="w8-subtitle text-center">Pre-pruning</div><WeekEightTree :stage="1" /><div class="w8-text">Заранее ограничить рост: не создавать слишком сложные разбиения.</div></div><div><div class="w8-subtitle text-center">Post-pruning</div><WeekEightTree :cut="true" /><div class="w8-text">Сначала вырастить дерево, затем заменить часть поддеревьев листьями.</div></div></div></div>

---

<!-- S62 -->
<WeekEightHeader section="Сложность и переобучение" title="Ограничение глубины" />
<div class="w8-body"><div class="w8-grid"><WeekEightTree :stage="1" terms counts /><div class="w8-stack"><div class="w8-text"><span class="w8-code">max_depth = 1</span></div><div class="w8-text">Корень — глубина 0.<br>Следующий уровень — глубина 1.</div><div class="w8-result">Правый узел остаётся смешанным: новый уровень запрещён.</div><div class="w8-text">Короткий путь не позволяет последовательно выделять всё более мелкие особенности и шум.</div></div></div></div>

---
clicks: 1
---

<!-- S63 -->
<WeekEightHeader section="Сложность и переобучение" title="Минимальный размер текущего узла" />
<div class="w8-body"><div class="w8-text text-center"><span class="w8-code">min_samples_split = 6</span></div><div class="w8-grid"><WeekEightSplit sizes :n="$clicks?6:5" :left="$clicks?3:2" :right="3" :blocked="$clicks===0" /><div class="w8-stack"><div class="w8-text">Проверяем число объектов до поиска разбиения.</div><div class="w8-result">{{$clicks?'6 объектов: поиск разбиения разрешён.':'5 объектов: узел остаётся листом.'}}</div><div class="w8-text">В маленькой группе отдельные наблюдения сильнее влияют на выбранное условие.</div></div></div></div>

---
clicks: 1
---

<!-- S64 -->
<WeekEightHeader section="Сложность и переобучение" title="Минимальный размер дочерних узлов" />
<div class="w8-body"><div class="w8-text text-center"><span class="w8-code">min_samples_leaf = 4</span></div><div class="w8-grid"><WeekEightSplit sizes :n="12" :left="$clicks?3:6" :right="$clicks?9:6" :blocked="$clicks===1" /><div class="w8-stack"><div class="w8-text">Для каждого кандидата проверяем обе получившиеся группы.</div><div class="w8-result">{{$clicks?'3 + 9: недопустимо, в левой группе меньше 4 объектов.':'6 + 6: допустимо, обе группы содержат не меньше 4 объектов.'}}</div><div class="w8-text">Так ограничиваем появление маленьких листьев с неустойчивыми прогнозами.</div></div></div></div>

---
clicks: 1
---

<!-- S65 -->
<WeekEightHeader section="Сложность и переобучение" title="Размер листа и устойчивость долей" />
<div class="w8-body w8-leaf-change"><div class="w8-grid"><div class="w8-stack"><WeekEightLeafChange :n="2" :ones="2" :step="$clicks" /><div v-click="1"><MathBlock formula="\hat p_1:\quad\frac22=1\ \longrightarrow\ \frac12=0.5" /></div></div><div class="w8-stack"><WeekEightLeafChange :n="10" :ones="7" :step="$clicks" /><div v-click="1"><MathBlock formula="\hat p_1:\quad\frac7{10}=0.7\ \longrightarrow\ \frac6{10}=0.6" /></div></div></div><div class="w8-result">{{$clicks?'Одна метка 1 → 0. В малом листе доля класса меняется сильнее.':'Как изменится доля класса, если одну метку 1 заменить на 0?'}}</div></div>

---

<!-- S66 -->
<WeekEightHeader section="Сложность и переобучение" title="Минимальный выигрыш" />
<div class="w8-body"><div class="w8-text">Условный числовой пример:</div><MathBlock formula="H_{\text{before}}=0.32,\quad H_{\text{after}}=0.31" /><MathBlock formula="\Delta H=0.01\lt0.02" class="w8-formula" /><div class="w8-result">Если требуем улучшение не меньше 0.02,<br>такое разбиение не принимается.</div><div class="w8-text">Это ещё один способ остановить рост, когда следующий шаг почти не улучшает состав групп.</div></div>

---

<!-- S67 -->
<WeekEightHeader section="Сложность и переобучение" title="Что проверяет pre-pruning" />
<div class="w8-body"><table class="w8-table"><thead><tr><th>Ограничение</th><th>Вопрос перед новым разбиением</th></tr></thead><tbody><tr><td>Глубина</td><td>Разрешён ли следующий уровень?</td></tr><tr><td>Размер текущего узла</td><td>Достаточно ли объектов для поиска условия?</td></tr><tr><td>Размер дочерних узлов</td><td>Достаточно ли объектов в каждой новой группе?</td></tr><tr><td>Минимальный выигрыш</td><td>Достаточно ли уменьшилась неоднородность?</td></tr></tbody></table><div class="w8-result">Эти проверки управляют ростом дерева во время обучения.</div></div>

---
clicks: 1
---

<!-- S68 -->
<WeekEightHeader section="Сложность и переобучение" title="Удаление поддерева" />
<div class="w8-body"><div class="w8-grid w8-pair"><div><div class="w8-text text-center">Удаляем выделенную часть</div><WeekEightTree counts :cut="$clicks>=1" /></div><div v-click="1"><div class="w8-text text-center">Сохраняем один лист</div><WeekEightTree prune counts /></div></div><div class="w8-result">Новый лист объединяет объекты удалённого поддерева: 2 нуля и 4 единицы. Его прогноз — класс 1.</div></div>

---

<!-- S69 -->
<WeekEightHeader section="Сложность и переобучение" title="Как работает post-pruning" />
<div class="w8-body"><div class="w8-flow"><div>Вырастить<br>достаточно большое дерево</div><b>→</b><div>Последовательно<br>заменять поддеревья листьями</div><b>→</b><div>Сравнить<br>варианты сложности</div></div><div class="w8-text">После упрощения часть обучающих объектов может классифицироваться хуже.</div><div class="w8-result">Выбираем поддерево по качеству на новых объектах — через validation или CV.</div></div>

---

<!-- S70 -->
<WeekEightHeader section="Сложность и переобучение" title="Контроль сложности и проверка качества" />
<div class="w8-body"><table class="w8-table"><thead><tr><th>Pre-pruning</th><th>Post-pruning</th></tr></thead><tbody><tr><td>Настраиваем ограничения до роста</td><td>Выбираем упрощённое поддерево после роста</td></tr><tr><td>Не допускаем часть новых разбиений</td><td>Удаляем часть уже построенных разбиений</td></tr></tbody></table><div class="w8-result">В обоих подходах сравниваем сложность по validation/CV.<br>Критерий узла помогает обучать, внешняя метрика — выбирать модель.</div><div class="w8-text">После выбора итоговую процедуру обучаем на всех dev-данных. Независимый test сохраняем для финальной оценки.</div></div>

---

<!-- S71 -->
<WeekEightHeader section="Свойства деревьев" title="Следствия пороговых разбиений" />
<div class="w8-body"><div class="w8-question">Пороговые условия создают области, в которых прогноз постоянен.</div><div class="w8-text">Форма этих областей определяет нелинейность и взаимодействия, отношение к масштабу, экстраполяцию и устойчивость модели.</div><div class="w8-result">Рассмотрим каждое свойство на конкретной схеме или эксперименте.</div></div>

---

<!-- S72 -->
<WeekEightHeader section="Свойства деревьев" title="Нелинейные границы" />
<div class="w8-body"><div class="w8-grid w8-pair"><div><div class="w8-text text-center">Линейный классификатор</div><WeekEightPlot kind="nonlinear" :variant="0" /></div><div><div class="w8-text text-center">Дерево</div><WeekEightPlot kind="nonlinear" :variant="1" /></div></div><div class="w8-result">Одной прямой нельзя выделить центральную область.<br>Дерево собирает её из условий по двум признакам.</div></div>

---

<!-- S73 -->
<WeekEightHeader section="Свойства деревьев" title="Взаимодействие признаков" />
<div class="w8-body"><div class="w8-grid"><WeekEightPoints :regions="2" interaction /><div class="w8-stack"><div class="w8-text">Синие стрелки: меняем x₂, сохраняя x₁.</div><div class="w8-text"><b>x₁ ≤ 2.5:</b> прогноз остаётся 0 при любом x₂.</div><div class="w8-text"><b>x₁ > 2.5:</b> переход через x₂ = 1.5 меняет прогноз с 0 на 1.</div><div class="w8-result">Влияние x₂ зависит от того, какое условие выполнено по x₁.</div></div></div></div>

---

<!-- S74 -->
<WeekEightHeader section="Свойства деревьев" title="Смена единиц измерения" />
<div class="w8-body w8-live-scale"><div class="w8-scale"><WeekEightScale /></div><div class="w8-result">Годы → месяцы: порог 20 → 240, обе группы сохранились.<br>StandardScaler дереву обычно не требуется.</div><div class="w8-small">В kNN изменение относительных масштабов нескольких признаков может менять расстояния и соседей. Одномерная смена единиц сама по себе этого не показывает.</div></div>

---

<!-- S75 -->
<WeekEightHeader section="Свойства деревьев" title="Экстраполяция дерева" />
<div class="w8-body"><div class="w8-grid"><WeekEightPlot kind="extrapolation" /><div class="w8-stack"><div class="w8-text"><span class="w8-blue">Сплошная:</span> дерево.<br><span class="w8-orange">Штриховая:</span> линейная регрессия.</div><div class="w8-result">За пределами train регрессионное дерево продолжает возвращать среднее крайнего листа.</div><div class="w8-text">Ступень остаётся постоянной и не продолжает наблюдаемый тренд.</div></div></div></div>

---

<!-- S76 -->
<WeekEightHeader section="Свойства деревьев" title="Нестабильность структуры" />
<div class="w8-body"><div class="w8-grid w8-pair"><div><div class="w8-text text-center">Исходные данные</div><WeekEightPlot kind="instability" :variant="0" /></div><div><div class="w8-text text-center">Изменили одну метку</div><WeekEightPlot kind="instability" :variant="1" /></div></div><div class="w8-result">Синяя обводка — изменённый объект. Изменился корневой вопрос,<br>а вслед за ним — состав групп и последующие разбиения.</div></div>

---
clicks: 1
---

<!-- S77 -->
<WeekEightHeader section="Свойства деревьев" title="Интерпретация правил" />
<div class="w8-body"><div class="w8-grid"><WeekEightTree :route="2" /><div class="w8-stack"><MathBlock formula="x_1>2.5\quad\text{и}\quad x_2>1.5\quad\Rightarrow\quad\hat y=1" /><div class="w8-text">Путь объясняет, какие условия модели определили прогноз объекта.</div><div v-click="1" class="w8-result">Небольшое дерево читают целиком, у большого анализируют отдельные пути. Правила объясняют прогноз, но не устанавливают причинные связи.</div></div></div></div>

---

<!-- S78 -->
<WeekEightHeader section="Категории и пропуски" title="Категориальный признак" />
<div class="w8-body"><div class="w8-text">В таблице есть номинальный признак «город». Естественного порядка между значениями нет.</div><table class="w8-table"><thead><tr><th>Объект</th><th>Город</th></tr></thead><tbody><tr><td>A</td><td>Москва</td></tr><tr><td>B</td><td>Казань</td></tr><tr><td>C</td><td>Пермь</td></tr><tr><td>D</td><td>Омск</td></tr></tbody></table><div class="w8-question">Как задавать условия для такого признака?</div></div>

---
clicks: 1
---

<!-- S79 -->
<WeekEightHeader section="Категории и пропуски" title="Произвольные числовые коды" />
<div class="w8-body"><table class="w8-table w8-table-compact"><tbody><tr><th>Город</th><td>Москва</td><td>Казань</td><td>Пермь</td><td>Омск</td></tr><tr><th>Код</th><td>1</td><td>{{$clicks?3:2}}</td><td>{{$clicks?2:3}}</td><td>4</td></tr></tbody></table><div class="w8-scheme"><WeekEightCategories :swapped="$clicks>=1" /></div><div class="w8-result">Меняем коды Казани и Перми — тот же порог выделяет другие города. Произвольные коды задают порядок и ограничивают доступные разбиения.</div></div>

---

<!-- S80 -->
<WeekEightHeader section="Категории и пропуски" title="One-hot: индикаторы категорий" />
<div class="w8-body"><table class="w8-table w8-table-compact"><thead><tr><th>Город</th><th>Москва</th><th>Казань</th><th>Пермь</th><th>Омск</th></tr></thead><tbody><tr><td>Москва</td><td>1</td><td>0</td><td>0</td><td>0</td></tr><tr><td>Казань</td><td>0</td><td>1</td><td>0</td><td>0</td></tr><tr><td>Пермь</td><td>0</td><td>0</td><td>1</td><td>0</td></tr><tr><td>Омск</td><td>0</td><td>0</td><td>0</td><td>1</td></tr></tbody></table><div class="w8-note">Названия индикаторов сокращены: «Москва» означает столбец city_Москва.</div><MathBlock formula="\text{city\_Москва}\le0.5\;?" /><div class="w8-result">Условие проверяет наличие одной категории.<br>Числовой порядок между городами не возникает.</div></div>

---

<!-- S81 -->
<WeekEightHeader section="Категории и пропуски" title="Разбиение по бинарному столбцу" />
<div class="w8-body"><WeekEightCategories mode="ohe" /><div class="w8-result">Индикатор Москвы равен 0 у трёх остальных городов: они идут налево. Значение 1 направляет Москву в правую ветвь.</div></div>

---

<!-- S82 -->
<WeekEightHeader section="Категории и пропуски" title="Прямое разбиение по множеству" />
<div class="w8-body"><WeekEightCategories mode="set" /><div class="w8-result">Некоторые реализации проверяют принадлежность группе категорий напрямую. Здесь одним условием выделены две категории из четырёх.</div><div class="w8-note">Обычный sklearn DecisionTreeClassifier принимает числовую матрицу. Нативную поддержку категорий проверяют у конкретной реализации.</div></div>

---

<!-- S83 -->
<WeekEightHeader section="Категории и пропуски" title="Компромисс one-hot кодирования" />
<div class="w8-body"><div class="w8-text">Чтобы выделить Москву и Пермь среди четырёх городов, можно последовательно проверить два индикатора.</div><div class="w8-flow"><div><b>city_Москва > 0.5?</b><br>Да → нужная группа</div><b>нет →</b><div><b>city_Пермь > 0.5?</b><br>Да → нужная группа</div><b>нет →</b><div>Казань<br>или Омск</div></div><div class="w8-result">One-hot сохраняет номинальный смысл категорий, но увеличивает размерность. Выделение группы может потребовать нескольких бинарных проверок.</div></div>

---

<!-- S84 -->
<WeekEightHeader section="Категории и пропуски" title="Пропуск в условии" />
<div class="w8-body"><div class="w8-flow"><div>Новый объект<br><b>age = NaN</b></div><b>→</b><div>Условие<br><b>age ≤ 30?</b></div><b>→</b><div>Как выбрать<br>ветвь?</div></div><div class="w8-question">Неизвестное значение нельзя сравнить с порогом обычным способом.</div><div class="w8-text">Рассмотрим две стратегии: восстановить значение или выучить направление для NaN при обучении дерева.</div></div>

---
clicks: 1
---

<!-- S85 -->
<WeekEightHeader section="Категории и пропуски" title="Стратегия 1: импутация" />
<div class="w8-body"><div class="w8-nan"><WeekEightMissing strategy="impute" :step="$clicks" /></div><div v-click="1" class="w8-result">Вместо пропуска подставили сохранённую медиану train — 29.<br>Дальше выполняется обычная проверка: 29 ≤ 30, идём налево.</div><div class="w8-note">При необходимости добавляют индикатор пропуска. Статистики импутации обучают внутри train-фолда.</div></div>

---
clicks: 1
---

<!-- S86 -->
<WeekEightHeader section="Категории и пропуски" title="Стратегия 2: направление для NaN" />
<div class="w8-body"><div class="w8-nan"><WeekEightMissing strategy="native" :step="$clicks" /></div><div v-click="1" class="w8-result">После сравнения на train в этом узле сохранено правило «NaN направо». Новый объект использует его без восстановления возраста.</div><div class="w8-note">Поддержка такого механизма зависит от версии и конфигурации реализации.</div></div>

---

<!-- S87 -->
<WeekEightHeader section="Категории и пропуски" title="Что сохраняется после обучения" />
<div class="w8-body"><table class="w8-table"><thead><tr><th>Стратегия</th><th>Что выучили на train</th><th>Что делаем при predict</th></tr></thead><tbody><tr><td>Импутация</td><td>Статистику, например медиану 29</td><td>Подставляем 29 и проверяем порог</td></tr><tr><td>Направление NaN</td><td>Ветвь для пропуска в каждом узле</td><td>Следуем сохранённой ветви</td></tr></tbody></table><div class="w8-result">Для нового объекта используется сохранённая стратегия.<br>Его целевая переменная неизвестна и не нужна для маршрутизации.</div><div class="w8-note">В современных sklearn DecisionTreeClassifier и DecisionTreeRegressor нативная обработка NaN доступна при поддерживаемых конфигурациях. Импутация остаётся отдельной рабочей стратегией.</div></div>

---

<!-- S88 -->
<WeekEightHeader section="Категории и пропуски" title="Подготовка данных для дерева" />
<div class="w8-body"><table class="w8-table"><thead><tr><th>Признаки</th><th>Практическое решение</th></tr></thead><tbody><tr><td>Числовые</td><td>Масштабирование самому дереву чаще не требуется</td></tr><tr><td>Номинальные категории</td><td>One-hot либо подходящая нативная поддержка</td></tr><tr><td>Пропуски</td><td>Импутация либо поддерживаемый механизм NaN</td></tr></tbody></table><div class="w8-result">Импутацию и другие обучаемые преобразования обучаем только на train, в CV — внутри train-фолдов. Стратегии сравниваем по validation/CV.</div><div class="w8-note">Поддержка NaN зависит от версии, критерия, splitter и других настроек. Проверяйте документацию используемой версии sklearn.</div></div>

---

<!-- S89 -->
<WeekEightHeader section="Главные выводы" title="Итак: решающие деревья" />
<div class="w8-body"><ul class="w8-conclusions"><li><b>Модель:</b> условия разбивают пространство на области с постоянным прогнозом.</li><li><b>Обучение:</b> рекурсивно выбираем лучшее текущее разбиение по уменьшению неоднородности.</li><li><b>Критерии:</b> MSE для регрессии; Gini или энтропия для классификации.</li><li><b>Сложность:</b> глубокие деревья могут переобучаться. Pre-/post-pruning настраиваем по validation/CV.</li><li><b>Свойства и данные:</b> нелинейность и взаимодействия, слабая экстраполяция, нестабильность; категории и пропуски требуют подходящей обработки.</li></ul></div>

---

<!-- S90 -->
<WeekEightHeader section="Приложение · Дополнительное чтение" title="От двоичных кодов к энтропии" />
<div class="w8-body"><div class="w8-question">Почему неопределённость измеряют через логарифм?</div><div class="w8-text">Представим передачу неизвестной метки класса. Получатель знает возможные классы и их вероятности, но пока не знает конкретную метку.</div><div class="w8-text">Проследим путь: двоичные вопросы и коды → информация отдельного исхода → средняя неопределённость распределения.</div><div class="w8-result">Для чтения достаточно понятия вероятности. Все примеры и обозначения вводятся последовательно внутри приложения.</div><div class="w8-note">Основная лекция завершена на предыдущем слайде. Далее — подробное объяснение для самостоятельного изучения.</div></div>

---

<!-- S91 -->
<WeekEightHeader section="Классификация: энтропия" title="Сообщить значение класса" />
<div class="w8-body"><div class="w8-text">Из узла случайно выбран объект. Его метка известна отправителю.</div><div class="w8-entropy-message"><div class="w8-entropy-role"><div class="w8-subtitle">Отправитель</div><div>Знает истинную метку<br>выбранного объекта:</div><div class="w8-entropy-symbol">y = 1</div></div><div class="w8-entropy-channel"><div>Заранее согласованный<br>двоичный код</div><div class="w8-arrow">→</div><b>Передаём значение y</b></div><div class="w8-entropy-role"><div class="w8-subtitle">Получатель</div><div>Знает классы 0/1<br>и доли 50/50,<br>но пока не знает y.</div></div></div><div class="w8-result">Сообщение здесь — метка класса. При повторном выборе объектов спросим: сколько бит в среднем нужно на одну метку?</div><div class="w8-note">Мысленный эксперимент: сравним средние затраты на сообщение меток при разных долях классов.</div></div>

---

<!-- S92 -->
<WeekEightHeader section="Классификация: энтропия" title="Один бит: два варианта" />
<div class="w8-body"><div class="w8-question">Как передать одну из двух равновероятных меток?</div><div class="w8-grid"><div class="w8-entropy-bitcase"><span class="w8-green">Класс 0</span><b>→</b><code>0</code><span>p = 1/2</span></div><div class="w8-entropy-bitcase"><span class="w8-orange">Класс 1</span><b>→</b><code>1</code><span>p = 1/2</span></div></div><div class="w8-result">Один двоичный знак различает два варианта. В этой равновероятной ситуации он сообщает 1 бит информации.</div><div class="w8-text">Договорившись о коде, получатель восстанавливает метку по одному символу: 0 или 1.</div></div>

---
clicks: 3
---

<!-- S93 -->
<WeekEightHeader section="Классификация: энтропия" title="Восемь вариантов: три вопроса" />
<div class="w8-body w8-entropy-tight"><div class="w8-text">Восемь равновероятных вариантов. Ищем 6; ответы 0/1 — биты кода.</div><WeekEightBinarySearch :step="$clicks" /><div v-click="3" class="w8-result">Код 101: три бинарных ответа сузили 8 вариантов до 1.<br>Последовательно осталось 8 → 4 → 2 → 1 вариантов.</div></div>

---
clicks: 1
---

<!-- S94 -->
<WeekEightHeader section="Классификация: энтропия" title="От числа вариантов к логарифму" />
<div class="w8-body"><div class="w8-text">Каждый дополнительный двоичный знак удваивает число различимых вариантов.</div><table class="w8-table w8-table-compact"><thead><tr><th>Равновероятных вариантов m</th><th>Битов b</th><th>Вероятность одного исхода</th></tr></thead><tbody><tr><td>2</td><td>1</td><td>1/2</td></tr><tr><td>4</td><td>2</td><td>1/4</td></tr><tr><td>8</td><td>3</td><td>1/8</td></tr><tr><td>16</td><td>4</td><td>1/16</td></tr></tbody></table><div v-click="1" class="w8-stack"><MathBlock formula="m=2^b\quad\Rightarrow\quad b=\log_2m,\qquad p=\frac1m\quad\Rightarrow\quad b=-\log_2p" /><div class="w8-result">Пока получили эту связь для равновероятных исходов.</div></div></div>

---

<!-- S95 -->
<WeekEightHeader section="Классификация: энтропия" title="Если метки встречаются не поровну" />
<div class="w8-body"><div class="w8-text">Для объяснения кодов временно возьмём четыре класса A–D. Получатель знает их вероятности.</div><table class="w8-table w8-table-compact"><thead><tr><th>Метка</th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><th>Вероятность</th><td>1/2</td><td>1/4</td><td>1/8</td><td>1/8</td></tr></tbody></table><div class="w8-entropy-tokens"><span v-for="(v,i) in ['A','A','A','A','B','B','C','D']" :key="i">{{v}}</span></div><div class="w8-note text-center">Иллюстрация частот: четыре A, два B, один C и один D.</div><div class="w8-question">Обязательно ли записывать каждую метку одинаковым числом битов?</div></div>

---

<!-- S96 -->
<WeekEightHeader section="Классификация: энтропия" title="Код постоянной длины" />
<div class="w8-body"><table class="w8-table"><thead><tr><th>Метка</th><th>Вероятность</th><th>Код</th><th>Длина</th></tr></thead><tbody><tr><td>A</td><td>1/2</td><td><code>00</code></td><td>2 бита</td></tr><tr><td>B</td><td>1/4</td><td><code>01</code></td><td>2 бита</td></tr><tr><td>C</td><td>1/8</td><td><code>10</code></td><td>2 бита</td></tr><tr><td>D</td><td>1/8</td><td><code>11</code></td><td>2 бита</td></tr></tbody></table><MathBlock formula="\bar L=\frac12\cdot2+\frac14\cdot2+\frac18\cdot2+\frac18\cdot2=2\ \text{бита}" /><div class="w8-result">Всегда передаём два бита на метку. Частоты классов на длину этого кода не влияют.</div></div>

---

<!-- S97 -->
<WeekEightHeader section="Классификация: энтропия" title="Код переменной длины" />
<div class="w8-body"><div class="w8-grid"><WeekEightCodeTree /><div class="w8-stack"><table class="w8-table w8-table-compact"><thead><tr><th>Метка</th><th>Код</th><th>Длина</th></tr></thead><tbody><tr><td>A</td><td><code>0</code></td><td>1</td></tr><tr><td>B</td><td><code>10</code></td><td>2</td></tr><tr><td>C</td><td><code>110</code></td><td>3</td></tr><tr><td>D</td><td><code>111</code></td><td>3</td></tr></tbody></table><div class="w8-small">Ни одно кодовое слово не является началом другого. Дойдя до листа, получатель знает, где закончилась метка.</div></div></div><div class="w8-note">Это дерево декодирования: ветви — биты сообщения. В CART ветвь выбирается проверкой признаков объекта.</div></div>

---
clicks: 3
---

<!-- S98 -->
<WeekEightHeader section="Классификация: энтропия" title="Как прочитать код 110" />
<div class="w8-body"><div class="w8-grid"><WeekEightCodeTree :step="$clicks" /><div class="w8-stack"><div class="w8-question">Получены биты: <code>110</code></div><div class="w8-text">Начинаем в верхнем узле.</div><div v-click="1" class="w8-text">Первый бит 1 → правая ветвь.</div><div v-click="2" class="w8-text">Второй бит 1 → снова направо.</div><div v-click="3" class="w8-result">Третий бит 0 → налево.<br>Достигнут лист C: метка восстановлена.</div></div></div><div class="w8-note">Читаем биты слева направо: каждый следующий бит выбирает следующую ветвь.</div></div>

---
clicks: 1
---

<!-- S99 -->
<WeekEightHeader section="Классификация: энтропия" title="Средняя длина стала меньше" />
<div class="w8-body"><div class="w8-text">Серия с четырьмя A, двумя B, одним C и одним D:</div><WeekEightCodeLengths :step="$clicks" /><div v-click="1" class="w8-result"><MathBlock formula="\bar L=\frac12\cdot1+\frac14\cdot2+\frac18\cdot3+\frac18\cdot3=1.75\ \text{бита}" />Частый A получает короткий код; более длинные C и D встречаются реже.</div></div>

---

<!-- S100 -->
<WeekEightHeader section="Классификация: энтропия" title="Длина кода и вероятность" />
<div class="w8-body"><div class="w8-question">С чем совпали длины выбранного кода?</div><table class="w8-table w8-table-compact"><thead><tr><th>Метка</th><th>p(y)</th><th>Код</th><th>Длина</th><th>−log₂ p(y)</th></tr></thead><tbody><tr><td>A</td><td>1/2</td><td><code>0</code></td><td>1</td><td>1</td></tr><tr><td>B</td><td>1/4</td><td><code>10</code></td><td>2</td><td>2</td></tr><tr><td>C</td><td>1/8</td><td><code>110</code></td><td>3</td><td>3</td></tr><tr><td>D</td><td>1/8</td><td><code>111</code></td><td>3</td><td>3</td></tr></tbody></table><div class="w8-result">Для этих вероятностей — степеней 1/2 — длины точно равны −log₂ p(y). У произвольного распределения такого точного совпадения может не быть.</div></div>

---
clicks: 1
---

<!-- S101 -->
<WeekEightHeader section="Классификация: энтропия" title="Информация независимых исходов" />
<div class="w8-body"><div class="w8-text">Монета честная; О — орёл, Р — решка. Сопоставим один исход и последовательность двух независимых бросков.</div><div class="w8-grid"><div class="w8-stack"><div class="w8-subtitle text-center">Получили Р</div><MathBlock formula="p=\frac12,\qquad-\log_2p=1\ \text{бит}" /></div><div class="w8-stack"><div class="w8-subtitle text-center">Получили РО</div><MathBlock formula="p=\frac12\cdot\frac12=\frac14" /><MathBlock formula="-\log_2\frac14=2\ \text{бита}" /></div></div><div v-click="1" class="w8-result"><MathBlock formula="-\log_2(pq)=-\log_2p-\log_2q" />Вероятности независимых исходов перемножаются, а информация о них складывается. Логарифм согласуется с этим свойством.</div></div>

---
clicks: 1
---

<!-- S102 -->
<WeekEightHeader section="Классификация: энтропия" title="Информация об одном исходе" />
<div class="w8-body"><div class="w8-text">Обобщим мотивированную связь: информационное содержание исхода y с вероятностью p(y) > 0 определяем как</div><MathBlock formula="h(y)=-\log_2p(y)" class="w8-formula" /><table class="w8-table w8-table-compact"><thead><tr><th>p(y)</th><th>0.9</th><th>0.5</th><th>0.1</th></tr></thead><tbody><tr><th>h(y), бит</th><td>≈ 0.152</td><td>1</td><td>≈ 3.322</td></tr></tbody></table><div v-click="1" class="w8-result">Редкий исход статистически более неожиданен. Практическую важность или полезность сообщения эта мера не оценивает.</div><div class="w8-note">Дробные h(y) измеряют информацию; длина отдельного двоичного кодового слова — целое число битов.</div></div>

---

<!-- S103 -->
<WeekEightHeader section="Классификация: энтропия" title="Известный, равновероятный, редкий" />
<div class="w8-body"><div class="w8-text">Сравним три ситуации, в которых вероятность наступившего исхода различается.</div><div class="w8-three"><div class="w8-stack"><div class="w8-subtitle">Метка заранее известна</div><MathBlock formula="p(y)=1" /><MathBlock formula="h(y)=-\log_2 1=0" /><div class="w8-text">Получатель уже знает ответ: новой информации 0 бит.</div></div><div class="w8-stack"><div class="w8-subtitle">Равновероятные 0 и 1</div><MathBlock formula="p(y)=1/2" /><MathBlock formula="h(y)=-\log_2(1/2)=1" /><div class="w8-text">Один бит различает два возможных исхода.</div></div><div class="w8-stack"><div class="w8-subtitle">Редкий C в примере A–D</div><MathBlock formula="p(C)=1/8" /><MathBlock formula="h(C)=-\log_2(1/8)=3" /><div class="w8-text">Здесь 3 бита информации совпали с длиной кода <code>110</code>.</div></div></div><div class="w8-result">Заранее известный результат не сообщает нового. Редкий наступивший исход статистически более неожиданен.</div></div>

---
clicks: 1
---

<!-- S104 -->
<WeekEightHeader section="Классификация: энтропия" title="Средняя информация о метке" />
<div class="w8-body"><div class="w8-grid"><table class="w8-table w8-table-compact"><thead><tr><th>Метка Y</th><th>Вероятность</th><th>h(y), бит</th></tr></thead><tbody><tr><td>A</td><td>1/2</td><td>1</td></tr><tr><td>B</td><td>1/4</td><td>2</td></tr><tr><td>C</td><td>1/8</td><td>3</td></tr><tr><td>D</td><td>1/8</td><td>3</td></tr></tbody></table><div class="w8-stack"><div class="w8-question">Сколько информации получаем в среднем?</div><div class="w8-text">Y — случайная метка. Усредним h(Y), учитывая частоты всех возможных исходов.</div><MathBlock formula="H(Y)=\mathbb E[h(Y)]=\sum_k p_kh(k)" /></div></div><div v-click="1" class="w8-result"><MathBlock formula="H(Y)=\frac12\cdot1+\frac14\cdot2+\frac18\cdot3+\frac18\cdot3=1.75\ \text{бита}" />h(y) относится к одному исходу; H(Y) характеризует всё распределение до наблюдения метки.</div></div>

---

<!-- S105 -->
<WeekEightHeader section="Приложение · Итог" title="От информации — к разбиению дерева" />
<div class="w8-body w8-entropy-tight"><div class="w8-grid"><div class="w8-stack"><MathBlock formula="h(y)=-\log_2p(y)" /><div class="w8-text">Информация одного наступившего исхода.</div></div><div class="w8-stack"><MathBlock formula="H(Y)=\sum_kp_kh(k)" /><div class="w8-text">Средняя неопределённость распределения до наблюдения метки.</div></div></div><div class="w8-text">В узле дерева та же мера обозначается H<sub>ent</sub>(S): вероятности оцениваем долями классов среди объектов узла S.</div><div class="w8-result">Порог полезен, если уменьшает среднюю неопределённость класса. Поэтому из энтропии родителя вычитаем взвешенную энтропию дочерних узлов и максимизируем information gain.</div><div class="w8-note">В примере A–D средняя длина кода точно равна энтропии: 1.75 бита. Для произвольных вероятностей точное совпадение не обязательно. Применение к дереву — S42–S45 основной лекции.</div></div>
