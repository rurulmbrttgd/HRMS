import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';

function LearningDev() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    ldPrograms: '',
    ldhours: '',
    ldType: '',
    ldSponsor: '',
    employmentStatus: '',
    governmentService: '',
  });

  const [LearningDev, setLearningDev] = useState([]);

  const addWorkExperience = () => {
    setLearningDev([...LearningDev, formData]);
    setFormData({
      from: '',
      to: '',
      ldPrograms: '',
      ldhours: '',
      ldType: '',
      ldSponsor: '',
      employmentStatus: '',
      governmentService: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('All work experiences:', LearningDev);
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
    <h2 className="">Learning and Development Interventions</h2>
  </div>
  <div className="col-md-2 text-md-end"> {/* Use text-md-end to align the button to the right */}
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
              <label htmlFor="ldPrograms" className="form-label">Title of Training Programs</label>
              <input
                type="text"
                className="form-control"
                id="ldPrograms"
                name="ldPrograms"
                placeholder="Training Programs"
                value={formData.ldPrograms}
                onChange={handleChange}/>
            </div>
            <div className="col-3 details">
                <label htmlFor="ldhours" className="form-label">No. of hours</label>
                <input
                  type="number"
                  className="form-control"
                  id="ldhours"
                  name="ldhours"
                  placeholder="0"
                  autoComplete="off"
                  value={formData.ldhours}
                  onChange={handleChange}
                  step="1" 
                />
              </div>


          </div>
          <div className="d-flex flex-rows align-items-left second-row">
            <div className="col-3 details">
              <label htmlFor="ldType" className="form-label">Type of LD</label>
              <input
                type="text"
                className="form-control"
                id="ldType"
                name="ldType"
                placeholder="Type"
                autoComplete="off"
                value={formData.ldType}
                onChange={handleChange}
              />
            </div>
            <div className="col-8 details">
              <label htmlFor="ldSponsor" className="form-label">Sponsored by</label>
              <input
                type="text"
                className="form-control"
                id="ldSponsor"
                name="ldSponsor"
                placeholder="Sponsored by (Write in Full)"
                autoComplete="off"
                value={formData.ldSponsor}
                onChange={handleChange}
              />
            </div>
      
       
            
          </div>
          
        </div>
      </form>
     
      <div className="mt-4">
        <h3>Added Learning and Development Interventions</h3>
        <ul >
          {LearningDev.map((learnDev, index) => (
            <li key={index}>
         
              {`From: ${learnDev.from}, To: ${learnDev.to}, Training Program: ${learnDev.ldPrograms}, No. of hours: ${learnDev.ldhours}, Type of LD: ${learnDev.ldType}, Sponsor: ${learnDev.ldSponsor}`}
             
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LearningDev