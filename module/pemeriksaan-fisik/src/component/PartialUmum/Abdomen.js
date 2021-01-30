import React, { Fragment, useState } from 'react';
import { Input, Select, Grid, Radio, Checkbox, Label } from 'semantic-ui-react';

import DropdownOptions from '../DropdownOptions';
import RadioOptions from '../RadioOptions';
import CheckboxOptions from '../CheckboxOptions';

export default function Abdomen() {
  const [isMassa, setIsMassa] = useState(false);
  const [isPerkusi, setIsPerkusi] = useState(false);
  const [isNGTLambung, setIsNGTLambung] = useState(false);
  const [isDrainAbdomen, setIsDrainAbdomen] = useState(false);

  return (
    <Grid>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold">Keadaan</label>
        </Grid.Column>
        <Grid.Column>
          <label className="block">
            <Select
              clearable
              fluid
              options={DropdownOptions.abdomen.umum.keadaan}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold">Bising usus</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.abdomen.umum.bising_usus.map((data) => {
            return (
              <label
                key={data.key}
                className={'block ' + (data.key === 0 ? '' : 'mt-3')}
              >
                <Radio label={data.text} value={data.value} />
              </label>
            );
          })}
          <label className="block mt-3">
            <Input type="number" fluid labelPosition="right" label="x menit" />
          </label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={isMassa ? 'pb-0' : ''}>
        <Grid.Column>
          <label className="block font-bold">
            <Checkbox
              label="Massa/Benjolan"
              onChange={(e, { checked }) => setIsMassa(checked)}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      {isMassa && (
        <Fragment>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold mt-2 ml-8">Diameter</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input type="number" fluid labelPosition="right" label="cm" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Konsistensi</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.abdomen.umum.massa.konsistensi.map((data) => {
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
              <label className="block font-bold mt-2 ml-8">Warna</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input fluid />
              </label>
            </Grid.Column>
          </Grid.Row>
        </Fragment>
      )}
      <Grid.Row columns="equal">
        <Grid.Column width="4">
          <label className="block font-bold">
            <Checkbox
              label="Perkusi"
              onChange={(e, { checked }) => setIsPerkusi(checked)}
            />
          </label>
        </Grid.Column>
        <Grid.Column>
          {isPerkusi && (
            <Fragment>
              {CheckboxOptions.abdomen.umum.perkusi.map((data) => {
                return (
                  <label
                    key={data.key}
                    className={'block ' + (data.key === 0 ? '' : 'mt-3')}
                  >
                    <Radio label={data.text} value={data.value} />
                  </label>
                );
              })}
              <label className="block mt-3">
                <Input fluid placeholder="Lainnya, jika ada" />
              </label>
            </Fragment>
          )}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={isNGTLambung ? 'pb-0' : ''}>
        <Grid.Column>
          <label className="block font-bold">
            <Checkbox
              label="NGT Lambung"
              onChange={(e, { checked }) => setIsNGTLambung(checked)}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      {isNGTLambung && (
        <Fragment>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold mt-2 ml-8">Ukuran</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={DropdownOptions.abdomen.umum.ngt_lambung.ukuran}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold mt-2 ml-8">
                Dipasang di...
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={DropdownOptions.abdomen.umum.ngt_lambung.dipasang}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Fungsi</label>
            </Grid.Column>
            <Grid.Column>
              {CheckboxOptions.abdomen.umum.ngt_lambung.fungsi.map((data) => {
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
      <Grid.Row className={isDrainAbdomen ? 'pb-0' : ''}>
        <Grid.Column>
          <label className="block font-bold">
            <Checkbox
              label="Drain Abdomen"
              onChange={(e, { checked }) => setIsDrainAbdomen(checked)}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      {isDrainAbdomen && (
        <Fragment>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Lokasi</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.abdomen.umum.drain_abdomen.lokasi.map((data) => {
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
              <label className="block font-bold mt-2 ml-8">Ukuran</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={DropdownOptions.abdomen.umum.drain_abdomen.ukuran}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Cairan</label>
            </Grid.Column>
            <Grid.Column>
              {CheckboxOptions.abdomen.umum.drain_abdomen.cairan.map((data) => {
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
