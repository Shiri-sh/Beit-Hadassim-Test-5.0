import csv


def Family_tree(people):
    resultMatrix=[]
    added_relations = set()  #to privent duplicating in "spouse" relationships

    for person in people:
         #i consider that a person has to have parents
         gender=person["Gender"]
         pid=person["Person_Id"]
         resultMatrix.append({'Person_Id':pid,'Relative_Id':person["Father_Id"],'Connection_Type':'Father'})
         resultMatrix.append({'Person_Id':pid,'Relative_Id':person["Mother_Id"],'Connection_Type':'Mother'})

         revers_lable= "son" if gender=="male" else "daughter"
         resultMatrix.append({'Person_Id':person['Father_Id'],'Relative_Id':pid,'Connection_Type':revers_lable})
         resultMatrix.append({'Person_Id':person['Mother_Id'],'Relative_Id':pid,'Connection_Type':revers_lable})

         if person["Spouse_Id"] is not None:
             spouse=  "בת זוג"if gender=="male" else "בן זוג"
             reverse_spouse="בת זוג"if spouse=="בן זוג" else "בן זוג"
             if (pid, person["Spouse_Id"]) not in added_relations:
                 resultMatrix.append({'Person_Id': pid, 'Relative_Id': person['Spouse_Id'], 'Connection_Type': spouse})
                 resultMatrix.append({'Person_Id': person['Spouse_Id'], 'Relative_Id':pid, 'Connection_Type': reverse_spouse})
                 added_relations.add(frozenset(pid, person["Spouse_Id"]))

    for p1 in people:
        for p2 in people:
            if p2["Person_Id"]!=p1["Person_Id"]:
                #i consider half sibling to be sibling
                if p2["Father_Id"]==p1["Father_Id"] or p2["Mother_Id"]==p1["Mother_Id"]:
                    genderP1="brother" if p1["Gender"]=="male" else "sister"
                    genderP2="brother" if p2["Gender"]=="male" else "sister"
                    resultMatrix.append({'Person_Id':p1['Person_Id'],'Relative_Id':p2['Person_Id'],'Connection_Type':genderP1})
    return resultMatrix


