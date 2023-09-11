import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './style.css'

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
                <div className='d-flex justify-content-center'> {/* Add justify-content-center */}
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

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {employeeCount}</h5>
          </div>
        </div>
        {/* <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {salary}</h5>
          </div>
        </div> */}
      </div>

      {/* List of admin  */}
    
    </div>
  )
}

export default Home