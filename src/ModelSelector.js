import React from 'react';
import { Select } from "@com.mgmtp.a12.widgets/widgets-core/lib/input/select";


const ModelSelector = ({ models, onSelect, disabled }) => {
    const [selectedItem, setSelectedItem] = React.useState(undefined);

    const handleModelChange = (e) => {
        setSelectedItem(e)
        onSelect(e);
    };

    if (!models) return (<div>Loading...</div>)

    const selectableItems = models.map((model, index) => ({ value: model, label: model }))

    return (
        <div>
            <Select onValueChanged={handleModelChange}
                placeholder="Please choose a model..."
                value={selectedItem}

                // disabled={disabled}
                items={selectableItems}>
            </Select>
        </div>
    );
};

export default ModelSelector;
