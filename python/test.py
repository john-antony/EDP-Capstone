import csv

set_id = set()
var = []
with open("user_data.csv", "r", newline="") as file:
    reader = csv.reader(file, delimiter=",")
    for row in reader:
        print(row[2])
        var.append(row[2])

var = set(var)
print(len(var))

### Fix dupes or test them -- Finish model training 