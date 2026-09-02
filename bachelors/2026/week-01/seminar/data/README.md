# Данные семинара Week 1

## Назначение

`bank-week01.csv` — локальный offline snapshot для семинара Week 1. Он нужен
только для первого протокола предсказательного эксперимента: schema audit,
фиксированного train/test split, majority-бейзлайна и одного простого
предметного правила, выбранного по train до проверки на test. Набор не используется для обучения новой содержательной
модели.

## Provenance и attribution

- **Dataset:** Bank Marketing.
- **Авторы dataset:** S. Moro, P. Rita, P. Cortez.
- **Источник:** UCI Machine Learning Repository.
- **Canonical page:** <https://archive.ics.uci.edu/dataset/222/bank+marketing>.
- **DOI:** <https://doi.org/10.24432/C5K306>.
- **License:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- **Получено:** 2026-08-13 из официального archive
  `https://archive.ics.uci.edu/static/public/222/bank+marketing.zip`, затем из
  вложенного `bank.zip` извлечён exact file `bank.csv`.
- **Ссылка на исходную публикацию из archive:** Moro S., Laureano R., Cortez P.
  *Using Data Mining for Bank Direct Marketing: An Application of the CRISP-DM
  Methodology*. ESM'2011, pp. 117–121.

Attribution for future publication: “Bank Marketing dataset by S. Moro,
P. Rita, and P. Cortez, UCI Machine Learning Repository, CC BY 4.0,
https://doi.org/10.24432/C5K306. Adapted for Week 1 by retaining an approved
subset of columns without changing rows or values.”

## Derived teaching snapshot

`bank-week01.csv` contains all 4,521 rows in their original order, with these
11 unrenamed columns and unmodified values:

```text
age, job, education, balance, housing, loan, pdays, previous, poutcome,
duration, y
```

No rows were sampled, reordered or imputed. No categories were encoded.
`duration` is deliberately retained as a post-event/leakage candidate but is
forbidden from the approved `X_allowed` set.

- SHA-256: `DD03CF2F76D75599BC6ADE5D6D46FA41FB8B843A5742EEC8B17BC55F496EC2E3`

The notebook runtime dependencies are pinned in `../requirements.txt`. They do
not include a download step: after the standard local environment setup, the
notebook reads only this local snapshot.

## Dictionary for this exact file

| Column | Meaning in `bank.csv` |
|---|---|
| `age` | client age, numeric |
| `job` | job type; `unknown` is an original category |
| `education` | education: `unknown`, `secondary`, `primary` or `tertiary` |
| `balance` | average yearly balance in euros |
| `housing` | has housing loan: `yes` / `no` |
| `loan` | has personal loan: `yes` / `no` |
| `pdays` | days since client was last contacted in a previous campaign; `-1` means no prior contact |
| `previous` | number of contacts before the current campaign |
| `poutcome` | outcome of the previous campaign: `unknown`, `other`, `failure`, `success` |
| `duration` | duration of the last/current contact in seconds |
| `y` | subscribed to a term deposit: `yes` / `no` |

Для семинара момент прогноза — непосредственно перед текущим звонком.
Документация набора не задаёт точный календарный горизонт target; это остаётся
ограничением упражнения.

## Synthetic churn demo

`demo-churn.csv` — небольшой синтетический набор, созданный авторами курса
специально для первых 25–30 минут семинара. В нём 16 снимков аккаунтов сервиса
с ежемесячной подпиской. Строка соответствует аккаунту в момент прогноза,
`churn_30d` показывает отмену подписки в следующие 30 дней как `0` (нет) или
`1` (да).

Файл детерминированный и не имеет внешнего источника. Он нужен только для
короткого совместного разбора: как прочитать таблицу, разделить данные и увидеть
состояние простого estimator. `active_days_14d` описывает активность за 14 дней
до `t0`, а `active_days_next_7d` — активность в первые 7 дней после `t0`.
Второй столбец оставлен только как пример будущей информации: он связан с
событием не идеально и не служит скрытой копией target.

- SHA-256: `B416CBDD473609DE7F9E325D8EA26B98B072C2B3DF0702C525A5AECC71CF9E71`

| Column | Meaning |
|---|---|
| `account_id` | синтетический идентификатор аккаунта |
| `tenure_months` | сколько месяцев длится подписка |
| `active_days_14d` | число активных дней за последние 14 дней |
| `active_days_next_7d` | число активных дней в первые 7 дней после `t0`; будущая информация |
| `late_payments_90d` | число просроченных платежей за последние 90 дней |
| `churn_30d` | отменил ли аккаунт подписку в следующие 30 дней: `0` / `1` |
