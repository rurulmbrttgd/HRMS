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
    <div className='d-flex flex-column align-items-left pt-4'>
        <div className='d-flex flex-column align-items-left pt-4 shadow mainContainer'>
        <h2>Other Information</h2>
        <hr class="hr"/>

        <form className="row g-3 w-100" onSubmit={handleSubmit}>
        <div className="col-12">
            <label htmlFor="membership" className="form-label">Membership in Association</label>
            <input
              type="text"
              className="form-control"
              id="membership"
              name="membership"
              placeholder="Membership in Association (Write in Full)"
              autoComplete="off"
              value={formData.monthlySalary}
              onChange={handleChange}
            />
          </div>
          <div className="col-3">
            <label htmlFor="skillshobbies" className="form-label">Special Skills & Hobbies</label>
            <input
              type="text"
              className="form-control"
              id="skillshobbies"
              name="skillshobbies"
              placeholder="Special Skills & Hobbies"
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
              placeholder="Non-academic Distinctions (Write in Full)"
              autoComplete="off"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <button type="button" className="btn btn-primary mb-4 bg-" onClick={addWorkExperience}>
              Add Another Field of Work Experience
            </button>
          </div>
        </form>
      </div>


      <div className='d-flex flex-column align-items-left pt-4 shadow mainContainer'>
        <form className="row g-3 w-100" onSubmit={handleSubmit} id='details'>
          <div className="col-12">
              <label htmlFor="related" className="form-label pb-1">Are you related by consanguinity of affinity to the appointing or recommending authority, or to the chief of bureau or office or to the person who has immediate supervision over you in the Office, Bureau of Department where you will be appointed,</label>
              <div className='d-inline-block w-50 pb-2'>
                <label>a. within the third degree</label>
              </div>
              <div className='d-inline-block w-50 pb-2'>
                  <input type="checkbox" class="checkbox"></input>
                  <label class="answer">Yes</label>
                  <input type="checkbox" class="checkbox"></input>
                  <label class="answer">No</label>
              </div>
              <div className='d-inline-block w-50'>
                <label>b. within the fourth degree (for Local Government Unit - Career Employees)?</label>
              </div>
              <div className='d-inline-block w-50 pb-2 align-top'>
                  <input type="checkbox" class="checkbox"></input>
                  <label class="answer">Yes</label>
                  <input type="checkbox" class="checkbox"></input>
                  <label class="answer">No</label>
              </div>
              <div className='d-inline-block invisible w-50'>hell</div>
              <div className='d-inline-block w-50'>
                  <label>If YES, give details</label>
              </div>
              <div className='d-inline-block invisible w-50'>hell</div>
              <div className='d-inline-block w-50'>
                <textarea name="details" form='details' className='w-100'></textarea>
              </div>
          </div>
          <div className="col-12">
              <div className='d-inline-block w-50 pb-2'>
                <label>a. Have you ever been found guilty of any administrative offense?</label>
              </div>
              <div className='d-inline-block w-50 align-top'>
                  <input type="checkbox" class="checkbox"></input>
                  <label class="answer">Yes</label>
                  <input type="checkbox" class="checkbox"></input>
                  <label class="answer">No</label>
              </div>
              <div className='d-inline-block w-50 pb-2'>
                <label>b. Have you been criminally charged before any court?</label>
              </div>
              <div className='d-inline-block w-50 align-top'>
                  <input type="checkbox" class="checkbox"></input>
                  <label class="answer">Yes</label>
                  <input type="checkbox" class="checkbox"></input>
                  <label class="answer">No</label>
              </div>
              <div className='d-inline-block invisible w-50'>hell</div>
              <div className='d-inline-block w-50'>
                  <label>If YES, give details</label>
              </div>
              <div className='d-inline-block invisible w-50'>hell</div>
              <div className='d-inline-block w-50'>
                <textarea name="details" form='details' className='w-100'></textarea>
              </div>
          </div>  
          <div className="col-12">
              <div className='d-inline-block w-50 separated'>
                <label>Have you ever been separated from the service in any of the following modes: resignation, retirement, dropped from the rolls, dismissal, termination, end of term, finished contract or phased out (abolition) in the public or private sector?</label>
              </div>
              <div className='d-inline-block w-50 align-top'>
                  <input type="checkbox" class="checkbox"></input>
                  <label class="answer">Yes</label>
                  <input type="checkbox" class="checkbox"></input>
                  <label class="answer">No</label>
              </div>
              <div className='d-inline-block invisible w-50'>hell</div>
              <div className='d-inline-block w-50'>
                  <label>If YES, give details</label>
              </div>
              <div className='d-inline-block invisible w-50'>hell</div>
              <div className='d-inline-block w-50'>
                <textarea name="details" form='details' className='w-100'></textarea>
              </div>
          </div>  

          <div className="col-12">
              <div className='d-inline-block w-50 separated pb-2'>
                <label>a. Have you ever been a candidate in a national or local election held within the last year (except Barangay election)?</label>
              </div>
              <div className='d-inline-block w-50 align-top'>
                  <input type="checkbox" class="checkbox"></input>
                  <label class="answer">Yes</label>
                  <input type="checkbox" class="checkbox"></input>
                  <label class="answer">No</label>
              </div>
              <div className='d-inline-block w-50 separated pb-2'>
                <label>b. Have you resigned from the government service during the three (3)-month period before the last election to promote/actively campaign for a national or local candidate?</label>
              </div>
              <div className='d-inline-block w-50 align-top pb-2'>
                  <input type="checkbox" class="checkbox"></input>
                  <label class="answer">Yes</label>
                  <input type="checkbox" class="checkbox"></input>
                  <label class="answer">No</label>
              </div>
              <div className='d-inline-block invisible w-50'>hell</div>
              <div className='d-inline-block w-50 '>
                  <label>If YES, give details</label>
              </div>
              <div className='d-inline-block invisible w-50'>hell</div>
              <div className='d-inline-block w-50'>
                <textarea name="details" form='details' className='w-100'></textarea>
              </div>
          </div>  
          <div className="col-12">
              <div className='d-inline-block w-50 separated'>
                <label>Have you acquired the status of an immigrant or permanent resident of another country?</label>
              </div>
              <div className='d-inline-block w-50 align-top'>
                  <input type="checkbox" class="checkbox"></input>
                  <label class="answer">Yes</label>
                  <input type="checkbox" class="checkbox"></input>
                  <label class="answer">No</label>
              </div>
              <div className='d-inline-block invisible w-50'>hell</div>
              <div className='d-inline-block w-50'>
                  <label>If YES, give details</label>
              </div>
              <div className='d-inline-block invisible w-50'>hell</div>
              <div className='d-inline-block w-50'>
                <textarea name="details" form='details' className='w-100'></textarea>
              </div>
          </div>  
          <div className="col-12">
              <label htmlFor="monthlySalary" className="form-label">Pursuant to: (a) Indigenous People’s Act (RA 8371); (b) Magna Carta for Disabled Persons (RA 7277); and (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the following items:</label>
              <div className="col-12">
                <div className='d-inline-block w-50 separated pb-2'>
                  <label>a. Are you a member of any indigenous group?</label>
                </div>
                <div className='d-inline-block w-50 align-top pb-2'>
                    <input type="checkbox" class="checkbox"></input>
                    <label class="answer">Yes</label>
                    <input type="checkbox" class="checkbox"></input>
                    <label class="answer">No</label>
                </div>
                <div className='d-inline-block invisible w-50'>hell</div>
                <div className='d-inline-block w-50 pb-2'>
                    <label>If YES, give details</label>
                </div>
                <div className='d-inline-block invisible w-50'>hell</div>
                <div className='d-inline-block w-50'>
                  <textarea name="details" form='details' className='w-100'></textarea>
                </div>
                <div className="col-12">
                <div className='d-inline-block w-50 separated pb-2'>
                  <label>b. Are you a person with disability?</label>
                </div>
                <div className='d-inline-block w-50 align-top'>
                    <input type="checkbox" class="checkbox"></input>
                    <label class="answer">Yes</label>
                    <input type="checkbox" class="checkbox"></input>
                    <label class="answer">No</label>
                </div>
                <div className='d-inline-block invisible w-50'>hell</div>
                <div className='d-inline-block w-50 pb-2'>
                    <label>If YES, give details</label>
                </div>
                <div className='d-inline-block invisible w-50'>hell</div>
                <div className='d-inline-block w-50'>
                  <textarea name="details" form='details' className='w-100'></textarea>
                </div>
                <div className='d-inline-block w-50 separated'>
                  <label>c. Are you a solo parent?</label>
                </div>
                <div className='d-inline-block w-50 align-top pb-2'>
                    <input type="checkbox" class="checkbox"></input>
                    <label class="answer">Yes</label>
                    <input type="checkbox" class="checkbox"></input>
                    <label class="answer">No</label>
                </div>
                <div className='d-inline-block invisible w-50'>hell</div>
                <div className='d-inline-block w-50'>
                    <label>If YES, give details</label>
                </div>
                <div className='d-inline-block invisible w-50'>hell</div>
                <div className='d-inline-block w-50'>
                  <textarea name="details" form='details' className='w-100'></textarea>
                </div>
            </div>  
          </div>  
          </div>
          <div className="col-12">
            <button type="button" className="btn btn-primary mb-4 bg-" onClick={addWorkExperience}>
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
    


    
  );
}

export default OtherInformation
