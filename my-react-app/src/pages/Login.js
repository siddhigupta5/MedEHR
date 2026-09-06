import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { Grid } from "@mui/material";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await API.post(
                "/auth/login",
                formData
            );

            console.log(
                "Login response:",
                response.data
            );

            // Store JWT
            localStorage.setItem(
                "token",
                response.data.token
            );

            console.log(
                "Token saved:",
                localStorage.getItem("token")
            );

            // Go to Dashboard
            navigate("/dashboard");

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Invalid email or password."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            <h1 className="sub-heading">
                Login
            </h1>

            <Grid container spacing={2}>

                {/* LEFT - IMAGE */}

                <Grid item xs={12} sm={6}>

                    <img
                        src="images/login.jpg"
                        className="ehr-login"
                        alt="ehr-login"
                    />

                </Grid>

                {/* RIGHT - FORM */}

                <Grid item xs={12} sm={6}>

                    <form
                        className="form-signin"
                        onSubmit={handleSubmit}
                    >

                        <h1 className="heading center">
                            Welcome!
                        </h1>

                        {/* Error */}

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        {/* Email */}

                        <div className="mb-3">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                className="form-control middle"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* Password */}

                        <div className="mb-3">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                className="form-control bottom"
                                placeholder="Enter Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* Login Button */}

                        <div className="d-grid">

                            <button
                                type="submit"
                                className="btns btn-primary"
                                disabled={loading}
                            >

                                {loading
                                    ? "Logging in..."
                                    : "Login"}

                            </button>

                        </div>

                        <p className="mt-3 mb-3 center text-body-secondary">
                            © MedEHR
                        </p>

                    </form>

                </Grid>

            </Grid>

        </div>
    );
}

export default Login;