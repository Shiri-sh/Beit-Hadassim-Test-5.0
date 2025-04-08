import glob
import pandas as pd
from collections import Counter
from split_log_file import split_log_file
from count_errors_in_file import count_errors_in_file
from delete_files import delete_files


with open("logs.txt", 'r') as file:
    line_count = sum(1 for line in file)

num_files=int(input("enter the number of files you want the origin to be splited to:\n"))

#check if there is need of deleting any files
delete_files(num_files)
#each file will contain line_count//num_files lines
split_log_file("logs.txt",line_count//num_files)

#gathering all splited files
log_parts = glob.glob("log_part_*.txt")

all_counters = [count_errors_in_file(part) for part in log_parts]

#union the counters in all_counters
final_counter = Counter()
for counter in all_counters:
    final_counter.update(counter)


N = int(input("enter N:\n"))
most_common_errors = final_counter.most_common(N)

print(f"{N} most common errors in the file")
for error, count in most_common_errors:
    print(f"{error}: was shown {count} times")

# קריאה של הקובץ לפיצול → O(N)
# כתיבת החלקים → O(N)
# קריאת כל קובץ וספירת שגיאות → O(N)
# מיזוג הספירות לכלל הרשימה → O(M), כאשר M הוא מספר סוגי השגיאות השונים (קטן שווה ל-N)
# מיון למציאת N השגיאות הנפוצות ביותר → O(M log N)

# סיבוכיות זמן כוללת (מקרה גרוע וטוב):
# O(N + M log N)

# סיבוכיות מקום:
# הקבצים נשמרים בדיסק ולא בזיכרון → שימוש זיכרון מינימלי.
# בזיכרון, השימוש העיקרי הוא ב-Counter של כל השגיאות השונות.
# לכן: O(M), כאשר M ≤ N