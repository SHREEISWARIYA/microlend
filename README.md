# microlend
Micro credit Application for approving loan using Machine Learning

This microcredit application is designed to help salaried individuals apply for and get approved for micro loans automatically using Artificial Intelligence. The application streamlines the loan application process, making it quick and easy for salaried persons to access financial support when needed.

## Installing / Getting started

A quick introduction of the minimal setup.This project uses Python, Django, PostgreSQL, React, and Postman for API testing.

# Frontend
cd MicroCredit-Frontend/my-app
npm install
npm start

# Backend 
Navigate to your project directory and install necessary dependencies, apply migrations, and run the server.

cd MicroCreditML/myapp/myapp/
pip install -r requirements.txt

cd MicroCreditML/myapp
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

## Model
Step1: Run the file 01_ml_synthetic_dataset.py file to generate the dataset
python 01_ml_synthetic_dataset.py

Step2: Run the file 02_ml_train_model.py file to train the model.It is used to trains a 
RandomForestClassifier on the training data.Makes predictions on the test set and calculates the accuracy of the model.Saves the trained model, scaler, and label encoders as .pkl files using joblib, so they can be reused later for predictions without retraining.
python 02_ml_train_model.py

Step3: Make predictions for the loan applied user
python manage.py runserver 

## Developing
Setting Up the Development Environment
git clone https://github.com/SHREEISWARIYA/microlend.git

Create and Activate a Virtual Environment(Backend)
python -m venv venv
venv\Scripts\activate

Install Backend Dependencies
cd MicroCreditML/myapp/myapp/
pip install -r requirements.txt

Install Frontend Dependencies
cd MicroCredit-Frontend/my-app
npm install
npm start

Configure PostgreSQL
Create a PostgreSQL database and user.
Update DATABASES settings in settings.py with your database credentials.

Apply Migrations
python manage.py makemigrations
python manage.py migrate

Run the Development Servers
python manage.py runserver

### Built With
Python - Version 3.6 or higher
Django - Version 4.1
Django REST Framework - Version 3.13.1
PostgreSQL - Version 12 or higher
React - Version 17.0.2
Node.js - Version 14 or higher
npm - Version 6 or higher
Axios - Version 0.21.1 (for making HTTP requests in React)
Bootstrap - Version 5.1 (for styling React components)

### Prerequisites
Ensure you have the following installed on your machine:

Python (version 3.6 or higher)
PostgreSQL
Node.js and npm
Django
Create React App
Postman
