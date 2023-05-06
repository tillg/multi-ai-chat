import React, { useState, Text } from 'react';
import ConversationEntry from './ConversationEntry';

const Conversation = ({ conversation }) => {

    return (
        <div className="conversation">
            {conversation.map((entry, index) => ConversationEntry(entry, index))}
        </div>
    );
};

export default Conversation;
