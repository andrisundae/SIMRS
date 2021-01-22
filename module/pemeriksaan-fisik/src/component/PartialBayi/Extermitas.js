import React, { Fragment, useState } from 'react';
import { Input, Select, Grid, Checkbox } from 'semantic-ui-react';

import DropdownOptions from '../DropdownOptions';

export default function Extermitas() {
  return (
    <Grid>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold">Kelainan jari tangan</label>
        </Grid.Column>
        <Grid.Column>
          <label className="block">
            <Select
              clearable
              fluid
              options={DropdownOptions.extermitas.bayi.kelainan_jari_tangan}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold">Kelainan jari kaki</label>
        </Grid.Column>
        <Grid.Column>
          <label className="block">
            <Select
              clearable
              fluid
              options={DropdownOptions.extermitas.bayi.kelainan_jari_kaki}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
