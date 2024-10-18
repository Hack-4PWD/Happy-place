import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/store';
import { setAuth } from '../Redux/AuthSlice';

export default function Register() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [userType, setUserType] = useState('pwd'); // Default user type
    const [redirect, setRedirect] = useState(false);
    const [formInvalid, setFormInvalid] = useState(false);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', role: '' });
    const auth = useSelector((state: RootState) => state.auth.value);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        // Check if any required field is empty
        if (!first_name || !last_name || !email || !password || !passwordConfirm) {
            setFormInvalid(true);
            return;
        }

        // Check if password and password confirmation match
        if (password !== passwordConfirm) {
            alert('Password and password confirmation do not match.');
            return;
        }

        await axios.post('http://127.0.0.1:8000/api/register', {
            first_name,
            last_name,
            email,
            password,
            password_confirm: passwordConfirm,
            role: userType // Pass the selected user type to the backend
        });

        setRedirect(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getCookie('token');
                if (!token) {
                    dispatch(setAuth(false));
                    return;
                }

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const { data } = await axios.get('http://127.0.0.1:8000/api/user');
                setUserInfo({ firstName: data.firstName, lastName: data.lastName, role: data.role });
                dispatch(setAuth(true));
            } catch (e) {
                dispatch(setAuth(false));
            }
        };

        fetchData();
    }, [dispatch]);

    const getCookie = (name: string) => {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return '';
    }

    if (redirect) {
        return <Navigate to="/users" />;
    }

    return (
        <div className="container" style={{margin:"10px auto"}}>
            <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="col-md-6">
                    <form onSubmit={submit} className="mt-5 p-4 border rounded bg-light shadow">
                        <h1 className="h3 mb-3 fw-normal text-center">Please register</h1>
                        {formInvalid && (
                            <div className="alert alert-danger" role="alert">
                                Please fill in all the required fields.
                            </div>
                        )}

                        {/* User type selection */}
                        <div className="mb-3">
                            <label htmlFor="userType" className="form-label">User Type:</label>
                            <select
                                className="form-select"
                                id="userType"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option value="pwd">PWD</option>
                                <option value="volunteer">Volunteer</option>
                                <option value="paid">Paid User</option>
                            </select>
                        </div>

                        {/* Rest of the form */}
                        <div className="mb-3">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    placeholder="First Name"
                                    value={first_name}
                                    onChange={e => setFirstName(e.target.value)}
                                    required
                                />
                                <label htmlFor="firstName">First Name</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder="Last Name"
                                    value={last_name}
                                    onChange={e => setLastName(e.target.value)}
                                    required
                                />
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="email">Email address</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="passwordConfirm"
                                    placeholder="Password Confirm"
                                    value={passwordConfirm}
                                    onChange={e => setPasswordConfirm(e.target.value)}
                                    required
                                />
                                <label htmlFor="passwordConfirm">Password Confirm</label>
                            </div>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
