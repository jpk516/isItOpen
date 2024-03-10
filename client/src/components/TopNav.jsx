
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'
import AccountService from '../services/account-service';
import { useNavigate } from "react-router-dom";
// import { FaGamepad } from 'react-icons/fa/';

function TopNav({ authenticated, onAuthChange, username }) {
  const navigate = useNavigate();

  function logOut() {
    AccountService.logOut().then(response => {
      onAuthChange(false)
      navigate('/login')
    })
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
              {/* <FaGamepad color="aqua" fontSize="1.2em"/>  */}
              <span style={{marginLeft:"5px"}}>Is It Open?</span>
            </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/venues">
              <Nav.Link>Venue Creation</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/brlist">
              <Nav.Link>Lists</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/fav">
              <Nav.Link>Favorites</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {authenticated ?
              <Nav.Link onClick={logOut}>Logout, {username}</Nav.Link>
              :
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            }
            <LinkContainer to="/settings">
              <Nav.Link>Settings</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;