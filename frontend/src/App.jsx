import React from 'react'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Dashboard from './Dashboard'
// import Employee from './Employee'
// import Profile from './Profile'
// import Home from './Home'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={<Dashboard />}>
        <Route path='' element={<Home />}></Route>
        <Route path='/employee' element={<Employee />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Route> */}
      <Route path='/login' element={<Login />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App