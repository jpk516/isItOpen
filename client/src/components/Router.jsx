import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';
import Venues from '../views/Venues';
import Admin from '../views/Admin';
import ManageVenue from '../views/ManageVenue';
import ViewVenue from "../views/ViewVenue";
import Achievements from '../views/Achievements';
import BRList from '../views/BRList';
import Settings from '../views/Settings';
import Fav from '../views/Favorites';

export const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/venues', element: <Venues /> },
        { path: '/venues/:name', element: <ViewVenue />},
        { path: '/admin', element: <Admin /> },
        { path: '/venues/manage/:name?', element: <ManageVenue /> },
        { path: '/achievements', element: <Achievements /> },
        { path: '/brlist', element: <BRList /> },
        { path: '/settings', element: <Settings /> },
        { path: '/fav', element: <Fav /> },
      ]
    },
  ]);