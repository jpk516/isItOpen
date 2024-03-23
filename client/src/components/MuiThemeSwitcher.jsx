import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

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
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
};

export default MuiThemeSwitcher;
