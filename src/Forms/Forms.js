import React from 'react';
import './Forms.css';

const TextInput = (props) => {
    return (
        <input type="text" id={props.elementId} className="Text-input" placeholder={props.placeholder} onChange={props.onChange} value={props.value} onBlur={props.onBlur} />
    )
}

const SubmitButton = (props) => {
    return (
        <input type="submit" id={props.elementId} className="Submit-btn" placeholder={props.placeholder} />
    )
}

export { TextInput, SubmitButton };