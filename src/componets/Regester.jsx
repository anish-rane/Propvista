import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', mobileNumber: '', password: '', role: 'Client' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.mobileNumber || !form.password) return false;
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) return false;
    if (!/^\d{10}$/.test(form.mobileNumber)) return false;
    if (!/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(form.password)) return false;
    //   {
    //   toast.error("Password must be at least 8 characters, contain a capital letter & special character.");
    //   return false;
    // }


    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return toast.error("Please fill all fields correctly.");

    try {
      await axios.post('http://localhost:8080/users/register', form);
      toast.success("Registered successfully");
      navigate('/');
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input type="text" className="form-control" name="firstName" value={form.firstName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input type="text" className="form-control" name="lastName" value={form.lastName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile</label>
          <input type="text" className="form-control" name="mobileNumber" value={form.mobileNumber} onChange={handleChange} required pattern="^\d{10}$"
  title="Mobile number must be exactly 10 digits"/>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required pattern="^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$"
  title="Password must be at least 8 characters, include one uppercase letter and one special character." />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-control" name="role" value={form.role} onChange={handleChange}>
            <option value="Admin">Admin</option>
            <option value="Agent">Agent</option>
            <option value="Client">Client</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;