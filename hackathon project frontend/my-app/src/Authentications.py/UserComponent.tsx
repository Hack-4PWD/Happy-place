import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { setAuth } from '../Redux/AuthSlice';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}

const UserComponent: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', role: '' });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth.value);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = getCookie('token');
                if (!token) {
                    dispatch(setAuth(false));
                    return;
                }

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const { data } = await axios.get('http://127.0.0.1:8000/api/user');
                setUserInfo({ firstName: data.first_name, lastName: data.last_name, role: data.role });
                dispatch(setAuth(true));

                if (data.role !== 'admin' && data.role !== 'super_admin') {
                    return;
                }

                const response = await axios.get<User[]>('http://127.0.0.1:8000/api/all-users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

const deleteUser = async (userId: number) => {
    console.log('Delete user:', userId);
    
    if (userInfo.role !== 'admin' && userInfo.role !== 'super_admin') {
        alert("You do not have permission to delete users.");
        return;
    }

    if (window.confirm("Are you sure you want to delete this user?")) {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/users/${userId}/`);
            console.log('User deleted successfully.');
            // After deletion, fetch updated list of users
            const response = await axios.get<User[]>('http://127.0.0.1:8000/api/all-users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
};


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
    };

    return (
        <>
            <div className="container mt-5">
                {loading ? (
                    <p style={{color:"red", textAlign:"center"}}>Loading...</p>
                ) : (
                    <>
                        {auth && (userInfo.role === "admin" || userInfo.role === "super_admin") ? (
                            <div className="row">
                                <div className="col-md-2">
                                    {/* <Sidebar userName={`${userInfo.firstName} ${userInfo.lastName}`} /> */}
                                </div>
                                <div className="col-md-9">
                                    <h3>All Users</h3>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email</th>
                                                <th>role</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(user => (
                                                <tr key={user.id}>
                                                    <td>{user.first_name}</td>
                                                    <td>{user.last_name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.role}</td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p style={{textAlign:"center"}}>You are not authorized to view this page.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default UserComponent;
