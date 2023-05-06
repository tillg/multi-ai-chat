import React, { useState, useEffect } from 'react';
import { generateText, getAvailableModels, log, separateModelEndpoint } from './OpenaiApi';
import ConversationEntry from './ConversationEntry';
import './AiInteraction.css';


const AiInteraction = () => {
    const [prompt, setPrompt] = useState('');
    const [modelAndEndpoint, setModelAndEndpoint] = useState('');
    const [availableModels, setAvailableModels] = useState([]);
    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        const fetchAvailableModels = async () => {
            log('Fetching models...', 'GPT4Interaction.useEffect.fetchAvailableModels')
            try {
                const models = await getAvailableModels();
                log(`Available models: ${models.length}`, 'GPT4Interaction.useEffect.fetchAvailableModels');
                // const modelsForDropDown = models.map((model) => { return { ...model, "value": model.model_id, "text": model.model_id, "description": model.description } });
                // console.log(modelsForDropDown)
                setAvailableModels(models);
                setModelAndEndpoint(models[0]);
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
            const selectedModelAndEndpoint = separateModelEndpoint(modelAndEndpoint)
            const model_id = selectedModelAndEndpoint.model_id;
            const endpoint_id = selectedModelAndEndpoint.endpoint_id;
            const conversationWithPrompt = [...conversation, { role: "user", content: prompt }];
            setConversation(conversationWithPrompt);
            const generatedAnswer = await generateText({ conversation: conversationWithPrompt, model_id, endpoint_id });
            setConversation([...conversationWithPrompt, { role: "assistant", content: generatedAnswer.content, fullResponse: generatedAnswer }]);
            setPrompt('');
        } catch (error) {
            log(`Error generating text: ${error}`, 'GPT4Interaction.handleSubmit');
        }
    };

    const handleModelChange = (e) => {
        const model_id = e.target.value;
        // const model = availableModels.find((m) => m.model_id === model_id);
        setModelAndEndpoint(model_id);
    };
    return (
        <div>
            <select id="model" value={modelAndEndpoint} onChange={handleModelChange} className="select-multiline">
                {availableModels.map((model_endpoint) => (
                    <option key={model_endpoint} value={model_endpoint} className="select-multiline-option">
                        {model_endpoint}
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

export default AiInteraction;
