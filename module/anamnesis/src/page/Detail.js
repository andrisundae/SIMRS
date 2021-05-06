import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
  Icon,
  Form,
  Button,
  Modal,
  Checkbox,
  Label,
  Table,
} from 'semantic-ui-react';
import _ from 'lodash';

const PreWrapContent = ({ className = '', content = '', style = {} }) => {
  return (
    <div
      style={style}
      className={'whitespace-pre-wrap ' + className}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};

export default function Detail() {
  const { detailData } = useSelector((state) => state.anamnesis);

  const history = useHistory();
  const data = detailData; //JSON.parse(localStorage.getItem('anamnesis-detail-data'));

  console.log(data);

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="folder open" className="mr-4" /> Detail Anamnesis
        <div className="block mt-2">
          <Label color="teal" ribbon className="-left-10">
            {data?.nama_tempat_layanan}
            <span className="mx-1">•</span>
            Kelas {data?.kelas}
            <span className="mx-1">•</span>
            {dayjs(data?.tanggal).format('DD/MM/YYYY HH:mm')}
          </Label>
          <span className="inline text-base">
            {dayjs(data?.tanggal).format('DD/MM/YYYY HH:mm')}
            <span className="mx-1">•</span>
            {data?.nama_personel}
          </span>
        </div>
      </Modal.Header>
      <Modal.Content scrolling>
        <Form>
          <Form.Field>
            <label>Sumber Informasi</label>
            Auto-anamnesis
          </Form.Field>
          <Form.Field>
            <label>Keluhan Utama</label>
            <div className="whitespace-pre">{data?.keluhan_utama}</div>
          </Form.Field>
          <Form.Field>
            <label>Riwayat Penyakit Sekarang</label>
            <PreWrapContent content={data?.riwayat_penyakit_sekarang} />
          </Form.Field>
          <Form.Field>
            <label>Status Psikologi</label>
            {_.map(data?.status_psikologi, 'value').join(', ')}
          </Form.Field>
          <Form.Field>
            <label>Kelainan Fisik</label>
            {_.map(data?.kelainan_fisik, 'value').join(', ')}
          </Form.Field>
          <Form.Field>
            <label>Alat Bantu</label>
            {_.map(data?.alat_bantu, 'value').join(', ')}
          </Form.Field>
          <Form.Field>
            <label>Riwayat Penyakit Yang Pernah Diderita</label>
            <PreWrapContent content={data?.riwayat_penyakit_dahulu} />
          </Form.Field>
          <Form.Field>
            <label>
              Riwayat Alergi (Lanjutkan menambah TANPA MENGHAPUS data alergi
              yang sudah ada)
            </label>
            <div className="ml-5">
              <Table basic="very" compact>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell className="font-bold" width="4">
                      Obat
                    </Table.Cell>
                    <Table.Cell>
                      {_.join(data?.riwayat_alergi?.obat, ', ')}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-bold">Makanan</Table.Cell>
                    <Table.Cell>{data?.riwayat_alergi?.makanan}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-bold">Lain-lain</Table.Cell>
                    <Table.Cell>{data?.riwayat_alergi?.lainnya}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-bold">Reaksi Alergi</Table.Cell>
                    <Table.Cell>{data?.riwayat_alergi_reaksi}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </Form.Field>
          <Form.Field>
            <label>Obat yang dibawa pasien dari luar RS</label>
            <PreWrapContent content={data?.riwayat_obat} />
          </Form.Field>
          <Form.Field>
            <label>Riwayat Penyakit Keluarga</label>
            <PreWrapContent content={data?.riwayat_penyakit_keluarga} />
          </Form.Field>
          <Form.Field>
            <label>Riwayat Sosial</label>
            <div className="ml-5">
              <Table basic="very" compact>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell className="font-bold" width="4">
                      Riwayat Merokok
                    </Table.Cell>
                    <Table.Cell>Jumlah 1, Lama 1 bulan</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-bold">
                      Riwayat Minum-Minuman Beralkohol
                    </Table.Cell>
                    <Table.Cell>Jenis miras, Jumlah 1, Lama 1 bulan</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-bold">
                      Riwayat Penggunaan Obat Penenang (Diluar Yang Diresepkan
                      Dokter)
                    </Table.Cell>
                    <Table.Cell>
                      Jenis obat keras, Jumlah 1, Lama 1 bulan
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-bold">
                      Riwayat Lainnya
                    </Table.Cell>
                    <Table.Cell>cairan alkali</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          to="/"
          onClick={() => {
            history.goBack();
          }}
        >
          <Icon name="times" />
          Tutup
        </Button>
      </Modal.Actions>
    </Fragment>
  );
}
