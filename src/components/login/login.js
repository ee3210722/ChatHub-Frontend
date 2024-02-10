import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./login.css"

export default function Login(props) {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })


    const handleOnLogin = async (e) => {
        e.preventDefault();
        const response = await axios.post(
            "https://chathub-server-r5w7.onrender.com/login",
            {
                email: credentials.email,
                password: credentials.password
            },
            {
                headers: {
                'Content-Type': 'application/json'
                }
            }
        );
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged in Succesully", "success");
            navigate("/dashboard");
        }
        else{
            props.showAlert(json.msg, "danger");
        }
    }

    const handleChange = e => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="login-container">
            <form className="login" onSubmit={handleOnLogin}>
                <h1>Login</h1>
                <input type="text" name="email" id="email" value={credentials.email} placeholder="Enter your Email" onChange={handleChange} autoComplete="new-email"></input>
                <input type="password" name="password" id="password" value={credentials.password} placeholder="Enter your Password" onChange={handleChange} autoComplete="new-password"></input>
                <button className="button" type="submit">Login</button>
                <div>or</div>
                <button className="button" onClick={()=> navigate('/register')}>Signup</button>
            </form>
        </div>
    )
}