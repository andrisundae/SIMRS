import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Button, Grid, Form } from 'semantic-ui-react';
import _ from 'lodash';
import { useQueryClient } from 'react-query';
import { useForm, FormProvider } from 'react-hook-form';
import { Header } from '@simrs/main/src/modules/components';
import MainContent from '@simrs/billing/src/Components/MainContent';
import { toastr } from '@simrs/common';
import {
  useAppState,
  confirmation,
  useModuleTrans,
  PageLoader,
  DateRangePickerHF,
} from '@simrs/components';
// import {
//   usePenunjangDetail,
//   useEditStatusPenunjang,
//   usePenuhiSemuaPermintaanPenunjang,
//   usePenunjangTindakan,
// } from '@simrs/billing/src/fetcher/penunjang';
import { openForm, reset } from './redux/slice';
import { statusFormSelector, loaderSelector } from './redux/selectors';
import Filter from '../components/Filter';
import ListTransaksiLain from '../components/ListTransaksiLain';
import FormTransaksiLain from '../components/FormTransaksiLain';
import ListTransaksiLainDetail from '../components/ListTransaksiLainDetail';
import FormTransaksiLainDetail from '../components/FormTransaksiLainDetail';

function Main() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { resource } = useAppState();
  const t = useModuleTrans();
  const methodsFilter = useForm({
    defaultValues: {},
  });
  const statusForm = useSelector(statusFormSelector);
  const pageLoading = useSelector(loaderSelector);

  useEffect(() => {
    dispatch(openForm({ resource }));
    return () => {
      dispatch(reset({ resource }));
    };
  }, [dispatch, resource]);

  return (
    <>
      <Header title="Transaksi Lain" />
      <MainContent>
        <div className="grid h-full">
          <div className="overflow-y-auto px-3 py-1 bg-gray-200">
            <Segment className="space-y-3 mb-1">
              <Filter />
              <ListTransaksiLain />
            </Segment>
            <Segment className="mt-0 pt-0 pb-5 mb-1">
              <FormTransaksiLain />
            </Segment>
            <Segment className="pt-2 pb-5 mt-0">
              <ListTransaksiLainDetail />
              <FormTransaksiLainDetail />
            </Segment>
          </div>
        </div>
      </MainContent>
      <PageLoader active={pageLoading} />
    </>
  );
}

export default Main;
