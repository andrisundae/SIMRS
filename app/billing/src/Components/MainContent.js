import React from 'react';
import classNames from 'classnames';

export default function MainContent({ children, className }) {
  return (
    <div
      className={classNames(
        'fixed right-0 left-0 bg-white bottom-9 top-20',
        className
      )}
    >
      {children}
    </div>
  );
}
