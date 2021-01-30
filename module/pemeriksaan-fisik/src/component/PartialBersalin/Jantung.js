import React from 'react';
import { Input, Select, Grid, Radio, Checkbox } from 'semantic-ui-react';

import DropdownOptions from '../DropdownOptions';
import RadioOptions from '../RadioOptions';
import CheckboxOptions from '../CheckboxOptions';

export default function Jantung() {
  return (
    <Grid>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold">Akral</label>
        </Grid.Column>
        <Grid.Column>
          <Select
            clearable
            fluid
            options={DropdownOptions.jantung.bersalin.akral}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold">Warna Kulit</label>
        </Grid.Column>
        <Grid.Column>
          <Select
            clearable
            fluid
            options={DropdownOptions.jantung.bersalin.warna_kulit}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold">CRT</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.jantung.bersalin.crt.map((data) => {
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
          <label className="block font-bold">Edema</label>
        </Grid.Column>
        <Grid.Column>
          {CheckboxOptions.jantung.bersalin.edema.map((data) => {
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
