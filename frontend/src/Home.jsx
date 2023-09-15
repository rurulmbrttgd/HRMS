import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css';
import Calendar from 'react-calendar';
import TodoList from './TaskList';

const ReactCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div>
      <Calendar onChange={onChange} value={date} />
      {console.log(date)}
    </div>
  );
};

function Home() {
  const [adminCount, setAdminCount] = useState();
  const [employeeCount, setEmployeeCount] = useState();
  const [salary, setSalary] = useState();

  useEffect(() => {
    axios.get('http://localhost:8081/adminCount').then((res) => {
      setAdminCount(res.data[0].admin);
    }).catch((err) => console.log(err));

    axios.get('http://localhost:8081/employeeCount').then((res) => {
      setEmployeeCount(res.data[0].employee);
    }).catch((err) => console.log(err));

    axios.get('http://localhost:8081/salary').then((res) => {
      setSalary(res.data[0].sumOfSalary);
    }).catch((err) => console.log(err));
  }, []);

  return (
    <div className='d-flex'>
      <div className='d-flex justify-content-around mt-3'>
       
        <div className=' department'>
          <div className='text-center pb-1'>
            <h4>Departments</h4>
          </div>
          <div className='iframe-container'>
            <iframe 
              className='centered-iframe'
              width='600'
              height='450'
              src='https://lookerstudio.google.com/embed/reporting/dc56af6c-ba1b-456e-b1b2-f388a88e582f/page/RlkcD'
              frameborder='0'
              style={{ border: '0', width: '100%', height: '500px' }}
              allowfullscreen
            ></iframe>
          </div>
          <div className='department-counts'>
  <div className='department-count employees-count'>
    <h5>14 Employees</h5>
  </div>
  <div className='department-count interns-count'>
    <h5>16 Interns</h5>
  </div>
 {/* <div className='department-count staff-count'>
    <h5>20 Staff</h5>
  </div>*/}
</div>
        </div>

        <div class='calendardiv'>
          <div>
            <ReactCalendar />
          </div>
          <div className='TaskList-container pt-3 pb-1'>
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
