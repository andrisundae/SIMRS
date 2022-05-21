import React from 'react';
import { Segment, Header as HeaderSm } from 'semantic-ui-react';
import { Header } from '@simrs/main/src/modules/components';

function Dashboard() {
  return (
    <>
      <Header title="Dashboard" icon="dashboard" />
      <div>
        <Segment textAlign="center">
          <HeaderSm as="h2">SIMRS-FARMASI</HeaderSm>
        </Segment>
      </div>
    </>
  );
}

export default Dashboard;
