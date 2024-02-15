import RegisterForm from '../components/RegisterForm'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function Register({ authenticated, onAuthChange }) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={6}>
                    <Card>
                        <Card.Header>Register</Card.Header>
                        <Card.Body>
                            <RegisterForm authenticated={authenticated} onAuthChange={onAuthChange} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;