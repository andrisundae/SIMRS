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
import ScreeningIntervensiGiziLabel from './Label';

export default function Add() {
  const history = useHistory();
  const formLabel = ScreeningIntervensiGiziLabel.formLabel;

  function renderCustomOption(label, nilai) {
    return (
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column width="3" verticalAlign="middle">
            {nilai}
          </Grid.Column>
          <Grid.Column verticalAlign="middle">{label}</Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  function renderChekboxList(type) {
    return ScreeningIntervensiGiziLabel[type].map((data) => {
      return (
        <label
          key={data.key}
          className={className('block', {
            'mt-3': data.key > 0,
          })}
        >
          <Checkbox label={data.text} value={data.value} />
        </label>
      );
    });
  }

  function renderOptionData(type) {
    return ScreeningIntervensiGiziLabel[type].map((data) => {
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
        {ScreeningIntervensiGiziLabel.headerLabel}
        <label className="mx-2">&bull;</label>
        {ScreeningIntervensiGiziLabel.descriptionLabel}
      </Modal.Header>
      <Modal.Content scrolling>
        <Grid>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="2">
              <label className="block font-bold mt-2">Jenis Kelamin</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">P</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="2">
              <label className="block font-bold mt-2">Umur</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">50 tahun, 1 bulan</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[0].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label={formLabel[0].satuan}
                />
              </label>
            </Grid.Column>
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[1].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label={formLabel[1].satuan}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[2].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label={formLabel[2].satuan}
                />
              </label>
            </Grid.Column>
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[3].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label={formLabel[3].satuan}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="2">
              <label className="block font-bold mt-2"></label>
            </Grid.Column>
            <Grid.Column>
              <label className="block"></label>
            </Grid.Column>
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[4].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label={formLabel[4].satuan}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[5].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label={formLabel[5].inputSatuan}
                />
              </label>
            </Grid.Column>
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[7].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label={formLabel[7].satuan}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[6].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label={formLabel[6].satuan}
                />
              </label>
            </Grid.Column>
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[8].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label={formLabel[8].satuan}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[10].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label={formLabel[10].inputSatuan}
                />
              </label>
            </Grid.Column>
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[9].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input type="number" fluid />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[12].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  options={ScreeningIntervensiGiziLabel.statusGizi}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[14].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select clearable fluid options={renderOptionData('FA')} />
              </label>
            </Grid.Column>
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[11].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label={formLabel[11].inputSatuan}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[15].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select clearable fluid options={renderOptionData('FS')} />
              </label>
            </Grid.Column>
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[13].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label={formLabel[13].inputSatuan}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[16].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input type="number" labelPosition="right" label="%" />
                <Input
                  className="ml-5"
                  type="number"
                  labelPosition="right"
                  label="gram"
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[17].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input type="number" labelPosition="right" label="%" />
                <Input
                  className="ml-5"
                  type="number"
                  labelPosition="right"
                  label="gram"
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[18].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input type="number" labelPosition="right" label="%" />
                <Input
                  className="ml-5"
                  type="number"
                  labelPosition="right"
                  label="gram"
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width="2">
              <label className="block font-bold">{formLabel[19].label}</label>
            </Grid.Column>
            <Grid.Column>{renderChekboxList('diet')}</Grid.Column>
            <Grid.Column width="2">
              <label className="block font-bold mt-2">
                {formLabel[20].label}
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={ScreeningIntervensiGiziLabel.bentukMakanan}
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
