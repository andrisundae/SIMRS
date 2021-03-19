import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import className from 'classname';
import { Label, Menu, Divider } from 'semantic-ui-react';

export default function SidebarMenu({ type }) {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(history.location.search);
  let kode = null !== query.get('kode') ? query.get('kode') : 'PK';

  return (
    <div className="col-start-1 border-r overflow-y-auto">
      <Menu vertical secondary className="w-full h-full border-0 mx-0 p-3">
        {'umum' === type && (
          <Fragment>
            <Menu.Item className="font-semibold m-0">Rawat Darurat</Menu.Item>
            <Menu.Item as={Link} to="/antrian/umum">
              IGD{' '}
              <Label circular color="red" className="-mt-1.5">
                1
              </Label>
            </Menu.Item>
            <Divider className="my-2" />
            <Menu.Item className="font-semibold m-0">Rawat Jalan</Menu.Item>
            <Menu.Item as={Link} to="/antrian/umum">
              Bedah Umum{' '}
              <Label circular color="red" className="-mt-1.5">
                1
              </Label>
            </Menu.Item>
            <Menu.Item as={Link} to="/antrian/umum">
              Kebidanan & Kandungan{' '}
              <Label circular color="red" className="-mt-1.5">
                1
              </Label>
            </Menu.Item>
            <Divider className="my-2" />
            <Menu.Item className="font-semibold m-0">Rawat Inap</Menu.Item>
            <Menu.Item as={Link} to="/antrian/umum" className="bg-blue-200">
              Anggrek{' '}
              <Label circular color="red" className="-mt-1.5">
                1
              </Label>
            </Menu.Item>
            <Menu.Item as={Link} to="/antrian/umum">
              Dahlia{' '}
              <Label circular color="red" className="-mt-1.5">
                1
              </Label>
            </Menu.Item>
          </Fragment>
        )}
        {'penunjang' === type && (
          <Fragment>
            <Menu.Item className="font-semibold m-0">Laboratorium</Menu.Item>
            <Menu.Item
              as={Link}
              to={{
                pathname: '/antrian/penunjang',
                search: 'kode=PK&nama_tempat_layanan=Lab. PK',
              }}
              className={className('', {
                'bg-blue-200': 'PK' === kode,
              })}
            >
              Lab. PK{' '}
              <Label circular color="red" className="-mt-1.5">
                1
              </Label>
            </Menu.Item>
            <Divider className="my-2" />
            <Menu.Item className="font-semibold m-0">Radiologi</Menu.Item>
            <Menu.Item
              as={Link}
              to={{
                pathname: '/antrian/penunjang',
                search: 'kode=RAD&nama_tempat_layanan=Radiologi',
              }}
              className={className('', {
                'bg-blue-200': 'RAD' === kode,
              })}
            >
              Radiologi{' '}
              <Label circular color="red" className="-mt-1.5">
                1
              </Label>
            </Menu.Item>
            <Divider className="my-2" />
            <Menu.Item className="font-semibold m-0">OK</Menu.Item>
            <Menu.Item
              as={Link}
              to={{
                pathname: '/antrian/penunjang',
                search: 'kode=OK&nama_tempat_layanan=OK',
              }}
              className={className('', {
                'bg-blue-200': 'OK' === kode,
              })}
            >
              OK Umum{' '}
              <Label circular color="red" className="-mt-1.5">
                1
              </Label>
            </Menu.Item>
          </Fragment>
        )}
      </Menu>
    </div>
  );
}
