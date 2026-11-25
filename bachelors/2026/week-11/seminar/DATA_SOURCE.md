# California Housing: источник и загрузка

Источник: [StatLib](https://lib.stat.cmu.edu/datasets/houses.zip), R. Kelley Pace, Ronald Barry (1997), *Sparse Spatial Autoregressions*, Statistics & Probability Letters 33, 291–297. Данные переписи США 1990 г., 20 640 групп переписных блоков Калифорнии. Определение территориальной единицы: [U.S. Census Bureau](https://www.census.gov/glossary/?term=Block+Group+%28BG%29).

Обычный запуск: `fetch_california_housing(as_frame=True)` скачивает архив при отсутствии данных в кэше и возвращает `Bunch`, где `.frame` — таблица из 8 признаков и целевого столбца. [Документация sklearn](https://scikit-learn.org/stable/modules/generated/sklearn.datasets.fetch_california_housing.html).

## Если сеть недоступна

Заранее выполните обычную загрузку в том же окружении. Если источник недоступен, но имеется официальный архив [cal_housing.tgz](https://ndownloader.figshare.com/files/5976036), запустите [скрипт подготовки кэша](prepare_offline_data.py) из терминала:

```bash
python prepare_offline_data.py /path/to/cal_housing.tgz
```

Скрипт проверяет SHA-256, подготавливает локальный кэш (формат sklearn 1.x, проверен с 1.8.0 и 1.9.0) и проверяет загрузку через публичный API без сети. Скрипт использует внутреннюю функцию для имени файла кэша, поэтому в будущих версиях sklearn может потребоваться обновление. При наличии кэша не перезаписывает его. Для обычного семинара скрипт не нужен.

SHA-256 архива: `aaa5c9a6afe2225cc2aed2723682ae403280c4a3695a2ddda4ffb5d8215ea681`. [Реализация загрузчика sklearn](https://github.com/scikit-learn/scikit-learn/blob/main/sklearn/datasets/_california_housing.py).

Лицензия на самостоятельную перепубликацию исходной таблицы не установлена; архив и кэш не включены в комплект, а загрузка осуществляется пользователем из официального источника.

Протокол: 20% test (seed 42), 25% от оставшихся 80% — validation (seed 43). 12 384 train / 4 128 validation / 4 128 test. Test не используется в ноутбуке. Эти данные и разбиения использовались при выборе учебного набора, поэтому результаты — учебная демонстрация, а не независимое подтверждение превосходства алгоритмов.
