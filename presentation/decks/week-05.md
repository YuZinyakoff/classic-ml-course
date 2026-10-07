---
theme: default
title: Метрики классификации и принятие решения
author: НИУ ВШЭ
info: |
  Неделя 5. Метрики классификации и принятие решения.
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
appendixSlides: 1
exportFilename: week-05-classification-metrics
download: false
---

<!-- S01 -->
<div class="section-kicker mt-8">Классическое машинное обучение · Неделя 5</div>
<h1 class="deck-title mt-8">Метрики классификации<br>и принятие решения</h1>
<div class="lecture-question mt-12">От score и вероятности —<br>к решению и оценке качества</div>
<MathBlock formula="x\longrightarrow score\,/\,\hat p(x)\longrightarrow\;?" class="text-[42px] mt-14" />

---

<!-- S02 -->
<SectionChrome section="Вероятность и решение" />
# 12 объектов оценочной выборки

<div class="lead mt-6">Модель уже обучена. Объекты отсортированы по убыванию <MathBlock formula="\hat p" :display="false" class="inline-block" />.</div>
<div class="mt-8"><WeekFiveEvaluationTable /></div>

---
clicks: 3
---

<!-- S03 -->
<SectionChrome section="Вероятность и решение" />
# Что делать с прогнозом 0.75?

<MathBlock formula="\hat p(\text{мошенничество}\mid x_4)=0.75" class="text-[38px] mt-12" />
<div class="grid grid-cols-3 gap-12 mt-16 text-center text-[29px]">
  <div v-click="1" class="plain-columns">Пропустить</div>
  <div v-click="2" class="plain-columns">Отправить<br>на ручную проверку</div>
  <div v-click="3" class="plain-columns">Заблокировать</div>
</div>
<div v-click="3" class="lead mt-14 text-center">Один и тот же прогноз может вести к разным действиям — в зависимости от задачи.</div>

---
clicks: 2
---

<!-- S04 -->
<SectionChrome section="Вероятность и решение" />
# Порог превращает прогноз в класс

<MathBlock formula="\hat y_t(x)=\mathbb I[\hat p(x)\ge t]" class="text-[34px] mt-8" />
<div class="text-[22px] muted mt-6">Шкала вероятности: 0 → 1</div>
<div class="mt-8"><WeekFiveRankedList layout="scale" :show-truth="false" :threshold="$clicks === 0 ? undefined : $clicks === 1 ? 0.5 : 0.8" /></div>
<div v-click="1" class="lead mt-8 text-center">0.5 — привычный выбор, а не универсальное правило.</div>

---
clicks: 2
---

<!-- S05 -->
<SectionChrome section="Вероятность и решение" />
# Одно конкретное решение: порог 0.5

<div class="mt-12"><WeekFiveRankedList :threshold="$clicks >= 1 ? 0.5 : undefined" /></div>
<div v-click="1" class="lead text-center mt-10">7 объектов получили прогноз класса 1.</div>
<div v-click="2" class="lecture-question text-center mt-10">Как у каждого объекта<br>могут согласоваться прогноз и настоящий класс?</div>

---
clicks: 4
---

<!-- S06 -->
<SectionChrome section="Матрица ошибок и знаменатели" />
# Четыре возможных исхода

<div class="grid grid-cols-2 gap-x-16 gap-y-9 mt-10 text-[27px]">
  <div v-click="1"><div class="text-[34px] text-green-700">TP</div>Мошенничество есть.<br>Модель предсказала класс 1.</div>
  <div v-click="2"><div class="text-[34px] text-orange-600">FP</div>Мошенничества нет.<br>Модель предсказала класс 1.</div>
  <div v-click="3"><div class="text-[34px] text-orange-600">FN</div>Мошенничество есть.<br>Модель предсказала класс 0.</div>
  <div v-click="4"><div class="text-[34px] text-green-700">TN</div>Мошенничества нет.<br>Модель предсказала класс 0.</div>
</div>
<div class="lead mt-10">«Положительный» означает класс 1, а не «хороший исход».</div>

---
clicks: 1
---

<!-- S07 -->
<SectionChrome section="Матрица ошибок и знаменатели" />
# Отмечаем исход у каждого объекта

<div class="mt-12"><WeekFiveRankedList :threshold="0.5" show-outcomes /></div>
<MathBlock v-click="1" formula="TP=4,\quad FP=3,\quad FN=1,\quad TN=4" class="text-[36px] mt-12" />

---
clicks: 1
---

<!-- S08 -->
<SectionChrome section="Матрица ошибок и знаменатели" />
# Матрица ошибок (confusion matrix)

<div class="grid grid-cols-[540px_1fr] gap-16 mt-12 items-center">
  <WeekFiveConfusion :show-values="$clicks >= 1" />
  <div class="lead">Строки — настоящий класс.<br><br>Столбцы — прогноз класса.<br><br><span class="muted">Те же четыре числа, другой способ организации.</span></div>
</div>

---
clicks: 2
---

<!-- S09 -->
<SectionChrome section="Матрица ошибок и знаменатели" />
# Accuracy: доля правильных решений

<div class="grid grid-cols-[540px_1fr] gap-10 mt-12 items-center">
  <WeekFiveConfusion focus="accuracy" :stage="$clicks" />
  <div><MathBlock v-click="2" formula="Accuracy=\frac{TP+TN}{N}=\frac8{12}" class="text-[30px]" /><div class="lead mt-12">Знаменатель:<br>все объекты.</div></div>
</div>

---
clicks: 2
---

<!-- S10 -->
<SectionChrome section="Матрица ошибок и знаменатели" />
# Precision: кому можно доверять среди выбранных?

<div class="grid grid-cols-[540px_1fr] gap-10 mt-12 items-center">
  <WeekFiveConfusion focus="precision" :stage="$clicks" />
  <div><MathBlock v-click="2" formula="Precision=\frac{TP}{TP+FP}=\frac47" class="text-[29px]" /><div class="lead mt-12">Среди прогнозов класса 1:<br>какая доля действительно<br>принадлежит классу 1?</div></div>
</div>

---
clicks: 2
---

<!-- S11 -->
<SectionChrome section="Матрица ошибок и знаменатели" />
# Recall: сколько положительных объектов нашли?

<div class="grid grid-cols-[540px_1fr] gap-10 mt-12 items-center">
  <WeekFiveConfusion focus="recall" :stage="$clicks" />
  <div><MathBlock v-click="2" formula="Recall=\frac{TP}{TP+FN}=\frac45" class="text-[30px]" /><div class="lead mt-12">Среди настоящих объектов<br>класса 1: какую долю<br>нашла модель?</div></div>
</div>

---

<!-- S12 -->
<SectionChrome section="Матрица ошибок и знаменатели" />
# Precision и Recall начинают с разных групп

<div class="grid grid-cols-2 gap-16 mt-14">
  <div><div class="section-label">Начинаем с решения модели</div><MathBlock formula="Precision=\widehat P(Y=1\mid\hat Y=1)" class="text-[28px] mt-12" /><div class="lead mt-12">Насколько чиста<br>выбранная группа?</div></div>
  <div><div class="section-label">Начинаем с настоящего класса</div><MathBlock formula="Recall=\widehat P(\hat Y=1\mid Y=1)" class="text-[28px] mt-12" /><div class="lead mt-12">Какую долю класса 1<br>мы охватили?</div></div>
</div>

---
clicks: 2
---

<!-- S13 -->
<SectionChrome section="Матрица ошибок и знаменатели" />
# Specificity: Recall отрицательного класса

<div class="grid grid-cols-[540px_1fr] gap-10 mt-12 items-center">
  <WeekFiveConfusion focus="specificity" :stage="$clicks" />
  <div>
    <MathBlock v-click="2" formula="Specificity=\frac{TN}{TN+FP}=\frac47" class="text-[29px]" />
    <div class="lead mt-12">Какую долю класса 0<br>правильно оставили отрицательной?</div>
    <div class="lead mt-10">Specificity — это Recall класса 0.</div>
  </div>
</div>

---
clicks: 3
---

<!-- S14 -->
<SectionChrome section="Матрица ошибок и знаменатели" />
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
clicks: 3
---

<!-- S15 -->
<SectionChrome section="Матрица ошибок и знаменатели" />
# Проверим решение на редком классе

<div class="grid grid-cols-[540px_1fr] gap-12 mt-10 items-center">
  <div v-if="$clicks === 0" class="space-y-8 lead"><div>10 000 объектов.</div><div>Класс 1 составляет 1%.</div><div>Всем предсказываем класс 0.</div><div class="text-[32px]">Какой будет Accuracy?</div></div>
  <WeekFiveConfusion v-else :values="[9900,0,100,0]" />
  <div class="space-y-10 text-[29px]"><div v-click="1">Accuracy = 99%</div><div v-click="2">Recall = 0</div><div v-click="3">Нет прогнозов класса 1:<br>Precision не определён.</div></div>
</div>
<div v-click="3" class="lead mt-10">Accuracy верна, но недостаточна для вопроса «находим ли мы редкий класс?»</div>

---
clicks: 2
---

<!-- S16 -->
<SectionChrome section="Матрица ошибок и знаменатели" />
# Скрининг: какую ошибку опаснее допустить?

<div class="grid grid-cols-[1fr_65px_1fr] gap-10 items-center mt-8 text-center">
  <div><div class="section-label">Первый этап</div><div class="lead mt-5">Дешёвый первичный скрининг</div></div><MathBlock formula="\longrightarrow" class="text-[35px]" />
  <div><div class="section-label">Положительный результат</div><div class="lead mt-5">Более точное<br>и дорогое обследование</div></div>
</div>
<div class="text-[30px] text-center mt-10">Какая ошибка опаснее? Какой показатель вы бы контролировали?</div>
<div class="grid grid-cols-2 gap-16 mt-10">
  <div v-click="1"><div class="section-label">FN · пропуск</div><div class="text-[25px] mt-4">Болезнь пропущена.<br>Важен высокий Recall.</div></div>
  <div v-click="2"><div class="section-label">FP · ложная тревога</div><div class="text-[25px] mt-4">Перегружает второй этап, повышает расходы и тревогу.<br>Precision тоже важен.</div></div>
</div>
<div v-click="2" class="text-[25px] mt-8">Область задачи сама по себе не выбирает метрику.<br>Важны действие и последствия ошибок.</div>

---
clicks: 2
---

<!-- S17 -->
<SectionChrome section="Матрица ошибок и знаменатели" />
# Антифрод: одна модель, два действия

<div class="grid grid-cols-2 gap-16 mt-12">
  <div><div class="section-label">Автоматическая блокировка</div><div class="lead mt-6">Отклоняем платёж.</div><div v-click="1" class="lead mt-10">FP напрямую вредит<br>невиновному пользователю.</div></div>
  <div><div class="section-label">Ручная проверка</div><div class="lead mt-6">Формируем очередь проверки.</div><div v-click="1" class="lead mt-10">FP расходует время<br>и вместимость очереди.</div></div>
</div>
<div class="lecture-question text-center mt-12">Нужны ли здесь одинаковые порог<br>и основная метрика?</div>
<div v-click="2" class="lead text-center mt-10">Последствия ошибок и ограничения различаются —<br>требования к решению тоже будут разными.</div>

---
clicks: 2
---

<!-- S18 -->
<SectionChrome section="Порог как управляемое решение" />
# Те же вероятности — разные решения

<MathBlock :formula="`t=${[0.3,0.5,0.8][Math.min($clicks,2)]}`" class="text-[38px] mt-8" />
<div class="mt-12"><WeekFiveRankedList layout="scale" show-metrics include-accuracy :include-f1="false" :threshold="[0.3,0.5,0.8][Math.min($clicks,2)]" /></div>
<div class="lead text-center mt-10">Двигаем только порог. Модель не переобучаем.</div>

---
clicks: 2
---

<!-- S19 -->
<SectionChrome section="Порог как управляемое решение" />
# Порог меняет матрицу ошибок

<div class="grid grid-cols-3 gap-8 mt-12 text-center">
  <div><MathBlock formula="t=0.3" class="text-[30px] mb-8" /><WeekFiveConfusion compact :values="[2,5,0,5]" /></div>
  <div v-click="1"><MathBlock formula="t=0.5" class="text-[30px] mb-8" /><WeekFiveConfusion compact :values="[4,3,1,4]" /></div>
  <div v-click="2"><MathBlock formula="t=0.8" class="text-[30px] mb-8" /><WeekFiveConfusion compact :values="[6,1,3,2]" /></div>
</div>

---
clicks: 2
---

<!-- S20 -->
<SectionChrome section="Порог как управляемое решение" />
# Что происходит, когда порог повышается?

<div class="mt-4"><WeekFiveRankedList compact :threshold="[0.3,0.35,0.48][Math.min($clicks,2)]" :changed-rank="$clicks === 1 ? 10 : $clicks >= 2 ? 9 : -1" /></div>
<div class="grid grid-cols-[360px_1fr] gap-14 mt-4 items-center">
  <WeekFiveConfusion compact :values="[[2,5,0,5],[3,4,0,5],[3,4,1,4]][Math.min($clicks,2)]" />
  <div class="space-y-5">
    <MathBlock :formula="['t=0.30:\\quad P=5/10,\\ R=1','t=0.35:\\quad FP\\to TN,\\ P=5/9,\\ R=1','t=0.48:\\quad TP\\to FN,\\ P=4/8,\\ R=4/5'][Math.min($clicks,2)]" class="text-[28px]" />
    <div class="lead" v-if="$clicks === 0">Выбраны 10 объектов. Повышаем порог.</div>
    <div class="lead" v-else-if="$clicks === 1">Убрали отрицательный объект: Precision вырос, Recall не изменился.</div>
    <div class="lead" v-else>Убрали положительный объект: Recall и Precision снизились.</div>
    <div v-click="2" class="text-[23px]">Положительных прогнозов меньше; Recall не растёт.<br>Precision не монотонен; Accuracy может меняться в обе стороны.</div>
  </div>
</div>

---

<!-- S21 -->
<SectionChrome section="Порог как управляемое решение" />
# Каждый порог даёт свой набор метрик

<div class="mt-8"><img src="/assets/week-05/threshold-metrics.svg" class="figure h-[425px]" alt="Accuracy, Precision и Recall против растущего порога на тех же данных" /></div>
<div class="lead text-center mt-4">На конечной выборке метрики меняются ступенчато:<br>пока порог не пересёк наблюдаемый score, решение прежнее.</div>

---
clicks: 2
---

<!-- S22 -->
<SectionChrome section="Порог как управляемое решение" />
# F1 требует одновременно высоких Precision и Recall

<MathBlock formula="Precision=0.9,\qquad Recall=0.1" class="text-[36px] mt-12" />
<MathBlock v-click="1" formula="\frac{Precision+Recall}{2}=0.5" class="text-[34px] mt-10" />
<MathBlock v-click="2" formula="F_1=\frac{2\,Precision\cdot Recall}{Precision+Recall}=0.18" class="text-[36px] mt-10" />
<div v-click="2" class="lead text-center mt-8">Высокое значение одной метрики не компенсирует низкое значение другой.</div>

---

<!-- S23 -->
<SectionChrome section="Порог как управляемое решение" />
# Что означает F1

<MathBlock formula="0\le F_1\le1" class="text-[45px] mt-14" />
<div class="grid grid-cols-3 gap-14 mt-20 text-center lead"><div>1 — идеальное<br>решение</div><div>Больше — лучше</div><div>Precision и Recall<br>равноправны</div></div>
<div class="warning-line lead mt-16">F1 не знает стоимость ошибок вашей задачи.</div>

---
clicks: 2
---

<!-- S24 -->
<SectionChrome section="Порог как управляемое решение" />
# Fβ меняет приоритет в той же паре метрик

<MathBlock formula="F_\beta=\frac{(1+\beta^2)\,Precision\cdot Recall}{\beta^2Precision+Recall}" class="text-[33px] mt-6" />
<MathBlock formula="Precision=0.9,\qquad Recall=0.1" class="text-[30px] mt-8" />
<div class="grid grid-cols-3 gap-12 mt-10 text-center">
  <div><MathBlock formula="F_{0.5}\approx0.346" class="text-[30px]" /><div v-click="1" class="text-[25px] mt-6">При <MathBlock formula="\beta<1" :display="false" class="inline-block" /><br>важнее Precision.</div></div>
  <div><MathBlock formula="F_1=0.18" class="text-[30px]" /><div v-click="1" class="text-[25px] mt-6">При <MathBlock formula="\beta=1" :display="false" class="inline-block" /><br>равные приоритеты.</div></div>
  <div><MathBlock formula="F_2\approx0.122" class="text-[30px]" /><div v-click="1" class="text-[25px] mt-6">При <MathBlock formula="\beta>1" :display="false" class="inline-block" /><br>важнее Recall.</div></div>
</div>
<div v-click="2" class="lead text-center mt-10">Меняя <MathBlock formula="\beta" :display="false" class="inline-block" />, по-разному объединяем те же Precision и Recall.</div>
<div v-click="2" class="text-[24px] mt-8">Приоритет в Fβ не задаёт стоимость FP/FN: <MathBlock formula="\beta=2" :display="false" class="inline-block" /> не означает, что пропуск вдвое дороже.</div>

---
clicks: 2
---

<!-- S25 -->
<SectionChrome section="Порог как управляемое решение" />
# Сравним стоимость двух действий для объекта

<div class="text-[25px] mt-8">Фиксируем один объект с признаками x. Его оценённые вероятности:</div>
<MathBlock formula="p=\widehat P(Y=1\mid x),\qquad 1-p=\widehat P(Y=0\mid x)" class="text-[31px] mt-8" />
<div class="grid grid-cols-2 gap-16 mt-12 text-center">
  <div v-click="1"><div class="section-label">Действие a = 1</div><MathBlock formula="\mathbb E[C\mid a=1]=c_{FP}(1-p)" class="text-[31px] mt-10" /><div class="lead mt-8">Платим при ложной тревоге.</div></div>
  <div v-click="2"><div class="section-label">Действие a = 0</div><MathBlock formula="\mathbb E[C\mid a=0]=c_{FN}p" class="text-[31px] mt-10" /><div class="lead mt-8">Платим при пропуске.</div></div>
</div>
<div v-click="2" class="lead text-center mt-12">Сравниваем ожидаемые стоимости двух действий<br>для этого объекта.</div>

---
clicks: 7
---

<!-- S26 -->
<SectionChrome section="Порог как управляемое решение" />
# Сначала правило решения — затем порог

<div class="text-[26px] mt-4">Два действия: класс 1 или класс 0. Выбираем меньшую ожидаемую стоимость.</div>
<div v-click="1" class="grid grid-cols-2 gap-14 mt-3">
  <MathBlock formula="\mathbb E[C\mid x,a=1]=c_{FP}(1-p)" class="text-[29px]" />
  <MathBlock formula="\mathbb E[C\mid x,a=0]=c_{FN}p" class="text-[29px]" />
</div>
<div v-click="2" class="text-[25px] mt-3">Когда выбираем класс 1?</div>
<MathBlock v-click="3" formula="\hat y=1\quad\Longleftrightarrow\quad\mathbb E[C\mid x,a=1]\le\mathbb E[C\mid x,a=0]" class="text-[30px] mt-4" />
<div class="grid grid-cols-2 gap-14 mt-4 items-center">
  <div>
    <MathBlock v-click="4" formula="c_{FP}(1-p)\le c_{FN}p" class="text-[32px]" />
    <MathBlock v-click="5" formula="\Longleftrightarrow\quad p\ge\frac{c_{FP}}{c_{FP}+c_{FN}}" class="text-[32px] mt-4" />
  </div>
  <div v-click="6">
    <MathBlock formula="\hat y=1\quad\Longleftrightarrow\quad p\ge t" class="text-[30px]" />
    <MathBlock formula="\boxed{t^*=\frac{c_{FP}}{c_{FP}+c_{FN}}}" class="text-[35px] mt-4" />
  </div>
</div>
<div v-click="7" class="grid grid-cols-2 gap-14 mt-4">
  <MathBlock formula="c_{FP}=c_{FN}\Rightarrow t^*=0.5" class="text-[29px]" />
  <MathBlock formula="c_{FN}=9c_{FP}\Rightarrow t^*=0.1" class="text-[29px]" />
</div>
<div v-click="7" class="text-[24px] mt-4">Нужны содержательные вероятности и постоянные стоимости, складывающиеся по объектам.</div>

---

<!-- S27 -->
<SectionChrome section="Порог как управляемое решение" />
# Решение при пороге: итог

<MathBlock formula="score\,/\,\hat p\ \longrightarrow\ t\ \longrightarrow\ \hat y\ \longrightarrow\ \text{матрица ошибок}\ \longrightarrow\ \text{метрики}" class="text-[29px] mt-14" />
<div class="lead mt-14 text-center">Порог можно выбрать по метрике,<br>ограничению или модели стоимости.</div>
<div class="text-[25px] mt-10 text-center">Порог выбираем на валидационных данных;<br>тест оставляем для финальной оценки.</div>
<div class="lecture-question mt-14 text-center">А если пока не выбирать один порог?</div>

---
clicks: 1
---

<!-- S28 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# А если не фиксировать один порог?

<div class="mt-16"><WeekFiveRankedList :step="$clicks === 0 ? 3 : 9" /></div>
<div class="lecture-question mt-16 text-center">Насколько хорошо модель<br>упорядочивает объекты?</div>

---
clicks: 1
---

<!-- S29 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Знакомые доли: TPR и FPR

<div class="grid grid-cols-2 gap-14 mt-12">
  <div><MathBlock formula="\boxed{TPR=Recall=\frac{TP}{TP+FN}}" class="text-[31px]" /><div class="lead mt-10">Какую долю положительных нашли?</div><MathBlock formula="TPR=\frac{TP}{N_+},\quad N_+=5" class="text-[31px] mt-10" /></div>
  <div v-click="1"><MathBlock formula="\boxed{FPR=\frac{FP}{FP+TN}=1-Specificity}" class="text-[28px]" /><div class="lead mt-10">Какую долю отрицательных ошибочно выбрали?</div><MathBlock formula="FPR=\frac{FP}{N_-},\quad N_-=7" class="text-[31px] mt-10" /></div>
</div>

---
clicks: 1
---

<!-- S30 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Снижаем порог: наблюдаем TPR и FPR

<div class="mt-10"><img :src="`./assets/week-05/tpr-fpr-${String(Math.min($clicks,1)).padStart(2,'0')}.svg`" class="figure h-[470px]" alt="TPR и FPR при снижении порога" /></div>

---
clicks: 1
---

<!-- S31 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Убираем порог с оси — получаем ROC

<div class="grid grid-cols-[1fr_560px] gap-12 mt-8 items-center"><div><MathBlock formula="t\longmapsto(FPR(t),TPR(t))" class="text-[29px]" /><div class="lead mt-12">Каждый порог —<br>точка в этих координатах.</div></div><img v-click="1" src="/assets/week-05/roc-step-00.svg" class="figure h-[460px]" alt="Оси FPR и TPR перед построением ROC" /></div>

---
clicks: 12
---

<!-- S32 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Строим ROC по одному объекту

<div class="text-[24px] mb-4">Каждому порогу соответствует точка (FPR, TPR). Меняем порог — получаем ROC-кривую.</div>
<WeekFiveCurveStory mode="roc" compact :step="$clicks" />
<div class="text-[23px] mt-4">Одинаковые score пересекают порог вместе: обе координаты могут измениться сразу.</div>


---
clicks: 3
---

<!-- S33 -->
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

<!-- S34 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Как прочитать одну ROC-точку?

<div class="grid grid-cols-[650px_1fr] gap-10 items-center">
  <img src="/assets/week-05/roc-one-point.svg" class="figure h-[445px]" alt="ROC-точка FPR = 1/7, TPR = 3/5: отобраны первые четыре объекта" />
  <div>
    <MathBlock formula="(FPR,TPR)=\left(\frac17,\frac35\right)" class="text-[30px]" />
    <MathBlock formula="\approx(0.14,0.60)" class="text-[32px] mt-8" />
    <div class="lead mt-10">Нашли 60%<br>положительных объектов.</div>
    <div class="lead mt-8">Ошибочно выбрали около 14%<br>отрицательных объектов.</div>
  </div>
</div>

---

<!-- S35 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Та же механика — больше значений score

<div class="grid grid-cols-[690px_1fr] gap-10 mt-6 items-center">
  <img src="/assets/week-05/roc-typical.svg" class="figure h-[470px]" alt="ROC на 2000 объектах: много маленьких шагов" />
  <div class="space-y-10 lead"><div>Отдельный пример:<br>2000 объектов,<br>100 положительных.</div><div>Много небольших шагов выглядят почти как гладкая кривая.</div><div>Каждая точка по-прежнему соответствует порогу.</div></div>
</div>

---
clicks: 3
---

<!-- S36 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# ROC: ограничение задаётся процессом проверки

<div class="grid grid-cols-[650px_1fr] gap-10 items-center">
  <img :src="$clicks === 0 || $clicks === 2 ? './assets/week-05/roc-typical.svg' : $clicks === 1 ? './assets/week-05/roc-operating-00.svg' : './assets/week-05/roc-operating-01.svg'" class="figure h-[460px]" alt="Сначала требования к проверке, затем допустимая область и рабочая точка ROC" />
  <div class="lead">
    <div v-if="$clicks <= 1">Подозрительные платежи направляем на ручную проверку.<br><br>Ошибочно отправить можно не более 2% обычных платежей.<br><br>Какую максимальную долю мошенничества найдём?</div>
    <div v-else>Хотим найти не менее 90% мошенничества.<br><br>Какой минимальный FPR возможен?</div>
    <MathBlock v-if="$clicks === 1" formula="FPR\le0.02" class="text-[32px] mt-8" />
    <MathBlock v-if="$clicks >= 3" formula="TPR\ge0.9" class="text-[32px] mt-8" />
  </div>
</div>

---
clicks: 1
---

<!-- S37 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# ROC-AUC: площадь под ROC-кривой

<div class="grid grid-cols-[650px_1fr] gap-12 items-center">
  <img src="/assets/week-05/roc-auc-intro.svg" class="figure h-[460px]" alt="Заштрихованная площадь под ROC-кривой учебного набора" />
  <div><div class="section-label">AUC</div><div class="lead mt-6">Area Under the ROC Curve —<br>площадь под ROC-кривой.</div><div v-click="1" class="lead mt-14">Есть и другой полезный смысл:<br>через пары положительных<br>и отрицательных объектов.</div></div>
</div>

---
clicks: 1
---

<!-- S38 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Возьмём одну положительно-отрицательную пару

<div class="grid grid-cols-2 gap-20 mt-10 text-center"><div><div class="text-[50px] text-orange-600">▲ 1</div><div class="lead mt-8">Положительный объект</div></div><div><div class="text-[50px] text-blue-600">■ 0</div><div class="lead mt-8">Отрицательный объект</div></div></div>
<div class="lecture-question text-center mt-8">Выбираем по одному объекту каждого класса<br>равномерно случайно.<br>Окажется ли score положительного выше?</div>
<MathBlock v-click="1" formula="5\cdot7=35\text{ пар}" class="text-[36px] mt-10" />

---
clicks: 3
---

<!-- S39 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Считаем правильно упорядоченные пары

<div class="mt-2"><WeekFiveRankedList ribbon :show-legend="false" /></div>
<div class="grid grid-cols-[650px_minmax(0,1fr)] gap-14 items-start mt-4">
  <div v-click="1" class="text-[27px] [&_td]:!py-2 [&_th]:!py-2">

| Положительный score | Отрицательных ниже |
|---:|---:|
| 0.95 | 7 |
| 0.82 | 6 |
| 0.75 | 6 |
| 0.55 | 4 |
| 0.35 | 3 |
| **Итого** | **26** |

  </div>
  <div>
    <MathBlock formula="5\cdot7=35\text{ пар}" class="text-[33px]" />
    <div v-click="1" class="lead mt-8">26 из 35 положительно-отрицательных пар упорядочены правильно.</div>
    <MathBlock v-if="$clicks === 2" formula="\frac{26}{35}\approx0.743" class="text-[35px] mt-8" />
    <div v-if="$clicks >= 3" class="mt-8"><div class="text-[25px]">Это число и есть ROC-AUC:</div><MathBlock formula="\boxed{ROC\text{-}AUC=\frac{26}{35}\approx0.743}" class="text-[31px] mt-4" /></div>
  </div>
</div>

---
clicks: 1
---

<!-- S40 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# ROC-AUC: общая попарная формула

<div class="lead mt-10">В учебном примере посчитали правильные пары.<br>Запишем тот же подсчёт для произвольной выборки без равных оценок.</div>
<MathBlock v-click="1" formula="\boxed{\operatorname{ROC\!\text{-}\!AUC}=\frac{1}{N_+N_-}\sum_{i:y_i=1}\sum_{j:y_j=0}\mathbb 1(s_i>s_j)}" class="text-[36px] mt-14" />
<div v-click="1" class="space-y-7 text-[27px] mt-14">
  <div><MathBlock formula="s_i" :display="false" class="inline-block" /> — числовая оценка модели для объекта.</div>
  <div><MathBlock formula="N_+N_-" :display="false" class="inline-block" /> — число положительно-отрицательных пар.</div>
  <div>Индикатор равен 1, если оценка положительного объекта выше.</div>
</div>

---
clicks: 2
---

<!-- S41 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Если оценки совпали

<div class="lead mt-10">Положительный и отрицательный объекты получили одинаковый score.<br>Модель не определяет их взаимный порядок.</div>
<div v-click="1" class="lead mt-10">При случайном разрешении такой ничьей<br>правильный порядок возник бы в половине случаев.</div>
<MathBlock v-click="2" formula="\boxed{\operatorname{ROC\!\text{-}\!AUC}=\frac{1}{N_+N_-}\sum_{i:y_i=1}\sum_{j:y_j=0}\left[\mathbb 1(s_i>s_j)+\frac12\mathbb 1(s_i=s_j)\right]}" class="text-[34px] mt-14" />

---

<!-- S42 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Как понимать AUC ≈ 0.743?

<MathBlock formula="AUC=\frac{26}{35}\approx0.743" class="text-[44px] mt-12" />
<div class="lead mt-10">Случайно выбираем один положительный и один отрицательный объект.<br>Положительный получит более высокий score примерно в 74.3% пар.</div>
<div class="text-[25px] mt-8">При равных score пара вносит половину победы.</div>
<div class="grid grid-cols-2 gap-16 mt-10 text-[28px]"><div>Это не Accuracy = 74.3%.</div><div>Это не «вероятности<br>верны на 74.3%».</div></div>
<div class="lecture-question mt-6">AUC сначала назвали площадью, затем посчитали через пары.<br>Почему два способа дают одно и то же число?</div>

---
clicks: 4
---

<!-- S43 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Один отрицательный объект — один прямоугольник под ROC

<div class="mt-2"><WeekFiveRankedList ribbon numbered-ribbon :show-legend="false" :changed-rank="5" :positive-before-rank="$clicks >= 1 ? 5 : 0" /></div>
<div class="grid grid-cols-[580px_minmax(0,1fr)] gap-10 mt-4 items-start">
  <WeekFiveRocAreaStory mode="single" :step="$clicks" :height="360" />
  <div>
    <div class="text-[26px]">Один новый FP: объект №5 (0.68, класс 0).</div>
    <div v-click="1" class="text-[26px] mt-4">Выше — №1, №3 и №4: уже найдены 3 TP.</div>
    <div v-click="2" class="grid grid-cols-2 gap-8 mt-4 text-center">
      <div><div class="text-[25px]">Ширина: шаг FPR</div><MathBlock formula="\frac1{N_-}=\frac17" class="text-[30px] mt-2" /></div>
      <div><div class="text-[25px]">Высота: TPR</div><MathBlock formula="\frac3{N_+}=\frac35" class="text-[30px] mt-2" /></div>
    </div>
    <MathBlock v-click="3" formula="\text{площадь}=\frac17\cdot\frac35=\frac3{35}" class="text-[30px] mt-4" />
  </div>
</div>
<div v-click="4" class="text-[26px] mt-2">Это вклад трёх правильно упорядоченных пар с объектом №5.</div>

---
clicks: 5
---

<!-- S44 -->
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

<!-- S45 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Крайние значения ROC-AUC

<div class="grid grid-cols-3 gap-14 mt-20 text-center"><div><MathBlock formula="AUC=1" class="text-[38px]" /><div class="lead mt-10">Идеальный порядок</div></div><div><MathBlock formula="AUC=0.5" class="text-[38px]" /><div class="lead mt-10">Случайный порядок</div></div><div><MathBlock formula="AUC<0.5" class="text-[38px]" /><div class="lead mt-10">Ошибочно упорядоченных<br>пар больше</div></div></div>
<div class="lead text-center mt-16">AUC описывает качество ранжирования.</div>

---

<!-- S46 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Score и sigmoid дают одинаковый порядок

<MathBlock formula="z_i>z_j\ \Longleftrightarrow\ \sigma(z_i)>\sigma(z_j)" class="text-[35px] mt-8" />
<div class="mt-4"><WeekFiveRankedList compact :show-legend="false" value-mode="score" /></div>
<div class="mt-4"><WeekFiveRankedList compact /></div>
<div class="lead text-center mt-4">Строго возрастающее преобразование не меняет ранжирование.</div>

---
clicks: 1
---

<!-- S47 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Что нам дала ROC — и чего она не показывает

<div class="grid grid-cols-2 gap-16 mt-14">
  <div><div class="section-label">ROC</div><MathBlock formula="t\longmapsto(FPR,TPR)" class="text-[36px] mt-10" /><div class="lead mt-10">Все рабочие режимы<br>при изменении порога.</div></div>
  <div><div class="section-label">ROC-AUC</div><MathBlock formula="26/35\approx0.743" class="text-[38px] mt-10" /><div class="lead mt-10">Качество ранжирования<br>в одном числе.</div></div>
</div>
<div v-click="1" class="lecture-question mt-20 text-center">Насколько «чистой» окажется группа объектов,<br>которым модель дала положительный прогноз?</div>

---
clicks: 1
---

<!-- S48 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Та же ROC-точка — разная чистота выбранной группы

<MathBlock formula="N=10000,\quad TPR=0.8,\quad FPR=0.05" class="text-[32px] mt-10" />
<div class="grid grid-cols-2 gap-16 mt-12 text-center"><div><div class="section-label">Положительных 20%</div><MathBlock formula="TP=1600,\quad FP=400" class="text-[29px] mt-10" /><MathBlock formula="Precision=\frac{1600}{2000}=80\%" class="text-[32px] mt-10" /></div><div v-click="1"><div class="section-label">Положительных 1%</div><MathBlock formula="TP=80,\quad FP=495" class="text-[29px] mt-10" /><MathBlock formula="Precision=\frac{80}{575}\approx14\%" class="text-[32px] mt-10" /></div></div>
<div v-click="1" class="lead text-center mt-12">Precision зависит от распространённости положительного класса.</div>

---
clicks: 3
---

<!-- S49 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Почему доля класса меняет Precision

<div class="grid grid-cols-2 gap-14 mt-4">
  <MathBlock formula="TPR=\frac{TP}{TP+FN}=\frac{TP}{N_+}" class="text-[32px]" />
  <MathBlock formula="FPR=\frac{FP}{FP+TN}=\frac{FP}{N_-}" class="text-[32px]" />
</div>
<MathBlock v-click="1" formula="\pi=\frac{N_+}{N}\quad\Rightarrow\quad N_+=\pi N,\quad N_-=(1-\pi)N" class="text-[32px] mt-6" />
<div v-click="2" class="grid grid-cols-2 gap-14 mt-6">
  <MathBlock formula="TP=TPR\cdot N_+=\pi N\cdot TPR" class="text-[29px]" />
  <MathBlock formula="FP=FPR\cdot N_-=(1-\pi)N\cdot FPR" class="text-[29px]" />
</div>
<MathBlock v-click="3" formula="Precision=\frac{TP}{TP+FP}=\frac{\pi\,TPR}{\pi\,TPR+(1-\pi)FPR}" class="text-[37px] mt-6" />
<div v-click="3" class="text-[26px] mt-4 space-y-1">
  <div>TPR: знаменатель — все настоящие положительные, <MathBlock formula="TP+FN" :display="false" class="inline-block" />.</div>
  <div>FPR: знаменатель — все настоящие отрицательные, <MathBlock formula="FP+TN" :display="false" class="inline-block" />.</div>
  <div>Precision: знаменатель — все прогнозы класса 1, <MathBlock formula="TP+FP" :display="false" class="inline-block" />.</div>
</div>

---
clicks: 2
---

<!-- S50 -->
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

<!-- S51 -->
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

<!-- S52 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# PR на большой выборке: много маленьких ступеней

<div class="grid grid-cols-[650px_1fr] gap-10 items-center">
  <img src="/assets/week-05/pr-typical.svg" class="figure h-[465px]" alt="Ступенчатая PR на 2000 объектах с горизонтальным ориентиром 5%" />
  <div><div class="lead">Те же 2000 объектов,<br>100 положительных.</div><div class="lead mt-8">При большом числе объектов<br>ступени очень мелкие.</div><MathBlock formula="Precision_{\text{random}}\approx\pi=0.05" class="text-[29px] mt-10" /><div class="text-[25px] mt-8">При случайном порядке ожидаемая Precision примерно равна доле класса 1.</div></div>
</div>

---
clicks: 3
---

<!-- S53 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# PR: требования к очереди ручной проверки

<div class="grid grid-cols-[650px_1fr] gap-12 items-center">
  <img :src="$clicks === 0 || $clicks === 2 ? './assets/week-05/pr-step-12.svg' : $clicks === 1 ? './assets/week-05/pr-operating-00.svg' : './assets/week-05/pr-operating-01.svg'" class="figure h-[460px]" alt="PR: сначала требования, затем допустимая область и лучшая эмпирическая точка" />
  <div class="lead">
    <div v-if="$clicks <= 1">Хотим, чтобы хотя бы 40% проверяемых платежей были мошенническими.<br><br>Какой максимальный Recall возможен?</div>
    <div v-else>Хотим поймать хотя бы 80% мошенничества.<br><br>Какой максимальный Precision возможен?</div>
    <MathBlock v-if="$clicks === 1" formula="Precision\ge0.4" class="text-[32px] mt-8" />
    <MathBlock v-if="$clicks >= 3" formula="Recall\ge0.8" class="text-[32px] mt-8" />
  </div>
</div>

---
clicks: 5
---

<!-- S54 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Как свести PR-ранжирование к одному числу?

<div class="text-[25px] mt-2">При снижении порога Recall растёт только при нахождении положительного объекта.<br>Посмотрим на Precision именно в эти моменты.</div>
<div class="mt-6"><WeekFiveRankedList compact highlight-positive /></div>
<div class="grid grid-cols-5 gap-6 mt-4 text-center">
  <div v-click="1"><MathBlock formula="Precision@1" class="text-[25px]" /><MathBlock formula="=1" class="text-[32px] mt-4" /></div>
  <div v-click="2"><MathBlock formula="Precision@3" class="text-[25px]" /><MathBlock formula="=\frac23" class="text-[32px] mt-4" /></div>
  <div v-click="3"><MathBlock formula="Precision@4" class="text-[25px]" /><MathBlock formula="=\frac34" class="text-[32px] mt-4" /></div>
  <div v-click="4"><MathBlock formula="Precision@7" class="text-[25px]" /><MathBlock formula="=\frac47" class="text-[32px] mt-4" /></div>
  <div v-click="5"><MathBlock formula="Precision@9" class="text-[25px]" /><MathBlock formula="=\frac59" class="text-[32px] mt-4" /></div>
</div>
<div v-click="5" class="text-[25px] mt-4">Считаем от начала списка до этой позиции включительно.<br>Отрицательный объект меняет Precision, но Recall при этом не растёт.</div>

---
clicks: 1
---

<!-- S55 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Average Precision: усредняем по найденным положительным

<MathBlock formula="AP=\frac15\left(1+\frac23+\frac34+\frac47+\frac59\right)\approx0.709" class="text-[40px] mt-12" />
<div v-click="1" class="lead mt-10">Когда в списке появляется очередной положительный объект,<br>смотрим Precision среди всех объектов от начала списка<br>до этой позиции включительно.</div>
<div v-click="1" class="lecture-question mt-8">Чем ближе положительные объекты к началу списка<br>и чем меньше отрицательных перед ними, тем выше AP.</div>
<div v-click="1" class="lead mt-6">Здесь средняя Precision на позициях 1, 3, 4, 7 и 9 равна 0.709.</div>

---
clicks: 2
---

<!-- S56 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Почему в общей формуле появляется прирост Recall

<div class="lead mt-6">Каждый найденный положительный увеличивает Recall на:</div>
<MathBlock formula="\Delta Recall=\frac1{N_+}=\frac15" class="text-[34px] mt-6" />
<MathBlock v-click="1" formula="AP=\frac15\cdot1+\frac15\cdot\frac23+\frac15\cdot\frac34+\frac15\cdot\frac47+\frac15\cdot\frac59" class="text-[33px] mt-8" />
<MathBlock v-click="2" formula="\boxed{AP=\sum_k\Delta Recall_k\cdot Precision_k}" class="text-[39px] mt-8" />
<div v-click="2" class="text-[26px] mt-4">Если Recall не изменился, <MathBlock formula="\Delta Recall=0" :display="false" class="inline-block" />:<br>такой шаг не добавляет отдельного веса в AP.</div>


---
clicks: 5
---

<!-- S57 -->
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
    <MathBlock v-click="5" formula="\boxed{AP=\sum_k\Delta Recall_k\cdot Precision_k}" class="text-[29px] mt-10" />
  </div>
</div>
<div v-click="5" class="text-[26px] mt-6">Площадь здесь — геометрическое изображение уже определённой AP,<br>а не новая формула: используем соответствующую ступенчатую конструкцию.</div>

---

<!-- S58 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# AP и площадь с линейной интерполяцией — не одно и то же

<div class="mt-8"><img src="/assets/week-05/pr-ap-interpolation.svg" class="figure h-[400px]" alt="AP как прямоугольники и площадь PR при линейной интерполяции" /></div>
<div class="lead text-center mt-4">AP — площадь ступенчатой конструкции;<br>трапеции соответствуют другой интерполяции между теми же точками.</div>
<div class="grid grid-cols-2 gap-12 text-center text-[22px] mt-3"><div>Average Precision · <code>average_precision_score</code></div><div>Площадь трапеций · <code>auc(recall, precision)</code></div></div>

---

<!-- S59 -->
<SectionChrome section="Ранжирование: ROC и PR" />
# Ранжирование: итог и следующий вопрос

<div class="grid grid-cols-2 gap-16 mt-12">
  <div><div class="section-label">ROC-AUC</div><div class="lead mt-8">Попарное качество порядка.</div><div class="lead mt-8">Не требует одного фиксированного порога.</div></div>
  <div><div class="section-label">PR / AP</div><div class="lead mt-8">Качество положительного отбора.</div><div class="lead mt-8">Зависит от доли положительного класса.</div></div>
</div>
<div class="lead mt-16">Обе группы показателей оценивают порядок и отбор,<br>но не говорят, можно ли доверять числу 0.8 как вероятности 80%.</div>
<div class="lecture-question mt-12">Следующий вопрос:<br>что означают сами численные вероятности?</div>

---

<!-- S60 -->
<SectionChrome section="Качество вероятностей" />
# Один порядок — две вероятностные шкалы

<div class="lead mt-6">Порядок групп одинаковый, вероятностные шкалы разные.</div>
<div class="mt-4"><WeekFiveCalibrationTable /></div>
<div class="text-[26px] mt-6">Модель A согласуется с наблюдаемыми частотами; модель B даёт более крайние значения.<br>ROC-AUC и AP одинаковы: ранжирование не изменилось.</div>

---
clicks: 1
---

<!-- S61 -->
<SectionChrome section="Качество вероятностей" />
# Согласуется ли вероятность с частотой?

<div class="lead mt-8">Рассмотрим группу, где событие наблюдалось примерно в 70% случаев.</div>
<MathBlock formula="\text{Наблюдаемая частота}=0.70" class="text-[34px] mt-8" />
<div class="grid grid-cols-2 gap-16 mt-10 text-center">
  <div><div class="section-label">Модель A</div><MathBlock formula="0.70" class="text-[42px] mt-6" /><div class="lead mt-6">Совпадает с наблюдаемой частотой.</div></div>
  <div><div class="section-label">Модель B</div><MathBlock formula="0.8448" class="text-[42px] mt-6" /><div class="lead mt-6">Вероятность события завышена.</div></div>
</div>
<div v-click="1" class="lead mt-10">Калибровка — согласование прогнозируемых вероятностей<br>с наблюдаемыми частотами среди объектов с похожими прогнозами.</div>

---
clicks: 2
---

<!-- S62 -->
<SectionChrome section="Качество вероятностей" />
# От групп данных к reliability diagram

<div class="grid grid-cols-[510px_1fr] gap-12 mt-8 items-center">
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

<!-- S63 -->
<SectionChrome section="Качество вероятностей" />
# Как читать reliability diagram

<div class="grid grid-cols-[650px_1fr] gap-12 items-center"><img src="/assets/week-05/calibration-reliability.svg" class="figure h-[445px]" alt="Модель A на диагонали калибровки; модель B даёт более крайние вероятности" /><div class="space-y-12 lead"><div>Модель A — на диагонали:<br>вероятность равна частоте.</div><div v-click="1">Модель B ниже диагонали:<br>вероятность завышена.</div><div v-click="2">Модель B выше диагонали:<br>вероятность занижена.</div></div></div>
<div class="text-[24px] text-center mt-4">Эмпирическая диагностика: форма зависит от размера выборки и группировки.</div>

---

<!-- S64 -->
<SectionChrome section="Качество вероятностей" />
# Хорошая калибровка: различает ли модель объекты?

<div class="lead mt-2">Положительный класс составляет 10% выборки.</div>
<div class="grid grid-cols-2 gap-16 mt-2">
  <div><div class="section-label">Модель 1 · постоянный прогноз</div><MathBlock formula="\hat p(x)=0.10" class="text-[38px] mt-6" /><div class="lead mt-6">Всем объектам выдаёт 0.10.<br>Около 10% положительных —<br>прогноз откалиброван.</div><div class="lead mt-6">Вероятности одинаковы:<br>модель не различает объекты.</div></div>
  <div><div class="section-label">Модель 2 · две группы</div><div class="lead mt-4">Половине объектов выдаёт 0.02;<br>в этой группе около 2% положительных.</div><div class="lead mt-4">Другой половине — 0.18;<br>там около 18% положительных.</div><MathBlock formula="\frac12\cdot0.02+\frac12\cdot0.18=0.10" class="text-[29px] mt-6" /></div>
</div>
<div class="text-[26px] mt-4">Обе модели откалиброваны, но вторая различает группы.<br>Калибровка показывает соответствие шкалы частотам; для сравнения<br>вероятностных прогнозов одним числом посмотрим на Log loss и Brier.</div>

---
clicks: 1
---

<!-- S65 -->
<SectionChrome section="Качество вероятностей" />
# Log loss: один объект и вся выборка

<div class="section-label mt-8">Loss одного наблюдения</div>
<MathBlock formula="L(y_i,\widehat p_i)=-y_i\log\widehat p_i-\left(1-y_i\right)\log(1-\widehat p_i)" class="text-[35px] mt-6" />
<div v-click="1" class="mt-12"><div class="section-label">Средняя log loss на оценочной выборке</div><MathBlock formula="\operatorname{LogLoss}=\frac1N\sum_{i=1}^N L(y_i,\hat p_i)" class="text-[38px] mt-6" /></div>
<div v-click="1" class="grid grid-cols-2 gap-14 lead mt-14"><div>На обучении это была эмпирическая целевая функция Rₙ.</div><div>На отложенных прогнозах то же выражение — метрика качества.</div></div>

---
clicks: 1
---

<!-- S66 -->
<SectionChrome section="Качество вероятностей" />
# Уверенная ошибка дорого стоит

<MathBlock formula="y=1" class="text-[38px] mt-12" />
<div class="grid grid-cols-2 gap-16 mt-12"><div><MathBlock formula="p=0.9\Rightarrow-\log p\approx0.105" class="text-[32px]" /></div><div v-click="1"><MathBlock formula="p=0.01\Rightarrow-\log p\approx4.605" class="text-[32px]" /></div></div>
<div v-click="1" class="lead mt-16">Меньше — лучше. Сравниваем модели на одной оценочной выборке:<br>между собой и с baseline — например, постоянным прогнозом базовой частоты.</div>

---
clicks: 1
---

<!-- S67 -->
<SectionChrome section="Качество вероятностей" />
# Brier score: MSE вероятностных прогнозов

<div class="grid grid-cols-2 gap-16 mt-8">
  <MathBlock formula="y=1,\ p=0.9\Rightarrow(1-0.9)^2=0.01" class="text-[29px]" />
  <MathBlock formula="y=1,\ p=0.2\Rightarrow(1-0.2)^2=0.64" class="text-[29px]" />
</div>
<MathBlock v-click="1" formula="\boxed{Brier=\frac1N\sum_{i=1}^N(y_i-\hat p_i)^2}" class="text-[41px] mt-12" />
<div v-click="1" class="text-[27px] mt-10">Меньше — лучше. Сравниваем модели на одной выборке и с baseline.</div>
<MathBlock v-click="1" formula="Y\in\{0,1\}\ \Longrightarrow\ \mathbb E[Y\mid X=x]=P(Y=1\mid X=x)" class="text-[29px] mt-12" />
<div v-click="1" class="text-[25px] mt-8">Поэтому квадратичная ошибка бинарного Y естественно нацелена на вероятность.</div>

---

<!-- S68 -->
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

<!-- S69 -->
<SectionChrome section="Три вида качества" />
# Один прогноз — три вопроса о качестве

<MathBlock formula="score\,/\,\hat p(x)" class="text-[44px] mt-6" />
<div class="grid grid-cols-3 gap-10 text-center mt-6">
  <div v-click="1"><MathBlock formula="\swarrow" class="text-[48px]" /><div class="section-label mt-6">Решение при пороге</div><div class="lead mt-10">Матрица ошибок<br>Precision / Recall / F1</div></div>
  <div v-click="2"><MathBlock formula="\downarrow" class="text-[48px]" /><div class="section-label mt-6">Ранжирование</div><div class="lead mt-10">ROC-AUC<br>PR / AP</div></div>
  <div v-click="3"><MathBlock formula="\searrow" class="text-[48px]" /><div class="section-label mt-6">Смысл вероятностей</div><div class="lead mt-10">Калибровка<br>Log loss / Brier</div></div>
</div>
<div v-click="3" class="lecture-question mt-16 text-center">Сначала формулируем задачу и действие.<br>Потом выбираем способ оценки.</div>

---

<!-- A01 -->
<SectionChrome section="Приложение · дополнительный вопрос" />
# От PR-точки к ROC-точке

<MathBlock formula="Precision=P,\quad Recall=R,\quad r=\frac{N_+}{N}" class="text-[36px] mt-16" />
<div class="lecture-question mt-16">Выразите TPR и FPR через P, R, r.<br>Кратко поясните, почему появляется r.</div>
