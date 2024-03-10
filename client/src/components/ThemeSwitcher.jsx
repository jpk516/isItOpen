import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaSun, FaMoon } from 'react-icons/fa';

// Toggle between light and dark modes.
// starts with the theme set in localStorage, or falls back to system preference.
// could be saved to mongoDB if we want to persist the theme across devices.
const ThemeSwitcher = () => {
    const getPreferredTheme = () => {
        // Check for saved theme in localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }

        // Fall back to system preference if no saved theme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        } else {
            return 'light';
        }
    };

    const [theme, setTheme] = useState(getPreferredTheme());

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // Update the data-bs-theme attribute on the html element and save to localStorage
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
