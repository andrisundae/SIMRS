import React from 'react';

function Content({ children, className, ...props }) {
  return (
    <div
      // className={`${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Content;
