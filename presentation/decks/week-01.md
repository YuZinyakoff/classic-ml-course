---
theme: default
title: Первый ML-эксперимент, которому можно начать доверять
author: НИУ ВШЭ
info: |
  Неделя 1 курса классического машинного обучения.
  Постановка задачи, train/test, бейзлайн, недообучение/переобучение
  и минимальный estimator interface.
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
exportFilename: week-01-intro
download: false
---

<!-- S01 -->

<div class="section-kicker">Классическое машинное обучение · Неделя 1</div>

# Первый ML-эксперимент, которому можно начать доверять

<div class="statement mt-14 max-w-4xl">
Как из реальной задачи получить ML-эксперимент, результату которого можно хотя бы начать доверять?
</div>


---

<!-- S02 -->

# Рабочее определение

<div class="key-line mt-10 statement max-w-5xl">
<strong>Машинное обучение</strong> — область, изучающая методы, которые позволяют строить и настраивать модели на основе данных или опыта.
</div>

<div class="term-grid grid grid-cols-3 gap-10 mt-12 text-2xl">
  <div v-click><strong>область</strong><br><span class="micro">границы проводят по-разному</span></div>
  <div v-click><strong>методы</strong><br><span class="micro">строят или настраивают модель</span></div>
  <div v-click><strong>данные или опыт</strong><br><span class="micro">источник обучающего сигнала</span></div>
</div>

<div v-click class="micro mt-8">
В этом курсе основная рабочая конструкция будет предсказательной: исторические данные → алгоритм обучения → обученная модель → прогноз.
</div>

---

<!-- S03 -->

# Сначала обучение, затем применение

<div class="mt-10">
  <div class="phase-row">
    <div>исторические данные<br><span class="micro">признаки и известные ответы</span></div>
    <div class="phase-arrow">→</div>
    <div>алгоритм обучения</div>
    <div class="phase-arrow">→</div>
    <div><strong>обученная модель</strong></div>
  </div>

  <div v-click class="phase-row">
    <div>новый объект<br><span class="micro">только признаки</span></div>
    <div class="phase-arrow">→</div>
    <div><strong>обученная модель</strong></div>
    <div class="phase-arrow">→</div>
    <div>прогноз</div>
  </div>
</div>

<div v-click class="warning-line mt-10 text-xl">
Правильный ответ нового объекта не передаётся модели при прогнозе.
</div>

---

<!-- S04 -->

<img
  src="/assets/week-01/ml-landscape-course-focus-ru.png"
  alt="Карта машинного обучения: режимы обучения, типы задач, семейства моделей, прикладные области, инженерный слой и фокус курса"
  class="landscape-focus"
/>
---

<!-- S05 -->

# Как читать эту карту

<div class="lead mt-8 max-w-5xl">
Одну систему машинного обучения можно одновременно описать через <strong>режим обучения</strong>, <strong>тип задачи</strong>, <strong>семейство моделей</strong> и <strong>прикладную область</strong>.
</div>

<div class="plain-columns grid grid-cols-2 gap-12 mt-10 text-[23px]">
  <div>
    Классификацию документов можно описать как обучение с учителем, классификацию и задачу из области NLP.
  </div>
  <div>
    Решать её можно моделями разных семейств: линейной моделью, деревом, ядерным методом или нейронной сетью.
  </div>
</div>

<div v-click class="key-line mt-12 text-[27px]">
<strong>Фокус курса:</strong> обучение с учителем на табличных данных и классические ML-модели.
</div>

---

<!-- S06 -->

# Чем мы в этом курсе заниматься не будем

<div class="grid grid-cols-2 gap-x-14 gap-y-3 mt-8 text-[23px]">
  <div>• глубокое обучение</div>
  <div>• computer vision</div>
  <div>• NLP и обработка речи</div>
  <div>• рекомендательные системы и временные ряды</div>
  <div>• reinforcement learning</div>
  <div>• generative AI, foundation models, LLM, agents</div>
  <div>• полный курс по причинному выводу</div>
  <div>• data engineering, MLOps и промышленная эксплуатация</div>
</div>

<div class="mt-12 statement">
Современный ML намного шире одной учебной дисциплины. Каждое из этих направлений требует отдельного связного курса.
</div>

---

<!-- S07 -->

# На чём сосредоточимся

<div class="key-line statement mt-8">
Классическое машинное обучение, прежде всего <strong>обучение с учителем на табличных данных</strong>.
</div>

<div class="mt-12 text-center text-[25px] leading-loose">
постановка задачи · функция потерь · оптимизация · обобщающая способность<br>
проверка модели · сложность · интерпретация
</div>

<div v-click class="success-line mt-10 text-xl">
В классических моделях эти механизмы видны относительно прозрачно — и затем возвращаются в более сложных системах.
</div>

---

<!-- S08 -->

# Классический ML в прикладных задачах

<div class="term-grid grid grid-cols-3 gap-x-10 gap-y-7 text-[21px] mt-8">
  <div><strong>Кредитный скоринг</strong><br><span class="muted">вероятность дефолта</span></div>
  <div><strong>Антифрод</strong><br><span class="muted">вероятность мошеннической операции</span></div>
  <div><strong>Отток клиентов</strong><br><span class="muted">риск отмены подписки</span></div>
  <div><strong>Прогноз спроса</strong><br><span class="muted">будущий объём продаж или заказов</span></div>
  <div><strong>Оценка стоимости</strong><br><span class="muted">например, цена недвижимости</span></div>
  <div><strong>Операционные риски</strong><br><span class="muted">отказ оборудования или просрочка</span></div>
</div>

<div v-click class="key-line mt-11 text-[27px] text-center">
объекты + признаки + известный результат → прогноз для новых объектов
</div>

---

<!-- S09 -->

# Маршрут курса · Недели 1–5

<ol class="text-[21px] space-y-3 mt-5">
  <li><strong>Осмысленный ML-эксперимент</strong><br><span class="muted">постановка · train/test · бейзлайн · недообучение и переобучение</span></li>
  <li><strong>Линейная регрессия</strong><br><span class="muted">МНК · аналитическое решение · матричная запись · остатки</span></li>
  <li><strong>Функции потерь и градиентный спуск</strong><br><span class="muted">MSE и MAE · градиент · learning rate · scaling</span></li>
  <li><strong>Бинарная логистическая регрессия</strong><br><span class="muted">score · sigmoid · вероятность · log-loss · threshold</span></li>
  <li><strong>Метрики классификации и решение</strong><br><span class="muted">precision/recall · F-мера · ROC/PR · выбор порога</span></li>
</ol>

---

<!-- S10 -->

# Маршрут курса · Недели 6–10

<ol start="6" class="text-[21px] space-y-3 mt-5">
  <li><strong>Регуляризация и проверка модели</strong><br><span class="muted">Ridge/Lasso · validation · cross-validation</span></li>
  <li><strong>kNN и многоклассовая классификация</strong><br><span class="muted">соседи · расстояния · softmax · multiclass metrics</span></li>
  <li><strong>Обучаемые преобразования, Pipeline и утечки</strong><br><span class="muted">пропуски · категории · ColumnTransformer · leakage</span></li>
  <li><strong>Решающие деревья</strong><br><span class="muted">разбиения · глубина · критерии остановки</span></li>
  <li><strong>Коллоквиум</strong><br><span class="muted">понимание и применение материала недель 1–9</span></li>
</ol>

---

<!-- S11 -->

# Маршрут курса · Недели 11–14

<ol start="11" class="text-[22px] space-y-5 mt-8">
  <li><strong>Bias–variance, bagging и Random Forest</strong><br><span class="muted">variance · bootstrap · усреднение · случайные признаки</span></li>
  <li><strong>Градиентный бустинг</strong><br><span class="muted">аддитивная модель · псевдоостатки · learning rate · early stopping</span></li>
  <li><strong>Современный tabular ML, HPO и диагностика</strong><br><span class="muted">CatBoost/XGBoost/LightGBM · поиск · анализ ошибок · interpretation</span></li>
  <li><strong>Защита проектов</strong><br><span class="muted">перенос общего ML-подхода в новую область</span></li>
</ol>

---

<!-- S12 -->

# Из чего складываются 10 баллов

<div class="text-center mt-6 text-[26px]">

$$
\text{Итог}
=
\text{ДЗ}_1+
\text{ДЗ}_2+
\text{Проект}+
\text{Коллоквиум}+
\text{Семинары}
$$

<div class="text-[38px] font-700 text-[#2864dc]">

$$1+1+3+3+2=10$$

</div>
</div>

<div class="grid grid-cols-2 gap-x-12 gap-y-2 mt-4 text-xl">
  <div>ДЗ 1 / ДЗ 2 — <strong>по 1 баллу</strong></div>
  <div>Проект — <strong>3 балла</strong></div>
  <div>Устный коллоквиум — <strong>3 балла</strong></div>
  <div>Активность на семинарах — <strong>2 балла</strong></div>
</div>

<div class="success-line mt-6 text-2xl text-center"><strong>Итогового экзамена нет.</strong></div>

---

<!-- S13 -->

# Домашние работы

<div class="term-grid grid grid-cols-2 gap-10 mt-12 text-center max-w-3xl mx-auto">
  <div><strong class="text-[#2864dc]">ДЗ 1</strong><br><span class="muted">1 балл</span></div>
  <div><strong class="text-[#2864dc]">ДЗ 2</strong><br><span class="muted">1 балл</span></div>
</div>

<div class="key-line mt-14 text-2xl text-center">Темы домашних работ будут объявлены отдельно.</div>

---

<!-- S14 -->

# Устный коллоквиум

<div class="text-center mt-10 text-[40px] font-700 text-[#2864dc]">3 балла</div>

<div class="term-grid grid grid-cols-3 gap-10 mt-10 text-center text-[22px]">
  <div><strong>Устно</strong></div>
  <div><strong>Неделя 10</strong></div>
  <div><strong>Первая часть курса</strong></div>
</div>

<div class="key-line mt-14 text-2xl text-center">
Понимание механизмов и рассуждение на новой небольшой задаче.
</div>

---

<!-- S15 -->

# Проект

<div class="text-center mt-4 text-[40px] font-700 text-[#2864dc]">3 балла</div>

<div class="plain-columns grid grid-cols-3 gap-10 mt-5 text-[20px] text-center">
  <div>Разобраться в соседней области ML.</div>
  <div>Понять центральный механизм.</div>
  <div>Показать небольшой эксперимент.</div>
</div>

<div class="term-grid grid grid-cols-2 gap-x-8 gap-y-3 mt-8 text-[18px]">
  <div><strong>PCA и k-means</strong><br><span class="muted">снижение размерности и кластеризация</span></div>
  <div><strong>Нейронные сети</strong><br><span class="muted">MLP и backpropagation</span></div>
  <div><strong>Временные ряды</strong><br><span class="muted">прогнозирование и temporal backtesting</span></div>
  <div><strong>Текст</strong><br><span class="muted">Naive Bayes и TF-IDF + логистическая регрессия</span></div>
  <div><strong>A/B-тестирование</strong><br><span class="muted">randomized experiment и causal effect</span></div>
  <div><strong>Рекомендательные системы</strong><br><span class="muted">collaborative filtering и matrix factorization</span></div>
</div>

<div class="micro mt-5 text-center">Подробные постановки, данные и требования будут опубликованы отдельно.</div>

---

<!-- S16 -->

# Таким образом

<div class="recap-list mt-8">
<ul class="text-[25px] space-y-5">
  <li>Современный ML можно описывать по режиму обучения, типу задачи, моделям и области применения.</li>
  <li>Курс сосредоточен на классическом обучении с учителем для табличных данных.</li>
  <li>Маршрут идёт от постановки и линейных моделей к ансамблям и диагностике.</li>
  <li>Оценка складывается из двух домашних работ, проекта, коллоквиума и семинарской активности.</li>
</ul>
</div>

---

<!-- S17 -->

<div class="section-kicker">Часть I · От прикладного вопроса к математической задаче</div>

# Кейс: список клиентов для команды удержания

<div class="case-box mt-7 text-[25px] leading-relaxed">
Сервис работает по ежемесячной подписке и имеет десятки тысяч активных аккаунтов.
Команда удержания может связаться только с <strong>200 клиентами в день</strong>.

Каждый вечер, в момент t₀, требуется оценить риск отмены подписки
<strong>в следующие 30 дней</strong> и сформировать список контактов на завтра.
</div>

<div class="micro mt-6">Это учебный синтетический пример</div>

<div v-click class="statement mt-8">Какой список нужно отдать команде завтра?</div>


---

<!-- S18 -->

# Как выглядит историческая строка

<div class="tag">prediction time = 31.01.2026 23:59</div>

| `customer_id` | `tenure_m` | `act_d_14d` | `late_p_90d` | `supp_t_30d` | `churn_30d` |
|---:|---:|---:|---:|---:|---:|
| 1042 | 5 | 3 | 1 | 2 | 1 |
| 2718 | 28 | 12 | 0 | 0 | 0 |
| 3195 | 11 | 7 | 0 | 1 | 0 |

<div class="grid grid-cols-2 gap-x-10 mt-5 text-[18px] muted">
  <div><code>tenure_m</code> — месяцев в сервисе</div>
  <div><code>act_d_14d</code> — активных дней за 14 дней</div>
  <div><code>late_p_90d</code> — просроченных платежей за 90 дней</div>
  <div><code>supp_t_30d</code> — обращений за 30 дней</div>
  <div><code>churn_30d</code> — отмена в следующие 30 дней</div>
</div>

---

<!-- S19 -->

# Объект, признаки, цель и горизонт

<div class="term-grid grid grid-cols-2 gap-x-10 gap-y-8 mt-7 text-[22px]">
  <div v-click><strong>Объект</strong><br>активный аккаунт в момент t₀</div>
  <div v-click><strong>Признаки x</strong><br>сведения об аккаунте, доступные в t₀</div>
  <div v-click><strong>Целевая переменная y</strong><br><code>churn_30d</code>: отмена в следующие 30 дней</div>
  <div v-click><strong>Горизонт</strong><br>интервал будущего длиной 30 дней</div>
</div>

<div v-click class="warning-line mt-8 text-xl">
Тот же клиент через месяц — другое наблюдение: состояние аккаунта изменилось.
</div>

---

<!-- S20 -->

# Модель как правило прогноза

<div class="key-line statement mt-8">
<strong>Модель</strong> переводит признаки объекта в прогноз.
</div>

<div class="text-center text-[34px] mt-8">

$$
f:\mathcal X\longrightarrow\mathcal Y,
\qquad \hat y=f(x)
$$

</div>

| $\mathcal X$ | $\mathcal Y=\{0,1\}$ |
|:---:|:---:|
| пространство признаковых описаний | возможные ответы churn-задачи |

---

<!-- S21 -->

# Семейство и обученная модель

| $\mathcal F$ | $\hat f\in\mathcal F$ |
|:---:|:---:|
| **семейство моделей** | **обученная модель** |
| Какие правила допустимы до обучения? | Какое конкретное правило получено после обучения? |

<div v-click class="micro mt-10 text-center">
Возможные семейства: линейные правила, деревья, базовые постоянные прогнозы и другие.
</div>

---

<!-- S22 -->

# Что называется обучением

<div class="key-line text-[25px]">
<strong>Обучение</strong> — процесс, в котором по историческим данным выбирается или настраивается модель для последующего применения к новым объектам.
</div>

<div class="text-center text-[29px] mt-6">

$$
D_{\text{train}}=\{(x_i,y_i)\}_{i=1}^{n}
$$

<div v-click>

$$
\hat f=A(D_{\text{train}}),
\qquad \hat y=\hat f(x)
$$

</div>
</div>

<div class="grid grid-cols-2 gap-x-12 gap-y-3 mt-5 text-[19px]">
  <div><strong>D<sub>train</sub></strong> — исторические примеры для обучения</div>
  <div><strong>A</strong> — алгоритм обучения</div>
  <div><strong>f̂</strong> — модель, полученная после обучения</div>
  <div><strong>ŷ</strong> — прогноз модели для нового объекта</div>
</div>

<div v-click class="micro mt-5">
Более подробная параметрическая запись приведена в приложении.
</div>


---

<!-- S23 -->

# Проще говоря: что происходит при обучении

<div class="plain-columns grid grid-cols-3 gap-8 mt-8 text-[21px]">
  <div>
    <div class="font-700 text-[#2864dc]">1 · Данные</div>
    <p class="mt-5">Исторические примеры, для которых известны признаки и правильные ответы.</p>
  </div>
  <div v-click>
    <div class="font-700 text-[#2864dc]">2 · Алгоритм обучения</div>
    <p class="mt-5">Использует примеры, чтобы выбрать или настроить правило.</p>
  </div>
  <div v-click>
    <div class="font-700 text-[#17845f]">3 · Обученная модель</div>
    <p class="mt-5">Хранит полученное правило и применяется к новым объектам.</p>
  </div>
</div>

<div v-click class="statement text-center mt-10">данные → алгоритм обучения → обученная модель → прогноз для нового объекта</div>

---

<!-- S24 -->

# Момент прогноза проводит границу информации

<div class="mt-1">
  <img
    src="/assets/week-01/prediction-moment.svg"
    alt="Момент t0 отделяет доступную историю клиента от будущих событий и горизонта прогноза"
    class="figure-wide h-[370px]"
  />
</div>


---

<!-- S25 -->

# Утечка из будущего

<div class="plain-columns grid grid-cols-2 gap-10 mt-8 text-[22px]">
  <div class="warning-line">
    <strong>Утечка будущего</strong> <span class="muted">(future leakage)</span>
    <p>В признаке есть информация, недоступная в момент t₀.</p>
  </div>
  <div v-click class="warning-line">
    <strong>Утечка цели</strong> <span class="muted">(target leakage)</span>
    <p>Признак прямо или косвенно сообщает будущий ответ.</p>
  </div>
</div>

<div v-click class="key-line statement mt-10 text-center">
Было ли значение доступно именно тогда, когда требовался прогноз?
</div>

<div v-click class="micro mt-7 text-center">Тот же принцип работает в кредитном скоринге, антифроде или медицинских прогнозах: признак должен быть известен в момент, когда требуется прогноз.</div>

---

<!-- S26 -->

# Три вопроса к одному churn-кейсу

<table class="text-[18px] mt-5">
  <thead>
    <tr><th class="py-3">Вопрос</th><th class="py-3">Желаемый результат</th><th class="py-3">Возможные методы</th></tr>
  </thead>
  <tbody>
    <tr v-click><td class="py-4"><strong>Кто уйдёт?</strong></td><td class="py-4">прогноз для нового клиента</td><td class="py-4">предсказательная модель + оценка на отложенных данных</td></tr>
    <tr v-click><td class="py-4"><strong>Какие характеристики связаны с уходом и насколько уверенно?</strong></td><td class="py-4">связь и её неопределённость</td><td class="py-4">статистическая модель + оценка неопределённости</td></tr>
    <tr v-click><td class="py-4"><strong>Кому звонок поможет остаться?</strong></td><td class="py-4">причинный эффект контакта</td><td class="py-4">рандомизированный эксперимент / причинные методы</td></tr>
  </tbody>
</table>

<div v-click class="warning-box mt-6 text-xl">
Высокий риск ухода не означает высокий эффект звонка.
</div>

---

<!-- S27 -->

# Таким образом

<div class="recap-list mt-8">
<ul class="text-[24px] space-y-4">
  <li>Объект, признаки, цель, горизонт и t₀ задают churn-задачу.</li>
  <li>Алгоритм обучения использует исторические данные и возвращает конкретную модель.</li>
  <li>Признак допустим, только если существует в момент прогноза.</li>
  <li>Прогноз, статистический вывод и причинный эффект требуют разных методов и дизайна исследования.</li>
</ul>
</div>

<div class="statement mt-10 text-center">Пока мы ещё ничего не сказали о качестве модели</div>

---

<!-- S28 -->

<div class="section-kicker">Часть II · Проверка прогноза на новых объектах</div>



<div class="statement mt-8">
Что говорит качество модели на тех же данных, по которым она обучалась?
</div>


<div v-click class="key-line mt-10 text-[27px]">
<strong>Обобщающая способность</strong> — способность модели сохранять качество на новых объектах.
</div>


---

<!-- S29 -->

# Простое разделение: 8 + 2

<div class="key-line text-[27px] text-center">
<strong>Модель обучаем на train.</strong> Качество прогноза оцениваем на данных, которые в обучении не участвовали.
</div>

<img
  src="/assets/week-01/train-test-split.svg"
  alt="Десять объектов разделены на восемь обучающих и два тестовых"
  class="figure-wide mt-7 h-[285px]"
/>

---

<!-- S30 -->

# Train и test отвечают на разные вопросы

<div class="plain-columns grid grid-cols-2 gap-12 mt-9 text-[23px]">
  <div>
    <div class="font-700 text-[#2864dc]">train</div>
    <p class="mt-5">Используется для построения и настройки модели.</p>
    <p class="muted">Ошибка описывает знакомые объекты.</p>
  </div>
  <div v-click>
    <div class="font-700 text-[#17845f]">test</div>
    <p class="mt-5">Используется как <strong>независимая проверка</strong> качества на новых объектах, если разбиение разумно имитирует будущее применение модели.</p>
  </div>
</div>

<div v-click class="statement mt-10 text-center">Обучающая и тестовая выборки играют разные роли в процессе обучения</div>

---

<!-- S31 -->

# Как исследователь подстраивается под test

<ol class="text-[25px] space-y-4 mt-8">
  <li v-click>Обучили вариант A → посмотрели качество на test.</li>
  <li v-click>Изменили признаки → снова посмотрели тот же test.</li>
  <li v-click>Повторили цикл 20 раз → оставили лучший вариант.</li>
</ol>

<div v-click class="warning-line mt-10 text-[25px]">
Test повлиял на решения исследователя. Полученная оценка больше не является полностью независимой.
</div>

<div v-click class="micro mt-6">Утечка будущего и повторная обратная связь по test нарушают одно правило: при разработке используется информация, которая должна оставаться недоступной.</div>

---

<!-- S32 -->

# Как тогда сравнивать модели?

<div class="key-line statement mt-14">
Финальный test стараются оставить независимым.
</div>

<div v-click class="text-2xl mt-12 text-center">
Для итеративного выбора используют отдельную <strong>валидационную выборку (validation)</strong>.
</div>


---

<!-- S33 -->

# Бейзлайн задаёт точку отсчёта

<div class="text-[68px] font-700 text-[#2864dc] text-center mt-5">95% точности</div>

<div class="statement text-center mt-5">Это хороший результат?</div>

<div v-click class="key-line mt-10 text-[28px]">
Значение метрики само по себе почти ничего не говорит, пока не понятно, с чем его сравнивать.
</div>

<div v-click class="text-2xl mt-7 text-center"><strong>Бейзлайн</strong> — простой понятный прогноз или правило, задающее масштаб.</div>

---

<!-- S34 -->

# 95 правильных ответов из 100

<div>
  <img
    src="/assets/week-01/class-imbalance.svg"
    alt="Сто объектов: 95 объектов класса 0 и 5 объектов класса 1"
    class="figure-wide h-[265px]"
  />
</div>

<div class="term-grid grid grid-cols-3 gap-8 mt-2 text-center text-[19px]">
  <div><strong>≈ 50%</strong><br><span class="micro">равновероятное угадывание</span></div>
  <div><strong>95%</strong><br><span class="micro">всегда прогнозировать 0</span></div>
  <div><strong>следующий шаг</strong><br><span class="micro">предметное правило → обучаемая модель</span></div>
</div>

<div class="warning-line mt-5 text-xl"><strong>Правило «всегда 0»</strong> не обнаружит ни одного редкого объекта класса 1.</div>

---

<!-- S35 -->

# Таким образом

<div class="recap-list mt-8">
<ul class="text-[24px] space-y-5">
  <li>Обобщающая способность относится к качеству на новых объектах.</li>
  <li>На train обучаем модель, на test независимо проверяем её</li>
  <li>Повторная обратная связь по test разрушает независимость оценки.</li>
  <li>Бейзлайн задаёт точку отсчёта для интерпретации метрики.</li>
</ul>
</div>

---

<!-- S36 -->

<div class="section-kicker">Часть III · Недообучение и переобучение</div>

# Сначала только данные

<div class="mt--3">
  <img
    src="/assets/week-01/classification-data.svg"
    alt="Два класса образуют переплетённые полумесяцы с небольшим шумом"
    class="figure h-[390px]"
  />
</div>

<div class="figure-caption-row mt-2">
  <div style="border-top-color: var(--week-green)"><strong>Устойчивая структура:</strong> две изогнутые области.</div>
  <div style="border-top-color: var(--week-orange)"><strong>Шум:</strong> отдельные нетипичные точки.</div>
</div>

---

<!-- S37 -->

# Недообучение

<div class="key-line text-[25px]">
<strong>Недообучение:</strong> модель или процедура обучения недостаточно гибки, чтобы описать устойчивую закономерность в данных.
</div>

<img
  src="/assets/week-01/classification-underfit.svg"
  alt="Слишком грубая граница классификации"
  class="figure h-[315px] mt-1"
/>

<div class="visual-conclusion mt-2"><strong>Ошибка высока и на train, и на новых данных.</strong></div>

---

<!-- S38 -->

# Разумная гибкость

<div class="mt-1">
  <img
    src="/assets/week-01/classification-reasonable.svg"
    alt="Граница следует двум основным областям данных"
    class="figure h-[315px]"
  />
</div>

<div class="figure-caption-row mt-2">
  <div style="border-top-color: var(--week-green)">Граница описывает форму двух областей.</div>
  <div>Нетипичная точка не получает собственный островок.</div>
</div>

---

<!-- S39 -->

# Переобучение

<div class="key-line text-[25px]">
<strong>Переобучение:</strong> правило чрезмерно чувствительно к конкретной обучающей выборке и повторяет случайные детали.
</div>

<img
  src="/assets/week-01/classification-overfit.svg"
  alt="Чрезмерно гибкая граница создаёт локальные островки вокруг отдельных точек"
  class="figure h-[315px] mt-1"
/>

<div class="visual-conclusion mt-2"><strong>Ошибка на train очень мала, а на новых данных растёт.</strong></div>

---

<!-- S40 -->

# Одна выборка, три уровня гибкости

<div class="mt-4">
  <img
    src="/assets/week-01/classification-complexity.png"
    alt="Одинаковые данные: слишком грубая граница, разумно гибкая граница и переобученная граница"
    class="figure-wide h-[360px]"
  />
</div>

---

<!-- S41 -->

# Сложность модели и две ошибки

<div class="text-xl font-650 text-[#2864dc]">Частая картина при увеличении гибкости модели</div>

<img
  src="/assets/week-01/complexity-errors.svg"
  alt="Обучающая ошибка падает, а ошибка на новых данных сначала падает, затем растёт"
  class="figure h-[410px] mt--2"
/>

<div class="micro mt--1 text-center">Ось сложности порядковая и зависит от семейства моделей.</div>


---

<!-- S42 -->

# Проще говоря

<div class="plain-columns grid grid-cols-3 gap-8 mt-8 text-[21px]">
  <div class="warning-line">
    <strong>Слишком просто</strong>
    <p>Модель не умеет описать часть устойчивой закономерности.</p>
  </div>
  <div v-click class="success-line">
    <strong>Разумно гибко</strong>
    <p>Модель улавливает основную структуру данных.</p>
  </div>
  <div v-click class="warning-line">
    <strong>Слишком гибко</strong>
    <p>Появляются способы подстроиться под случайные детали этой выборки.</p>
  </div>
</div>

<div v-click class="key-line mt-10 text-[26px] text-center">
Очень маленькая ошибка на train сама по себе ещё мало говорит о качестве будущих прогнозов.
</div>

---

<!-- S43 -->

# Что говорит разрыв между ошибками

<div class="plain-columns grid grid-cols-2 gap-12 mt-8 text-[23px]">
  <div class="warning-line">
    <strong>Большой разрыв</strong>
    <p>Типичный признак переобучения: на train хорошо, на новых данных заметно хуже.</p>
  </div>
  <div v-click>
    <strong>Маленький разрыв</strong>
    <p>Совместим и с хорошей моделью, и с одинаково плохим качеством на обеих выборках.</p>
  </div>
</div>

<div v-click class="key-line mt-10 text-[26px] text-center">
Оцениваем и величину разрыва, и само качество модели — в том числе по сравнению с бейзлайном.
</div>

---

<!-- S44 -->

# Регрессия: процесс порождения данных

<div class="text-center text-[25px]">

$$
g(x)=0.28+0.46\sin\bigl(\pi(x+0.08)\bigr)+0.12x,
\qquad y_i=g(x_i)+\varepsilon_i
$$

</div>

<img
  src="/assets/week-01/regression-data.svg"
  alt="Гладкая зависимость, шумные обучающие наблюдения и новые точки внутри диапазона"
  class="figure h-[365px] mt--5"
/>

<div class="micro mt--1 text-center">Синие точки используются для обучения. Оранжевые ответы модель при обучении не видит.</div>

---

<!-- S45 -->

# Недостаточная и разумная гибкость

<div class="grid grid-cols-2 gap-7 mt--2">
  <img src="/assets/week-01/regression-linear.svg" alt="Линейная модель пропускает изгиб" class="figure"/>
  <img src="/assets/week-01/regression-moderate.svg" alt="Полином умеренной степени восстанавливает основную форму" class="figure"/>
</div>

<div class="figure-caption-row mt-3">
  <div><strong>Степень 1:</strong> устойчиво пропускает нелинейный изгиб.</div>
  <div><strong>Умеренная степень:</strong> передаёт основную форму между наблюдениями.</div>
</div>

---

<!-- S46 -->

# Интерполяция: ноль на train

<div class="key-line text-[22px]">
Для <em>n</em> точек с попарно различными <em>x<sub>i</sub></em> существует единственный полином степени не выше <em>n</em> − 1, проходящий через все эти точки.
</div>

<img
  src="/assets/week-01/regression-interpolation.svg"
  alt="Интерполяционный полином проходит через обучающие точки и ошибается между ними"
  class="figure h-[330px] mt-1"
/>

<div class="visual-conclusion mt-2">
Нулевая train error не гарантирует хороший прогноз на новых наблюдениях.
</div>

---

<!-- S47 -->

# А что будет за пределами данных?

<div class="key-line text-[22px]">
<strong>Экстраполяция</strong> — прогноз для значений признака за пределами диапазона обучающих данных.
</div>

<img
  src="/assets/week-01/regression-extrapolation.svg"
  alt="Три модели по-разному продолжают зависимость правее обучающего диапазона"
  class="figure-wide mt-1"
/>

<div class="micro mt-2 text-center">Линейная модель даёт простое и предсказуемое по форме продолжение, но оно тоже может быть неверным.</div>

---

<!-- S48 -->

# Таким образом

<div class="recap-list mt-8">
<ul class="text-[24px] space-y-5">
  <li><strong>Недообучение:</strong> высокая ошибка на train и новых объектах.</li>
  <li>Разумная гибкость описывает устойчивую структуру.</li>
  <li><strong>Переобучение:</strong> ошибка на train продолжает падать, ошибка на новых данных растёт.</li>
  <li>Экстраполяция относится к прогнозу уже за границей обучающего диапазона.</li>
</ul>
</div>

---

<!-- S49 -->

<div class="section-kicker">Часть IV · Немного ООП: Модель как объект Python</div>

# Знакомые значения в Python — тоже объекты

```python {1-3|5-7|all}
balance = 1500
customer_id = "C-1042"
active_days = [1, 4, 8]

print(type(balance))      # <class 'int'>
print(type(customer_id))  # <class 'str'>
print(type(active_days))  # <class 'list'>
```

<div v-click class="key-line mt-8 text-2xl">
Мы уже работали с объектами и классами Python, даже если не использовали эту терминологию. Числа, строки и списки — объекты соответствующих классов
</div>

---

<!-- S50 -->

# Класс, экземпляр, атрибут и метод

<div class="term-grid grid grid-cols-2 gap-x-12 gap-y-9 mt-7 text-[22px]">
  <div v-click><strong>Класс</strong><br>описание типа объектов: данных и поддерживаемых операций<br><span class="micro">пример: <code>list</code></span></div>
  <div v-click><strong>Экземпляр</strong><br>конкретный объект данного класса<br><span class="micro">пример: <code>active_days</code></span></div>
  <div v-click><strong>Атрибут</strong><br>именованное значение, связанное с объектом<br><span class="micro">составляет состояние</span></div>
  <div v-click><strong>Метод</strong><br>функция класса, вызываемая для экземпляра<br><span class="micro">пример: <code>append</code></span></div>
</div>

---

<!-- S51 -->

# Один компактный класс: `Account`

<div class="grid grid-cols-[1.2fr_0.8fr] gap-12 mt-4 items-start">
<div>

```python {1|2-4|6-7|all}
class Account:
    def __init__(self, customer_id):
        self.customer_id = customer_id
        self.active = True

    def cancel(self):
        self.active = False
```

</div>
<div class="term-grid grid gap-6 text-[20px]">
  <div><strong>Класс</strong><br><code>Account</code></div>
  <div><strong>Атрибуты</strong><br><code>customer_id</code>, <code>active</code></div>
  <div><strong>Метод</strong><br><code>cancel()</code></div>
</div>
</div>

<div class="micro mt-4"><code>__init__</code> автоматически вызывается при создании экземпляра и задаёт его начальное состояние.</div>

---

<!-- S52 -->

# Создаём экземпляр и вызываем метод

```python {1|3-4|6-7|all}
account = Account(customer_id="C-1042")

print(type(account))   # <class '__main__.Account'>
print(account.active)  # True

account.cancel()
print(account.active)  # False
```

<div class="plain-columns grid grid-cols-2 gap-10 mt-7 text-xl">
  <div><strong>До <code>cancel()</code></strong><br><code>account.active == True</code></div>
  <div><strong>После <code>cancel()</code></strong><br><code>account.active == False</code></div>
</div>

<div class="micro mt-5"><code>__main__</code> означает, что класс определён непосредственно в исполняемом сейчас скрипте или notebook.</div>

---

<!-- S53 -->

# Что означает `self`

```python {1|2|all}
def cancel(self):
    self.active = False
```

<div class="key-line mt-9 text-[28px]">
<strong><code>self</code></strong> — ссылка на экземпляр, для которого сейчас выполняется метод.
</div>

<div v-click class="mt-10 text-[24px]">
При вызове <code>account.cancel()</code> имя <code>self</code> внутри метода указывает на объект <code>account</code>. Поэтому меняется его атрибут <code>active</code>.
</div>

---

<!-- S54 -->

# Обычный объект → объект модели

<div class="key-line mt-5 text-[25px]">
Модель scikit-learn — экземпляр класса со своим состоянием и методами.
</div>

<div class="plain-columns grid grid-cols-2 gap-12 mt-10 text-[25px]">
  <div>
    <strong><code>fit(X, y)</code></strong>
    <p class="mt-5">Использует обучающие данные и изменяет состояние экземпляра.</p>
  </div>
  <div v-click>
    <strong><code>predict(X_new)</code></strong>
    <p class="mt-5">Читает сохранённое состояние и выдаёт ответы для новых строк.</p>
  </div>
</div>

<div v-click class="statement text-center mt-10"><code>predict</code> использует уже обученную модель.</div>

---

<!-- S55 -->

# Разработаем простой классификатор

<div class="key-line text-[24px] mb-7">
<strong>Идея:</strong> во время обучения запомнить самый частый класс, а затем предсказывать его для каждого нового объекта.
</div>

<ol class="text-[25px] space-y-4 mt-7">
  <li v-click>Посмотреть на ответы <code>y</code> в обучающей выборке.</li>
  <li v-click>Определить и сохранить самый частый класс.</li>
  <li v-click>Вернуть сохранённый класс для каждой новой строки.</li>
</ol>

---

<!-- S56 -->

# Полный класс: смотрим на `fit`

```python {2-6}
class MostFrequentClassifier:
    def fit(self, X, y):
        ones = sum(y)
        zeros = len(y) - ones
        self.class_ = 1 if ones > zeros else 0
        return self

    def predict(self, X):
        return [self.class_] * len(X)
```

<div class="plain-columns grid grid-cols-2 gap-10 mt-5 text-[19px]">
  <div><code>ones</code>, <code>zeros</code> — локальные переменные метода.</div>
  <div><code>self.class_</code> сохраняется в состоянии модели после <code>fit</code>.</div>
</div>

<div class="micro mt-4">В scikit-learn суффикс <code>_</code> отмечает публичные атрибуты, появившиеся во время <code>fit</code>: <code>class_</code>, <code>coef_</code>, <code>classes_</code>.</div>

---

<!-- S57 -->

# Тот же класс: смотрим на `predict`

```python {8-9}
class MostFrequentClassifier:
    def fit(self, X, y):
        ones = sum(y)
        zeros = len(y) - ones
        self.class_ = 1 if ones > zeros else 0
        return self

    def predict(self, X):
        return [self.class_] * len(X)
```

<div class="plain-columns grid grid-cols-2 gap-10 mt-6 text-xl">
  <div><code>self.class_</code> — читаем состояние, сохранённое после обучения.</div>
  <div><code>len(X)</code> — выдаём один прогноз на каждую строку.</div>
</div>

---

<!-- S58 -->

# Данные маленького эксперимента

<div class="grid grid-cols-2 gap-8 text-[17px]">
  <div>
    <div class="tag mb-3">train</div>

```python
X_train = [
    [5, 3],
    [28, 12],
    [11, 7],
    [2, 1],
    [19, 10],
]
y_train = [1, 0, 0, 1, 0]
```

  </div>
  <div v-click>
    <div class="tag mb-3">test</div>

```python
X_test = [
    [3, 1],
    [14, 8],
    [7, 4],
]
y_test = [1, 0, 0]
```

  </div>
</div>

<div class="micro mt-4"><code>X</code>: каждая строка — <code>[tenure_m, act_d_14d]</code>. <code>y</code>: отменил ли клиент подписку в следующие 30 дней.</div>

---

<!-- S59 -->

# Что изменилось после `fit`?

<div class="grid grid-cols-2 gap-10 mt-7">
  <div>
    <div class="tag mb-3">до fit</div>

```python
model = MostFrequentClassifier()
vars(model)
# {}
```

  </div>
  <div v-click>
    <div class="tag mb-3">после fit</div>

```python
model.fit(X_train, y_train)
vars(model)
# {'class_': 0}
```

  </div>
</div>

<div v-click class="key-line mt-9 text-[22px]">
<code>vars(model)</code> позволяет посмотреть атрибуты, которые сейчас хранит экземпляр.
</div>

---

<!-- S60 -->

# Прогноз и ручной расчёт accuracy

```python
y_pred = model.predict(X_test)
# [0, 0, 0]
```

| Тестовый объект | `y_test` | `y_pred` | Совпадение |
|---:|---:|---:|:---:|
| 1 | 1 | 0 | нет |
| 2 | 0 | 0 | да |
| 3 | 0 | 0 | да |

<div v-click class="text-center text-[34px] mt-4">

$$
\operatorname{accuracy}=\frac{2}{3}\approx0.667
$$

</div>

<div v-click class="micro text-center">Это оценка бейзлайна самого частого класса на трёх тестовых объектах; для вывода о практической полезности churn-системы её недостаточно.</div>

---

<!-- S61 -->

# Мост к `DummyClassifier`

```python {1|3|4|5-6|all}
from sklearn.dummy import DummyClassifier

baseline = DummyClassifier(strategy="most_frequent")
baseline.fit(X_train, y_train)
y_pred = baseline.predict(X_test)
# [0 0 0]
```

<div class="key-line mt-10 text-[25px]">
Библиотечный класс поддерживает больше возможностей, однако основная последовательность та же:
<strong>создание объекта → <code>fit</code> → <code>predict</code></strong>.
</div>

---

<!-- S62 -->

# Таким образом

<div class="recap-list mt-8">
<ul class="text-[24px] space-y-5">
  <li>Класс описывает устройство объектов, а экземпляр хранит собственное состояние.</li>
  <li><code>__init__</code> задаёт начальное состояние; методы обращаются к экземпляру через <code>self</code>.</li>
  <li><code>fit</code> добавляет состояние, полученное по обучающим данным; <code>predict</code> использует его для новых строк.</li>
  <li><code>MostFrequentClassifier</code> и <code>DummyClassifier</code> реализуют один бейзлайн через общий интерфейс.</li>
</ul>
</div>

---

<!-- S63 -->

# Первый проверяемый ML-эксперимент целиком

<div class="experiment-sequence">
  <div class="experiment-stage"><span class="stage-index">01</span><strong>Прикладная задача</strong></div>
  <div class="experiment-stage"><span class="stage-index">02</span><strong>Постановка</strong></div>
  <div class="experiment-stage"><span class="stage-index">03</span><strong>Данные и split</strong></div>
  <div class="experiment-stage"><span class="stage-index">04</span><strong>Бейзлайн</strong></div>
  <div class="experiment-stage"><span class="stage-index">05</span><strong>Обучение</strong></div>
  <div class="experiment-stage"><span class="stage-index">06</span><strong>Прогноз</strong></div>
  <div class="experiment-stage"><span class="stage-index">07</span><strong>Проверка</strong></div>
  <div class="experiment-stage"><span class="stage-index">08</span><strong>Вывод</strong></div>
</div>

---

<!-- S64 -->

<div class="section-kicker">Итог недели 1</div>

# Что мы теперь называем ML-экспериментом

<div class="recap-list mt-8">
<ul class="text-[24px] space-y-5">
  <li>ML-задача начинается с определения объектов, признаков, целевой переменной и момента прогноза.</li>
  <li>Алгоритм обучения использует исторические данные и возвращает модель, которую применяют к новым объектам.</li>
  <li>Качество прогноза проверяют на данных, не участвовавших в обучении, и сравнивают с понятным бейзлайном.</li>
  <li>Низкая ошибка на обучающей выборке ещё не означает хорошего обобщения: возможны недообучение и переобучение.</li>
</ul>
</div>

<div class="mt-10 text-2xl">
<strong>Следующая неделя:</strong> линейная регрессия — первая модель, механизм которой разберём подробно.
</div>


---

<!-- A01 -->

# A01 · Параметрическая запись

<div class="text-center text-[30px] mt-10">

$$
\mathcal F=\{f_\theta:\mathcal X\to\mathcal Y\mid\theta\in\Theta\}
$$

$$
\hat\theta=A(D_{\text{train}}),
\qquad \hat y=f_{\hat\theta}(x)
$$

</div>

<div class="key-line mt-10 text-2xl">
Запись с θ — удобная общая схема. Она не требует, чтобы у любой ML-модели буквально существовал конечномерный вектор параметров.
</div>

---

<!-- A02 -->

# A02 · Атрибут instance и атрибут класса

<div class="grid grid-cols-2 gap-10 mt-8">
  <div>

```python
class Account:
    category = "subscription"

    def __init__(self, customer_id):
        self.customer_id = customer_id
```

  </div>
  <div class="term-grid grid gap-8 text-[23px]">
    <div><code>self.customer_id</code><br>принадлежит конкретному экземпляру</div>
    <div><code>Account.category</code><br>задан в теле класса и относится к классу</div>
  </div>
</div>

<div class="micro mt-8">Для основной логики Недели 1 это различие не требуется.</div>

---

<!-- A03 -->

# A03 · Что почитать после лекции

<div class="text-[18px] space-y-5 mt-4">
  <div>
    <strong>James G., Witten D., Hastie T., Tibshirani R., Taylor J. — <em>An Introduction to Statistical Learning: with Applications in Python</em>, §§2.1–2.2.1.</strong><br>
    <a href="https://doi.org/10.1007/978-3-031-38747-0">doi.org/10.1007/978-3-031-38747-0</a><br>
    Полезно для связи между прогнозом, ошибкой на train/test, гибкостью модели и переобучением.
  </div>
  <div>
    <strong>Соколов Е. А. — <em>Машинное обучение — 1. Лекция 1: Введение в машинное обучение</em>.</strong><br>
    <a href="https://github.com/esokolov/ml-course-hse/blob/master/ml1-2026-spring/lecture-notes/lecture01-intro.tex">github.com/esokolov/ml-course-hse/…/lecture01-intro.tex</a><br>
    Более формальная постановка ML-задачи через пространства объектов и ответов, семейство моделей, функцию ошибки и алгоритм обучения.
  </div>
  <div>
    <strong>Wilber J., Werness B. — <em>The Bias–Variance Tradeoff</em>. MLU-Explain.</strong><br>
    <a href="https://mlu-explain.github.io/bias-variance/">mlu-explain.github.io/bias-variance/</a><br>
    Интерактивная интуиция недообучения, переобучения и чувствительности результата к конкретной выборке.
  </div>
</div>
