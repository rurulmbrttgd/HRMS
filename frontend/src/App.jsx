import React from 'react';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Employee from './Employee';
<<<<<<< Updated upstream
// import Profile from './Profile';
import Home from './Home';
import AddEmployee from './AddEmployee';
import FormTopbar from './FormTopbar';
=======
import Form from './components/Form';
>>>>>>> Stashed changes

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          {/* <Route path='/profile' element={<Profile />}></Route> */}
        </Route>

        <Route path='/create' element={<FormTopbar />}>
          <Route path="/create" element={<AddEmployee />} />
        </Route>
        
        <Route path="/login" element={<Login />} />
=======
        <Route path="/login" element={<Login />}></Route>
        <Route path="/create-form" element={<Form />}></Route>
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}

export default App;
