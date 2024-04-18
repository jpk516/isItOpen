import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Button } from '@mui/material';

function Test() {
    const {auth, setAuth, toggleSnackbar } = useAppContext();

    const toggleMessage = () => {
        toggleSnackbar('This is a test message', 'info');
    }
    
    return (
    <>
        <div>
            user: {auth?.user?.username}
        </div>
        <div>
            <Button variant="contained" color="primary" onClick={() => toggleMessage()}>Toggle Message</Button>
        </div>
    </>
    );
}

export default Test;
