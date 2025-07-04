import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from '/src/assets/logo.png';

const Signup = () => {
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm your password'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      alert(response.data.message || 'Registration successful!');
      resetForm();
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#f2f4f6',
        padding: '20px',
      }}
    >
      <div
        className="row shadow-lg rounded-4 overflow-hidden bg-white"
        style={{
          maxWidth: '900px',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {/* Left Side – Branding */}
        <div
          className="col-md-6 d-none d-md-flex align-items-center justify-content-center"
          style={{
            backgroundColor: '#0d6efd',
            padding: '40px',
            flexDirection: 'column',
          }}
        >
          <img src={logo} alt="App Logo" style={{ width: '150px', marginBottom: '20px' }} />
          <h3 className="text-white text-center">Join Us Today</h3>
          <p className="text-light text-center px-3">
            Sign up to explore the full experience of our platform.
          </p>
        </div>

        {/* Right Side – Form */}
        <div className="col-md-6 p-5">
          <h3 className="mb-4 text-center text-dark fw-bold">Create Your Account</h3>

          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Username</label>
                  <Field
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Choose a username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger small mt-1"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger small mt-1"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger small mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Re-enter your password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger small mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing up...' : 'Sign Up'}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-4">
            <p className="text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-primary fw-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
