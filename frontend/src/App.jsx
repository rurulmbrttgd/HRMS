import React from 'react';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Employee from './Employee';
// import Profile from './Profile';
import Home from './Home';
import AddEmployee from './AddEmployee';
import FormTopbar from './FormTopbar';
import WorkExperience from './WorkExperience';
import OtherInformation from './OtherInformation';
import LearningDev from './LearningDev';
import TopbarEmployee from './TopbarEmployee';
import PersonalbackgroundForm from './PersonalbackgroundForm';
import EmployeeDetails from './EmployeeDetails';
import EmployeeEdit from './EmployeeEdit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/" element={<TopbarEmployee /> }>
          <Route path="/employee" element={<Employee />} />
        </Route>

    
        <Route path="/EmployeeDetails/:id" element={<EmployeeDetails />} />
<Route path="/EmployeeEdit" element={<EmployeeEdit />} />

      

        <Route path="/" element={<FormTopbar />}>
          <Route path="/create" element={<AddEmployee />} />
         
          <Route path="/personalbackground" element={<PersonalbackgroundForm />} />
          <Route path="/workexperience" element={<WorkExperience />} />
          <Route path="/learningdevelopment" element={<LearningDev />} />
          <Route path="/otherinformation" element={<OtherInformation />} />
        </Route>
        
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
