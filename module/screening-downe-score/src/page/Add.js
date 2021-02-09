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
import ScreeningDowneScoreLabel from './Label';

export default function Add() {
  const history = useHistory();
  const formLabel = ScreeningDowneScoreLabel.formLabel;

  function renderCustomOption(label, nilai) {
    return (
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column width="1" verticalAlign="middle">
            {nilai}
          </Grid.Column>
          <Grid.Column verticalAlign="middle">{label}</Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  function getDefaultOptionValue(type) {
    let data = _.filter(
      ScreeningDowneScoreLabel.dataPemeriksaan[type],
      'default'
    );
    if (data.length > 0) {
      return JSON.stringify({
        label: data[0].text,
        value: data[0].value,
      });
    } else {
      return null;
    }
  }

  function renderOptionData(type) {
    return ScreeningDowneScoreLabel.dataPemeriksaan[type].map((data) => {
      let customText = data.text;
      if ('sianosis' === type) {
        let temp = data.text.split('O2');
        if (temp.length > 1) {
          customText = (
            <div>
              {temp.join('')} O<sub>2</sub>
            </div>
          );
        }
      }
      return {
        key: data.key,
        text: renderCustomOption(customText, data.value),
        value: JSON.stringify({
          label: data.text,
          value: data.value,
        }),
      };
    });
  }

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="plus" className="mr-4" />
        {ScreeningDowneScoreLabel.headerLabel}
        <label className="mx-2">&bull;</label>
        Tambah Pemeriksaan
      </Modal.Header>
      <Modal.Content scrolling>
        <Grid>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold mt-2">
                {formLabel.pemeriksaan[0].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  labelPosition="right"
                  label="detik setelah lahir"
                />
                <span className="mx-5">/</span>
                <Input
                  type="number"
                  labelPosition="right"
                  label="menit setelah lahir"
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold mt-2">
                {formLabel.pemeriksaan[1].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('retraksi')}
                  defaultValue={getDefaultOptionValue('retraksi')}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold mt-2">
                {formLabel.pemeriksaan[2].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('merintih')}
                  defaultValue={getDefaultOptionValue('merintih')}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold mt-2">
                {formLabel.pemeriksaan[3].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('frekuensiNapas')}
                  defaultValue={getDefaultOptionValue('frekuensiNapas')}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold mt-2">
                {formLabel.pemeriksaan[4].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('sianosis')}
                  defaultValue={getDefaultOptionValue('sianosis')}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width="4">
              <label className="block font-bold mt-2">
                {formLabel.pemeriksaan[5].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('suaraNapas')}
                  defaultValue={getDefaultOptionValue('suaraNapas')}
                />
              </label>
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
