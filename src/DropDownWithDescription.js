import React, { useState } from 'react';
import Modal from 'react-modal';
import './dropdownwithdescription.css';

const options = [
    { value: 'option1', text: 'Option 1', description: 'This is a description for Option 1.This is a description for Option 1.This is a description for Option 1.This is a description for Option 1.This is a description for Option 1.' },
    { value: 'option2', text: 'Option 2', description: 'This is a description for Option 2.' },
    { value: 'option3', text: 'Option 3', description: 'This is a description for Option 3.' },
];

const DropdownWithDescription = ({ title, options, passBackSelectedOption }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const selectOption = (option) => {
        passBackSelectedOption(option)
        setSelectedOption(option);
        closeModal();
    };

    const buttonText = selectedOption ? "Selected: " + selectedOption.text + " - " + selectedOption.description : title;
    return (
        <div>
            <button onClick={openModal}>{buttonText}</button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel={title} className="modal">
                <button onClick={closeModal}>Close</button>
                <table>
                    <tbody>
                        {options.map((option, index) => (
                            <tr key={index} onClick={() => selectOption(option)} className="option-item">
                                <td className="option-title">{option.text}</td>
                                <td className="option-description">{option.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal>
            {/* {selectedOption && (
                <div>
                    <p>Selected: {selectedOption.text} - {selectedOption.description}</p>
                </div>
            )} */}
        </div>
    );
};

export default DropdownWithDescription;
