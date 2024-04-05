
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
import AccountService from '../services/account-service';
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from './ThemeSwitcher';
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
    <Navbar bg="danger" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand>
          <span style={{marginLeft:"5px"}}>Is It Open?</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
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
            <NavDropdown title={username} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/settings">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/achievements">
                Achievements
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin">
                Admin Panel
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOut}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
              :
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            }
            
            <ThemeSwitcher />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;