import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./signup.css";

export default function Signup(props) {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: ""});

    const handleChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value})
    }

    const handleOnSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = credentials;
        try {
            const response = await axios.post(
                "https://chathub-server-r5w7.onrender.com/register",
                {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
                }
            );
            const json = await response.json();
            if (json.success) {
                props.showAlert("Account Created Successfully", "success");
                navigate("/login");
            } else {
                props.showAlert("Invalid Credentials", "danger");
            }
        } catch (error) {
            console.error("Error occurred during signup:", error);
            props.showAlert("An error occurred during signup", "danger");
        }
    }


    return (
        <div className="signup-container">
            <form className="signup" onSubmit={handleOnSignup}>
                <h1>Sign Up</h1>
                <input type="text" name="name" id="name" value={credentials.name} placeholder="Enter your Name" onChange={handleChange} autoComplete="new-name"></input>
                <input type="text" name="email" id="email" value={credentials.email} placeholder="Enter your Email" onChange={handleChange} autoComplete="new-email"></input>
                <input type="password" name="password" id="password" value={credentials.password}  placeholder="Enter your Password" onChange={handleChange} autoComplete="new-password" minLength="5" required></input>
                <input type="password" name="confirmPassword" id="confirmPassword" value={credentials.confirmPassword}  placeholder="Confirm your Password" onChange={handleChange} minLength="5" required></input>
                <button className="button" type="submit">Signup</button>
                <div>or</div>
                <button className="button" onClick={()=> navigate('/login')}>Login</button>
            </form>
        </div>
    )
}