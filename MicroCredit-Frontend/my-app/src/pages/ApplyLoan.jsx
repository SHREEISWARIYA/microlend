import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import ExpenseModal from './ExpenseModal';
import axios from 'axios';
import './ApplyLoan.css';

const ApplyLoanForm = () => {
  // State variables for each form field
  const [pan, setPan] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [numberOfDependents, setNumberOfDependents] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [current_salary, setcurrent_salary] = useState('');
  const [previous_salary, setprevious_salary] = useState('');
  const [previous_hike, setprevious_hike] = useState('');
  const [estimated_hike, setestimated_hike] = useState('');
  const [ownHouse, setOwnHouse] = useState(false);
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [existingLoans, setExistingLoans] = useState(false);
  const [existingloanamount, setexistingloanamount] = useState('');
  const [existing_emi_for_loan, setexisting_emi_for_loan] = useState('');
  const [loanfrom, setLoanfrom] = useState('');
  const [creditscore, setcreditscore] = useState(0);
  const [loan_amount_requested, setloan_amount_requested] = useState('');
  const [loan_tenure_requested, setloan_tenure_requested] = useState('');
  const [name, setName] = useState('');

  // State to manage the modal visibility for adding expenses
  const [showModal, setShowModal] = useState(false);
  const [active,setActive]= useState(true); // To manage button state

  // Function to open the expense modal
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Function to save the expense from the modal
  const handleSaveExpense = (expense) => {
    setMonthlyExpenses(Number(expense));
  };

  // Fetch PAN on component mount
  useEffect(() => {
    axios.get('http://localhost:8000/api/pan/', { withCredentials: true })
      .then(response => {
        setPan(response.data.pan);
      })
      .catch(error => {
        console.error('Error checking user:', error);
      });
  }, []);

  // Validate form data structure and types
  const validateForm = (formData) => {
    const expectedStructure = {
      gender: "string",
      marital_status: "string",
      number_of_dependents: "number",
      employer_name: "string",
      occupation: "string",
      current_salary: "number",
      previous_salary: "number",
      previous_hike: "string", // date as string
      estimated_hike: "string", // date as string
      own_house: "boolean",
      monthly_expenses: "number",
      existing_loans: "boolean",
      existing_loan_amount: "number",
      existing_emi_for_loan: "number",
      loan_from: "string",
      credit_score: "number",
      loan_amount_requested: "number",
      loan_tenure_requested: "number",
      pan: "string",
    };
    console.log(formData)

    // Check if formData matches the expected structure
    for (const [key, expectedType] of Object.entries(expectedStructure)) {
      const actualType = typeof formData[key];
      if (expectedType === "number" && (isNaN(formData[key]) || formData[key] === '')) {
        return false; // Handle empty or NaN for numbers
      }
      if (actualType !== expectedType) {
        console.error(`Type mismatch for ${key}: expected ${expectedType}, got ${actualType}`);
        return false;
      }
    }
    return true;
  };

  // Fetch name on component mount
  useEffect(() => {
    axios.get('http://localhost:8000/api/name/', { withCredentials: true })
      .then(response => {
        setName(response.data.name);
      })
      .catch(error => {
        console.error('Error checking user:', error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const formData = {
      pan,
      gender,
      marital_status: maritalStatus,
      number_of_dependents: Number(numberOfDependents),
      employer_name: employerName,
      occupation,
      current_salary: Number(current_salary),
      previous_salary: Number(previous_salary),
      previous_hike,
      estimated_hike,
      own_house: ownHouse,
      monthly_expenses: Number(monthlyExpenses),
      existing_loans: existingLoans,
      existing_loan_amount: Number(existingloanamount),
      existing_emi_for_loan: Number(existing_emi_for_loan),
      loan_from: loanfrom,
      credit_score: Number(creditscore),
      loan_amount_requested: Number(loan_amount_requested),
      loan_tenure_requested: Number(loan_tenure_requested),
    };
    
    // Validate form data
    const isValid = validateForm(formData);

    if (!isValid) {
      // Here, you can display alerts for missing fields if needed
      window.alert('Please fill in all required fields correctly.');
      return;
    }
    console.log('Form Data:', formData);

    const url = 'http://localhost:8000/api/insert_loan_details/';

    try {
      setActive(false);  // Disable the button during submission
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        withCredentials: true,
      });

      console.log(response.data.result);
      window.alert('Loan application submitted successfully!');

      // Redirect to a new page with response data in query params
      const queryParams = new URLSearchParams(response.data.result).toString();
      window.location.href = `/result?${queryParams}`;

      clearFormFields();
    } catch (error) {
      console.error('Error submitting loan application:', error.response ? error.response.data : error.message);
      window.alert('Error submitting loan application. Please try again.');
      clearFormFields();
    }
  };

  // Clear form fields after submission
  const clearFormFields = () => {
    
    setGender('');
    setMaritalStatus('');
    setNumberOfDependents('');
    setEmployerName('');
    setOccupation('');
    setcurrent_salary('');
    setprevious_salary('');
    setprevious_hike('');
    setestimated_hike('');
    setOwnHouse('');
    setMonthlyExpenses('');
    setExistingLoans('');
    setexistingloanamount('');
    setexisting_emi_for_loan('');
    setLoanfrom('');
    setcreditscore('');
    setloan_amount_requested('');
    setloan_tenure_requested('');
  };

  // Function to retrieve CSRF token for secure requests
  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };

  return (
    <div><br/>
      <center>
        <h3 className="my-4">Welcome {name}! Apply for a Loan</h3>
      </center> 
      {/* This form enables the user to apply for a loan */}
      <Form className="registerform" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="pan">
          <Row className="align-items-center">
            <Form.Label column sm="4">PAN:</Form.Label>
            <Col sm="8">
              {pan}
            </Col>
          </Row>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="gender">
          <Row className="align-items-center">
            <Form.Label column sm="4">Gender:</Form.Label>
            <Col sm="8">
              <div className="d-flex align-items-center">
                <Form.Check
                  inline
                  label="Female"
                  type="radio"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                <Form.Check
                  inline
                  label="Male"
                  type="radio"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
              </div>
            </Col>
          </Row>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="maritalStatus">
          <Row className="align-items-center">
            <Form.Label column sm="4">Marital Status:</Form.Label>
            <Col sm="8">
              <Form.Control
                as="select"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
                required
              >
                <option value="">Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </Form.Control>
            </Col>
          </Row>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="numberOfDependents">
          <Row className="align-items-center">
            <Form.Label column sm="4">Number of Dependents:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                value={numberOfDependents}
                onChange={(e) => setNumberOfDependents(e.target.value)}
                placeholder="Enter Number of Dependents"
                required
              />
            </Col>
          </Row>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="employerName">
          <Row className="align-items-center">
            <Form.Label column sm="4">Employer Name:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
                placeholder="Enter Employer Name"
                required
              />
            </Col>
          </Row>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="occupation">
          <Row className="align-items-center">
            <Form.Label column sm="4">Occupation:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="Enter Occupation"
                required
              />
            </Col>
          </Row>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="current_salary">
          <Row className="align-items-center">
            <Form.Label column sm="4">Current Salary:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                value={current_salary}
                onChange={(e) => setcurrent_salary(e.target.value)}
                placeholder="Enter Current Salary"
                required
              />
            </Col>
          </Row>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="previous_salary">
          <Row className="align-items-center">
            <Form.Label column sm="4">Previous Salary:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                value={previous_salary}
                onChange={(e) => setprevious_salary(e.target.value)}
                placeholder="Enter Previous Salary"
                required
              />
            </Col>
          </Row>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="previous_hike">
          <Row className="align-items-center">
            <Form.Label column sm="4">Previous Hike:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="date"
                value={previous_hike}
                onChange={(e) => setprevious_hike(e.target.value)}
                placeholder="Enter Previous Hike Percentage"
                required
              />
            </Col>
          </Row>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="estimated_hike">
          <Row className="align-items-center">
            <Form.Label column sm="4">Estimated Hike:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="date"
                value={estimated_hike}
                onChange={(e) => setestimated_hike(e.target.value)}
                placeholder="Enter Estimated Hike "
                required
              />
            </Col>
          </Row>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="ownHouse">
          <Row className="align-items-center">
            <Form.Label column sm="4">Own House:</Form.Label>
            <Col sm="8">
              <div className="d-flex align-items-center">
                <Form.Check
                  inline
                  label="Yes"
                  type="radio"
                  value="yes"
                  checked={ownHouse === true }
                  onChange={(e) => setOwnHouse(true)}
                />
                <Form.Check
                  inline
                  label="No"
                  type="radio"
                  value="no"
                  checked={ownHouse === false}
                  onChange={(e) => setOwnHouse(false)}
                />
              </div>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="monthlyExpenses">
        <Row className="align-items-center">
        <Form.Label column sm="4">Monthly Expenses:</Form.Label>
        <Col sm="8">
        <Form.Control
        type="number"
        value={monthlyExpenses}
        readOnly
        onClick={handleOpenModal} // Open modal on click
        required
        />
        </Col>
        </Row>
      </Form.Group>

      <ExpenseModal show={showModal} handleClose={handleCloseModal} handleSave={handleSaveExpense} />

      <Form.Group className="mb-3" controlId="existingLoans">
      <Row className="align-items-center">
      <Form.Label column sm="4">Existing Loans:</Form.Label>
      <Col sm="8">
      <div className="d-flex align-items-center">
        <Form.Check
          inline
          label="Yes"
          type="radio"
          value="yes"
          checked={existingLoans === true}
          onChange={(e) => setExistingLoans(true)}
        />
        <Form.Check
          inline
          label="No"
          type="radio"
          value="no"
          checked={existingLoans === false}
          onChange={(e) => setExistingLoans(false)}
        />
      </div>
    </Col>
    </Row>
    </Form.Group>

  
        <Form.Group className="mb-3" controlId="existing_loan_amount">
          <Row className="align-items-center">
            <Form.Label column sm="4">Existing Loan Amount:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                value={existingloanamount}
                onChange={(e) => setexistingloanamount(e.target.value)}
                placeholder="Enter Existing Loan Amount"
                required
              />
            </Col>
          </Row>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="existing_emi_for_loan">
          <Row className="align-items-center">
            <Form.Label column sm="4">Existing EMI for Loan:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                value={existing_emi_for_loan}
                onChange={(e) => setexisting_emi_for_loan(e.target.value)}
                placeholder="Enter Existing EMI for Loan"
                required
              />
            </Col>
          </Row>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="loanfrom">
          <Row className="align-items-center">
            <Form.Label column sm="4">Loan From:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                value={loanfrom}
                onChange={(e) => setLoanfrom(e.target.value)}
                placeholder="Enter Loan From"
                required
              />
            </Col>
          </Row>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="creditscore">
          <Row className="align-items-center">
            <Form.Label column sm="4">Credit Score:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                value={creditscore}
                onChange={(e) => setcreditscore(e.target.value)}
                placeholder="Enter Credit Score"
                required
              />
            </Col>
          </Row>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="loan_amount_requested">
          <Row className="align-items-center">
            <Form.Label column sm="4">Loan Amount Requested(3 to 5 lakhs):</Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                value={loan_amount_requested}
                onChange={(e) => setloan_amount_requested(e.target.value)}
                placeholder="Enter Loan Amount Requested"
                required
              />
            </Col>
          </Row>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="loan_tenure_requested">
  <Row className="align-items-center">
    <Form.Label column sm="4">Loan Tenure Requested:</Form.Label>
    <Col sm="8">
      <Form.Control
        as="select"
        value={loan_tenure_requested}
        onChange={(e) => setloan_tenure_requested(e.target.value)}
        required
      >
        <option value="">Select Loan Tenure</option>
        <option value="24">24 months</option>
        <option value="30">30 months</option>
        <option value="36">36 months</option>
        <option value="42">42 months</option>
        <option value="48">48 months</option>
        <option value="54">54 months</option>
        <option value="60">60 months</option>
      </Form.Control>
    </Col>
    </Row>
    </Form.Group>
        <center>
          <Button variant="primary" type="submit" disabled={!active}>Apply Loan</Button>
        </center>
    </Form>
    </div>
  );
};

export default ApplyLoanForm; 