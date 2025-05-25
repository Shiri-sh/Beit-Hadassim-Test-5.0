import pandas as pd
import os

def validate_check_on_data(dfn:str,df:pd.DataFrame,ext:str):

    required_columns = {"timestamp", "value"}
    if not required_columns.issubset(df.columns):
        raise ValueError("One or more required columns are missing!")
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

    if ext == ".csv":
        df.to_csv(dfn, index=False)
    elif ext == ".parquet":
        df.to_parquet(dfn, index=False)
