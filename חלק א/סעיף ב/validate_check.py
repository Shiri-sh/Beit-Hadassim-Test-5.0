import pandas as pd

def validate_check_on_data(
    file_name: str,
    df: pd.DataFrame,
    ext: str
) -> None:
    """
    Validate required columns, remove invalid values and duplicates.
    """

    required_columns = {"timestamp", "value"}
    if not required_columns.issubset(df.columns):
        raise ValueError("Missing required columns")

    df["value"] = pd.to_numeric(df["value"], errors="coerce")

    missing = df["value"].isna().sum()
    if missing:
        print(f"Warning: {missing} invalid values removed.")
        df.dropna(subset=["value"], inplace=True)

    MIN_VALUE = 0
    MAX_VALUE = 100

    out_of_range = ~df["value"].between(MIN_VALUE, MAX_VALUE)
    if out_of_range.sum() > 0:
        print(
            f"Warning: {out_of_range.sum()} values out of range "
            f"({MIN_VALUE}–{MAX_VALUE}) removed."
        )
        df = df.loc[~out_of_range]
    
    duplicates = df.duplicated().sum()
    if duplicates:
        print(f"Warning: {duplicates} duplicate rows removed.")
        df.drop_duplicates(inplace=True)

    if ext == ".csv":
        df.to_csv(file_name, index=False)
    else:
        df.to_parquet(file_name, index=False)
