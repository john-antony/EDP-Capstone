import csv
import random
from datetime import datetime, timedelta
import json

# Generate data for 50 characters
NUM_ROWS = 1000

# Create the CSV file
OUTPUT_FILE = "employee_data.csv"

# Generate data rows
data_rows = []
work_locations = ['Hartford, CT', 'West Hartford, CT','Newington, CT','South Windsor, CT',
                  'New Haven, CT','Norwalk, CT',
                  'Manhattan, NY','Brooklyn, NY','Bronx, NY','Queens, NY',
                  'St Paul, MN', 'Chicago, IL', 'Atlanta, GA', 'Los Angeles, CA', 'Austin, TX']
names = []
phone_numbers = []
job_roles = ['Employee', 'HR', 'Manager']

with open("names.txt") as names_file:
    names = names_file.readlines()

with open("numbers.txt") as numbers_file:
    phone_numbers = numbers_file.readlines()
    


counter = 1
manager_id = 1
for i in range(1, NUM_ROWS + 1):
    # Generate random values for each column
    unit_id = i
    name = random.choice(names)
    name = name.strip()
    phone_number = random.choice(phone_numbers)
    phone_number = phone_number.strip()

    if counter <= 27:
         job_role = "HR"
         salary = random.randint(150000, 250000)
    elif counter <= 59:
         job_role = "Manager"
         salary = random.randint(200000, 350000)
         manager_id = manager_id
         manager_id += 1
    else:
         job_role = "Employee"
         salary = random.randint(40000, 99999)
         manager_id = counter // 30
    
    
    work_location = random.choice(work_locations)

    if "NY" in work_location:
        salary = (salary * 1.5)




    # Create the data row
    data_row = [
        unit_id,
        manager_id,
        name, 
        phone_number,
        job_role,
        work_location,
        salary,
    ]

    # Add the data row to the list
    data_rows.append(data_row)
    counter += 1

# Write the data to the CSV file
with open(OUTPUT_FILE, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
        ["unit_id", "manager_id", "name", "phone_number", "job_role", "work_location", "salary"]
    )
    writer.writerows(data_rows)

print("Data generation complete.")
