import React from 'react';

export default function MainContent({ children, ...props }) {
  return (
    <div
      {...props}
      // className={classNames(
      //   'fixed right-0 left-0 bg-white bottom-9 top-[70px]',
      //   className
      // )}
    >
      {children}
    </div>
  );
}
