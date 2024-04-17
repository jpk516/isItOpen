import { createContext, useContext, useState } from 'react';
import ResultSnack from '../components/ResultSnack';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [pageTitle, setPageTitle] = useState('Dashboard');
    
    const toggleSnackbar = (message, severity) => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setShowSnackbar(show => !show);
    }
    
    const value = {
      auth,
      setAuth,
      toggleSnackbar,
      pageTitle,
      setPageTitle
    };
  
    return (
      <AppContext.Provider value={value}>
        {children}
        <ResultSnack open={showSnackbar} severity={snackbarSeverity} message={snackbarMessage} onClose={() => setShowSnackbar(false)} />
      </AppContext.Provider>
    );
  };
  
  export default AppContextProvider;

  export const useAppContext = () => useContext(AppContext);