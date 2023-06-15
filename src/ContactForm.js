import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setSubmitted(true);
  };

  const validateForm = () => {
    const errors = {};

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!phone) {
      errors.phone = 'Phone is required';
    } else if (!isValidPhone(phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!message) {
      errors.message = 'Message is required';
    }

    if (!image) {
      errors.image = 'Image is required';
    }

    return errors;
  };

  const isValidEmail = (value) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(value);
  };

  const isValidPhone = (value) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(value);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setImage(null);
    setSubmitted(false);
    setErrors({});
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="container">
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={name} onChange={handleNameChange} />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={email} onChange={handleEmailChange} />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="tel" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} value={phone} onChange={handlePhoneChange} />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>
          <div className="form-group">
            <label>Message:</label>
            <textarea className={`form-control ${errors.message ? 'is-invalid' : ''}`} value={message} onChange={handleMessageChange}></textarea>
            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
          </div>
          <br/>
          <div className="form-group">
            <label>Image:</label>
            <input type="file" className={`form-control-file ${errors.image ? 'is-invalid' : ''}`} onChange={handleImageChange} />
            {errors.image && <div className="invalid-feedback">{errors.image}</div>}
          </div>
          <br/>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      ) :  (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Contact Details</h2>
            <div className="card-text">
              <div>Name: {name}</div>
              <div>Email: {email}</div>
              <div>Phone: {phone}</div>
              <div>Message: {message}</div>
              {image && (
                <div className="text-right">
                  <img src={URL.createObjectURL(image)} alt="Contact" className="img-fluid" />
                </div>
              )}
            </div>
          </div>
          <div className="card-footer">
            <button onClick={handleReset} className="btn btn-primary">
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;






