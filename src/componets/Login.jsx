import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Client');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in all fields.");

    try {
      const res = await axios.post('http://localhost:8080/users/login', {
        email,
        password,
        role,
      });

      // Assuming backend returns name and mobileNumber
      const { name, mobileNumber } = res.data;

      localStorage.setItem('role', role);
      localStorage.setItem('email', email);
      localStorage.setItem('name', name);
      localStorage.setItem('mobileNumber', mobileNumber);

      toast.success("Login successful");
      navigate('/dashboard');
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Agent">Agent</option>
            <option value="Client">Client</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <p className="mt-3">
          New user? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
