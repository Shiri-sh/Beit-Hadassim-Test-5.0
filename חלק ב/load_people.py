import csv

def load_poeple(file_name):
    poeple=[]
    with open(file_name,mode='r',encoding="utf-8-sig") as file:
      reader=csv.DictReader(file)
      for row in reader:
          person={
              "Person_Id":int(row["Person_Id"]),
              "Name":row["Name"],
              "Family_Name":row["Family_name"],
              "Gender":row["Gender"],
              "Father_Id":int(row["Father_Id"]),
              "Mother_Id":int(row["Mother_Id"]),
              "Spouse_Id":int(row["Spouse_Id"]) if row["Spouse_Id"] else None
          }
          poeple.append(person)
    return poeple