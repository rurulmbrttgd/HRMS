import React, { useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './style.css'

function TopbarEmployee() {
	const navigate = useNavigate()
	axios.defaults.withCredentials = true;
	useEffect(()=>{
		axios.get('http://localhost:8081/dashboard')
		.then(res => {
			if(res.data.Status === "Success") {
				if(res.data.role === "admin") {
					navigate('/');
				} else {
					const id = res.data.id;
					navigate('/employeedetail/'+id)
				}
			} else {
				navigate('/start')
			}
		})
	}, [])

	const handleLogout = () => {
		axios.get('http://localhost:8081/logout')
		.then(res => {
			navigate('/start')
		}).catch(err => console.log(err));
	}
	return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar">
                <div className="d-flex flex-column align-items-center justify-content-center px-3 pt-2 text-white min-vh-100 text-center">
                    <a href="/" className="d-flex-direction-row align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                        <img src="/public/Images/Capstone-logo.png" alt="HRMS Logo" className="sidebarlogo" />
                        <span className="fs-5 fw-bolder d-none d-sm-inline align-item">Capstone-Intel HR Management System</span>
                    </a>

                    <ul className="nav nav-pills flex-column  mb-sm-auto mb-0 align-items-center align-items-sm-start"  id="menu" style={{ marginTop: '150px' }}>
                    <li>
                        <Link to="/" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
                        <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/employee" className="nav-link px-0 align-middle text-white">
                        <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Employees</span>
                        </Link>
                    </li>
               
                    </ul>
                    {/* Move the logout button here */}
        <a href="#" className="nav-link px-0 align-middle text-white pb-5" onClick={handleLogout}>
                        <i className="fs-4 bi-box-arrow-in-left pt-2"></i> <span className="ms-1 d-none d-sm-inline">Logout</span>
                    </a>
                </div>
                </div>

                <div class="col p-0 m-0">
                    <div className='p-2 d-flex justify-content-left shadow topbar banner'>
                    <h1 className='p-3 h1text'>EMPLOYEE LIST</h1>
                    </div>
                <Outlet />
                </div>
            </div>
            </div>

	)
}

export default TopbarEmployee