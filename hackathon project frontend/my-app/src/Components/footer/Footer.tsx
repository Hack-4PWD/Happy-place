import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light text-dark py-4">
      <Container>
        <Row>
          <Col xs={12} md={4} className="mb-3">
            <h5>About Us</h5>
            <p>
              We are committed to fostering accessibility and inclusion for persons with disabilities, empowering them through innovative solutions and support.
            </p>
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark">Home</a></li>
              <li><a href="/about" className="text-dark">About Us</a></li>
              <li><a href="/services" className="text-dark">Services</a></li>
              <li><a href="/contact" className="text-dark">Contact</a></li>
            </ul>
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <h5>Contact Us</h5>
            <p>Email: <a href="mailto:info@accessibilityplatform.com" className="text-dark">info@accessibilityplatform.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="text-dark">+123 456 7890</a></p>
          </Col>
        </Row>
        <div className="text-center mt-4">
          <p>&copy; {new Date().getFullYear()} Accessibility Platform. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
