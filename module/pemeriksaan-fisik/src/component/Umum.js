import React, { Fragment, useState } from 'react';
import {
  Form,
  Input,
  Label,
  Select,
  Grid,
  Button,
  Icon,
  Modal,
  Radio,
  Checkbox,
} from 'semantic-ui-react';
import _ from 'lodash';

import DropdownOptions from './DropdownOptions';
import Mata from './PartialUmum/Mata';
import Jantung from './PartialUmum/Jantung';
import Paru from './PartialUmum/Paru';
import Abdomen from './PartialUmum/Abdomen';
import Kulit from './PartialUmum/Kulit';
import TulangBelakang from './PartialUmum/TulangBelakang';
import SistemSaraf from './PartialUmum/SistemSaraf';
import Genetalia from './PartialUmum/Genetalia';
import Extermitas from './PartialUmum/Extermitas';

export default function Umum() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeModal, setTypeModal] = useState('');

  const [isMata, setIsMata] = useState(false);
  const [isJantung, setIsJantung] = useState(false);
  const [isParu, setIsParu] = useState(false);
  const [isAbdomen, setIsAbdomen] = useState(false);
  const [isKulit, setIsKulit] = useState(false);
  const [isTulang, setIsTulang] = useState(false);
  const [isSaraf, setIsSaraf] = useState(false);
  const [isGenetalia, setIsGenetalia] = useState(false);
  const [isExtermitas, setIsExtermitas] = useState(false);

  function setTypeAndOpenDetail(data = '') {
    setTypeModal(data);
    setIsModalOpen(!isModalOpen);
  }

  return (
    <Fragment>
      <Grid>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 font-bold">Anemia</label>
          </Grid.Column>
          <Grid.Column>
            <Select
              clearable
              fluid
              options={DropdownOptions.anemia}
              defaultValue="Tidak diperiksa"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 font-bold">Icterus</label>
          </Grid.Column>
          <Grid.Column>
            <Select
              clearable
              fluid
              options={DropdownOptions.icterus}
              defaultValue="Tidak diperiksa"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 font-bold">Cyanosis</label>
          </Grid.Column>
          <Grid.Column>
            <Select
              clearable
              fluid
              options={DropdownOptions.cyanosis}
              defaultValue="Tidak diperiksa"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 font-bold">Dispneau</label>
          </Grid.Column>
          <Grid.Column>
            <Select
              clearable
              fluid
              options={DropdownOptions.dispneau}
              defaultValue="Tidak diperiksa"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 font-bold">Kepala</label>
          </Grid.Column>
          <Grid.Column>
            <Input fluid placeholder="Tidak diperiksa" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 font-bold">Mata</label>
          </Grid.Column>
          <Grid.Column>
            <Input
              labelPosition="right"
              fluid
              action
              placeholder="Tidak diperiksa"
            >
              <input />
              <Button
                icon
                primary={isMata}
                onClick={() => setTypeAndOpenDetail('mata')}
              >
                <Icon name="list" />
              </Button>
            </Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 font-bold">THT</label>
          </Grid.Column>
          <Grid.Column>
            <Input fluid placeholder="Tidak diperiksa" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 font-bold">Mulut</label>
          </Grid.Column>
          <Grid.Column>
            <Input fluid placeholder="Tidak diperiksa" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 font-bold">Leher</label>
          </Grid.Column>
          <Grid.Column>
            <Input fluid placeholder="Tidak diperiksa" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="pb-0">
          <Grid.Column>
            <label className="block mt-2 font-bold">Thorax</label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 ml-8 font-bold">Payudara</label>
          </Grid.Column>
          <Grid.Column>
            <Input fluid placeholder="Tidak diperiksa" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 ml-8 font-bold">Jantung</label>
          </Grid.Column>
          <Grid.Column>
            <Input
              labelPosition="right"
              fluid
              action
              placeholder="Tidak diperiksa"
            >
              <input />
              <Button
                icon
                primary={isJantung}
                onClick={() => setTypeAndOpenDetail('jantung')}
              >
                <Icon name="list" />
              </Button>
            </Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 ml-8 font-bold">Paru</label>
          </Grid.Column>
          <Grid.Column>
            <Input
              labelPosition="right"
              fluid
              action
              placeholder="Tidak diperiksa"
            >
              <input />
              <Button
                icon
                primary={isParu}
                onClick={() => setTypeAndOpenDetail('paru')}
              >
                <Icon name="list" />
              </Button>
            </Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 font-bold">Abdomen</label>
          </Grid.Column>
          <Grid.Column>
            <Input
              labelPosition="right"
              fluid
              action
              placeholder="Tidak diperiksa"
            >
              <input />
              <Button
                icon
                primary={isAbdomen}
                onClick={() => setTypeAndOpenDetail('abdomen')}
              >
                <Icon name="list" />
              </Button>
            </Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 font-bold">
              Kulit & Sistem Limfatik
            </label>
          </Grid.Column>
          <Grid.Column>
            <Input
              labelPosition="right"
              fluid
              action
              placeholder="Tidak diperiksa"
            >
              <input />
              <Button
                icon
                primary={isKulit}
                onClick={() =>
                  setTypeAndOpenDetail(['kulit', 'Kulit & Sistem Limfatik'])
                }
              >
                <Icon name="list" />
              </Button>
            </Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 font-bold">Tulang Belakang</label>
          </Grid.Column>
          <Grid.Column>
            <Input
              labelPosition="right"
              fluid
              action
              placeholder="Tidak diperiksa"
            >
              <input />
              <Button
                icon
                primary={isTulang}
                onClick={() =>
                  setTypeAndOpenDetail(['tulang', 'Tulang Belakang'])
                }
              >
                <Icon name="list" />
              </Button>
            </Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 font-bold">Sistem Saraf</label>
          </Grid.Column>
          <Grid.Column>
            <Input
              labelPosition="right"
              fluid
              action
              placeholder="Tidak diperiksa"
            >
              <input />
              <Button
                icon
                primary={isSaraf}
                onClick={() => setTypeAndOpenDetail(['saraf', 'Sistem Saraf'])}
              >
                <Icon name="list" />
              </Button>
            </Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 font-bold">
              Genetalia, Anus dan Rectum
            </label>
          </Grid.Column>
          <Grid.Column>
            <Input
              labelPosition="right"
              fluid
              action
              placeholder="Tidak diperiksa"
            >
              <input />
              <Button
                icon
                primary={isGenetalia}
                onClick={() =>
                  setTypeAndOpenDetail([
                    'genetalia',
                    'Genetalia, Anus dan Rectum',
                  ])
                }
              >
                <Icon name="list" />
              </Button>
            </Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="4">
            <label className="block mt-2 font-bold">Extermitas</label>
          </Grid.Column>
          <Grid.Column>
            <Input
              labelPosition="right"
              fluid
              action
              placeholder="Tidak diperiksa"
            >
              <input />
              <Button
                icon
                primary={isExtermitas}
                onClick={() => setTypeAndOpenDetail('extermitas')}
              >
                <Icon name="list" />
              </Button>
            </Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal">
          <Grid.Column width="4">
            <label className="block mt-2 font-bold">
              <Checkbox label="Lainnya" value="" checked={true} />
            </label>
          </Grid.Column>
          <Grid.Column>
            <textarea
              className="w-full p-3 border border-gray-300"
              rows="4"
              placeholder="Tidak diperiksa"
            ></textarea>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        open={isModalOpen}
        onClose={setTypeAndOpenDetail}
      >
        <Modal.Header className="text-xl">
          {typeModal.constructor === Array
            ? typeModal[1]
            : _.upperFirst(typeModal)}
        </Modal.Header>
        <Modal.Content scrolling>
          {(() => {
            let type =
              typeModal.constructor === Array ? typeModal[0] : typeModal;
            switch (type) {
              case 'mata':
                return <Mata />;

              case 'jantung':
                return <Jantung />;

              case 'paru':
                return <Paru />;

              case 'abdomen':
                return <Abdomen />;

              case 'kulit':
                return <Kulit />;

              case 'tulang':
                return <TulangBelakang />;

              case 'saraf':
                return <SistemSaraf />;

              case 'genetalia':
                return <Genetalia />;

              case 'extermitas':
                return <Extermitas />;

              default:
                return <div></div>;
            }
          })()}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={setTypeAndOpenDetail}>
            <Icon name="times" />
            Tutup
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}
