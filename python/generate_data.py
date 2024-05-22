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
job_roles = []

for i in range(1, NUM_ROWS + 1):
    # Generate random values for each column
    unit_id = i
    name = random.choice(names)
    phone_number = random.choice(phone_numbers)
    job_role = random.choice(job_roles)


    work_location = random.choice(work_locations)
    salary = random.randint(40000, 350000)

    # Create the data row
    data_row = [
        unit_id,
        name, 
        phone_number,
        job_role,
        work_location,
        salary,
    ]

    # Add the data row to the list
    data_rows.append(data_row)

# Write the data to the CSV file
with open(OUTPUT_FILE, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
        ["unit_id", "name", "phone_number", "job_role", "work_location", "salary"]
    )
    writer.writerows(data_rows)

print("Data generation complete.")
