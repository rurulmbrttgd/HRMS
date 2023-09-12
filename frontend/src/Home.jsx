import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './style.css'
import Calendar from 'react-calendar';


const ReactCalendar = () => {
    const [date, setDate] = useState(new Date());
  
    const onChange = date => {
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
  const [adminCount, setAdminCount] = useState()
  const [employeeCount, setEmployeeCount] = useState()
  const [salary, setSalary] = useState()

  useEffect(() => {
    axios.get('http://localhost:8081/adminCount')
		.then(res => {
			setAdminCount(res.data[0].admin)
		}).catch(err => console.log(err));

    axios.get('http://localhost:8081/employeeCount')
		.then(res => {
			setEmployeeCount(res.data[0].employee)
		}).catch(err => console.log(err));

    axios.get('http://localhost:8081/salary')
		.then(res => {
			setSalary(res.data[0].sumOfSalary)
		}).catch(err => console.log(err));

  } , [])
    return (
        <div className='d-flex'>
        <div className='d-flex justify-content-around mt-3'>
            <div className='px-3 pt-2 pb-3 department'>
            <div className='text-center pb-1'>
                <h4>Departments</h4>
            </div>
            <div className=''>
                <h5>Total: {adminCount}</h5>
            </div>
            <div className='d-flex justify-content-center'>
                <div className='no-employees'>
                <h5>100 Employees</h5>
                </div>
                <div className='no-interns'>
                <h5>30 Interns</h5>
                </div>
                <div className='no-staff'>
                <h5>20 Staff</h5>
                </div>
            </div>
            </div>

              <div class='calendardiv'>
                <div>
                  <ReactCalendar /> {/* Insert the Calendar component here */}
                </div>
                <div>
                  
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home