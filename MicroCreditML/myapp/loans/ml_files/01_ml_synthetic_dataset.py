import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Set a random seed for reproducibility
np.random.seed(42)

# Number of samples
n_samples = 500000

# Function to generate a random date within a date range using np.random.randint
def random_date(start, end):
    """Generate a random datetime between `start` and `end`."""
    delta = end - start
    random_days = np.random.randint(0, delta.days + 1, size=n_samples)
    return start + pd.to_timedelta(random_days, unit='d')

# Define the date range for hikes
ph_start_date = datetime(1967, 1, 1)
ph_end_date = datetime(2023, 12, 31)

# Define the date range for hikes
eh_start_date = datetime(1967, 1, 1)
eh_end_date = datetime(2025, 12, 31)

# Generate random previous and estimated hike dates
previous_hike_dates = random_date(ph_start_date, ph_end_date)
estimated_hike_dates = random_date(eh_start_date, eh_end_date)

# Generate synthetic data
data = pd.DataFrame({
'gender': np.random.choice(['Male', 'Female'], size=n_samples),
'marital_status': np.random.choice(['Married', 'Single', 'Divorced', 'Widowed'], size=n_samples),
'number_of_dependents': np.random.randint(0, 5, size=n_samples),
'employer_name':np.random.choice(['Google', 'Microsoft', 'Apple', 'Amazon', 'Facebook','IBM'], size=n_samples),
'occupation': np.random.choice(['Engineer', 'Manager', 'Architect', 'Accounts', 'Lawyer', 'Other'], size=n_samples),
'current_salary': np.random.randint(30000, 125000, size=n_samples),
'previous_salary': np.random.randint(25000, 100000, size=n_samples),
'previous_hike': previous_hike_dates.strftime('%Y-%m-%d'),
'estimated_hike': estimated_hike_dates.strftime('%Y-%m-%d'),
'own_house': np.random.choice([True, False], size=n_samples),
'monthly_expenses': np.random.randint(10000, 100000, size=n_samples),
'existing_loans': np.random.choice([True, False], size=n_samples),
'existing_loan_amount': np.random.randint(50000, 200000, size=n_samples),
'existing_emi_for_loan': np.random.randint(1000, 10000, size=n_samples),
'loan_from': np.random.choice(['SBI', 'HDFC', 'ICICI', 'PNB', 'IDBI', 'UCO', 'IOB', 'RBL', 'Federal'], size=n_samples),
'credit_score': np.random.randint(300, 750, size=n_samples),
'loan_amount_requested': np.random.randint(10000, 300000, size=n_samples),
'loan_tenure_requested': np.random.randint(12, 360, size=n_samples),
'risk_category': np.random.choice([0, 1], size=n_samples)
})

# Calculate derived fields
data['debt_to_income_ratio'] = (data['existing_emi_for_loan'] / data['current_salary']) * 100
data['loan_to_value_ratio'] = data['loan_amount_requested'] / (data['existing_loan_amount'] * 1.2)
data['credit_utilization'] = data['existing_emi_for_loan'] / data['current_salary']

# Save to CSV
file_path = 'micro_loan_dataset.csv'
data.to_csv(file_path, index=False)

file_path
