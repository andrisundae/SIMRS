import React, { Fragment, useEffect, useRef } from 'react';
import {
  Grid,
  Form,
  Input,
  Segment,
  Button,
  Icon,
  Header,
} from 'semantic-ui-react';

import ItemPemesanan from './ItemPemesanan';
import HistoryPenerimaan from './HistoryPenerimaan';
import ItemPenerimaan from './ItemPenerimaan';

const Body = (props) => {
  let { trans, resource } = props;

  return (
    <Fragment>
      <Grid columns="2">
        <Grid.Row>
          <Grid.Column>
            <Grid.Row style={{ marginTop: 8 }}>
              <Grid.Column>
                <Header style={{ marginBottom: 0, fontSize: 14 }}>
                  {trans('header.detail_item_pemesanan')}
                </Header>
                <Segment style={{ marginTop: 0 }}>
                  <ItemPemesanan trans={trans} resource={resource} />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row style={{ marginTop: 8 }}>
              <Grid.Column>
                <Header style={{ marginBottom: 0, fontSize: 14 }}>
                  {trans('header.history_penerimaan')}
                </Header>
                <Segment style={{ marginTop: 0 }}>
                  <HistoryPenerimaan trans={trans} resource={resource} />
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header style={{ marginBottom: 0, fontSize: 14 }}>
                  {trans('header.detail_penerimaan')}
                </Header>
                <Segment style={{ marginTop: 0 }}>
                  <ItemPenerimaan trans={trans} resource={resource} />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default Body;
