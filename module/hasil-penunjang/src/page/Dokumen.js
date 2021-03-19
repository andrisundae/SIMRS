import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import className from 'classname';
import {
  Icon,
  Form,
  Button,
  Modal,
  Table,
  Message,
  Input,
} from 'semantic-ui-react';
import _ from 'lodash';
import { formatBytes } from '../utils/helper';

export default function Dokumen() {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const kodePenunjang = query.get('kode');
  const tindakan = query.get('tindakan');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [fileError, setFileError] = useState(false);
  const [keterangan, setKeterangan] = useState('');

  function handleModalDokumen() {
    setIsModalOpen(!isModalOpen);
  }

  function handleChooseFile(e) {
    e.preventDefault();
    e.stopPropagation();

    if (undefined === e.target.files[0]) {
      return false;
    }

    let canvas = document.getElementById('file_preview'),
      context = canvas.getContext('2d'),
      fileType = e.target.files[0].type.split('/'),
      tempName = '',
      fileName = '',
      fileSize = '',
      error = false,
      img = new Image();

    switch (fileType[0]) {
      case 'image':
        if (
          'jpg' === _.last(e.target.files[0].name.split('.')) ||
          'jpeg' === _.last(e.target.files[0].name.split('.'))
        ) {
          img.onload = function () {
            let width = img.width,
              height = img.height,
              x = 0,
              y = 0;

            if (width > height) {
              width = width / (height / canvas.height);
              height = canvas.height;

              x = -(width - height) / 2;
            } else {
              height = height / (width / canvas.width);
              width = canvas.width;

              y = -(height - width) / 2;
            }

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, x, y, width, height);
          };

          img.src = URL.createObjectURL(e.target.files[0]);
          tempName = e.target.files[0].name.split('.');
          tempName.pop();
          fileName = tempName.join('.');
          fileSize = e.target.files[0].size;
        } else {
          error = true;
        }
        break;

      case 'video':
        if ('mp4' === _.last(e.target.files[0].name.split('.'))) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.font = '24px FontAwesome';
          context.fillStyle = '#ccc';
          context.fillText('\uf1c8', 90, 100);
          tempName = e.target.files[0].name.split('.');
          tempName.pop();
          fileName = tempName.join('.');
          fileSize = e.target.files[0].size;
        } else {
          error = true;
        }
        break;

      default:
        error = true;
        break;
    }

    setFile(e.target.files[0]);
    setFileName(fileName);
    setFileSize(fileSize);
    setFileError(error);
  }

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="image outline" />
        <Icon name="film" className="mr-4" />
        Gambar / Video ({kodePenunjang} | {tindakan})
      </Modal.Header>
      <Modal.Content scrolling className="pt-3">
        <Table striped celled compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="text-center w-28">
                #
              </Table.HeaderCell>
              <Table.HeaderCell>Tanggal & Pengentri</Table.HeaderCell>
              <Table.HeaderCell>Nama</Table.HeaderCell>
              <Table.HeaderCell>Keterangan</Table.HeaderCell>
              <Table.HeaderCell>Tanggal Hapus</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell className="text-center w-28">
                <Icon
                  bordered
                  inverted
                  name="image outline"
                  color="blue"
                  className="cursor-pointer mr-2"
                />
                <Icon
                  bordered
                  inverted
                  name="trash"
                  color="red"
                  className="cursor-pointer"
                />
              </Table.Cell>
              <Table.Cell>
                05/03/2021 15:13
                <br />
                Administrator LINKAR
              </Table.Cell>
              <Table.Cell>Image 1</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="text-center w-28">
                <Icon
                  bordered
                  inverted
                  name="film"
                  color="blue"
                  className="cursor-pointer mr-2"
                />
                <Icon
                  bordered
                  inverted
                  name="trash"
                  color="red"
                  className="cursor-pointer"
                />
              </Table.Cell>
              <Table.Cell>
                05/03/2021 15:20
                <br />
                Administrator LINKAR
              </Table.Cell>
              <Table.Cell>Video 1</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => history.goBack()}>
          <Icon name="undo" />
          Kembali
        </Button>
        <Button color="blue" onClick={() => handleModalDokumen()}>
          <Icon name="plus" />
          Tambah
        </Button>
      </Modal.Actions>

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        size="small"
        open={isModalOpen}
        onClose={() => handleModalDokumen()}
      >
        <Modal.Header className="text-xl">
          <Icon.Group className="mr-2">
            <Icon name="image outline" />
            <Icon corner="bottom right" name="plus" />
          </Icon.Group>
          <Icon.Group className="mr-2">
            <Icon name="film" />
            <Icon corner="bottom right" name="plus" />
          </Icon.Group>
          Tambah Gambar / Video
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field className="text-center font-bold text-lg px-10">
              File yang dapat diunggah adalah .jpg atau .mp4, klik tombol atau
              gambar di bawah ini untuk memilih atau mengganti file dengan file
              yang lain.
              <Message
                compact
                color="red"
                className={className('mt-3', {
                  hidden: !fileError,
                  block: fileError,
                })}
                content="Tipe file tidak valid. silahkan pilih kembali"
              />
            </Form.Field>
            <Form.Field className="text-center">
              <div
                className={className('', {
                  block: '' === file,
                  hidden: '' !== file && !fileError,
                })}
              >
                <Button
                  content="Pilih Gambar / Video"
                  color="blue"
                  onClick={() => document.getElementById('file').click()}
                />
                <Input
                  id="file"
                  type="file"
                  name="file"
                  className="hidden"
                  accept="image/*, video/mp4"
                  onChange={(e) => handleChooseFile(e)}
                />
              </div>
              <div
                className={className('text-center', {
                  'inline-block': '' !== file && !fileError,
                  hidden: '' === file || fileError,
                })}
              >
                <canvas
                  id="file_preview"
                  onClick={() => document.getElementById('file').click()}
                  className="cursor-pointer p-4"
                  width="200"
                  height="200"
                />
                <div className="form-group text-muted">
                  Ukuran File : {formatBytes(fileSize)}
                </div>
              </div>
            </Form.Field>
            {'' !== file && !fileError && (
              <Fragment>
                <Form.Field>
                  <label>Nama</label>
                  <Input
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Keterangan</label>
                  <Input
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                  />
                </Form.Field>
              </Fragment>
            )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            icon="undo"
            content="Batal"
            onClick={() => handleModalDokumen()}
          />
          <Button icon="save" content="Simpan" color="green" />
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}
