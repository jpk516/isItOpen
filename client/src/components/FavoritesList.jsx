import React from 'react';
import { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext.jsx'; 

function FavoritesList()
{

    const { auth } = useAppContext();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (auth?.user?.favorites) {
            setFavorites(auth.user.favorites);
        }
    }, [auth]); //ensures that page will reload when favorites is aquired


    return (
        <div>
            <h1>Favorites</h1>
            <ul>
                {favorites.map((favorite, index) => (
                    <li key={index}>{favorite}</li> // Adjust how favorites are displayed based on their structure
                ))}
            </ul>
        </div>
    );
}


export default FavoritesList;