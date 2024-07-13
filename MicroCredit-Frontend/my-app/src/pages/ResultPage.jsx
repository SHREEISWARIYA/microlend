import React from 'react';
import { useLocation } from 'react-router-dom';
import './ResultPage.css'; // Import the CSS file

const ResultPage = () => {
  // Get the current location object to access URL properties
  const location = useLocation();
  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);

  // Extract query parameters
  const result = {};
  for (const [key, value] of queryParams.entries()) {
    // Populate the result object with key-value pairs from query parameters
    result[key] = value;
  }

  // Determine eligibility based on the extracted parameters
  const isEligible = result.eligibility === 'Eligible';

  return (
    <div className="result-container">
      <h3>Loan Application Result</h3>
      <div className="result-message">
        {isEligible ? (
          <div className="eligible-message">Congratulations! You are eligible for the loan.</div>
        ) : (
          <div className="not-eligible-message">Sorry, you are not eligible for the loan.</div>
        )}
      </div>
      <div className="result-content">
        <div className="result-item">
          <span className="result-label">Eligibility:</span>
          <span className={`result-value ${isEligible ? 'eligible' : 'not-eligible'}`}>{result.eligibility}</span>
        </div>
        <div className="result-item">
          <span className="result-label">Max Loan Amount:</span>
          <span className="result-value">{result.max_loan_amount}</span>
        </div>
        <div className="result-item">
          <span className="result-label">Max Tenure (Months):</span>
          <span className="result-value">{result.max_tenure_months}</span>
        </div>
        <div className="result-item">
          <span className="result-label">EMI:</span>
          <span className="result-value">{result.emi}</span>
        </div>
        <div className="result-item">
          <span className="result-label">Risk Score:</span>
          <span className="result-value">{result.risk_score}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
