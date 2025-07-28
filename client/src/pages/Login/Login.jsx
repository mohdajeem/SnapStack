import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../services/authService.js';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        try {
            const data = await loginUser(formData);
            if (data.success) {
                login(data);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message || "Failed to log in.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='auth-container'>
            <form className='auth-form' onSubmit={handleSubmit}>
                <h1>Welcome Back</h1>
                {error && <p className="error-message">{error}</p>}
                <input name='email' value={formData.email} onChange={handleChange} type="email" placeholder='Email' required disabled={isLoading} />
                <input name='password' value={formData.password} onChange={handleChange} type="password" placeholder='Password' required disabled={isLoading} />
                <button type='submit' disabled={isLoading}>{isLoading ? 'Logging In...' : 'Login'}</button>
                <p className="form-switch">Don't have an account? <Link to="/register">Sign up</Link></p>
            </form>
        </div>
    );
};

export default Login;