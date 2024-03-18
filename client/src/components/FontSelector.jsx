import React from 'react';

function FontSelector() {
    const handleFontChange = (event) => {
        const selectedFont = event.target.value;
        document.documentElement.style.setProperty('--font-family-default', selectedFont);
    };

    return (
        <div className="fontSelector">
            <label htmlFor="fontChoice">Font Style:</label>
            <select id="fontChoice" onChange={handleFontChange}>
                <option value="'Helvetica Neue', Arial, sans-serif">Helvetica Neue / Arial</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="'Roboto', sans-serif">Roboto</option>
                <option value="'Lora', serif">Lora</option>
            </select>
        </div>
    );
}

export default FontSelector;
