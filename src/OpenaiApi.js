import { models } from './OpenaiModels';
import { endpoints } from './OpenaiEndpoints';
import { OpenAIExt } from "openai-ext";

const OPENAI_API_BASE_URL = 'https://api.openai.com'

const MAX_TOKENS = 800
const TEMPERATURE = 0.7

let availableModels = []

const buildRequestForCompletionEndpoint = ({ prompt, model_id, apiKey }) => {
    if (prompt === undefined) {
        console.error("Error: Cannot use Completion Endpoint without prompt.")
        return
    }
    if (apiKey === undefined) {
        console.error("Error: Cannot use Completion Endpoint without API Key.")
        return
    }
    if (model_id === undefined) {
        console.error("Error: Cannot use Completion Endpoint without model id.")
        return
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            prompt: prompt,
            model: model_id,
            max_tokens: MAX_TOKENS,
            n: 1,
            stop: null,
            temperature: TEMPERATURE,
        }),
    };
    return requestOptions
}


const buildRequestForChatCompletionEndpoint = ({ messages, model_id, apiKey }) => {
    if (messages === undefined) {
        console.error("Error: Cannot use Completion Endpoint without messages.", "buildRequestForCompletionEndpoint")
        return
    }
    if (apiKey === undefined) {
        console.error("Error: Cannot use Completion Endpoint without API Key.", "buildRequestForCompletionEndpoint")
        return
    }
    if (model_id === undefined) {
        console.error("Error: Cannot use Completion Endpoint without model id.", "buildRequestForCompletionEndpoint")
        return
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            messages: messages,
            model: model_id,
            max_tokens: MAX_TOKENS,
            n: 1,
            stop: null,
            temperature: TEMPERATURE,
        }),
    };
    return requestOptions
}

const extractAnswerForChatCompletionEndpoint = (data) => data.choices[0].message.content.trim()
const extractAnswerForCompletionEndpoint = (data) => data.choices[0].text.trim()

export const generateText = async ({ conversation, model_id, apiKey, endpoint_id, handler = null }) => {
    if (handler === null) {
        return generateTextWithoutHandler({ conversation, model_id, apiKey, endpoint_id })
    } else {
        return generateTextWithHandler({ conversation, model_id, apiKey, endpoint_id, handler })
    }
}

const generateTextWithHandler = async ({ conversation, model_id, apiKey, endpoint_id, handler }) => {
    if (endpoint_id !== "chat_completions") {
        const errorText = `Endpoint ${endpoint_id} is not supported with handlers.`
        console.error("generateText", errorText)
        throw new Error(errorText);
    }
    const streamConfig = {
        apiKey: apiKey,
        handler: handler,
    }

    const xhr = OpenAIExt.streamClientChatCompletion(
        {
            model: model_id,
            messages: extractMessagesFromConversation(conversation),
        },
        streamConfig
    );

    return xhr
};

const extractMessagesFromConversation = (conversation) => {
    const messages = conversation.map((item) => {
        return {
            role: item.role,
            content: item.content,
        };
    });
    return messages
}

const generateTextWithoutHandler = async ({ conversation, model_id, apiKey, endpoint_id }) => {
    let requestOptions;
    let requestUrl;
    let extractor;
    switch (endpoint_id) {
        case "chat_completions":
            {
                const options = {
                    model_id,
                    messages: extractMessagesFromConversation(conversation),
                    apiKey
                }
                requestOptions = buildRequestForChatCompletionEndpoint(options)
                const endpoint = endpoints.find((element) => element.endpoint_id === "chat_completions");
                requestUrl = OPENAI_API_BASE_URL + endpoint.url
                extractor = extractAnswerForChatCompletionEndpoint
                break;
            }
        case "completions":
            {// Pull the promt from the conversation
                const lastElement = conversation.length > 0 ? conversation[conversation.length - 1] : undefined;
                const prompt = lastElement ? lastElement.content : undefined;
                const options = {
                    model_id,
                    prompt,
                    apiKey
                }
                requestOptions = buildRequestForCompletionEndpoint(options)
                const endpoint = endpoints.find((element) => element.endpoint_id === "completions");
                requestUrl = OPENAI_API_BASE_URL + endpoint.url
                extractor = extractAnswerForCompletionEndpoint
                break;
            }
        default:
            const errorText = `Endpoint ${endpoint_id} is not supported (yet).`
            console.error("generateTextWithoutHandler", `Error: ${errorText}`)
            throw new Error(errorText);
    }

    let answer = {
        model_id: model_id
    }

    try {
        // console.log(JSON.stringify(requestOptions))
        const response = await fetch(requestUrl, requestOptions);
        const data = await response.json();

        if (!response.ok) {
            console.error('generateTextWithoutHandler', `Error: ${Error(data.error.message)}`)
            throw new Error(data.error.message);
        }
        // console.log(data)
        answer.content = extractor(data)
        answer.fullResponse = data
        //console.log(answer)
        return answer;

    } catch (error) {
        console.error('generateTextWithoutHandler', 'Error generating text:' + error.message)
        throw error;
    }
};

const combineModelEndpoint = (model_id, endpoint_id) => { return model_id + " | " + endpoint_id }
export const separateModelEndpoint = (modelAndEndpoint) => {
    const parts = modelAndEndpoint.split(' | ');
    const model_id = parts[0];
    const endpoint_id = parts[1];
    return { model_id, endpoint_id }
}

export const getAvailableModels = () => {
    if (availableModels.length > 0) return availableModels;

    availableModels = []
    models.forEach((model) => {
        if (model.supported) {
            model.endpoints.forEach((endpoint_id) => {
                const endpoint = endpoints.find((element) => element.endpoint_id === endpoint_id);

                if (endpoint && endpoint.supported) {
                    const modelEndpoint = combineModelEndpoint(model.model_id, endpoint_id)
                    availableModels.push(modelEndpoint)
                } else {
                    console.error(`Endpoint ${endpoint_id} is not supported (yet).`)
                }
            })
        }
    })
    // console.log(availableModels)
    return availableModels;
};

// export const log = (logMessage, functionName) => {
//     if (logMessage.toUpperCase().includes("ERROR")) {
//         console.error(logMessage)
//     }
//     const event = new CustomEvent('log', { detail: { message: logMessage, functionName } });
//     window.dispatchEvent(event);
// };