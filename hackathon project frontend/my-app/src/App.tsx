import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import CustomNavbar from './Components/Nav';
import Dashboard from './Components/Dashboard';
import AssistanceRequests from './Assistance reques/AssistanceRequest ';
import Login from './Authentications.py/Login';
import { Reset } from './Authentications.py/Reset';
import { Forgot } from './Authentications.py/Forgot';
import Register from './Authentications.py/Register';
import UserComponent from './Authentications.py/UserComponent';
import Notifications from './Notifications/Notifications';
import Header from './Components/Header';
import AboutUs from './Components/About us/AboutUs';
import Services from './Components/services/Services';
import Footer from './Components/footer/Footer';

const App: React.FC = () => {
    const location = useLocation();

    // Check if the current route is the entry point or an authentication route
    const isHomeRoute = location.pathname === '/';
    const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

    return (
        <div>
            {/* Always show Navbar */}
            <CustomNavbar />

            {/* Show Header only on the entry point */}
            {isHomeRoute && <Header />}
            {isHomeRoute && <AboutUs />}
            {isHomeRoute && <Services />}

            
            {/* Show Sidebar for all routes except authentication routes */}
            {!isAuthRoute && <Sidebar />}
            {isHomeRoute && <Footer />}
            
            <div style={isHomeRoute ? { padding: '20px' } : { marginLeft: '250px', padding: '20px' }}>
                <Routes>
                    {/* Redirect / to /dashboard */}
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    
                    {/* Authentication routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset/:token" element={<Reset />} />
                    <Route path="/forgot" element={<Forgot />} />
                    
                    {/* Other routes */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/assistance" element={<AssistanceRequests />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/about" element={<AboutUs/>} />
                    <Route path="/users" element={<UserComponent />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
