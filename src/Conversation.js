import React, { useState, Text } from 'react';
import ConversationEntry from './ConversationEntryA12';

const Conversation = ({ conversation }) => {

    return (
        <div className="conversation">
            A12
            {conversation.map((entry, index) => ConversationEntry(entry, index))}
        </div>
    );
};

export default Conversation;
