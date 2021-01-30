import React from 'react';
import { Segment, Form, Table } from 'semantic-ui-react';

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

export default function AnamnesisAsal() {
  return (
    <Segment>
      <Form>
        <Form.Field>
          <label>Sumber Informasi</label>
          Auto-anamnesis
        </Form.Field>
        <Form.Field>
          <label>Keluhan Utama</label>
          <div className="whitespace-pre">Batuk</div>
        </Form.Field>
        <Form.Field>
          <label>Riwayat Penyakit Sekarang</label>
          <PreWrapContent
            content={`Lorem ipsum dolor sit amet, 
            
            consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
          />
        </Form.Field>
        <Form.Field>
          <label>Status Psikologi</label>
          Sedih, Tegang, Menderita penyakit yang membahayakan dirinya sendiri,
          lainnya
        </Form.Field>
        <Form.Field>
          <label>Kelainan Fisik</label>
          Bisu, Buta, lainnya
        </Form.Field>
        <Form.Field>
          <label>Alat Bantu</label>
          Kursi Roda, Kruk, lainnya
        </Form.Field>
        <Form.Field>
          <label>Riwayat Penyakit Yang Pernah Diderita</label>
          <PreWrapContent content={`DM (+) HT (-)`} />
        </Form.Field>
        <Form.Field>
          <label>
            Riwayat Alergi (Lanjutkan menambah TANPA MENGHAPUS data alergi yang
            sudah ada)
          </label>
          <div className="ml-5">
            <Table basic="very" compact>
              <Table.Body>
                <Table.Row>
                  <Table.Cell className="font-bold" width="4">
                    Obat
                  </Table.Cell>
                  <Table.Cell>AMOXICILLIN, ALBUMIN</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-bold">Makanan</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-bold">Lain-lain</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-bold">Reaksi Alergi</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </Form.Field>
        <Form.Field>
          <label>Obat yang dibawa pasien dari luar RS</label>
          <PreWrapContent content={`obat lain`} />
        </Form.Field>
        <Form.Field>
          <label>Riwayat Penyakit Keluarga</label>
          <PreWrapContent content={`-`} />
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
                  <Table.Cell className="font-bold">Riwayat Lainnya</Table.Cell>
                  <Table.Cell>cairan alkali</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </Form.Field>
      </Form>
    </Segment>
  );
}
