import os
import pandas as pd
from split_csv_file import split_file

def load_file(file_path: str) -> pd.DataFrame:
    ext = os.path.splitext(file_path)[1].lower()

    if ext == ".csv":
        return pd.read_csv(file_path), ext
    elif ext == ".parquet":
        return pd.read_parquet(file_path), ext
    else:
        raise ValueError("Unsupported file type")

def main() -> None:
    file_path = "time_series.csv"

    try:
        df, ext = load_file(file_path)
    except Exception as e:
        print(f"Error loading the file: {e}")
        return

    daily_data = split_file(df, ext)

    final_df = pd.concat(
        [day_df for (_, _, day_df) in daily_data],
        ignore_index=True
    )

    output_file = (
        "final_hourly_avg.csv"
        if ext == ".csv"
        else "final_hourly_avg.parquet"
    )

    if ext == ".csv":
        final_df.to_csv(output_file, index=False)
    else:
        final_df.to_parquet(output_file, index=False)

    print("The data was united in the final_hourly_avg file")

if __name__ == "__main__":
    main()
