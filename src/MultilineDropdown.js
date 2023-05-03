import React from 'react';
// import './MultilineDropdown.css';

const MultilineDropdown = () => {
    const optionText1 = 'Line 1\nLine 2';
    const optionText2 = 'Line 3\nLine 4';
    const optionText3 = 'Line 5\nLine 6';

    return (
        <select className="select-multiline">
            <option className="select-multiline-option" value="1">line1{'\n'}line2</option>
            <option value="2">{optionText2}</option>
            <option value="3">{optionText3}</option>
        </select>
    );
};

export default MultilineDropdown;
