import React, { useState } from 'react';
import {
  Input,
  Select,
  Grid,
  Radio,
  Checkbox,
  Button,
} from 'semantic-ui-react';

import CheckboxOptions from '../CheckboxOptions';

export default function Paru() {
  return (
    <Grid>
      <Grid.Row columns="equal">
        <Grid.Column width="4">
          <label className="block font-bold">Respiratory</label>
        </Grid.Column>
        <Grid.Column>
          {CheckboxOptions.paru.anastesi.respiratory.map((data) => {
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
