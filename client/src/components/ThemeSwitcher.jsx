import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from 'react-bootstrap';
import { FaSun, FaMoon } from 'react-icons/fa';

// This component is responsible for switching between light and dark themes.
// TODO: - save to user settings
//       - start with user's current theme

const ThemeSwitcher = () => {
    // start with user's current theme
    

    const [theme, setTheme] = useState('light'); // Default theme is light

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // Update the data-bs-theme attribute on the html element
    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [theme]);

    return (
        <Button onClick={toggleTheme} className="icon-btn" variant="dark">
            {theme === 'light' ? <FaMoon className="text-accent2" /> : <FaSun />}
            <span className="visually-hidden">Toggle theme</span>
        </Button>
    );
};

export default ThemeSwitcher;
