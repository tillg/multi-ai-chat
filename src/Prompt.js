import React, { useState } from 'react';
import "@com.mgmtp.a12.widgets/widgets-core/lib/theme/basic.css";
import { TextAreaStateless } from "@com.mgmtp.a12.widgets/widgets-core/lib/input/text-area";

import { Button } from "@com.mgmtp.a12.widgets/widgets-core/lib/button";

const Prompt = ({ promptIsActive, onSubmit }) => {
    const [prompt, setPrompt] = useState('');

    const handleChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(prompt);
        setPrompt(''); // Clear the textarea after submitting
    };
    const promptStyle = {
        textAlign: 'left'
    }

    return (<>
        <TextAreaStateless
            id="prompt"
            value={prompt}
            placeholder="Enter your prompt here"
            onChange={handleChange}
            rows="5"
            cols="70"
            disabled={!promptIsActive}
            style={promptStyle}
        />
        < br />
        <Button label="Submit" onClick={handleSubmit} disabled={!promptIsActive} />
    </>
    );
};

export default Prompt;
