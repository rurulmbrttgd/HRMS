import React, { useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function FormTopbar() {
  const navigate = useNavigate();
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
        <div className="d-flex justify-content-left shadow formbanner"></div>
      </div>
      <div className="col p-0 m-0">
        <div className="p-2 d-flex justify-content-between shadow section">
          <div className='section-box'>
            <Link to="/create" className='section-text'>
              <h3>Personal Information</h3>
            </Link>
          </div>
          <div className='section-box'>
            <Link to="/workexperience" className='section-text'>
              <h3>Work Experience</h3>
            </Link>
          </div>
          <div className='section-box'>
            <Link to="/learningdevelopment" className='section-text'>
              <h3>Learning & Development</h3>
            </Link>
          </div>
          <div className='section-box'>
            <Link to="/otherinformation" className='section-text'>
              <h3>Other Information</h3>
            </Link>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default FormTopbar;