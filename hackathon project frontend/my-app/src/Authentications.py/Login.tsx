import axios from 'axios';
import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';

const ForgotPassword = () => {
    return (
        <div className="container rounded-lg border p-4">
            <h1 className="h3 mb-3 fw-normal text-center">Forgot Password</h1>
        </div>
    );
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [userRole, setUserRole] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true); // Set loading to true during form submission
        try {
            const { data } = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password
            }, { withCredentials: true });
            document.cookie = `token=${data.token}; path=/`;
            setUserName(`${data.first_name} ${data.last_name}`);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            setRedirect(true);
        } catch (error) {
            setError('Login failed:');
        } finally {
            setLoading(false); // Set loading to false after form submission
        }
    };

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const { data } = await axios.get('http://127.0.0.1:8000/api/user');
                setUserRole(data.role);
                console.log('User role:', data.role);
            } catch (error) {
                console.error('Failed to fetch user role:', error);
            }
        };

        if (redirect) {
            fetchUserRole();
        }
    }, [redirect]);

    if (redirect) {
        return <Navigate to="/dashboard"/>; // Redirect to Dashboard
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: '1', backgroundImage: 'url("/images/disables.jpg")', backgroundSize: 'cover', marginTop:"-25px"}}></div>
            <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:"-60px" }}>
                <div className="container rounded-lg border p-4 bg-white" style={{ maxWidth: '400px' }}>
                    <div className="text-center mb-4">
                        <img src='/images/disables.jpg' alt="Sidebar Logo" className="logoIcon" style={{ width: '100px' }}/>
                        <h1 className="h3 mt-2 mb-3 fw-normal">Welcome</h1>
                        <p>To login, enter your email and password</p>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col">
                            <form onSubmit={submit}>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control form-control-sm"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-control form-control-sm"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="mb-3">
                                    <Link to="/forgot">Forgot Password?</Link>
                                </div>
                                <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>
                        </div>
                    </div>
                    {userName && <p className="mt-3 text-center">Welcome, {userName}!</p>}
                </div>
            </div>
        </div>
    );
}
