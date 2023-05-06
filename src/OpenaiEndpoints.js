export const endpoints = [
    {
        name: "Completions",
        endpoint_id: "completions",
        url: "/v1/completions",
        description: "Text completions",
        mandatory_vars: ["prompt", "model"],
        supported: true,
    },
    {
        name: "Edits",
        endpoint_id: "edits",
        url: "/v1/edits",
        description: "Text editing",
        mandatory_vars: ["text", "model"],
    },
    {
        name: "Fine-tunes",
        endpoint_id: "fine_tunes",
        url: "/v1/fine-tunes",
        description: "Fine-tuning",
        mandatory_vars: ["config", "dataset"],
    },
    {
        name: "Moderations",
        endpoint_id: "moderations",
        url: "/v1/moderations",
        description: "Text moderation",
        mandatory_vars: ["content", "model"],
    },
    {
        name: "Embeddings",
        endpoint_id: "embeddings",
        url: "/v1/embeddings",
        description: "Text embeddings",
        mandatory_vars: ["text", "model"],
    },
    {
        name: "Audio Transcriptions",
        endpoint_id: "audio_transcriptions",
        url: "/v1/audio/transcriptions",
        description: "Audio to text",
        mandatory_vars: ["audio_data", "model"],
    },
    {
        name: "Audio Translations",
        endpoint_id: "audio_translations",
        url: "/v1/audio/translations",
        description: "Audio translations",
        mandatory_vars: ["audio_data", "source_lang", "target_lang", "model"],
    },
    {
        name: "Chat Completions",
        endpoint_id: "chat_completions",
        url: "/v1/chat/completions",
        description: "Chat completions",
        mandatory_vars: ["messages", "model"],
        supported: true,
    },
];
