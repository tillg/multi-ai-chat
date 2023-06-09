import { Icon } from "@com.mgmtp.a12.widgets/widgets-core/lib/icon";
import { CommentList } from "@com.mgmtp.a12.widgets/widgets-core/lib/comment";
import { MarkdownComment } from './MarkdownComment';
import { ThemeProvider } from "styled-components";
import { flatTheme } from "@com.mgmtp.a12.widgets/widgets-core/lib/theme/flat/flat-theme";
import "@com.mgmtp.a12.widgets/widgets-core/lib/theme/basic.css";
const colors = ["#99ccff", "#ff9999"]
const regex = /\d+/;

const Conversation = ({ conversation }) => {

    const createComment = (entry, index) => {
        let author
        if (entry.fullResponse && entry.fullResponse.model) {
            author = entry.role === "user" ? "User" : entry.fullResponse.model
        } else {
            author = entry.role === "user" ? "User" : "???"
        }
        const icon = entry.role === "user" ? "person" : "smart_toy"
        const action = entry.role === "user" ? "wrote" : "answered"
        const assistantNo = entry.role.match(regex);
        const commentStyle = {
            flex: 1,
            backgroundColor: colors[assistantNo],
            textAlign: 'left'
        }
        const commentMeta = {
            avatar: <Icon>{icon}</Icon>,
            author: author,
            action: action
        }

        return (
            <MarkdownComment commentMeta={commentMeta} key={index} style={commentStyle} >
                {entry.content}
            </MarkdownComment >
        )
    }

    const createCommentGroup = (commentGroup, index) => {
        const containerStyle = {
            display: 'flex'
        };
        return (
            <div style={containerStyle} key={index}>
                {commentGroup.map((entry, index) => createComment(entry, index))}
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
                {allComments.map((commentGroup, index) => createCommentGroup(commentGroup, index))}
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
