import React, { Fragment, useState } from 'react';
import { Input, Select, Grid, Radio, Checkbox, Label } from 'semantic-ui-react';

import DropdownOptions from '../DropdownOptions';

export default function Kepala() {
  return (
    <Grid>
      <Grid.Row columns="equal">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold">Kelainan</label>
        </Grid.Column>
        <Grid.Column>
          <label className="block">
            <Select
              clearable
              fluid
              options={DropdownOptions.kepala.bayi.kelainan}
            />
          </label>
          <label className="block mt-1">
            <Input fluid placeholder="Lainnya, jika ada" />
          </label>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
