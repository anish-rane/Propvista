import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNumber: '',
    role: 'Client',
  });
  const [editing, setEditing] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/admin/users');
      setUsers(res.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:8080/admin/users/${form.id}`, form);
        toast.success('User updated successfully');
      } else {
        await axios.post('http://localhost:8080/admin/users', form);
        toast.success('User added successfully');
      }
      setForm({
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobileNumber: '',
        role: 'Client',
      });
      setEditing(false);
      fetchUsers();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditing(true);
  };

  const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this user?')) {
    try {
      await axios.delete(`http://localhost:8080/admin/users/${id}`);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Delete failed');
    }
  }
};


  return (
    <div className="container mt-5">
      <h2>Admin Dashboard - Manage Users</h2>
      <form onSubmit={handleSubmit} className="mb-4 col-md-6">
        <div className="mb-2">
          <label className="form-label">First Name</label>
          <input name="firstName" className="form-control" value={form.firstName} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label className="form-label">Last Name</label>
          <input name="lastName" className="form-control" value={form.lastName} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label className="form-label">Mobile</label>
          <input name="mobileNumber" className="form-control" value={form.mobileNumber} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label className="form-label">Role</label>
          <select name="role" className="form-control" value={form.role} onChange={handleChange}>
            <option value="Admin">Admin</option>
            <option value="Agent">Agent</option>
            <option value="Client">Client</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">{editing ? 'Update User' : 'Add User'}</button>
        {editing && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditing(false);
              setForm({
                id: null,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                mobileNumber: '',
                role: 'Client',
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h3>All Users</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && <tr><td colSpan="6">No users found</td></tr>}
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
