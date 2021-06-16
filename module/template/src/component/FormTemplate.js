import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Form,
  Select,
  Input,
  Button,
  Checkbox,
  Modal,
  Icon,
} from 'semantic-ui-react';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import _ from 'lodash';

export default function FormTemplate() {
  const location = useLocation();
  const dispatch = useDispatch();
  const lastPathname = _.last(_.split(location.pathname, '/'));

  const [ttdPasien, setTtdPasien] = useState(+false);
  const [headingOtomatis, setHeadingOtomatis] = useState(+false);
  const [klaim, setKlaim] = useState(+false);
  const [pelayanan, setPelayanan] = useState(+true);
  const [dokumenKhusus, setDokumenKhusus] = useState(+false);
  const [withTTD, setWithTTD] = useState(+true);
  const [aktif, setAktif] = useState(+true);
  const [modalComponent, setModalComponent] = useState(false);

  function generateCheckbox(obj) {
    let style = obj?.style ? obj.style : {},
      className = obj?.className ? obj.className : '';

    return (
      <div className={className} style={style}>
        <Checkbox
          label={obj.label}
          disabled={obj?.disabled ? obj.disabled : false}
          checked={1 === obj.value ? true : false}
          onChange={(e) =>
            obj?.onChange && obj.onChange.constructor === Function
              ? obj.onChange(e)
              : {}
          }
        />
      </div>
    );
  }

  return (
    <>
      <FooterActionsContainer>
        <div className="m-1">
          {lastPathname === 'edit' && (
            <>
              <Button
                icon="add"
                color="blue"
                size="small"
                content="Tambah"
                onClick={() => setModalComponent(!modalComponent)}
              />
              <Button
                icon="file alternate outline"
                color="blue"
                size="small"
                content="Lihat Hasil"
              />
            </>
          )}
          <Button icon="save" color="green" size="small" content="Simpan" />
          <Button
            as={Link}
            to="/template"
            icon="undo"
            size="small"
            content="Batal"
          />
        </div>
      </FooterActionsContainer>
      <Form>
        <Form.Field required>
          <label>Kategori</label>
          <Select
            defaultValue="-"
            options={[
              { key: 0, value: '-', text: 'Pilih' },
              { key: 1, value: 'Dokumen MRS', text: 'Dokumen MRS' },
              { key: 2, value: 'Dokumen Konsul', text: 'Dokumen Konsul' },
              { key: 3, value: 'Dokumen Penunjang', text: 'Dokumen Penunjang' },
              {
                key: 4,
                value: 'Dokumen Medis Lainnya',
                text: 'Dokumen Medis Lainnya',
              },
              { key: 5, value: 'Dokumen KRS', text: 'Dokumen KRS' },
              {
                key: 6,
                value: 'Dokumen Administrasi',
                text: 'Dokumen Administrasi',
              },
            ]}
          />
        </Form.Field>
        <Form.Field required>
          <label>Nama</label>
          <Input />
        </Form.Field>
        <Form.Field>
          <label>Jenis Layanan</label>
          <Select
            defaultValue="-"
            options={[
              { key: 0, value: '-', text: 'Pilih' },
              { key: 1, value: 'Laboratorium', text: 'Laboratorium' },
              { key: 2, value: 'Radiologi', text: 'Radiologi' },
              { key: 3, value: 'OK', text: 'OK' },
              { key: 4, value: 'Rawat Darurat', text: 'Rawat Darurat' },
              { key: 5, value: 'Rawat Inap', text: 'Rawat Inap' },
              { key: 6, value: 'Rawat Jalan', text: 'Rawat Jalan' },
              { key: 7, value: 'Penunjang Lain', text: 'Penunjang Lain' },
            ]}
          />
          <div className="text-gray-500">
            Pilih Jenis Layanan jika dokumen dikhususkan untuk Jenis Layanan
            tertentu
          </div>
        </Form.Field>
        <Form.Field>
          <label>Akses Dokumen</label>
          <Select
            defaultValue="-"
            options={[
              { key: 0, value: '-', text: 'Pilih' },
              { key: 1, value: 'tablet', text: 'Tablet (Untuk Dokter)' },
              { key: 2, value: 'desktop', text: 'Desktop (Untuk Perawat)' },
            ]}
          />
          <div className="text-gray-500">
            Pilih Akses Dokumen antara Tablet dan Desktop, atau keduanya (tanpa
            memilih)
          </div>
        </Form.Field>
        <Form.Field>
          {generateCheckbox({
            label: 'TTD Pasien',
            className: 'mb-3',
            value: ttdPasien,
            onChange: () => setTtdPasien(+!ttdPasien),
          })}
          {generateCheckbox({
            label: 'Heading Otomatis',
            className: 'mb-3',
            value: headingOtomatis,
            onChange: () => setHeadingOtomatis(+!headingOtomatis),
          })}
          {generateCheckbox({
            label: 'Untuk Klaim',
            className: 'mb-3',
            value: klaim,
            onChange: () => setKlaim(+!klaim),
          })}
          {generateCheckbox({
            label: 'Untuk Pelayanan',
            className: 'mb-3',
            value: pelayanan,
            onChange: () => setPelayanan(+!pelayanan),
          })}
          {generateCheckbox({
            label: 'Dokumen Khusus',
            className: 'mb-3',
            value: dokumenKhusus,
            onChange: () => setDokumenKhusus(+!dokumenKhusus),
          })}
          {generateCheckbox({
            label: 'Dengan TTD',
            className: 'mb-3',
            value: withTTD,
            onChange: () => setWithTTD(+!withTTD),
          })}
          {generateCheckbox({
            label: 'Aktif',
            className: 'mb-3',
            value: aktif,
            onChange: () => setAktif(+!aktif),
          })}
        </Form.Field>
      </Form>

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        size="large"
        open={modalComponent}
        onClose={() => setModalComponent(!modalComponent)}
      >
        <Modal.Header className="text-xl">
          <Icon.Group className="mr-2">
            <Icon name="tasks" />
            <Icon corner="bottom right" name="plus" />
          </Icon.Group>
          Tambah Item
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Induk</label>
            </Form.Field>
            <Form.Field>
              <label>Urutan</label>
            </Form.Field>
            <Form.Field>
              <label>Label</label>
              <Input />
            </Form.Field>
            <Form.Field>
              <label>Sebagai Referensi</label>
              <Select
                defaultValue="-"
                options={[{ key: 0, value: '-', text: 'Pilih' }]}
              />
            </Form.Field>
            <Form.Field>
              <label>Style</label>
              <div>
                <Select
                  defaultValue="14"
                  options={[
                    { key: 0, value: '14', text: 'Ukuran Font' },
                    { key: 1, value: '15', text: '15' },
                    { key: 2, value: '16', text: '16' },
                  ]}
                />
              </div>
            </Form.Field>
            <Form.Field>
              <label>Tipe</label>
              <Select
                defaultValue="label"
                options={[
                  { key: 0, value: 'label', text: 'Label' },
                  { key: 1, value: 'text', text: 'Text' },
                  { key: 2, value: 'dropdown', text: 'Dropdown' },
                ]}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button icon="save" color="green" content="Simpan" />
          <Button
            icon="close"
            content="Tutup"
            onClick={() => setModalComponent(!modalComponent)}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}
