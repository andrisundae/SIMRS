import React, { Fragment, useState } from 'react';
import { Input, Select, Grid, Radio, Checkbox, Label } from 'semantic-ui-react';

import CheckboxOptions from '../CheckboxOptions';

export default function Abdomen() {
  return (
    <Grid>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold">Hepato/Gastrointestinal</label>
        </Grid.Column>
        <Grid.Column>
          {CheckboxOptions.abdomen.anastesi.hepato.map((data) => {
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
      <Grid.Row className="pb-0">
        <Grid.Column>
          <label className="block font-bold">Puasa</label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold mt-2 ml-8">
            Makan terakhir, pukul
          </label>
        </Grid.Column>
        <Grid.Column>
          <div className="block">
            <Input placeholder="hh:mm" />
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold mt-2 ml-8">
            Minum terakhir, pukul
          </label>
        </Grid.Column>
        <Grid.Column>
          <div className="block">
            <Input placeholder="hh:mm" />
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column width="4">
          <label className="block font-bold">Lainnya</label>
        </Grid.Column>
        <Grid.Column>
          {CheckboxOptions.abdomen.anastesi.lainnya.map((data) => {
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
    </Grid>
  );
}
