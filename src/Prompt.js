import React, { useState } from 'react';

const Prompt = ({ promptIsActive, onSubmit }) => {
    const [prompt, setPrompt] = useState('');

    const handleChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(prompt);
        setPrompt(''); // Clear the textarea after submitting
    };

    return (<>
        < textarea
            id="prompt"
            value={prompt}
            placeholder="Enter your prompt here"
            onChange={handleChange}
            rows="5"
            cols="70"
            disabled={!promptIsActive
            }
        />
        < br />
        <button onClick={handleSubmit} disabled={!promptIsActive}>Submit</button>
    </>
    );
};

export default Prompt;
