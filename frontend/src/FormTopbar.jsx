import React, { useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function FormTopbar() {
  const navigate = useNavigate();
  const location = useLocation();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081/dashboard')
      .then((res) => {
        if (res.data.Status === 'Success') {
          if (res.data.role === 'admin') {
            navigate('/');
          } else {
            const id = res.data.id;
            navigate('/employeedetail/' + id);
          }
        } else {
          navigate('/start');
        }
      });
  }, []);

  return (
    <div className="flex-col">
      <div className="col p-0 m-0">
        <Link to="/"> {/* Add Link component */}
          <div className="d-flex justify-content-left shadow formbanner"></div>
        </Link>
      </div>
      <div className="col p-0 m-0">
        <div className="p-2 d-flex justify-content-between shadow section">
          <Link to="/create" className={`section-box${location.pathname === '/create' ? ' active' : ''}`}>
            <h3 className='section-text'>Personal Information</h3>
          </Link>
          <Link to="/familybackground" className={`section-box${location.pathname === '/familybackground' ? ' active' : ''}`}>
            <h3 className='section-text'>Family Background</h3>
          </Link>
          <Link to="/workexperience" className={`section-box${location.pathname === '/workexperience' ? ' active' : ''}`}>
            <h3 className='section-text'>Work Experience</h3>
          </Link>
          <Link to="/learningdevelopment" className={`section-box${location.pathname === '/learningdevelopment' ? ' active' : ''}`}>
            <h3 className='section-text'>Learning & Development</h3>
          </Link>
          <Link to="/otherinformation" className={`section-box${location.pathname === '/otherinformation' ? ' active' : ''}`}>
            <h3 className='section-text'>Other Information</h3>
          </Link>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default FormTopbar;
