import pandas as pd
import os
from avarage import calculate_hour_avarage
from validate_check import validate_check_on_data


def split_file(df, original_ext):
    df["timestamp"] = pd.to_datetime(df["timestamp"], dayfirst=True)
    df["date"] = df["timestamp"].dt.date
    hourly_files = []
    #foreach day creat a file
    for day, group in df.groupby("date"):
        day_filename = f"day_{day}{original_ext}"

        if original_ext == ".csv":
            group.to_csv(day_filename, index=False)
        elif original_ext == ".parquet":
            group.to_parquet(day_filename, index=False)

        validate_check_on_data(day_filename)
        calculate_hour_avarage(day_filename)
        hourly_files.append(day_filename)

    return hourly_files
