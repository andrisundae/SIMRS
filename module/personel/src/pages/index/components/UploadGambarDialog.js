import React, { createRef} from 'react';
import PropTypes from 'prop-types';
import { Modal, Grid, Icon, Button } from 'semantic-ui-react';

import UploadGambarForm from './UploadGambarForm';

function UploadGambarDialog(props) {
  const { show, onCloseHandler, onSave, onDelete } = props;
  const fileRef = createRef();

  function ambilGambarHandler() {
    fileRef.current.click();
  }

  return (
    <Modal open={show} onClose={onCloseHandler} size="mini" closeOnEscape={false} closeOnDimmerClick={false}>
      <Modal.Header><Icon name="upload" />Upload Gambar Personel</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <Grid className="content-grid" >
            <Grid.Row>
              <Grid.Column>
                <UploadGambarForm
                  data={props.data}
                  post={props.post}
                  onChangeJenisGambar={props.onChangeJenisGambar}
                  onChangePersonel={props.onChangePersonel}
                  onChangeImage={props.onChangeImage}
                  fileRef={fileRef}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Grid centered>
          <Button size="mini" fluid primary onClick={ambilGambarHandler}>Ambil Gambar</Button>
          <Button size="mini" fluid positive onClick={onSave}>Simpan</Button>
          <Button size="mini" fluid negative onClick={onDelete}>Hapus</Button>
          <Button size="mini" fluid onClick={onCloseHandler}>Tutup</Button>
        </Grid>
      </Modal.Actions>
    </Modal>
  )
}

UploadGambarDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onCloseHandler: PropTypes.func,
  onChangeJenisGambar: PropTypes.func,
  onChangePersonel: PropTypes.func,
  onChangeImageHandler: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  data: PropTypes.object,
  post: PropTypes.object,
}

export default UploadGambarDialog;