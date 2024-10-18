import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { RootState } from '../Redux/store';
import { setAuth } from '../Redux/AuthSlice';

const CustomNavbar: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth.value);
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', role: '' });
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/logout/', {}, { withCredentials: true });
            if (response.status === 200) {
                deleteTokenCookie();
                dispatch(setAuth(false));
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const deleteTokenCookie = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user');
                setUserInfo({ firstName: response.data.first_name, lastName: response.data.last_name, role: response.data.role });
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        fetchUserInfo();
    }, []);

    return (
        <Navbar bg="light" variant="light" expand="lg" fixed="top" className="custom-navbar shadow-sm">
            <Container>
                <Navbar.Brand href="/">Accessibility Platform</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto"> {/* Centering the menu items */}
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About Us</Nav.Link>
                        <Nav.Link href="/tasks">Services</Nav.Link>
                        <Nav.Link href="/notifications">Notifications</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                    </Nav>
                    <div className="text-end">
                        {auth ? (
                            <>
                                <span className="me-2 text-dark">Hello, {userInfo.firstName}!</span>
                                <Button variant="outline-dark" onClick={logout} className="me-2">Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline-dark" className="me-2" onClick={() => window.location.href = '/login'}>Login</Button>
                                <Button variant="primary" onClick={() => window.location.href = '/register'}>Sign Up</Button>
                            </>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
