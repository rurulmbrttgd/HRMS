import React, { useState } from 'react';
import './style.css';

function LearningDev() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    ldPrograms: '',
    ldhours: '',
    ldType: '',
    ldSponsor: '',
  });

  const [LearningDev, setLearningDev] = useState([]);

  const [formErrors, setFormErrors] = useState({
    from: '',
    to: '',
    ldPrograms: '',
    ldhours: '',
    // Add error fields for other required fields as needed
  });

  const addLearnDev = () => {
    const newFormErrors = { ...formErrors };

    // Check if required fields are not empty
    if (formData.from === '') {
      newFormErrors.from = 'Start year is required';
    } else {
      newFormErrors.from = '';
    }

    if (formData.to === '') {
      newFormErrors.to = 'End year is required';
    } else {
      newFormErrors.to = '';
    }

    if (formData.ldPrograms === '') {
      newFormErrors.ldPrograms = 'Program title is required';
    } else {
      newFormErrors.ldPrograms = '';
    }

    if (formData.ldhours === '') {
      newFormErrors.ldhours = 'No. of hours is required';
    } else {
      newFormErrors.ldhours = '';
    }

    // Check if any of the required fields are empty
    if (
      newFormErrors.from === '' &&
      newFormErrors.to === '' &&
      newFormErrors.ldPrograms === '' &&
      newFormErrors.ldhours === ''
    ) {
      setLearningDev([...LearningDev, formData]);
      setFormData({
        from: '',
        to: '',
        ldPrograms: '',
        ldhours: '',
        ldType: '',
        ldSponsor: '',
      });
    } else {
      // Update the form errors state to show error messages
      setFormErrors(newFormErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('All Learning and Development:', LearningDev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        <div className="col-md-2 text-md-end">
          <button type="button" className="btn-add" onClick={addLearnDev}>
            <i className="bi bi-plus bi-plus-circle-fill"></i> Add New
          </button>
        </div>
      </div>
      <hr></hr>
      <form className="row g-3 w-100" onSubmit={handleSubmit}>
        <div className="add-container">
          <div className="d-flex flex-rows align-items-left first-row">
            <div className="col-2 details">
              <label htmlFor="from" className="form-label">From<h6 className='tuldok'>*</h6></label>
              <select
                className="form-select"
                id="from"
                name="from"
                value={formData.from}
                onChange={handleChange} required
              >
                <option value="">From</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <div className="text-danger">{formErrors.from}</div>
            </div>
            <div className="col-2 details">
              <label htmlFor="to" className="form-label">To<h6 className='tuldok'>*</h6></label>
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
              <div className="text-danger">{formErrors.to}</div>
            </div>
            <div className="col-4 details">
              <label htmlFor="ldPrograms" className="form-label">Title of Training Programs<h6 className='tuldok'>*</h6></label>
              <input
                type="text"
                className="form-control"
                id="ldPrograms"
                name="ldPrograms"
                placeholder="Training Programs"
                value={formData.ldPrograms}
                onChange={handleChange} required
              />
              <div className="text-danger">{formErrors.ldPrograms}</div>
            </div>
            <div className="col-3 details">
              <label htmlFor="ldhours" className="form-label">No. of hours<h6 className='tuldok'>*</h6></label>
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
                required
              />
              <div className="text-danger">{formErrors.ldhours}</div>
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

export default LearningDev;
