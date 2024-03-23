import './App.css';
import MessageToast from './components/MessageToast';
import Header from './components/TopNav'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Venues from './views/Venues';
import Admin from './views/Admin';
import ManageVenue from './views/ManageVenue';
import Achievements from './views/Achievements';
import BRList from './views/BRList';
import Settings from './views/Settings';
import Container from 'react-bootstrap/esm/Container';
import AccountService from './services/account-service';
import { useEffect, useState } from 'react';
import Fav from './views/Favorites';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    AccountService.isAuthenticated().then(response => {
        setIsAuthenticated(response.data.success)
        if (response.data.success) setUsername(response.data.user.username)
    }).catch(error => {
        alert(`Error: ${error.response.data}`)
    })
  })

  return (
    <div className="App">
      <Router>
        {/* <Routes>
          <Route exact path="" element={<Home />}></Route>
          <Route exact path="/login" element={<Login authenticated={isAuthenticated} onAuthChange={setIsAuthenticated} />}></Route>
          <Route exact path="/register" element={<Register authenticated={isAuthenticated} onAuthChange={setIsAuthenticated} />}></Route>
          <Route exact path="/venues" element={<Venues />}></Route>
          <Route exact path="/venues/manage/:name?" element={<ManageVenue />}></Route>
          <Route exact path="/brlist" element={<BRList />}></Route>
          <Route exact path="/settings" element={<Settings />}></Route>
          <Route exact path="/fav" element={<Fav />}></Route>
          <Route exact path="/admin" element={<Admin />}></Route>
          <Route exact path="/achievements" element={<Achievements />}></Route>
        </Routes> */}
        {/* <Header authenticated={isAuthenticated} onAuthChange={setIsAuthenticated} username={username} />
        <Container className='nav-margin'>
          <MessageToast message="test" bg="warning" show={false}/>
          <Routes>
            <Route exact path="" element={<Home />}></Route>
            <Route exact path="/login" element={<Login authenticated={isAuthenticated} onAuthChange={setIsAuthenticated} />}></Route>
            <Route exact path="/register" element={<Register authenticated={isAuthenticated} onAuthChange={setIsAuthenticated} />}></Route>
            <Route exact path="/venues" element={<Venues />}></Route>
            <Route exact path="/venues/manage/:name?" element={<ManageVenue />}></Route>
            <Route exact path="/brlist" element={<BRList />}></Route>
            <Route exact path="/settings" element={<Settings />}></Route>
            <Route exact path="/fav" element={<Fav />}></Route>
            <Route exact path="/admin" element={<Admin />}></Route>
            <Route exact path="/achievements" element={<Achievements />}></Route>
          </Routes>
          <div className="mt-5"></div>
        </Container>
        <Container>
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-2 my-2 border-top">
            <div className="col-md-4 d-flex align-items-center">
              <span className="mb-3 mb-md-0 text-muted">&copy; 2024 Is It Open?</span>
            </div>
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            </ul>
          </footer>
        </Container> */}
        <Dashboard />
      </Router>
    </div>
  );
}

export default App
