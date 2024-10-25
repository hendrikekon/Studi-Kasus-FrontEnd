import React, { useState } from 'react';
import { useDispatch, useSelector,  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { performLogout } from '../../app/features/Auth/actions';
import './index.css';

const Logout = ({ setIsLoggedIn }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleLogout = async () => {
        try {
            await dispatch(performLogout());
            setIsLoggedIn(false);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const confirmLogout = () => setShowConfirm(true);
    const cancelLogout = () => setShowConfirm(false);

    return (
        <div className="logout-container">
            <button onClick={confirmLogout} className="logout-button">
                Logout
            </button>
            {showConfirm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Are you sure you want to logout?</p>
                        <button onClick={handleLogout} className="confirm-button">Yes</button>
                        <button onClick={cancelLogout} className="cancel-button">No</button>
                    </div>
                </div>
            )}
            {/* {isLoggedIn ? <p>Logging out...</p> : <p>Logged out successfully.</p>} */}
            {!isLoggedIn && <p>Logged out successfully.</p>}
        </div>
    );
};

export default Logout;