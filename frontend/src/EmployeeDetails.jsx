import React from 'react';

function EmployeeDetails({ data }) {
  return (
    <div className='d-flex flex-column align-items-left pt-4 shadow mainContainer'>
      <h2>Personal Information (View Mode)</h2>
      <hr className='bold' />
      <div className="add-container">
        {/* Display the input values */}
        <div className="d-flex flex-rows align-items-left first-row">
          <div className="col-3 details">
            <label htmlFor="inputsurname" className="form-label">Surname:</label>
            <div>{data.surname}</div>
          </div>
          <div className="col-3 details">
            <label htmlFor="inputfirstname" className="form-label">First Name:</label>
            <div>{data.firstName}</div>
          </div>
          <div className="col-3 details">
            <label htmlFor="inputmiddlename" className="form-label">Middle Name:</label>
            <div>{data.middleName}</div>
          </div>
          <div className="col-1 details">
            <label htmlFor="inputsuffix" className="form-label">Suffix:</label>
            <div>{data.suffix}</div>
          </div>
          <div className="col-1 details">
            <label htmlFor="inputsex" className="form-label">Sex:</label>
            <div>{data.sex}</div>
          </div>
        </div>
        
        {/* Additional Fields */}
        <div className="d-flex flex-rows align-items-left first-row">
          <div className="col-2 details">
            <label htmlFor="inputdateofbirth" className="form-label">Date of Birth:</label>
            <div>{data.dateOfBirth}</div>
          </div>
          <div className="col-3 details">
            <label htmlFor="inputplaceofbirth" className="form-label">Place of Birth:</label>
            <div>{data.placeOfBirth}</div>
          </div>
          <div className="col-3 details">
            <label htmlFor="inputcitizenship" className="form-label">Citizenship:</label>
            <div>{data.citizenship}</div>
          </div>
          <div className="col-3 details">
            <label htmlFor="inputstatus" className="form-label">Civil Status:</label>
            <div>{data.civilStatus}</div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="d-flex flex-rows align-items-left first-row">
          <div className="col-4 details">
            <label htmlFor="inputemail" className="form-label">Email:</label>
            <div>{data.email}</div>
          </div>
          <div className="col-3 details">
            <label htmlFor="inputtelephone" className="form-label">Telephone No:</label>
            <div>{data.telephone}</div>
          </div>
          <div className="col-3 details">
            <label htmlFor="inputcellphone" className="form-label">Cellphone No:</label>
            <div>{data.cellphone}</div>
          </div>
        </div>
        
        {/* Residential Address */}
        <h6 className='residential'>RESIDENTIAL ADDRESS</h6>
      </div>
    </div>
  );
}

export default EmployeeDetails;
