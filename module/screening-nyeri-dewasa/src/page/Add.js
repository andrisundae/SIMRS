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
import ScreeningNyeriDewasaLabel from './Label';

export default function Add() {
  const history = useHistory();
  const formLabel = ScreeningNyeriDewasaLabel.formLabel;

  const initalState = {};
  formLabel.map((v) => {
    initalState[v.key] = '';
  });

  const [dataForm, setDataForm] = useState(initalState);
  const [isFarmakologi, setIsFarmakologi] = useState(false);
  const [isModalObatOpen, setIsModalObatOpen] = useState(false);

  function handleChange(key, value = '') {
    let tempValue = '' !== value ? JSON.parse(value) : '';
    setDataForm((prevState) => ({
      ...prevState,
      [key]: tempValue,
    }));
  }

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="plus" className="mr-4" />
        {ScreeningNyeriDewasaLabel.headerLabel}
        <label className="mx-2">&bull;</label>
        {ScreeningNyeriDewasaLabel.descriptionLabel}
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
              <label className="block font-bold">{formLabel[0].label}</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                {ScreeningNyeriDewasaLabel.skala.map((data, index) => {
                  return (
                    <Radio
                      key={index}
                      className="mr-14"
                      label={data.text}
                      value={data.value}
                      onChange={(e, data) =>
                        handleChange(formLabel[0].key, data)
                      }
                    />
                  );
                })}
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0 mt-2">
            <Grid.Column width="5">
              <label className="block font-bold">{formLabel[1].label}</label>
            </Grid.Column>
            <Grid.Column>
              {ScreeningNyeriDewasaLabel.penyebabNyeri.map((data, index) => {
                return (
                  <label
                    key={index}
                    className={className('block', {
                      'mt-3': index > 0,
                    })}
                  >
                    <Radio
                      className="mr-14"
                      label={data.text === 'lainnya' ? '' : data.text}
                      value={data.value === 'lainnya' ? '' : data.value}
                      onChange={(e, data) =>
                        handleChange(formLabel[0].key, data)
                      }
                    />
                    {data.text === 'lainnya' && (
                      <Input
                        className="-ml-14 w-3/4"
                        placeholder="Lainnya isikan disini, jika ada"
                      />
                    )}
                  </label>
                );
              })}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0 mt-2">
            <Grid.Column width="5">
              <label className="block font-bold mt-2">
                {formLabel[2].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              {ScreeningNyeriDewasaLabel.kualitasNyeri.map((data, index) => {
                return (
                  <label
                    key={index}
                    className={className('block', {
                      'mt-3': index > 0,
                    })}
                  >
                    <Radio
                      className="mr-14"
                      label={data.text === 'lainnya' ? '' : data.text}
                      value={data.value === 'lainnya' ? '' : data.value}
                      onChange={(e, data) =>
                        handleChange(formLabel[0].key, data)
                      }
                    />
                    {data.text === 'lainnya' && (
                      <Input
                        className="-ml-14 w-3/4"
                        placeholder="Lainnya isikan disini, jika ada"
                      />
                    )}
                  </label>
                );
              })}
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
                <Input fluid />
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
                <Input fluid />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold">{formLabel[5].label}</label>
            </Grid.Column>
            <Grid.Column>
              {ScreeningNyeriDewasaLabel.frekuensiNyeri.map((data, index) => {
                return (
                  <label
                    key={index}
                    className={className('block', {
                      'mt-3': index > 0,
                    })}
                  >
                    <Radio
                      className="mr-14"
                      label={data.text === 'lainnya' ? '' : data.text}
                      value={data.value === 'lainnya' ? '' : data.value}
                      onChange={(e, data) =>
                        handleChange(formLabel[0].key, data)
                      }
                    />
                    {data.text === 'lainnya' && (
                      <Input
                        className="-ml-14 w-3/4"
                        placeholder="Lainnya isikan disini, jika ada"
                      />
                    )}
                  </label>
                );
              })}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold mt-2">
                {formLabel[6].label}
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
              <label className="block font-bold">{formLabel[7].label}</label>
            </Grid.Column>
            <Grid.Column>
              {ScreeningNyeriDewasaLabel.intervensi.map((value) => {
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
