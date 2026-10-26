# ДЗ №2. NYC Taxi: классификация длительности поездки

[Студенческий notebook](hw-02.ipynb) содержит вводные материалы, условие и требования к работе. Можно решать задание в нём или создать собственный notebook.

## Данные и запуск

Скачайте с [Google Drive](https://drive.google.com/drive/folders/1-sgmzSl9-fSOJjd1Jbky6xOxeVpY5eaH?usp=sharing) три файла: `train.csv`, `test-public.csv` и `test-private.csv`. Если скачалась ZIP-папка, сначала распакуйте её. CSV не хранятся в этом репозитории.

**Локально:** скачайте notebook и откройте его в Jupyter Notebook / JupyterLab. Рядом с ним создайте папку `data` и положите в неё три CSV:

```text
hw-02.ipynb
data/
  train.csv
  test-public.csv
  test-private.csv
```

Нужны Python и библиотеки `numpy`, `pandas`, `matplotlib`, `seaborn`, `scikit-learn`. Выполняйте ячейки сверху вниз. Если файлы находятся в другой папке, укажите её путь в `DATA_DIR` в ячейке загрузки данных.

**Google Colab:** [откройте notebook](https://colab.research.google.com/github/YuZinyakoff/classic-ml-course/blob/main/bachelors/2026/homeworks/hw-02/hw-02.ipynb) и сохраните свою копию через «Файл → Сохранить копию на Диске». В левой панели «Файлы» создайте папку `data` внутри `/content` и загрузите в неё три CSV. После этого выполняйте ячейки по порядку: по умолчанию `DATA_DIR` указывает на эту папку. Загруженные в среду Colab файлы временные — после сброса среды их нужно загрузить снова.

## Сдача и сроки

Отправьте через [Google Forms](https://forms.gle/SXNJ9u8zvZKKZBsn9) два файла:

1. Выполненный Jupyter Notebook `.ipynb` с кодом, результатами, графиками и содержательными выводами.
2. `submission.csv` с предсказаниями для `test-private.csv` в формате из условия.

Для загрузки файлов в форму потребуется вход в аккаунт Google.

- **Мягкий дедлайн:** 09.11.2026, 23:59 МСК (UTC+3).
- **Жёсткий дедлайн:** 16.11.2026, 23:59 МСК (UTC+3).

До мягкого дедлайна работа считается сданной без просрочки. После мягкого, но до жёсткого дедлайна — с учётом действующих правил курса.

## Происхождение данных

Исторические записи поездок: [NYC Taxi and Limousine Commission](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page). Используемый снимок — конкурс [Kaggle NYC Taxi Trip Duration](https://www.kaggle.com/competitions/nyc-taxi-trip-duration). Подготовленные учебные CSV выдаются по ссылке Google Drive выше; оригинальные Kaggle-данные в GitHub не переносятся.
