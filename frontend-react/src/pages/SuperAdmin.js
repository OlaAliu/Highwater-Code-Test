import React, { useEffect, useState } from 'react'
import Style from './components/Dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import { useHook } from '../hooks/Hook';
import { useAuth } from '../hooks/Auth';

const SuperAdmin = () => {
    const hook = useHook();
    const auth = useAuth();
    const [hideSide, setHideSide] = useState(false);
    const endpoint = `api/users`;
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [usersLength, setUsersLength] = useState(0)
    const fetchUsers = async () => {
        try {
            let response = await axios.get(`${hook.api}${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            })
                .then((response) => {
                    setUsers(response.data.users)
                    setUsersLength(response.data.users.length)
                })
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const cancelAccount = async (id) => {
        try {
            let response = await axios.get(`${hook.api}api/cancel/user/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            })
                .then((response) => {
                    fetchUsers()
                })
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const activateAccount = async (id) => {
        try {
            let response = await axios.get(`${hook.api}api/activate/user/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            })
                .then((response) => {
                    fetchUsers()
                })
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <>
            {isLoading ? (
                <>

                </>
            ) : (
                <>
                    <section>
                        <div className={`${Style.columns}`} >
                            <div className={`${Style.counter} column is-3`} style={{ backgroundColor: '#cdc3ff' }}>
                                <div className={` ${Style.dFlex}`}>
                                    <FontAwesomeIcon size='xs' icon="users" className={Style.counterIcon} style={{ background: '#b6b0e4' }} /> Users
                                </div>
                                <h2 className={Style.counterNum}>
                                    {usersLength}
                                </h2>
                            </div>
                            {/* <div className={`${Style.counter} column is-3`} style={{ backgroundColor: '#aac9ff' }}>
                                <div className={` ${Style.dFlex}`}>
                                    <FontAwesomeIcon size='xs' icon="shopping-cart" className={Style.counterIcon} style={{ background: '#9bb7e6' }} /> Products
                                </div>
                                <h2 className={Style.counterNum}>
                                    3
                                </h2>
                            </div> */}
                            <div className={`${Style.counter} column is-3`} style={{ backgroundColor: '#92e3b8' }}>
                                <div className={` ${Style.dFlex}`}>
                                    <FontAwesomeIcon size='xs' icon="level-up" className={Style.counterIcon} style={{ background: '#85caa6' }} /> Roles
                                </div>
                                <h2 className={Style.counterNum}>
                                    3
                                </h2>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className={`${Style.columns}`} >
                            <div className={`${Style.counter} column is-8 has-background-white`}>
                                <div className={` ${Style.dFlex}`}>
                                    <span style={{ fontWeight: 'bolder', fontSize: 'larger' }} >
                                        Users
                                    </span>
                                </div>
                                <div className="mt-3 is-responsive" style={{ width: '100%', overflowX: 'scroll' }}>
                                    <table className="table is-fullwidth">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>
                                                    <FontAwesomeIcon icon={'user-edit'} />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.length > 0 ? (
                                                <>
                                                    {users.map((user, index) => (
                                                        <>
                                                            <tr key={index}>
                                                                <td>{user.user.name}</td>
                                                                <td>{user.user.email}</td>
                                                                <td>
                                                                    {(user.roles.length > 0) ? (
                                                                        <>
                                                                        {user.roles[0]}
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            No role assigned
                                                                        </>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {user.user.status === 0 ? (
                                                                        <>
                                                                            <button
                                                                                className='button is-primary is-light'
                                                                                onClick={
                                                                                    () => {
                                                                                        activateAccount(user.user.id)
                                                                                    }}
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon="check"
                                                                                    color='green'
                                                                                />
                                                                                &nbsp;
                                                                                Activate
                                                                            </button>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <button
                                                                                className='button is-danger is-light'
                                                                                onClick={
                                                                                    () => {
                                                                                        cancelAccount(user.user.id)
                                                                                    }}
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon="cancel"
                                                                                    color='red'
                                                                                />
                                                                                &nbsp;
                                                                                Cancel
                                                                            </button>
                                                                        </>
                                                                    )}
                                                                </td>
                                                            </tr >
                                                        </>
                                                    ))}
                                                </>
                                            ) : null}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )
            }
        </>
    )
}

export default SuperAdmin