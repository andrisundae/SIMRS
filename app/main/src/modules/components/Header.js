import React from 'react';
import { Segment } from 'semantic-ui-react';

function Header({ title, icon, ...props }) {
  return (
    <Segment
      secondary
      className="flex items-center justify-between py-1 px-3"
      // style={{ paddingTop: 8, paddingBottom: 0 }}
      {...props}
    >
      <div className="flex flex-row items-center">
        {/* <Icon name={icon} className="mb-1.5" /> */}
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
    </Segment>
  );
}

export default Header;
