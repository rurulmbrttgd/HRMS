import React, { useState } from 'react';
import PersonalInformation from './PersonalInformation'
import EducationalBackground from './EducationalBackground';
import WorkExperience from './WorkExperience';
import FormTopBar from '../FormTopbar';
import LearningDevelopment from './LearningDevelopment';
import OtherInformation from './Others';

function Form() {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted!');
  };

  return (
    <div>
      <FormTopBar currentPage={currentPage} />
      {currentPage === 1 && <PersonalInformation />}
      {currentPage === 2 && <EducationalBackground />}
      {currentPage === 3 && <WorkExperience />}
      {currentPage === 4 && <LearningDevelopment />}
      {currentPage === 5 && <OtherInformation />}

      {/* Navigation buttons */}
      <div className="col-12 text-end" style={{ paddingRight: '30px' }}>
        {currentPage > 1 && (
          <button onClick={prevPage} className="btn btn-primary btn-lg" style={{
            width: '150px',
            height: '50px',
            fontSize: '20px',
            marginTop: '20px',
            marginBottom: '20px',
            marginRight: '20px',
          }}>Back</button>
        )}
        {currentPage < 5 && (
          <button onClick={nextPage} className="btn btn-primary btn-lg" style={{
            width: '150px',
            height: '50px',
            fontSize: '20px',
            marginTop: '20px',
            marginBottom: '20px',
            marginRight: '20px',
          }}>Next</button>
        )}
        {currentPage === 5 && (
          <button onClick={handleSubmit} className="btn btn-primary btn-lg" style={{
            width: '150px',
            height: '50px',
            fontSize: '20px',
            marginTop: '20px',
            marginBottom: '20px',
            marginRight: '20px',
          }}>Submit</button>
        )}
      </div>


    </div>
  );
}

export default Form;
