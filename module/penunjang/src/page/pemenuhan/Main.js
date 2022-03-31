import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Button } from 'semantic-ui-react';
import _ from 'lodash';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { parse } from 'query-string';
import { useQueryClient } from 'react-query';
import { Header, Content } from '@simrs/main/src/modules/components';
import { toastr } from '@simrs/common';
import { useAppState, confirmation, useModuleTrans } from '@simrs/components';
import {
  usePenunjangDetail,
  useEditStatusPenunjang,
  usePenuhiSemuaPermintaanPenunjang,
  usePenunjangTindakan,
} from '@simrs/billing/src/fetcher/penunjang';
import IdentitasPasien from '../components/IdentitasPasien';
import ListPenunjang from '../components/ListPenunjang';
import FormPenunjang from '../components/FormPenunjang';
import FooterActions from '../components/FooterActions';
import KeteranganKelasPasien from '../components/KeteranganKelasPasien';
import {
  openForm,
  fullfillmentConfirmation,
  willbefullfilled,
  reset,
} from './redux/slice';
import { statusFormSelector } from './redux/selectors';
import { staticConst } from '../../static';

function Pemenuhan() {
  const history = useHistory();
  const location = useLocation();
  const searchs = parse(location.search);
  const params = useParams();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { resource } = useAppState();
  const t = useModuleTrans();
  const idKunjunganUnit = params?.idKunjunganUnit;
  const statusForm = useSelector(statusFormSelector);
  const enabled = useMemo(() => {
    let valid = false;
    if (idKunjunganUnit) {
      if (
        searchs.st_status_penunjang === staticConst.PERMINTAAN &&
        statusForm === willbefullfilled.type
      ) {
        valid = true;
      }
      if (
        searchs.st_status_penunjang === staticConst.DIPENUHI ||
        searchs.st_status_penunjang === staticConst.DITOLAK
      ) {
        valid = true;
      }
    }
    return valid;
  }, [idKunjunganUnit, searchs.st_status_penunjang, statusForm]);
  const { data, isLoading } = usePenunjangDetail(idKunjunganUnit, {
    enabled,
  });
  const { data: details, isLoading: loadingDetail } = usePenunjangTindakan(
    idKunjunganUnit,
    {
      enabled,
    }
  );
  const editStatusMutation = useEditStatusPenunjang();
  const penuhiSemuaPermintaanMutation = usePenuhiSemuaPermintaanPenunjang();

  const editStatus = useCallback(
    (status) => {
      try {
        editStatusMutation.mutate(
          {
            id: idKunjunganUnit,
            st_status_penunjang: status,
          },
          {
            onSuccess: ({ data }) => {
              if (data.status) {
                toastr.success('Status berhasil diubah.');
                queryClient.invalidateQueries(
                  `/billing/transaksi/penunjang/${idKunjunganUnit}`
                );
              }
            },
            onError: (error) => {
              toastr.warning(
                error && error.message
                  ? error.message
                  : 'Terjadi masalah server'
              );
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    [editStatusMutation, idKunjunganUnit, queryClient]
  );

  const penuhiSemuaPermintaan = useCallback(() => {
    confirmation({
      title: t(`common:dialog.confirmation.title`, false),
      message: 'Apakah semua permintaan akan dipenuhi ?',
      buttons: [
        t(`common:dialog.action.yes`, false),
        t(`common:dialog.action.no`, false),
      ],
      onOk: () => {
        penuhiSemuaPermintaanMutation.mutate(
          {
            id: idKunjunganUnit,
          },
          {
            onSuccess: ({ data }) => {
              if (data.status) {
                toastr.success('Semua permintaan berhasil dipenuhi.');
                queryClient.invalidateQueries(
                  `/billing/transaksi/penunjang/${idKunjunganUnit}`
                );
                queryClient.invalidateQueries(
                  `/billing/transaksi/penunjang/${idKunjunganUnit}/tindakan`
                );
              } else {
                toastr.error(data.message);
              }
            },
            onError: (error) => {
              toastr.warning(
                error && error.message
                  ? error.message
                  : 'Terjadi masalah server'
              );
            },
          }
        );
      },
    });
  }, [idKunjunganUnit, penuhiSemuaPermintaanMutation, queryClient, t]);

  useEffect(() => {
    dispatch(openForm({ resource }));
    return () => {
      dispatch(reset({ resource }));
    };
  }, [dispatch, resource]);

  useEffect(() => {
    if (
      statusForm === fullfillmentConfirmation.type &&
      searchs.st_status_penunjang === staticConst.PERMINTAAN
    ) {
      confirmation({
        title: t(`common:dialog.confirmation.title`, false),
        message: 'Apakah permintaan akan dipenuhi ?',
        buttons: [
          t(`common:dialog.action.yes`, false),
          t(`common:dialog.action.no`, false),
          'Batal',
        ],
        onOk: () => {
          dispatch(willbefullfilled({ resource }));
          editStatus(staticConst.DIPENUHI);
        },
        onCancel: () => {
          dispatch(reset({ resource }));
          editStatus(staticConst.DITOLAK);
          history.goBack();
        },
        onBack: () => history.goBack(),
      });
    }
  }, [
    dispatch,
    editStatus,
    history,
    resource,
    searchs.st_status_penunjang,
    statusForm,
    t,
  ]);

  const isResetStatusPemenuhan = useMemo(() => {
    let filteredDetails = [];
    if (Array.isArray(details)) {
      filteredDetails = details.filter((detail) => detail.jumlah === 0);
    }
    return filteredDetails.length > 0 ? true : false;
  }, [details]);

  return (
    <>
      <Header title="Form Penunjang" icon="phone volume" />
      <Content loading={isLoading || penuhiSemuaPermintaanMutation.isLoading}>
        <IdentitasPasien
          isPulang={data?.st_pulang}
          penjaminPasien={data?.penjamin?.nama}
          data={data?.pasien}
        />
        <Segment className="mt-2 pt-2">
          <div className="flex items-center justify-between text-base mt-0 mb-2 font-semibold">
            {!_.isEmpty(data) ? (
              <KeteranganKelasPasien
                kelas={data?.kelas?.nama}
                hakKelas={data?.penjamin_pasien?.kelas?.nama}
                penjaminId={data?.penjamin?.id}
                penjaminPasien={data?.penjamin?.nama}
              />
            ) : (
              <div />
            )}

            <div className="my-1">
              <Button primary onClick={() => {}} size="mini">
                Dipublikasi
              </Button>
              <Button primary onClick={() => {}} size="mini">
                Permintaan Obat
              </Button>
              <Button primary onClick={() => {}} size="mini">
                Permintaan Penunjang
              </Button>
              <Button
                loading={penuhiSemuaPermintaanMutation.isLoading}
                primary
                onClick={penuhiSemuaPermintaan}
                size="mini"
              >
                Penuhi Semua Permintaan
              </Button>
            </div>
          </div>

          <ListPenunjang
            idKunjunganUnit={idKunjunganUnit}
            enabled={enabled}
            unitLayanan={data?.unit_layanan?.nama}
            statusPenunjang={data?.st_status_penunjang}
            data={details}
            loading={loadingDetail}
          />
          <FormPenunjang
            kunjungan={data?.kunjungan}
            kunjunganUnit={{
              id_unit_layanan: data?.id_unit_layanan,
              id_kelas: data?.id_kelas,
            }}
          />
        </Segment>
      </Content>
      <FooterActions
        isResetStatusPemenuhan={isResetStatusPemenuhan}
        idKunjunganUnit={idKunjunganUnit}
      />
    </>
  );
}

export default Pemenuhan;
