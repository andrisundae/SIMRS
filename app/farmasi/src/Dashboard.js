import React, { Fragment } from 'react';
import { Segment, Icon, Header } from 'semantic-ui-react';

function Dashboard() {
  return (
    <Fragment>
      <Segment secondary>
        <Header as="h4">
          <Icon name="dashboard" />
          Dashboard
        </Header>
      </Segment>
      <Segment textAlign="center">
        <Header as="h2">SIMRS-FARMASI</Header>
      </Segment>
    </Fragment>
  );
}

export default Dashboard;
