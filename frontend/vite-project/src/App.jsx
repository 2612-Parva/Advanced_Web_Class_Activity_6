import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/SignUp';
import './App.css';

function App() {
  const token = localStorage.getItem('token'); // Used for protected route check

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Route Example */}
        <Route
          path="/product"
          element={token ? <Product /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
