import React, { useState } from 'react';
import { JSONTree } from 'react-json-tree';

const JSONDisplay = (myJson) => {
    // const [folded, setFolded] = useState(false);

    let folded = true

    const toggleFold = () => {
        folded = !folded
        // setFolded(!folded);
    };

    return (
        <div>
            <button onClick={toggleFold}>
                {folded ? 'Unfold' : 'Fold'}
            </button>
            <JSONTree
                data={myJson}
                shouldExpandNode={() => !folded}
                style={{ marginTop: '10px' }}
            />
        </div>
    );
};

export default JSONDisplay;
