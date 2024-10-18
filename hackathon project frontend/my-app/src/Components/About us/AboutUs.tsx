import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutUs: React.FC = () => {
    return (
        <Container fluid className="py-5">
            <h1 className="text-center mb-4">About Us</h1>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Our Mission</Card.Title>
                            <Card.Text>
                                At Accessibility Platform, we believe in creating an inclusive environment where individuals with disabilities can access the resources and support they need. Our mission is to empower PWD by providing tailored services that enhance their quality of life and promote independence.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8} lg={6} className="mt-4 mt-md-0">
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Our Vision</Card.Title>
                            <Card.Text>
                                Our vision is a world where all individuals, regardless of their abilities, can participate fully in society. We strive to remove barriers, advocate for equality, and foster a community where everyone can thrive.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <h2 className="text-center">Our Values</h2>
                    <ul className="list-unstyled text-center">
                        <li><strong>Empowerment:</strong> We empower individuals to take charge of their lives.</li>
                        <li><strong>Inclusion:</strong> We promote an inclusive environment where everyone belongs.</li>
                        <li><strong>Respect:</strong> We respect the dignity and rights of all individuals.</li>
                        <li><strong>Advocacy:</strong> We advocate for the needs and rights of PWD.</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutUs;
