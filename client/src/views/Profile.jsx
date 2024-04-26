import React from 'react';
import ProfileCard from '../components/ProfileBar';
import { useAppContext } from '../contexts/AppContext';
import { useState, useEffect } from 'react';


function Profile() {

  const { setPageTitle, toggleSnackbar } = useAppContext();

  useEffect(() => {
      setPageTitle('Profile');
  }, [])

  return (
    <div>
      <ProfileCard />
    </div>
  );
}

export default Profile;
