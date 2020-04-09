import React from 'react';

import { Segment } from 'semantic-ui-react';

function Content(props) {
  return (
    <Segment.Group
      style={{ marginTop: 38, borderRadius: 'none', marginBottom: 30 }}
    >
      {props.children}
    </Segment.Group>
    // <Sidebar.Pushable as={Segment.Group} raised style={{marginTop: 38}}>
    //     <Sidebar
    //         as={Menu}
    //         animation='overlay'
    //         icon='labeled'
    //         inverted
    //         vertical
    //         // visible
    //         width={90}
    //     >
    //         <Menu.Item as='a'>
    //             <Icon name='file' />
    //             Kunjungan
    //         </Menu.Item>
    //     </Sidebar>
    //     {props.children}

    //     <Sidebar.Pusher>
    //         <Segment.Group style={{ marginTop: 28, borderRadius: "none", marginBottom: 30 }}>
    //             {props.children}
    //         </Segment.Group>
    //         {props.children}
    //     </Sidebar.Pusher>
    // </Sidebar.Pushable>
  );
}

export default Content;
