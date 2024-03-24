import { createContext } from 'react';

const UserContext = createContext({
    authenticated: false,
    username: "",
    onAuthChange: () => {},
    });

export default UserContext;