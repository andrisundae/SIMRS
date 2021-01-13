import React, { Fragment, useState } from 'react';
import { Input, Select, Grid, Radio, Checkbox, Label } from 'semantic-ui-react';

import DropdownOptions from '../DropdownOptions';
import RadioOptions from '../RadioOptions';
import CheckboxOptions from '../CheckboxOptions';

export default function Genetalia() {
  return (
    <Grid>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold">Vagina vulva</label>
        </Grid.Column>
        <Grid.Column>
          {CheckboxOptions.genetalia.bersalin.vagina_vulva.map((data) => {
            return (
              <label
                key={data.key}
                className={'block ' + (data.key === 0 ? '' : 'mt-3')}
              >
                <Checkbox label={data.text} value={data.value} />
              </label>
            );
          })}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0 mt-2">
        <Grid.Column width="4">
          <label className="block font-bold">Varises Vagina</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.genetalia.bersalin.varises_vagina.map((data) => {
            return (
              <label
                key={data.key}
                className={'block ' + (data.key === 0 ? '' : 'mt-3')}
              >
                <Radio label={data.text} value={data.value} />
              </label>
            );
          })}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold mt-2">Pembukaan serviks</label>
        </Grid.Column>
        <Grid.Column>
          <label className="block">
            <Input type="number" fluid labelPosition="right" label="cm" />
          </label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold">Portio</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.genetalia.bersalin.portio.map((data) => {
            return (
              <label
                key={data.key}
                className={'block ' + (data.key === 0 ? '' : 'mt-3')}
              >
                <Radio label={data.text} value={data.value} />
              </label>
            );
          })}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0 mt-2">
        <Grid.Column width="4">
          <label className="block font-bold">Arah portio</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.genetalia.bersalin.arah_portio.map((data) => {
            return (
              <label
                key={data.key}
                className={'block ' + (data.key === 0 ? '' : 'mt-3')}
              >
                <Radio label={data.text} value={data.value} />
              </label>
            );
          })}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0 mt-2">
        <Grid.Column width="4">
          <label className="block font-bold">Presentasi</label>
        </Grid.Column>
        <Grid.Column>
          {CheckboxOptions.genetalia.bersalin.presentasi.map((data) => {
            return (
              <label
                key={data.key}
                className={'block ' + (data.key === 0 ? '' : 'mt-3')}
              >
                <Checkbox label={data.text} value={data.value} />
              </label>
            );
          })}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold mt-2">
            Penurunan bagian terendah
          </label>
        </Grid.Column>
        <Grid.Column>
          <div className="block">
            <Select
              clearable
              fluid
              options={
                DropdownOptions.genetalia.bersalin.penurunan_bagian_terendah
              }
            />
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column width="4">
          <label className="block font-bold">Ketuban</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.genetalia.bersalin.ketuban.map((data) => {
            return (
              <label
                key={data.key}
                className={'block ' + (data.key === 0 ? '' : 'mt-3')}
              >
                <Radio label={data.text} value={data.value} />
              </label>
            );
          })}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
