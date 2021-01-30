import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Divider, Tab, Button } from 'semantic-ui-react';

import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import ChartData from './ChartData';
import TableData from './TableData';

export default function Index() {
  return (
    <Fragment>
      <FooterActionsContainer>
        <div className="m-1">
          <Button as={Link} color="blue" to="/add" size="small">
            <Icon name="plus" />
            Tambah
          </Button>
        </div>
      </FooterActionsContainer>

      <Header className="mt-0">
        <Icon name="chart line" className="text-lg -mt-4" />
        Pemeriksaan Umum
      </Header>
      <Divider />
      <Tab
        panes={[
          {
            menuItem: { key: 'table-data', icon: 'table', content: 'Data' },
            render: () => (
              <Tab.Pane>
                <TableData />
              </Tab.Pane>
            ),
          },
          {
            menuItem: {
              key: 'chart-data',
              icon: 'chart line',
              content: 'Grafik',
            },
            render: () => (
              <Tab.Pane>
                <ChartData />
              </Tab.Pane>
            ),
          },
        ]}
      />
    </Fragment>
  );
}
