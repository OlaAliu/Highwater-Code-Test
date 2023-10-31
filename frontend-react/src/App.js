import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { Auth } from './hooks/Auth'
import { RequireAuth } from './hooks/RequireAuth'
import { Hook } from './hooks/Hook'
import Products from './pages/Products'
import Purchase from './pages/Purchase'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Register from './pages/Register';

const App = () => {
    return (
        <>
            <Hook>
                <Auth>
                    <Routes>
                        <Route
                            exact
                            path={'/'}
                            element={
                                <Products />
                            }
                        />
                        <Route
                            exact
                            path={'/dashboard'}
                            element={
                                <RequireAuth>
                                    <Dashboard />
                                </RequireAuth>
                            }
                        />
                        <Route
                            exact
                            path={'/product/purchase/:id'}
                            element={
                                <RequireAuth>
                                    <Purchase />
                                </RequireAuth>
                            }
                        />
                        <Route
                            exact
                            path={'/users'}
                            element={
                                <RequireAuth>
                                    <Dashboard />
                                </RequireAuth>
                            }
                        />
                        <Route
                            exact
                            path={'/products'}
                            element={
                                <RequireAuth>
                                    <Dashboard />
                                </RequireAuth>
                            }
                        />
                        <Route
                            exact
                            path='/auth/login'
                            element={<Login />}
                        />
                        <Route
                            exact
                            path='/auth/register'
                            element={<Register />}
                        />
                        <Route
                            path='*'
                            element={<NotFound />}
                        />
                    </Routes>
                </Auth>
            </Hook>
        </>
    )
}

export default App