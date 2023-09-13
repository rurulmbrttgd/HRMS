import React from 'react';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Employee from './Employee';
// import Profile from './Profile';
import Home from './Home';
import AddEmployee from './AddEmployee';
import FormTopbar from './FormTopbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          {/* <Route path='/profile' element={<Profile />}></Route> */}
        </Route>

        <Route path='/create' element={<FormTopbar />}>
          <Route path="/create" element={<AddEmployee />} />
        </Route>
        
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
