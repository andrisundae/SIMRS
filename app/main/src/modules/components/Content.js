import React from 'react';
import { Segment } from 'semantic-ui-react';

function Content({ children, ...props }) {
  return (
    <Segment className="bg-gray-200 min-h-screen" {...props}>
      {children}
    </Segment>
  );
}

export default Content;
