import React from 'react';
import './Sections.css';

const SectionHeader = (props) => {
    return (
        <div className="Section-header">
            <span>{props.label}</span>
        </div>
    )
}

export { SectionHeader };