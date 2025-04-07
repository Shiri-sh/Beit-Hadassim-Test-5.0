import pandas as pd
import os

def calculate_hour_avarage(file_name):
    ext = os.path.splitext(file_name)[1].lower()

    if ext == ".csv":
        df = pd.read_csv(file_name)
    elif ext == ".parquet":
        df = pd.read_parquet(file_name)
    else:
        raise ValueError("Unsupported file type")

    # Convert timestamp to datetime
    df["timestamp"] = pd.to_datetime(df["timestamp"])

    # Round timestamps down to the nearest hour
    df["hour"] = df["timestamp"].dt.floor("h")

    # Calculate the hourly average
    hourly_avg = df.groupby("hour")["value"].mean().reset_index()
    hourly_avg.columns = ["timestamp", "average_value"]

    # Save
    if ext == ".csv":
        hourly_avg.to_csv(file_name, index=False)
    elif ext == ".parquet":
        hourly_avg.to_parquet(file_name, index=False)
