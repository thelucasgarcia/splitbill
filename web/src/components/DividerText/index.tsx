import React, { PropsWithChildren } from 'react';

const DividerText: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex py-5 items-center">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="flex-shrink mx-4 text-gray-400">{ children }</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
}

export default DividerText;