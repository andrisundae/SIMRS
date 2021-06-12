import React from 'react';
import { Icon, Header as SmHeader, Segment } from 'semantic-ui-react';

function Header({ title, icon, ...props }) {
  return (
    <Segment
      secondary
      className="content-header"
      style={{ paddingTop: 8, paddingBottom: 0 }}
      {...props}
    >
      <SmHeader as="h4">
        <Icon name={icon} />
        {title}
      </SmHeader>
    </Segment>
  );
}

export default Header;
