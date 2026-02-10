import pandas as pd

def calculate_hour_avarage(
    file_name: str,
    df: pd.DataFrame,
    ext: str
) -> None:
    """
    Calculate hourly average values and save to file.
    """

    df["timestamp"] = pd.to_datetime(df["timestamp"])
    df["hour"] = df["timestamp"].dt.floor("h")

    hourly_avg = (
        df.groupby("hour")["value"]
        .mean()
        .reset_index()
    )

    hourly_avg.columns = ["timestamp", "average_value"]

    if ext == ".csv":
        hourly_avg.to_csv(file_name, index=False)
    else:
        hourly_avg.to_parquet(file_name, index=False)
