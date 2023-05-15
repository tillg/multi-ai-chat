import React, { useState, useContext } from 'react';
import { generateText, separateModelEndpoint } from './OpenaiApi';
import './AiInteraction.css';
import Prompt from './Prompt';
import ModelSelector from './ModelSelector';
import Conversation from './Conversation';
import { AppContext } from "./App";

const AiInteraction = () => {
    const [contextState] = useContext(AppContext);
    const [modelAndEndpoints, setModelAndEndpoints] = useState(["none", "none"]);
    const [conversation, setConversation] = useState([]);
    const [promptIsActive, setPromptIsActive] = useState(false);

    const extractConversation = (conversationNo, conversation) => {
        const conversationOfAssistant = conversation.filter((entry) => entry.role === "user" || entry.role === `assistant${conversationNo}`)
        const cleanedConversation = conversationOfAssistant.map((entry) => {
            if (entry.role === `assistant${conversationNo}`) {
                return { ...entry, role: "assistant" }
            } else return entry
        })
        return cleanedConversation
    }

    const addPreliminaryAnswers = (conversation) => {
        const conversationWithPreliminaryAnswers = [...conversation, { role: "assistant0", content: "Thinking..." }, { role: "assistant1", content: "Thinking..." }];
        return conversationWithPreliminaryAnswers
    }
    const updateLastAnswer = async (answer, conversationNo, isFinal, xhr) => {
        setConversation(conversation => {
            // console.log(`updateLastAnswer`, answer, conversationNo, "Length of conversation: ", conversation.length, "xhr.data", xhr.response)
            if (conversation.length === 0) return
            let i = conversation.length - 1
            let conversationWithUpdatedLastAnswer = [...conversation]
            while (i >= 0) {
                if (conversation[i].role === `assistant${conversationNo}`) {
                    conversationWithUpdatedLastAnswer[i].content = answer;
                    const dataString = xhr.response

                    // Coide snippet copied from here:
                    //   https://github.com/justinmahar/openai-ext/blob/master/src/OpenAIExt.ts
                    const dataPrefix = 'data: ';
                    const doneData = `${dataPrefix}[DONE]`;
                    const dataJsonLines = dataString
                        .split(doneData)
                        .join('')
                        .trim()
                        .split(dataPrefix)
                        .filter((v) => !!v); // Remove empty lines
                    const fullResponseSnippets = dataJsonLines.map((dataJson) => {
                        let parsed
                        try {
                            parsed = JSON.parse(dataJson);
                            if (parsed.error) {
                                throw new Error(JSON.stringify(parsed.error));
                            }
                        } catch (e) {
                            console.error(e);
                            console.error(`Bad data JSON: \`${dataJson}\``);
                        }
                        return parsed
                    });
                    const fullResponse = fullResponseSnippets[0];
                    conversationWithUpdatedLastAnswer[i].fullResponse = fullResponse;
                    break;
                }
                i--;
            }
            return conversationWithUpdatedLastAnswer
        });
    }

    const createResponseStreamHandler = (conversationNo) => {

        const streamHandler = {
            onContent: async (content, isFinal, xhr) => {
                updateLastAnswer(content, conversationNo, isFinal, xhr)
            },
            onDone(xhr) {
                // console.log("Done!");
            },
            onError(error, status, xhr) {
                console.error(error);
            },
        }
        return streamHandler
    }

    const handleSubmit = async (prompt) => {
        try {
            setPromptIsActive(false);
            const conversationWithPrompt = [...conversation, { role: "user", content: prompt }];
            const conversationWIthPromptAndPreliminaryAnswers = addPreliminaryAnswers(conversationWithPrompt);
            setConversation(conversationWIthPromptAndPreliminaryAnswers);

            const extraxtedConversation0 = extractConversation(0, conversationWithPrompt)
            const extraxtedConversation1 = extractConversation(1, conversationWithPrompt)
            const model_id0 = separateModelEndpoint(modelAndEndpoints[0]).model_id
            const endpoint_id0 = separateModelEndpoint(modelAndEndpoints[0]).endpoint_id
            const model_id1 = separateModelEndpoint(modelAndEndpoints[1]).model_id
            const endpoint_id1 = separateModelEndpoint(modelAndEndpoints[1]).endpoint_id

            const [generatedAnswer0, generatedAnswer1] = await Promise.all([
                generateText({ conversation: extraxtedConversation0, model_id: model_id0, endpoint_id: endpoint_id0, handler: createResponseStreamHandler(0) }),
                generateText({ conversation: extraxtedConversation1, model_id: model_id1, endpoint_id: endpoint_id1, handler: createResponseStreamHandler(1) })])

            const conversationWithAnswers = [...conversationWithPrompt, { role: "assistant0", content: generatedAnswer0.content, fullResponse: generatedAnswer0 }, { role: "assistant1", content: generatedAnswer1.content, fullResponse: generatedAnswer1 }];
            setConversation(conversationWithAnswers);
            setPromptIsActive(true);
        } catch (error) {
            console.error(`Error generating text: ${error}`);
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

    const availableModels = contextState.availableModels
    return (
        <div>
            <div className="selectors-container">
                <ModelSelector models={availableModels} onSelect={handleModelChange(0)} disabled={false} />
                <ModelSelector models={availableModels} onSelect={handleModelChange(1)} disabled={false} />
            </div>
            <Conversation conversation={conversation} />
            <Prompt onSubmit={handleSubmit} promptIsActive={promptIsActive} />
        </div >
    );
};

export default AiInteraction;
