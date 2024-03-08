import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './App.css';

function RegistrationForm() {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      fullName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      phoneNumber: '',
      termsAccepted: false,
      privacyPolicyAccepted: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      userName: Yup.string().required('User Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      phoneNumber: Yup.string().required('Phone Number is required'),
      termsAccepted: Yup.bool().oneOf([true], 'Accepting terms is required'),
      privacyPolicyAccepted: Yup.bool().oneOf([true], 'Accepting the privacy policy is required'),
    }),

    
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      //console.log("Entering form submission")
      setSubmitting(true);
      try {
        const response = await axios.post('http://localhost:3000/register', values);
        if (response.status === 201) {
          //console.log("Registration successful:", response.data);
          // Handle successful registration (e.g., redirect to login, show success message, etc.)
          setMessage('Registration successful.');
          setIsError(false);
          resetForm();
        } else {
          //console.error("Unexpected response:", response);
          // Handle other response statuses or show an error message
          setMessage('Unexpected response from the server.');
          setIsError(true);
        }
      } catch (error) {
        // Check if error response is available (which should be in case of HTTP errors like 500)
        if (error.response) {
          // You can customize the message based on error.response.status if needed
          setMessage(error.response.data.message || 'An error occurred while registering.');
          setIsError(true);
        } else {
          // For errors not related to HTTP requests (like network issues)
          setMessage('Failed to send request. Please check your network.');
          setIsError(true);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleReset = () => {
    formik.resetForm();
    setMessage(''); // Clear any displayed messages
    setIsError(false);
  };


  return (
    <div className="registration-form">
      <h2>Register for Green Energy Management Platform</h2>
      <p>Join our platform and manage your green energy resources effectively.</p>

      {message && (
        <div className={isError ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={formik.handleChange}
          value={formik.values.fullName}
        />
        {formik.errors.fullName ? <div>{formik.errors.fullName}</div> : null}

        <input
          type="text"
          name="userName"
          placeholder="User Name"
          onChange={formik.handleChange}
          value={formik.values.userName}
        />
        {formik.errors.userName ? <div>{formik.errors.userName}</div> : null}

        <input
          type="email"
          name="email"
          placeholder="johndoe@example.com"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        {formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}

        <input
          type="text"
          name="companyName"
          placeholder="Company Name (Optional)"
          onChange={formik.handleChange}
          value={formik.values.companyName}
        />

        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={formik.handleChange}
          value={formik.values.phoneNumber}
        />
        {formik.errors.phoneNumber ? <div>{formik.errors.phoneNumber}</div> : null}

        <label>
          <input
            type="checkbox"
            name="termsAccepted"
            onChange={formik.handleChange}
            checked={formik.values.termsAccepted}
          />
          I agree to the Terms and Conditions.
        </label>
        {formik.errors.termsAccepted ? <div>{formik.errors.termsAccepted}</div> : null}

        <label>
          <input
            type="checkbox"
            name="privacyPolicyAccepted"
            onChange={formik.handleChange}
            checked={formik.values.privacyPolicyAccepted}
          />
          I have read and accept the Privacy Policy.
        </label>
        {formik.errors.privacyPolicyAccepted ? <div>{formik.errors.privacyPolicyAccepted}</div> : null}

        <div className="form-actions">
          <button type="submit" disabled={formik.isSubmitting}>Register</button>
          <button type="button" onClick={handleReset} disabled={formik.isSubmitting}>Clear</button>
        </div>
      </form>

      <p>
        Already have an account? <a href="/login">Log in here</a>.
      </p>
    </div>
  );
};

export default RegistrationForm;
