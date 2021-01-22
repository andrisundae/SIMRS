import React, { Fragment, useState } from 'react';
import { Input, Select, Grid, Radio, Checkbox, Label } from 'semantic-ui-react';

import DropdownOptions from '../DropdownOptions';
import RadioOptions from '../RadioOptions';
import CheckboxOptions from '../CheckboxOptions';

export default function Leher() {
  return (
    <Grid>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold">Jalan nafas</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.leher.anastesi.jalan_nafas.map((data) => {
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
          <label className="block font-bold mt-2">Alat bantu nafas</label>
        </Grid.Column>
        <Grid.Column>
          <div className="block">
            <Select
              clearable
              fluid
              options={DropdownOptions.leher.anastesi.alat_bantu_nafas}
            />
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold">Proteusi mandibula</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.leher.anastesi.proteusi_mandibula.map((data) => {
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
      <Grid.Row columns="equal" className="pb-0 mt-2">
        <Grid.Column width="4">
          <label className="block font-bold">Buka mulut</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.leher.anastesi.buka_mulut.map((data) => {
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
      <Grid.Row columns="equal" className="pb-0 mt-2">
        <Grid.Column width="4">
          <label className="block font-bold">Gigi geligi</label>
        </Grid.Column>
        <Grid.Column>
          {CheckboxOptions.leher.anastesi.gigi_geligi.map((data) => {
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
      <Grid.Row columns="equal" className="pb-0 mt-2">
        <Grid.Column width="4">
          <label className="block font-bold">Jarak mentohyoid</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.leher.anastesi.jarak_mentohyoid.map((data) => {
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
      <Grid.Row columns="equal" className="pb-0 mt-2">
        <Grid.Column width="4">
          <label className="block font-bold">Jarak hyothyroid</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.leher.anastesi.jarak_hyothyroid.map((data) => {
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
          <label className="block font-bold mt-2">Leher / Gerak leher</label>
        </Grid.Column>
        <Grid.Column>
          <div className="block">
            <Select
              clearable
              fluid
              options={DropdownOptions.leher.anastesi.gerak_leher}
            />
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold mt-2">Malampathy Score</label>
        </Grid.Column>
        <Grid.Column>
          <div className="block">
            <Select
              clearable
              fluid
              options={DropdownOptions.leher.anastesi.malampathy_score}
            />
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold">Massa</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.leher.anastesi.massa.map((data) => {
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
      <Grid.Row columns="equal" className="pb-0 mt-2">
        <Grid.Column width="4">
          <label className="block font-bold">Ventilasi</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.leher.anastesi.ventilasi.map((data) => {
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
      <Grid.Row columns="equal" className="mt-2">
        <Grid.Column width="4">
          <label className="block font-bold">Intubasi</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.leher.anastesi.intubasi.map((data) => {
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
