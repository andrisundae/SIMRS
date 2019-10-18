import React from 'react';

import { Segment } from 'semantic-ui-react';

function Content(props) {
    return (
        <Segment.Group style={{ height: 615, backgroundColor: '#fff', overflow: 'auto', maxHeight: 618, marginTop: 38, paddingLeft: 0, paddingRight: 0, border: 'none', paddingBottom: 8 }}>
            {props.children}
        </Segment.Group>
    );
}

export default Content;
