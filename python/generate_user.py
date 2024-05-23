import csv
import random
from datetime import datetime, timedelta
import json
import pandas as pd

# Generate data for 50 characters
NUM_ROWS = 1000

# Create the CSV file
OUTPUT_FILE = "user_data.csv"

username = []
password = []
fk_id = []
data_rows = []
with open("employee_data.csv", "r", newline="") as file:
    reader = csv.reader(file, delimiter=",")
    for row in reader:
        fk_id.append(row[0])
        username.append(row[2])



for i in range(1, NUM_ROWS + 1):
    # Generate random values for each column
    fk_id = i
    password = "123"
    # print(fk_id)
    name = username[i]
    # print(name)
    first_name, last_name = name.split()
    short_name = first_name + last_name[0] + str(random.randint(0, 9))
    name = short_name.lower()
    
    # checking for duplicates
    for row in data_rows:
        if name in row:
            print('duplicate found! updating name')
            name = name + str(random.randint(0, 9))
            print('updated name', name)
    # Create the data row
    data_row = [
        fk_id,
        password,
        name
    ]

    # Add the data row to the list
    data_rows.append(data_row)


# Write the data to the CSV file
with open(OUTPUT_FILE, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
        ['fk_id',
        'password',
        'name']
    )
    writer.writerows(data_rows)

print("Data generation complete.")
