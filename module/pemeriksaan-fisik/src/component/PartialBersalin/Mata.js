import React, { useState } from 'react';
import { Input, Label, Grid, Radio } from 'semantic-ui-react';

import RadioOptions from '../RadioOptions';

export default function Mata() {
  const [pupil, setPupil] = useState('');

  return (
    <Grid>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold">Pupil</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.mata.bersalin.pupil.map((data) => {
            return (
              <label
                key={data.key}
                className={'block ' + (data.key === 0 ? '' : 'mt-3')}
              >
                <Radio
                  label={data.text}
                  value={data.value}
                  checked={pupil === data.value}
                  onChange={(e, { value }) => setPupil(value)}
                />
              </label>
            );
          })}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold">
            Diameter Pupil kanan / kiri
          </label>
        </Grid.Column>
        <Grid.Column>
          <Input type="number" labelPosition="right" label="mm" />
          <span className="inline-block ml-3 mr-3">/</span>
          <Input type="number" labelPosition="right" label="mm" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
