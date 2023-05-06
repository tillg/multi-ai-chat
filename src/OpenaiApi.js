import { models } from './OpenaiModels';
import { endpoints } from './OpenaiEndpoints';

const OPENAI_API_BASE_URL = 'https://api.openai.com'

let API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const MAX_TOKENS = 800
const TEMPERATURE = 0.7

let availableModels = []

if (!API_KEY) {
    const userInput = prompt("Please enter your OpenAI API key:", "sk-<your key here>");
    API_KEY = userInput
}

const buildRequestForCompletionEndpoint = ({ prompt, model_id, apiKey = API_KEY }) => {
    if (prompt === undefined) {
        log("Error: Cannot use Completion Endpoint without prompt.", "buildRequestForCompletionEndpoint")
        return
    }
    if (apiKey === undefined) {
        log("Error: Cannot use Completion Endpoint without API Key.", "buildRequestForCompletionEndpoint")
        return
    }
    if (model_id === undefined) {
        log("Error: Cannot use Completion Endpoint without model id.", "buildRequestForCompletionEndpoint")
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


const buildRequestForChatCompletionEndpoint = ({ messages, model_id, apiKey = API_KEY }) => {
    if (messages === undefined) {
        log("Error: Cannot use Completion Endpoint without messages.", "buildRequestForCompletionEndpoint")
        return
    }
    if (apiKey === undefined) {
        log("Error: Cannot use Completion Endpoint without API Key.", "buildRequestForCompletionEndpoint")
        return
    }
    if (model_id === undefined) {
        log("Error: Cannot use Completion Endpoint without model id.", "buildRequestForCompletionEndpoint")
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

export const generateText = async ({ conversation, model_id, apiKey = API_KEY, endpoint_id = "chat_completions" }) => {
    let requestOptions;
    let requestUrl;
    let extractor;
    switch (endpoint_id) {
        case "chat_completions":
            {// Transfor conversation to messages
                const messages = conversation.map((item) => {
                    return {
                        role: item.role,
                        content: item.content,
                    };
                });
                const options = {
                    model_id,
                    messages,
                    apiKey: apiKey ? apiKey : API_KEY
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
                    apiKey: apiKey ? apiKey : API_KEY
                }
                requestOptions = buildRequestForCompletionEndpoint(options)
                const endpoint = endpoints.find((element) => element.endpoint_id === "completions");
                requestUrl = OPENAI_API_BASE_URL + endpoint.url
                extractor = extractAnswerForCompletionEndpoint
                break;
            }
        default:
            const errorText = `Endpoint ${endpoint_id} is not supported (yet).`
            log(`Error: ${errorText}`, "generateText")
            throw new Error(errorText);
    }

    let answer = {
        model_id: model_id
    }

    try {
        console.log(JSON.stringify(requestOptions))
        const response = await fetch(requestUrl, requestOptions);
        const data = await response.json();

        if (!response.ok) {
            log(`Error: ${Error(data.error.message)}`, 'generateText')
            throw new Error(data.error.message);
        }
        console.log(data)
        answer.content = extractor(data)
        answer.fullResponse = data
        //console.log(answer)
        return answer;

    } catch (error) {
        log('Error generating text:' + error.message, 'generateText')
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

export const getAvailableModels = async () => {
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
                    console.log(`Endpoint ${endpoint_id} is not supported (yet).`)
                }
            })
        }
    })
    console.log(availableModels)
    return availableModels;
    /* 
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
         */
};

export const log = (logMessage, functionName) => {
    if (logMessage.toUpperCase().includes("ERROR")) {
        console.error(logMessage)
    }
    const event = new CustomEvent('log', { detail: { message: logMessage, functionName } });
    window.dispatchEvent(event);
};