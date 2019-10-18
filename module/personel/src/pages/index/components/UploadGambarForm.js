import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Image } from 'semantic-ui-react';

import {Select} from '@simrs/components';

function UploadGambarForm(props) {
  return (
    <Form size="small">
      <Grid className="form-grid">
        <Grid.Row className="form-row">
          <Grid.Column width="5" className="field">
            <label>Personel</label>
          </Grid.Column>
          <Grid.Column width="11" className="field">
            <Select
              name="personel"
              options={props.data.options_personel}
              onChange={props.onChangePersonel}
              placeholder="Pilih personel"
              isClearable={false}
              value={props.post.selectedPersonel}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="form-row">
          <Grid.Column width="5" className="field">
            <label>Jenis Gambar</label>
          </Grid.Column>
          <Grid.Column width="11" className="field">
            <Select
              name="personel"
              options={props.data.options_jenis_gambar}
              onChange={props.onChangeJenisGambar}
              placeholder="Pilih jenis gambar"
              isClearable={false}
              value={props.post.selectedJenisGambar}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="form-row">
          <Grid.Column>
            <Image
              style={{ width: '100%' }}
              fluid
              src={props.post.imageUrl ? props.post.imageUrl : 'https://react.semantic-ui.com/images/wireframe/white-image.png'}
              bordered
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <input
        ref={props.fileRef}
        type="file"
        id="file"
        onChange={props.onChangeImage}
        accept="image/x-png,image/gif,image/jpeg"
        hidden
      />
    </Form>
  )
}

UploadGambarForm.propTypes = {
  onChangeJenisGambar: PropTypes.func,
  onChangePersonel: PropTypes.func,
  data: PropTypes.object,
  post: PropTypes.object,
  fileRef: PropTypes.object,
}

export default UploadGambarForm;