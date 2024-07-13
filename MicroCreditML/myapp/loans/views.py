from datetime import date, datetime, timedelta
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError,connection,transaction
import json
from django.shortcuts import render
from django.contrib.auth.hashers import make_password, check_password
from django.core import signing
import os
import joblib
from .ml_files.ml_prediction import predict_loan_details

# Load the machine learning model for loan prediction
model_path = os.path.join(os.path.dirname(__file__), '..', 'static', 'label_encoders.pkl')
model = joblib.load(model_path)

@csrf_exempt
def proc_micro_loan_apply(request):
    """Handles loan application submissions."""
    if request.method == 'POST':
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body.decode('utf-8'))

            # Extract data from JSON payload
            gender = data.get('gender')
            marital_status = data.get('marital_status')
            number_of_dependents = data.get('number_of_dependents')
            employer_name = data.get('employer_name')
            occupation = data.get('occupation')
            current_salary = data.get('current_salary')
            previous_salary = data.get('previous_salary')
            previous_hike = data.get('previous_hike')
            estimated_hike = data.get('estimated_hike')
            own_house = data.get('own_house')
            monthly_expenses = data.get('monthly_expenses')
            existing_loans = data.get('existing_loans')
            existing_loan_amount = data.get('existing_loan_amount')
            existing_emi_for_loan = data.get('existing_emi_for_loan')
            loan_from = data.get('loan_from')
            credit_score = data.get('credit_score')
            loan_amount_requested = data.get('loan_amount_requested')
            loan_tenure_requested = data.get('loan_tenure_requested')
            pan = data.get('pan')
           
            # Log the parameters to debug
            params = [
                gender, marital_status, number_of_dependents, employer_name, occupation, current_salary,
                previous_salary, previous_hike, estimated_hike, own_house, monthly_expenses, existing_loans,
                existing_loan_amount, existing_emi_for_loan, loan_from, credit_score, loan_amount_requested,
                loan_tenure_requested, pan
            ]
            #print(params)  # This will print the parameters to the console for debugging

            # Call PostgreSQL function
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT ml_eligible.proc_micro_loan_apply_new(
                        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
                    );
                """, params)

                # Commit the transaction
                connection.commit()
            
            # Call the prediction function
            
            result = predict_loan_details(data)
            print(result)
            # Return response with both success message and prediction result
            response_data = {
                'message': 'Data inserted successfully.',
                'result':result
            }
            return JsonResponse(response_data)

        except ValueError as ve:
            return JsonResponse({'error': 'Invalid JSON data.', 'details': str(ve)}, status=400)
        except IntegrityError as ie:
            return JsonResponse({'error': 'Database integrity error.', 'details': str(ie)}, status=500)
        except Exception as e:
            return JsonResponse({'error': 'An error occurred.', 'details': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def proc_micro_loan_signup(request):
    """Handles user signup submissions."""
    if request.method == 'POST':
        try:
            # Parse JSON data from POST request body
            data = json.loads(request.body.decode('utf-8'))
            print(data)
            # Extract data from JSON payload
            name = data.get('full_name')
            email_address = data.get('email')
            phone_number = data.get('mobile_number')
            password = data.get('password')
            date_of_birth = data.get('dob')
            address = data.get('address')
            city = data.get('city')
            state_province = data.get('state_province')
            postal_code = data.get('postal_code')
            pan = data.get('pan_number')
            print(name, email_address, phone_number, password, date_of_birth,address,city,state_province,postal_code,pan)

            # Call PostgreSQL function with parameters
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT ml_eligible.proc_micro_loan_signup_new(
                        %s, %s, %s, 
                        %s, %s, %s, %s, %s, %s, %s
                    );
                """, [name, email_address, phone_number, make_password(password), date_of_birth,address,city,state_province,postal_code,pan])

               
               
               
                # Since your function returns void, no need to fetch anything

            return JsonResponse({'message': 'Data inserted successfully.'})
        except IntegrityError as ie:
            # Catch the IntegrityError specifically for duplicate key violation
            return JsonResponse({'error': 'A user with this PAN number already exists.'}, status=409)
        except ValueError as ve:
            return JsonResponse({'error': f'ValueError: {ve}'}, status=400)
        except Exception as e:
            print(e)
            return JsonResponse({'error': str(e)}, status=500)
        

    else:
        return JsonResponse({'error': 'POST request required.'}, status=400)
    
@csrf_exempt
def proc_micro_loan_login(request):
    """Handles user login submissions."""
    if request.method == 'POST':
        try:
            # Parse JSON data from POST request body
            data = json.loads(request.body.decode('utf-8'))
            pan = data.get('pan_number')
            password = data.get('password')

            # Retrieve stored password hash and customer_id from the database based on PAN
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT customer_id, password FROM ml_eligible.tbl_loan_signup_new
                    WHERE pan = %s;
                """, [pan])
                row = cursor.fetchone()
                if row:
                    customer_id = row[0]
                    stored_password = row[1]

                    # Verify password
                    if check_password(password, stored_password):
                        # Encrypt customer_id
                        encrypted_customer_id = signing.dumps(customer_id)

                        # Set cookie expiration time (e.g., 1 day from now)
                        expiration = datetime.now() + timedelta(days=1)
                        
                        # Create response with JSON message and set cookie
                        response = JsonResponse({'message': 'Login successful.'})
                        response.set_cookie(
                            'customer_id', 
                            encrypted_customer_id, 
                            expires=expiration, 
                            httponly=True, 
                            secure=True,  # Use True if using HTTPS
                            samesite='Lax'  # Adjust based on your requirements
                        )
                        print(f"Cookie set: {response.cookies}")
                        
                        return response
                        
                    else:
                        return JsonResponse({'error': 'Invalid PAN or password.'}, status=401)
                else:
                    return JsonResponse({'error': 'User with PAN not found.'}, status=404)

        except ValueError as ve:
            return JsonResponse({'error': f'ValueError: {ve}'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'POST request required.'}, status=400) 


def proc_micro_user_check(request):
    """Checks if the user is valid and authenticated based on cookie."""
    if request.method == 'GET':
        try:
            # Retrieve encrypted customer_id from the cookie
            encrypted_customer_id = request.COOKIES.get('customer_id')
            if not encrypted_customer_id:
                return JsonResponse({'error': 'Authentication cookie not found.'}, status=401)

            try:
                # Decrypt customer_id
                customer_id = signing.loads(encrypted_customer_id)
            except (BadSignature, SignatureExpired):
                return JsonResponse({'error': 'Invalid or expired authentication cookie.'}, status=401)

            # Check if customer_id exists in the database
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT customer_id FROM ml_eligible.tbl_loan_signup_new
                    WHERE customer_id = %s;
                """, [customer_id])
                row = cursor.fetchone()

                if row:
                    return JsonResponse({'message': 'User authenticated successfully.','isValidUser':True})
                else:
                    return JsonResponse({'error': 'User not found.'}, status=404)

        except ValueError as ve:
            return JsonResponse({'error': f'ValueError: {ve}'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'POST request required.'}, status=400)


def proc_micro_user_logout(request):
    if request.method == 'GET':
        """
        Handles user logout by clearing the authentication cookie.
        """
        try:
            # Clear the authentication cookie
            response = JsonResponse({'message': 'User logged out successfully.'})
            response.delete_cookie('customer_id')
            return response

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'GET request required.'}, status=400)
            
def proc_micro_user_pan(request):
    """
    Retrieves the PAN number of the authenticated user based on the customer_id from the cookie.
    """
    if request.method == 'GET':
        try:
            # Retrieve encrypted customer_id from the cookie
            encrypted_customer_id = request.COOKIES.get('customer_id')
            if not encrypted_customer_id:
                return JsonResponse({'error': 'Authentication cookie not found.'}, status=401)

            try:
                # Decrypt customer_id
                customer_id = signing.loads(encrypted_customer_id)
            except (BadSignature, SignatureExpired):
                return JsonResponse({'error': 'Invalid or expired authentication cookie.'}, status=401)

            # Check if customer_id exists in the database
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT pan FROM ml_eligible.tbl_loan_signup_new
                    WHERE customer_id = %s;
                """, [customer_id])
                row = cursor.fetchone()

                if row:
                    return JsonResponse({'message': 'PAN fetched successfully.','pan':row[0]})
                else:
                    return JsonResponse({'error': 'User not found.'}, status=404)

        except ValueError as ve:
            return JsonResponse({'error': f'ValueError: {ve}'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'POST request required.'}, status=400)


def proc_micro_user_name(request):
    """
    Retrieves the name of the authenticated user based on the customer_id from the cookie.
    """
    if request.method == 'GET':
        try:
            # Retrieve encrypted customer_id from the cookie
            encrypted_customer_id = request.COOKIES.get('customer_id')
            if not encrypted_customer_id:
                return JsonResponse({'error': 'Authentication cookie not found.'}, status=401)

            try:
                # Decrypt customer_id
                customer_id = signing.loads(encrypted_customer_id)
            except (BadSignature, SignatureExpired):
                return JsonResponse({'error': 'Invalid or expired authentication cookie.'}, status=401)

            # Check if customer_id exists in the database
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT name FROM ml_eligible.tbl_loan_signup_new
                    WHERE customer_id = %s;
                """, [customer_id])
                row = cursor.fetchone()

                if row:
                    return JsonResponse({'message': 'NAME fetched successfully.','name':row[0]})
                else:
                    return JsonResponse({'error': 'User not found.'}, status=404)

        except ValueError as ve:
            return JsonResponse({'error': f'ValueError: {ve}'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'POST request required.'}, status=400)
