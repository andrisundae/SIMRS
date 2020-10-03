import React, { useRef, useEffect } from 'react';
import { Grid, Modal, Icon, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { OkButton, useAppState } from '@simrs/components';
import { formatter } from '@simrs/common';

const NormModal = ({ show, onHide, pasien }) => {
  const { resource } = useAppState();
  const { t } = useTranslation(resource);
  const okButtonRef = useRef(null);
  useEffect(() => {
    if (show) {
      okButtonRef.current.focus();
    }
  }, [show]);

  return (
    <Modal
      dimmer="inverted"
      open={show}
      onClose={onHide}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      size="mini"
    >
      <Modal.Header>
        <Icon name="info circle" />
        {t('kunjungan_berhasil_disimpan')}
      </Modal.Header>
      <Modal.Content style={{ backgroundColor: '#ECECEC' }}>
        <Grid className="content-grid">
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Header as="h1" style={{ marginBottom: 10 }}>
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
      <Modal.Actions style={{ textAlign: 'center' }}>
        <OkButton onClick={onHide} inputRef={okButtonRef} />
      </Modal.Actions>
    </Modal>
  );
};

NormModal.propTypes = {
  show: PropTypes.bool,
  pasien: PropTypes.object,
  onHide: PropTypes.func,
  t: PropTypes.func,
};

export default NormModal;
