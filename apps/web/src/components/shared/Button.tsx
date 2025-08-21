import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

const sizeClasses = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2 text-base',
  lg: 'px-8 py-3 text-lg',
};

const variantClasses = {
  primary: 'bg-green-500 text-white font-medium rounded-full border-0 transition-colors hover:bg-green-700',
  secondary: 'bg-gray-400 text-white font-medium rounded-full border-0 transition-colors hover:bg-gray-600'
};

export const Button: React.FC<ButtonProps> = ({
  children,
  size = 'md',
  variant = 'primary',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
