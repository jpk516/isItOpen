import React, { useState } from 'react';

const CheckIn = () => {
    const [checkInData, setCheckInData] = useState({
        // Initialize the check-in data fields here
        // For example:
        name: '',
        location: '',
        // Add more fields as per your check-in model
    });

    const handleInputChange = (e) => {
        setCheckInData({
            ...checkInData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the check-in data to the server here
        // You can use an API call or any other method to send the data
        console.log(checkInData); // Just for demonstration, you can remove this line
        // Reset the form after submitting
        setCheckInData({
            name: '',
            location: '',
        });
    };

    return (
        <div>
            <h2>Create Check-In</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={checkInData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={checkInData.location}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                {/* Add more input fields for other check-in data */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CheckIn;