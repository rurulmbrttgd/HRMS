import React, { useState } from 'react';
import './style.css';
import axios from 'axios';

function EducationalBackground() {
  const [formData, setFormData] = useState({
    level: [
      {
        name: 'Elementary',
        school: '',
        education: '',
        from: '',
        to: '',
        highestLevel: '',
        yearGraduated: '',
        scholarship: '',
      },
      {
        name: 'Secondary',
        school: '',
        education: '',
        from: '',
        to: '',
        highestLevel: '',
        yearGraduated: '',
        scholarship: '',
      },
      {
        name: 'Vocational Trade/Course',
        school: '',
        education: '',
        from: '',
        to: '',
        highestLevel: '',
        yearGraduated: '',
        scholarship: '',
      },
      {
        name: 'College',
        school: '',
        education: '',
        from: '',
        to: '',
        highestLevel: '',
        yearGraduated: '',
        scholarship: '',
      },
      {
        name: 'Graduate Studies',
        school: '',
        education: '',
        from: '',
        to: '',
        highestLevel: '',
        yearGraduated: '',
        scholarship: '',
      },
    ],
  });

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

  const handleInputChange = (e, row, field) => {
    const { name, value } = e.target;
    const updatedData = { ...formData };

    updatedData.level[row][field] = value;

    setFormData(updatedData);
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
      <h2>Educational Background</h2>
      <hr />
      <form className='w-100' onSubmit={handleSubmit}>
        {formData.level.map((row, index) => (
          <div key={index} className='row mb-3'>
            <div className='col-12'>
              <h3>{row.name}</h3>
            </div>
            <div className='col-md-12 mb-3'>
              <label htmlFor={`school_${index}`}>Name of School</label>
              <input
                type='text'
                className='form-control mr-2'
                name={`school_${index}`}
                onChange={(e) => handleInputChange(e, index, 'school')}
                value={row.school}
              />
            </div>
            <div className='col-md-8 mb-3'>
              <label htmlFor={`education_${index}`}>Basic Education/Degree/Course</label>
              <input
                type='text'
                className='form-control mr-2'
                name={`education_${index}`}
                onChange={(e) => handleInputChange(e, index, 'education')}
                value={row.education}
              />
            </div>
            <div className="col-2 mb-3">
              <label htmlFor={`from_${index}`}>From</label>
              <select
                className="form-select"
                id={`from_${index}`}
                name={`from_${index}`}
                value={row.from}
                onChange={(e) => handleInputChange(e, index, 'from')}
              >
                <option value="" disabled>Select year</option> {/* Updated placeholder */}
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-2 mb-3">
              <label htmlFor={`to_${index}`}>To</label>
              <select
                className="form-select"
                id={`to_${index}`}
                name={`to_${index}`}
                value={row.to}
                onChange={(e) => handleInputChange(e, index, 'to')}
              >
                <option value="" disabled>Select year</option> {/* Updated placeholder */}
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className='col-md-6 mb-3'>
              <label htmlFor={`highestLevel_${index}`}>Highest Level</label>
              <input
                type='text'
                className='form-control mr-2'
                name={`highestLevel_${index}`}
                onChange={(e) => handleInputChange(e, index, 'highestLevel')}
                value={row.highestLevel}
              />
            </div>
            <div className='col-md-6 mb-3'>
              <label htmlFor={`yearGraduated_${index}`}>Year Graduated</label>
              <select
                className='form-select'
                id={`yearGraduated_${index}`}
                name={`yearGraduated_${index}`}
                value={row.yearGraduated}
                onChange={(e) => handleInputChange(e, index, 'yearGraduated')}
              >
                <option value="" disabled>Select year</option> {/* Updated placeholder */}
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className='col-md-12'>
              <label htmlFor={`scholarship_${index}`}>Scholarship/Academic Honors Received</label>
              <input
                type='text'
                className='form-control mr-2'
                name={`scholarship_${index}`}
                onChange={(e) => handleInputChange(e, index, 'scholarship')}
                value={row.scholarship}
              />
            </div>
          </div>
        ))}

        <div className='form-group'>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EducationalBackground;
