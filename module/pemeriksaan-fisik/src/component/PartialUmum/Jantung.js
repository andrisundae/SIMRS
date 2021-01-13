import React, { useState } from 'react';
import {
  Input,
  Select,
  Grid,
  Radio,
  Checkbox,
  Button,
} from 'semantic-ui-react';

import DropdownOptions from '../DropdownOptions';
import RadioOptions from '../RadioOptions';
import CheckboxOptions from '../CheckboxOptions';

export default function Jantung() {
  const [crt, setCRT] = useState('');
  const [edema, setEdema] = useState({
    data: [],
    isNormal: false,
    isNotNormal: false,
    dataLain: '',
  });

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
            options={DropdownOptions.jantung.umum.akral}
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
            options={DropdownOptions.jantung.umum.warna_kulit}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="pb-0">
        <Grid.Column width="4">
          <label className="block font-bold">CRT</label>
        </Grid.Column>
        <Grid.Column>
          {RadioOptions.jantung.umum.crt.map((data) => {
            return (
              <label
                key={data.key}
                className={'block ' + (data.key === 0 ? '' : 'mt-3')}
              >
                <Radio
                  label={data.text}
                  value={data.value}
                  checked={crt === data.value}
                  onChange={(e, { value }) => setCRT(value)}
                />
              </label>
            );
          })}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal" className="mt-2">
        <Grid.Column width="4">
          <label className="block font-bold">Edema</label>
        </Grid.Column>
        <Grid.Column>
          {CheckboxOptions.jantung.umum.edema.map((data) => {
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
                      ? edema.isNormal
                      : edema.isNotNormal
                  }
                  onChange={(e, { checked, value }) => {
                    if ('Tidak ada' === value) {
                      setEdema((prevState) => ({
                        ...prevState,
                        data: checked ? value : [],
                        isNotNormal: !prevState.isNotNormal,
                      }));
                    } else {
                      setEdema((prevState) => ({
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
                            return prevState.data.length === 0 &&
                              '' === prevState.dataLain
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
          <label className="block mt-3">
            <Input
              fluid
              placeholder="Lainnya, jika ada"
              disabled={edema.isNotNormal}
              value={edema.dataLain}
              onChange={(e) => {
                let value = e.target.value;
                setEdema((prevState) => ({
                  ...prevState,
                  dataLain: value,
                  isNormal: (() => {
                    if ('' === value) {
                      return 0 === prevState.data.length
                        ? false
                        : prevState.isNormal;
                    } else {
                      return false === prevState.isNormal
                        ? true
                        : prevState.isNormal;
                    }
                  })(),
                }));
              }}
            />
          </label>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
