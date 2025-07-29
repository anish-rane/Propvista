import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const AgentDashboard = () => {
  const agentEmail = localStorage.getItem('email');

  const [listings, setListings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    bhkType: '',
    propertyType: '',
    depositPrice: '',
    location: '',
    description: '',
    ownerName: '',
    ownerContact: '',
    propertyStatus: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [interestedTenants, setInterestedTenants] = useState([]);

  useEffect(() => {
    fetchListings();
    fetchInterestedTenants();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await axios.get('http://localhost:8080/properties/list');
      setListings(res.data);
    } catch {
      toast.error('Error fetching properties');
    }
  };

  const fetchInterestedTenants = async () => {
    try {
      const res = await axios.get('http://localhost:8080/agents/interested-tenants');
      setInterestedTenants(res.data);
    } catch {
      toast.error('Error fetching interested tenants');
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = e => setImageFile(e.target.files[0]);

  const handleEdit = listing => {
    setForm({
      bhkType: listing.bhkType || '',
      propertyType: listing.propertyType || '',
      depositPrice: listing.depositPrice || '',
      location: listing.location || '',
      description: listing.description || '',
      ownerName: listing.ownerName || '',
      ownerContact: listing.ownerContact || '',
      propertyStatus: listing.propertyStatus || ''
    });
    setEditingId(listing.id);
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:8080/properties/delete/${id}`);
      toast.success('Property deleted');
      fetchListings();
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!agentEmail) {
      toast.error('Agent email not found');
      return;
    }

    const formData = new FormData();
    formData.append('email', agentEmail);
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (imageFile) formData.append('imageUrl', imageFile);

    try {
      const url = editingId
        ? `http://localhost:8080/properties/update/${editingId}`
        : 'http://localhost:8080/properties/create';
      const method = editingId ? 'put' : 'post';
      await axios[method](url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success(`Property ${editingId ? 'updated' : 'created'}!`);
      setForm({
        bhkType: '',
        propertyType: '',
        depositPrice: '',
        location: '',
        description: '',
        ownerName: '',
        ownerContact: '',
        propertyStatus: ''
      });
      setImageFile(null);
      setEditingId(null);
      fetchListings();
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit');
    }
  };

  const handleAccept = async (tenantId, propertyId) => {
    try {
      await axios.post(
        `http://localhost:8080/agents/interested-tenants/${tenantId}/accept`,
        { propertyId }
      );
      toast.success('Tenant accepted');
      fetchInterestedTenants();
      fetchListings();
    } catch {
      toast.error('Accept failed');
    }
  };
  const handleReject = async tenantId => {
    try {
      await axios.post(
        `http://localhost:8080/agents/interested-tenants/${tenantId}/reject`
      );
      toast.success('Tenant rejected');
      fetchInterestedTenants();
    } catch {
      toast.error('Reject failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Agent Dashboard - {editingId ? 'Edit' : 'Add'} Property</h2>

      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow mb-5"
        encType="multipart/form-data"
      >
        <div className="row g-3">
          {/* BHK Type: now "1BHK"–"9BHK" */}
          <div className="col-md-6">
            <select
              className="form-control"
              name="bhkType"
              value={form.bhkType}
              onChange={handleChange}
              required
            >
              <option value="">Select BHK Type</option>
              {[0,1,2,3,4,5,6,7,8,9].map(n => (
                <option key={n} value={`${n}BHK`}>{`${n}BHK`}</option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div className="col-md-6">
            <select
              className="form-control"
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              required
            >
              <option value="">Select Property Type</option>
              {['Apartment','House','Villa','Land','Commercial'].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Deposit */}
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              name="depositPrice"
              value={form.depositPrice}
              placeholder="Deposit Price"
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="location"
              value={form.location}
              placeholder="Location"
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="description"
              value={form.description}
              placeholder="Description"
              onChange={handleChange}
              required
            />
          </div>

          {/* Owner Name */}
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="ownerName"
              value={form.ownerName}
              placeholder="Owner Name"
              onChange={handleChange}
              required
            />
          </div>

          {/* Owner Contact */}
          <div className="col-md-6">
            <input
              type="tel"
              className="form-control"
              name="ownerContact"
              value={form.ownerContact}
              placeholder="Owner Contact"
              onChange={handleChange}
              required
            />
          </div>

          {/* Status */}
          <div className="col-md-6">
            <select
              className="form-control"
              name="propertyStatus"
              value={form.propertyStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              {['Available','Sold','Rented'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div className="col-md-6">
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              required={!editingId}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          {editingId ? 'Update Property' : 'Create Property'}
        </button>
      </form>

      <h4>My Property Listings</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>BHK</th><th>Type</th><th>Location</th><th>Price</th>
            <th>Description</th><th>Owner</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.length === 0
            ? <tr><td colSpan="8" className="text-center">No properties found.</td></tr>
            : listings.map(l => (
              <tr key={l.id}>
                <td>{l.bhkType}</td>
                <td>{l.propertyType}</td>
                <td>{l.location}</td>
                <td>{l.depositPrice}</td>
                <td>{l.description}</td>
                <td>{l.ownerName}</td>
                <td>{l.propertyStatus}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(l)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(l.id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <h4 className="mt-5">Interested Tenants</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th><th>Email</th><th>Mobile</th>
            <th>Property ID</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interestedTenants.length === 0
            ? <tr><td colSpan="7" className="text-center">No tenants found.</td></tr>
            : interestedTenants.map(t => {
              const propertyId = t.propertyId || t.property_id;
              return (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.email}</td>
                  <td>{t.mobileNumber || t.mobile_number}</td>
                 
                  <td>{propertyId}</td>
                  <td>{t.status}</td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={() => handleAccept(t.id, propertyId)}>Accept</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleReject(t.id)}>Reject</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default AgentDashboard;
