import React from 'react';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Employee from './Employee';
import Home from './Home';
import TopbarEmployee from './TopbarEmployee';
import EmployeeDetails from './EmployeeDetails';
import EmployeeEdit from './EmployeeEdit';
import Form from './components/Form';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/create-form" element={<Form />}/>

        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/" element={<TopbarEmployee />}>
          <Route path="/employee" element={<Employee />} />
        </Route>

        <Route path="/EmployeeDetails/:id" element={<EmployeeDetails />} />
        <Route path="/EmployeeEdit" element={<EmployeeEdit />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
