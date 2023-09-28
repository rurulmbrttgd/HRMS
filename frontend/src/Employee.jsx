import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Employee() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/employee')
      .then((res) => {
        if (res.data.status === "Success") {
          setData(res.data.data); // Assuming employee data is in the 'data' field
        } else {
          setError("Error: Unable to fetch employee data");
        }
      })
      .catch((err) => {
        setError(`Error: ${err.message}`);
      });
  }, []);

  const handleDelete = (ID) => {
    if (confirm("Do you want to delete this employee?") == true){
      axios.delete('http://localhost:8081/employee/'+ID)
      window.location.reload(true);
    }
  }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Employee List</h3>
      </div>
      <Link to="/create-form" className='btn btn-success'>Add Employee</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th scope="col">Employee ID</th>
              <th scope="col">Full Name</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Email</th>
              <th scope="col">Type</th>
              <th scope="col">Department</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
      <tbody>
        
  {data.map((employee, index) => {
    return (  
      <tr key={index} className="clickable-row" onClick={() => handleRowClick(employee.id)}>
     
        <td>{employee.ID}</td>
        <td>{employee.fullName}</td>
        <td>{employee.dateOfBirth}</td>
        <td>{employee.email}</td>
        <td>{employee.typeName}</td>
        <td>{employee.departments}</td>
        <td>
        <Link to={`/EmployeeDetails/${employee.ID}`} className='btn bi-eye-fill text-info view'></Link>
        <Link to={`/EmployeeEdit`} className="btn btn-primary btn-sm me-2">Edit</Link>
          <button onClick={e => handleDelete(employee.ID)} className="btn btn-sm btn-danger">
            Delete
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

        </table>
      </div>
    </div>
  )
}

export default Employee
