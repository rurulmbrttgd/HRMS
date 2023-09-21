import React, { useState } from 'react';
import './style.css';
import axios from 'axios'; // Import axios for HTTP requests

function PersonalbackgroundForm() {
  const [formData, setFormData] = useState({
    surname: '',
    firstName: '',
    middleName: '',
    suffix: '',
    dateOfBirth: '',
    // Add other form fields here
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the data to the server
    axios
      .post('http://localhost:8081/create', formData)
      .then((res) => {
        // Handle the response if needed
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='d-flex flex-column align-items-left pt-4 shadow mainContainer'>
      <h2>Family Background</h2>
      <hr />
      <form className='row g-3 w-100' onSubmit={handleSubmit}>
        <div className="personal-details">
          {/* Surname */}
          <div className="form-group">
            <label htmlFor="surname">Surname <span className="required">*</span></label>
            <input
              type="text"
              className="form-control"
              id="surname"
              name="surname"
              placeholder="Surname"
              autoComplete="off"
              onChange={handleInputChange}
              value={formData.surname}
              required
            />
          </div>

          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName">First Name <span className="required">*</span></label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              autoComplete="off"
              onChange={handleInputChange}
              value={formData.firstName}
              required
            />
          </div>

          {/* Middle Name */}
          <div className="form-group">
            <label htmlFor="middleName">Middle Name</label>
            <input
              type="text"
              className="form-control"
              id="middleName"
              name="middleName"
              placeholder="Middle Name"
              autoComplete="off"
              onChange={handleInputChange}
              value={formData.middleName}
            />
          </div>

          {/* Suffix */}
          <div className="form-group">
            <label htmlFor="suffix">Suffix</label>
            <input
              type="text"
              className="form-control"
              id="suffix"
              name="suffix"
              placeholder="Suffix"
              autoComplete="off"
              onChange={handleInputChange}
              value={formData.suffix}
            />
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth <span className="required">*</span></label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              placeholder="Date of Birth"
              autoComplete="off"
              onChange={handleInputChange}
              value={formData.dateOfBirth}
              required
            />
          </div>
        </div>

        {/* Add other form fields here */}
        
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>

    
  );
}

export default PersonalbackgroundForm;
