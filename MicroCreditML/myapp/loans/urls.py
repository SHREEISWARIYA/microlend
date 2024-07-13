# myapp/urls.py

from django.urls import path
from . import views

# Define the URL patterns for the application
urlpatterns = [
    # URL pattern for inserting user signup details
    path('insert_signup/', views.proc_micro_loan_signup),

    # URL pattern for inserting loan application details
    path('insert_loan_details/', views.proc_micro_loan_apply),

    # URL pattern for user login
    path('login/', views.proc_micro_loan_login),

    # URL pattern for checking if a user is valid
    path('checkuser/',views.proc_micro_user_check),

    # URL pattern for user logout
    path('logout/',views.proc_micro_user_logout),

    # URL pattern for checking user PAN details
    path('pan/',views.proc_micro_user_pan),
    
    # URL pattern for checking user name details
    path('name/',views.proc_micro_user_name)
    
]


