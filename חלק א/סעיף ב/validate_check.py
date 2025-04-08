import pandas as pd
import os

def validate_check_on_data(dfn):
    ext = os.path.splitext(dfn)[1].lower()
    if ext == ".csv":
        df = pd.read_csv(dfn)
    elif ext == ".parquet":
        df = pd.read_parquet(dfn)
    else:
        raise ValueError("Unsupported file type")

    required_columns = {"timestamp", "value"}
    if not required_columns.issubset(df.columns):
        print("Error: One or more required columns are missing!")
        exit()
    #check the validation of the date
    df["timestamp"] = pd.to_datetime(df["timestamp"], errors="coerce")

    invalid_dates = df["timestamp"].isna().sum()
    if invalid_dates > 0:
        print(f"Warning: {invalid_dates} rows have an invalid timestamp and will be removed.")
        df = df.dropna(subset=["timestamp"])

    #check the validation of the value
    df["value"] = pd.to_numeric(df["value"], errors="coerce")
    missing_values = df["value"].isna().sum()
    if missing_values > 0:
        print(f"Warning: {missing_values} rows have missing values and will be removed.")
        df = df.dropna(subset=["value"])

    duplicates = df.duplicated().sum()
    if duplicates > 0:
        print(f"Warning: {duplicates} duplicate rows found and will be removed.")
        df = df.drop_duplicates()

    if "date" in df.columns:
        df = df.drop(columns=["date"])

    if ext == ".csv":
        df.to_csv(dfn, index=False)
    elif ext == ".parquet":
        df.to_parquet(dfn, index=False)
