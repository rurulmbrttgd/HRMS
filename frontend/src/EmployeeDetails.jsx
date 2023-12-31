import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
/*import { useReactToPrint } from 'react-to-print';*/

function EmployeeDetails() {
  const { id } = useParams(); 
  const [employeeData, setEmployeeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    axios
      .get(`http://localhost:8081/employee/${id}`)
      .then((res) => {
        console.log('API Response:', res.data);
        if (res.data.status === 'Success') {
          setEmployeeData(res.data.data);
          setLoading(false);
        } else {
          setError('Error: Unable to fetch employee data');
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('API error:', err);
        setError(`Error: ${err.message}`);
        setLoading(false);
      });
  }, [id]);

  // const handlePrint = useReactToPrint({
  //   content: () => this.componentRef, // Reference to the PrintableEmployeeDetails component
  // });

  const dateOfBirth = new Date(employeeData.dateOfBirth || ''); 
  const formattedDateOfBirth = dateOfBirth.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className='d-flex flex-column align-items-left pt-4 shadow mainContainer'>
          <h2>Employee Details (View Mode)</h2>
          <hr className='bold' />
          <form className='row g-3 w-100'>
          <div className='add-container'>
          <div className='d-flex flex-rows align-items-left first-row justify-content-start'>
            <div className='col details'>
              <label htmlFor='viewSurname' className='form-label'>
                Surname
              </label>
              <div
  className='form-control'
  id='viewSurname'
>
  {employeeData.surname || ''}
</div>


 </div>
 <div className='col details'>
              <label htmlFor='viewFirstname' className='form-label'>
                First Name
              </label>
              <div
  className='form-control'
  id='viewFirstname'
>
  {employeeData.firstName || ''}
</div>


 </div>
 <div className='col details'>
              <label htmlFor='viewMiddleName' className='form-label'>
                Middle Name
              </label>
              <div
  className='form-control'
  id='viewMiddleName'
>
  {employeeData.middleName || ''}
</div>


 </div>
 <div className='col-1 details'>
              <label htmlFor='viewSuffix' className='form-label'>
                Suffix
              </label>
              <div
  className='form-control'
  id='viewSuffix'
>
  {employeeData.suffix || '-'}
</div>


 </div>
 <div className='col-1 details'>
              <label htmlFor='viewSex' className='form-label'>
                Sex
              </label>
              <div
  className='form-control'
  id='viewSex'
>
  {employeeData.sex || ''}
</div>


 </div>
 

 
           
            </div>
                 <div className='d-flex flex-rows align-items-center first-row'>
          <div className='col-2 details'>
            <label htmlFor='inputplaceofbirth' className='form-label'>
              Place of Birth
            </label>
            <div className='form-control'>
              {employeeData.placeOfBirth || '-'}
            </div>
          </div>
          <div className='col details'>
            <label htmlFor='inputdateofbirth' className='form-label'>
              Date of Birth
            </label>
            <div className='form-control'>
                  {formattedDateOfBirth}
                </div>
          </div>
          <div className='col details'>
            <label htmlFor='inputcitizenship' className='form-label'>
              Citizenship
            </label>
            <div className='form-control'>
              {employeeData.citizenship || '-'}
            </div>
          </div>

          {/* Dual Citizenship Fields */}
       
          {employeeData.citizenship === 'Dual Citizenship' && (
           
           <div className='col details'>
            <div className='row g-1'>
              <div className='col details'>
                <label htmlFor='inputcitizenshiptype' className='form-label'>
                  Type of Citizenship
                </label>
                <div className='form-control'>
                  {employeeData.dualCitizenshipType || '-'}
                </div>
              </div>

              <div className='col details'>
                <label htmlFor='inputcitizenshipcountry' className='form-label'>
                  Country of Citizenship
                </label>
                <div className='form-control'>
                  {employeeData.dualCitizenshipCountry || '-'}
                </div>
              </div>
            </div>
            </div>
          )}
          
          <div className='col details'>
            <label htmlFor='inputstatus' className='form-label'>
              Civil Status
            </label>
            <div className='form-control'>
              {employeeData.civilStatus || '-'}
            </div>
          </div>
        </div>
        <div className='d-flex flex-rows align-items-left pb-4 first-row'>
        <div className='col-1 details'>
        <label htmlFor='inputstatus' className='form-label'>
             Height
            </label>
            <div className='form-control'>
              {employeeData.height || '-'}
            </div>
        </div>
        <div className='col-1 details'>
        <label htmlFor='inputstatus' className='form-label'>
              Weight
            </label>
            <div className='form-control'>
              {employeeData.weight || '-'}
            </div>
        </div>
        <div className='col-1 details'>
        <label htmlFor='inputstatus' className='form-label'>
              Blood Type
            </label>
            <div className='form-control'>
              {employeeData.bloodType || '-'}
            </div>
        </div>
        <div className='col details'>
        <label htmlFor='inputstatus' className='form-label'>
             Email
            </label>
            <div className='form-control'>
              {employeeData.email || '-'}
            </div>
        </div>
        <div className='col details'>
        <label htmlFor='inputstatus' className='form-label'>
              Civil Status
            </label>
            <div className='form-control'>
              {employeeData.civilStatus || '-'}
            </div>
        </div>
        <div className='col details'>
        <label htmlFor='inputstatus' className='form-label'>
              Civil Status
            </label>
            <div className='form-control'>
              {employeeData.civilStatus || '-'}
            </div>
        </div>
        
        </div>

        {/* Residential Address Details */}
        <h6 className='address'>RESIDENTIAL ADDRESS</h6>
<div className="d-flex flex-rows align-items-left first-row justify-content-start">
  <div className="col details">
    <label htmlFor="viewStreetAddress" className="form-label">
      Street Address
    </label>
    <div className="form-control" id="viewStreetAddress">
      {employeeData.residentialHouseNo || '-'}
    </div>
  </div>
  <div className="col details">
    <label htmlFor="viewCity" className="form-label">
    Street
    </label>
    <div className="form-control" id="viewCity">
      {employeeData.residentialStreet|| '-'}
    </div>
  </div>
  <div className="col details">
    <label htmlFor="viewState" className="form-label">
    Subdivision/Village
    </label>
    <div className="form-control" id="viewState">
      {employeeData.residentialSubdivision || '-'}
    </div>
  </div>
  <div className="col details">
    <label htmlFor="viewPostalCode" className="form-label">
      Barangay
    </label>
    <div className="form-control" id="viewPostalCode">
      {employeeData.residentialBarangay || '-'}
    </div>
  </div>
</div>
<div className="d-flex flex-rows align-items-left first-row justify-content-start">
  <div className="col details">
    <label htmlFor="viewStreetAddress" className="form-label">
    City/Municipality
    </label>
    <div className="form-control" id="viewStreetAddress">
      {employeeData.residentialCity || '-'}
    </div>
  </div>
  <div className="col details">
    <label htmlFor="viewCity" className="form-label">
    Province
    </label>
    <div className="form-control" id="viewCity">
      {employeeData.residentialProvince || '-'}
    </div>
  </div>
  <div className="col details">
    <label htmlFor="viewState" className="form-label">
    Zip Code
    </label>
    <div className="form-control" id="viewState">
      {employeeData.residentialZipCode || '-'}
    </div>
  </div>
 
</div>


        {/* Primary Address Details */}
        <h6 className='address'>PERMANENT ADDRESS</h6>
<div className="d-flex flex-rows align-items-left first-row justify-content-start">
  <div className="col details">
    <label htmlFor="viewStreetAddress" className="form-label">
      Street Address
    </label>
    <div className="form-control" id="viewStreetAddress">
      {employeeData.permanentHouseNo || '-'}
    </div>
  </div>
  <div className="col details">
    <label htmlFor="viewCity" className="form-label">
    Street
    </label>
    <div className="form-control" id="viewCity">
      {employeeData.permanentStreet || '-'}
    </div>
  </div>
  <div className="col details">
    <label htmlFor="viewState" className="form-label">
    Subdivision/Village
    </label>
    <div className="form-control" id="viewState">
      {employeeData.permanentSubdivision || '-'}
    </div>
  </div>
  <div className="col details">
    <label htmlFor="viewPostalCode" className="form-label">
      Barangay
    </label>
    <div className="form-control" id="viewPostalCode">
      {employeeData.permanentBarangay || '-'}
    </div>
  </div>
</div>
<div className="d-flex flex-rows align-items-left first-row justify-content-start">
  <div className="col details">
    <label htmlFor="viewStreetAddress" className="form-label">
    City/Municipality
    </label>
    <div className="form-control" id="viewStreetAddress">
      {employeeData.permanentCity || '-'}
    </div>
  </div>
  <div className="col details">
    <label htmlFor="viewCity" className="form-label">
    Province
    </label>
    <div className="form-control" id="viewCity">
      {employeeData.permanentProvince || '-'}
    </div>
  </div>
  <div className="col details">
    <label htmlFor="viewState" className="form-label">
    Zip Code
    </label>
    <div className="form-control" id="viewState">
      {employeeData.permanentZipCode || '-'}
    </div>
  </div>
  
 
</div>


{/*Government IDs*/ }
<div className='d-flex flex-rows align-items-left first-row justify-content-start'>
            <div className='col details'>
              <label htmlFor='viewSurname' className='form-label'>
              GSIS ID No 
              </label>
              <div
  className='form-control'
  id='viewSurname'
>
  {employeeData.gsisIDNo || '-'}
</div>


 </div>
 <div className='col details'>
              <label htmlFor='viewFirstname' className='form-label'>
              Pag-Ibig ID No
              </label>
              <div
  className='form-control'
  id='viewFirstname'
>
  {employeeData.pagIbigIDNo || '-'}
</div>


 </div>
 <div className='col details'>
              <label htmlFor='viewMiddleName' className='form-label'>
              PhilHealth No
              </label>
              <div
  className='form-control'
  id='viewMiddleName'
>
  {employeeData.philhealthNo || '-'}
</div>


 </div>
 <div className='col details'>
              <label htmlFor='viewSuffix' className='form-label'>
              SSS No
              </label>
              <div
  className='form-control'
  id='viewSuffix'
>
  {employeeData.sssNo || '-'}
</div>


 </div>
 <div className='col details'>
              <label htmlFor='tinNo' className='form-label'>
              TIN No
              </label>
              <div
  className='form-control'
  id='viewTinNo'
>
  {employeeData.tinNo || '-'}
</div>
</div>

<div className='col details'>
              <label htmlFor='viewMiddleName' className='form-label'>
              Agency Employee No 
              </label>
              <div
  className='form-control'
  id='viewAgencyEmployeeNo'
>
  {employeeData.agencyEmployeeNo || '-'}
</div>


 </div>


 </div>

 {/* FAMILY*/}
 <div className='d-flex flex-column align-items-left pt-4 first-row justify-content-start'>
						<div>
							<h2>Family Background</h2>
							<hr />
						</div>
						{/* Family Background Fields */}
            <div className='add-container'>
							{/*Spouse*/}
							<h6 className='address'>Spouse Information</h6>
 <div className='d-flex flex-rows align-items-left first-row justify-content-start'>
            <div className='col details'>
              <label htmlFor='viewSurname' className='form-label'>
                Surname
              </label>
              <div
  className='form-control'
  id='viewSurname'
>
  {employeeData.spouseSurname || ''}
</div>


 </div>
 <div className='col details'>
              <label htmlFor='viewFirstname' className='form-label'>
                First Name
              </label>
              <div
  className='form-control'
  id='viewFirstname'
>
  {employeeData.spouseFirstName || ''}
</div>


 </div>
 <div className='col details'>
              <label htmlFor='viewMiddleName' className='form-label'>
                Middle Name
              </label>
              <div
  className='form-control'
  id='viewMiddleName'
>
  {employeeData.spouseMiddleName || '-'}
</div>


 </div>
 <div className='col-1 details'>
              <label htmlFor='viewSuffix' className='form-label'>
                Suffix
              </label>
              <div
  className='form-control'
  id='viewSuffix'
>
  {employeeData.spouseSuffix || '-'}
</div>
</div>
</div>

<div className='d-flex flex-rows align-items-left first-row justify-content-start'>
            <div className='col details'>
              <label htmlFor='viewOccupation' className='form-label'>
                Occupation
              </label>
              <div
  className='form-control'
  id='viewOccupation'
>
  {employeeData.spouseOccupation || ''}
</div>


 </div>
 <div className='col details'>
              <label htmlFor='viewFirstname' className='form-label'>
              Employers/Business Name *
              </label>
              <div
  className='form-control'
  id='viewFirstname'
>
  {employeeData.spouseEmployerName || ''}
</div>


 </div>
 <div className='col details'>
              <label htmlFor='viewMiddleName' className='form-label'>
              Business Address
              </label>
              <div
  className='form-control'
  id='viewMiddleName'
>
  {employeeData.spouseBusinessAddress || '-'}
</div>


 </div>
 <div className='col-2 details'>
              <label htmlFor='viewSuffix' className='form-label'>
              Telephone No. 
              </label>
              <div
  className='form-control'
  id='viewSuffix'
>
  {employeeData.spouseTelNo || '-'}
</div>
</div>
</div>

{/*Father*/}
<h6 className='address'>Father's Information</h6>
							<div className='d-flex flex-rows align-items-left pb-4 first-row justify-content-start'>
              <div className='col details'>
              <label htmlFor='viewSurname' className='form-label'>
                Surname
              </label>
              <div
  className='form-control'
  id='viewSurname'
>
  {employeeData.fatherSurname || ''}
</div>


 </div>
 <div className='col details'>
              <label htmlFor='viewFirstname' className='form-label'>
                First Name
              </label>
              <div
  className='form-control'
  id='viewFirstname'
>
  {employeeData.fatherFirstName || ''}
</div>


 </div>
 <div className='col details'>
              <label htmlFor='viewMiddleName' className='form-label'>
                Middle Name
              </label>
              <div
  className='form-control'
  id='viewMiddleName'
>
  {employeeData.fatherMiddleName || '-'}
</div>


 </div>
 <div className='col-1 details'>
              <label htmlFor='viewSuffix' className='form-label'>
                Suffix
              </label>
              <div
  className='form-control'
  id='viewSuffix'
>
  {employeeData.fatherSuffix || '-'}
</div>
</div>
                </div>

                {/*Mother*/}
<h6 className='address'>Mother's Information</h6>
							<div className='d-flex flex-rows align-items-left pb-4 first-row justify-content-start'>
              <div className='col details'>
              <label htmlFor='viewSurname' className='form-label'>
                Surname
              </label>
              <div
  className='form-control'
  id='viewSurname'
>
  {employeeData.motherSurname || ''}
</div>


 </div>
 <div className='col details'>
              <label htmlFor='viewFirstname' className='form-label'>
                First Name
              </label>
              <div
  className='form-control'
  id='viewFirstname'
>
  {employeeData.motherFirstName || ''}
</div>


 </div>
 <div className='col details'>
              <label htmlFor='viewMiddleName' className='form-label'>
                Middle Name
              </label>
              <div
  className='form-control'
  id='viewMiddleName'
>
  {employeeData.motherMiddleName || '-'}
</div>


 </div>

                </div>

                  {/*Children*/}
<h6 className='address'>Children's Information</h6>
							<div className='d-flex flex-rows align-items-left pb-4 first-row justify-content-start'>
              <div className='col details'>
              <label htmlFor='viewSurname' className='form-label'>
                Name of Child
              </label>
              <div
  className='form-control'
  id='viewSurname'
>
  {employeeData.childName || '-'}
</div>


 </div>
 <div className='col details'>
              <label htmlFor='viewFirstname' className='form-label'>
                Birthdate
              </label>
              <div
  className='form-control'
  id='viewFirstname'
>
  {employeeData.childDateOfBirth || '-'}
</div>


 </div>
 
                </div>

               
  
 </div> {/*Container of fam */}
 </div>
 



            <div className='d-flex justify-content-between col-12'>
              <div>
                <Link to='/employee' className='btn btn-primary'>
                  Back
                </Link>
              </div>

              {/* <div>
                <PrintEmployeeDetails ref={(el) => (this.componentRef = el)} />
                <button onClick={handlePrint}>Print</button>
              </div> */}

            </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default EmployeeDetails;