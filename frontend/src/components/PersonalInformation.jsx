import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';
import '../addemployee.css';

function PersonalInformation() {
	const [isDivVisible, setDivVisibility] = useState(true);
	const handleCheckboxChange = (event) => {
		setDivVisibility(!event.target.checked);

		if (!event.target.checked) {
			setData({
				...data,
				permanentAddress: {
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
			// If checked, copy residential address to permanent address
			setData({
				...data,
				permanentAddress: { ...data.residentialAddress },
			});
		}
	};

	const [data, setData] = useState({
		surname: '',
		firstName: '',
		middleName: '',
		suffix: '',
		dateOfBirth: '',
		placeOfBirth: '',
		sex: '',
		civilStatus: '',
		height: '',
		weight: '',
		bloodType: '',
		gsisIDNo: '',
		pagIbigIDNo: '',
		philhealthNo: '',
		sssNo: '',
		tinNo: '',
		agencyEmployeeNo: '',
		citizenship: '',
		telephoneNo: '',
		mobileNo: '',
		email: '',
		permanentAddress: {
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
		dualCitizenship: {
			citizenshipType: '',
			citizenshipCountry: '',
		},
		spouse: {
			surname: '',
			firstName: '',
			suffix: '',
			middleName: '',
			occupation: '',
			employerName: '',
			businessAddress: '',
			telephoneNo: '',
		},
		father: {
			surname: '',
			firstName: '',
			suffix: '',
			middleName: '',
		},
		mother: {
			surname: '',
			firstName: '',
			suffix: '',
			middleName: '',
		},
		children: {
			name: '',
			dateOfBirth: '',
		}
	});
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault();

		// Send the data to the server
		axios
			.post('http://localhost:8081/create', data) // Change dataToSend to data
			.then((res) => {
				// Handle a successful response, e.g., show a success message
				console.log('Data sent successfully:', res.data);
			})
			.catch((err) => {
				// Handle errors, e.g., display an error message
				console.error('Error sending data:', err);
			});

	};


	const handleInputChange = (e, fieldName, subField) => {
		const value = e.target.value;
		if (subField) {
			if (subField === 'zipCode') {
				if (/^\d{0,4}$/.test(value)) {
					setData({
						...data,
						[fieldName]: {
							...data[fieldName],
							[subField]: value,
						},
						[`${fieldName}Error`]: '',
					});
				} else {
					setData({
						...data,
						[`${fieldName}Error`]: 'Zip code should be up to 4 digits',
					});
				}
			} else {
				setData({
					...data,
					[fieldName]: {
						...data[fieldName],
						[subField]: value,
					},
				});
			}
		} else {
			setData({
				...data,
				[fieldName]: value,
			});
		}
	};


	const [childrenData, setChildrenData] = useState([{ name: '', dateOfBirth: '' }]);

	const handleChildFieldChange = (index, field, value) => {
		const updatedChildrenData = [...childrenData];
		updatedChildrenData[index][field] = value;
		setChildrenData(updatedChildrenData);
	};

	const addMoreChildrenField = () => {
		setChildrenData([...childrenData, { name: '', dateOfBirth: '' }]);
	};

	const removeChildField = (index) => {
		const updatedChildrenData = [...childrenData];
		updatedChildrenData.splice(index, 1);
		setChildrenData(updatedChildrenData);
	};


	return (
		<div className='d-flex flex-column align-items-left pt-4 shadow mainContainer '>
			<div>
				<h2>Personal Information</h2>
				<hr />
			</div>
			<form className='w-100' onSubmit={handleSubmit}>
				<div className='add-container'>
					<div className='row mb-3'>
						{/* Personal Information Fields */}
						<div className='col-md-3 mb-4'>
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
						<div className='col-md-3 mb-4'>
							<label htmlFor='inputfirstname' className='form-label'>
								First Name <h6 className='tuldok'>*</h6>
							</label>
							<input
								type='text'
								className='form-control mr-2'
								id='inputfirstname'
								placeholder='First Name'
								autoComplete='off'
								onChange={(e) => handleInputChange(e, 'firstName')}
								value={data.firstName}
							//required
							/>
						</div>
						<div className='col-md-3 mb-4'>
							<label htmlFor='inputmiddlename' className='form-label'>
								Middle Name <h6 className='tuldok-white'>*</h6>
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
						<div className='col-md-1 mb-4'>
							<label htmlFor='inputsuffix' className='form-label'>
								Suffix <h6 className='tuldok-white'>*</h6>
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
						<div className='col-md-2 mb-4'>
							<label htmlFor='inputsex' className='form-label'>
								Sex <h6 className='tuldok'>*</h6>
							</label>
							<select
								id='inputsex'
								className='form-select'
								onChange={(e) => handleInputChange(e, 'sex')}
								value={data.sex}
							//required
							>
								<option value='' hidden>
									Sex
								</option>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
							</select>
						</div>
					</div>

					<div className='row mb-3'>
						<div className='col-md-2 mb-4'>
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
							//required
							/>
						</div>
						<div className='col-md-2 mb-4'>
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
							//required
							/>
						</div>
						<div className='col-md-2 mb-4'>
							<label htmlFor='inputcitizenship' className='form-label'>
								Citizenship <h6 className='tuldok'>*</h6>
							</label>
							<select
								id='inputcitizenship'
								className='form-select'
								onChange={(e) => handleInputChange(e, 'citizenship')}
								value={data.citizenship}
							//required
							>
								<option value='' hidden>
									Citizenship
								</option>
								<option value='Filipino'>Filipino</option>
								<option value='Dual Citizenship'>Dual Citizenship</option>
							</select>
						</div>
						<div className='col-md-2'>
							<label htmlFor='inputcitizenshiptype' className='form-label'>
								Type of Citizenship <h6 className='tuldok'>*</h6>
							</label>
							<select
								id='inputcitizenshiptype'
								className={`form-select ${data.citizenship !== 'Dual Citizenship' ? 'disabled' : ''}`}
								onChange={(e) => handleInputChange(e, 'dualCitizenship', 'citizenshipType')}
								value={data.dualCitizenship.citizenshipType}
								disabled={data.citizenship !== 'Dual Citizenship'}
							//required
							>
								<option value='' hidden>
									Type of Citizenship
								</option>
								<option value='By Birth'>By Birth</option>
								<option value='By Naturalization'>By Naturalization</option>
							</select>
						</div>
						<div className='col-md-2'>
							<label htmlFor='inputcitizenshipcountry' className='form-label'>
								Country of Citizenship <h6 className='tuldok'>*</h6>
							</label>
							<input
								type='text'
								className={`form-select ${data.citizenship !== 'Dual Citizenship' ? 'disabled' : ''}`}
								id='inputcitizenshipcountry'
								placeholder='Country of Citizenship'
								autoComplete='off'
								onChange={(e) => handleInputChange(e, 'dualCitizenship', 'citizenshipCountry')}
								value={data.dualCitizenship.citizenshipCountry}
								disabled={data.citizenship !== 'Dual Citizenship'}
							//required
							/>
						</div>

						{/* Dual Citizenship Fields */}
						{/* {data.citizenship === 'Filipino' && (
							<div className='col'>
								<div className='row'>
									<div className='col mb-4'>
										<label htmlFor='inputcitizenshiptype' className='form-label'>
											Type of Citizenship <h6 className='tuldok'>*</h6>
										</label>
										<select disabled
											id='inputcitizenshiptype'
											className='form-select'
											onChange={(e) => handleInputChange(e, 'dualCitizenship', 'citizenshipType')}
											value={data.dualCitizenship.citizenshipType}
											//required
										>
											<option value='' hidden>
												Type of Citizenship
											</option>
											<option value='By Birth'>By Birth</option>
											<option value='By Naturalization'>By Naturalization</option>
										</select>
									</div>

									<div className='col mb-4'>
										<label htmlFor='inputcitizenshipcountry' className='form-label'>
											Country of Citizenship <h6 className='tuldok'>*</h6>
										</label>
										<input disabled
											type='text'
											className='form-control'
											id='inputcitizenshipcountry'
											placeholder='Country of Citizenship'
											autoComplete='off'
											onChange={(e) => handleInputChange(e, 'dualCitizenship', 'citizenshipCountry')}
											value={data.dualCitizenship.citizenshipCountry}
											//required
										/>
									</div>
								</div>
								
							</div>
						)} */}
						<div className='col-md-2 mb-4'>
							<label htmlFor='inputstatus' className='form-label'>
								Civil Status <h6 className='tuldok'>*</h6>
							</label>
							<select
								id='inputstatus'
								className='form-select'
								onChange={(e) => handleInputChange(e, 'civilStatus')}
								value={data.civilStatus}
							//required
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
					</div>

					<div className='row mb-3'>
						<div className='col mb-4'>
							<label htmlFor='inputheight' className='form-label'>
								Height <h6 className='tuldok-white'>*</h6>
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
						<div className='col mb-4'>
							<label htmlFor='inputweight' className='form-label'>
								Weight <h6 className='tuldok-white'>*</h6>
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
						<div className='col-md-2 mb-4'>
							<label htmlFor='inputbloodtype' className='form-label'>
								Blood Type <h6 className='tuldok-white'>*</h6>
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
						<div className='col-md-3 mb-4'>
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
							//required
							/>
						</div>
						<div className='col-md-2 mb-4'>
							<label htmlFor='inputtelephone' className='form-label'>
								Telephone No. <h6 className='tuldok-white'>*</h6>
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
						<div className='col-md-2 mb-4'>
							<label htmlFor='inputmobile' className='form-label'>
								Mobile No. <h6 className='tuldok'>*</h6>
							</label>
							<input
								type='text'
								className='form-control'
								id='inputmobile'
								placeholder='0912XXXXXXX'
								autoComplete='off'
								onChange={(e) => handleInputChange(e, 'mobileNo')}
								value={data.mobileNo}
							//required
							/>
						</div>
					</div>

					{/*Residential Address */}
					<h6 className='address'>RESIDENTIAL ADDRESS</h6>
					<div className='row mb-3'>
						<div className='col-md-3 mb-4'>
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
							//required
							/>
						</div>
						<div className='col-md-3 mb-4'>
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
							//required
							/>
						</div>
						<div className='col-md-3 mb-4'>
							<label htmlFor='inputsubdivision' className='form-label'>
								Subdivision/Village <h6 className='tuldok-white'>*</h6>
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
						<div className='col-md-3 mb-4' id='barangay'>
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
							//required
							/>
						</div>
					</div>

					<div className='row mb-3'>
						<div className='col-md-3 mb-4'>
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
							//required
							/>
						</div>
						<div className='col-md-3 mb-4'>
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
							//required
							/>
						</div>
						<div className='col-md-3 mb-4'>
							<label htmlFor='inputzip' className='form-label'>
								Zip Code <h6 className='tuldok'>*</h6>
							</label>
							<input
								type='number'
								className='form-control'
								id='inputzip'
								placeholder='Zip Code'
								autoComplete='off'
								onChange={(e) => handleInputChange(e, 'residentialAddress', 'zipCode')}
								value={data.residentialAddress.zipCode}
							//required
							/>
						</div>
					</div>

					{/*Primary Address*/}
					<h6 className='address'>PRIMARY ADDRESS</h6>
					<div className='checkbox' id='checkbox'>
						<input type='checkbox' id='sameasresidential' onChange={handleCheckboxChange} />
						<label htmlFor='sameasresidential' className='sameasresidential'>
							Same as Residential Address
						</label>
					</div>

					{isDivVisible && (
						<div>
							<div className='row mb-3'>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputhouseNo' className='form-label' >
										House/Block/Lot No <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputhousenumber'
										placeholder='House/Block/Lot No'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'permanentAddress', 'houseNo')}
										value={data.permanentAddress.houseNo}
									//required
									/>
								</div>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputstreet' className='form-label'>
										Street <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputstreetnumber'
										placeholder='Street'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'permanentAddress', 'street')}
										value={data.permanentAddress.street}
									//required
									/>
								</div>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputsubdivision' className='form-label'>
										Subdivision/Village <h6 className='tuldok-white'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputsubdivisionname'
										placeholder='Subdivision/Village'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'permanentAddress', 'subdivision')}
										value={data.permanentAddress.subdivision}
									/>
								</div>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputbarangay' className='form-label'>
										Barangay <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputbarangayname'
										placeholder='Barangay'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'permanentAddress', 'barangay')}
										value={data.permanentAddress.barangay}
									//required
									/>
								</div>
							</div>

							<div className='row mb-3'>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputcity' className='form-label'>
										City/Municipality <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputcityname'
										placeholder='City/Municipality'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'permanentAddress', 'city')}
										value={data.permanentAddress.city}
									//required
									/>
								</div>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputprovince' className='form-label'>
										Province <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputprovincename'
										placeholder='Province'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'permanentAddress', 'province')}
										value={data.permanentAddress.province}
									//required
									/>
								</div>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputzip' className='form-label'>
										Zip Code <h6 className='tuldok'>*</h6>
									</label>
									<input
										type='number'
										className='form-control'
										id='inputzip'
										placeholder='Zip Code'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'permanentAddress', 'zipCode')}
										value={data.permanentAddress.zipCode}
									//required
									/>
								</div>
							</div>
						</div>
					)}


					{/* IDs */}
					< div className='row mb-3	'>
						<div className='col-md-4 mb-4'>
							<label htmlFor='inputgsis' className='form-label'>
								GSIS ID No. <h6 className='tuldok-white'>*</h6>
							</label>
							<input
								type='text'
								className='form-control'
								id='inputgsis'
								placeholder='GSIS ID No.'
								autoComplete='off'
								onChange={(e) => handleInputChange(e, 'gsisIDNo')}
								value={data.gsisIDNo}
							/>
						</div>
						<div className='col-md-4 mb-4'>
							<label htmlFor='inputpagibig' className='form-label'>
								Pag-Ibig ID No. <h6 className='tuldok-white'>*</h6>
							</label>
							<input
								type='text'
								className='form-control'
								id='inputpagibig'
								placeholder='Pag-Ibig ID No.'
								autoComplete='off'
								onChange={(e) => handleInputChange(e, 'pagIbigIDNo')}
								value={data.pagIbigIDNo}
							/>
						</div>
						<div className='col-md-4 mb-4'>
							<label htmlFor='inputphilhealth' className='form-label'>
								PhilHealth No. <h6 className='tuldok-white'>*</h6>
							</label>
							<input
								type='text'
								className='form-control'
								id='inputphilhealth'
								placeholder='PhilHealth No.'
								autoComplete='off'
								onChange={(e) => handleInputChange(e, 'philhealthNo')}
								value={data.philhealthNo}
							/>
						</div>
					</div>
					<div className='row mb-3'>
						<div className='col-md-4 mb-4'>
							<label htmlFor='inputsss' className='form-label'>
								SSS No. <h6 className='tuldok-white'>*</h6>
							</label>
							<input
								type='text'
								className='form-control'
								id='inputsss'
								placeholder='SSS No.'
								autoComplete='off'
								onChange={(e) => handleInputChange(e, 'sssNo')}
								value={data.sssNo}
							/>
						</div>
						<div className='col-md-4 mb-4'>
							<label htmlFor='inputtin' className='form-label'>
								TIN No. <h6 className='tuldok-white'>*</h6>
							</label>
							<input
								type='text'
								className='form-control'
								id='inputtin'
								placeholder='TIN No.'
								autoComplete='off'
								onChange={(e) => handleInputChange(e, 'tinNo')}
								value={data.tinNo}
							/>
						</div>
						<div className='col-md-4 mb-4'>
							<label htmlFor='inputagency' className='form-label'>
								Agency Employee No. <h6 className='tuldok-white'>*</h6>
							</label>
							<input
								type='text'
								className='form-control'
								id='inputagency'
								placeholder='Agency Employee No.'
								autoComplete='off'
								onChange={(e) => handleInputChange(e, 'agencyEmployeeNo')}
								value={data.agencyEmployeeNo}
							/>
						</div>
					</div>



					<div className='row mb-3'>
						<div>
							<h2>Family Background</h2>
							<hr />
						</div>
						{/* Family Background Fields */}


						<div className='add-container'>
							{/*Spouse*/}
							<h6 className='address'>Spouse Information</h6>
							<div className='row mb-3'>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputspouse-surname' className='form-label'>
										Surname <h6 className='tuldok-white'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputspouse-surname'
										placeholder='Surname'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'spouse', 'surname')}
										value={data.spouse.surname}
									/>
								</div>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputspouse-firstname' className='form-label'>
										First Name <h6 className='tuldok-white'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputspouse-firstname'
										placeholder='First Name'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'spouse', 'firstName')}
										value={data.spouse.firstName}
									/>
								</div>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputspouse-middlename' className='form-label'>
										Middle Name <h6 className='tuldok-white'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputspouse-middlename'
										placeholder='Middle Name'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'spouse', 'middleName')}
										value={data.spouse.middleName}
									/>
								</div>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputspouse-suffix' className='form-label'>
										Suffix <h6 className='tuldok-white'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputspouse-suffix'
										placeholder='Suffix'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'spouse', 'suffix')}
										value={data.spouse.suffix}
									/>
								</div>
							</div>

							<div className='row mb-3'>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputspouse-occupation' className='form-label'>
										Occupation <h6 className='tuldok-white'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputspouse-occupation'
										placeholder='Occupation'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'spouse', 'occupation')}
										value={data.spouse.occupation}
									/>
								</div>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputemployers' className='form-label'>
										Employers/Business Name <h6 className='tuldok-white'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputemployers'
										placeholder='Employers/Business Name'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'spouse', 'employerName')}
										value={data.spouse.employerName}
									/>
								</div>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputbusaddress' className='form-label'>
										Business Address <h6 className='tuldok-white'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputbusaddress'
										placeholder='Bussiness Address'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'spouse', 'businessAddress')}
										value={data.spouse.businessAddress}
									/>
								</div>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputspouse-telephone' className='form-label'>
										Telephone No. <h6 className='tuldok-white'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputspouse-telephone'
										placeholder='(02) XXXXXXXX'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'spouse', 'telephoneNo')}
										value={data.spouse.telephoneNo}
									/>
								</div>
							</div>

							{/*Father*/}
							<h6 className='address'>Father's Information</h6>
							<div className='row mb-3'>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputfathersurname' className='form-label'>
										Surname <h6 className='tuldok-white'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputfathersurname'
										placeholder='Surname'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'father', 'surname')}
										value={data.father.surname}
									/>
								</div>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputfatherfirstname' className='form-label'>
										First Name <h6 className='tuldok-white'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputfatherfirstname'
										placeholder='First Name'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'father', 'firstName')}
										value={data.father.firstName}
									/>
								</div>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputfathermiddlename' className='form-label'>
										Middle Name <h6 className='tuldok-white'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputfathermiddlename'
										placeholder='Middle Name'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'father', 'middleName')}
										value={data.father.middleName}
									/>
								</div>
								<div className='col-md-2 mb-4'>
									<label htmlFor='inputfathersuffix' className='form-label'>
										Suffix <h6 className='tuldok-white'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputfathersuffix'
										placeholder='Suffix'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'father', 'suffix')}
										value={data.father.suffix}
									/>
								</div>
							</div>

							{/*Mother*/}
							<h6 className='address'>Mother's Maiden Name Information</h6>
							<div className='row mb-3'>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputmothersurname' className='form-label'>
										Surname <h6 className='tuldok-white'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputmothersurname'
										placeholder='Surname'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'mother', 'surname')}
										value={data.mother.surname}
									/>
								</div>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputmotherfirstname' className='form-label'>
										First Name <h6 className='tuldok-white'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputmotherfirstname'
										placeholder='First Name'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'mother', 'firstName')}
										value={data.mother.firstName}
									/>
								</div>
								<div className='col-md-3 mb-4'>
									<label htmlFor='inputmothermiddlename' className='form-label'>
										Middle Name <h6 className='tuldok-white'>*</h6>
									</label>
									<input
										type='text'
										className='form-control'
										id='inputmothermiddlename'
										placeholder='Middle Name'
										autoComplete='off'
										onChange={(e) => handleInputChange(e, 'mother', 'middleName')}
										value={data.mother.middleName}
									/>
								</div>
							</div>

							<div>
								{/* Children */}
								<h6 className='children-info'>Children's Information</h6>
								{childrenData.map((child, index) => (
									<div key={index}>
										<div className='row mb-3'>
											<div className='col-md-6 mb-4'>
												<label htmlFor={`childName${index}`} className='form-label'>
													Name of Children {index + 1} <h6 className='tuldok-white'>*</h6>
												</label>
												<input
													type='text'
													id={`childName${index}`}
													placeholder='Name of Children'
													className='form-control'
													autoComplete='off'
													value={child.name}
													onChange={(e) =>
														handleChildFieldChange(index, 'name', e.target.value)
													}
												/>
											</div>
											<div className='col-md-3 mb-4'>
												<label htmlFor={`childDOB${index}`} className='form-label'>
													Date of Birth <h6 className='tuldok-white'>*</h6>
												</label>
												<input
													type='date'
													id={`childDOB${index}`}
													className='form-control'
													autoComplete='off'
													value={child.dateOfBirth}
													onChange={(e) =>
														handleChildFieldChange(index, 'dateOfBirth', e.target.value)
													}
												/>
											</div>
											<div className='col align-self-center mt-2'>
												{index > 0 && ( // Allow removing only if there's more than one child
													<button
														className='btn btn-danger'
														onClick={() => removeChildField(index)}
													>
														Remove
													</button>
												)}
											</div>
										</div>
									</div>
								))}
								<button className='btn btn-primary' onClick={addMoreChildrenField}>
									Add Another Child
								</button>
							</div>
						</div>

					</div>
				</div>
			</form >
		</div>
	)
}


export default PersonalInformation;