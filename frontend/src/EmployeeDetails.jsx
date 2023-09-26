import React from 'react';

function EmployeeDetails({ data }) {
  const readOnlyClass = 'read-only-field'; // CSS class for read-only fields

  return (
    <div className='d-flex flex-column align-items-left pt-4 shadow mainContainer'>
      <h2>Personal Information (View Mode)</h2>
      <hr className='bold' />
      <div className="add-container">
        {/* Display the input values */}
        <div className="d-flex flex-rows align-items-left first-row">
          <div className={`col-3 details ${readOnlyClass}`}>
            <label htmlFor="inputsurname" className="form-label">Surname:</label>
            <div>{data.surname}</div>
          </div>
          <div className={`col-3 details ${readOnlyClass}`}>
            <label htmlFor="inputfirstname" className="form-label">First Name:</label>
            <div>{data.firstName}</div>
          </div>
          <div className={`col-3 details ${readOnlyClass}`}>
            <label htmlFor="inputmiddlename" className="form-label">Middle Name:</label>
            <div>{data.middleName}</div>
          </div>
          <div className={`col-1 details ${readOnlyClass}`}>
            <label htmlFor="inputsuffix" className="form-label">Suffix:</label>
            <div>{data.suffix}</div>
          </div>
          <div className={`col-1 details ${readOnlyClass}`}>
            <label htmlFor="inputsex" className="form-label">Sex:</label>
            <div>{data.sex}</div>
          </div>
        </div>
        
        {/* Additional Fields */}
        <div className="d-flex flex-rows align-items-left first-row">
          <div className={`col-2 details ${readOnlyClass}`}>
            <label htmlFor="inputdateofbirth" className="form-label">Date of Birth:</label>
            <div>{data.dateOfBirth}</div>
          </div>
          <div className={`col-3 details ${readOnlyClass}`}>
            <label htmlFor="inputplaceofbirth" className="form-label">Place of Birth:</label>
            <div>{data.placeOfBirth}</div>
          </div>
          <div className={`col-3 details ${readOnlyClass}`}>
            <label htmlFor="inputcitizenship" className="form-label">Citizenship:</label>
            <div>{data.citizenship}</div>
          </div>
          <div className={`col-3 details ${readOnlyClass}`}>
            <label htmlFor="inputstatus" className="form-label">Civil Status:</label>
            <div>{data.civilStatus}</div>
          </div>
          <div className="col-1 details">
            <label htmlFor="inputheight" className="form-label">Height:</label>
            <div>{data.height}</div>
          </div>
          <div className="col-1 details">
            <label htmlFor="inputweight" className="form-label">Weight:</label>
            <div>{data.weight}</div>
          </div>
          <div className="col-1 details">
            <label htmlFor="inputbloodtype" className="form-label">Blood Type:</label>
            <div>{data.bloodType}</div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="d-flex flex-rows align-items-left first-row">
          <div className={`col-4 details ${readOnlyClass}`}>
            <label htmlFor="inputemail" className="form-label">Email:</label>
            <div>{data.email}</div>
          </div>
          <div className={`col-3 details ${readOnlyClass}`}>
            <label htmlFor="inputtelephone" className="form-label">Telephone No:</label>
            <div>{data.telephone}</div>
          </div>
          <div className={`col-3 details ${readOnlyClass}`}>
            <label htmlFor="inputcellphone" className="form-label">Cellphone No:</label>
            <div>{data.cellphone}</div>
          </div>
        </div>
        
        {/* Residential Address */}
        <h6 className='residential'>RESIDENTIAL ADDRESS</h6>
        <div className="d-flex flex-rows align-items-left first-row">
          <div className="col details">
            <label htmlFor="inputhouseNo" className="form-label">House/Block/Lot No:</label>
            <div>{data.residentialAddress.houseNo}</div>
          </div>
          <div className="col details">
            <label htmlFor="inputstreet" className="form-label">Street:</label>
            <div>{data.residentialAddress.street}</div>
          </div>
          <div className="col details">
            <label htmlFor="inputsubdivision" className="form-label">Subdivision/Village:</label>
            <div>{data.residentialAddress.subdivision}</div>
          </div>
          <div className="col details">
            <label htmlFor="inputbarangay" className="form-label">Barangay:</label>
            <div>{data.residentialAddress.barangay}</div>
          </div>
        </div>

        {/* City Column */}
        <div className="d-flex flex-rows align-items-left first-row">
          <div className="col details">
            <label htmlFor="inputcity" className="form-label">City/Municipality:</label>
            <div>{data.residentialAddress.city}</div>
          </div>
          <div className="col details">
            <label htmlFor="inputprovince" className="form-label">Province:</label>
            <div>{data.residentialAddress.province}</div>
          </div>
          <div className="col details">
            <label htmlFor="inputzipCode" className="form-label">Zip Code:</label>
            <div>{data.residentialAddress.zipCode}</div>
          </div>
        </div>

        {/* Primary Address */}
        <h6 className='residential'>PRIMARY ADDRESS</h6>
        <div className="d-flex flex-rows align-items-left first-row">
          <div className="col details">
            <label htmlFor="inputhouseNo" className="form-label">House/Block/Lot No:</label>
            <div>{data.primaryAddress.houseNo}</div>
          </div>
          <div className="col details">
            <label htmlFor="inputstreet" className="form-label">Street:</label>
            <div>{data.primaryAddress.street}</div>
          </div>
          <div className="col details">
            <label htmlFor="inputsubdivision" className="form-label">Subdivision/Village:</label>
            <div>{data.primaryAddress.subdivision}</div>
          </div>
          <div className="col details">
            <label htmlFor="inputbarangay" className="form-label">Barangay:</label>
            <div>{data.primaryAddress.barangay}</div>
          </div>
        </div>
        {/* City Column */}
        <div className="d-flex flex-rows align-items-left first-row">
          <div className="col details">
            <label htmlFor="inputcity" className="form-label">City/Municipality:</label>
            <div>{data.primaryAddress.city}</div>
          </div>
          <div className="col details">
            <label htmlFor="inputprovince" className="form-label">Province:</label>
            <div>{data.primaryAddress.province}</div>
          </div>
          <div className="col details">
            <label htmlFor="inputzipCode" className="form-label">Zip Code:</label>
            <div>{data.primaryAddress.zipCode}</div>
          </div>
        </div>
        {/* ID information */}
        <div className="d-flex flex-rows align-items-left first-row">
          <div className="col-1 details">
            <label htmlFor="inputgsis" className="form-label">GSIS ID No:</label>
            <div>{data.gsisIDNo}</div>
          </div>
          <div className="col-2 details">
            <label htmlFor="inputpagibig" className="form-label">Pag-Ibig ID No:</label>
            <div>{data.pagibigIDNo}</div>
          </div>
          <div className="col-2 details">
            <label htmlFor="inputphilhealth" className="form-label">PhilHealth No:</label>
            <div>{data.philhealthNo}</div>
          </div>
          <div className="col-2 details">
            <label htmlFor="inputsss" className="form-label">SSS No:</label>
            <div>{data.sssNo}</div>
          </div>
          <div className="col-2 details">
            <label htmlFor="inputtin" className="form-label">TIN No:</label>
            <div>{data.tinNo}</div>
          </div>
          <div className="col-2 details">
              <label htmlFor="inputagency" className="form-label">Agency Employee No:</label>
              <div>{data.agencyEmployeeNo}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;