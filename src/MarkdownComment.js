import React from 'react';
import { parse } from "marked";
import { Comment } from "@com.mgmtp.a12.widgets/widgets-core/lib/comment";

export const MarkdownComment = ({ children, ...props }) => {
    const parsed = parseReactNode(children);
    return <Comment {...props}>{parsed}</Comment>;

    // ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined
    function parseReactNode(node: React.ReactNode): React.ReactNode {
        if (typeof node === "string") {
            return <span dangerouslySetInnerHTML={{ __html: parse(node) }} />;
        }
        if (Array.isArray(node)) {
            return node.map(parseReactNode);
        }
        // TODO: extend support according to requirements
        return node;
    }
}