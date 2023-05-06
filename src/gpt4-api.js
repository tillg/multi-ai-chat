import axios from 'axios';
import { models } from './OpenaiModels';

const COMPLETION_API_URL = 'https://api.openai.com/v1/completions';
const CHAT_API_URL = 'https://api.openai.com/v1/chat/completions';
const API_MODELS_URL = 'https://api.openai.com/v1/engines';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const MAX_TOKENS = 100

let availableModels = []

export const generateText = async (conversation, model, apiKey, isChatModel = true) => {
    const lastElement = conversation.length > 0 ? conversation[conversation.length - 1] : undefined;
    const prompt = lastElement ? lastElement.content : undefined;
    log(`Generating text with model: ${model.model_id} for prompt ${prompt}`, 'generateText');

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            prompt: prompt,
            model: model.model_id,
            max_tokens: MAX_TOKENS,
            n: 1,
            stop: null,
            temperature: 1,
        }),
    };

    let answer = {
        prompt: prompt,
        model: model
    }

    try {
        if (!isChatModel) {
            log("Trying assuming it's not a chat model", 'generateText')

            const response = await fetch(COMPLETION_API_URL, requestOptions);
            const data = await response.json();

            if (
                data?.error?.message ===
                "This is a chat model and not supported in the v1/completions endpoint. Did you mean to use v1/chat/completions?"
            ) {
                log(`Failed: It seems the model ${model} is chat based - trying the other way...`, 'generateText')
                // Retry with chat API
                return generateText(conversation, model, apiKey, true);
            }

            if (!response.ok) {
                log(`Got an error: ${Error(data.error.message)}`, 'generateText')
                answer.mode = 'NoChat'
                answer.error = data.error.message
                answer.fullResponse = data
                return answer
                //throw new Error(data.error.message);
            }
            answer.mode = 'NoChat'
            answer.content = data.choices[0].text.trim()
            answer.fullResponse = data
            return answer;
        } else {
            log("Trying assuming it is a chat model.", 'generateText')

            const messages = conversation.map((item) => {
                return {
                    role: item.role,
                    content: item.content,
                };
            });

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    messages: messages,
                    model: model,
                    max_tokens: MAX_TOKENS,
                    n: 1,
                    stop: null,
                    temperature: 1,
                }),
            };

            const response = await fetch(CHAT_API_URL, requestOptions);
            const data = await response.json();

            if (!response.ok) {
                log("Got an error: " + Error(data.error.message), 'generateText')
                answer.mode = 'Chat'
                answer.error = data.error.message
                answer.fullResponse = data
                return answer
                //throw new Error(data.error.message);
            }
            answer.mode = 'Chat'
            answer.content = data.choices[0].message.content.trim()
            answer.fullResponse = data
            return answer;
        }
    } catch (error) {
        log('Error generating text:' + error, 'generateText')
        throw error;
    }
};

export const getAvailableModels = async () => {
    if (availableModels.length > 0) return availableModels;

    try {
        const response = await axios.get(API_MODELS_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
        });
        const allModels = response.data.data.map((model) => ({
            model_id: model.id,
            isChatModel: model.usage && model.usage.endpoints && model.usage.endpoints.includes('v1/chat/completions'),
        }));

        const modelsWithDescriptions = allModels.map((model) => {
            const knownModel = models.find((known) => known.model_id === model.model_id);

            if (knownModel) {
                return {
                    ...model,
                    ...knownModel
                };
            } else {
                return {
                    ...model,
                    description: '-',
                };
            }
        });

        availableModels = modelsWithDescriptions.sort((a, b) => a.model_id.localeCompare(b.model_id));
        //console.log(availableModels)
        return availableModels;

    } catch (error) {
        log('Error fetching available models:' + error, 'getAvailableModels');
        throw error;
    }
};

export const log = (logMessage, functionName) => {
    if (logMessage.toUpperCase().includes("ERROR")) {
        console.error(logMessage)
    }
    const event = new CustomEvent('log', { detail: { message: logMessage, functionName } });
    window.dispatchEvent(event);
};