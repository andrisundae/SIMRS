import React from 'react';
import _ from 'lodash';
import { Icon } from 'semantic-ui-react';

function Header({ title, icon, ...props }) {
  return (
    <div
      className="flex items-center justify-between px-3 bg-secondary h-[30px] top-[40px] border-y border-gray-200"
      // style={{ paddingTop: 8, paddingBottom: 0 }}
      {...props}
    >
      <div className="flex flex-row items-center space-x-2">
        {!_.isEmpty(icon) && <Icon name={icon} className="mb-1.5" />}
        <h3 className="text-lg font-bold tracking-wide">{title}</h3>
      </div>
    </div>
  );
}

export default Header;
