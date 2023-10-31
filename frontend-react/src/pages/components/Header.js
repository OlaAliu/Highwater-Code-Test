import React, { useState } from 'react';
import Logo from '../../images/logo.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../hooks/Auth';

const Header = ({ type }) => {
    const location = useLocation();
    const auth = useAuth();
    const navigate = useNavigate();

    const [seeMenu, setSeeMenu] = useState(false);
    const menuShow = () => {
        if (seeMenu)
            setSeeMenu(false)
        else
            setSeeMenu(true)
    }
    return (
        <>
            <nav className="navbar is-transparent">
                <div className="navbar-brand">
                    <Link className={`active navbar-item`} to={'/'} style={{ fontFamily: 'monospace', textIndent: '10px', fontWeight: 'bold' }}>
                        <img src={Logo} alt="Bulma: a modern CSS framework based on Flexbox" width="28" height="28" />
                        HIGHWATER CODE TEST
                    </Link>
                    <div className="navbar-burger" data-target="navbarExampleTransparentExample" onClick={() => menuShow()} >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>



                <div id="navbarExampleTransparentExample" className={`${seeMenu ? "visible" : "null"} navbar-menu`}>
                    {type === "checkout" ? (
                        <>
                            <div className='navbar-start'>
                                <div className='navbar-item'>
                                    <FontAwesomeIcon icon="lock" />
                                    <h3 style={{ marginLeft: '20px' }}>
                                        Secure Checkout
                                    </h3>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="navbar-start">
                                <Link className={`${location.pathname === "/" ? "active" : null} navbar-item`} to='/'>
                                    Home
                                </Link>
                                <Link className={`${location.pathname === "/auth/login" ? "active" : null} ${auth.isLoggedIn ? "is-hidden" : null} navbar-item`} to='/auth/login'>
                                    Login
                                </Link>
                                <Link className={`${location.pathname === "/dashboard" ? "active" : null} ${!auth.isLoggedIn ? "is-hidden" : null} navbar-item`} to='/dashboard'>
                                    Dashboard
                                </Link>
                            </div>

                            <div className="navbar-end">
                                <div className={`${location.pathname === "/" ? "active" : null} navbar-item`}>
                                    <div className="field is-grouped">
                                        <p className="control">
                                            <button
                                                className="button is-info"
                                                onClick={() => {
                                                    if (!auth.isLoggedIn) {
                                                        navigate('/auth/login')
                                                    } else {
                                                        auth.logOut();
                                                    }
                                                }}
                                            >
                                                <span className="icon">
                                                    <FontAwesomeIcon icon={auth.isLoggedIn ? "sign-out-alt" : "fa-solid fa-arrow-right-to-bracket"} />
                                                </span>
                                                <span>{auth.isLoggedIn ? "Log Out" : "Log In"}</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    }
                </div >
            </nav >
        </>
    )
}

export default Header