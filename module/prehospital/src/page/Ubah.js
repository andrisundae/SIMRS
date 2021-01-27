import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
} from 'semantic-ui-react';

export default function Ubah() {
  const history = useHistory();

  const TindakanItems = [
    'Balut',
    'Badai',
    'Beban Tekan',
    'BVM',
    'Catheter Urine',
    'CPR',
    'Ecollar',
    'ETT',
    'Hecting',
    'Infus',
    'Intubasi',
    'NGT',
    'Nasopharingeal Tube',
    'O2',
    'RJP',
    'Suction',
    'Tracheostomy',
  ];

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="plus" className="mr-4" /> Tambah / Ubah Pre-Hospital
      </Modal.Header>
      <Modal.Content scrolling>
        <Grid>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold">GCS</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block"></label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-8 mt-2">Eyes</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={[
                    { key: 0, text: 'Pilih', value: 'Pilih' },
                    {
                      key: 1,
                      text: (
                        <div className="block mr-5">
                          Tidak dapat membuka mata
                          <Label className="-mt-2 float-right">1</Label>
                        </div>
                      ),
                      value: JSON.stringify(['Tidak dapat membuka mata', 1]),
                    },
                    {
                      key: 2,
                      text: (
                        <div className="block mr-5">
                          Membuka mata terhadap rangsangan yang menyakitkan
                          <Label className="-mt-2 float-right">2</Label>
                        </div>
                      ),
                      value: JSON.stringify([
                        'Membuka mata terhadap rangsangan yang menyakitkan',
                        2,
                      ]),
                    },
                    {
                      key: 3,
                      text: (
                        <div className="block mr-5">
                          Membuka mata terhadap rangsangan suara
                          <Label className="-mt-2 float-right">3</Label>
                        </div>
                      ),
                      value: JSON.stringify([
                        'Membuka mata terhadap rangsangan suara',
                        3,
                      ]),
                    },
                    {
                      key: 4,
                      text: (
                        <div className="block mr-5">
                          Membuka mata secara spontan
                          <Label className="-mt-2 float-right">4</Label>
                        </div>
                      ),
                      value: JSON.stringify(['Membuka mata secara spontan', 4]),
                    },
                  ]}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-8 mt-2">Verbal</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={[
                    { key: 0, text: 'Pilih', value: 'Pilih' },
                    {
                      key: 1,
                      text: (
                        <div className="block mr-5">
                          Tidak dapat bersuara
                          <Label className="-mt-2 float-right">1</Label>
                        </div>
                      ),
                      value: JSON.stringify(['Tidak dapat bersuara', 1]),
                    },
                    {
                      key: 2,
                      text: (
                        <div className="block mr-5">
                          Bersuara tapi tidak jelas
                          <Label className="-mt-2 float-right">2</Label>
                        </div>
                      ),
                      value: JSON.stringify(['Bersuara tapi tidak jelas', 2]),
                    },
                    {
                      key: 3,
                      text: (
                        <div className="block mr-5">
                          Mengucapkan kata-kata tapi tidak jelas
                          <Label className="-mt-2 float-right">3</Label>
                        </div>
                      ),
                      value: JSON.stringify([
                        'Mengucapkan kata-kata tapi tidak jelas',
                        3,
                      ]),
                    },
                    {
                      key: 4,
                      text: (
                        <div className="block mr-5">
                          Membingungkan, tidak berorientasi
                          <Label className="-mt-2 float-right">4</Label>
                        </div>
                      ),
                      value: JSON.stringify([
                        'Membingungkan, tidak berorientasi',
                        4,
                      ]),
                    },
                    {
                      key: 5,
                      text: (
                        <div className="block mr-5">
                          Berorientasi, berbicara normal
                          <Label className="-mt-2 float-right">5</Label>
                        </div>
                      ),
                      value: JSON.stringify([
                        'Berorientasi, berbicara normal',
                        5,
                      ]),
                    },
                  ]}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-8 mt-2">Motorik</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={[
                    { key: 0, text: 'Pilih', value: 'Pilih' },
                    {
                      key: 1,
                      text: (
                        <div className="block mr-5">
                          Tidak dapat bergerak
                          <Label className="-mt-2 float-right">1</Label>
                        </div>
                      ),
                      value: JSON.stringify(['Tidak dapat bergerak', 1]),
                    },
                    {
                      key: 2,
                      text: (
                        <div className="block mr-5">
                          Bergerak terhadap rangsangan yang menyakitkan
                          <Label className="-mt-2 float-right">2</Label>
                        </div>
                      ),
                      value: JSON.stringify([
                        'Bergerak terhadap rangsangan yang menyakitkan',
                        2,
                      ]),
                    },
                    {
                      key: 3,
                      text: (
                        <div className="block mr-5">
                          Melengkung abnormal terhadap rangsangan yang
                          menyakitkan
                          <Label className="-mt-2 float-right">3</Label>
                        </div>
                      ),
                      value: JSON.stringify([
                        'Melengkung abnormal terhadap rangsangan yang menyakitkan',
                        3,
                      ]),
                    },
                    {
                      key: 4,
                      text: (
                        <div className="block mr-5">
                          Menarik terhadap rangsangan yang menyakitkan
                          <Label className="-mt-2 float-right">4</Label>
                        </div>
                      ),
                      value: JSON.stringify([
                        'Menarik terhadap rangsangan yang menyakitkan',
                        4,
                      ]),
                    },
                    {
                      key: 5,
                      text: (
                        <div className="block mr-5">
                          Membatasi terhadap rangsangan yang menyakitkan
                          <Label className="-mt-2 float-right">5</Label>
                        </div>
                      ),
                      value: JSON.stringify([
                        'Membatasi terhadap rangsangan yang menyakitkan',
                        5,
                      ]),
                    },
                    {
                      key: 6,
                      text: (
                        <div className="block mr-5">
                          Taat sesuai perintah
                          <Label className="-mt-2 float-right">6</Label>
                        </div>
                      ),
                      value: JSON.stringify(['Taat sesuai perintah', 6]),
                    },
                  ]}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-8">Total</label>
            </Grid.Column>
            <Grid.Column>
              <Label className="block float-right">
                Moderate
                <Label.Detail className="border-l border-gray-400 pl-3">
                  10
                </Label.Detail>
              </Label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-8 mt-2">Kesadaran</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={[
                    {
                      key: 0,
                      text: 'Tidak diperiksa',
                      value: 'Tidak diperiksa',
                    },
                    { key: 1, text: 'Apatis', value: 'Apatis' },
                    { key: 2, text: 'Coma', value: 'Coma' },
                    { key: 3, text: 'Compos Mentis', value: 'Compos Mentis' },
                    { key: 4, text: 'Delirium', value: 'Delirium' },
                    { key: 5, text: 'Somnolen', value: 'Somnolen' },
                    { key: 6, text: 'Soporo Coma', value: 'Soporo Coma' },
                  ]}
                />
                <Label basic className="border-0 pl-0">
                  Kesadaran terpilih otomatis sesuai nilai total GCS, namun
                  dapat diubah sesuai keadaan pasien setelah GCS diisi.
                </Label>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Tekanan darah</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label="mmHg"
                  placeholder="Tidak diperiksa"
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Nadi</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label="x/menit"
                  placeholder="Tidak diperiksa"
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Pernafasan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label="x/menit"
                  placeholder="Tidak diperiksa"
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Suhu</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label={`${'\u00b0'}C`}
                  placeholder="Tidak diperiksa"
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">
                SpO<sub>2</sub>
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input
                  type="number"
                  fluid
                  labelPosition="right"
                  label="%"
                  placeholder="Tidak diperiksa"
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold">Tindakan</label>
            </Grid.Column>
            <Grid.Column>
              {TindakanItems.map((data, index) => {
                return (
                  <label
                    key={index}
                    className={'block ' + (index === 0 ? '' : 'mt-3')}
                  >
                    <Checkbox
                      label={
                        'O2' === data ? (
                          <label>
                            O<sub>2</sub>
                          </label>
                        ) : (
                          data
                        )
                      }
                      value={data}
                    />
                  </label>
                );
              })}
              <label className="block mt-3">
                <textarea
                  className="w-full p-3 border border-gray-300"
                  rows="2"
                  placeholder="Lainnya"
                ></textarea>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Obat</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <textarea
                  className="w-full p-3 border border-gray-300"
                  rows="3"
                  placeholder="Tidak ada"
                ></textarea>
              </label>
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
