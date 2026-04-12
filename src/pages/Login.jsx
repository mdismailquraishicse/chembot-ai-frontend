import "./Login.css"
import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login(){
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

    function handleSubmit(){
        const token = login(form.email, form.password)
        if (token){
            navigate("/");
        }
    }
    return <div className="login-page">
            <div className="login-card">
                <header className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Login to your account</p>
                </header>
        <form className="login-form">
            <input type="email" name="email" onChange={handleChange} /><br />
            <input type="password" name="password" onChange={handleChange} /><br />
            <button type="button" onClick={handleSubmit}>login</button>
        </form>
        <p className="register-text">
            Don’t have an account?
            <span onClick={() => navigate("/register")}> Register</span>
        </p>
        {/* <button type="button" onClick={()=>navigate("/register")}>register</button> */}
        </div>
    </div>
}
export default Login