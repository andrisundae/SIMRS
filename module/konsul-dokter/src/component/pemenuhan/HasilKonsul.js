import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import className from 'classname';
import {
  Icon,
  Button,
  Modal,
  Form,
  TextArea,
  Table,
  Grid,
  Segment,
  Divider,
  Input,
} from 'semantic-ui-react';
import _ from 'lodash';
import LembarKonsultasi from './LembarKonsultasi';
import LembarPermintaan from './LembarPermintaan';
import LembarHasil from './LembarHasil';

export default function HasilKonsul() {
  const history = useHistory();

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="file alternate outline" className="mr-4" />
        Hasil Konsul
      </Modal.Header>
      <Modal.Content scrolling>
        <div className="block ml-4 mr-4">
          <LembarKonsultasi />
        </div>
        <Segment className="mt-10 border-black">
          <LembarPermintaan />
        </Segment>
        <Segment className="mt-10 border-black">
          <LembarHasil />
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => history.goBack()}>
          <Icon name="times" />
          Tutup
        </Button>
      </Modal.Actions>
    </Fragment>
  );
}
