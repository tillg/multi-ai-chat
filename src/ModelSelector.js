import React from 'react';

const ModelSelector = ({ models, onSelect, disabled }) => {
    const handleModelChange = (e) => {
        onSelect(e.target.value);
    };

    if (!models) return (<div>Loading...</div>)

    return (
        <div>
            <select onChange={handleModelChange} disabled={disabled}>
                <option value="none">Select a model</option>
                {models.map((model, index) => (
                    <option key={index} value={model}>
                        {model}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ModelSelector;
