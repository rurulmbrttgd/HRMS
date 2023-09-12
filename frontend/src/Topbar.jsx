import React, { useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './style.css'


<div class="col p-0 m-0">
    <div className='p-2 d-flex justify-content-left shadow topbar banner'>
        <h1 className='p-3 h1text'>Employee List</h1>
					

    </div>
    <Outlet />
</div>

export default Topbar