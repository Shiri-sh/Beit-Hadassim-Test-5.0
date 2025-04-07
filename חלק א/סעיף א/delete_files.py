
import os
#get the current path of the folder
directory = os.path.dirname(os.path.abspath(__file__))

#deleting unnecessary files
def delete_files(num_files):
    #the splited files
    files=[filename for filename in os.listdir(directory) if filename.startswith("log_part_") and filename.endswith(".txt") ]
    #delete only if the user wants to split it
    if len(files) > num_files:
        for filename in files:
                    #return the number of the file
                    part_number = int(filename[len("log_part_"):-len(".txt")])
                    if part_number > num_files:
                        # create the full path of the file
                        file_path = os.path.join(directory, filename)
                        os.remove(file_path)
