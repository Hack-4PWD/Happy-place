import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Modal, Form, ListGroup } from 'react-bootstrap';

interface Notification {
    id: number;
    message: string;
    created_at: string;
    recipient_full_name: string;
}

const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/pwd/notifications/');
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const handleShow = (notification?: Notification) => {
        if (notification) {
            setSelectedNotification(notification);
            setMessage(notification.message);
        } else {
            setSelectedNotification(null);
            setMessage('');
        }
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleSave = async () => {
        try {
            if (selectedNotification) {
                // Update existing notification
                await axios.put(`http://127.0.0.1:8000/pwd/notifications/${selectedNotification.id}/`, {
                    message,
                });
            } else {
                // Create new notification
                await axios.post('http://127.0.0.1:8000/pwd/notifications/', {
                    message,
                });
            }
            fetchNotifications();
            handleClose();
        } catch (error) {
            console.error('Error saving notification:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/pwd/notifications/${id}/`);
            fetchNotifications();
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Notifications</h2>
            <Button variant="primary" onClick={() => handleShow()}>Add Notification</Button>
            <ListGroup className="mt-3">
                {notifications.map(notification => (
                    <ListGroup.Item key={notification.id} className="d-flex justify-content-between align-items-start">
                        <div>
                            <h5>{notification.recipient_full_name}</h5>
                            <p>{notification.message}</p>
                            <small>{new Date(notification.created_at).toLocaleString()}</small>
                        </div>
                        <div>
                            <Button variant="warning" onClick={() => handleShow(notification)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDelete(notification.id)}>Delete</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/* Modal for creating/updating notification */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedNotification ? 'Edit Notification' : 'Add Notification'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formMessage">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter notification message"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Notifications;
