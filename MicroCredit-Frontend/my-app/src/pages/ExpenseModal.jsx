// ExpenseModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Define the ExpenseModal component which is used in the apply loan form
const ExpenseModal = ({ show, handleClose, handleSave }) => {
  // Initialize the state for expenses with default values
  const initialExpensesState = {
    electricity: 0,
    grocery: 0,
    diningOut: 0,
    mallVisits: 0,
    medical: 0,
    entertainment: 0,
    educationFees: 0,
    otherExpenses: 0,
   
  };

  // State to manage the current expenses input
  const [expenses, setExpenses] = useState({ ...initialExpensesState });

  // Handle form submission to calculate total expenses
  const handleSubmit = () => {
    // Calculate the total expense by summing all individual expense fields
    const totalExpense =
      parseFloat(expenses.electricity) +
      parseFloat(expenses.grocery) +
      parseFloat(expenses.diningOut) +
      parseFloat(expenses.mallVisits) +
      parseFloat(expenses.medical) +
      parseFloat(expenses.entertainment) +
      parseFloat(expenses.educationFees) +
      parseFloat(expenses.otherExpenses);

    // Call the handleSave function passed from the parent to save total expense
    handleSave(totalExpense);
    // Close the modal after saving
    handleClose();
    // Reset all fields to their initial state
    setExpenses({ ...initialExpensesState }); // Reset all fields to initial state
  };

  // Handle changes to the input fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setExpenses({ ...expenses, [id]: parseFloat(value) });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Monthly Expenses</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* This form is used for calculating the total expense */}
        <Form>
          <Form.Group controlId="electricity">
            <Form.Label>Electricity</Form.Label>
            <Form.Control
              type="number"
              value={expenses.electricity}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="grocery">
            <Form.Label>Grocery</Form.Label>
            <Form.Control
              type="number"
              value={expenses.grocery}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="diningOut">
            <Form.Label>Dining Out</Form.Label>
            <Form.Control
              type="number"
              value={expenses.diningOut}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="mallVisits">
            <Form.Label>Mall Visits</Form.Label>
            <Form.Control
              type="number"
              value={expenses.mallVisits}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="medical">
            <Form.Label>Medical Expenses</Form.Label>
            <Form.Control
              type="number"
              value={expenses.medical}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="entertainment">
            <Form.Label>Entertainment</Form.Label>
            <Form.Control
              type="number"
              value={expenses.entertainment}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="educationFees">
            <Form.Label>Education Fees</Form.Label>
            <Form.Control
              type="number"
              value={expenses.educationFees}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="otherExpenses">
            <Form.Label>Other Expenses</Form.Label>
            <Form.Control
              type="number"
              value={expenses.otherExpenses}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExpenseModal;





