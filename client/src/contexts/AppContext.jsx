import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    
    const value = {
      auth,
      setAuth,
    };
  
    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    );
  };
  
  export default AppContextProvider;

  export const useAppContext = () => useContext(AppContext);