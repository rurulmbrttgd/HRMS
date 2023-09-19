import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import './addemployee.css';
import EmployeeDetails from './EmployeeDetails';

function AddEmployee() {
	const [isDivVisible, setDivVisibility] = useState(true);
	const handleCheckboxChange = (event) => {
		setDivVisibility(!event.target.checked);

		if (!event.target.checked) {
			setData({
				...data,
				primaryAddress: {
					houseNo: '',
					street: '',
					subdivision: '',
					barangay: '',
					city: '',
					province: '',
					zipCode: '',
				},
			});
		} else {
			// If checked, copy residential address to primary address
			setData({
				...data,
				primaryAddress: { ...data.residentialAddress },
			});
		}
	};

	const [data, setData] = useState({
		surname: '',
		firstName: '',
		middleName: '',
		suffix: '',
		sex: '',
		dateOfBirth: '',
		placeOfBirth: '',
		citizenship: '',
		civilStatus: '',
		email: '',
		telephone: '',
		cellphone: '',
		primaryAddress: {
			houseNo: '',
			street: '',
			subdivision: '',
			barangay: '',
			city: '',
			province: '',
			zipCode: '',
		},
		residentialAddress: {
			houseNo: '',
			street: '',
			subdivision: '',
			barangay: '',
			city: '',
			province: '',
			zipCode: '',
		},
	});
	const [viewMode, setViewMode] = useState(false); // Manage view mode state

	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault();

		// Send the data to the server
		axios
			.post('http://localhost:8081/create', data)
			.then((res) => {
				setViewMode(true); // Switch to view mode after successful submission
			})
			.catch((err) => console.error(err));
	};

	const handleInputChange = (e, fieldName, subField) => {
		const value = e.target.value;
		if (subField) {
		  setData({
			...data,
			[fieldName]: {
			  ...data[fieldName],
			  [subField]: value,
			},
		  });
		} else {
		  setData({
			...data,
			[fieldName]: value,
		  });
		}
	  };
	  



	return (
		<div>
			{/* Display either the create mode or view mode based on viewMode state */}
			{viewMode ? (
				<EmployeeDetails data={data} />
			) : (
				<div className='d-flex flex-column align-items-left pt-4 shadow mainContainer'>
					<h2>Personal Information</h2>
					<hr />
					<form className='row g-3 w-100' onSubmit={handleSubmit}>
						<div className='add-container'>
							<div className='d-flex flex-rows align-items-left first-row'>
								{/* Personal Information Fields */}
								<div className='col details'>
									<label htmlFor='inputsurname' className='form-label'>
										Surname <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputsurname'
										placeholder='Surname'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'surname')}
										value={data.surname}
										required
									/>
								</div>
								<div className='col details'>
									<label htmlFor='inputfirstname' className='form-label'>
										First Name <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputfirstname'
										placeholder='First Name'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'firstName')}
										value={data.firstName}
										required
									/>
								</div>
								<div className='col details'>
									<label htmlFor='inputmiddlename' className='form-label'>
										Middle Name
									</label>
									<input
										type='text'
										className='form-control'
										id='inputmiddlename'
										placeholder='Middle Name'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'middleName')}
										value={data.middleName}
									/>
								</div>
								<div className='col-1 details'>
									<label htmlFor='inputsuffix' className='form-label'>
										Suffix
									</label>
									<input
										type='text'
										className='form-control'
										id='inputsuffix'
										placeholder='Suffix'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'suffix')}
										value={data.suffix}
									/>
								</div>
								<div className='col-1 details'>
									<label htmlFor='inputsex' className='form-label'>
										Sex <h6 className='tuldok'>*</h6>
									</label>
									<select
										id='inputsex'
										className='form-select'
										onChange={(e) => handleInputChange(e, 'sex')}
										value={data.sex}
										required
									>
										<option value='' hidden>
											Sex
										</option>
										<option value='Male'>Male</option>
										<option value='Female'>Female</option>
									</select>
								</div>
							</div>

							<div className='d-flex flex-rows align-items-center first-row'>
								<div className='col-2 details'>
									<label htmlFor='inputplaceofbirth' className='form-label'>
										Place of Birth <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputplaceofbirth'
										placeholder='Place of Birth'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'placeOfBirth')}
										value={data.placeOfBirth}
										required
									/>
								</div>
								<div className='col details'>
									<label htmlFor='inputdateofbirth' className='form-label'>
										Date of Birth <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='date'
										className='form-control'
										id='inputdateofbirth'
										placeholder='Date of Birth'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'dateOfBirth')}
										value={data.dateOfBirth}
										required
									/>
								</div>
								<div className='col details'>
									<label htmlFor='inputcitizenship' className='form-label'>
										Citizenship <h6 className='tuldok'>*</h6>
									</label>
									<select
										id='inputcitizenship'
										className='form-select'
										onChange={(e) => handleInputChange(e, 'citizenship')}
										value={data.citizenship}
										required
									>
										<option value='' hidden>
											Citizenship
										</option>
										<option value='Filipino'>Filipino</option>
										<option value='Dual Citizenship'>Dual Citizenship</option>
									</select>
								</div>
								<div className='col details'>
									<label htmlFor='inputstatus' className='form-label'>
										Civil Status <h6 className='tuldok'>*</h6>
									</label>
									<select
										id='inputstatus'
										className='form-select'
										onChange={(e) => handleInputChange(e, 'civilStatus')}
										value={data.civilStatus}
										required
									>
										<option value='' hidden>
											Civil Status
										</option>
										<option value='Single'>Single</option>
										<option value='Married'>Married</option>
										<option value='Separated'>Separated</option>
										<option value='Divorced'>Divorced</option>
									</select>
								</div>

								<div className='col-1 details'>
									<label htmlFor='inputheight' className='form-label'>
										Height
									</label>
									<input
										type='text'
										className='form-control'
										id='inputheight'
										placeholder='(in cm)'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'height')}
										value={data.height}
									/>
								</div>
								<div className='col-1 details'>
									<label htmlFor='inputweight' className='form-label'>
										Weight
									</label>
									<input
										type='text'
										className='form-control'
										id='inputweight'
										placeholder='(in kg)'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'weight')}
										value={data.weight}
									/>
								</div>
								<div className='col-1 details'>
									<label htmlFor='inputbloodtype' className='form-label'>
										Blood Type
									</label>
									<input
										type='text'
										className='form-control'
										id='inputbloodtype'
										placeholder='Blood Type'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'bloodType')}
										value={data.bloodType}
									/>
								</div>
							</div>

							<div className='d-flex flex-rows align-items-left first-row'>
								<div className='col details'>
									<label htmlFor='inputemail' className='form-label'>
										Email <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='email'
										className='form-control'
										id='inputemail'
										placeholder='Email'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'email')}
										value={data.email}
										required
									/>
								</div>
								<div className='col-2 details'>
									<label htmlFor='inputtelephone' className='form-label'>
										Telephone No
									</label>
									<input
										type='text'
										className='form-control'
										id='inputtelephone'
										placeholder='(02) XXXXXXXX'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'telephoneNo')}
										value={data.telephoneNo}
									/>
								</div>
								<div className='col-2 details'>
									<label htmlFor='inputmobile' className='form-label'>
										Mobile No <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputmmobile'
										placeholder='0912XXXXXXX'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'mobileNo')}
										value={data.mobileNo}
										required
									/>
								</div>
								<div className='col-5 details'>
									<label htmlFor='inputempty' className='form-label'></label>
								</div>
							</div>

							{/*Residential Address */}
							<h6 className='address'>RESIDENTIAL ADDRESS</h6>
							<div className='d-flex flex-rows align-items-left first-row'>
								<div className='col details'>
									<label htmlFor='inputhouseNo' className='form-label'>
										House/Block/Lot No <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputhouseNo'
										placeholder='House/Block/Lot No'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'residentialAddress', 'houseNo')}
										value={data.residentialAddress.houseNo}
										required
									/>
								</div>
								<div className='col details'>
									<label htmlFor='inputstreet' className='form-label'>
										Street <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputstreet'
										placeholder='Street'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'residentialAddress', 'street')}
										value={data.residentialAddress.street}
										required
									/>
								</div>
								<div className='col details'>
									<label htmlFor='inputsubdvision' className='form-label'>
										Subdivision/Village
									</label>
									<input
										type='text'
										className='form-control'
										id='inputsubdivision'
										placeholder='Subdivision/Village'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'residentialAddress', 'subdivision')}
										value={data.residentialAddress.subdivision}
									/>
								</div>
								<div className='col details' id='barangay'>
									<label htmlFor='inputbarangay' className='form-label'>
										Barangay <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputbarangay'
										placeholder='Barangay'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'residentialAddress', 'barangay')}
										value={data.residentialAddress.barangay}
										required
									/>
								</div>
							</div>

							<div className='d-flex flex-rows align-items-left first-row mb-2'>
								<div className='col details' id='city'>
									<label htmlFor='inputcity' className='form-label'>
										City/Municipality <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputcity'
										placeholder='City/Municipality'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'residentialAddress', 'city')}
										value={data.residentialAddress.city}
										required
									/>
								</div>
								<div className='col details' id='province'>
									<label htmlFor='inputprovince' className='form-label'>
										Province <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputprovince'
										placeholder='Province'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'residentialAddress', 'province')}
										value={data.residentialAddress.province}
										required
									/>
								</div>
								<div className='col details'>
									<label htmlFor='inputzip' className='form-label'>
										Zip Code <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='number'
										className='form-control'
										id='inputzipCode'
										placeholder='Zip Code'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'residentialAddress', 'zipCode')}
										value={data.residentialAddress.zipCode}
										required
									/>
								</div>
								<div className='col-5 details'>
									<label htmlFor='inputempty' className='form-label'></label>
								</div>
							</div>

							{/*Primary Address*/}
							<h6 className='address'>PRIMARY ADDRESS</h6>
							<div className='checkbox'>
								<input type='checkbox' onChange={handleCheckboxChange} />
								<label htmlFor='sameasresidential' className='sameasresidential'>
									Same as Residential Address
								</label>
							</div>

							{isDivVisible && (
								<div>
									<div className='d-flex flex-rows align-items-left first-row'>
										<div className='col details'>
											<label htmlFor='inputhouseNo' className='form-label'>
												House/Block/Lot No <h6 className='tuldok'>*</h6>
											</label>
											<input
												type='text'
												className='form-control'
												id='inputhouseNo'
												placeholder='House/Block/Lot No'
												autoComplete='off'
												onChange={(e) => handleInputChange(e, 'primaryAddress', 'houseNo')}
												value={data.primaryAddress.houseNo}
												required
											/>
										</div>
										<div className='col details'>
											<label htmlFor='inputstreet' className='form-label'>
												Street <h6 className='tuldok'>*</h6>
											</label>
											<input
												type='text'
												className='form-control'
												id='inputstreet'
												placeholder='Street'
												autoComplete='off'
												onChange={(e) => handleInputChange(e, 'primaryAddress', 'street')}
												value={data.primaryAddress.street}
												required
											/>
										</div>
										<div className='col details'>
											<label htmlFor='inputsubdvision' className='form-label'>
												Subdivision/Village
											</label>
											<input
												type='text'
												className='form-control'
												id='inputsubdivision'
												placeholder='Subdivision/Village'
												autoComplete='off'
												onChange={(e) => handleInputChange(e, 'primaryAddress', 'subdivision')}
												value={data.primaryAddress.subdivision}
											/>
										</div>
										<div className='col details' id='barangay'>
											<label htmlFor='inputbarangay' className='form-label'>
												Barangay <h6 className='tuldok'>*</h6>
											</label>
											<input
												type='text'
												className='form-control'
												id='inputbarangay'
												placeholder='Barangay'
												autoComplete='off'
												onChange={(e) => handleInputChange(e, 'primaryAddress', 'barangay')}
												value={data.primaryAddress.barangay}
												required
											/>
										</div>
									</div>

									<div className='d-flex flex-rows align-items-left first-row mb-5'>
										<div className='col details' id='city'>
											<label htmlFor='inputcity' className='form-label'>
												City/Municipality <h6 className='tuldok'>*</h6>
											</label>
											<input
												type='text'
												className='form-control'
												id='inputcity'
												placeholder='City/Municipality'
												autoComplete='off'
												onChange={(e) => handleInputChange(e, 'primaryAddress', 'city')}
												value={data.primaryAddress.city}
												required
											/>
										</div>
										<div className='col details' id='province'>
											<label htmlFor='inputprovince' className='form-label'>
												Province <h6 className='tuldok'>*</h6>
											</label>
											<input
												type='text'
												className='form-control'
												id='inputprovince'
												placeholder='Province'
												autoComplete='off'
												onChange={(e) => handleInputChange(e, 'primaryAddress', 'province')}
												value={data.primaryAddress.province}
												required
											/>
										</div>
										<div className='col details'>
											<label htmlFor='inputzip' className='form-label'>
												Zip Code <h6 className='tuldok'>*</h6>
											</label>
											<input
												type='number'
												className='form-control'
												id='inputzipCode'
												placeholder='Zip Code'
												autoComplete='off'
												onChange={(e) => handleInputChange(e, 'primaryAddress', 'zipCode')}
												value={data.primaryAddress.zipCode}
												required
											/>
										</div>
										<div className='col-5 details'>
											<label htmlFor='inputempty' className='form-label'></label>
										</div>
									</div>
								</div>
							)}


							{/* IDs */}
							< div className='d-flex flex-rows align-items-left first-row'>
								<div className='col details'>
									<label htmlFor='inputgsis' className='form-label'>
										GSIS ID No
									</label>
									<input
										type='text'
										className='form-control'
										id='inputgsis'
										placeholder='GSIS ID No'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'gsisIDNo')}
										value={data.gsisIDNo}
									/>
								</div>
								<div className='col details'>
									<label htmlFor='inputpagibig' className='form-label'>
										Pag-Ibig ID No
									</label>
									<input
										type='text'
										className='form-control'
										id='inputpagibig'
										placeholder='Pag-Ibig ID No'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'pagIbigIDNo')}
										value={data.pagIbigIDNo}
									/>
								</div>
								<div className='col details'>
									<label htmlFor='inputphilhealth' className='form-label'>
										PhilHealth No
									</label>
									<input
										type='text'
										className='form-control'
										id='inputphilhealth'
										placeholder='PhilHealth No'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'philhealthNo')}
										value={data.philhealthNo}
									/>
								</div>
								<div className='col details'>
									<label htmlFor='inputsss' className='form-label'>
										SSS No
									</label>
									<input
										type='text'
										className='form-control'
										id='inputsss'
										placeholder='SSS No'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'sssNo')}
										value={data.sssNo}
									/>
								</div>
								<div className='col details' id='status'>
									<label htmlFor='inputtin' className='form-label'>
										TIN No
									</label>
									<input
										type='text'
										className='form-control'
										id='inputtin'
										placeholder='TIN No'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'tinNo')}
										value={data.tinNo}
									/>
								</div>
								<div className='col details' id='status'>
									<label htmlFor='inputagency' className='form-label'>
										Agency Employee No
									</label>
									<input
										type='text'
										className='form-control'
										id='inputagency'
										placeholder='Agency Employee No'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'agencyEmployeeNo')}
										value={data.agencyEmployeeNo}
									/>
								</div>
							</div>
							<div className='col details'>
								<button type='submit' className='btn btn-primary'>
									Submit
								</button>
							</div>
							<div className='col-5 details'>
								<label htmlFor='inputempty' className='form-label'></label>
							</div>
						</div>
					</form >
				</div>
			)}
		</div>
	);
}

export default AddEmployee;
