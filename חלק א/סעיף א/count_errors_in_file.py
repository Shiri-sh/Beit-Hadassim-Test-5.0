from collections import Counter

#counts the errors in a specific file
def count_errors_in_file(filename):
    #read all lines from the file
    with open(filename, "r") as file:
        lines = file.readlines()
    #creats erros list
    errors = [line.split("Error: ")[1].strip() for line in lines]
    #creates an object that contains - each error with the amount of times it exists
    return Counter(errors)