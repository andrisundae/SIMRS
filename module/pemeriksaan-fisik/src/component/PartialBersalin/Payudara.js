import React from 'react';
import { Input, Select, Grid, Radio, Checkbox } from 'semantic-ui-react';

import DropdownOptions from '../DropdownOptions';
import RadioOptions from '../RadioOptions';

export default function Payudara() {
  return (
    <Grid>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold">Pembesaran</label>
        </Grid.Column>
        <Grid.Column>
          <Select
            clearable
            fluid
            options={DropdownOptions.payudara.bersalin.pembesaran}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold">Papilla mammae</label>
        </Grid.Column>
        <Grid.Column>
          <Select
            clearable
            fluid
            options={DropdownOptions.payudara.bersalin.papilla_mammae}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column width="4">
          <label className="block font-bold">Kolostrum</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.payudara.bersalin.kolostrum.map((data) => {
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
