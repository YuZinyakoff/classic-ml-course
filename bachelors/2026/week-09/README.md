# Неделя 9. Интерпретация и диагностика моделей

## Лекция

- [Интерактивная презентация](https://yuzinyakoff.github.io/classic-ml-course/bachelors/2026/week-09/slides/)
- [PDF-версия презентации](lecture/slides.pdf)
- [Подробный текст лекции](lecture/chapter.md)
- [Источники и лицензии](../../../ATTRIBUTIONS.md)

В лекции разбираются MDI, permutation importance, PDP, ICE и диагностика
ошибок. Подробное объяснение ALE сохранено в тексте для самостоятельного
изучения; дополнительные материалы указаны в конце лекции.

## Семинар

- [Студенческий notebook](seminar/seminar.ipynb)
- [Подготовленные данные Bike Sharing](seminar/data/bike_day_prepared.csv)
- [Зависимости](seminar/requirements.txt)
- [Происхождение и подготовка данных](seminar/DATA_SOURCE.md)

Для локальной работы скачайте всю папку `seminar`, сохранив её структуру:
рядом с `seminar.ipynb` должна находиться папка `data` с
`bike_day_prepared.csv`. Запускайте Jupyter из папки `seminar`.

```bash
python -m pip install -r requirements.txt
jupyter notebook seminar.ipynb
```

Diamonds загружается из установленного пакета `plotnine`; отдельный CSV
для него не нужен. Температура, влажность и ветер в подготовленном Bike
Sharing уже выражены в физических единицах.

В notebook сохранён учебный код, результаты выполнения очищены. В части
с бриллиантами предусмотрены четыре вопроса на интерпретацию и два небольших
изменения кода. Дополнительное сравнение с размерами камня — по желанию.
