import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTasks, FaUser, FaBell } from 'react-icons/fa'; // Importing icons from react-icons
import "./sidebar.css"
const Sidebar: React.FC = () => {
    return (
        <div className="bg-primary sidebar" style={{ height: '100vh', width: '250px', position: 'fixed', color: 'white', marginTop:"70px"}}>
            <div className="sidebar-header text-center p-3">
                <h2>Virtual Assistance</h2>
            </div>
            <ul className="nav flex-column p-3">
            <li className="nav-item">
                    <Link to="/dashboard" className="nav-link text-white">
                        <FaTasks style={{ marginRight: '10px' }} />
                        Dashoard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/notifications" className="nav-link text-white">
                        <FaTasks style={{ marginRight: '10px' }} />
                        Notifications
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/assignments" className="nav-link text-white">
                        <FaHome style={{ marginRight: '10px' }} />
                        Assignments
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/assistance" className="nav-link text-white">
                        <FaHome style={{ marginRight: '10px' }} />
                        Assistance request
                    </Link>
                </li>
                
                <li className="nav-item">
                    <Link to="/profile" className="nav-link text-white">
                        <FaUser style={{ marginRight: '10px' }} />
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/notifications" className="nav-link text-white">
                        <FaBell style={{ marginRight: '10px' }} />
                        Notifications
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
