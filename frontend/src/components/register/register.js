import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './register.css';

const Register = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const {name, email, password, cpassword} = user
        if (name && email && password && (password===cpassword)){
            alert("Registered")
            axios.post("http://localhost:8000/register", user)
            .then((res) => {
                alert(res.data.message)
                navigate("/login")
            })
        }
        else {
            alert("Invalid input")
        }
    }

    return <div className="register">
        <h1>Register</h1>
        <input type="text" name="name" value={user.name} placeholder="Enter your name" onChange={handleChange}/>
        <input type="email" name="email" value={user.email} placeholder="Enter your email address" onChange={handleChange}/>
        <input type="password" name="password" value={user.password} placeholder="Enter your password" onChange={handleChange}/>
        <input type="password" name="cpassword" value={user.cpassword} placeholder="Re-enter your password" onChange={handleChange}/>
        <div className="button" onClick={register}>Register</div>
        <div>or</div>
        <div className="button" onClick={() => navigate("/login")}>Login</div>
    </div>
}

export default Register;