import pandas as pd
from avarage import calculate_hour_avarage
from validate_check import validate_check_on_data

def split_file(
    df: pd.DataFrame,
    original_ext: str
) -> list[tuple[str, str, pd.DataFrame]]:
    """
    Split data by day, validate, calculate hourly averages,
    and save each day's file.
    """

    df["timestamp"] = pd.to_datetime(df["timestamp"], dayfirst=True)

    invalid_rows = df["timestamp"].isna().sum()
    if invalid_rows:
        print(f"Warning: {invalid_rows} invalid timestamps removed.")
        df = df.dropna(subset=["timestamp"])

    df["date"] = df["timestamp"].dt.date
    daily_files = []

    for day, group in df.groupby("date"):
        file_name = f"day_{day}{original_ext}"
        group = group.drop(columns=["date"])

        if original_ext == ".csv":
            group.to_csv(file_name, index=False)
        else:
            group.to_parquet(file_name, index=False)

        try:
            validate_check_on_data(file_name, group, original_ext)
            calculate_hour_avarage(file_name, group, original_ext)
            daily_files.append((str(day), file_name, group))
        except ValueError as e:
            print(f"Validation failed for {file_name}: {e}")

    return daily_files
