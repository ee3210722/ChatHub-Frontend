import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from "../../services/info"
import "./login.css"

export default function Login(props) {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleOnLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BACKEND_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const responseData = await response.json();

            if (responseData.success) {
                sessionStorage.setItem('userInfo', JSON.stringify(responseData.userInfo));
                sessionStorage.setItem('token', responseData.authToken);
                props.showAlert(responseData.msg, 'success');
                navigate('/dashboard');
            } else {
                props.showAlert(responseData.msg, 'danger');
            }
        } catch (error) {
            props.showAlert('An error occurred during login', 'danger');
        }
    };


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