import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';

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

    <div className='d-flex flex-column align-items-left pt-4 shadow mainContainer'>
       <div className="row">
    <div className="col-md-10">
    <h2>Work Experience</h2>  
    </div>
    <div className="col-md-2 text-md-end">
      <button type="button" className="btn-add" onClick={addWorkExperience}>
        <i className="bi bi-plus bi-plus-circle-fill"></i> Add New
      </button>
    </div>
  </div>
      <hr></hr>
      <form className="row g-3 w-100" onSubmit={handleSubmit}>
        <div className="add-container">
          <div className="d-flex flex-rows align-items-left first-row">
            <div className="col-2 details">
              <label htmlFor="from" className="form-label">From</label>
              <select
                className="form-select"
                id="from"
                name="from"
                value={formData.from}
                onChange={handleChange}
              >
                <option value="">From</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-2 details">
              <label htmlFor="to" className="form-label">To</label>
              <select
                className="form-select"
                id="to"
                name="to"
                value={formData.to}
                onChange={handleChange}
              >
                <option value="">To</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-4 details">
              <label htmlFor="positionTitle" className="form-label">Position Title</label>
              <input
                type="text"
                className="form-control"
                id="positionTitle"
                name="positionTitle"
                placeholder="Position Title"
                value={formData.positionTitle}
                onChange={handleChange}/>
            </div>
            <div className="col-3 details">
              <label htmlFor="company" className="form-label">Company</label>
              <input
                type="text"
                className="form-control"
                id="company"
                name="company"
                placeholder="Company"
                autoComplete="off"
                value={formData.company}
                onChange={handleChange}/>
            </div>
          </div>
          <div className="d-flex flex-rows align-items-left first-row">
            <div className="col-3 details">
              <label htmlFor="monthlySalary" className="form-label">Monthly Salary</label>
              <input
                type="text"
                className="form-control"
                id="monthlySalary"
                name="monthlySalary"
                placeholder="Monthly Salary"
                autoComplete="off"
                value={formData.monthlySalary}
                onChange={handleChange}
              />
            </div>
            <div className="col-3 details">
              <label htmlFor="salaryIncrement" className="form-label">Salary Increment</label>
              <input
                type="text"
                className="form-control"
                id="salaryIncrement"
                name="salaryIncrement"
                placeholder="00 - 0"
                autoComplete="off"
                value={formData.salaryIncrement}
                onChange={handleChange}
              />
            </div>
            <div className="col-3 details">
              <label htmlFor="employmentStatus" className="form-label">Status of Employment</label>
              <input
                type="text"
                className="form-control"
                id="employmentStatus"
                name="employmentStatus"
                placeholder="Status of Employment"
                autoComplete="off"
                value={formData.employmentStatus}
                onChange={handleChange}
              />
            </div>
            <div className="col-2">
              <label htmlFor="governmentService" className="form-label">Government Service</label>
              <select
                className="form-select"
                id="governmentService"
                name="governmentService"
                value={formData.governmentService}
                onChange={handleGovernmentServiceChange}
              >
                <option value="">Y/N</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            
          </div>
        
        </div>
      </form>
      {/* Display added work experiences */}
      <div className="mt-4">
        <h3>Added Work Experiences</h3>
        <ul>
          {workExperiences.map((workExp, index) => (
            <li key={index}>
              {/* Display work experience details here */}
              {`From: ${workExp.from}, To: ${workExp.to}, Position Title: ${workExp.positionTitle}, Company: ${workExp.company}, Monthly Salary: ${workExp.monthlySalary}, Salary Increment: ${workExp.salaryIncrement}, Status of Employment: ${workExp.employmentStatus}, Government Service: ${workExp.governmentService}`}
              {/* Add other fields as needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WorkExperienceForm;
