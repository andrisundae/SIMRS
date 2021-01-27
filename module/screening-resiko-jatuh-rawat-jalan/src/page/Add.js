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
import ScreeningJatuhRawatJalanLabel from './Label';

export default function Add() {
  const history = useHistory();
  const formLabel = ScreeningJatuhRawatJalanLabel.formLabel;

  const initalState = {};
  formLabel.map((v) => {
    if ('saat_berjalan' === v.key) {
      initalState[v.key] = 0;
      v.children.map((v2) => {
        let dataDefault = _.filter(
          ScreeningJatuhRawatJalanLabel[v2.default],
          'default'
        );
        initalState[v2.key] =
          dataDefault.length > 0
            ? {
                label: dataDefault[0].text,
                value: dataDefault[0].value,
              }
            : '';
      });
    } else {
      if ('saat_duduk' === v.key) {
        let dataDefault = _.filter(
          ScreeningJatuhRawatJalanLabel[v.default],
          'default'
        );
        initalState[v.key] =
          dataDefault.length > 0
            ? {
                label: dataDefault[0].text,
                value: dataDefault[0].value,
              }
            : '';
      } else {
        initalState[v.key] = 'total' === v.key ? 0 : '';
      }
    }
  });

  const [dataForm, setDataForm] = useState(initalState);

  function handleChange(key, value = '') {
    let tempValue = '' !== value ? JSON.parse(value) : '';
    setDataForm((prevState) => ({
      ...prevState,
      [key]: tempValue,
      saat_berjalan: (() => {
        if ('tidak_seimbang' === key || 'alat_bantu' === key) {
          if (prevState[key] === '') {
            return (
              parseInt(prevState.saat_berjalan, 10) +
              ('' === tempValue ? 0 : parseInt(tempValue.value, 10))
            );
          } else {
            return (
              parseInt(prevState.saat_berjalan, 10) -
              parseInt(prevState[key].value, 10) +
              ('' === tempValue ? 0 : parseInt(tempValue.value, 10))
            );
          }
        } else {
          return prevState.saat_berjalan;
        }
      })(),
      total: (() => {
        if (prevState[key] === '') {
          if ('saat_duduk' === key) {
            return (
              parseInt(prevState.total, 10) +
              ('' === tempValue ? 0 : parseInt(tempValue.value, 10))
            );
          } else {
            let totalBerjalan =
              parseInt(prevState.saat_berjalan, 10) +
                ('' === tempValue ? 0 : parseInt(tempValue.value, 10)) >
              0
                ? 1
                : 0;
            if ('' === prevState.saat_duduk) {
              return parseInt(totalBerjalan, 10);
            } else {
              let tempTotal =
                parseInt(prevState.total, 10) + parseInt(totalBerjalan, 10);
              return tempTotal > 2 ? 2 : tempTotal;
            }
          }
        } else {
          if ('saat_duduk' === key) {
            return (
              parseInt(prevState.total, 10) -
              parseInt(prevState[key].value, 10) +
              ('' === tempValue ? 0 : parseInt(tempValue.value, 10))
            );
          } else {
            let totalBerjalan =
              parseInt(prevState.saat_berjalan, 10) -
              parseInt(prevState[key].value, 10) +
              ('' === tempValue ? 0 : parseInt(tempValue.value, 10));
            if ('' === prevState.saat_duduk) {
              return parseInt(totalBerjalan, 10);
            } else {
              if (0 === prevState.saat_duduk.value) {
                return parseInt(totalBerjalan, 10) > 0 ? 1 : 0;
              } else {
                return (
                  parseInt(prevState.total, 10) - (totalBerjalan === 0 ? 1 : 0)
                );
              }
            }
          }
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
    let data = _.filter(ScreeningJatuhRawatJalanLabel[type], 'default');
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
    return ScreeningJatuhRawatJalanLabel[type].map((data) => {
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

  function renderIntervensiList() {
    let list =
      dataForm.total === 0
        ? null
        : dataForm.total === 1
        ? ScreeningJatuhRawatJalanLabel.intervensi[1]
        : ScreeningJatuhRawatJalanLabel.intervensi[2];

    if (null === list) {
      return null;
    } else {
      return list.map((value) => {
        return (
          <label
            key={value.key}
            className={'block ' + (value.key === 0 ? '' : 'mt-3')}
          >
            <Checkbox label={value.label} value={value.label} />
          </label>
        );
      });
    }
  }

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="plus" className="mr-4" />
        {ScreeningJatuhRawatJalanLabel.headerLabel}
        <label className="mx-2">&bull;</label>
        {ScreeningJatuhRawatJalanLabel.descriptionLabel}
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
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold mt-2">
                {formLabel[0].label}
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold mt-2 ml-8">
                {formLabel[0].children[0].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  fluid
                  options={renderOptionData('tidakSeimbang')}
                  defaultValue={getDefaultOptionValue('tidakSeimbang')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[0].children[0].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold mt-2 ml-8">
                {formLabel[0].children[1].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  fluid
                  options={renderOptionData('alatBantu')}
                  defaultValue={getDefaultOptionValue('alatBantu')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[0].children[1].key, value)
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
                  fluid
                  options={renderOptionData('saatDuduk')}
                  defaultValue={getDefaultOptionValue('saatDuduk')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[1].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width="5">
              <label className="block font-bold mt-2">
                {formLabel[4].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              {renderIntervensiList()}
              <label className="block mt-3">
                <textarea
                  className="w-full p-3 border border-gray-300"
                  rows="3"
                  placeholder="Isikan Intervensi"
                ></textarea>
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
