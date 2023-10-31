import React, { useState } from 'react';
import Styles from './Login.module.css';
import { useHook } from '../hooks/Hook';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../hooks/Auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
    const hook = useHook();
    const auth = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('')
    const [cpasswordError, setCPasswordError] = useState('')

    const handleRegister = async () => {
        setLoading(true)
        if (name.length === 0) {
            setNameError('Name is required');
            setLoading(false)
            return
        }
        if (email.length === 0) {
            setEmailError('Email address is required');
            setLoading(false)
            return
        }
        if (password.length === 0) {
            setPasswordError('Password is required')
            setLoading(false)
            return
        }
        
        if (cpassword.length === 0) {
            setCPasswordError('Confirm password is required')
            setLoading(false)
            return
        }
        
        if (cpassword !== password) {
            setCPasswordError('Password mismatch')
            setLoading(false)
            return
        }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${hook.api}api/register`,
            data: {
                "name": name,
                "email": email,
                "password": password,
                "confirm_password": cpassword
            }
        };

        try {
            let response = await axios(config)
                .then((response) => {
                    if (response.data.error) {
                        let source = response.data.error.source;
                        if (source === "email") {
                            setEmailError(response.data.error.message)
                        } else if (source === "password") {
                            setPasswordError(response.data.error.message)
                        } else {
                            setEmailError(response.data.error.message)
                        }
                    } else {
                        setTimeout(() => {
                            navigate('/auth/login')
                        }, 1500);
                    }
                })
        } catch (error) {
            setEmailError(error.message)
        } finally {
            setLoading(false)
        }

    }
    return (
        <>
            <div className={Styles.container}>
                <div className={Styles.loginBox} >
                    <section className={Styles.headerTab}>
                        <button className={Styles.backButton} onClick={() => { navigate('/auth/login') }} >
                            <i className="fas fa-chevron-left fa-2x"></i>
                        </button>
                        <div className={Styles.nameBox}>
                            HIGHWATER CODE TEST
                        </div>
                    </section>
                    <div className={`${Styles.titleBox} mt-5`}>
                        Log into your account
                    </div>
                    <section className={Styles.body}>
                        <div className={`${emailError.length === 0 ? "is-hidden" : "notification is-danger is-light p-2"} `}>
                            <button
                                className="delete"
                                onClick={() => {
                                    setEmailError('');
                                }}
                            ></button>
                            <strong>{emailError}</strong>
                        </div>
                        <div className={`${(passwordError.length === 0 || cpasswordError.length === 0) ? "is-hidden" : "notification is-danger is-light p-2"} `}>
                            <button
                                className="delete"
                                onClick={() => {
                                    setPasswordError('');
                                    setCPasswordError('')
                                }}
                            ></button>
                            <strong>{passwordError}</strong>
                            <strong>{cpasswordError}</strong>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); handleRegister() }} >
                            <div className="field mt-5">
                                <p className="control has-icons-left has-icons-right">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Fullname"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            setNameError('')
                                        }}
                                        required
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                    {emailError.length > 0 ? (
                                        <span className="icon is-small is-right">
                                            <i className="fas fa-exclamation-circle" style={{ color: 'red' }}></i>
                                        </span>
                                    ) : null}
                                </p>
                            </div>
                            <div className="field mt-5">
                                <p className="control has-icons-left has-icons-right">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setEmailError('')
                                        }}
                                        required
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                    {emailError.length > 0 ? (
                                        <span className="icon is-small is-right">
                                            <i className="fas fa-exclamation-circle" style={{ color: 'red' }}></i>
                                        </span>
                                    ) : null}
                                </p>
                            </div>
                            <div className="field mt-5">
                                <p className="control has-icons-left has-icons-right">
                                    <input className="input"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setPasswordError('')
                                        }}
                                        required
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                    {passwordError.length > 0 ? (
                                        <span className="icon is-small is-right">
                                            <i className="fas fa-exclamation-circle" style={{ color: 'red' }}></i>
                                        </span>
                                    ) : null}
                                </p>
                            </div>
                            <div className="field mt-5">
                                <p className="control has-icons-left has-icons-right">
                                    <input className="input"
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={cpassword}
                                        onChange={(e) => {
                                            setCPassword(e.target.value);
                                            setCPasswordError('')
                                        }}
                                        required
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                    {cpasswordError.length > 0 ? (
                                        <span className="icon is-small is-right">
                                            <i className="fas fa-exclamation-circle" style={{ color: 'red' }}></i>
                                        </span>
                                    ) : null}
                                </p>
                            </div>
                            <button type='submit' disabled={loading} className={`${Styles.coloredButton} mt-5`}>
                                {loading ? "..." : "REGISTER"}
                            </button>
                            <br />
                            <br />
                            <p className='mt-4' style={{ textAlign: 'center' }}>
                                Already have an account? 
                            </p>

                            <button type='button' onClick={() => navigate('/auth/login')} className={`${Styles.outlineButton} mt-2`}>
                                LOG IN
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Register