import React, { useState } from 'react';
import { Form, Button,Row, Col} from 'react-bootstrap';
import './LoanForm.css';
import axios from 'axios';
import {
  validateFullName,
  validateEmail,
  validatePhoneNumber,
  validatePassword,
  validateDateOfBirth,
  validateAddress,
  validateCity,
  validateState,
  validatePincode,
  validatePanNumber
} from './ValidationRegister';

const LoanForm = () => {
  // Define state variables for each form field using useState
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state_province, setstate_province] = useState('');
  const [postal_code, setpostal_code] = useState('');
  const [panNumber, setPanNumber] = useState('');
  // State for displaying alert messages
  const [alertText,setAlertText]=useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

   // Perform form validation
   if (!validateForm()) {
    return;  
   }

    const url = 'http://localhost:8000/api/insert_signup/';

    try {
      // Send a POST request to the API with form data
      const response = await axios.post(url, {
        full_name: fullName,
        email: email,
        mobile_number: mobileNumber,
        password: password,
        dob: dob,
        address: address,
        city: city,
        state_province: state_province,
        postal_code: postal_code,
        pan_number: panNumber
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken') // Ensure you send the CSRF token
        }
      });

      console.log('Data inserted successfully:', response.data);
      setAlertText('Registered Successfully');
      window.location.href = '/login';
      // Handle success response as needed
    } catch (error) {
      if(error.response.status===409)
        setAlertText(error.response.data.error)
      console.error('Error inserting data:', error.message);
      // Handle error as needed
    }
    
  };

  // Function to get CSRF token from cookies
  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };

  // Validate form inputs before submission
  const validateForm = () => {
    if (!validateFullName(fullName)) {
      window.alert('Please enter your full name.');
      return false;
    }

    if (!validateEmail(email)) {
      window.alert('Please enter a valid email address.');
      return false;
    }

    if (!validatePhoneNumber(mobileNumber)) {
      window.alert('Please enter a valid 10-digit mobile number.');
      return false;
    }

    if (!validatePassword(password)) {
      window.alert('Password must be at least 6 characters long and include at least one uppercase letter (A-Z), one lowercase letter (a-z), one special character (!@#$%^&*), and one digit (0-9).');
      return false;
    }

    if (!validateDateOfBirth(dob)) {
      window.alert('You must be at least 18 years old to apply.');
      return false;
    }

    if (!validateAddress(address)) {
      window.alert('Please enter your address.');
      return false;
    }

    if (!validateCity(city)) {
      window.alert('Please enter your city.');
      return false;
    }
  
    if (!validateState(state_province)) {
      window.alert('Please enter your state.');
      return false;
    }
  
    if (!validatePincode(postal_code)) {
      window.alert('Please enter a valid 6-digit postal code.');
      return false;
    }

    if (!validatePanNumber(panNumber)) {
      window.alert('Please enter a valid PAN number (e.g., ABCDE1234F).');
      return false;
    }

    return true;  // Return true if all validations pass
  };


  return (
    <>
    {/* This form enables the user to give register */} 
    <Form onSubmit={handleSubmit} className='registerform'>
      <Form.Group as={Row} controlId="fullName" className="mb-3">
        <Form.Label column sm="4" className="text-end">Full Name:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="form-control half-width"
            placeholder="Enter your full name"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="email" className="mb-3">
        <Form.Label column sm="4" className="text-end">Email:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control half-width"
            placeholder="Enter your email"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="mobileNumber" className="mb-3">
        <Form.Label column sm="4" className="text-end">Mobile Number:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="form-control half-width"
            placeholder="Enter your mobile number"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="password" className="mb-3">
        <Form.Label column sm="4" className="text-end">Password:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control half-width"
            placeholder="Enter your password"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="dob" className="mb-3">
        <Form.Label column sm="4" className="text-end">Date of Birth:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="form-control half-width"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="address" className="mb-3">
        <Form.Label column sm="4" className="text-end">Address:</Form.Label>
        <Col sm="8">
          <Form.Control
            as="textarea"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control half-width"
            placeholder="Enter your address"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="city" className="mb-3">
  <Form.Label column sm="4" className="text-end">City:</Form.Label>
  <Col sm="8">
    <Form.Control
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="form-control half-width"
      placeholder="Enter your city"
    />
  </Col>
</Form.Group>

<Form.Group as={Row} controlId="state_province" className="mb-3">
  <Form.Label column sm="4" className="text-end">State/Province:</Form.Label>
  <Col sm="8">
    <Form.Control
      type="text"
      value={state_province}
      onChange={(e) => setstate_province(e.target.value)}
      className="form-control half-width"
      placeholder="Enter your state"
    />
  </Col>
</Form.Group>

<Form.Group as={Row} controlId="postal_code" className="mb-3">
  <Form.Label column sm="4" className="text-end">Postal Code:</Form.Label>
  <Col sm="8">
    <Form.Control
      type="text"
      value={postal_code}
      onChange={(e) => setpostal_code(e.target.value)}
      className="form-control half-width"
      placeholder="Enter your pin code"
    />
  </Col>
</Form.Group>


      <Form.Group as={Row} controlId="panNumber" className="mb-3">
        <Form.Label column sm="4" className="text-end">PAN Number:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
            className="form-control half-width"
            placeholder="Enter your PAN number"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="justify-content-center">
        <Col sm="8" className="text-center">
          <Button type="submit" className="btn btn-primary btn-custom">Register</Button>
        </Col>
        <br/>
      <div>Already a User?<a href='/login'>Login</a></div>
    {/* {alertText} */}
    <span className="alert-text2">{alertText}</span>
      </Form.Group>
    </Form>
    
    </>
  );
};

export default LoanForm;
