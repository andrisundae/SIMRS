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
  Table,
} from 'semantic-ui-react';
import _ from 'lodash';
import ScreeningNyeriAnakLabel from './Label';

export default function Add() {
  const history = useHistory();
  const formLabel = ScreeningNyeriAnakLabel.formLabel;

  const initalState = {};
  formLabel.map((v) => {
    let dataDefault = _.filter(ScreeningNyeriAnakLabel[v.default], 'default');
    initalState[v.key] =
      'total' === v.key
        ? 0
        : dataDefault.length > 0
        ? {
            label: dataDefault[0].text,
            value: dataDefault[0].value,
          }
        : '';
  });

  const [dataForm, setDataForm] = useState(initalState);
  const [isFarmakologi, setIsFarmakologi] = useState(false);
  const [isModalObatOpen, setIsModalObatOpen] = useState(false);

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
    let data = _.filter(ScreeningNyeriAnakLabel[type], 'default');
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
    return ScreeningNyeriAnakLabel[type].map((data) => {
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
        {ScreeningNyeriAnakLabel.headerLabel}
        <label className="mx-2">&bull;</label>
        {ScreeningNyeriAnakLabel.descriptionLabel}
      </Modal.Header>
      <Modal.Content scrolling>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <div className="block">Lakukan pengkajian nyeri pada saat:</div>
              <div className="block mt-3 ml-5">
                <List as="ol">
                  <List.Item as="li">15 menit setelah injeksi</List.Item>
                  <List.Item as="li">1 jam setelah obat oral/lainnya</List.Item>
                  <List.Item as="li">1x / shift bila skor nyeri 1-3</List.Item>
                  <List.Item as="li">
                    Setiap 3 jam bila skor nyeri 4-6
                  </List.Item>
                  <List.Item as="li">
                    Setiap 1 jam bila skor nyeri 7-10
                  </List.Item>
                  <List.Item as="li">Dihentikan bila skor nyeri 0</List.Item>
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
                  options={renderOptionData('wajah')}
                  defaultValue={getDefaultOptionValue('wajah')}
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
                  options={renderOptionData('kaki')}
                  defaultValue={getDefaultOptionValue('kaki')}
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
                  options={renderOptionData('aktivitas')}
                  defaultValue={getDefaultOptionValue('aktivitas')}
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
                  options={renderOptionData('menangis')}
                  defaultValue={getDefaultOptionValue('menangis')}
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
                  options={renderOptionData('suara')}
                  defaultValue={getDefaultOptionValue('suara')}
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
                <Input fluid placeholder="Isikan lokasi luka jika ada" />
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
              {ScreeningNyeriAnakLabel.intervensi.map((value) => {
                return (
                  <label
                    key={value.key}
                    className={'block ' + (value.key === 0 ? '' : 'mt-3')}
                  >
                    <Checkbox
                      label={value.label}
                      value={value.label}
                      onChange={(e, data) => {
                        if ('Farmakologi' === value.label) {
                          setIsFarmakologi(data.checked);
                        }
                      }}
                    />
                  </label>
                );
              })}
              {isFarmakologi && (
                <Table celled striped compact>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Nama Obat</Table.HeaderCell>
                      <Table.HeaderCell>Rute</Table.HeaderCell>
                      <Table.HeaderCell className="text-center w-16">
                        <Icon
                          link
                          name="plus"
                          onClick={() => setIsModalObatOpen(!isModalObatOpen)}
                        />
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell colSpan={3} className="text-center font-bold">
                        Tidak ada data
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              )}
              <label className="block mt-3">
                <textarea
                  className="w-full p-3 border border-gray-300"
                  rows="3"
                  placeholder="Isikan Intervensi lain, jika ada"
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

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        size="large"
        open={isModalObatOpen}
        onClose={() => setIsModalObatOpen(!isModalObatOpen)}
      >
        <Modal.Header className="text-xl">
          <Icon name="list ul" className="mr-4" /> Pilih Obat
        </Modal.Header>
        <Modal.Content scrolling></Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setIsModalObatOpen(!isModalObatOpen)}>
            <Icon name="times" />
            Tutup
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}
