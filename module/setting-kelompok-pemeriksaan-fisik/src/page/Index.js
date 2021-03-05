import React, { Fragment, useRef, useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  idKelompokPemeriksaanFisikChange,
  idInstalasiChange,
  unconfiguredKeywordChange,
  configuredKeywordChange,
} from '../reducer/filter';
import {
  Segment,
  Icon,
  Header,
  Form,
  Input,
  Dropdown,
  Divider,
  Button,
} from 'semantic-ui-react';
import _ from 'lodash';
import produce from 'immer';
import { toastr } from 'react-redux-toastr';
import Mousetrap from 'mousetrap';
import DatatableServerSide from '@simrs/components/src/datatable/components/DatatableServerSide';
import datatableConst from '@simrs/components/src/datatable/const';
import { useKelompokPemeriksaanFisiks } from '@simrs/rekam-medis/src/fetcher/kelompokPemeriksaanFisik';
import { useInstalasis } from '@simrs/rekam-medis/src/fetcher/instalasi';
import {
  useSettingKelompokPemeriksaanFisikForConfig,
  insertSettingKelompokPemeriksaanFisik,
  deleteSettingKelompokPemeriksaanFisik,
} from '@simrs/rekam-medis/src/fetcher/settingKelompokPemeriksaanFisik';
import { confirmation } from '@simrs/components/src/dialog/index';

function searchUnitLayanan(unitLayanans, filter) {
  return unitLayanans.filter((unitLayanan) => {
    const instalasiLowerCase = unitLayanan.instalasi.toLowerCase();
    const unitLayananLowerCase = unitLayanan.unit_layanan.toLowerCase();
    return (
      instalasiLowerCase.includes(filter) ||
      unitLayananLowerCase.includes(filter)
    );
  });
}

export default function Index({ t }) {
  const unconfiguredTable = useRef(null);
  const configuredTable = useRef(null);
  const sc1 = useRef(null);
  const sc2 = useRef(null);
  const sc3 = useRef(null);
  const sc4 = useRef(null);

  const [unconfiguredTableReady, setUnconfiguredTableReady] = useState(false);
  const [configuredTableReady, setConfiguredTableReady] = useState(false);

  const {
    idKelompokPemeriksaanFisik,
    idInstalasi,
    unconfiguredKeyword,
    configuredKeyword,
  } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const {
    data: kelompokPemeriksaanFisiks,
    isLoading: kelompokPemeriksaanFisikIsLoading,
  } = useKelompokPemeriksaanFisiks();
  const { data: instalasis, isLoading: instalasiIsLoading } = useInstalasis();
  const {
    data: config,
    isLoading: configIsLoading,
    mutate: mutateConfig,
  } = useSettingKelompokPemeriksaanFisikForConfig({
    idKelompokPemeriksaanFisik: idKelompokPemeriksaanFisik,
    idInstalasi: idInstalasi,
  });

  const kelompokPemeriksaanFisikOptions = useMemo(() => {
    return _.sortBy(
      kelompokPemeriksaanFisiks.map((kelompokPemeriksaanFisik) => ({
        key: kelompokPemeriksaanFisik.id,
        value: kelompokPemeriksaanFisik.id,
        text: kelompokPemeriksaanFisik.nama,
      })),
      ['text']
    );
  }, [kelompokPemeriksaanFisiks]);

  const instalasiOptions = useMemo(() => {
    return _.sortBy(
      instalasis.map((instalasi) => ({
        key: instalasi.id,
        value: instalasi.id,
        text: instalasi.nama,
      })),
      ['text']
    );
  }, [instalasis]);

  const unconfiguredTableColumns = useMemo(() => [
    {
      headerName: t('table.column.instalasi'),
      field: 'instalasi',
    },
    {
      headerName: t('table.column.unit_layanan'),
      field: 'unit_layanan',
    },
  ]);
  const unconfiguredTableGetRowId = (row) => row.id;

  const configuredTableColumns = useMemo(() => [
    {
      headerName: t('table.column.instalasi'),
      field: 'instalasi',
    },
    {
      headerName: t('table.column.unit_layanan'),
      field: 'unit_layanan',
    },
  ]);
  const configuredTableGetRowId = (row) => row.id;

  const unitLayanans = useMemo(
    () =>
      config.unit_layanans.map((unitLayanan, index) => ({
        id: index,
        id_unit_layanan: unitLayanan.id,
        instalasi: unitLayanan.instalasi.nama,
        unit_layanan: unitLayanan.nama,
      })),
    [config.unit_layanans]
  );

  const unconfiguredDatasource = useMemo(() => {
    const settingKelompokPemeriksaanFisiks =
      config.setting_kelompok_pemeriksaan_fisiks;
    const unitLayananFiltered = unitLayanans.filter(
      (unitLayanan) =>
        undefined ===
        settingKelompokPemeriksaanFisiks.find(
          (settingKelompokPemeriksaanFisik) =>
            unitLayanan.id_unit_layanan ===
            settingKelompokPemeriksaanFisik.id_unit_layanan
        )
    );

    if (unconfiguredKeyword) {
      return _.sortBy(
        searchUnitLayanan(
          unitLayananFiltered,
          unconfiguredKeyword.toLowerCase()
        ),
        ['instalasi', 'unit_layanan']
      );
    }

    return _.sortBy(unitLayananFiltered, ['instalasi', 'unit_layanan']);
  }, [
    unitLayanans,
    config.setting_kelompok_pemeriksaan_fisiks,
    unconfiguredKeyword,
  ]);

  const configuredDatasource = useMemo(() => {
    const settingKelompokPemeriksaanFisiks =
      config.setting_kelompok_pemeriksaan_fisiks;
    const unitLayananFiltered = settingKelompokPemeriksaanFisiks.map(
      (settingKelompokPemeriksaanFisik) => {
        const unitLayanan = unitLayanans.find(
          (unitLayanan) =>
            unitLayanan.id_unit_layanan ===
            settingKelompokPemeriksaanFisik.id_unit_layanan
        );
        return {
          ...unitLayanan,
          id: settingKelompokPemeriksaanFisik.id,
        };
      }
    );

    if (configuredKeyword) {
      return _.sortBy(
        searchUnitLayanan(unitLayananFiltered, configuredKeyword.toLowerCase()),
        ['instalasi', 'unit_layanan']
      );
    }

    return _.sortBy(unitLayananFiltered, ['instalasi', 'unit_layanan']);
  }, [
    unitLayanans,
    config.setting_kelompok_pemeriksaan_fisiks,
    configuredKeyword,
  ]);

  useEffect(() => {
    if (unconfiguredTable.current) {
      if (
        undefined === unconfiguredTable.current.gridApi &&
        !unconfiguredTableReady
      ) {
        setUnconfiguredTableReady(true);
      } else {
        const gridApi = unconfiguredTable.current.gridApi;
        if (gridApi) {
          if (configIsLoading) {
            gridApi.showLoadingOverlay();
          } else {
            gridApi.hideOverlay();
            gridApi.setDatasource({
              rowCount: null,
              getRows: (res) => {
                res.successCallback(
                  unconfiguredDatasource,
                  unconfiguredDatasource.length
                );
              },
            });
          }
        }
      }
    }
  }, [
    configIsLoading,
    unconfiguredTable,
    unconfiguredTableReady,
    unconfiguredDatasource,
  ]);

  useEffect(() => {
    if (configuredTable.current) {
      if (
        undefined === configuredTable.current.gridApi &&
        !configuredTableReady
      ) {
        setConfiguredTableReady(true);
      } else {
        const gridApi = configuredTable.current.gridApi;
        if (gridApi) {
          if (configIsLoading) {
            gridApi.showLoadingOverlay();
          } else {
            gridApi.hideOverlay();
            gridApi.setDatasource({
              rowCount: null,
              getRows: (res) => {
                res.successCallback(
                  configuredDatasource,
                  configuredDatasource.length
                );
              },
            });
          }
        }
      }
    }
  }, [
    configIsLoading,
    configuredTable,
    configuredTableReady,
    configuredDatasource,
  ]);

  useEffect(() => {
    Mousetrap.bind('alt+1', () => {
      sc1.current.handleClick();
    });
    Mousetrap.bind('alt+2', () => {
      sc2.current.handleClick();
    });
    Mousetrap.bind('alt+3', () => {
      sc3.current.handleClick();
    });
    Mousetrap.bind('alt+4', () => {
      sc4.current.handleClick();
    });
  }, []);

  return (
    <Fragment>
      <Segment secondary className="content-header">
        <Header as="h4">
          <Icon name="cog" />
          {t('title')}
        </Header>
      </Segment>
      <Segment>
        <Form size="small">
          <Form.Field inline>
            <label>{t('field.label.kelompok_pemeriksaan_fisik')}</label>
            <Dropdown
              placeholder={t('field.placeholder.kelompok_pemeriksaan_fisik')}
              search
              selection
              clearable
              loading={kelompokPemeriksaanFisikIsLoading}
              options={kelompokPemeriksaanFisikOptions}
              value={idKelompokPemeriksaanFisik}
              onChange={(e, data) => {
                dispatch(idKelompokPemeriksaanFisikChange(data.value));
              }}
            />
          </Form.Field>
          <Form.Field inline className="ml-4">
            <label>{t('field.label.instalasi')}</label>
            <Dropdown
              placeholder={t('field.placeholder.instalasi')}
              search
              selection
              clearable
              loading={instalasiIsLoading}
              className="w-64"
              options={instalasiOptions}
              value={idInstalasi}
              onChange={(e, data) => {
                dispatch(idInstalasiChange(data.value));
              }}
            />
          </Form.Field>
          <Divider />
          <div className="flex">
            <div className="flex-auto">
              <Input
                fluid
                icon="search"
                iconPosition="left"
                value={unconfiguredKeyword}
                onChange={(e) => {
                  dispatch(unconfiguredKeywordChange(e.target.value));
                }}
              />
            </div>
            <div className="w-40"></div>
            <div className="flex-auto">
              <Input
                fluid
                icon="search"
                iconPosition="left"
                value={configuredKeyword}
                onChange={(e) => {
                  dispatch(configuredKeywordChange(e.target.value));
                }}
              />
            </div>
          </div>
        </Form>
        <div className="flex mt-2 items-center">
          <div className="flex-auto">
            <DatatableServerSide
              ref={unconfiguredTable}
              name="unconfiguredTable"
              columns={unconfiguredTableColumns}
              maxConcurrentDatasourceRequests={1}
              infiniteInitialRowCount={1}
              cacheBlockSize={10}
              containerHeight="545px"
              autoSizeColumn={true}
              rowSelection={datatableConst.selectionMultiple}
              rowDeselection={true}
              rowBuffer={0}
              navigateToSelect={true}
              getRowNodeId={unconfiguredTableGetRowId}
            />
          </div>
          <div className="w-40 text-center">
            <Button.Group vertical labeled icon>
              <Button
                ref={sc1}
                primary
                size="mini"
                fluid
                disabled={
                  configIsLoading || 0 === unconfiguredDatasource.length
                }
                onClick={() => {
                  const unconfigureds = unconfiguredTable.current.gridApi.getSelectedRows();
                  if (0 === unconfigureds.length) {
                    toastr.warning(
                      'Peringatan',
                      'Data yang akan diatur belum dipilih'
                    );
                  } else {
                    confirmation({
                      onOk: async () => {
                        mutateConfig(
                          produce(config, (draft) => {
                            unconfigureds.forEach((unconfigured) => {
                              draft.setting_kelompok_pemeriksaan_fisiks.push({
                                id: null,
                                id_unit_layanan: unconfigured.id_unit_layanan,
                              });
                            });
                          }),
                          false
                        );

                        const idUnitLayanans = unconfigureds.map(
                          (unconfigured) => unconfigured.id_unit_layanan
                        );
                        const response = await insertSettingKelompokPemeriksaanFisik(
                          {
                            id_unit_layanans: idUnitLayanans,
                            id_kelompok_pemeriksaan_fisik: idKelompokPemeriksaanFisik,
                          }
                        );
                        toastr.success('Sukses', response.message);

                        mutateConfig();
                      },
                    });
                  }
                }}
              >
                <Icon name="angle right" />
                <u>1</u>
              </Button>
              <Button
                ref={sc2}
                primary
                size="mini"
                fluid
                disabled={
                  configIsLoading || 0 === unconfiguredDatasource.length
                }
                onClick={() => {
                  confirmation({
                    onOk: async () => {
                      mutateConfig(
                        produce(config, (draft) => {
                          unconfiguredDatasource.forEach((unconfigured) => {
                            draft.setting_kelompok_pemeriksaan_fisiks.push({
                              id: null,
                              id_unit_layanan: unconfigured.id_unit_layanan,
                            });
                          });
                        }),
                        false
                      );

                      const idUnitLayanans = unconfigureds.map(
                        (unconfigured) => unconfigured.id_unit_layanan
                      );
                      const response = await insertSettingKelompokPemeriksaanFisik(
                        {
                          id_unit_layanans: idUnitLayanans,
                          id_kelompok_pemeriksaan_fisik: idKelompokPemeriksaanFisik,
                        }
                      );
                      toastr.success('Sukses', response.message);

                      mutateConfig();
                    },
                  });
                }}
              >
                <Icon name="angle double right" />
                <u>2</u>
              </Button>
              <Button
                ref={sc3}
                primary
                size="mini"
                fluid
                disabled={configIsLoading || 0 === configuredDatasource.length}
                onClick={() => {
                  const configureds = configuredTable.current.gridApi.getSelectedRows();
                  if (0 === configureds.length) {
                    toastr.warning(
                      'Peringatan',
                      'Data yang akan dihapus belum dipilih'
                    );
                  } else {
                    confirmation({
                      onOk: async () => {
                        mutateConfig(
                          produce(config, (draft) => {
                            configureds.forEach((configured) => {
                              const selectedIndex = draft.setting_kelompok_pemeriksaan_fisiks.findIndex(
                                (settingKelompokPemeriksaanFisik) =>
                                  settingKelompokPemeriksaanFisik.id ===
                                  configured.id
                              );
                              draft.setting_kelompok_pemeriksaan_fisiks.splice(
                                selectedIndex,
                                1
                              );
                            });
                          }),
                          false
                        );

                        const ids = configureds.map(
                          (configured) => configured.id
                        );
                        const response = await deleteSettingKelompokPemeriksaanFisik(
                          {
                            ids,
                          }
                        );
                        toastr.success('Sukses', response.message);

                        mutateConfig();
                      },
                    });
                  }
                }}
              >
                <Icon name="angle left" />
                <u>3</u>
              </Button>
              <Button
                ref={sc4}
                primary
                size="mini"
                fluid
                disabled={configIsLoading || 0 === configuredDatasource.length}
                onClick={() => {
                  confirmation({
                    onOk: async () => {
                      mutateConfig(
                        produce(config, (draft) => {
                          draft.setting_kelompok_pemeriksaan_fisiks = [];
                        }),
                        false
                      );

                      const ids = configuredDatasource.map(
                        (configured) => configured.id
                      );
                      const response = await deleteSettingKelompokPemeriksaanFisik(
                        {
                          ids,
                        }
                      );
                      toastr.success('Sukses', response.message);

                      mutateConfig();
                    },
                  });
                }}
              >
                <Icon name="angle double left" />
                <u>4</u>
              </Button>
            </Button.Group>
          </div>
          <div className="flex-auto">
            <DatatableServerSide
              ref={configuredTable}
              name="configuredTable"
              columns={configuredTableColumns}
              maxConcurrentDatasourceRequests={1}
              infiniteInitialRowCount={1}
              cacheBlockSize={10}
              containerHeight="545px"
              autoSizeColumn={true}
              rowSelection={datatableConst.selectionMultiple}
              rowDeselection={true}
              rowBuffer={0}
              navigateToSelect={true}
              getRowNodeId={configuredTableGetRowId}
              getRowStyle={(param) => {
                if (param.data && null === param.data.id) {
                  return { background: '#8DF793' };
                }
              }}
            />
          </div>
        </div>
      </Segment>
    </Fragment>
  );
}
