import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './App.css';

function RegistrationForm() {
  const formik = useFormik({
    initialValues: {
      fullName: '',
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
    onSubmit: async (values, { setSubmitting }) => {
        try {
          const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          // Handle success - you might want to redirect the user or clear the form
          console.log('Registration successful:', await response.json());
        } catch (error) {
          console.error('Registration failed:', error);
        } finally {
          setSubmitting(false);
        }
      },
    });

  return (
    <div className="registration-form">
      <h2>Register for Green Energy Management Platform</h2>
      <p>Join our platform and manage your green energy resources effectively.</p>

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

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <a href="/login">Log in here</a>.
      </p>
    </div>
  );
};

export default RegistrationForm;
