import LoginForm from '../components/LoginForm'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';

function Login({ authenticated, onAuthChange }) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={6}>
                    <Card>
                        <Card.Header>Login</Card.Header>
                        <Card.Body>
                            <LoginForm authenticated={authenticated} onAuthChange={onAuthChange} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="mt-3 text-center">Need an account? <NavLink to="/register">Register Now</NavLink></p>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;