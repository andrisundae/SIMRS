import React, { Fragment, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { Segment, Header, Grid, Menu, Button, Icon } from 'semantic-ui-react';

import {
  FooterActionsContainer,
  EditButton,
  DeleteButton,
  SaveButton,
  CancelButton,
  confirmation,
  withAppConsumer,
} from '@simrs/components';

import DetailHeader from './containers/Header';
import DetailBody from './containers/Body';

const Main = (props) => {
  let history = useHistory();
  let { id } = useParams();

  return (
    <Fragment>
      <Segment secondary className="content-header">
        <Header as="h4">
          <Icon name={'bars'} />
          {props.trans('title.detail')}
        </Header>
      </Segment>
      <Segment>
        <Grid className="content-grid">
          <Grid.Row>
            <Grid.Column>
              <Segment padded>
                <DetailHeader trans={props.trans} resource={props.resource} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <DetailBody trans={props.trans} resource={props.resource} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <FooterActionsContainer>
        <Fragment>
          <Menu.Item style={{ paddingLeft: 16, paddingRight: 5 }}>
            <Button
              name="Kembali"
              color="blue"
              size="mini"
              onClick={history.goBack}
            >
              <Icon name="undo" />
              {props.trans('label.btn.kembali')}
            </Button>
          </Menu.Item>
        </Fragment>
      </FooterActionsContainer>
    </Fragment>
  );
};

export default Main;
