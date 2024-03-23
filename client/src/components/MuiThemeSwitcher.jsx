import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

// Toggle between light and dark modes.
// starts with the theme set in localStorage, or falls back to system preference.
// could be saved to mongoDB if we want to persist the theme across devices.
const MuiThemeSwitcher = ({ onChangeMode }) => {
    const theme = useTheme();
    const [mode, setMode] = useState(theme.palette.mode);
    
    const toggleColorMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('theme', newMode);
        if (onChangeMode) 
            onChangeMode(newMode);
      }

    return (
        // <Button onClick={toggleTheme} className="icon-btn" variant={theme === 'light' ? 'light' : 'dark'}>
        //     {theme === 'light' ? <FaMoon className="text-accent2" /> : <FaSun className="text-accent2" />}
        //     <span className="visually-hidden">Toggle theme</span>
        // </Button>
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
};

export default MuiThemeSwitcher;
