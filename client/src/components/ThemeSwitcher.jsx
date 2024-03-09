import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaSun, FaMoon } from 'react-icons/fa';

// TODO: save the user's theme preference to user settings
const ThemeSwitcher = () => {
    // Determine if the user has a set theme preference
    const getPreferredTheme = () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        } else {
            return 'light';
        }
    };

    const [theme, setTheme] = useState(getPreferredTheme());

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // Update the data-bs-theme attribute on the html element
    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [theme]);

    return (
        <Button onClick={toggleTheme} className="icon-btn" variant={theme === 'light' ? 'light' : 'dark'}>
            {theme === 'light' ? <FaMoon className="text-accent2" /> : <FaSun className="text-accent2" />}
            <span className="visually-hidden">Toggle theme</span>
        </Button>
    );
};

export default ThemeSwitcher;
