import React, { useState, useEffect } from 'react';
import { generateText, getAvailableModels, log, separateModelEndpoint } from './OpenaiApi';
import ConversationEntry from './ConversationEntry';
import './AiInteraction.css';
import Prompt from './Prompt';
import ModelSelector from './ModelSelector';


const AiInteraction = () => {
    const [modelAndEndpoint, setModelAndEndpoint] = useState('');
    const [availableModels, setAvailableModels] = useState([]);
    const [conversation, setConversation] = useState([]);
    const [promptIsActive, setPromptIsActive] = useState(false);

    useEffect(() => {
        const fetchAvailableModels = async () => {
            log('Fetching models...', 'GPT4Interaction.useEffect.fetchAvailableModels')
            try {
                const models = await getAvailableModels();
                log(`Available models: ${models.length}`, 'GPT4Interaction.useEffect.fetchAvailableModels');
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

    const handleSubmit = async (prompt) => {
        // e.preventDefault();
        try {
            setPromptIsActive(false);
            const selectedModelAndEndpoint = separateModelEndpoint(modelAndEndpoint)
            const model_id = selectedModelAndEndpoint.model_id;
            const endpoint_id = selectedModelAndEndpoint.endpoint_id;
            const conversationWithPrompt = [...conversation, { role: "user", content: prompt }];
            setConversation(conversationWithPrompt);
            const generatedAnswer = await generateText({ conversation: conversationWithPrompt, model_id, endpoint_id });
            setConversation([...conversationWithPrompt, { role: "assistant", content: generatedAnswer.content, fullResponse: generatedAnswer }]);
            setPromptIsActive(true);
        } catch (error) {
            log(`Error generating text: ${error}`, 'GPT4Interaction.handleSubmit');
        }
    };

    const handleModelChange = (newModel_id) => {
        console.log(newModel_id)
        if (newModel_id === "none") return
        setModelAndEndpoint(newModel_id);
        setPromptIsActive(true);
    };
    return (
        <div>
            <ModelSelector models={availableModels} onSelect={handleModelChange} disabled={false} />
            {/* <select id="model" value={modelAndEndpoint} onChange={handleModelChange} className="select-multiline">
                {availableModels.map((model_endpoint) => (
                    <option key={model_endpoint} value={model_endpoint} className="select-multiline-option">
                        {model_endpoint}
                    </option>
                ))}
            </select> */}
            <div>
                <div className="conversation">
                    {conversation.map((entry, index) => ConversationEntry(entry, index, getToggleOpen(index)))}
                </div>
            </div>
            <Prompt onSubmit={handleSubmit} promptIsActive={promptIsActive} />
        </div >
    );
};

export default AiInteraction;
