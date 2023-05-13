import React, { useState, useEffect } from 'react';
import { generateText, getAvailableModels, log, separateModelEndpoint } from './OpenaiApi';
import './AiInteractionDouble.css';
import Prompt from './PromptA12';
import ModelSelector from './ModelSelector';
import Conversation from './ConversationA12';


const AiInteractionDouble = () => {
    const [modelAndEndpoints, setModelAndEndpoints] = useState(["none", "none"]);
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
                // setModelAndEndpoints(models[0]);
            } catch (error) {
                log(`Error fetching available models:  ${error}`, 'GPT4Interaction.useEffect.fetchAvailableModels');
            }
        };

        fetchAvailableModels();
    }, []);

    const extractConversation = (conversationNo, conversation) => {
        const conversationOfAssistant = conversation.filter((entry) => entry.role === "user" || entry.role === `assistant${conversationNo}`)
        const cleanedConversation = conversationOfAssistant.map((entry) => {
            if (entry.role === `assistant${conversationNo}`) {
                return { ...entry, role: "assistant" }
            } else return entry
        })
        return cleanedConversation
    }

    const handleSubmit = async (prompt) => {
        try {
            setPromptIsActive(false);
            const conversationWithPrompt = [...conversation, { role: "user", content: prompt }];
            setConversation(conversationWithPrompt);

            const extraxtedConversation0 = extractConversation(0, conversationWithPrompt)
            const extraxtedConversation1 = extractConversation(1, conversationWithPrompt)
            const model_id0 = separateModelEndpoint(modelAndEndpoints[0]).model_id
            const endpoint_id0 = separateModelEndpoint(modelAndEndpoints[0]).endpoint_id
            const model_id1 = separateModelEndpoint(modelAndEndpoints[1]).model_id
            const endpoint_id1 = separateModelEndpoint(modelAndEndpoints[1]).endpoint_id

            const [generatedAnswer0, generatedAnswer1] = await Promise.all([generateText({ conversation: extraxtedConversation0, model_id: model_id0, endpoint_id: endpoint_id0 }), generateText({ conversation: extraxtedConversation1, model_id: model_id1, endpoint_id: endpoint_id1 })])

            // const generatedAnswer0 = await generateText({ conversation: extraxtedConversation0, model_id: model_id0, endpoint_id: endpoint_id0 });
            // const generatedAnswer1 = await generateText({ conversation: extraxtedConversation1, model_id: model_id1, endpoint_id: endpoint_id1 });
            const conversationWithAnswers = [...conversationWithPrompt, { role: "assistant0", content: generatedAnswer0.content, fullResponse: generatedAnswer0 }, { role: "assistant1", content: generatedAnswer1.content, fullResponse: generatedAnswer1 }];
            setConversation(conversationWithAnswers);
            setPromptIsActive(true);
        } catch (error) {
            log(`Error generating text: ${error}`, 'GPT4Interaction.handleSubmit');
        }
    };

    const handleModelChange = (conversationNo) => (newModel_id) => {
        if (newModel_id === "none") {
            alert("Please select a model!");
            setPromptIsActive(false);
            return
        }
        const newModelAndEndpoints = [...modelAndEndpoints]
        newModelAndEndpoints[conversationNo] = newModel_id
        setModelAndEndpoints(newModelAndEndpoints);
        setPromptIsActive(true);
        newModelAndEndpoints.forEach(model => {
            if (model === "none") setPromptIsActive(false)
        });
    };

    return (
        <div>
            <div className="selectors-container">
                <ModelSelector models={availableModels} onSelect={handleModelChange(0)} disabled={false} />
                <ModelSelector models={availableModels} onSelect={handleModelChange(1)} disabled={false} />
            </div>
            <Conversation conversation={conversation} />
            {/* <div>
                <div className="conversation">
                    {conversation.map((entry, index) => ConversationEntry(entry, index, getToggleOpen(index)))}
                </div>
            </div> */}
            <Prompt onSubmit={handleSubmit} promptIsActive={promptIsActive} />
        </div >
    );
};

export default AiInteractionDouble;
