import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function WorkExperienceForm() {
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
      <h2>Work Experience</h2>

      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-6">
          <label htmlFor="from" className="form-label">From</label>
          <select
            className="form-select"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleChange}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6">
          <label htmlFor="to" className="form-label">To</label>
          <select
            className="form-select"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="positionTitle" className="form-label">Position Title</label>
          <input
            type="text"
            className="form-control"
            id="positionTitle"
            name="positionTitle"
            placeholder="Enter Position Title"
            value={formData.positionTitle}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="company" className="form-label">Company</label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            placeholder="Enter Company"
            autoComplete="off"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <label htmlFor="monthlySalary" className="form-label">Monthly Salary</label>
          <input
            type="text"
            className="form-control"
            id="monthlySalary"
            name="monthlySalary"
            placeholder="Enter Monthly Salary"
            autoComplete="off"
            value={formData.monthlySalary}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <label htmlFor="salaryIncrement" className="form-label">Salary Increment</label>
          <input
            type="text"
            className="form-control"
            id="salaryIncrement"
            name="salaryIncrement"
            placeholder="Enter Salary Increment"
            autoComplete="off"
            value={formData.salaryIncrement}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <label htmlFor="employmentStatus" className="form-label">Employment Status</label>
          <input
            type="text"
            className="form-control"
            id="employmentStatus"
            name="employmentStatus"
            placeholder="Enter Employment Status"
            autoComplete="off"
            value={formData.employmentStatus}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <label htmlFor="governmentService" className="form-label">Government Service</label>
          <select
            className="form-select"
            id="governmentService"
            name="governmentService"
            value={formData.governmentService}
            onChange={handleGovernmentServiceChange}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="col-12">
          <button type="button" className="btn btn-primary" onClick={addWorkExperience}>
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

export default WorkExperienceForm;
