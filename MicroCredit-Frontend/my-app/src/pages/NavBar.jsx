import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import useCheckUser from '..//checkUser'; // Import the useCheckUser hook
import axios from 'axios';

const NavBar = () => {
  const {  isUserValid } = useCheckUser(); // Use the useCheckUser hook to get user status

  // Function to handle user logout
  const handleLogout = () => {
    axios.get('http://localhost:8000/api/logout/', { withCredentials: true })
      .then(response => {
        console.log("Api response", response.data); // Log the API response
        window.location.href="/login"; // Redirect to the login page after successful logout
      })
      .catch(error => {
        console.error('Error logging out:', error);  // Log any errors that occur during logout
      });
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fluid fixed="top">
      <Navbar.Brand href="#home">MicroLend</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>

          {/* Conditional rendering based on user authentication */}
          {isUserValid ? (
            <>
              <Nav.Link as={Link} to="/apply/loan">Apply Loan</Nav.Link>
              <Nav.Link onClick={handleLogout} >Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/signup">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
