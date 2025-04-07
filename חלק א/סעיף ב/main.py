import pandas as pd
import os
from validate_check import validate_check_on_data
from split_csv_file import split_file
from avarage import calculate_hour_avarage
#3
#יצירת מבנה נתונים-מילון לדוג'- שבו כל שעה תכיל את הערכים שהתקבלו לאותה שעה
#כל פעם שמתקבל נתון חדש בודקים לאיזו שעה הוא שייך ומוסיפים אותו למבנה הנתונים של השעה הזאת
#את השמירה של הממוצע אפשר לשמור בדאטה בייס כמו POSTGRESQL אם יש צורך בשמירה ממושכת
#ואם רוצים לראות בזמן אמת אפשר להציג לDASHBOARD באמצעות API
#אחרי כל שעה ננקה את הזיכרון

#4
#השינויים הנדרשים בקוד על מנת שיתמוך בקבצים מסוג הזה הם: לשנות את מילות הקוד של קריאה וכתיבה מקובץ
#היתרונות שיש לקבצים האלה הם:                                            קריאה מהירה יותר
#יכולת לעבוד עם מבני נתונים יותר מורכבים(מערכים.מבנים מקוננים)
#החישובים והעיבודים יעילים יותר כי הפורמט תומך בקידוד דחיסות יעיל יותר
#הקבצים קטנים יחסית בגלל הדחיסה האוטומטית ויעילות אחסון הקולומנים. זה מקטין את כמות המידע שצריך להעביר או לאחסן


file_path = "time_series.csv"  # או "time_series.parquet"
ext = os.path.splitext(file_path)[1].lower()

try:
    if ext == ".csv":
        df = pd.read_csv(file_path)
    elif ext == ".parquet":
        df = pd.read_parquet(file_path)
    else:
        raise ValueError("Unsupported file type")
except Exception as e:
    print(f"Error loading the file: {e}")
    exit()

splited_files = split_file(df, ext)

final_df = pd.concat(
    [pd.read_csv(f) if ext == ".csv" else pd.read_parquet(f) for f in splited_files]
)

# Save final file
if ext == ".csv":
    final_df.to_csv("final_hourly_avg.csv", index=False)
elif ext == ".parquet":
    final_df.to_parquet("final_hourly_avg.parquet", index=False)

print("The data was united in the final_hourly_avg file")
