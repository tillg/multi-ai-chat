import React, { useState, Text } from 'react';
import { JSONTree } from 'react-json-tree';


const ConversationEntryFullResponse = (entry, index, toggleOpen) => {
    const isOpen = entry.open
    if (entry.fullResponse) {
        const model = entry.fullResponse.fullResponse.model
        const JsonStr = JSON.stringify(entry.fullResponse.fullResponse, null, 2)
        return (
            <div>
                <button className="full-width-button" onClick={toggleOpen}>
                    {isOpen ? `Model: ${model}   ⬆️` : `Model: ${model}   ⬇️`}
                </button>
                {isOpen && (
                    <pre className="conversation-fullResponse">
                        {JsonStr}
                    </pre>)}
            </div>)
    } else return ""
}

const ConversationEntryError = (entry) => {
    if ((entry.fullResponse) && (entry.fullResponse.error)) {
        return (
            <div className="conversation-error">{entry.fullResponse.error}</div>
        )
    } else return ""
}

const ConversationEntryPrompt = (entry) => {
    if (entry.role === "user") {
        return (
            <div className="conversation-role-user">{entry.content}</div>
        )
    } else return ""
}

const ConversationEntryAnswer = (entry) => {
    if (entry.role === "assistant") {
        return (
            <div className="conversation-role-assistant">{entry.content}</div>
        )
    } else return ""
}

const ConversationEntry = (entry, index, toggleOpen) => {

    return (
        <div key={index} className={`conversation-entry`}>
            {/* <div className="conversation-role-user">{entry.prompt}</div> */}
            {ConversationEntryPrompt(entry)}
            {ConversationEntryAnswer(entry)}
            {ConversationEntryError(entry)}
            {ConversationEntryFullResponse(entry, index, toggleOpen)}
        </div>
    );
};

export default ConversationEntry;
