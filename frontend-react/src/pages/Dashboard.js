import React, { useState } from 'react'
import Style from './components/Dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from './components/Sidebar';
import DashHead from './components/DashHead';
import { useAuth } from '../hooks/Auth';
import SuperAdmin from './SuperAdmin';
import B2b from './B2b';

const Dashboard = () => {
    const auth = useAuth();
    const [hideSide, setHideSide] = useState(false);
    return (
        <>
            <section className={Style.container}>
                <button
                    onClick={() => {
                        if (hideSide)
                            setHideSide(false)
                        else
                            setHideSide(true)
                    }}
                    className={Style.menuBar}
                >
                    <FontAwesomeIcon icon="bars" />
                </button>
                <div className={`${Style.subContainer} ${hideSide ? `${Style.noSide}` : null}`}>
                    <section className={`${Style.sideBox} `}>
                        <Sidebar />
                    </section>
                    <section className={`${Style.mainBox}`}>
                        <DashHead title="Dashboard" />
                        {auth.role === "admin" ? <SuperAdmin /> : <B2b />}
                    </section>
                </div>
            </section>
        </>
    )
}

export default Dashboard