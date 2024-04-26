import * as React from 'react';
import FavoritesList from "../components/FavoritesList"
import { useAppContext } from '../contexts/AppContext';
import { useState, useEffect } from 'react';

function Fav() {

  const { setPageTitle, toggleSnackbar } = useAppContext();

  useEffect(() => {
    setPageTitle('Favorites');
  }, [])

  return(
   < FavoritesList /> 
   );
   
}
export default Fav;