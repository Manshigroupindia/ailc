import React from 'react';

export const Loader = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-4 border-primary-container border-t-secondary-fixed rounded-full animate-spin"></div>
      <p className="font-headline-sm text-primary text-xl font-bold tracking-wider">AILC</p>
      <span className="font-label-md text-outline">Loading institutional portal...</span>
    </div>
  );
};
