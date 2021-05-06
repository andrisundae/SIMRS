import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { staticConst } from '../static';
import actions from '../redux/actions';

import ModalKunjunganHariIni from '../components/KunjunganHariIni';

class KunjunganHariIni extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        instalasi_id: '',
        unit_layanan_id: '',
        nama_pasien: '',
        norm: '',
      },
    };
  }

  select2ChangeHanlder = (name, selected) => {
    this.setState(
      (prevState) => {
        return {
          post: {
            ...prevState.post,
            [name]: selected,
          },
        };
      },
      () => {
        if (name === 'instalasi_id' && selected) {
          this.props.onSearchUnitLayanan({ instalasi_id: selected.value });
        }
      }
    );
  };

  inputChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      return {
        post: {
          ...prevState.post,
          [name]: value,
        },
      };
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const { post } = this.state;
    this.props.onSubmit({
      ...post,
      instalasi_id: post.instalasi_id ? post.instalasi_id.value : null,
      unit_layanan_id: post.unitLayanan_id ? post.unitLayanan_id.value : null,
    });
  };

  dataSource = () => {
    return {
      rowCount: null,
      getRows: (params) => {
        const sortModel =
          params.sortModel.length > 0 ? params.sortModel[0] : {};
        const { post } = this.state;
        const data = {
          length: 25,
          start: params.startRow,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
          ...post,
          instalasi_id: post.instalasi_id ? post.instalasi_id.value : '',
          unit_layanan_id: post.unit_layanan_id
            ? post.unit_layanan_id.value
            : '',
        };

        this.props.onLoadData(data, params);
      },
    };
  };

  render() {
    const {
      t,
      data,
      resource,
      show,
      loaderUnitLayanan,
      datatable,
    } = this.props;

    if (!show) {
      return null;
    }

    return (
      <ModalKunjunganHariIni
        name={staticConst.TABLE_KUNJUNGAN_HARI_INI}
        show={show}
        dataSource={this.dataSource}
        resource={resource}
        t={t}
        onHide={this.props.onToggleShowKunjunganHariIni}
        data={data}
        post={this.state.post}
        onSelectChange={this.select2ChangeHanlder}
        onInputChange={this.inputChangeHandler}
        onSubmit={this.submitHandler}
        loaderUnitLayanan={loaderUnitLayanan}
        isReloadGrid={datatable.isReload}
        reloadType={datatable.reloadType}
      />
    );
  }
}

const mapStateToProps = function (state) {
  const {
    kunjunganHariIni: { show, data, loaderUnitLayanan },
  } = state.module.kunjungan;

  return {
    show,
    data,
    loaderUnitLayanan,
    datatable: state.datatable.datatables[staticConst.TABLE_KUNJUNGAN_HARI_INI],
  };
};

const mapDispatchToProps = function (dispatch, props) {
  return {
    onToggleShowKunjunganHariIni: () =>
      dispatch(actions.toggleShowKunjunganHariIni(props.resource)),
    onSearchUnitLayanan: (data) =>
      dispatch(
        actions.getUnitLayananKunjunganHariIni.request(props.resource, data)
      ),
    onSubmit: (data) =>
      dispatch(actions.onSubmitFilterKunjunganHariIni(props.resource, data)),
    onLoadData: (data, tableParams) =>
      dispatch(
        actions.loadAllKunjunganHariIni(props.resource, data, tableParams)
      ),
  };
};

KunjunganHariIni.propTypes = {
  resource: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(KunjunganHariIni);
