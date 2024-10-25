import React, { useState } from 'react';
import './index.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { registerUser } from '../../app/api/auth';
// import { useDispatch } from 'react-redux'


const RegisterForm = () => {
    const [full_name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccesMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!full_name) {
          newErrors.fullName = 'Nama lengkap tidak boleh kosong';
        }
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
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Password tidak sama';
        }
        return newErrors;
    };


    const confirmError = () => setSuccesMessage(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors({});
        setSuccesMessage(false);
        setErrorMessage(false);
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
        
        const data = { full_name, email, password};
        try {
            console.log(full_name, email, password);

            const response = await registerUser(data);
            console.log('Registration Successful', response);
            // setSuccesMessage('Registerasi berhasil. Silahkan login');
            // confirmSuccess();
            setSuccesMessage(true);
            // console.log('Registration Successful', response);
            // navigate('/login');
        } catch (error) {
            setErrorMessage(true);
            console.error('Registration Failed', error);
            // setErrorMessage('Registerasi gagal, silahkan coba lagi atau email sudah terdaftar');
        }
    };

    const navLogin = () => {
        navigate('/login');
    }

    

    return (
        <form onSubmit={handleSubmit} className="register-form">
            <h2 className="Register">Register</h2>
            {successMessage && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Registerasi berhasil. Silahkan login</p>
                        <button onClick={navLogin} className="confirm-button">Login</button>
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Registerasi gagal atau email sudah terdaftar. silahkan coba lagi</p>
                        <button onClick={confirmError} className="cancel-button">Coba Lagi</button>
                    </div>
                </div>
            )}
            <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <input
                    type="text"
                    id="fullName"
                    value={full_name}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>
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
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>
            <button type="submit" className="register-button">Register</button>
            <div className="form-group">
                <div className="link-container">
                    <NavLink to="/login" className="linkLogin">Already have an account? Login</NavLink>
                </div>
            </div>
        </form>
    );
};

export default RegisterForm;
