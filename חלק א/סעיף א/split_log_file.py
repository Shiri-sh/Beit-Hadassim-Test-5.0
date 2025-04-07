
#the function slplits "logs" to small files

def split_log_file(input_file, lines_per_file=1000):

    with open(input_file, "r") as file:
        lines = file.readlines()

    file_count = 1
    for i in range(0, len(lines), lines_per_file):
        part_filename = f"log_part_{file_count}.txt"
        #writing to the file
        with open(part_filename, "w") as part_file:
            part_file.writelines(lines[i:i + lines_per_file])
        #print(f"{part_filename}:{sum(1 for line in lines[i:i + lines_per_file])}")
        #print(f" {part_filename} was created")
        file_count += 1