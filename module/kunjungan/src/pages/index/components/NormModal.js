import React from 'react';
import { Grid, Modal, Icon, Header } from 'semantic-ui-react';
import { OkButton } from '@simrs/components';
import { formatter } from '@simrs/common';

const NormModal = ({show, onHide, pasien}) => {


  return (
    <Modal
      dimmer="inverted"
      open={show}
      onClose={onHide}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      size="mini"
    >
      <Modal.Header><Icon name="info circle" />Kunjungan Berhasil disimpan</Modal.Header>
      <Modal.Content style={{ backgroundColor: '#ECECEC' }}>
        <Grid className="content-grid" >
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Header as="h1" style={{marginBottom: 10}}>
                {pasien ? formatter.textSplitter(pasien.norm) : ''}
              </Header>
              <span>No. Rekam medik untuk pasien :</span>
              <Header as="h3" style={{ marginTop: 10 }}>
                {pasien ? pasien.nama : ''}
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions style={{textAlign: 'center'}}>
        <OkButton
          onClick={onHide}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default NormModal;