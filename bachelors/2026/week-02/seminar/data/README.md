# Auto MPG — данные для семинара Week 2

Источник: R. Quinlan (1993), **Auto MPG**, UCI Machine Learning Repository.  
Canonical page: https://archive.ics.uci.edu/dataset/9/auto+mpg  
DOI: https://doi.org/10.24432/C5859H  
Лицензия UCI: **CC BY 4.0**.

В `auto_mpg.csv` сохранены 398 наблюдений и исходные содержательные поля UCI:
`mpg`, `cylinders`, `displacement`, `horsepower`, `weight`, `acceleration`,
`model_year`, `origin`, `car_name`.

Подготовка файла до семинара ограничена техническим преобразованием legacy-
формата UCI в обычный CSV с заголовками. Содержательная очистка не выполнена:
шесть пропусков `horsepower` сохранены, `origin` и `car_name` сохранены.
Их обработка явно показана в notebook.

Для публикации сохраняйте эту атрибуцию рядом с dataset.
