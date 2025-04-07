
import csv
from family_tree import Family_tree
from load_people import load_poeple

#loading from csv file
people=load_poeple('data.csv')
#building the family tree
family_tree=Family_tree(people)

for connection in family_tree:
    print(connection)
#writing to a new file the result
with open("family_tree.csv", mode="w", newline='', encoding='utf-8-sig') as file:
    writer = csv.DictWriter(file, fieldnames=["Person_Id", "Relative_Id", "Connection_Type"])
    writer.writeheader()
    writer.writerows(family_tree)