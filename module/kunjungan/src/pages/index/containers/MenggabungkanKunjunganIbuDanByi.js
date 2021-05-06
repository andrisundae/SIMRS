import React from 'react';
import {
  Modal,
  Input,
  Icon,
  Grid,
  Form,
  Header,
  Segment,
} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import {
  useModuleTrans,
  Select,
  SaveButton,
  CancelButton,
  useAppState,
  DeleteButton,
  useConfirmation,
} from '@simrs/components';
import { formatter } from '@simrs/common';
import {
  AsalKunjunganSingleValue,
  OptionAsalKunjungan,
} from '../components/CustomOptions';
import { actions } from '../index';
import {
  menggabungkanKunjunganIbuDanBayiSelector,
  postKunjunganSelector,
} from '../redux/selectors';

const MenggabungkanKunjunganIbuDanBayi = () => {
  const trans = useModuleTrans();
  const { deleteConfirmation } = useConfirmation();
  const { resource } = useAppState();
  const dispatch = useDispatch();
  const {
    show,
    post,
    data,
    loader,
    selectedKunjungan,
    isExist,
    focusElement,
  } = useSelector(menggabungkanKunjunganIbuDanBayiSelector);
  const kunjungan = useSelector(postKunjunganSelector);

  const [norm, setNorm] = React.useState('');
  const inputRef = {
    norm: React.useRef(),
    id_kunjungan_asal_ibu: React.useRef(),
    save: React.useRef(),
    cancel: React.useRef(),
  };

  // Effect bind moustrap action
  React.useEffect(() => {
    MouseTrap.bindGlobal('alt+s', function (e) {
      e.preventDefault();
      saveHandler();
    });
    MouseTrap.bindGlobal(['alt+b', 'esc'], function (e) {
      e.preventDefault();
      closeHandler();
    });

    return () => {
      MouseTrap.unbind('alt+s');
      MouseTrap.unbind('alt+b');
    };
  }, [show, inputRef, loader, isExist]);

  // Effect focus element handler
  React.useEffect(() => {
    if (
      !isExist &&
      show &&
      !loader &&
      inputRef[focusElement] &&
      inputRef[focusElement].current
    ) {
      inputRef[focusElement].current.focus();
    }
  }, [show, inputRef, loader, isExist]);

  // Effect set norm handler
  React.useEffect(() => {
    if (show && post.norm) {
      setNorm(post.norm);
    }
    if (show && !post.norm && !isExist) {
      setNorm('');
    }
  }, [show, post.norm, isExist]);

  const changeNormHandler = (e) => setNorm(e.target.value);
  const closeHandler = () =>
    dispatch(actions.toggleShowMenggabungkanKunjunganAnakIbu(resource));
  const saveHandler = React.useCallback(() => {
    const payload = {
      id_kunjungan: kunjungan.id,
      norm,
      nama: post.nama,
      id_kunjungan_asal_ibu: selectedKunjungan ? selectedKunjungan.value : '',
    };
    dispatch(actions.saveKunjunganIbuNya.request(resource, payload));
  }, [kunjungan.id, post.nama, selectedKunjungan, norm]);

  const deleteHandler = React.useCallback(() => {
    deleteConfirmation({
      onOk: () =>
        dispatch(
          actions.deleteKunjunganIbuNya.request(resource, {
            id_kunjungan: kunjungan.id,
          })
        ),
    });
  }, [kunjungan.id, post, selectedKunjungan]);

  const noRmKeyDownHandler = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      if (e.target.value) {
        dispatch(
          actions.getPasienIbunya.request(resource, { norm: e.target.value })
        );
      }
    }
  };

  const normFocusHandler = () => {
    dispatch(actions.onFocusElementGabungBayi(resource, ''));
  };

  const disabledNorm = React.useMemo(() => {
    if (isExist) {
      return true;
    }
    return false;
  }, [isExist]);

  const disabledAsalKunjungan = React.useMemo(() => {
    if (isExist) {
      return true;
    }
    return post.id ? false : true;
  }, [post.id, isExist]);

  const selectedChangeAsalKunjungan = (selected) => {
    dispatch(actions.onChangeAsalKunjunganIbu(resource, selected));
  };

  const keyDownHandler = (e, nameRef) => {
    if (13 === e.which) {
      if (e.target.name) {
        e.preventDefault();
      }
      dispatch(actions.onFocusElementGabungBayi(resource, nameRef));
    }
  };

  const keyDownActionHandler = (e) => {
    if (e.which === 37 || e.which === 39) {
      e.preventDefault();

      const { name } = e.target;

      let nextElement = '';
      switch (name) {
        case 'save':
          nextElement = 'cancel';
          break;
        case 'cancel':
          nextElement = 'save';
          break;
        default:
          nextElement = '';
          break;
      }
      dispatch(actions.onFocusElementGabungBayi(resource, nextElement));
    }
  };

  return (
    <Modal
      closeIcon={<Icon name="close" color="black" />}
      dimmer="inverted"
      open={show}
      onClose={closeHandler}
      size="small"
      closeOnEscape={false}
      closeOnDimmerClick={false}
    >
      <Modal.Header>
        <Icon name="user" circular style={{ marginRight: 8 }} />
        {trans('menggabungkan_kunjungan_bayi_dengan_kunjungan_ibunya')}
      </Modal.Header>
      <Modal.Content style={{ backgroundColor: '#ECECEC', padding: 8 }}>
        <Segment loading={loader}>
          <Form>
            <Grid className="content-grid">
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <Header as="h5">{trans('norm_ibunya')}</Header>
                </Grid.Column>
                <Grid.Column width="4" className="field">
                  <Input
                    name="norm"
                    ref={inputRef.norm}
                    onChange={changeNormHandler}
                    onKeyDown={noRmKeyDownHandler}
                    disabled={disabledNorm}
                    value={disabledNorm ? formatter.textSplitter(norm) : norm}
                    onFocus={normFocusHandler}
                  />
                </Grid.Column>
                <Grid.Column width="8" className="field">
                  <Input
                    name="nama"
                    disabled
                    placeholder="Nama"
                    value={post.nama}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width="4" className="field">
                  <Header as="h5">
                    {trans('pilih_kunjungan_ibunya_ketika_melahirkan')}
                  </Header>
                </Grid.Column>
                <Grid.Column width="12">
                  <Select
                    inputRef={inputRef.id_kunjungan_asal_ibu}
                    options={data.kunjungan || []}
                    isClearable={false}
                    name="id_kunjungan_asal_ibu"
                    components={{
                      Option: OptionAsalKunjungan,
                      SingleValue: AsalKunjunganSingleValue,
                    }}
                    isDisabled={disabledAsalKunjungan}
                    onChange={selectedChangeAsalKunjungan}
                    value={selectedKunjungan}
                    onKeyDown={(e) => keyDownHandler(e, 'save')}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        {isExist ? (
          <DeleteButton onClick={deleteHandler} />
        ) : (
          <SaveButton
            inputRef={inputRef.save}
            onClick={saveHandler}
            onKeyDown={keyDownActionHandler}
          />
        )}
        <CancelButton
          inputRef={inputRef.cancel}
          onClick={closeHandler}
          onKeyDown={keyDownActionHandler}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default React.memo(MenggabungkanKunjunganIbuDanBayi);
