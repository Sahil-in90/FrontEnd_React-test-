import React, { useState } from "react";
import { NavLink , useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setLogin({ ...login, [name]: value });
    }

  

    const loginUser = async (e) => {
        e.preventDefault();
        const {email, password} = login;
        const res= await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email, password
            })
        })
        const data = await res.json();
        console.log(data)
        if(res.status==400 || !data) {
            window.alert('Could not login')
        }
        else {
            window.alert("Login sucessfully")
            navigate('/home');
        }
    }

    return (
<div>
            <section className="login">
                <div className="container mt-5">
                    <div className="login_content">
                        <h2 className="form-title mb-5 text-center">Log in</h2>
                        <form method="POST" className="login_form" id="login_form">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" name="email" className="form-control" id="email" autoComplete="OFF" value={login.email} onChange={handleInputs} placeholder="example@abc.com"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name='password' className="form-control" id="password" autoComplete="OFF" value={login.password} onChange={handleInputs} />
                            </div>
                            <button type="submit" className="btn mt-2" onClick={loginUser}>Login</button>
                            <NavLink to='/signup' className='mt-2 text-center signup_link'>Create an account</NavLink>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Login;