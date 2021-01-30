import React, { Fragment, useState } from 'react';
import { Input, Select, Grid, Checkbox } from 'semantic-ui-react';

import DropdownOptions from '../DropdownOptions';
import CheckboxOptions from '../CheckboxOptions';

export default function Extermitas() {
  const [isArteri, setIsArteri] = useState(false);
  const [isIV, setIsIV] = useState(false);
  const [isVena, setIsVena] = useState(false);

  return (
    <Grid>
      <Grid.Row className="pb-0">
        <Grid.Column>
          <label className="block font-bold">Motorik</label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold ml-8">Tangan kanan</label>
        </Grid.Column>
        <Grid.Column>
          <label className="block">
            <Select
              clearable
              fluid
              options={DropdownOptions.extermitas.anastesi.motorik.tangan_kanan}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold ml-8">Tangan kiri</label>
        </Grid.Column>
        <Grid.Column>
          <label className="block">
            <Select
              clearable
              fluid
              options={DropdownOptions.extermitas.anastesi.motorik.tangan_kiri}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold ml-8">Kaki kanan</label>
        </Grid.Column>
        <Grid.Column>
          <label className="block">
            <Select
              clearable
              fluid
              options={DropdownOptions.extermitas.anastesi.motorik.kaki_kanan}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold ml-8">Kaki kiri</label>
        </Grid.Column>
        <Grid.Column>
          <label className="block">
            <Select
              clearable
              fluid
              options={DropdownOptions.extermitas.anastesi.motorik.kaki_kiri}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold">Sensorik</label>
        </Grid.Column>
        <Grid.Column>
          <label className="block">
            <Select
              clearable
              fluid
              options={DropdownOptions.extermitas.anastesi.sensorik}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="pb-0">
        <Grid.Column>
          <label className="block font-bold">
            <Checkbox
              label="Arterial line"
              onChange={(e, { checked }) => setIsArteri(checked)}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      {isArteri && (
        <Fragment>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Cairan infus</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Checkbox label="Normal saline/PZ" />
              </label>
              <label className="block mt-3">
                <Input fluid placeholder="Lainnya, jika ada" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Lokasi</label>
            </Grid.Column>
            <Grid.Column>
              {CheckboxOptions.extermitas.anastesi.arteri.lokasi.map((data) => {
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
              <label className="block font-bold ml-8">Keadaan</label>
            </Grid.Column>
            <Grid.Column>
              {CheckboxOptions.extermitas.anastesi.arteri.keadaan.map(
                (data) => {
                  return (
                    <label
                      key={data.key}
                      className={'block ' + (data.key === 0 ? '' : 'mt-3')}
                    >
                      <Checkbox label={data.text} value={data.value} />
                    </label>
                  );
                }
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0 mt-2">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Balutan</label>
            </Grid.Column>
            <Grid.Column>
              {CheckboxOptions.extermitas.anastesi.arteri.balutan.map(
                (data) => {
                  return (
                    <label
                      key={data.key}
                      className={'block ' + (data.key === 0 ? '' : 'mt-3')}
                    >
                      <Checkbox label={data.text} value={data.value} />
                    </label>
                  );
                }
              )}
              <label className="block mt-3">
                <Input fluid placeholder="Lainnya, jika ada" />
              </label>
            </Grid.Column>
          </Grid.Row>
        </Fragment>
      )}
      <Grid.Row className="pb-0">
        <Grid.Column>
          <label className="block font-bold">
            <Checkbox
              label="IV line"
              onChange={(e, { checked }) => setIsIV(checked)}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      {isIV && (
        <Fragment>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Cairan infus</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Checkbox label="Normal saline/PZ" />
              </label>
              <label className="block mt-3">
                <Input fluid placeholder="Lainnya, jika ada" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Lokasi</label>
            </Grid.Column>
            <Grid.Column>
              {CheckboxOptions.extermitas.anastesi.iv.lokasi.map((data) => {
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
              <label className="block font-bold ml-8">Keadaan</label>
            </Grid.Column>
            <Grid.Column>
              {CheckboxOptions.extermitas.anastesi.iv.keadaan.map((data) => {
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
              <label className="block font-bold ml-8">Balutan</label>
            </Grid.Column>
            <Grid.Column>
              {CheckboxOptions.extermitas.anastesi.iv.balutan.map((data) => {
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
        </Fragment>
      )}
      <Grid.Row className={isVena ? 'pb-0' : ''}>
        <Grid.Column>
          <label className="block font-bold">
            <Checkbox
              label="Vena sectie"
              onChange={(e, { checked }) => setIsVena(checked)}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      {isVena && (
        <Fragment>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Cairan infus</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Checkbox label="Normal saline/PZ" />
              </label>
              <label className="block mt-3">
                <Input fluid placeholder="Lainnya, jika ada" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Lokasi</label>
            </Grid.Column>
            <Grid.Column>
              {CheckboxOptions.extermitas.anastesi.vena.lokasi.map((data) => {
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
              <label className="block font-bold ml-8">Keadaan</label>
            </Grid.Column>
            <Grid.Column>
              {CheckboxOptions.extermitas.anastesi.vena.keadaan.map((data) => {
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
              <label className="block font-bold ml-8">Balutan</label>
            </Grid.Column>
            <Grid.Column>
              {CheckboxOptions.extermitas.anastesi.vena.balutan.map((data) => {
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
        </Fragment>
      )}
    </Grid>
  );
}
