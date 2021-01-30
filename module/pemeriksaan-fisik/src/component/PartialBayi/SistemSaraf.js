import React from 'react';
import { Input, Label, Grid, Radio } from 'semantic-ui-react';

import RadioOptions from '../RadioOptions';

export default function SistemSaraf() {
  return (
    <Grid>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold">Sensorik</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.sistem_saraf.bayi.sensorik.map((data) => {
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
      <Grid.Row columns="equal">
        <Grid.Column width="4">
          <label className="block font-bold">Motorik</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.sistem_saraf.bayi.motorik.map((data) => {
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
