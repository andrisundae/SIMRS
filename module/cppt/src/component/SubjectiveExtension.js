import React, { Fragment, useState } from 'react';
import className from 'classname';
import { Icon, Form, Button, Modal, Tab, Menu } from 'semantic-ui-react';
import Anamnesis from './SubjectiveExtension/Anamnesis';

export default function SubjectiveExtension() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Tab
      menu={{
        attached: true,
        className: 'sticky z-10 top-0 p-1 pb-0 bg-gray-200',
      }}
      panes={[
        {
          menuItem: {
            key: 'anamnesis',
            content: 'Anamnesis',
            className: className('', {
              'bg-blue-600': activeIndex === 0,
              'text-white': activeIndex === 0,
            }),
            onClick: () => setActiveIndex(0),
          },
          render: () => (
            <Tab.Pane>
              <Anamnesis />
            </Tab.Pane>
          ),
        },
      ]}
    />
  );
}
