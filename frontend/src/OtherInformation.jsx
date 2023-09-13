import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function OtherInformation() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    positionTitle: '',
    company: '',
    monthlySalary: '',
    salaryIncrement: '',
    employmentStatus: '',
    governmentService: '',
  });

  const [workExperiences, setWorkExperiences] = useState([]);

  const addWorkExperience = () => {
    setWorkExperiences([...workExperiences, formData]);
    setFormData({
      from: '',
      to: '',
      positionTitle: '',
      company: '',
      monthlySalary: '',
      salaryIncrement: '',
      employmentStatus: '',
      governmentService: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('All work experiences:', workExperiences);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGovernmentServiceChange = (e) => {
    setFormData({ ...formData, governmentService: e.target.value });
  };

  const generateYearOptions = (startYear, endYear) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year.toString());
    }
    return years;
  };

  const years = generateYearOptions(1990, 2030);

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Other Information</h2>

      <form className="row g-3 w-50" onSubmit={handleSubmit}>
      <div className="col-12">
          <label htmlFor="monthlySalary" className="form-label">Membership in Association</label>
          <input
            type="text"
            className="form-control"
            id="monthlySalary"
            name="monthlySalary"
            placeholder="Membership in Association (Write in Full w/ Position)"
            autoComplete="off"
            value={formData.monthlySalary}
            onChange={handleChange}
          />
        </div>
        <div className="col-3">
          <label htmlFor="positionTitle" className="form-label">Special Skills & Hobbies</label>
          <input
            type="text"
            className="form-control"
            id="positionTitle"
            name="positionTitle"
            placeholder="Skills & Hobbies"
            value={formData.positionTitle}
            onChange={handleChange}
          />
        </div>
        <div className="col-9">
          <label htmlFor="company" className="form-label">Non-academic Distinctions</label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            placeholder="Enter non-academic distinctions (Write in Full)"
            autoComplete="off"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <button type="button" className="btn btn-primary bg-" onClick={addWorkExperience}>
            Add Another Field of Work Experience
          </button>
        </div>
      </form>

      {/* Display added work experiences */}
      <div className="mt-4">
        <h3>Added Work Experiences</h3>
        <ul>
          {workExperiences.map((workExp, index) => (
            <li key={index}>
              {/* Display work experience details here */}
              {`From: ${workExp.from}, To: ${workExp.to}, Position Title: ${workExp.positionTitle}, Company: ${workExp.company}`}
              {/* Add other fields as needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OtherInformation
