import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Select, Input, Button, Checkbox } from 'semantic-ui-react';
import _ from 'lodash';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import ItemList from './ItemList';
import ModalItem from './ModalItem';
import ModalShowHasil from './ModalShowHasil';
import {
  kategoriChange,
  namaTemplateChange,
  jenisLayananChange,
  aksesDokumenChange,
  ttdPasienChange,
  headingOtomatisChange,
  klaimChange,
  pelayananChange,
  dokumenKhususChange,
  withTTDChange,
  aktifChange,
  modalItemChange,
  modalShowHasilChange,
} from '../reducer/form';

export default function FormTemplate() {
  const location = useLocation();
  const dispatch = useDispatch();
  const lastPathname = _.last(_.split(location.pathname, '/'));

  const {
    ttdPasien,
    headingOtomatis,
    klaim,
    pelayanan,
    dokumenKhusus,
    withTTD,
    aktif,
    modalItem,
    modalShowHasil,
  } = useSelector((state) => state.form);

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
                onClick={() => dispatch(modalItemChange(!modalItem))}
              />
              <Button
                icon="file alternate outline"
                color="blue"
                size="small"
                content="Lihat Hasil"
                onClick={() => dispatch(modalShowHasilChange(!modalShowHasil))}
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
            onChange={(e, { value }) => dispatch(kategoriChange(value))}
          />
        </Form.Field>
        <Form.Field required>
          <label>Nama</label>
          <Input
            onChange={(e) => dispatch(namaTemplateChange(e.target.value))}
          />
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
            onChange={(e, { value }) => dispatch(jenisLayananChange(value))}
          />
          <div className="mt-2 text-gray-500">
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
            onChange={(e, { value }) => dispatch(aksesDokumenChange(value))}
          />
          <div className="mt-2 text-gray-500">
            Pilih Akses Dokumen antara Tablet dan Desktop, atau keduanya (tanpa
            memilih)
          </div>
        </Form.Field>
        <Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              {generateCheckbox({
                label: 'TTD Pasien',
                className: 'mb-3',
                value: ttdPasien,
                onChange: () => dispatch(ttdPasienChange(+!ttdPasien)),
              })}
              {generateCheckbox({
                label: 'Heading Otomatis',
                className: 'mb-3',
                value: headingOtomatis,
                onChange: () =>
                  dispatch(headingOtomatisChange(+!headingOtomatis)),
              })}
              {generateCheckbox({
                label: 'Untuk Klaim',
                className: 'mb-3',
                value: klaim,
                onChange: () => dispatch(klaimChange(+!klaim)),
              })}
            </Form.Field>
            <Form.Field>
              {generateCheckbox({
                label: 'Untuk Pelayanan',
                className: 'mb-3',
                value: pelayanan,
                onChange: () => dispatch(pelayananChange(+!pelayanan)),
              })}
              {generateCheckbox({
                label: 'Dokumen Khusus',
                className: 'mb-3',
                value: dokumenKhusus,
                onChange: () => dispatch(dokumenKhususChange(+!dokumenKhusus)),
              })}
            </Form.Field>
            <Form.Field>
              {generateCheckbox({
                label: 'Dengan TTD',
                className: 'mb-3',
                value: withTTD,
                onChange: () => dispatch(withTTDChange(+!withTTD)),
              })}
              {generateCheckbox({
                label: 'Aktif',
                className: 'mb-3',
                value: aktif,
                onChange: () => dispatch(aktifChange(+!aktif)),
              })}
            </Form.Field>
          </Form.Group>
        </Form.Field>
      </Form>

      <ItemList />
      <ModalItem />
      <ModalShowHasil />
    </>
  );
}
