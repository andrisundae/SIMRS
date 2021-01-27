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
import ScreeningJatuhDewasaLabel from './Label';

export default function Add() {
  const history = useHistory();
  const formLabel = ScreeningJatuhDewasaLabel.formLabel;

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

  function renderOptionData(type) {
    return ScreeningJatuhDewasaLabel[type].map((data) => {
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
      dataForm.total < 25
        ? null
        : dataForm.total > 24 && dataForm.total < 51
        ? ScreeningJatuhDewasaLabel.intervensi['between25and50']
        : ScreeningJatuhDewasaLabel.intervensi['above50'];

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
        {ScreeningJatuhDewasaLabel.headerLabel}
        <label className="mx-2">&bull;</label>
        {ScreeningJatuhDewasaLabel.descriptionLabel}
      </Modal.Header>
      <Modal.Content scrolling>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <div className="block">
                Lakukan pengkajian risiko jatuh pada saat:
              </div>
              <div className="block mt-3 ml-5">
                <List as="ol">
                  <List.Item as="li">
                    Pasien baru (termasuk pasien pindahan dari ruangan lain)
                  </List.Item>
                  <List.Item as="li">
                    Terdapat perubahan kondisi pasien
                  </List.Item>
                  <List.Item as="li">
                    Mendapat terapi obat yang bisa mengakibatkan efek jatuh
                  </List.Item>
                  <List.Item as="li">
                    Sesaat setelah terjadi kasus jatuh
                  </List.Item>
                  <List.Item as="li">
                    Untuk risiko tinggi dilakukan setiap shift
                  </List.Item>
                  <List.Item as="li">
                    Untuk risiko rendah dilakukan setiap 24 jam
                  </List.Item>
                </List>
              </div>
            </Grid.Column>
          </Grid.Row>
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
                  options={renderOptionData('riwayatJatuh')}
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
                  options={renderOptionData('diagnosisMedis')}
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
                  options={renderOptionData('alatBantuJalan')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[2].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
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
                  options={renderOptionData('terapiHeparin')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[3].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold mt-2">
                {formLabel[4].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('caraBerjalan')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[4].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold mt-2">
                {formLabel[5].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={renderOptionData('statusMental')}
                  onChange={(e, { value }) =>
                    handleChange(formLabel[5].key, value)
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width="5">
              <label className="block font-bold mt-2">
                {formLabel[8].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              {renderIntervensiList()}
              <label
                className={className('block', {
                  'mt-3': dataForm.total > 24,
                })}
              >
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
