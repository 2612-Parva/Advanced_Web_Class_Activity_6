import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from '/src/assets/logo.png';

const Login = () => {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      navigate('/product');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
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
        {/* Left Side – Branding / Logo */}
        <div
          className="col-md-6 d-none d-md-flex align-items-center justify-content-center"
          style={{
            backgroundColor: '#0d6efd',
            padding: '40px',
            flexDirection: 'column',
          }}
        >
          <img src={logo} alt="App Logo" style={{ width: '150px', marginBottom: '20px' }} />
          <h3 className="text-white text-center">Welcome Back</h3>
          <p className="text-light text-center px-3">
            Login to continue exploring amazing features.
          </p>
        </div>

        {/* Right Side – Form */}
        <div className="col-md-6 p-5">
          <h3 className="mb-4 text-center text-dark fw-bold">Login to Your Account</h3>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
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

                <div className="mb-4">
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

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-4">
            <p className="text-muted">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary fw-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
