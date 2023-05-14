import React from 'react';
import { marked } from "marked";
import { Comment } from "@com.mgmtp.a12.widgets/widgets-core/lib/comment";

export const MarkdownComment = ({ children, ...props }) => {
    const parsed = parseReactNode(children);
    return <Comment {...props} >{parsed}</Comment>;

    function parseReactNode(node) {
        // TODO Make nice code blocks like in the OpenAI UI
        // Maybe look here:
        //    https://marked.js.org/using_advanced#options
        //   https://github.com/markedjs/marked-highlight
        if (typeof node === "string") {
            return <span dangerouslySetInnerHTML={{ __html: marked.parse(node, { headerIds: false, mangle: false }) }} />;
        }
        if (Array.isArray(node)) {
            return node.map(parseReactNode);
        }
        return node;
    }
}