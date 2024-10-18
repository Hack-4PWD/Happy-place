import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './dashboard.css'; // Import custom CSS for additional styling
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../Redux/store';
import { setAuth } from '../Redux/AuthSlice';

const Dashboard: React.FC = () => {
    // State variables to hold the fetched data
    const [assistanceCount, setAssistanceCount] = useState(0);
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', role: '' });
    
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth.value); // Check if user is authenticated

    // Function to fetch assistance request count from the API
    const fetchAssistanceCount = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/pwd/assistance-requests/count/');
            setAssistanceCount(response.data.count); // Extract the count from the response
        } catch (error) {
            console.error('Error fetching assistance count:', error);
        }
    };

    // Fetch user info
    const fetchUserInfo = async () => {
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
        } catch (e) {
            dispatch(setAuth(false));
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

    // Fetch the data on component mount
    useEffect(() => {
        fetchAssistanceCount();
        fetchUserInfo(); // Fetch user information
    }, [dispatch]);

    return (
        <div className="dashboard-container">
            <h2 className="text-center mb-4">Dashboard Overview</h2>
            <h3>Welcome, {userInfo.firstName} {userInfo.lastName}!</h3> {/* Display user's name */}
            <Row className="g-4">
                <Col md={4}>
                    <Card className="bg-light text-dark">
                        <Card.Body>
                            <Card.Title>Assistance Requests</Card.Title>
                            <Card.Text>{assistanceCount} new requests</Card.Text>
                            <Link to="/assistance">
                                <Button variant="primary">View Requests</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="bg-secondary  text-white">
                        <Card.Body>
                            <Card.Title>Assistance</Card.Title>
                            <Card.Text>{assistanceCount} new requests</Card.Text>
                            <Link to="/assistance">
                                <Button variant="light">View Requests</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                {/* Other cards for payments, assignments, etc. */}
            </Row>
        </div>
    );
};

export default Dashboard;
