import React from 'react';

type ButtonProps = {
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    children?: React.ReactNode;
};

const Button = ({
    text,
    onClick,
    disabled = false,
    className = '',
    type = 'button',
    loading = false,
    children,
}: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`px-4 py-2 rounded-md transition-all 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'} 
        ${className}`}
        >
            {loading ? 'Loading...' : children || text}
        </button>
    );
};

export default Button;