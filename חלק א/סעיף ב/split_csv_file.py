import pandas as pd
import os
from avarage import calculate_hour_avarage
from validate_check import validate_check_on_data


def split_file(df:str, original_ext:str):
    df["timestamp"] = pd.to_datetime(df["timestamp"], dayfirst=True)

    invalid_rows = df["timestamp"].isna().sum()
    if invalid_rows > 0:
        print(f"Warning: {invalid_rows} rows with invalid timestamp will be dropped.")
        df = df.dropna(subset=["timestamp"])

    df["date"] = df["timestamp"].dt.date
    hourly_files = []
    #foreach day creat a file
    for day, group in df.groupby("date"):
        day_filename = f"day_{day}{original_ext}"
        group = group.drop(columns=["date"])

        if original_ext == ".csv":
            group.to_csv(day_filename, index=False)
        elif original_ext == ".parquet":
            group.to_parquet(day_filename, index=False)
        else:
            raise ValueError("Unsupported file type")

        try:
            validate_check_on_data(day_filename, group, original_ext)
        except ValueError as e:
            print(f"Validation failed for {day_filename}: {e}")
            continue
        calculate_hour_avarage(day_filename,group,original_ext)
        hourly_files.append((str(day), day_filename, group))

    return hourly_files
