import React, { useState } from 'react';

const ModelSelector = ({ modelsAndEndpoints, isActive, onSubmit }) => {
    const [model, setModel] = useState('');

    const handleChange = (e) => {
        setModel(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(prompt);
        setPrompt(''); // Clear the textarea after submitting
    };

    return (
        <select id="model" value={modelAndEndpoint} onChange={handleModelChange} className="select-multiline">
            {availableModels.map((model_endpoint) => (
                <option key={model_endpoint} value={model_endpoint} className="select-multiline-option">
                    {model_endpoint}
                </option>
            ))}
        </select>

    );
};

export default Prompt;
