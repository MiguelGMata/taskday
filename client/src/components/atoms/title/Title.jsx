import React from 'react';
import './title.css';

const Title = ({ className, children }) => {

    return <h1 className={`title ${className}`}>{children}</h1>;
};
export default Title;