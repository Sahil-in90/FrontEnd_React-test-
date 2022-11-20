import React, { useState } from "react";
import { NavLink, useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({ ...user, [name]: value });
    }


    //Send data to the backend
    const postData = async (e) => {
        e.preventDefault();
        const {name, email, phone, password} = user;
        const res= await fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name, email, phone, password
            })
        })
        const data = await res.json();
        console.log(data)
        if(res.status==422 || !data) {
            window.alert('Could not signup')
        }
        else {
            window.alert("Signup sucessfully")
            navigate('/login');
        }
    }

    return (
        <div>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup_content">
                        <h2 className="form-title mb-5">Sign Up</h2>
                        <form method="POST" className="signup_form" id="signup_form">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Full Name</label>
                                <input type="text" name="name" className="form-control" id="name" autoComplete="OFF"
                                    value={user.name}
                                    onChange={handleInputs}
                                    placeholder="Sahil" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" name="email" className="form-control" id="email" autoComplete="OFF" value={user.email} onChange={handleInputs} placeholder="example@abc.com" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input type="number" name="phone" className="form-control" id="phone" autoComplete="OFF" value={user.phone} onChange={handleInputs} placeholder="1234567890" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name="password" className="form-control" id="password" autoComplete="OFF" value={user.password} onChange={handleInputs} />
                            </div>
                            <button type="submit" className="btn mt-2" onClick={postData}>Sign Up</button>
                            <NavLink to='/login' className='mt-2 text-center login_link'>Already have a account?</NavLink>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Signup;