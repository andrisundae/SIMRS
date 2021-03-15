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
import ScreeningDepresiGeriatriLabel from './Label';

export default function Add() {
  const history = useHistory();
  const formLabel = ScreeningDepresiGeriatriLabel.formLabel;

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
    let data = _.filter(ScreeningDepresiGeriatriLabel[type], 'default');
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
    return ScreeningDepresiGeriatriLabel[type].map((data) => {
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
        {ScreeningDepresiGeriatriLabel.headerLabel}
      </Modal.Header>
      <Modal.Content scrolling>
        <Grid>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column>
              <label className="block font-bold mt-2">
                {formLabel[0].label}
              </label>
            </Grid.Column>
            <Grid.Column width="5">
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('kehidupan')}
                  defaultValue={getDefaultOptionValue('kehidupan')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[0].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column>
              <label className="block font-bold mt-2">
                {formLabel[1].label}
              </label>
            </Grid.Column>
            <Grid.Column width="5">
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('kegiatan')}
                  defaultValue={getDefaultOptionValue('kegiatan')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[1].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column>
              <label className="block font-bold mt-2">
                {formLabel[2].label}
              </label>
            </Grid.Column>
            <Grid.Column width="5">
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('kosong')}
                  defaultValue={getDefaultOptionValue('kosong')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[2].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column>
              <label className="block font-bold mt-2">
                {formLabel[3].label}
              </label>
            </Grid.Column>
            <Grid.Column width="5">
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('bosan')}
                  defaultValue={getDefaultOptionValue('bosan')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[3].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column>
              <label className="block font-bold mt-2">
                {formLabel[4].label}
              </label>
            </Grid.Column>
            <Grid.Column width="5">
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('semangat')}
                  defaultValue={getDefaultOptionValue('semangat')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[4].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column>
              <label className="block font-bold mt-2">
                {formLabel[5].label}
              </label>
            </Grid.Column>
            <Grid.Column width="5">
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('takut')}
                  defaultValue={getDefaultOptionValue('takut')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[5].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column>
              <label className="block font-bold mt-2">
                {formLabel[6].label}
              </label>
            </Grid.Column>
            <Grid.Column width="5">
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('bahagia')}
                  defaultValue={getDefaultOptionValue('bahagia')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[6].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column>
              <label className="block font-bold mt-2">
                {formLabel[7].label}
              </label>
            </Grid.Column>
            <Grid.Column width="5">
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('tidakBerdaya')}
                  defaultValue={getDefaultOptionValue('tidakBerdaya')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[7].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column>
              <label className="block font-bold mt-2">
                {formLabel[8].label}
              </label>
            </Grid.Column>
            <Grid.Column width="5">
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('rumah')}
                  defaultValue={getDefaultOptionValue('rumah')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[8].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column>
              <label className="block font-bold mt-2">
                {formLabel[9].label}
              </label>
            </Grid.Column>
            <Grid.Column width="5">
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('masalah')}
                  defaultValue={getDefaultOptionValue('masalah')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[9].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column>
              <label className="block font-bold mt-2">
                {formLabel[10].label}
              </label>
            </Grid.Column>
            <Grid.Column width="5">
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('senang')}
                  defaultValue={getDefaultOptionValue('senang')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[10].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column>
              <label className="block font-bold mt-2">
                {formLabel[11].label}
              </label>
            </Grid.Column>
            <Grid.Column width="5">
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('perasaan')}
                  defaultValue={getDefaultOptionValue('perasaan')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[11].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column>
              <label className="block font-bold mt-2">
                {formLabel[12].label}
              </label>
            </Grid.Column>
            <Grid.Column width="5">
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('penuhSemangat')}
                  defaultValue={getDefaultOptionValue('penuhSemangat')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[12].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column>
              <label className="block font-bold mt-2">
                {formLabel[13].label}
              </label>
            </Grid.Column>
            <Grid.Column width="5">
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('harapan')}
                  defaultValue={getDefaultOptionValue('harapan')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[13].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <label className="block font-bold mt-2">
                {formLabel[14].label}
              </label>
            </Grid.Column>
            <Grid.Column width="5">
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('keadaan')}
                  defaultValue={getDefaultOptionValue('keadaan')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[14].key, value)
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
