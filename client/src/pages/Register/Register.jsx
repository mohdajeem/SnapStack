import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { registerUser } from '../../services/authService.js';
import '../Login/Login.css'; // Re-use the same CSS

const Register = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const data = await registerUser(formData);
            if (data.success) {
                login(data);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message || "Failed to register.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='auth-container'>
            <form className='auth-form' onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                {error && <p className="error-message">{error}</p>}
                <input name='username' value={formData.username} onChange={handleChange} type="text" placeholder='Username' required disabled={isLoading} />
                <input name='email' value={formData.email} onChange={handleChange} type="email" placeholder='Email' required disabled={isLoading} />
                <input name='password' value={formData.password} onChange={handleChange} type="password" placeholder='Password (min. 6 characters)' required disabled={isLoading} />
                <button type='submit' disabled={isLoading}>{isLoading ? 'Creating Account...' : 'Sign Up'}</button>
                <p className="form-switch">Already have an account? <Link to="/login">Log in</Link></p>
            </form>
        </div>
    );
};

export default Register;