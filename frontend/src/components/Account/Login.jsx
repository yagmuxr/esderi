import React, { useState } from 'react';
import { message } from 'antd';
import './Account.css';

const Login = () => {
    const [formData, setFormData] = useState({
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

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("user", JSON.stringify(data));
                message.success("Login successful!");

                if (data.role === "admin") {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/";
                }
            } else {
                const errorData = await response.json();
                message.error(`Login failed: ${errorData.error}`);
            }
        } catch (error) {
            message.error("Failed to fetch: " + error.message);
            console.error("Failed to fetch:", error);
        }
    };

    return (
        <div className="account-column">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        <span>Email address <span className="required">*</span></span>
                        <input
                            type="email"
                            name="email"
                            onChange={handleInputChange}
                            value={formData.email}
                            required
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
                            required
                        />
                    </label>
                </div>
                <p className="remember">
                    <label>
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </label>
                    <button className="btn btn-sm" type="submit">Login</button>
                </p>
                <a href="#" className="form-link">Lost your password?</a>
            </form>
        </div>
    );
};

export default Login;
