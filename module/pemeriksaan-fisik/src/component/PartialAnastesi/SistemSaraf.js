import React from 'react';
import { Input, Label, Grid, Checkbox } from 'semantic-ui-react';

import CheckboxOptions from '../CheckboxOptions';

export default function SistemSaraf() {
  return (
    <Grid>
      <Grid.Row columns="equal">
        <Grid.Column width="4">
          <label className="block font-bold">Neuroskeletal</label>
        </Grid.Column>
        <Grid.Column>
          {CheckboxOptions.sistem_saraf.anastesi.neuroskeletal.map((data) => {
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
