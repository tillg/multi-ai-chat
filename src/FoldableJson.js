import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('json', json);

const FoldableJson = ({ jsonStructure }) => {
    const [isFolded, setIsFolded] = useState(true);

    const toggleFold = () => {
        setIsFolded(!isFolded);
    };

    return (
        <div className="foldable-json" onClick={toggleFold}>
            {isFolded ? (
                <span className="folded">
                    {`{...}`}
                </span>
            ) : (
                <SyntaxHighlighter language="json" style={docco}>
                    {JSON.stringify(jsonStructure, null, 2)}
                </SyntaxHighlighter>
            )}
        </div>
    );
};

export default FoldableJson;
