import React from 'react';
import './span.css';

const Span = ({ className, children }) => {

    return <span className={`span ${className}`}>{children}</span>;
};
export default Span;