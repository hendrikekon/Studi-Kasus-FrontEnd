import React, { useState } from 'react';
import './index.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { performLogin, } from '../../app/features/Auth/actions';

const LoginForm = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!email) {
          newErrors.email = 'Email tidak boleh kosong';
        }
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
        if (!re.test(String(email).toLowerCase())) {
          newErrors.email = 'Format email tidak valid';
        }
        if (!password) {
          newErrors.password = 'Password tidak boleh kosong';
        }
        if (password.length < 4) {
          newErrors.password = 'Password minimal 4 karakter';
        }
        return newErrors;
    };
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        // const data = {email, password}
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
        try {
            console.log(email)
            console.log(password)
            // const response = await loginUser({email, password});
            // console.log('login Success:', response);
            // const { user, token } = response.data;
            // localStorage.setItem('auth', JSON.stringify({ user, token }));
            // dispatch(userLogin({ user, token }));
            await dispatch(performLogin({email, password}))
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            // console.error('login Failed: ', error.message);
            setErrors({ form: 'Login Gagal. Email atau Password Salah' });
            setIsLoggedIn(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2  className="Login">Login</h2>
            {errors.form && <p className="error">{errors.form}</p>}
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <button type="submit" className="login-button">Login</button>
            <div className="form-group">
                <NavLink to="/register" className="linkRegister">Create Account</NavLink>
            </div>
        </form>
    );
};

export default LoginForm