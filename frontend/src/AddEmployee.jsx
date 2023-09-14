import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css'
import './addemployee.css'

function AddEmployee() {
	const [isDivVisible, setDivVisibility] = useState(true);
	const handleCheckboxChange = (event) => {
    setDivVisibility(!event.target.checked);
  };


	const [data, setData] = useState({
		surname: '',
		firstname: '',
		middlename: '',
		suffix: '',
		sex: '',
		dateofbirth: '',
		placeofbirth: '',
		citizenship: '',
		civilstatus: '',
		email: '',
		telno: '',
		cpno: ''
	})
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault();
		const formdata = new FormData();
		formdata.append("name", data.name);
		formdata.append("email", data.email);
		formdata.append("password", data.password);
		formdata.append("address", data.address);
		formdata.append("salary", data.salary);
		formdata.append("image", data.image);
		axios.post('http://localhost:8081/create', formdata)
		.then(res => {
			navigate('/employee')
		})
		.catch(err => console.log(err));
	}
	return (
		<div className='d-flex flex-column align-items-left pt-4 shadow mainContainer'>
			<h2>Personal Information</h2>
			<bold><hr class></hr></bold>
			<form class="row g-3 w-100" onSubmit={handleSubmit}>
				<div className="add-container">
					{/* ============================================== First Row ==================================================================*/}
					<div className="d-flex flex-rows align-items-left first-row">
						<div class="col-3 details">
							<label htmlFor="inputsurname" class="form-label">Surname <h6 className='tuldok'>*</h6></label>
							<input type="text" class="form-control" id="inputsurname" placeholder='Surname' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})} required/>
						</div>
						<div class="col-3 details">
							<label htmlFor="inputfirstname" class="form-label">First Name <h6 className='tuldok'>*</h6></label>
							<input type="text" class="form-control" id="inputfirstname" placeholder='First Name' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})} required/>
						</div>
						<div class="col-3 details">
							<label htmlFor="inputmiddlename" class="form-label">Middle Name <h6 className='tuldok-white'>*</h6></label>
							<input type="text" class="form-control" id="inputmiddlename" placeholder='Middle Name' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})} />
						</div>
						<div class="col-1 details">
							<label htmlFor="inputsuffix" class="form-label">Suffix <h6 className='tuldok-white'>*</h6></label>
							{/* <input type="text" class="form-control" id="inputsuffix" placeholder='Suffix' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})}/> */}
							<br></br><select id="suffix" defaultValue="">
								<option value=""hidden>Suffix</option>
								<option value="Jr">Jr</option>
								<option value="Sr">Sr</option>
								<option value="II">II</option>
								<option value="III">III</option>
								<option value="IV">IV</option>
							</select>
						</div>
						<div class="col-1 details">
							<label htmlFor="inputsex" class="form-label">Sex <h6 className='tuldok'>*</h6></label>
							<br></br><select id="sex" defaultValue="">
								<option value="" hidden>Sex</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
							{/* <input type="text" class="form-control" id="inputsex" placeholder='Sex' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})} required/> */}
						</div>
					</div>
					{/* ============================================== Second Row ==================================================================*/}
					<div className="d-flex flex-rows align-items-left first-row">
						<div class="col-2 details">
							<label htmlFor="inputdateofbirth" class="form-label">Date of Birth<h6 className='tuldok'>*</h6></label>
							<input type="date" class="form-control" id="inputdateofbirth" placeholder='Date of Birth' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})} required/>
						</div>
						<div class="col-3 details">
							<label htmlFor="inputplaceofbirth" class="form-label">Place of Birth <h6 className='tuldok'>*</h6></label>
							<input type="text" class="form-control" id="inputplaceofbirth" placeholder='Place of Birth' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})} required/>
						</div>
						<div class="col-3 details">
							<label htmlFor="inputcitizenship" class="form-label">Citizenship<h6 className='tuldok'>*</h6></label>
							<input type="text" class="form-control" id="inputMiddlename" placeholder='Citizenship' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})} required/>
						</div>
						<div class="col-3 details" id='status'>
							<label htmlFor="inputstatus" class="form-label">Civil Status <h6 className='tuldok'>*</h6></label>
							<br></br><select id="status">
								<option>Civil Status</option>
								<option>Single</option>
								<option>Married</option>
								<option>Separated</option>
								<option>Divorsed</option>
								<option>Widowed</option>
							</select>
							{/* <input type="text" class="form-control" id="inputstatus" placeholder='Status' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})} required/> */}
						</div>
					</div>
					{/* ============================================== Third Row ==================================================================*/}
					<div className="d-flex flex-rows align-items-left first-row">
						<div class="col-4 details">
							<label htmlFor="inputemail" class="form-label">Email<h6 className='tuldok'>*</h6></label>
							<input type="email" class="form-control" id="inputemail" placeholder='Email' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})} required/>
						</div>
						<div class="col-3 details">
							<label htmlFor="inputtelephone" class="form-label">Telephone No<h6 className='tuldok-white'>*</h6></label>
							<input type="number" class="form-control" id="inputtelephone" placeholder='Telephone No' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})}/>
						</div>
						<div class="col-3 details">
							<label htmlFor="inputcellphone" class="form-label">Cellphone No<h6 className='tuldok'>*</h6></label>
							<input type="number" class="form-control" id="inputcellphone" placeholder='Cellphone No' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})} required />
						</div>
					</div>
					<h6 className='residential'>RESIDENTIAL ADDRESS</h6>
					{/* ============================================== First Row ==================================================================*/}
					<div className="d-flex flex-rows align-items-left first-row">
						<div class="col details">
							<label htmlFor="inputhouseblocklot" class="form-label">House/Block/Lot No<h6 className='tuldok-white'>*</h6></label>
							<input type="text" class="form-control" id="inputhouseblocklot" placeholder='House/Block/Lot No' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})}/>
						</div>
						<div class="col details">
							<label htmlFor="inputstreet" class="form-label">Street<h6 className='tuldok-white'>*</h6></label>
							<input type="text" class="form-control" id="inputstreet" placeholder='Street' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})}/>
						</div>
						<div class="col details">
							<label htmlFor="inputsubdvillage" class="form-label">Subdivision/Village<h6 className='tuldok-white'>*</h6></label>
							<input type="text" class="form-control" id="inputsubdvillage" placeholder='Subdivison/Village' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})}/>
						</div>
						<div class="col details" id='barangay'>
							<label htmlFor="inputbarangay" class="form-label">Barangay<h6 className='tuldok'>*</h6></label>
							<input type="text" class="form-control" id="inputbarangay" placeholder='Barangay' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})} required/>
						</div>
					</div>
					{/* ============================================== ADDRESS ==================================================================*/}
					<div className="d-flex flex-rows align-items-left first-row">
						<div class="col details" id='city'>
							<label htmlFor="inputcitymunicipality" class="form-label">City/Municipality<h6 className='tuldok'>*</h6></label>
							<input type="text" class="form-control" id="inputcitymunicipality" placeholder='City/Municipality' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})} required/>
						</div>
						<div class="col details" id='province'>
							<label htmlFor="inputprovince" class="form-label">Province<h6 className='tuldok'>*</h6></label>
							<input type="text" class="form-control" id="inputprovince" placeholder='Province' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})} required/>
						</div>
						<div class="col details">
							<label htmlFor="inputzip" class="form-label">Zip Code<h6 className='tuldok-white'>*</h6></label>
							<input type="number" class="form-control" id="inputzip" placeholder='Zip Code' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})}/>
						</div>
					</div>
					<h6 className='residential'>PRIMARY ADDRESS</h6>
						<div class="checkbox">
							<input type="checkbox"
							onChange={handleCheckboxChange}/>
							<label htmlFor="sameasresidential" class="sameasresidential">Same as Residential Address</label>
						</div>
						{isDivVisible && (
							<div>
								<div className="d-flex flex-rows align-items-left first-row">
								<div class="col details">
									<label htmlFor="inputhouseblocklot" class="form-label">House/Block/Lot No<h6 className='tuldok-white'>*</h6></label>
									<input type="text" class="form-control" id="inputhouseblocklot" placeholder='House/Block/Lot No' autoComplete='off'
									onChange={e => setData({...data, name: e.target.value})}/>
								</div>
								<div class="col details">
									<label htmlFor="inputstreet" class="form-label">Street<h6 className='tuldok-white'>*</h6></label>
									<input type="text" class="form-control" id="inputstreet" placeholder='Street' autoComplete='off'
									onChange={e => setData({...data, name: e.target.value})}/>
								</div>
								<div class="col details">
									<label htmlFor="inputsubdvillage" class="form-label">Subdivision/Village<h6 className='tuldok-white'>*</h6></label>
									<input type="text" class="form-control" id="inputsubdvillage" placeholder='Subdivision/Village' autoComplete='off'
									onChange={e => setData({...data, name: e.target.value})}/>
								</div>
								<div class="col details" id='barangay'>
									<label htmlFor="inputbarangay" class="form-label">Barangay<h6 className='tuldok'>*</h6></label>
									<input type="text" class="form-control" id="inputbarangay" placeholder='Barangay' autoComplete='off'
									onChange={e => setData({...data, name: e.target.value})} required/>
								</div>
							</div>
							<div className="d-flex flex-rows align-items-left first-row">
						<div class="col details" id='city'>
							<label htmlFor="inputcitymunicipality" class="form-label">City/Municipality<h6 className='tuldok'>*</h6></label>
							<input type="text" class="form-control" id="inputcitymunicipality" placeholder='City/Municipality' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})} required/>
						</div>
						<div class="col details" id='province'>
							<label htmlFor="inputprovince" class="form-label">Province<h6 className='tuldok'>*</h6></label>
							<input type="text" class="form-control" id="inputprovince" placeholder='Province' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})} required/>
						</div>
						<div class="col details">
							<label htmlFor="inputzip" class="form-label">Zip Code<h6 className='tuldok-white'>*</h6></label>
							<input type="number" class="form-control" id="inputzip" placeholder='Zip Code' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})}/>
						</div>
					</div>
					</div>
						)}
					{/* ============================================= Pagibig ==================================================================*/}
					<div className="d-flex flex-rows align-items-left first-row">
						<div class="col details">
							<label htmlFor="inputpagibig" class="form-label">Pag-Ibig ID No<h6 className='tuldok-white'>*</h6></label>
							<input type="text" class="form-control" id="inputpagibig" placeholder='Pag-Ibig ID No' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})}/>
						</div>
						<div class="col details">
							<label htmlFor="inputphilhealth" class="form-label">PhilHealth No <h6 className='tuldok-white'>*</h6></label>
							<input type="text" class="form-control" id="inputphilhealth" placeholder='PhilHealth No' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})}/>
						</div>
						<div class="col details">
							<label htmlFor="inputsss" class="form-label">SSS No<h6 className='tuldok-white'>*</h6></label>
							<input type="text" class="form-control" id="inputsss" placeholder='SSS No' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})}/>
						</div>
						<div class="col details" id='status'>
							<label htmlFor="inputtin" class="form-label">TIN No <h6 className='tuldok-white'>*</h6></label>
							<input type="text" class="form-control" id="inputtin" placeholder='Tin No' autoComplete='off'
							onChange={e => setData({...data, name: e.target.value})}/>
						</div>
					</div>
				</div>
				<div class="col-12">
					<button type="submit" class="btn btn-primary">Create</button>
				</div>
			</form>
		</div>

	)
}

export default AddEmployee
