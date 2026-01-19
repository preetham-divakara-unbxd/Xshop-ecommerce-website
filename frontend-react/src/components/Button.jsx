import React from 'react';

const Button = ({ text, className = 'btn-primary', onClick, type = 'button', children }) => {
  return (
    <button 
      type={type} 
      className={`btn ${className}`}
      onClick={onClick}
    >
      {text || children}
    </button>
  );
};

export default Button;
