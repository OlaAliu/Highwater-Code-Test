import React, { useState } from 'react';
import Styles from './Login.module.css';
import { useHook } from '../hooks/Hook';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../hooks/Auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const hook = useHook();
    const auth = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('')

    const handleLogin = async () => {
        setLoading(true)
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

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${hook.api}api/login`,
            data: {
                "email": email,
                "password": password,
            },
            headers: {
                'Content-Type': 'application/json',
            }
        };

        try {
            let response = await axios(config)
                .then((response) => {
                    if (response.data.error) {
                        let source = response.data.errors;
                        if (source === "email") {
                            setEmailError(response.data.error.message)
                        } else if (source === "password") {
                            setPasswordError(response.data.error.message)
                        } else {
                            setEmailError(response.data.error.message)
                        }
                    } else {
                        auth.storeActiveToken(response.data.user.email, response.data.token, response.data.user, response.data.role, response.data.user.id);
                        let next;
                        if (response.data.role === "Role Not Defined") {
                            next = '/';
                        } else {
                            next = '/dashboard';
                        }
                        setTimeout(() => {
                            navigate(next)
                        }, 1500);
                    }
                })
        } catch (error) {
            // Swal.fire("Login", error.message, "error", {
            //     button: false,
            //     timer: 3000,
            // });
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
                        <button className={Styles.backButton} onClick={() => { navigate('/') }} >
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
                        <div className={`${passwordError.length === 0 ? "is-hidden" : "notification is-danger is-light p-2"} `}>
                            <button
                                className="delete"
                                onClick={() => {
                                    setPasswordError('');
                                }}
                            ></button>
                            <strong>{passwordError}</strong>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); handleLogin() }} >
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
                            <button type='submit' disabled={loading} className={`${Styles.coloredButton} mt-5`}>
                                {loading ? "..." : "LOG IN"}
                            </button>
                            <br />
                            <br />
                            <p className='mt-4' style={{ textAlign: 'center' }}>
                                Don't have an account?
                            </p>

                            <button type='button' onClick={() => navigate('/auth/register')} className={`${Styles.outlineButton} mt-2`}>
                                REGISTER
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Login