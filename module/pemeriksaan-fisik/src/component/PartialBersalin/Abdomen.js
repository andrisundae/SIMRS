import React, { Fragment, useState } from 'react';
import { Input, Select, Grid, Radio, Checkbox, Label } from 'semantic-ui-react';

import DropdownOptions from '../DropdownOptions';
import RadioOptions from '../RadioOptions';

export default function Abdomen() {
  const [isObstetri, setIsObstetri] = useState(false);
  const [isGinecologi, setIsGinecologi] = useState(false);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <label className="block font-bold">
            <Checkbox
              label="Pemeriksaan Obstetri"
              onChange={(e, { checked }) => setIsObstetri(checked)}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      {isObstetri && (
        <Fragment>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Pembesaran</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.abdomen.bersalin.obstetri.pembesaran.map((data) => {
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
              <label className="block font-bold ml-8">Luka bekas operasi</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.abdomen.bersalin.obstetri.luka_bekas_operasi.map(
                (data) => {
                  return (
                    <label
                      key={data.key}
                      className={'block ' + (data.key === 0 ? '' : 'mt-3')}
                    >
                      <Radio label={data.text} value={data.value} />
                    </label>
                  );
                }
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold mt-2 ml-8">Linea</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={DropdownOptions.abdomen.bersalin.obstetri.linea}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold mt-2 ml-8">Leopold I</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={DropdownOptions.abdomen.bersalin.obstetri.leopold_I}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold mt-2 ml-8">
                Tinggi fundus uleri
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input type="number" fluid labelPosition="right" label="cm" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Teraba</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.abdomen.bersalin.obstetri.teraba.map((data) => {
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
              <label className="block font-bold ml-8">Leopold II</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.abdomen.bersalin.obstetri.leopold_II.map((data) => {
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
              <label className="block font-bold mt-2 ml-8">Leopold III</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={
                    DropdownOptions.abdomen.bersalin.obstetri.leopold_III
                  }
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold mt-2 ml-8">Leopold III</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={DropdownOptions.abdomen.bersalin.obstetri.leopold_IV}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold mt-2 ml-8">Kontraksi</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input type="number" labelPosition="right">
                  <input className="w-40" />
                  <Label>menit</Label>
                </Input>
                <Input type="number" labelPosition="right">
                  <input className="ml-5 w-40" />
                  <Label>x</Label>
                </Input>
                <Input type="number" labelPosition="right">
                  <input className="ml-5 w-40" />
                  <Label>detik</Label>
                </Input>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">DJJ 1</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Radio label="Tidak terdengar" value="Tidak terdengar" />
              </label>
              <label className="block mt-1">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label="x/menit"
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">DJJ 2</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Radio label="Tidak terdengar" value="Tidak terdengar" />
              </label>
              <label className="block mt-1">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label="x/menit"
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold ml-8">
                Taksiran berat janin
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input type="number" fluid labelPosition="right" label="gram" />
              </label>
            </Grid.Column>
          </Grid.Row>
        </Fragment>
      )}
      <Grid.Row columns="equal">
        <Grid.Column width="4">
          <label className="block font-bold">
            <Checkbox
              label="Pemeriksaan Ginecologi"
              onChange={(e, { checked }) => setIsGinecologi(checked)}
            />
          </label>
        </Grid.Column>
        <Grid.Column>
          {isGinecologi && (
            <Fragment>
              <label className="block">
                <textarea
                  className="w-full p-3 border border-gray-300"
                  rows="4"
                ></textarea>
              </label>
            </Fragment>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
