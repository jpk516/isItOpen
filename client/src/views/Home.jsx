import ObjectCounter from "../components/ObjectCounter";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function Home() {
    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <h2>Welcome</h2>
                </Col>
                <hr />
            </Row>
            <Row>
                <Col>
                    <Alert variant="info">
                        Is it open? We aren't sure yet because we don't have anything else made yet.
                    </Alert>
                </Col>
                <Col lg={4}>
                    <ObjectCounter />
                </Col>
            </Row>
        </Container>
    );
}

export default Home;