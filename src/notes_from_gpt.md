I will give you the list of models and their description copied over from a website within 3 backticks. Please transform it into a json with the following fields per model:
- model-id
- description
- endpoints (array of strings)
- available (boolean)

````
MODELS	DESCRIPTION
GPT-4 Limited beta	A set of models that improve on GPT-3.5 and can understand as well as generate natural language or code
GPT-3.5	A set of models that improve on GPT-3 and can understand as well as generate natural language or code
DALL·EBeta	A model that can generate and edit images given a natural language prompt
WhisperBeta	A model that can convert audio into text
Embeddings	A set of models that can convert text into a numerical form
Moderation	A fine-tuned model that can detect whether text may be sensitive or unsafe
GPT-3	A set of models that can understand and generate natural language
CodexDeprecated	A set of models that can understand and generate code, including translating natural language to code
```

----------------------------

Below the 3 backticks below I copied and pasted the endpoints and which models are available per endpoint. Please complete the json accordingly.

```
ENDPOINT	MODEL NAME
/v1/chat/completions	gpt-4, gpt-4-0314, gpt-4-32k, gpt-4-32k-0314, gpt-3.5-turbo, gpt-3.5-turbo-0301
/v1/completions	text-davinci-003, text-davinci-002, text-curie-001, text-babbage-001, text-ada-001
/v1/edits	text-davinci-edit-001, code-davinci-edit-001
/v1/audio/transcriptions	whisper-1
/v1/audio/translations	whisper-1
/v1/fine-tunes	davinci, curie, babbage, ada
/v1/embeddings	text-embedding-ada-002, text-search-ada-doc-001
/v1/moderations	text-moderation-stable, text-moderation-latest
```

Returned:
[
  {
    "model-id": "GPT-4 Limited beta",
    "description": "A set of models that improve on GPT-3.5 and can understand as well as generate natural language or code",
    "endpoints": ["/v1/chat/completions"],
    "available": true
  },
  {
    "model-id": "GPT-3.5",
    "description": "A set of models that improve on GPT-3 and can understand as well as generate natural language or code",
    "endpoints": ["/v1/chat/completions"],
    "available": true
  },
  {
    "model-id": "DALL·EBeta",
    "description": "A model that can generate and edit images given a natural language prompt",
    "endpoints": [],
    "available": true
  },
  {
    "model-id": "WhisperBeta",
    "description": "A model that can convert audio into text",
    "endpoints": ["/v1/audio/transcriptions", "/v1/audio/translations"],
    "available": true
  },
  {
    "model-id": "Embeddings",
    "description": "A set of models that can convert text into a numerical form",
    "endpoints": ["/v1/embeddings"],
    "available": true
  },
  {
    "model-id": "Moderation",
    "description": "A fine-tuned model that can detect whether text may be sensitive or unsafe",
    "endpoints": ["/v1/moderations"],
    "available": true
  },
  {
    "model-id": "GPT-3",
    "description": "A set of models that can understand and generate natural language",
    "endpoints": ["/v1/completions", "/v1/edits", "/v1/fine-tunes"],
    "available": true
  },
  {
    "model-id": "CodexDeprecated",
    "description": "A set of models that can understand and generate code, including translating natural language to code",
    "endpoints": [],
    "available": false
  }
]
------------

Now let's transform the json:
- Make the mode-id a list of strings
- When the model-id contains "Beta" or "Deprecated" or "Limited beta" errase this part of the name, as it is not part of the model-id.

Result:
[
  {
    "model-id": ["gpt-4"],
    "description": "A set of models that improve on GPT-3.5 and can understand as well as generate natural language or code",
    "endpoints": ["/v1/chat/completions"],
    "available": true
  },
  {
    "model-id": ["gpt-3.5"],
    "description": "A set of models that improve on GPT-3 and can understand as well as generate natural language or code",
    "endpoints": ["/v1/chat/completions"],
    "available": true
  },
  {
    "model-id": ["DALL·E"],
    "description": "A model that can generate and edit images given a natural language prompt",
    "endpoints": [],
    "available": true
  },
  {
    "model-id": ["Whisper"],
    "description": "A model that can convert audio into text",
    "endpoints": ["/v1/audio/transcriptions", "/v1/audio/translations"],
    "available": true
  },
  {
    "model-id": ["Embeddings"],
    "description": "A set of models that can convert text into a numerical form",
    "endpoints": ["/v1/embeddings"],
    "available": true
  },
  {
    "model-id": ["Moderation"],
    "description": "A fine-tuned model that can detect whether text may be sensitive or unsafe",
    "endpoints": ["/v1/moderations"],
    "available": true
  },
  {
    "model-id": ["GPT-3"],
    "description": "A set of models that can understand and generate natural language",
    "endpoints": ["/v1/completions", "/v1/edits", "/v1/fine-tunes"],
    "available": true
  },
  {
    "model-id": ["Codex"],
    "description": "A set of models that can understand and generate code, including translating natural language to code",
    "endpoints": [],
    "available": false
  }
]

----------------------

This is my json I have right now:

[
  {
    "model-id": "GPT-4",
    "description": "A set of models that improve on GPT-3.5 and can understand as well as generate natural language or code",
    "endpoints": ["/v1/chat/completions"],
    "usable": true
  },
  {
    "model-id": "GPT-3.5",
    "description": "A set of models that improve on GPT-3 and can understand as well as generate natural language or code",
    "endpoints": ["/v1/chat/completions"],
    "usable": true
  },
  {
    "model-id": "DALL·EB",
    "description": "A model that can generate and edit images given a natural language prompt",
    "endpoints": [],
    "usable": true
  },
  {
    "model-id": "WhisperBeta",
    "description": "A model that can convert audio into text",
    "endpoints": ["/v1/audio/transcriptions", "/v1/audio/translations"],
    "usable": true
  },
  {
    "model-id": "Embeddings",
    "description": "A set of models that can convert text into a numerical form",
    "endpoints": ["/v1/embeddings"],
    "usable": true
  },
  {
    "model-id": "Moderation",
    "description": "A fine-tuned model that can detect whether text may be sensitive or unsafe",
    "endpoints": ["/v1/moderations"],
    "usable": true
  },
  {
    "model-id": "GPT-3",
    "description": "A set of models that can understand and generate natural language",
    "endpoints": ["/v1/completions", "/v1/edits", "/v1/fine-tunes"],
    "usable": true
  },
  {
    "model-id": "GPT-3.5-turbo",
    "description": "Most capable GPT-3.5 model and optimized for chat at 1/10th the cost of text-davinci-003. Will be updated with our latest model iteration",
    "endpoints": ["/v1/completions", "/v1/edits", "/v1/fine-tunes"],
    "usable": true
  },
  {
    "model-id": "GPT-3.5-turbo-0301",
    "description": "Snapshot of gpt-3.5-turbo from March 1st 2023. Unlike gpt-3.5-turbo, this model will not receive updates, and will be deprecated 3 months after a new version is released.",
    "endpoints": ["/v1/completions", "/v1/edits", "/v1/fine-tunes"],
    "usable": true
  },
  {
    "model-id": "text-davinci-003",
    "description": "Can do any language task with better quality, longer output, and consistent instruction-following than the curie, babbage, or ada models. Also supports inserting completions within text.",
    "endpoints": ["/v1/completions", "/v1/edits", "/v1/fine-tunes"],
    "usable": true
  },
  {
    "model-id": "text-davinci-002",
    "description": "Similar capabilities to text-davinci-003 but trained with supervised fine-tuning instead of reinforcement learning",
    "endpoints": ["/v1/completions", "/v1/edits", "/v1/fine-tunes"],
    "usable": true
  },
  {
    "model-id": "code-davinci-002",
    "description": "Optimized for code-completion tasks",
    "endpoints": ["/v1/completions", "/v1/edits", "/v1/fine-tunes"],
    "usable": true
  },
]

Please add a field "family" to every entry.

------------------------------

I have 2 arrays: 
- Array allModels that contains objects with a model_id but without a desciption
- Array knownModels that contains objects with a model_id and descriptions - but not every model_id is in this array
How can I add the descriptions to the allModels array?
