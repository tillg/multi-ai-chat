import React from 'react';
import { Icon } from "@com.mgmtp.a12.widgets/widgets-core/lib/icon";
import { Comment, CommentList } from "@com.mgmtp.a12.widgets/widgets-core/lib/comment";
import { ThemeProvider } from "styled-components";
import { flatTheme } from "@com.mgmtp.a12.widgets/widgets-core/lib/theme/flat/flat-theme";
import "@com.mgmtp.a12.widgets/widgets-core/lib/theme/basic.css";
const colors = ["lightblue", "red"]
const regex = /\d+/;

const Conversation = ({ conversation }) => {

    const createComment = (entry, index) => {
        const author = entry.role === "user" ? "User" : entry.fullResponse.fullResponse.model
        const icon = entry.role === "user" ? "person" : "smart_toy"
        const action = entry.role === "user" ? "wrote" : "answered"
        const assistantNo = entry.role.match(regex);
        const commentStyle = {
            flex: 1,
            backgroundColor: colors[assistantNo]
        }
        const commentMeta = {
            avatar: <Icon>{icon}</Icon>,
            author: author,
            action: action
        }

        return (
            <Comment commentMeta={commentMeta} key={index} style={commentStyle} >
                {entry.content}
            </Comment >
        )
    }

    const createCommentGroup = (commentGroup) => {
        const containerStyle = {
            display: 'flex'
        };
        return (
            <div style={containerStyle}>
                {commentGroup.map((entry, index) => createComment(entry))}
            </div>
        )
    }

    const createComments = (conversation) => {
        let allComments = [];
        let i = 0;
        if (conversation.length === 0) return (<></>)
        do {
            let commentsSideBySide = [];
            commentsSideBySide.push(conversation[i])
            if (conversation[i].role === "user") {
                allComments.push(commentsSideBySide)
                i++;
                continue;
            }
            i++;
            while (i < conversation.length && conversation[i].role !== "user") {
                commentsSideBySide.push(conversation[i])
                i++;
            }
            allComments.push(commentsSideBySide)
        } while (i < conversation.length)

        return (
            <>
                {allComments.map((commentGroup) => createCommentGroup(commentGroup))}
            </>
        )
    }
    return (
        <ThemeProvider theme={flatTheme}>
            <CommentList>
                {createComments(conversation)}
            </CommentList>
        </ThemeProvider>
    )
};

export default Conversation;
