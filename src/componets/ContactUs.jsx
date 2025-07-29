import React from 'react';
import './Contact.css'; 

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>If you have any questions or suggestions, feel free to reach out!</p>
      <ul className="contact-details">
        <li><strong>Email:</strong> PropVista@realestate.com</li>
        <li><strong>Phone:</strong> +91-9876543210</li>
        <li><strong>Address:</strong> CDAC Kharghar, Navi Mumbai</li>
      </ul>

      <div className="map-container">
        <iframe
          title="CDAC Kharghar Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.842484796345!2d73.05085917336699!3d19.026661353523178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c30013dec4f7%3A0xabeb9000144d6ca1!2sCDAC%20KHARGHAR!5e0!3m2!1sen!2sin!4v1749454121095!5m2!1sen!2sin"
          width="80%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      
    </div>

    
  );
};

export default ContactUs;