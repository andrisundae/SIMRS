import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import className from 'classname';
import {
  Icon,
  Form,
  Button,
  Modal,
  Table,
  Message,
  Input,
  Grid,
  Segment,
  Checkbox,
  Select,
} from 'semantic-ui-react';
import _ from 'lodash';

export default function Add() {
  const history = useHistory();

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon.Group className="mr-2">
          <Icon name="file" />
          <Icon corner="bottom right" name="plus" />
        </Icon.Group>
        Dokumen
      </Modal.Header>
      <Modal.Content scrolling>
        <Grid className="block sticky -top-4 z-10 bg-white shadow-md">
          <Grid.Row className="py-2">
            <Grid.Column>
              <Segment compact className="p-2.5">
                <Checkbox label="Tampilkan Dokumen Khusus" />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pt-1">
            <Grid.Column>
              <Select fluid options={[]} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className="h-96"></div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => history.goBack()}>
          <Icon name="undo" />
          Batal
        </Button>
        <Button color="green" onClick={() => {}}>
          <Icon name="save" />
          Simpan
        </Button>
      </Modal.Actions>
    </Fragment>
  );
}
