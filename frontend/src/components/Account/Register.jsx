import React, { useState } from 'react';
import { message } from 'antd';
import './Account.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                message.success("Register successful!");
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                }); // Clear the form data
            } else {
                message.error("Couldn't register!");
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch:", error);
            message.error("Failed to fetch: " + error.message);
        }
    };

    return (
        <div className="account-column">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>
                        <span>Username <span className="required">*</span></span>
                        <input
                            type="text"
                            name="username"
                            onChange={handleInputChange}
                            value={formData.username}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <span>Email address <span className="required">*</span></span>
                        <input
                            type="email"
                            name="email"
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <span>Password <span className="required">*</span></span>
                        <input
                            type="password"
                            name="password"
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                    </label>
                </div>
                <div className="privacy-policy-text remember">
                    <p>
                        Your personal data will be used to support your experience throughout this website, to
                        manage access to your account, and for other purposes described in our <a href="#">privacy policy.</a>
                    </p>
                    <button className="btn btn-sm" type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
