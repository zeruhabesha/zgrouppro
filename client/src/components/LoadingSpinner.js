import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <div className="w-16 h-16 bg-blue-500 rounded-full opacity-75 animate-ping"></div>
        <div className="absolute top-0 left-0 w-16 h-16 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
