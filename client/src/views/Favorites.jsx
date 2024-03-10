import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ListbyType from "../components/Listbytype";




function Fav() {
  return(
  <Container>
    <Row>
            <h2>Bars List</h2>
            <Col></Col>
                <Col lg={10}>
                   <ListbyType />
                </Col>
                <Col></Col>
            </Row>

  </Container>
  )
}
export default Fav;