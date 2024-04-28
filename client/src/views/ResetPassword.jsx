import { useAppContext } from '../contexts/AppContext';
import { useState, useEffect } from 'react';
import ResetPasswordForm from '../components/ResetPasswordForm';

function ResetPassword() {

    const { setPageTitle } = useAppContext();

    useEffect(() => {
        setPageTitle('Reset Password');
    }, [])

    
    return (
        <ResetPasswordForm  />
    );
}

export default ResetPassword;