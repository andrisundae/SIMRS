import React from 'react';
import { Segment } from 'semantic-ui-react';

function Content({ children, className, ...props }) {
  return (
    <Segment
      className={`min-h-screen bg-gray-200 px-3 py-1 ${className}`}
      {...props}
    >
      {children}
    </Segment>
  );
}

export default Content;
