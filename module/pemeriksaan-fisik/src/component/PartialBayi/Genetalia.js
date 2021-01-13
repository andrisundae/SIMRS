import React, { Fragment, useState } from 'react';
import { Input, Select, Grid, Radio, Checkbox, Label } from 'semantic-ui-react';

import RadioOptions from '../RadioOptions';
import CheckboxOptions from '../CheckboxOptions';

export default function Genetalia() {
  return (
    <Grid>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold">Kelainan</label>
        </Grid.Column>
        <Grid.Column>
          {CheckboxOptions.genetalia.bayi.kelainan.map((data) => {
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
          <label className="block font-bold">Anus</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.genetalia.bayi.anus.map((data) => {
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
      <Grid.Row columns="equal" className="mt-2">
        <Grid.Column width="4">
          <label className="block font-bold">Mekonium</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.genetalia.bayi.mekonium.map((data) => {
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
