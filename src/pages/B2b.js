import React from 'react'
import Style from './components/Dashboard.module.css';
import { useAuth } from '../hooks/Auth';

const B2b = () => {
    const auth = useAuth();
    return (
        <>
            <section>
                <div className={`${Style.columns}`} >
                    <div className={`${Style.counter} column is-6`} style={{ backgroundColor: 'transparent', textAlign: 'left' }}>
                        <h2 className={Style.counterNum} style={{ fontSize: '20px', textAlign: 'left' }}>
                            Welcome, {auth.email}!
                        </h2>
                    </div>
                </div>
            </section>
            <section>
                <div className={`${Style.columns}`} >
                    <div className={`${Style.counter} column is-5 has-background-white`}>
                        <div className={` ${Style.dFlex}`}>
                            <span style={{ fontWeight: 'bolder', fontSize: 'larger' }} >
                                Account Information
                            </span>
                        </div>
                        <div className="mt-3 is-responsive">
                            <dl>
                                <dt>Fullname</dt>
                                <dd>{auth.userDetails.name}</dd>
                                <hr />
                                <dt>Email Address</dt>
                                <dd>{auth.userDetails.email}</dd>
                                <hr />
                                {auth.role === "Role Not Defined" ? (
                                    <>
                                        No role assigned, <br /> purchase a product to get assigned a role
                                    </>
                                ) : (
                                    <>
                                        <dt>{auth.role} Purchase Details</dt>
                                        <dd>{auth.userDetails.pm_last_four}</dd>
                                    </>
                                )}
                            </dl>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default B2b