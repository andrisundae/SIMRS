import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import className from 'classname';
import {
  Form,
  Input,
  Button,
  Modal,
  Icon,
  Message,
  Menu,
  Label,
  Divider,
} from 'semantic-ui-react';
import dayjs from 'dayjs';
import _ from 'lodash';
import {
  filterChange,
  dataChange,
  fragmentChange,
} from '../reducer/pasienpulang';

export default function SidebarPasienPulang() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [norm, setNorm] = useState('');

  const { filter, data, fragment } = useSelector((state) => state.pasienpulang);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(filter).length === 0) {
      dispatch(
        filterChange({
          tanggal: dayjs(new Date()).format('YYYY-MM-DD'),
        })
      );
    }
    if (Object.keys(fragment).length === 0) {
      dispatch(
        fragmentChange({
          kode_jenis_layanan: '003',
          kode_tempat_layanan: '003001',
          nama_tempat_layanan: 'IGD',
        })
      );
    }
  }, [filter]);

  function doSearch() {
    console.log('search');
  }

  return (
    <div className="col-start-1 border-r overflow-y-auto">
      <Menu vertical secondary className="w-full h-full border-0 mx-0">
        <Menu.Item className="sticky top-0 bg-white z-10">
          <Form>
            <Form.Field>
              <label>Halaman ini memberlakukan aturan akses ke fitur:</label>
            </Form.Field>
            <Form.Field>
              <label>
                <ul className="list-disc ml-5 font-normal">
                  <li className="mb-1">
                    <b>Entri Data</b>, 3000 hari sejak tanggal KRS
                  </li>
                  <li>
                    <b>Buat Dokumen Klaim</b>, 3000 hari sejak tanggal KRS
                  </li>
                </ul>
              </label>
            </Form.Field>
            <Form.Field>
              <Input
                type="date"
                action={{ icon: 'search', color: 'blue', onClick: doSearch }}
                value={filter?.tanggal}
                onChange={(e) => {
                  dispatch(
                    filterChange({
                      tanggal: e.target.value,
                    })
                  );
                }}
              />
            </Form.Field>
            <Form.Field>
              <Button
                content="Cari Pasien Umum"
                color="blue"
                onClick={() => setIsModalOpen(!isModalOpen)}
              />
            </Form.Field>
          </Form>
        </Menu.Item>
        <Divider
          className="sticky my-2 bg-white z-10"
          style={{ top: '14.81rem' }}
        />
        <Menu.Item className="font-semibold m-0">Rawat Darurat</Menu.Item>
        <Menu.Item>
          IGD
          <Label circular color="red" className="-mt-1.5">
            4
          </Label>
        </Menu.Item>
        <Menu.Item>
          PONEK
          <Label circular color="red" className="-mt-1.5">
            4
          </Label>
        </Menu.Item>
        <Divider className="my-2" />
        <Menu.Item className="font-semibold m-0">Rawat Jalan</Menu.Item>
        <Menu.Item>
          Anak
          <Label circular color="red" className="-mt-1.5">
            4
          </Label>
        </Menu.Item>
        <Menu.Item>
          Penyakit Dalam
          <Label circular color="red" className="-mt-1.5">
            4
          </Label>
        </Menu.Item>
        <Divider className="my-2" />
        <Menu.Item className="font-semibold m-0">Rawat Inap</Menu.Item>
        <Menu.Item>
          Anggrek
          <Label circular color="red" className="-mt-1.5">
            4
          </Label>
        </Menu.Item>
        <Menu.Item>
          Melati
          <Label circular color="red" className="-mt-1.5">
            4
          </Label>
        </Menu.Item>
        <Menu.Item>
          Tulip
          <Label circular color="red" className="-mt-1.5">
            4
          </Label>
        </Menu.Item>
        <Divider className="my-2" />
      </Menu>

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(!isModalOpen);
        }}
      >
        <Modal.Header className="text-xl">
          <Icon name="search" className="mr-4" /> Cari Pasien Umum
        </Modal.Header>
        <Modal.Content>
          <Message color="red" className="font-bold">
            Pencarian ini juga didasari oleh tanggal yang telah ditentukan
            sebelumnya.
          </Message>
          <Form>
            <Form.Field>
              <Input
                type="text"
                action={{ icon: 'search', color: 'blue', onClick: doSearch }}
                placeholder="No. RM"
                value={norm}
                onChange={(e) => {
                  setNorm(e.target.value);
                }}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </div>
  );
}
