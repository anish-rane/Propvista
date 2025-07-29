import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ClientDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [myInterests, setMyInterests] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState(null);

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const mobileNumber = localStorage.getItem("mobileNumber");

  const fetchProperties = async () => {
    try {
      const res = await axios.get('http://localhost:8080/properties/list');
      const updated = res.data.map(property => ({
        ...property,
        imageUrl: property.imageUrl ? `data:image/jpeg;base64,${property.imageUrl}` : null,
      }));
      setProperties(updated);
    } catch (error) {
      toast.error('Failed to fetch properties');
    }
  };

  const fetchMyInterests = async () => {
    try {
      const res = await axios.get('http://localhost:8080/agents/interested-tenants');
      setMyInterests(res.data);
    } catch (error) {
      toast.error('Failed to fetch your interests');
    }
  };

  useEffect(() => {
    fetchProperties();
    fetchMyInterests();
  }, []);

  const handleShowInterest = async (propertyId) => {
    if (!name || !email || !mobileNumber) {
      toast.error("Missing user information. Please login again.");
      return;
    }

    try {
      await axios.post('http://localhost:8080/agents/interested-tenants', {
        name,
        email,
        mobileNumber,
        propertyId
      });
      toast.success('Interest shown successfully');
      fetchMyInterests();
    } catch (error) {
      toast.error('Failed to show interest');
    }
  };

  const handleBuyProperty = async (property) => {
    try {
      const transactionData = {
        buyerName: name,
        buyerEmail: email,
        propertyId: property.id,
        propertyTitle: property.title,
        amount: property.depositPrice
      };

      const response = await axios.post('http://localhost:8080/transactions/save', transactionData);
      setReceiptDetails(response.data);
      setShowReceipt(true);
      toast.success("Transaction successful!");
    } catch (error) {
      toast.error("Transaction failed");
    }
  };

  const isInterested = (propertyId) => myInterests.some(i => i.propertyId === propertyId);
  const interestStatus = (propertyId) => isInterested(propertyId) ? 'Interest Shown' : 'Not Interested';

  return (
    <div className="container mt-5">
      <h2>Client Dashboard</h2>
      <section>
        <h4>Available Properties</h4>
        {properties.length === 0 ? (
          <p>No properties available currently.</p>
        ) : (
          <div className="row">
            {properties.map((property) => (
              <div key={property.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  {property.imageUrl && (
                    <img
                      src={property.imageUrl}
                      className="card-img-top"
                      alt={property.title}
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{property.title}</h5>
                    <p className="card-text">Location: {property.location}</p>
                    <p className="card-text">Deposit Price: ₹{property.depositPrice}</p>
                    <p className="card-text">Description: {property.description}</p>
                    <p className="card-text">
                      Interest Status: <strong>{interestStatus(property.id)}</strong>
                    </p>
                    {!isInterested(property.id) && (
                      <button className="btn btn-primary mb-2" onClick={() => handleShowInterest(property.id)}>
                        Show Interest
                      </button>
                    )}
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal for receipt */}
      <Modal show={showReceipt} onHide={() => setShowReceipt(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {receiptDetails && (
            <>
              <p><strong>Transaction ID:</strong> {receiptDetails.id}</p>
              <p><strong>Buyer:</strong> {receiptDetails.buyerName}</p>
              <p><strong>Email:</strong> {receiptDetails.buyerEmail}</p>
              <p><strong>Property:</strong> {receiptDetails.propertyTitle}</p>
              <p><strong>Amount:</strong> ₹{receiptDetails.amount}</p>
              <p><strong>Date:</strong> {new Date(receiptDetails.timestamp).toLocaleString()}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReceipt(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClientDashboard;
