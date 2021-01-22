import React, { Fragment, useState } from 'react';
import { Input, Select, Grid, Radio, Checkbox, Label } from 'semantic-ui-react';

import DropdownOptions from '../DropdownOptions';
import CheckboxOptions from '../CheckboxOptions';

export default function Genetalia() {
  const [catheter, setCatheter] = useState(false);

  return (
    <Grid>
      <Grid.Row className={catheter ? 'pb-0' : ''}>
        <Grid.Column>
          <label className="block font-bold">
            <Checkbox
              label="Catheter"
              onChange={(e, { checked }) => setCatheter(checked)}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      {catheter && (
        <Fragment>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold ml-8">Ukuran</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={DropdownOptions.genetalia.umum.catheter.ukuran}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Cairan urethra</label>
            </Grid.Column>
            <Grid.Column>
              {CheckboxOptions.genetalia.umum.cairan_urethra.map((data) => {
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
        </Fragment>
      )}
    </Grid>
  );
}
