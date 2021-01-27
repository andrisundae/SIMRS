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
import ScreeningGiziAnakLabel from './Label';

export default function Add() {
  const history = useHistory();
  const formLabel = ScreeningGiziAnakLabel.formLabel;

  const initalState = {};
  formLabel.map((v) => {
    initalState[v.key] = 'total' === v.key ? 0 : '';
  });

  const [dataForm, setDataForm] = useState(initalState);

  function handleChange(key, value = '') {
    let tempValue = '' !== value ? JSON.parse(value) : '';
    setDataForm((prevState) => ({
      ...prevState,
      [key]: tempValue,
      total: (() => {
        if (prevState[key] === '') {
          return (
            parseInt(prevState.total, 10) +
            ('' === tempValue ? 0 : parseInt(tempValue.value, 10))
          );
        } else {
          return (
            parseInt(prevState.total, 10) -
            parseInt(prevState[key].value, 10) +
            ('' === tempValue ? 0 : parseInt(tempValue.value, 10))
          );
        }
      })(),
    }));
  }

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
    let data = _.filter(ScreeningGiziAnakLabel[type], 'default');
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
    return ScreeningGiziAnakLabel[type].map((data) => {
      return {
        key: data.key,
        text: renderCustomOption(data.text, data.value),
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
        {ScreeningGiziAnakLabel.headerLabel}
        <label className="mx-2">&bull;</label>
        {ScreeningGiziAnakLabel.descriptionLabel}
      </Modal.Header>
      <Modal.Content scrolling>
        <Grid>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold mt-2">
                Tanggal Pemeriksaan
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
              <label className="block font-bold mt-2">
                {formLabel[0].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('berat')}
                  defaultValue={getDefaultOptionValue('berat')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[0].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold mt-2">
                {formLabel[1].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('kurus')}
                  defaultValue={getDefaultOptionValue('kurus')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[1].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold mt-2">
                {formLabel[2].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('kondisi')}
                  defaultValue={getDefaultOptionValue('kondisi')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[2].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width="5">
              <label className="block font-bold mt-2">
                {formLabel[3].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('penyakit')}
                  defaultValue={getDefaultOptionValue('penyakit')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[3].key, value)
                  }
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
