import React from 'react';
import Style from './Dashboard.module.css'
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../images/logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../hooks/Auth';

const Sidebar = () => {
    const location = useLocation();
    const auth = useAuth();
    return (
        <>
            <nav className="navbar-brand">
                <Link className={`active navbar-item`} to={'/'} style={{ fontFamily: 'monospace', textIndent: '10px', fontWeight: 'bold' }}>
                    <img src={Logo} alt="Bulma: a modern CSS framework based on Flexbox" width="28" height="28" />
                    HIGHWATER CODE TEST
                </Link>
            </nav>
            <ul className={`${Style.menuBox}`}>
                <li className={`${location.pathname === "/dashboard" ? `${Style.active}` : null} ${Style.menuEach}`}>
                    <Link className={`${Style.menuLink}`} to={'/dashboard'}>
                        <FontAwesomeIcon icon="dashboard" className={`${Style.meniIcon} mr-3`} />
                        Dashboard
                    </Link>
                </li>
                <li className={`${Style.menuEach}`}
                    onClick={() => {
                        auth.logOut();
                    }}
                >
                    <span className={`${Style.menuLink}`} to={'/dashboard'}>
                        <FontAwesomeIcon icon="sign-out-alt" className={`${Style.meniIcon} mr-3`} />
                        Log out
                    </span>
                </li>
            </ul>
        </>
    )
}

export default Sidebar