import "./Register.css";
import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate = useNavigate()

    const [form, setForm] = useState(
        {
            fullname: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    );

function handleChange(e){
    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
}

function handleSubmit(e){
    e.preventDefault();
    registerUser(form.fullname, form.email, form.password)
}


return <div className="register-page">
        <div className="register-card">
            <header className="register-header">
                <h2>Welcome to ChemBot-AI</h2>
                <h3>Register here</h3>
            </header>
            {/* <button type="button" onClick={()=>navigate("/login")}>login</button> */}
            <form className="register-form" method="post" onSubmit={handleSubmit}>
                <input type="text" name="fullname" placeholder="enter full name" onChange={handleChange}/>
                <input type="email" name="email" placeholder="email@example.com" onChange={handleChange}/><br />
                <input type="password" name="password" placeholder="enter password" onChange={handleChange}/>
                <input type="password" name="confirmPassword" placeholder="confirm password" onChange={handleChange}/><br />
                <button type="submit">Register</button>
            </form>
            <p className="login-text">
                Already have an account?
                <span onClick={() => navigate("/login")}> Login</span>
            </p>
        </div>
</div>
}

export default Register