import React, { useState } from 'react';
import './Nav.css';
import likeIcon from './mainlogo.png';
import Login from '../Login/Login';
import Register from '../Register/Register';

export default function Nav() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleLoginModal = () => {
        setShowLogin(!showLogin);
        if (showRegister) setShowRegister(false);
    };

    const toggleRegisterModal = () => {
        setShowRegister(!showRegister);
        if (showLogin) setShowLogin(false);
    };

    // Simple mock login (no backend, no JWT)
    const handleLogin = () => {
        setIsLoggedIn(true);
        setShowLogin(false);
    };

    // Mock logout
    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div className='ng-al'>
            <div className="navbar">
                <div className="left">
                    <div>
                        <img src={likeIcon} alt="Logo" className="like-icon" />
                    </div>
                </div>
                <div className="right">
                    <ul className="nv-ul">
                        <li className="nv-li"><a href="#home">Home</a></li>
                        <li className="nv-li"><a href="#global">Global</a></li>
                        <li className="nv-li"><a href="#auction">Auction</a></li>

                        {isLoggedIn ? (
                            <li className="nv-li"><a href="#" onClick={handleLogout}>Logout</a></li>
                        ) : (
                            <>
                                <li className="nv-li"><a href="#" onClick={toggleRegisterModal}>Register</a></li>
                                <li className="nv-li"><a href="#" onClick={toggleLoginModal}>Login</a></li>
                            </>
                        )}
                    </ul>
                </div>
                <div className="nv-sch">
                    <input type="search" className="nv-srch" placeholder="Search" />
                    <button className="nv-btn">Search</button>
                </div>
            </div>

            {showLogin && <Login onClose={toggleLoginModal} onRegister={toggleRegisterModal} onLogin={handleLogin} />}
            {showRegister && <Register onClose={toggleRegisterModal} onLogin={toggleLoginModal} />}
        </div>
    );
}
