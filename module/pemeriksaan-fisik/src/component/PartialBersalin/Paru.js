import React, { Fragment, useState } from 'react';
import { Input, Select, Grid, Radio, Checkbox, Label } from 'semantic-ui-react';

import DropdownOptions from '../DropdownOptions';
import RadioOptions from '../RadioOptions';
import CheckboxOptions from '../CheckboxOptions';

export default function Paru() {
  const [isWSD1, setIsWSD1] = useState(false);
  const [isWSD2, setIsWSD2] = useState(false);
  const [isCVC, setIsCVC] = useState(false);

  return (
    <Grid>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold">Gangguan jalan nafas</label>
        </Grid.Column>
        <Grid.Column>
          <label className="block">
            <Select
              clearable
              fluid
              options={DropdownOptions.paru.bersalin.gangguan_jalan_nafas}
            />
          </label>
          <label className="block mt-1">
            <Input fluid placeholder="Lainnya, jika ada" />
          </label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold">Gangguan pola nafas</label>
        </Grid.Column>
        <Grid.Column>
          <label className="block">
            <Select
              clearable
              fluid
              options={DropdownOptions.paru.bersalin.gangguan_pola_nafas}
            />
          </label>
          <label className="block mt-1">
            <Input fluid placeholder="Lainnya, jika ada" />
          </label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold">Suara nafas</label>
        </Grid.Column>
        <Grid.Column>
          <label className="block">
            <Select
              clearable
              fluid
              options={DropdownOptions.paru.bersalin.suara_nafas}
            />
          </label>
          <label className="block mt-1">
            <Input fluid placeholder="Lainnya, jika ada" />
          </label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block mt-2 font-bold">Otot bantu nafas</label>
        </Grid.Column>
        <Grid.Column>
          {CheckboxOptions.paru.bersalin.otot_bantu_nafas.map((data) => {
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
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold">Jenis nafas</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.paru.bersalin.jenis_nafas.map((data) => {
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
          <label className="block mt-2 font-bold">Alat bantu</label>
        </Grid.Column>
        <Grid.Column>
          <label className="block">
            <Select
              clearable
              fluid
              options={DropdownOptions.paru.bersalin.alat_bantu}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="pb-0">
        <Grid.Column>
          <label className="block font-bold">
            <Checkbox
              label="WSD #1"
              onChange={(e, { checked }) => setIsWSD1(checked)}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      {isWSD1 && (
        <Fragment>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Lokasi</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.paru.bersalin.wsd1.lokasi.map((data) => {
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
              <label className="block mt-2 font-bold ml-8">Tekanan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input type="number" labelPosition="right" fluid>
                  <input />
                  <Label>
                    cm H<sub>2</sub>O
                  </Label>
                </Input>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Undulasi</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.paru.bersalin.wsd1.undulasi.map((data) => {
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
              <label className="block font-bold ml-8">Rembesan</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.paru.bersalin.wsd1.rembesan.map((data) => {
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
              <label className="block mt-2 font-bold ml-8">Drainase</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input type="number" labelPosition="right" fluid>
                  <input />
                  <Label>cc</Label>
                </Input>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Emphysema</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.paru.bersalin.wsd1.emphysema.map((data) => {
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
      <Grid.Row className="pb-0">
        <Grid.Column>
          <label className="block font-bold">
            <Checkbox
              label="WSD #2"
              onChange={(e, { checked }) => setIsWSD2(checked)}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      {isWSD2 && (
        <Fragment>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Lokasi</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.paru.bersalin.wsd2.lokasi.map((data) => {
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
              <label className="block mt-2 font-bold ml-8">Tekanan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input type="number" labelPosition="right" fluid>
                  <input />
                  <Label>
                    cm H<sub>2</sub>O
                  </Label>
                </Input>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Undulasi</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.paru.bersalin.wsd2.undulasi.map((data) => {
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
              <label className="block font-bold ml-8">Rembesan</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.paru.bersalin.wsd2.rembesan.map((data) => {
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
              <label className="block mt-2 font-bold ml-8">Drainase</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input type="number" labelPosition="right" fluid>
                  <input />
                  <Label>cc</Label>
                </Input>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Emphysema</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.paru.bersalin.wsd2.emphysema.map((data) => {
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
      <Grid.Row className={isCVC ? 'pb-0' : ''}>
        <Grid.Column>
          <label className="block font-bold">
            <Checkbox
              label="CVC"
              onChange={(e, { checked }) => setIsCVC(checked)}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
      {isCVC && (
        <Fragment>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold ml-8">Ukuran lumens</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input fluid type="number" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Lokasi</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.paru.bersalin.cvc.lokasi.map((data) => {
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
              <label className="block font-bold ml-8">Keadaan lumens</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.paru.bersalin.cvc.keadaan_lumens.map((data) => {
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
              <label className="block font-bold ml-8">Cairan pembilas</label>
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
              <label className="block font-bold ml-8">Keadaan</label>
            </Grid.Column>
            <Grid.Column>
              {CheckboxOptions.paru.bersalin.cvc.keadaan.map((data) => {
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
          <Grid.Row columns="equal">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Balutan</label>
            </Grid.Column>
            <Grid.Column>
              {CheckboxOptions.paru.bersalin.cvc.balutan.map((data) => {
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
        </Fragment>
      )}
    </Grid>
  );
}
