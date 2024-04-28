import { useAppContext } from '../contexts/AppContext';
import { useState, useEffect } from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

function ForgotPassword() {

    const { setPageTitle } = useAppContext();

    useEffect(() => {
        setPageTitle('Forgot Password');
    }, [])

    
    return (
        <ForgotPasswordForm  />
    );
}

export default ForgotPassword;