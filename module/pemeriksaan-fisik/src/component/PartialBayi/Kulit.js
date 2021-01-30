import React, { Fragment, useState } from 'react';
import { Input, Select, Grid, Radio, Checkbox, Label } from 'semantic-ui-react';

import DropdownOptions from '../DropdownOptions';
import RadioOptions from '../RadioOptions';
import CheckboxOptions from '../CheckboxOptions';

export default function Kulit() {
  const [isKondisiKepala, setIsKondisiKepala] = useState(false);

  return (
    <Grid>
      <Grid.Row columns="equal">
        <Grid.Column width="4">
          <label className="block font-bold">Luka/lesi</label>
        </Grid.Column>
        <Grid.Column>
          {CheckboxOptions.kulit.bayi.luka.map((data) => {
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
      {
        <Fragment>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold">Jenis luka</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.kulit.bayi.jenis_luka.map((data) => {
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
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold mt-2">Penyebab luka</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={DropdownOptions.kulit.bayi.penyebab_luka}
                />
              </label>
              <label className="block mt-2">
                <Input fluid placeholder="Lainnya, jika ada" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold mt-2">Tanda peradangan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={DropdownOptions.kulit.bayi.tanda_peradangan}
                />
              </label>
              <label className="block mt-2">
                <Input fluid placeholder="Lainnya, jika ada" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className={isKondisiKepala ? 'pb-0' : ''}>
            <Grid.Column>
              <label className="block font-bold">
                <Checkbox
                  label={`Kepala Px ditinggikan 30${'\u00b0'} - 40${'\u00b0'}, kecuali ada kontra induksi`}
                  onChange={(e, { checked }) => setIsKondisiKepala(checked)}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          {isKondisiKepala && (
            <Fragment>
              <Grid.Row columns="equal" className="pb-0">
                <Grid.Column width="4">
                  <label className="block font-bold">Jelaskan</label>
                </Grid.Column>
                <Grid.Column>
                  <label className="block">
                    <textarea
                      className="w-full p-3 border border-gray-300"
                      rows="4"
                    ></textarea>
                  </label>
                </Grid.Column>
              </Grid.Row>
            </Fragment>
          )}
        </Fragment>
      }
    </Grid>
  );
}
