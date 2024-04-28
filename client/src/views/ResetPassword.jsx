import LoginForm from '../components/LoginForm';
import { useAppContext } from '../contexts/AppContext';
import { useState, useEffect } from 'react';

function ResetPassword() {

    const { setPageTitle } = useAppContext();

    useEffect(() => {
        setPageTitle('Reset Password');
    }, [])

    
    return (
        <LoginForm  />
    );
}

export default ResetPassword;