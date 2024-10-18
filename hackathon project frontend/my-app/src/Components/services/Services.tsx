import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './services.css';
import Accesibility from './accesibilty.jpg'; 
import jobsearch from './josearching.jpg'; 
import virtualassitance from './virtual.jpg'; 
import community from './community.jpg'; 

const Services: React.FC = () => {
  return (
    <section id="services" className="services-section py-5">
      <Container>
        <h2 className="text-center mb-4">Our Services</h2>
        <Row>
          <Col lg={6} className="mb-4">
            <Card className="service-card h-100 shadow-sm">
            <img src={Accesibility} alt="Accessibility Illustration" />
              <Card.Body>
                <Card.Title>Virtual Assistance</Card.Title>
                <Card.Text>
                  Real-time virtual assistance for mobility, providing help with everyday tasks.
                </Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} className="mb-4">
            <Card className="service-card h-100 shadow-sm">
            <img src={virtualassitance} alt="Accessibility Illustration" />
              <Card.Body>
                <Card.Title>Accessibility Tools</Card.Title>
                <Card.Text>
                  Assistive tools for easier navigation and communication for individuals with disabilities.
                </Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} className="mb-4">
            <Card className="service-card h-100 shadow-sm">
            <img src={community} alt="Accessibility Illustration" />
                
              <Card.Body>
                <Card.Title>Community Support</Card.Title>
                <Card.Text>
                  Connect with a community of support groups and organizations focused on disability support.
                </Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} className="mb-4">
            <Card className="service-card h-100 shadow-sm">
            <img src={jobsearch} alt="Accessibility Illustration" />
              <Card.Body>
                <Card.Title>Job Matching Services</Card.Title>
                <Card.Text>
                  Help in finding accessible jobs and career opportunities tailored for PWDs.
                </Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Services;
