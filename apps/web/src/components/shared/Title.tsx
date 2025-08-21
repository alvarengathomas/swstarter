import React from 'react';

interface TitleProps {
  children: React.ReactNode;
}

export function Title({ children }: TitleProps) {
  return (
    <h1 className="text-2xl font-bold text-gray-900 mb-6">
      {children}
    </h1>
  );
}
