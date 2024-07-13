import { useEffect, useState } from 'react';
import axios from 'axios';

function useCheckUser() {
  // State to track if the user has been checked
  const [isUserChecked, setIsUserChecked] = useState(false);
  // State to track if the user is valid
  const [isUserValid, setIsUserValid] = useState(false);

  useEffect(() => {
    // Make an API request to check user validity when the component mounts or isUserValid changes
    axios.get('http://localhost:8000/api/checkuser/', { withCredentials: true })
      .then(response => {
        // Log the response data for debugging
        console.log(response.data);
        // Set the user checked state to true
        setIsUserChecked(true); 
        // Assume response.data contains a field 'isValidUser'
        setIsUserValid(response.data.isValidUser); // Assume response.data contains a field 'isValidUser'
      })
      .catch(error => {
        // Log any errors for debugging
        console.error('Error checking user:', error);
        // Set the user checked state to true even if there's an error
        setIsUserChecked(true);
        // Mark user as invalid if there's an error
        setIsUserValid(false);
      });
  }, [isUserValid]);  // Dependency array; effect will run when isUserValid changes

   // Return the user's checked status and validity state
  return { isUserChecked, isUserValid };
}

export default useCheckUser;
