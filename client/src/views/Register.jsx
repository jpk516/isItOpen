import RegisterForm from '../components/RegisterForm';
import { useAppContext } from '../contexts/AppContext';
import { useState, useEffect } from 'react';


function Register() {

    const { setPageTitle, toggleSnackbar } = useAppContext();

    useEffect(() => {
        setPageTitle('Register');
    }, [])


    return (
        <>
            <RegisterForm />
        </>
    );
}

export default Register;