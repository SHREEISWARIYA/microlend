import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import json

# Load the dataset
df = pd.read_csv('micro_loan_dataset.csv')

# Check the columns in the dataset
print("Columns in the dataset:", df.columns)

# Ensure 'risk_category' is the correct column name
target_column = 'risk_category'  # Replace with the correct column name if necessary

# Check if the target column exists
if target_column not in df.columns:
    raise KeyError(f"'{target_column}' not found in the dataset columns")

# Display the first few rows of the dataframe
print(df.head())

# Preprocessing
# Handle missing values
df.fillna(method='ffill', inplace=True)

# Encode categorical features
label_encoders = {}
for column in df.select_dtypes(include=['object']).columns:
    label_encoders[column] = LabelEncoder()
    df[column] = label_encoders[column].fit_transform(df[column])

# Split data into features and target
X = df.drop(target_column, axis=1)
y = df[target_column]

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale the features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Test the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy:.2f}')

# Save the model and preprocessing objects
joblib.dump(model, 'loan_eligibility_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
joblib.dump(label_encoders, 'label_encoders.pkl')