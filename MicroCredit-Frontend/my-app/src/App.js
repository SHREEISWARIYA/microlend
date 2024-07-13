import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoanForm from './pages/LoanForm';
import ApplyLoanForm from './pages/ApplyLoan';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './pages/NavBar';
import useCheckUser from './checkUser';
import ResultPage from './pages/ResultPage';

function App() {
  // Call the useCheckUser hook to determine if the user status is being checked and if the user is valid
  const { isUserChecked, isUserValid } = useCheckUser();
  // Log the user status for debugging purposes
  console.log(isUserChecked,isUserValid)

  // Display a loading message or spinner if user status is still being checked
  if (!isUserChecked) {
    return <div>Loading...</div>; // Loading state while checking user authentication
  }

  return (
    <Router>
      {/* Render the navigation bar for the application */}
      <NavBar />
      <div style={{ marginTop: '56px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Conditional rendering based on user authentication */}
          {(!isUserValid) ? (   
            <>
              <Route path="/signup" element={<LoanForm />} />
              <Route path="/login" element={<Login />} />
            </>
          ) : (
            <Route path="/apply/loan" element={<ApplyLoanForm />} />
          )}
          {/* Route for displaying loan application results */}
          <Route path="/result" element={<ResultPage />} />  
          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
