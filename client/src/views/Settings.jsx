// Settings.jsx
import React from 'react';
import FontSelector from '../components/FontSelector'; 
import VenueRequestForm from '../components/VenueRequestForm'; 

function Settings() {


    return (
        <div>
            <h1>Settings</h1>
            <FontSelector />
            <VenueRequestForm />
        </div>
    );
}

export default Settings;
