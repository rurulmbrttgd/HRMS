import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            if(res.data.Status === 'Success') {
                navigate('/');
            } else {

                setError(res.data.Error);
            }
        })
        .catch(err => console.log(err));
    }


    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <div className="text-center"> {/* Added a container for the image and centered it */}
                    <img
                        src="https://res.cloudinary.com/dxzvh2xex/image/upload/v1692943459/capstone-logo_rj4krr.png"
                        alt=""
                        className="width-172px logo"
                    />
                </div>
                <h2 className='text-center'>Capstone-Intel Corporation</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username"><strong>Username</strong></label>
                        <input
                            type="username"
                            placeholder="Email or Username"
                            name="username"
                            className="form-control rounded-20"
                            onChange={e => setValues({...values, username: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-20"
                            onChange={e => setValues({...values, password: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-20">Log in</button>
                    <p>You agree to our terms and conditions</p>
                    {/* <button className="btn btn-default border w-100 bg-light rounded-20">
                        Create Account
                    </button> */}
                </form>
            </div>
        </div>
    );
}

export default Login;
