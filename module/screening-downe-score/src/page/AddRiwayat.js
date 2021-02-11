import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import className from 'classname';
import {
  Icon,
  Form,
  Button,
  Modal,
  Header,
  Segment,
  Grid,
  Checkbox,
  Radio,
  Input,
  Label,
  Select,
  List,
} from 'semantic-ui-react';
import _ from 'lodash';
import ScreeningDowneScoreLabel from './Label';

export default function AddRiwayat() {
  const history = useHistory();
  const formLabel = ScreeningDowneScoreLabel.formLabel;

  function renderCustomOption(label, nilai) {
    return (
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column width="1" verticalAlign="middle">
            {nilai}
          </Grid.Column>
          <Grid.Column verticalAlign="middle">{label}</Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  function getDefaultOptionValue(type) {
    let data = _.filter(ScreeningDowneScoreLabel[type], 'default');
    if (data.length > 0) {
      return JSON.stringify({
        label: data[0].text,
        value: data[0].value,
      });
    } else {
      return null;
    }
  }

  function renderOptionData(type) {
    return ScreeningDowneScoreLabel[type].map((data) => {
      return {
        key: data.key,
        text: renderCustomOption(data.text, data.value),
        value: JSON.stringify({
          label: data.text,
          value: data.value,
        }),
      };
    });
  }

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="plus" className="mr-4" />
        {ScreeningDowneScoreLabel.headerLabel}
        <label className="mx-2">&bull;</label>
        Tambah / Ubah Riwayat Tindakan
      </Modal.Header>
      <Modal.Content scrolling>
        <Grid className="ml-5">
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block">
                <Input />
                <div className="inline-block font-bold ml-5">
                  Tanggal Pemeriksaan
                </div>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {formLabel.riwayat.map((data, index) => {
                let inputs = [];
                inputs.push(
                  <label
                    key={index}
                    className={className('block', {
                      'mt-3': index > 0,
                    })}
                  >
                    <Checkbox id={`checkbox_${data.key}`} />
                    <Input id={`input_${data.key}`} className="ml-5" />
                    <div className="inline-block font-bold ml-5">
                      {data.label}
                    </div>
                  </label>
                );

                if (index === 11) {
                  let children = data.children;
                  inputs.push(
                    <label key={`c${index}`} className="block mt-3 ml-12">
                      <Grid>
                        <Grid.Row columns="equal" className="pb-0">
                          <Grid.Column width="3">
                            <label className="block font-bold mt-2">
                              {children[0].label}
                            </label>
                          </Grid.Column>
                          <Grid.Column>
                            <label className="block">
                              <Input
                                type="number"
                                labelPosition="right"
                                label="Meq"
                              />
                              <Input
                                className="ml-5"
                                type="number"
                                labelPosition="right"
                                label="MI"
                              />
                            </label>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="equal" className="pb-0">
                          <Grid.Column width="3">
                            <label className="block font-bold mt-2">
                              {children[1].label}
                            </label>
                          </Grid.Column>
                          <Grid.Column>
                            <label className="block">
                              <Input
                                type="number"
                                labelPosition="right"
                                label="%"
                              />
                              <Input
                                className="ml-5"
                                type="number"
                                labelPosition="right"
                                label="MI"
                              />
                            </label>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="equal" className="pb-0">
                          <Grid.Column width="3">
                            <label className="block font-bold mt-2">
                              {children[2].label}
                            </label>
                          </Grid.Column>
                          <Grid.Column>
                            <label className="block">
                              <Input
                                type="number"
                                labelPosition="right"
                                label="Mg"
                              />
                            </label>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="equal">
                          <Grid.Column width="3">
                            <label className="block font-bold mt-2">
                              {children[3].label}
                            </label>
                          </Grid.Column>
                          <Grid.Column>
                            <label className="block">
                              <Input fluid />
                            </label>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </label>
                  );
                }

                return inputs;
              })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => history.goBack()}>
          <Icon name="times" />
          Batal
        </Button>
        <Button color="green" onClick={() => {}}>
          <Icon name="save" />
          Simpan
        </Button>
      </Modal.Actions>
    </Fragment>
  );
}
