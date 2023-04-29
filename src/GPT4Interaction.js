import React, { useState, useEffect } from 'react';
import { generateText, getAvailableModels, log } from './gpt4-api';
import JSONDisplay from './JSONDisplay'
import ConversationEntry from './ConversationEntry';
import './GPT4Interaction.css';

const GPT4Interaction = () => {
    const [prompt, setPrompt] = useState('');
    const [model, setModel] = useState('');
    const [availableModels, setAvailableModels] = useState([]);
    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        const fetchAvailableModels = async () => {
            log('Fetching models...', 'GPT4Interaction.useEffect.fetchAvailableModels')
            try {
                const models = await getAvailableModels();
                log(`Available models: ${models.length}`, 'GPT4Interaction.useEffect.fetchAvailableModels');
                setAvailableModels(models);
                setModel(models[0].id);
            } catch (error) {
                log(`Error fetching available models:  ${error}`, 'GPT4Interaction.useEffect.fetchAvailableModels');
            }
        };

        fetchAvailableModels();
    }, []);

    const getToggleOpen = (index) => { return () => toggleOpen(index) }

    const toggleOpen = (index) => {
        console.log("toggleOpen(Index): ", index)
        if (!index) return
        const newConversation = [...conversation];
        newConversation[index].open = !newConversation[index].open;
        console.log("newConversation: ", newConversation)
        setConversation(newConversation);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const selectedModel = availableModels.find((m) => m.id === model);
            const conversationWithPrompt = [...conversation, { role: "user", content: prompt }];
            setConversation(conversationWithPrompt);
            // console.log("conversationWithPrompt", conversationWithPrompt)
            const generatedAnswer = await generateText(conversationWithPrompt, model, selectedModel.isChatModel);
            setConversation([...conversationWithPrompt, { role: "assistant", content: generatedAnswer.content, fullResponse: generatedAnswer }]);
            setPrompt('');
        } catch (error) {
            log(`Error generating text: ${error}`, 'GPT4Interaction.handleSubmit');
        }
    };

    const handleModelChange = (e) => {
        setModel(e.target.value);
    };

    return (
        <div>
            <label htmlFor="model">Model:</label>
            <select id="model" value={model} onChange={handleModelChange}>
                {availableModels.map((modelObj) => (
                    <option key={modelObj.id} value={modelObj.id}>
                        {modelObj.id}
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
