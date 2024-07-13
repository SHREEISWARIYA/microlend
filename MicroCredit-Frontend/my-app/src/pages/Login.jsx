import React, { useState } from 'react';
import { Form, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import './Login.css';

const Login = () => {
  // Define state variables for PAN number and password using useStat
  const [panNumber, setPanNumber] = useState('');
  const [password, setPassword] = useState('');
  
  // State for displaying alert messages
  const [alertText,setAlertText]=useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if PAN number and password are provided
    if (!panNumber || !password) {
      window.alert('PAN Number and Password are required.');
      return;  // Stop submission if validation fails
    }

    const url = 'http://localhost:8000/api/login/';  // Update the URL as needed

    try {
      // Send a POST request to the API with login data
      const response = await axios.post(url, {
        pan_number: panNumber,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken') // Ensure you send the CSRF token if needed
        }
        ,withCredentials:true  // Include credentials with the request (cookies)
      });

      console.log('Login successful:', response.data);
      window.location.href = '/apply/loan';

      // Clear the form fields
      setPanNumber('');
      setPassword('');
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 404) { // <--- Corrected condition
        setAlertText(error.response.data.error);
      }
      console.error('Error during login:', error.message);
      // Handle error as needed, e.g., show error message
    }
  };

  // Function to get CSRF token from cookies
  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';   // Return the cookie value if found
  };

  return (
    <div>
      {/* This form enables the user to login */}
    <Form onSubmit={handleSubmit} className='loginform'>
      <Form.Group as={Row} controlId="formPanNumber" className="mb-3">
        <Form.Label column sm="4" className="text-end">PAN Number:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
            className="form-control half-width"
            placeholder="Enter PAN number"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPassword" className="mb-3">
        <Form.Label column sm="4" className="text-end">Password:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control half-width"
            placeholder="Enter password"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="justify-content-center">
        <Col sm="8" className="text-center">
          <Button type="submit" className="btn btn-primary w-100">Login</Button>
        </Col>
        <br/>
        <div className='newuser'>New User?<a href='/signup'>Register</a></div>
        <span className="alert-text">{alertText}</span>
      </Form.Group>
    </Form>
    </div>
    
  );
};

export default Login;

