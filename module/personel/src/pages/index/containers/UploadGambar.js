import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {confirmation} from '@simrs/components';
import {toastr} from '@simrs/common';
import {UploadGambarDialog} from '../components';

import { uploadGambarActions } from '../actions';

class UploadGambar extends Component {
  getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  onCloseHandler = () => {
    this.props.action.onClose(this.props.resource);
  }

  onChangeJenisGambarHandler = (selected) => {
    this.props.action.onChangeJenisGambar(this.props.resource, selected);
  }

  onChangePersonelHandler = (selected) => {
    this.props.action.onChangePersonel(this.props.resource, selected);
  }

  onSaveHandler = () => {
    this.props.action.onSave(this.props.resource, this.props.post);
  }

  onDeleteHandler = () => {
    const {t, post, action, resource} = this.props;
    confirmation({
      title: t(`common:dialog.confirmation.title`),
      message: t(`common:dialog.confirmation.delete`),
      buttons: [t(`common:dialog.action.yes`), t(`common:dialog.action.no`)],
      onOk: () => action.onDelete(resource, post)
    });
  }

  onChangeImageHandler = (e) => {
    const file = e.target.files[0];
    const maxSize = 1048576;
    if (file) {
      if (file.size <= maxSize) {
        const reader = new FileReader();

        reader.onloadend = () => {
          this.props.action.onChangeImage(this.props.resource, {
            file,
            imageUrl: reader.result
          })
        }

        reader.readAsDataURL(file)
      } else {
        toastr.warning('Ukuran gambar tidak boleh melebihi 1 Mb!', 'Warning');
      }
    }
  }

  render() {
    const { post, t, show, data } = this.props;

    return (
      <UploadGambarDialog
        show={show}
        t={t}
        data={data}
        post={post}
        onCloseHandler={this.onCloseHandler}
        onChangeJenisGambar={this.onChangeJenisGambarHandler}
        onChangePersonel={this.onChangePersonelHandler}
        onSave={this.onSaveHandler}
        onChangeImage={this.onChangeImageHandler}
        onDelete={this.onDeleteHandler}
      />
    )
  }
}

const mapStateToProps = function (state) {
  const { uploadGambar: {post, show, data} } = state.default;

  return {
    post,
    show,
    data
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators({
      onClose: uploadGambarActions.closeUploadGambar,
      onChangeJenisGambar: uploadGambarActions.onChangeJenisGambar,
      onChangePersonel: uploadGambarActions.onChangePersonel,
      onSave: uploadGambarActions.save.request,
      onDelete: uploadGambarActions.delete.request,
      onChangeImage: uploadGambarActions.onChangeImage,
    }, dispatch),
  }
}

UploadGambar.propTypes = {
  post: PropTypes.object,
  show: PropTypes.bool,
  data: PropTypes.object,
  action: PropTypes.object,
  resource: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadGambar);
