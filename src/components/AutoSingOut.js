import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../reducer/services/AuthService'; // Import your logOut action
import { useNavigate } from 'react-router-dom';

const AutoSignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;

    // Function to handle sign-out
    const handleSignOut = () => {
      console.log('User signed out due to inactivity');
      dispatch(logOut()); // Sign the user out using your redux action
      navigate('/signIn'); // Redirect to the sign-in page
    };

    // Function to reset the inactivity timer
    const resetTimer = () => {
      clearTimeout(timeoutId); // Clear previous timeout
      timeoutId = setTimeout(handleSignOut, 29 * 60 * 1000); // Set a new timeout for 29 minutes
    };

    // Add event listeners for user activities
    const activities = ['mousemove', 'keydown', 'click', 'scroll'];
    activities.forEach(event => window.addEventListener(event, resetTimer));

    // Start the initial timer when the component mounts
    resetTimer();

    // Cleanup event listeners and timeout when the component unmounts
    return () => {
      activities.forEach(event => window.removeEventListener(event, resetTimer));
      clearTimeout(timeoutId); // Clear timeout on component unmount
    };
  }, [dispatch, navigate]);

  return null; // This component does not render anything
};

export default AutoSignOut;
