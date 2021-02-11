import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import className from 'classname';
import {
  Icon,
  Form,
  Button,
  Modal,
  Header,
  Segment,
  Grid,
  Checkbox,
  Radio,
  Input,
  Label,
  Select,
  List,
} from 'semantic-ui-react';
import _ from 'lodash';
import ScreeningApgarScoreLabel from './Label';

export default function UbahKelahiran() {
  const history = useHistory();
  const formLabel = ScreeningApgarScoreLabel.formLabel;

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="plus" className="mr-4" />
        {ScreeningApgarScoreLabel.headerLabel}
        <label className="mx-2">&bull;</label>
        Tambah / Ubah Data Kelahiran
      </Modal.Header>
      <Modal.Content scrolling>
        <Grid>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold mt-2">
                {formLabel.kelahiran[0].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold">
                {formLabel.kelahiran[1].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              {ScreeningApgarScoreLabel.dataKelahiran.kelahiran.map(
                (data, index) => {
                  return (
                    <label
                      key={index}
                      className={className('block', {
                        'mt-3': index > 0,
                      })}
                    >
                      <Radio label={data.text} value={data.value} />
                    </label>
                  );
                }
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="mt-2">
            <Grid.Column width="5">
              <label className="block font-bold">
                {formLabel.kelahiran[2].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              {ScreeningApgarScoreLabel.dataKelahiran.keadaan.map(
                (data, index) => {
                  return (
                    <label
                      key={index}
                      className={className('block', {
                        'mt-3': index > 0,
                      })}
                    >
                      <Radio label={data.text} value={data.value} />
                    </label>
                  );
                }
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
