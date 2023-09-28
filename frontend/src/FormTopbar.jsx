import React, { useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { Outlet, useNavigate } from 'react-router-dom';

function FormTopbar({ currentPage }) {
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
        <div className="p-5 d-flex justify-content-between shadow section" style={{ marginLeft: '50px', marginRight: '50px' }}>
          <div className={`section-box${currentPage === 1 ? ' active' : ''}`}>
            <h3 className='section-text'>Personal Information</h3>
          </div>
          <div className={`section-box${currentPage === 2 ? ' active' : ''}`}>
            <h3 className='section-text'>Educational Background</h3>
          </div>
          <div className={`section-box${currentPage === 3 ? ' active' : ''}`}>
            <h3 className='section-text'>Work Experience</h3>
          </div>
          <div className={`section-box${currentPage === 4 ? ' active' : ''}`}>
            <h3 className='section-text'>Learning & Development</h3>
          </div>
          <div className={`section-box${currentPage === 5 ? ' active' : ''}`}>
            <h3 className='section-text'>Other Information</h3>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default FormTopbar;