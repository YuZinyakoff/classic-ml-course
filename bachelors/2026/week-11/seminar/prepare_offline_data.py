"""Подготовить кэш sklearn из локального официального архива California Housing.

Запуск (в том же окружении, что и Jupyter):
    python prepare_offline_data.py /path/to/cal_housing.tgz

Для обычного запуска этот скрипт не нужен: fetch_california_housing скачивает
данные автоматически. Здесь используем внутренний формат кэша sklearn 1.x;
он может меняться в будущих версиях. Архив и кэш не включены в комплект.
"""
import argparse
import hashlib
import tarfile
from pathlib import Path

import joblib
import numpy as np
from sklearn.datasets import fetch_california_housing, get_data_home
from sklearn.datasets._base import _pkl_filepath

EXPECTED_SHA256 = "aaa5c9a6afe2225cc2aed2723682ae403280c4a3695a2ddda4ffb5d8215ea681"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("archive", type=Path)
    args = parser.parse_args()
    if hashlib.sha256(args.archive.read_bytes()).hexdigest() != EXPECTED_SHA256:
        raise ValueError("Контрольная сумма архива отличается от официального файла sklearn")
    data_home = get_data_home()
    cache_file = Path(_pkl_filepath(data_home, "cal_housing.pkz"))
    if not cache_file.exists():
        with tarfile.open(args.archive, "r:gz") as archive:
            with archive.extractfile("CaliforniaHousing/cal_housing.data") as file:
                raw = np.loadtxt(file, delimiter=",")
        # Порядок столбцов, ожидаемый загрузчиком sklearn (до нормировки).
        reordered = raw[:, [8, 7, 2, 3, 4, 5, 6, 1, 0]]
        joblib.dump(reordered, cache_file, compress=6)
    data = fetch_california_housing(as_frame=True, download_if_missing=False)
    if data.frame.shape != (20640, 9):
        raise ValueError("Неожиданный размер данных в кэше sklearn")
    print("Данные готовы:", data.frame.shape)
    print("Кэш:", cache_file)


if __name__ == "__main__":
    main()
