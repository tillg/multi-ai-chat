import React, { useState, useEffect } from 'react';
import { generateText, getAvailableModels, log } from './gpt4-api';
import JSONDisplay from './JSONDisplay'
import ConversationEntry from './ConversationEntry';
import DropdownWithDescription from './DropDownWithDescription';
import './GPT4Interaction.css';
import MultilineDropdown from './MultilineDropdown';


const GPT4Interaction = () => {
    const [prompt, setPrompt] = useState('');
    const [model_id, setModel_id] = useState('');
    const [availableModels, setAvailableModels] = useState([]);
    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        const fetchAvailableModels = async () => {
            log('Fetching models...', 'GPT4Interaction.useEffect.fetchAvailableModels')
            try {
                const models = await getAvailableModels();
                log(`Available models: ${models.length}`, 'GPT4Interaction.useEffect.fetchAvailableModels');
                const modelsForDropDown = models.map((model) => { return { ...model, "value": model.model_id, "text": model.model_id, "description": model.description } });
                console.log(modelsForDropDown)
                setAvailableModels(modelsForDropDown);
                setModel_id(modelsForDropDown[0]);
            } catch (error) {
                log(`Error fetching available models:  ${error}`, 'GPT4Interaction.useEffect.fetchAvailableModels');
            }
        };

        fetchAvailableModels();
    }, []);

    const getToggleOpen = (index) => { return () => toggleOpen(index) }

    const toggleOpen = (index) => {
        if (!index) return
        const newConversation = [...conversation];
        newConversation[index].open = !newConversation[index].open;
        setConversation(newConversation);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const selectedModel = availableModels.find((m) => m.id === model);
            const conversationWithPrompt = [...conversation, { role: "user", content: prompt }];
            setConversation(conversationWithPrompt);
            const generatedAnswer = await generateText(conversationWithPrompt, model_id);
            setConversation([...conversationWithPrompt, { role: "assistant", content: generatedAnswer.content, fullResponse: generatedAnswer }]);
            setPrompt('');
        } catch (error) {
            log(`Error generating text: ${error}`, 'GPT4Interaction.handleSubmit');
        }
    };

    const handleModelChange = (e) => {
        const model_id = e.target.value;
        // const model = availableModels.find((m) => m.model_id === model_id);
        setModel_id(model_id);
    };
    const options = [
        { label: 'Option 1', description: 'This is the description for option 1' },
        { label: 'Option 2', description: 'This is the description for option 2' },
        { label: 'Option 3', description: 'This is the description for option 3' },
    ];
    return (
        <div>
            {/* <label htmlFor="model">Model:</label> */}
            {/* <DropdownWithDescription title={"Select Model"} options={availableModels} passBackSelectedOption={handleModelChange} /> */}
            <MultilineDropdown title={"Select Model"} options={availableModels} passBackSelectedOption={handleModelChange} />
            <select id="model" value={model_id} onChange={handleModelChange} className="select-multiline">
                {availableModels.map((modelObj) => (
                    <option key={modelObj.model_id} value={modelObj.model_id} className="select-multiline-option">
                        {modelObj.model_id + " - " + modelObj.description}
                    </option>
                ))}
            </select>

            <div className="conversation">
                {conversation.map((entry, index) => ConversationEntry(entry, index, getToggleOpen(index)))}
            </div>
            <form onSubmit={handleSubmit}>
                <br />
                <textarea
                    // type="text"
                    id="prompt"
                    value={prompt}
                    placeholder="Enter your prompt here"
                    onChange={(e) => setPrompt(e.target.value)}
                    rows="5"
                    cols="70"
                />
                {/* <br /> */}
                <button type="submit">➡️</button>
            </form>
        </div>
    );
};

export default GPT4Interaction;
