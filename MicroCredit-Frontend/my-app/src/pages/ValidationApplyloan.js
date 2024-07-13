// ValidationApplyLoan.js

const validateForm = (formData) => {
  const errors = {};

  if (!formData.gender) {
    errors.gender = "Gender is required.";
  }

  if (!formData.marital_status) {
    errors.marital_status = "Marital status is required.";
  }

  if (isNaN(formData.number_of_dependents) || formData.number_of_dependents < 0) {
    errors.number_of_dependents = "Number of dependents must be a non-negative number.";
  }

  if (!formData.employer_name) {
    errors.employer_name = "Employer name is required.";
  }

  if (!formData.occupation) {
    errors.occupation = "Occupation is required.";
  }

  if (isNaN(formData.current_salary) || formData.current_salary <= 0) {
    errors.current_salary = "Current salary must be a positive number.";
  }

  if (isNaN(formData.previous_salary) || formData.previous_salary <= 0) {
    errors.previous_salary = "Previous salary must be a positive number.";
  }

  if (!formData.previous_hike) {
    errors.previous_hike = "Previous hike date is required.";
  }

  if (!formData.estimated_hike) {
    errors.estimated_hike = "Estimated hike date is required.";
  }

  if (typeof formData.own_house !== "boolean") {
    errors.own_house = "Own house status is required.";
  }

  if (isNaN(formData.monthly_expenses) || formData.monthly_expenses < 0) {
    errors.monthly_expenses = "Monthly expenses must be a non-negative number.";
  }

  if (typeof formData.existing_loans !== "boolean") {
    errors.existing_loans = "Existing loans status is required.";
  }

  if (isNaN(formData.existing_loan_amount) || formData.existing_loan_amount < 0) {
    errors.existing_loan_amount = "Existing loan amount must be a non-negative number.";
  }

  if (isNaN(formData.existing_emi_for_loan) || formData.existing_emi_for_loan < 0) {
    errors.existing_emi_for_loan = "Existing EMI for loan must be a non-negative number.";
  }

  if (!formData.loan_from) {
    errors.loan_from = "Loan from is required.";
  }

  if (isNaN(formData.credit_score) || formData.credit_score < 0 || formData.credit_score > 900) {
    errors.credit_score = "Credit score must be between 0 and 900.";
  }

  if (isNaN(formData.loan_amount_requested) || formData.loan_amount_requested <= 0) {
    errors.loan_amount_requested = "Loan amount requested must be a positive number.";
  }

  if (isNaN(formData.loan_tenure_requested) || formData.loan_tenure_requested <= 0) {
    errors.loan_tenure_requested = "Loan tenure requested must be a positive number.";
  }

  return errors;
};

export default validateForm;
