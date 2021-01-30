import React, { useState } from 'react';
import {
  Input,
  Select,
  Grid,
  Radio,
  Checkbox,
  Button,
} from 'semantic-ui-react';

import RadioOptions from '../RadioOptions';

export default function Jantung() {
  return (
    <Grid>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold">Gangguan</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.jantung.bayi.gangguan.map((data) => {
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
          <label className="block mt-2 font-bold">
            Frekuensi denyut jantung
          </label>
        </Grid.Column>
        <Grid.Column>
          <div className="block">
            <Input type="number" fluid labelPosition="right" label="x/menit" />
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
