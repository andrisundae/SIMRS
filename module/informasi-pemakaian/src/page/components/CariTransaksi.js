import React, { Fragment, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';

import { Segment, Grid, Form, Modal, Button, Icon } from 'semantic-ui-react';
import {
  Input,
  DatePickerHF,
  CheckboxHF,
  ReactSelect,
  useDatatable,
  DatatableServerSide,
} from '@simrs/components';
import { staticConst } from '../../static';

import { closeModal } from '../../redux/reducer';
import { PilihButton } from '@simrs/components';
import { focusElementSelector } from '../../redux/reducer/selector';

const CariTransaksi = (props) => {
  const { t, isShow, innerRef } = props;
  const dispatch = useDispatch();
  const methods = useForm();

  const focusElement = useSelector(focusElementSelector);
  const { gridApi, emptySource, getRowNodeId, onGridReady } = useDatatable();

  const columns = [
    {
      headerName: t('Nomor Transaksi'),
      field: 'no',
    },
    {
      headerName: t('Tanggal'),
      field: 'tanggal',
    },
  ];

  const searchRef = {
    keyWord: useRef(),
    tglAwal: useRef(),
    tglAkhir: useRef(),
    useTgl: useRef(),
    filter: useRef(),
    btnBatal: useRef(),
    btnPilih: useRef(),
  };

  useEffect(() => {
    if (focusElement && searchRef[focusElement]) {
      if (searchRef[focusElement].current) {
        switch (focusElement) {
          default:
            searchRef[focusElement].current.focus();
            break;
        }
      }
    }
  }, [focusElement]);

  const onClose = useCallback(
    () => dispatch(closeModal({ name: 'modalMaster', next: '' })),
    [dispatch, closeModal]
  );
  const onPilih = useCallback(() => {
    dispatch(closeModal({ name: 'modalMaster', next: '' }));
  }, [dispatch, closeModal]);

  return (
    <Modal
      open={isShow}
      size="small"
      closeOnEscape={false}
      closeOnDimmerClick={false}
    >
      <Modal.Content>
        <FormProvider {...methods}>
          <Form>
            <Segment>
              <Grid>
                <Grid.Row>
                  <Grid.Column width="12" className="field">
                    <Grid>
                      <Grid.Row className="form-row">
                        <Grid.Column width="3" className="field">
                          <label>{t('Tanggal')}</label>
                        </Grid.Column>
                        <Grid.Column
                          width="5"
                          className="field"
                          style={{ paddingRight: 0 }}
                        >
                          <DatePickerHF
                            name="tanggal_awal"
                            ref={searchRef.tglAwal}
                          />
                        </Grid.Column>
                        <Grid.Column width="1" className="field">
                          <label>{t('s.d')}</label>
                        </Grid.Column>
                        <Grid.Column width="5" className="field">
                          <DatePickerHF
                            name="tanggal_akhir"
                            ref={searchRef.tglAkhir}
                          />
                        </Grid.Column>
                        <Grid.Column
                          width="2"
                          className="field"
                          style={{ paddingLeft: 0 }}
                        >
                          <CheckboxHF name="use_tgl" ref={searchRef.useTgl} />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row className="form-row">
                        <Grid.Column width="3" className="field">
                          <label>{t('Filter')}</label>
                        </Grid.Column>
                        <Grid.Column width="11" className="field">
                          <ReactSelect
                            ref={searchRef.filter}
                            name="filter"
                            placeholder={t('Filter')}
                            options={[]}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row className="form-row">
                        <Grid.Column width="3" className="field">
                          <label>{t('Kata Kunci')}</label>
                        </Grid.Column>
                        <Grid.Column width="11" className="field">
                          <Input
                            ref={searchRef.keyWord}
                            name="kata_kunci"
                            value={''}
                            disabled={false}
                            readOnly={false}
                            action={{
                              icon: 'search',
                              // onClick: () => onSearch('master_modal'),
                              color: 'blue',
                              type: 'button',
                              disabled: false,
                            }}
                            onKeyDown={(e) => {
                              if ('Enter' === e.key) {
                                // onSearch('pemesanan_modal');
                              }
                            }}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <DatatableServerSide
                      dataSource={emptySource}
                      ref={innerRef}
                      columns={columns}
                      name={staticConst.TRANSAKSI_LIST}
                      navigateToSelect={true}
                      rowBuffer={0}
                      maxConcurrentDatasourceRequests={1}
                      infiniteInitialRowCount={1}
                      cacheBlockSize={100}
                      containerHeight="200px"
                      getRowNodeId={getRowNodeId}
                      sizeColumnsToFit={true}
                      // onRowDoubleClicked={this.onRowDoubleClickHandler}
                      // onRowEntered={this.onRowEnteredHandler}
                      onGridReady={onGridReady}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Form>
        </FormProvider>
      </Modal.Content>
      <Modal.Actions>
        <PilihButton onClick={onPilih} inputRef={searchRef.btnPilih} />

        <Button
          ref={searchRef.btnBatal}
          name="Batal"
          size="mini"
          color="blue"
          onClick={onClose}
        >
          <Icon name="undo" />
          <label>{t('Batal')}</label>
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
CariTransaksi.propTypes = {
  isShow: PropTypes.bool,
  t: PropTypes.func,
  innerRef: PropTypes.string,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <CariTransaksi innerRef={ref || innerRef} {...props} />;
});

export default React.memo(Component);
