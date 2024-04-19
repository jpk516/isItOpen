import { useAppContext } from '../contexts/AppContext.jsx';
import { useEffect, useState } from 'react';
import AccountService from '../services/account-service';
import React from 'react';

function ProfileBar() {
  const { auth, setAuth, pageTitle } = useAppContext();


  console.log(auth);

  return (
    <div className="user-bar">
      <h1>Welcome, {auth?.user.firstName || 'Guest'} {auth?.user.lastName || 'guest'}</h1>
    </div>
  );
}

export default ProfileBar;