import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import { Grid } from "@mui/material";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        role: "PATIENT"
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            const response = await API.post(
                "/auth/register",
                formData
            );

            console.log("Registration successful:", response.data);

            setSuccess("Registration successful! Redirecting to login...");

            setFormData({
                fname: "",
                lname: "",
                email: "",
                password: "",
                role: "PATIENT"
            });

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="register-page">

            <h1 className="sub-heading">
                Register
            </h1>

            <Grid container spacing={2}>

                {/* LEFT - FORM */}

                <Grid item xs={12} sm={6}>

                    <form
                        className="form-signin-reg"
                        onSubmit={handleSubmit}
                    >

                        <h1 className="heading center">
                            Create Account
                        </h1>

                        {/* Error */}

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        {/* Success */}

                        {success && (
                            <div className="alert alert-success">
                                {success}
                            </div>
                        )}

                        {/* First Name */}

                        <div className="mb-3">

                            <label>
                                First Name
                            </label>

                            <input
                                type="text"
                                className="form-control top"
                                placeholder="Enter first name"
                                name="fname"
                                value={formData.fname}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* Last Name */}

                        <div className="mb-3">

                            <label>
                                Last Name
                            </label>

                            <input
                                type="text"
                                className="form-control middle"
                                placeholder="Enter last name"
                                name="lname"
                                value={formData.lname}
                                onChange={handleChange}
                                required
                            />

                        </div>

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
                                className="form-control middle"
                                placeholder="Enter Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />

                        </div>

                        {/* Role */}

                        <div className="mb-3">

                            <label>
                                Register As
                            </label>

                            <select
                                className="form-control bottom"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >

                                <option value="PATIENT">
                                    Patient
                                </option>

                                <option value="DOCTOR">
                                    Doctor
                                </option>

                            </select>

                        </div>

                        {/* Submit */}

                        <div className="d-grid">

                            <button
                                type="submit"
                                className="btns btn-primary"
                                disabled={loading}
                            >

                                {loading
                                    ? "Creating Account..."
                                    : "Register"}

                            </button>

                        </div>

                        <p className="mt-3 mb-3 center text-body-secondary">
                            © MedEHR
                        </p>

                    </form>

                </Grid>

                {/* RIGHT - IMAGE */}

                <Grid item xs={12} sm={6}>

                    <img
                        src="images/ehr-register.png"
                        className="ehr-register"
                        alt="ehr-register"
                    />

                </Grid>

            </Grid>

        </div>
    );
}

export default Register;