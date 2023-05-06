export const models = [
    {
        "model_id": "gpt-4",
        "description": "A set of models that improve on GPT-3.5 and can understand as well as generate natural language or code",
        "endpoints": ["chat_completions"],
        "supported": true,
        "family": "gpt-4"
    },
    {
        "model_id": "gpt-3.5",
        "description": "A set of models that improve on GPT-3 and can understand as well as generate natural language or code",
        "endpoints": ["chat_completions"],
        "supported": false,
        "family": "gpt-3.5"
    },
    {
        "model_id": "DALL·E",
        "description": "A model that can generate and edit images given a natural language prompt",
        "endpoints": [],
        "supported": true,
        "family": "DALL·E"
    },
    {
        "model_id": "Whisper",
        "description": "A model that can convert audio into text",
        "endpoints": ["audio_transcriptions", "audio_translations"],
        "supported": true,
        "family": "Whisper"
    },
    {
        "model_id": "Embeddings",
        "description": "A set of models that can convert text into a numerical form",
        "endpoints": ["embeddings"],
        "supported": true,
        "family": "Embeddings"
    },
    {
        "model_id": "Moderation",
        "description": "A fine-tuned model that can detect whether text may be sensitive or unsafe",
        "endpoints": ["moderations"],
        "supported": true,
        "family": "Moderation"
    },
    {
        "model_id": "gpt-3",
        "description": "A set of models that can understand and generate natural language",
        "endpoints": ["completions", "edits", "fine_tunes", "chat_completions"],
        "supported": false,
        "family": "gpt-3"
    },
    {
        "model_id": "gpt-3.5-turbo",
        "description": 'Most capable GPT-3.5 model and optimized for chat at 1/10th the cost of \ntext-davinci-003. Will be updated with our latest model iteration',
        "endpoints": ["chat_completions"],
        "supported": true,
        "family": "gpt-3.5"
    },
    {
        "model_id": "gpt-3.5-turbo-0301",
        "description": "Snapshot of gpt-3.5-turbo from March 1st 2023. Unlike gpt-3.5-turbo, this model will not receive updates, and will be deprecated 3 months after a new version is released.",
        "endpoints": ["chat_completions"],
        "supported": true,
        "family": "gpt-3.5"
    },
    {
        "model_id": "text-davinci-003",
        "description": "Can do any language task with better quality, longer output, and consistent instruction-following than the curie, babbage, or ada models. Also supports inserting completions within text.",
        "endpoints": ["completions", "edits", "fine_tunes"],
        "supported": true,
        "family": "gpt-3.5"
    },
    {
        "model_id": "text-davinci-002",
        "description": "Similar capabilities to text-davinci-003 but trained with supervised fine-tuning instead of reinforcement learning",
        "endpoints": ["completions", "edits", "fine_tunes"],
        "supported": true,
        "family": "gpt-3.5"
    }
]

