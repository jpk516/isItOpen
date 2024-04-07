import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('light');
  
    // const toggleTheme = () => setTheme(theme => theme === 'light' ? 'dark' : 'light');
  
    const value = {
        user,
        setUser,
        // theme,
        // toggleTheme,
    };
  
    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    );
  };
  
  export default AppContextProvider;

  export const useAppContext = () => useContext(AppContext);