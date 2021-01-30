import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Icon,
  Form,
  Button,
  Modal,
  Header,
  Segment,
  Grid,
  Checkbox,
} from 'semantic-ui-react';
import _ from 'lodash';

import Umum from '../component/Umum';
import Bersalin from '../component/Bersalin';
import Anastesi from '../component/Anastesi';
import Bayi from '../component/Bayi';

export default function Add() {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="plus" className="mr-4" /> Tambah Pemeriksaan Fisik (
        {_.upperFirst(query.get('kelompok'))})
      </Modal.Header>
      <Modal.Content scrolling>
        <Form>
          <Header attached="top" block>
            Status Generalis
          </Header>
          <Segment attached>
            {'umum' === query.get('kelompok') && <Umum />}
            {'bersalin' === query.get('kelompok') && <Bersalin />}
            {'anastesi' === query.get('kelompok') && <Anastesi />}
            {'bayi' === query.get('kelompok') && <Bayi />}
          </Segment>
          <Header attached="top" block>
            Status Lokalis
          </Header>
          <Segment attached>
            <Grid>
              <Grid.Row columns="equal">
                <Grid.Column width="4">
                  <label className="block mt-2 font-bold">
                    <Checkbox label="Catatan Lain" value="" checked={true} />
                  </label>
                </Grid.Column>
                <Grid.Column>
                  <textarea
                    className="w-full p-3 border border-gray-300"
                    rows="4"
                    placeholder="Tidak diperiksa"
                  ></textarea>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => history.goBack()}>
          <Icon name="times" />
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
