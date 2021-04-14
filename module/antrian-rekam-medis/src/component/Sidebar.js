import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import className from 'classname';
import { Label, Menu, Divider, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import { jenisLayananChange, tempatLayananChange } from '../reducer/content';
import {
  useSidebarAntrianKunjungan,
  useSidebarJumlahPasien,
} from '@simrs/rekam-medis/src/fetcher/antrianKunjungan';

export default function SidebarMenu({ type }) {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(history.location.search);
  let kode = null !== query.get('kode') ? query.get('kode') : 'PK';

  const { jenisLayanan, tempatLayanan } = useSelector((state) => state.content);
  const dispatch = useDispatch();

  const {
    data: sidebarAntrianKunjunganData,
    isLoading: sidebarAntrianKunjunganLoading,
  } = useSidebarAntrianKunjungan();

  const {
    data: sidebarJumlahPasienData,
    isLoading: sidebarJumlahPasienLoading,
  } = useSidebarJumlahPasien();

  return (
    <div className="col-start-1 border-r overflow-y-auto">
      <Menu vertical secondary className="w-full h-full border-0 mx-0 p-3">
        {'umum' === type && (
          <Fragment>
            {(sidebarAntrianKunjunganLoading || sidebarJumlahPasienLoading) && (
              <Menu.Item className="text-center font-semibold m-0">
                <span>
                  <Icon loading name="spinner" /> Memuat data..
                </span>
              </Menu.Item>
            )}
            {!sidebarAntrianKunjunganLoading &&
              !sidebarJumlahPasienLoading &&
              sidebarAntrianKunjunganData.non_penunjang.map((dt, idx) => {
                let units = [];

                dt.unit_layanans.map((u, i) => {
                  let indexQty = _.findIndex(sidebarJumlahPasienData, [
                    'unit_id',
                    u.id,
                  ]);
                  if (-1 < indexQty) {
                    units.push(
                      <Menu.Item
                        key={i}
                        // as={Link}
                        // to="/antrian/umum"
                        className={className('', {
                          'bg-blue-500 text-white font-bold':
                            u.nama === tempatLayanan.nama,
                        })}
                        onClick={() => {
                          dispatch(jenisLayananChange(dt.alias));
                          dispatch(tempatLayananChange(u));
                        }}
                      >
                        {u.nama}
                        <Label circular color="red" className="-mt-1.5">
                          {sidebarJumlahPasienData[indexQty].jumlah_pasien}
                        </Label>
                      </Menu.Item>
                    );
                  }
                });

                if (units.length === 0) {
                  return null;
                }

                return (
                  <Fragment key={idx}>
                    <Menu.Item className="font-semibold m-0">
                      {dt.nama}
                    </Menu.Item>
                    {units}
                    <Divider className="my-2" />
                  </Fragment>
                );
              })}
          </Fragment>
        )}
        {'penunjang' === type && (
          <Fragment>
            {(sidebarAntrianKunjunganLoading || sidebarJumlahPasienLoading) && (
              <Menu.Item className="text-center font-semibold m-0">
                <span>
                  <Icon loading name="spinner" /> Memuat data..
                </span>
              </Menu.Item>
            )}
            {!sidebarAntrianKunjunganLoading &&
              !sidebarJumlahPasienLoading &&
              sidebarAntrianKunjunganData.penunjang.map((dt, idx) => {
                let units = [];

                dt.unit_layanans.map((u, i) => {
                  let indexQty = _.findIndex(sidebarJumlahPasienData, [
                    'unit_id',
                    u.id,
                  ]);
                  if (-1 < indexQty) {
                    units.push(
                      <Menu.Item
                        key={i}
                        // as={Link}
                        // to="/antrian/umum"
                        className={className('', {
                          'bg-blue-500 text-white font-bold':
                            u.nama === tempatLayanan.nama,
                        })}
                        onClick={() => {
                          dispatch(jenisLayananChange(dt.alias));
                          dispatch(tempatLayananChange(u));
                        }}
                      >
                        {u.nama}
                        <Label circular color="red" className="-mt-1.5">
                          {sidebarJumlahPasienData[indexQty].jumlah_pasien}
                        </Label>
                      </Menu.Item>
                    );
                  }
                });

                if (units.length === 0) {
                  return null;
                }

                return (
                  <Fragment key={idx}>
                    <Menu.Item className="font-semibold m-0">
                      {dt.nama}
                    </Menu.Item>
                    {units}
                    <Divider className="my-2" />
                  </Fragment>
                );
              })}
          </Fragment>
        )}
      </Menu>
    </div>
  );
}
