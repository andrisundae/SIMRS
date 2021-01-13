import React, { Fragment, useState } from 'react';
import { Input, Grid, Checkbox, Label } from 'semantic-ui-react';

import CheckboxOptions from '../CheckboxOptions';

export default function TulangBelakang() {
  return (
    <Grid>
      <Grid.Row columns="equal">
        <Grid.Column width="4">
          <label className="block font-bold">Kelainan</label>
        </Grid.Column>
        <Grid.Column>
          {CheckboxOptions.tulang_belakang.bersalin.kelainan.map((data) => {
            return (
              <label
                key={data.key}
                className={'block ' + (data.key === 0 ? '' : 'mt-3')}
              >
                <Checkbox label={data.text} value={data.value} />
              </label>
            );
          })}
          <label className="block mt-3">
            <Input fluid placeholder="Lainnya, jika ada" />
          </label>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
