import React from 'react';
import { Segment } from 'semantic-ui-react';

function Content({ children, ...props }) {
  return (
    <Segment style={{ backgroundColor: '#ECECEC' }} {...props}>
      {children}
    </Segment>
  );
}

export default Content;
