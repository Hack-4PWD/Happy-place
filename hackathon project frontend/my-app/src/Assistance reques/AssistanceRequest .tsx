import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Card, Col, Row } from 'react-bootstrap';

interface AssistanceRequest {
    id: number;
    description: string;
    requested_date: string;
    requested_time: string;
    status: string;
    requested_by: number; // Assuming you need to track the requesting user
}

const AssistanceRequests: React.FC = () => {
    const [requests, setRequests] = useState<AssistanceRequest[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRequest, setCurrentRequest] = useState<AssistanceRequest | null>(null);

    // Fetching the assistance requests
    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/pwd/assistance-requests/');
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching assistance requests:', error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAddRequest = async (newRequest: Omit<AssistanceRequest, 'id'>) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/pwd/assistance-requests/', newRequest);
            setRequests((prev) => [...prev, response.data]);
            handleCloseModal();
        } catch (error) {
            console.error('Error adding assistance request:', error);
        }
    };

    const handleUpdateRequest = async (updatedRequest: AssistanceRequest) => {
        if (currentRequest) {
            try {
                await axios.put(`http://127.0.0.1:8000/pwd/assistance-requests/${currentRequest.id}/`, updatedRequest);
                setRequests((prev) => prev.map(req => req.id === currentRequest.id ? updatedRequest : req));
                handleCloseModal();
            } catch (error) {
                console.error('Error updating assistance request:', error);
            }
        }
    };

    const handleDeleteRequest = async (requestId: number) => {
        if (window.confirm('Are you sure you want to delete this request?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/pwd/assistance-requests/${requestId}/`);
                setRequests((prev) => prev.filter(req => req.id !== requestId));
            } catch (error) {
                console.error('Error deleting assistance request:', error);
            }
        }
    };

    const handleOpenModal = (request?: AssistanceRequest) => {
        setShowModal(true);
        if (request) {
            setIsEditing(true);
            setCurrentRequest(request);
        } else {
            setIsEditing(false);
            setCurrentRequest(null);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentRequest(null);
    };

    return (
        <div className="container mt-5">
            <h2>Assistance Requests</h2>
            <Button variant="primary" onClick={() => handleOpenModal()}>Add New Request</Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit Request' : 'Add New Request'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as typeof e.target & {
                            description: { value: string };
                            requested_date: { value: string };
                            requested_time: { value: string };
                            status: { value: string };
                        };
                        const requestData: Omit<AssistanceRequest, 'id'> = {
                            description: form.description.value,
                            requested_date: form.requested_date.value,
                            requested_time: form.requested_time.value,
                            status: form.status.value,
                            requested_by: 2, // Set the appropriate user ID here
                        };

                        if (isEditing && currentRequest) {
                            handleUpdateRequest({ ...currentRequest, ...requestData });
                        } else {
                            handleAddRequest(requestData);
                        }
                    }}>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" name="description" defaultValue={currentRequest?.description} required />
                        </Form.Group>
                        <Form.Group controlId="formRequestedDate">
                            <Form.Label>Requested Date</Form.Label>
                            <Form.Control type="date" name="requested_date" defaultValue={currentRequest?.requested_date} required />
                        </Form.Group>
                        <Form.Group controlId="formRequestedTime">
                            <Form.Label>Requested Time</Form.Label>
                            <Form.Control type="time" name="requested_time" defaultValue={currentRequest?.requested_time} required />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" name="status" defaultValue={currentRequest?.status} required>
                                <option>Pending</option>
                                <option>Assigned</option>
                                <option>Completed</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {isEditing ? 'Update Request' : 'Add Request'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Row className="mt-4">
                {requests.map((request) => (
                    <Col md={4} key={request.id} className="mb-4">
                        <Card className="bg-light border-info text-dark">
                            <Card.Body>
                                <Card.Title className="text-primary">Request ID: {request.id}</Card.Title>
                                <Card.Text>
                                    <strong>Description:</strong> {request.description}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Requested Date:</strong> {request.requested_date}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Requested Time:</strong> {request.requested_time}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Status:</strong> {request.status}
                                </Card.Text>
                                <Button variant="info" onClick={() => handleOpenModal(request)}>Edit</Button>
                                <Button variant="danger" className="ml-2" onClick={() => handleDeleteRequest(request.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AssistanceRequests;
