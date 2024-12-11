import React from 'react';
import PropTypes from 'prop-types';


const Button = ({ onClick, children }) => {
    return (
        <button className={`px-4 py-2 rounded bg-gray-800 text-white dark:bg-white dark:text-gray-800 `} onClick={onClick}>
            {children}
        </button>
    );
};

Button.propTypes = {
   
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Button;
