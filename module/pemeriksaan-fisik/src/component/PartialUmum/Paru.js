import React, { Fragment, useState } from 'react';
import { Input, Select, Grid, Radio, Checkbox, Label } from 'semantic-ui-react';

import DropdownOptions from '../DropdownOptions';
import RadioOptions from '../RadioOptions';
import CheckboxOptions from '../CheckboxOptions';

export default function Paru() {
  const [isWSD1, setIsWSD1] = useState(false);
  const [isWSD2, setIsWSD2] = useState(false);
  const [isCVC, setIsCVC] = useState(false);

  const [jenisNafas, setJenisNafas] = useState('');

  const [wsd1Lokasi, setWsd1Lokasi] = useState('');
  const [wsd1Undulasi, setWsd1Undulasi] = useState('');
  const [wsd1Rembesan, setWsd1Rembesan] = useState('');
  const [wsd1Emphysema, setWsd1Emphysema] = useState('');

  const [wsd2Lokasi, setWsd2Lokasi] = useState('');
  const [wsd2Undulasi, setWsd2Undulasi] = useState('');
  const [wsd2Rembesan, setWsd2Rembesan] = useState('');
  const [wsd2Emphysema, setWsd2Emphysema] = useState('');

  const [cvcLokasi, setCvcLokasi] = useState('');
  const [cvcKeadaanLumens, setCvcKeadaanLumens] = useState('');

  const [ototBantuNafas, setOtotBantuNafas] = useState({
    data: [],
    isNormal: false,
    isNotNormal: false,
  });

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
              options={DropdownOptions.paru.umum.gangguan_jalan_nafas}
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
              options={DropdownOptions.paru.umum.gangguan_pola_nafas}
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
              options={DropdownOptions.paru.umum.suara_nafas}
            />
          </label>
          <label className="block mt-1">
            <Input fluid placeholder="Lainnya, jika ada" />
          </label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold">Otot bantu nafas</label>
        </Grid.Column>
        <Grid.Column>
          {CheckboxOptions.paru.umum.otot_bantu_nafas.map((data) => {
            return (
              <label
                key={data.key}
                className={'block ' + (data.key === 0 ? '' : 'mt-3')}
              >
                <Checkbox
                  label={data.text}
                  value={data.value}
                  disabled={
                    'Tidak ada' === data.value
                      ? ototBantuNafas.isNormal
                      : ototBantuNafas.isNotNormal
                  }
                  onChange={(e, { checked, value }) => {
                    if ('Tidak ada' === value) {
                      setOtotBantuNafas((prevState) => ({
                        ...prevState,
                        data: checked ? value : [],
                        isNotNormal: !prevState.isNotNormal,
                      }));
                    } else {
                      setOtotBantuNafas((prevState) => ({
                        ...prevState,
                        data: (() => {
                          if (checked) {
                            return [...prevState.data, value];
                          } else {
                            let index = prevState.data.indexOf(value);
                            if (index > -1) {
                              prevState.data.splice(index, 1);
                            }
                            return [...prevState.data];
                          }
                        })(),
                        isNormal: (() => {
                          if (checked) {
                            return prevState.data.length === 0 &&
                              false === prevState.isNormal
                              ? true
                              : prevState.isNormal;
                          } else {
                            return prevState.data.length === 0
                              ? false
                              : prevState.isNormal;
                          }
                        })(),
                      }));
                    }
                  }}
                />
              </label>
            );
          })}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0 mt-2">
        <Grid.Column width="4">
          <label className="block font-bold">Jenis nafas</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.paru.umum.jenis_nafas.map((data) => {
            return (
              <label
                key={data.key}
                className={'block ' + (data.key === 0 ? '' : 'mt-3')}
              >
                <Radio
                  label={data.text}
                  value={data.value}
                  checked={jenisNafas === data.value}
                  onChange={(e, { value }) => setJenisNafas(value)}
                />
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
              options={DropdownOptions.paru.umum.alat_bantu}
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
              {RadioOptions.paru.umum.wsd1.lokasi.map((data) => {
                return (
                  <label
                    key={data.key}
                    className={'block ' + (data.key === 0 ? '' : 'mt-3')}
                  >
                    <Radio
                      label={data.text}
                      value={data.value}
                      checked={wsd1Lokasi === data.value}
                      onChange={(e, { value }) => setWsd1Lokasi(value)}
                    />
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
              {RadioOptions.paru.umum.wsd1.undulasi.map((data) => {
                return (
                  <label
                    key={data.key}
                    className={'block ' + (data.key === 0 ? '' : 'mt-3')}
                  >
                    <Radio
                      label={data.text}
                      value={data.value}
                      checked={wsd1Undulasi === data.value}
                      onChange={(e, { value }) => setWsd1Undulasi(value)}
                    />
                  </label>
                );
              })}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0 mt-2">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Rembesan</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.paru.umum.wsd1.rembesan.map((data) => {
                return (
                  <label
                    key={data.key}
                    className={'block ' + (data.key === 0 ? '' : 'mt-3')}
                  >
                    <Radio
                      label={data.text}
                      value={data.value}
                      checked={wsd1Rembesan === data.value}
                      onChange={(e, { value }) => setWsd1Rembesan(value)}
                    />
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
              {RadioOptions.paru.umum.wsd1.emphysema.map((data) => {
                return (
                  <label
                    key={data.key}
                    className={'block ' + (data.key === 0 ? '' : 'mt-3')}
                  >
                    <Radio
                      label={data.text}
                      value={data.value}
                      checked={wsd1Emphysema === data.value}
                      onChange={(e, { value }) => setWsd1Emphysema(value)}
                    />
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
              {RadioOptions.paru.umum.wsd2.lokasi.map((data) => {
                return (
                  <label
                    key={data.key}
                    className={'block ' + (data.key === 0 ? '' : 'mt-3')}
                  >
                    <Radio
                      label={data.text}
                      value={data.value}
                      checked={wsd2Lokasi === data.value}
                      onChange={(e, { value }) => setWsd2Lokasi(value)}
                    />
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
              {RadioOptions.paru.umum.wsd2.undulasi.map((data) => {
                return (
                  <label
                    key={data.key}
                    className={'block ' + (data.key === 0 ? '' : 'mt-3')}
                  >
                    <Radio
                      label={data.text}
                      value={data.value}
                      checked={wsd2Undulasi === data.value}
                      onChange={(e, { value }) => setWsd2Undulasi(value)}
                    />
                  </label>
                );
              })}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0 mt-2">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Rembesan</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.paru.umum.wsd2.rembesan.map((data) => {
                return (
                  <label
                    key={data.key}
                    className={'block ' + (data.key === 0 ? '' : 'mt-3')}
                  >
                    <Radio
                      label={data.text}
                      value={data.value}
                      checked={wsd2Rembesan === data.value}
                      onChange={(e, { value }) => setWsd2Rembesan(value)}
                    />
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
              {RadioOptions.paru.umum.wsd2.emphysema.map((data) => {
                return (
                  <label
                    key={data.key}
                    className={'block ' + (data.key === 0 ? '' : 'mt-3')}
                  >
                    <Radio
                      label={data.text}
                      value={data.value}
                      checked={wsd2Emphysema === data.value}
                      onChange={(e, { value }) => setWsd2Emphysema(value)}
                    />
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
              {RadioOptions.paru.umum.cvc.lokasi.map((data) => {
                return (
                  <label
                    key={data.key}
                    className={'block ' + (data.key === 0 ? '' : 'mt-3')}
                  >
                    <Radio
                      label={data.text}
                      value={data.value}
                      checked={cvcLokasi === data.value}
                      onChange={(e, { value }) => setCvcLokasi(value)}
                    />
                  </label>
                );
              })}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0 mt-2">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Keadaan lumens</label>
            </Grid.Column>
            <Grid.Column>
              {RadioOptions.paru.umum.cvc.keadaan_lumens.map((data) => {
                return (
                  <label
                    key={data.key}
                    className={'block ' + (data.key === 0 ? '' : 'mt-3')}
                  >
                    <Radio
                      label={data.text}
                      value={data.value}
                      checked={cvcKeadaanLumens === data.value}
                      onChange={(e, { value }) => setCvcKeadaanLumens(value)}
                    />
                  </label>
                );
              })}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0 mt-2">
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
              {CheckboxOptions.paru.umum.cvc.keadaan.map((data) => {
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
          <Grid.Row columns="equal" className="mt-2">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Balutan</label>
            </Grid.Column>
            <Grid.Column>
              {CheckboxOptions.paru.umum.cvc.balutan.map((data) => {
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
