import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
import joblib

# Function to predict loan eligibility and provide additional loan details
def predict_loan_details(json_input):
    # Load the model and preprocessing objects
    model = joblib.load('loan_eligibility_model.pkl')
    scaler = joblib.load('scaler.pkl')
    label_encoders = joblib.load('label_encoders.pkl')

    expected_features = [
        'gender', 'marital_status', 'number_of_dependents', 'employer_name', 'occupation',
        'current_salary', 'previous_salary', 'previous_hike', 'estimated_hike', 'own_house',
        'monthly_expenses', 'existing_loans', 'existing_loan_amount', 'existing_emi_for_loan',
        'loan_from', 'credit_score', 'loan_amount_requested', 'loan_tenure_requested',
        'debt_to_income_ratio', 'loan_to_value_ratio', 'credit_utilization'
    ]

    # Convert JSON input to DataFrame
    input_data = pd.DataFrame([json_input])
    
    # Encode categorical features
    for column in input_data.select_dtypes(include=['object']).columns:
        if column in label_encoders:
            le = label_encoders[column]
            # Check for unseen labels and handle them
            input_data[column] = input_data[column].apply(lambda x: x if x in le.classes_ else 'unseen')
            le.classes_ = np.append(le.classes_, 'unseen')
            input_data[column] = le.transform(input_data[column])
    
    # Calculate derived fields
    input_data['debt_to_income_ratio'] = np.where(input_data['current_salary'] != 0, 
                                                  (input_data['monthly_expenses'] / input_data['current_salary']) * 100, 
                                                  0)
    input_data['loan_to_value_ratio'] = np.where(input_data['existing_loan_amount'] != 0, 
                                                 input_data['loan_amount_requested'] / (input_data['existing_loan_amount'] * 1.2), 
                                                 0)
    input_data['credit_utilization'] = np.where(input_data['current_salary'] != 0, 
                                                input_data['existing_emi_for_loan'] / input_data['current_salary'], 
                                                0)
    
    # Ensure all columns are present in the same order as in the training data
    input_data = input_data.reindex(columns=expected_features, fill_value=0)
    
    # Scale the features
    input_data_scaled = scaler.transform(input_data)
    
    # Predict eligibility
    prediction = model.predict(input_data_scaled)
    
    eligibility = 'Eligible' if prediction[0] == 1 else 'Not Eligible'

    if eligibility == 'Eligible':
        # Example logic for loan amount and tenure calculation
        max_loan_amount = min((json_input['current_salary'] * 10), json_input['loan_amount_requested'])
        
        # Calculate EMI using the formula: EMI = [P * r * (1+r)^n] / [(1+r)^n - 1]
        loan_amount = max_loan_amount
        annual_interest_rate = 0.10  # Assuming a 10% annual interest rate
        monthly_interest_rate = annual_interest_rate / 12
        
        # Estimate maximum EMI the applicant can afford
        affordable_emi = json_input['current_salary'] * 0.4  # Assume 40% of salary can be used for EMI
        
        # Calculate the tenure (in months) needed to pay off the loan amount with the affordable EMI
        estimated_tenure_months = int(np.log(affordable_emi / (affordable_emi - loan_amount * monthly_interest_rate)) / np.log(1 + monthly_interest_rate))
        
        # Cap the tenure to a maximum of 60 months (5 years)
        max_tenure_months = min(max(estimated_tenure_months, 24), 60)
        
        # Recalculate EMI with the determined tenure
        emi = round((loan_amount * monthly_interest_rate * (1 + monthly_interest_rate)**max_tenure_months) / ((1 + monthly_interest_rate)**max_tenure_months - 1), 0)
        
        # Risk score logic (This could be model-based or a simple calculation based on features)
        risk_score = round(1000 - (json_input['credit_score'] + (json_input['current_salary'] / 1000) - input_data.at[0, 'debt_to_income_ratio']), 0)
        
        return {
            'eligibility': eligibility,
            'max_loan_amount': loan_amount,
            'max_tenure_months': max_tenure_months,
            'emi': emi,
            'risk_score': risk_score
        }
    else:
        return {
            'eligibility': eligibility,
            'max_loan_amount': 0,
            'max_tenure_months': 0,
            'emi': 0,
            'risk_score': 'N/A'
        }

# Example usage
if __name__ == "__main__":
    sample_json_input = {
        'gender': 'Male',
        'marital_status': 'Married',
        'number_of_dependents': 4,
        'employer_name': 'Infosys',
        'occupation': 'Engineer',
        'current_salary': 50000,
        'previous_salary': 20000,
        'previous_hike': '2023-08-01',
        'estimated_hike': '2024-08-01',
        'own_house': True,
        'monthly_expenses': 4000,
        'existing_loans': False,
        'existing_loan_amount': 0,
        'existing_emi_for_loan': 0,
        'loan_from': '-',
        'credit_score': 750,
        'loan_amount_requested': 50000,
        'loan_tenure_requested': 24
    }

    result = predict_loan_details(sample_json_input)
    print(result)
