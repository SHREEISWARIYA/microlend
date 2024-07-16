# microlend
Micro credit Application for approving loan using Machine Learning

This microcredit application is designed to help salaried individuals apply for and get approved for micro loans automatically using Artificial Intelligence. The application streamlines the loan application process, making it quick and easy for salaried persons to access financial support when needed.

## Table of Contents
1.Getting started \
2.How to run Frontend \
3.How to run Backend \
4.How to create the Model \
5.Steps for developing this application \
6.Built with \
7.Prerequisites 


## Installing / Getting started

A quick introduction of the minimal setup.This project uses Python, Django, PostgreSQL, DBeaver, React, and Postman for API testing.

# How to run Frontend
cd MicroCredit-Frontend/my-app \
npm install \
npm start

# How to run Backend 
Navigate to your project directory and install necessary dependencies, apply migrations, and run the server.

cd MicroCreditML/myapp/myapp/  \
pip install -r requirements.txt 

cd MicroCreditML/myapp \
python manage.py makemigrations \
python manage.py migrate \
python manage.py runserver 

## Model Creation
Step1: Run the file 01_ml_synthetic_dataset.py file to generate the dataset. \
 python 01_ml_synthetic_dataset.py

Step2: Run the file 02_ml_train_model.py file to train the model.It is used to trains a 
RandomForestClassifier on the training data.Makes predictions on the test set and calculates the accuracy of the model.Saves the trained model, scaler, and label encoders as .pkl files using joblib, so they can be reused later for predictions without retraining. \
 python 02_ml_train_model.py

Step3: Make predictions for the loan applied user. \
 python manage.py runserver 

## Developing (Steps)
1) Setting Up the Development Environment \
git clone https://github.com/SHREEISWARIYA/microlend.git 

2) Create and Activate a Virtual Environment(Backend) \
python -m venv venv \
venv\Scripts\activate

3) Configure PostgreSQL \
Create a PostgreSQL database and user. \
Update DATABASES settings in settings.py with your database credentials. 

4) Install Backend Dependencies \
cd MicroCreditML/myapp/myapp/ \
pip install -r requirements.txt

5) check if api is working correctly using postman \
API for Registering   - http://localhost:8000/api/insert_signup/ \
API for Login         - http://localhost:8000/api/login/     \
API for Applying Loan - http://localhost:8000/api/insert_loan_details/


7) Install Frontend Dependencies \
cd MicroCredit-Frontend/my-app \
npm install \
npm start 

8) Apply Migrations in Backend\
python manage.py makemigrations \
python manage.py migrate 

9) Run the Development Servers \
python manage.py runserver 

### Built With
Python - Version 3.6 or higher \
Django - Version 4.1 \
Django REST Framework - Version 3.13.1 \
PostgreSQL - Version 12 or higher \
React - Version 17.0.2 \
Node.js - Version 14 or higher \
npm - Version 6 or higher \
Axios - Version 0.21.1 (for making HTTP requests in React) \
Bootstrap - Version 5.1 (for styling React components) \
DBeaver

### Prerequisites
Ensure you have the following installed on your machine: 

Python (version 3.6 or higher) \
PostgreSQL \
Node.js and npm \
Django \
Create React App \
Postman \
DBeaver
