import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, Form, Button, Modal, Checkbox, Label } from 'semantic-ui-react';

export default function Detail() {
  const history = useHistory();

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="folder open" className="mr-4" /> Detail Anamnesis
        <div className="block mt-2">
          <Label color="teal" ribbon className="-left-10">
            Mataram • Kelas 3 • 05/12/2020 17:34
          </Label>
          <span className="inline text-base">
            05/12/2020 17:34 • Gigih Setijawan, dr., Sp.P., MARS.
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
            <div className="whitespace-pre">Batuk</div>
          </Form.Field>
          <Form.Field>
            <label>Riwayat Penyakit Sekarang</label>
            <div
              className="whitespace-pre"
              dangerouslySetInnerHTML={{
                __html: `Lorem ipsum dolor sit amet, 
              
              consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
              }}
            />
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
