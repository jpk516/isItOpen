import LoginForm from '../components/LoginForm';
import { useAppContext } from '../contexts/AppContext';
import { useState, useEffect } from 'react';

function Login() {

    const { setPageTitle, toggleSnackbar } = useAppContext();

    useEffect(() => {
        setPageTitle('Login');
    }, [])

    
    return (
        <LoginForm  />
    );
}

export default Login;