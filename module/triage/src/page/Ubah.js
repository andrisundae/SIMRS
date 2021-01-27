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

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="plus" className="mr-4" /> Tambah / Ubah TRIAGE
      </Modal.Header>
      <Modal.Content scrolling>
        <Grid>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold">Tanggal Pemeriksaan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input fluid />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold">AIRWAY</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Checkbox label="Paten" value="Paten" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Snoring" value="Snoring" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Gargling" value="Gargling" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Stridor" value="Stridor" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Crawing" value="Crawing" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Sumbatan sebagian" value="Sumbatan sebagian" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Sumbatan total" value="Sumbatan total" />
              </label>
              <label className="block mt-2">
                <textarea
                  className="w-full p-3 border border-gray-300"
                  rows="3"
                  placeholder="Lainnya isikan disini"
                ></textarea>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold">BREATHING</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-8">Pola nafas</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Checkbox label="Teratur" value="Teratur" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Tidak teratur" value="Tidak teratur" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Simetris" value="Simetris" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Asimetris" value="Asimetris" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0 mt-2">
            <Grid.Column width="5">
              <label className="block font-bold ml-8">Jenis nafas</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Radio label="Pernafasan dada" value="Pernafasan dada" />
              </label>
              <label className="block mt-2">
                <Radio label="Pernafasan perut" value="Pernafasan perut" />
              </label>
              <label className="block mt-2">
                <Radio label="Seesaw" value="Seesaw" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-8 mt-2">RR</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input fluid labelPosition="right" type="number" action>
                  <input />
                  <Label>x/menit</Label>
                  <Button icon color="red">
                    <Icon name="minus" />
                  </Button>
                </Input>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-8">
                Gangguan pola nafas
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Checkbox label="Tidak ada" value="Tidak ada" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Takhipneu" value="Takhipneu" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Bradipneu" value="Bradipneu" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Dyspneu" value="Dyspneu" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Orthopneu" value="Orthopneu" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Cyanosis" value="Cyanosis" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Apneu" value="Apneu" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0 mt-2">
            <Grid.Column width="5">
              <label className="block font-bold ml-8">Perkusi paru</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Radio label="Sonor" value="Sonor" />
              </label>
              <label className="block mt-2">
                <Radio label="Hypersonor" value="Hypersonor" />
              </label>
              <label className="block mt-2">
                <Radio label="Redup" value="Redup" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0 mt-2">
            <Grid.Column width="5">
              <label className="block font-bold ml-8">Suara nafas</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Checkbox label="Vesicular" value="Vesicular" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Bronchovesicular" value="Bronchovesicular" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Ronchi" value="Ronchi" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Wheezing" value="Wheezing" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0 mt-2">
            <Grid.Column width="5">
              <label className="block font-bold ml-8">Otot bantu nafas</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Radio label="Tidak ada" value="Tidak ada" />
              </label>
              <label className="block mt-2">
                <Radio label="Cuping hidung" value="Cuping hidung" />
              </label>
              <label className="block mt-2">
                <Radio label="Retraksi dada" value="Retraksi dada" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold">CIRCULATION</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-8">Akral</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Radio label="Hangat" value="Hangat" />
              </label>
              <label className="block mt-2">
                <Radio label="Dingin" value="Dingin" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-8">Tensi</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input labelPosition="right" type="number" action>
                  <Label>Systolic</Label>
                  <input className="w-40" />
                  <Label>mmHg</Label>
                  <Button icon color="red">
                    <Icon name="minus" />
                  </Button>
                </Input>
                <Input
                  className="ml-5"
                  labelPosition="right"
                  type="number"
                  action
                >
                  <Label>Diastolic</Label>
                  <input className="w-40" />
                  <Label>mmHg</Label>
                  <Button icon color="red">
                    <Icon name="minus" />
                  </Button>
                </Input>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold ml-8">Nadi</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-16 mt-2">Frekuensi</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input type="number" fluid labelPosition="right" label="bpm" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-16 mt-2">Kekuatan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={[
                    { key: 0, text: 'Belum diisi', value: 'Belum diisi' },
                    { key: 1, text: 'Kuat', value: 'Kuat' },
                    { key: 2, text: 'Lemah', value: 'Lemah' },
                    { key: 3, text: 'Tidak teraba', value: 'Tidak teraba' },
                  ]}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-8">CRT</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Radio label="< 2 detik" value="< 2 detik" />
              </label>
              <label className="block mt-2">
                <Radio label="> 2 detik" value="> 2 detik" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0 mt-2">
            <Grid.Column width="5">
              <label className="block font-bold ml-8">
                Riwayat kehilangan cairan dalam jumlah besar
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Checkbox label="Tidak ada" value="Tidak ada" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Diare" value="Diare" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Luka bakar" value="Luka bakar" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Muntah" value="Muntah" />
              </label>
              <label className="block mt-2">
                <Checkbox label="Pendarahan" value="Pendarahan" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0 mt-2">
            <Grid.Column width="5">
              <label className="block font-bold ml-16">Kelembaban kulit</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Radio label="Kering" value="Kering" />
              </label>
              <label className="block mt-2">
                <Radio label="Lembab" value="Lembab" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0 mt-2">
            <Grid.Column width="5">
              <label className="block font-bold ml-16">Tugor kulit</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Radio label="Baik" value="Baik" />
              </label>
              <label className="block mt-2">
                <Radio label="Buruk/menurun" value="Buruk/menurun" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-16 mt-2">Luka bakar</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <textarea
                  className="w-full p-3 border border-gray-300"
                  rows="3"
                  placeholder="Isikan disini ... % dan Grade luka bakarnya, jika ada"
                ></textarea>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-8">Perkusi jantung</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Radio
                  label="Batas jantung normal"
                  value="Batas jantung normal"
                />
              </label>
              <label className="block mt-2">
                <Radio label="Cardio Megali" value="Cardio Megali" />
              </label>
              <label className="block mt-2">
                <Radio
                  label="Ictus Cordis normal"
                  value="Ictus Cordis normal"
                />
              </label>
              <label className="block mt-2">
                <Radio
                  label="Ictus Cordis bergeser"
                  value="Ictus Cordis bergeser"
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0 mt-2">
            <Grid.Column width="5">
              <label className="block font-bold ml-8">Auskultasi jantung</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Radio
                  label="Suara jantung I/II normal"
                  value="Suara jantung I/II normal"
                />
              </label>
              <label className="block mt-2">
                <Radio label="Galop" value="Galop" />
              </label>
              <label className="block mt-2">
                <Radio label="Murmur" value="Murmur" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold">DISABILITY</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold">AVPU</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block"></label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-16 mt-2">Alert</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={[
                    { key: 0, text: 'Pilih', value: 'Pilih' },
                    { key: 1, text: '+', value: '+' },
                    { key: 2, text: '-', value: '-' },
                  ]}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-16 mt-2">Verbal</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={[
                    { key: 0, text: 'Pilih', value: 'Pilih' },
                    { key: 1, text: '+', value: '+' },
                    { key: 2, text: '-', value: '-' },
                  ]}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-16 mt-2">Pain</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={[
                    { key: 0, text: 'Pilih', value: 'Pilih' },
                    { key: 1, text: '+', value: '+' },
                    { key: 2, text: '-', value: '-' },
                  ]}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-16 mt-2">Unresponsive</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={[
                    { key: 0, text: 'Pilih', value: 'Pilih' },
                    { key: 1, text: '+', value: '+' },
                    { key: 2, text: '-', value: '-' },
                  ]}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-16">Total</label>
            </Grid.Column>
            <Grid.Column>
              <Label className="block float-right">+/+/-/-</Label>
            </Grid.Column>
          </Grid.Row>
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
              <label className="block font-bold ml-16 mt-2">Eyes</label>
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
                    { key: 5, text: 'X', value: 'x' },
                  ]}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-16 mt-2">Verbal</label>
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
                    { key: 6, text: 'X', value: 'x' },
                  ]}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-16 mt-2">Motorik</label>
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
                    { key: 7, text: 'X', value: 'x' },
                  ]}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="5">
              <label className="block font-bold ml-16">Total</label>
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
              <label className="block font-bold ml-16 mt-2">Kesadaran</label>
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
            <Grid.Column width="5">
              <label className="block font-bold ml-16 mt-2">Catatan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <textarea
                  className="w-full p-3 border border-gray-300"
                  rows="3"
                  placeholder={`Isikan catatan lain jika perlu, termasuk keterangan nilai "x" pada GCS`}
                ></textarea>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold ml-8">Extermitas</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-16">Sensorik</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Radio label="Tidak" value="Tidak" />
              </label>
              <label className="block mt-2">
                <Radio label="Ya" value="Ya" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0 mt-2">
            <Grid.Column width="4">
              <label className="block font-bold ml-16">Motorik</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Radio label="Tidak" value="Tidak" />
              </label>
              <label className="block mt-2">
                <Radio label="Ya" value="Ya" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold ml-8">Kekuatan otot</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-16 mt-2">Tangan kanan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={[
                    {
                      key: 0,
                      text: '5 (Kekuatan kontraksi yang penuh)',
                      value: '5 (Kekuatan kontraksi yang penuh)',
                    },
                    {
                      key: 1,
                      text: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
                      value: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
                    },
                    {
                      key: 2,
                      text: '3 (Cukup kuat untuk mengatasi gravitasi)',
                      value: '3 (Cukup kuat untuk mengatasi gravitasi)',
                    },
                    {
                      key: 3,
                      text:
                        '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan atau gravitasi)',
                      value:
                        '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan atau gravitasi)',
                    },
                    {
                      key: 4,
                      text: '1 (Gerakan kontraksi yang sangat lemah)',
                      value: '1 (Gerakan kontraksi yang sangat lemah)',
                    },
                    {
                      key: 5,
                      text: '0 (Tidak ada kontraksi sama sekali)',
                      value: '0 (Tidak ada kontraksi sama sekali)',
                    },
                  ]}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-16 mt-2">Tangan kiri</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={[
                    {
                      key: 0,
                      text: '5 (Kekuatan kontraksi yang penuh)',
                      value: '5 (Kekuatan kontraksi yang penuh)',
                    },
                    {
                      key: 1,
                      text: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
                      value: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
                    },
                    {
                      key: 2,
                      text: '3 (Cukup kuat untuk mengatasi gravitasi)',
                      value: '3 (Cukup kuat untuk mengatasi gravitasi)',
                    },
                    {
                      key: 3,
                      text:
                        '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan atau gravitasi)',
                      value:
                        '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan atau gravitasi)',
                    },
                    {
                      key: 4,
                      text: '1 (Gerakan kontraksi yang sangat lemah)',
                      value: '1 (Gerakan kontraksi yang sangat lemah)',
                    },
                    {
                      key: 5,
                      text: '0 (Tidak ada kontraksi sama sekali)',
                      value: '0 (Tidak ada kontraksi sama sekali)',
                    },
                  ]}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-16 mt-2">Kaki kanan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={[
                    {
                      key: 0,
                      text: '5 (Kekuatan kontraksi yang penuh)',
                      value: '5 (Kekuatan kontraksi yang penuh)',
                    },
                    {
                      key: 1,
                      text: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
                      value: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
                    },
                    {
                      key: 2,
                      text: '3 (Cukup kuat untuk mengatasi gravitasi)',
                      value: '3 (Cukup kuat untuk mengatasi gravitasi)',
                    },
                    {
                      key: 3,
                      text:
                        '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan atau gravitasi)',
                      value:
                        '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan atau gravitasi)',
                    },
                    {
                      key: 4,
                      text: '1 (Gerakan kontraksi yang sangat lemah)',
                      value: '1 (Gerakan kontraksi yang sangat lemah)',
                    },
                    {
                      key: 5,
                      text: '0 (Tidak ada kontraksi sama sekali)',
                      value: '0 (Tidak ada kontraksi sama sekali)',
                    },
                  ]}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-16 mt-2">Kaki kiri</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  options={[
                    {
                      key: 0,
                      text: '5 (Kekuatan kontraksi yang penuh)',
                      value: '5 (Kekuatan kontraksi yang penuh)',
                    },
                    {
                      key: 1,
                      text: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
                      value: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
                    },
                    {
                      key: 2,
                      text: '3 (Cukup kuat untuk mengatasi gravitasi)',
                      value: '3 (Cukup kuat untuk mengatasi gravitasi)',
                    },
                    {
                      key: 3,
                      text:
                        '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan atau gravitasi)',
                      value:
                        '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan atau gravitasi)',
                    },
                    {
                      key: 4,
                      text: '1 (Gerakan kontraksi yang sangat lemah)',
                      value: '1 (Gerakan kontraksi yang sangat lemah)',
                    },
                    {
                      key: 5,
                      text: '0 (Tidak ada kontraksi sama sekali)',
                      value: '0 (Tidak ada kontraksi sama sekali)',
                    },
                  ]}
                />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold">EXPOSURE</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8 mt-2">Pendarahan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input fluid placeholder="Isikan jika ada" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8 mt-2">Fraktur</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input fluid placeholder="Isikan jika ada" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8 mt-2">Parase</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input fluid placeholder="Isikan jika ada" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8 mt-2">Plegi</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input fluid placeholder="Isikan jika ada" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width="4">
              <label className="block font-bold ml-8 mt-2">Paraperesis</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Input fluid placeholder="Isikan jika ada" />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width="4">
              <label className="block font-bold mt-2">STATUS EMERGENCY</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Select
                  clearable
                  fluid
                  upward
                  options={[
                    {
                      key: 0,
                      text: (
                        <div className="block mr-5">
                          Merah (Prioritas I)
                          <Label
                            basic
                            className="border-0 p-0 -m-1 float-right"
                          >
                            <div className="w-14 h-6 bg-red-600 border"></div>
                          </Label>
                        </div>
                      ),
                      value: 'Merah (Prioritas I)',
                    },
                    {
                      key: 1,
                      text: (
                        <div className="block mr-5">
                          Merah (Prioritas II)
                          <Label
                            basic
                            className="border-0 p-0 -m-1 float-right"
                          >
                            <div className="w-14 h-6 bg-red-600 border"></div>
                          </Label>
                        </div>
                      ),
                      value: 'Merah (Prioritas II)',
                    },
                    {
                      key: 2,
                      text: (
                        <div className="block mr-5">
                          Kuning (Prioritas III)
                          <Label
                            basic
                            className="border-0 p-0 -m-1 float-right"
                          >
                            <div className="w-14 h-6 bg-yellow-300 border"></div>
                          </Label>
                        </div>
                      ),
                      value: 'Kuning (Prioritas III)',
                    },
                    {
                      key: 3,
                      text: (
                        <div className="block mr-5">
                          Kuning (Prioritas IV)
                          <Label
                            basic
                            className="border-0 p-0 -m-1 float-right"
                          >
                            <div className="w-14 h-6 bg-yellow-300 border"></div>
                          </Label>
                        </div>
                      ),
                      value: 'Kuning (Prioritas IV)',
                    },
                    {
                      key: 4,
                      text: (
                        <div className="block mr-5">
                          Hijau (Prioritas V)
                          <Label
                            basic
                            className="border-0 p-0 -m-1 float-right"
                          >
                            <div className="w-14 h-6 bg-green-600 border"></div>
                          </Label>
                        </div>
                      ),
                      value: 'Hijau (Prioritas V)',
                    },
                  ]}
                />
                <Label basic className="border-0 pl-0">
                  Status Emergency terpilih otomatis sesuai parameter
                  pemeriksaan, namun dapat diubah sesuai keadaan pasien.
                </Label>
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
