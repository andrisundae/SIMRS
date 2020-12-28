import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Label, Menu, Divider } from 'semantic-ui-react';

export default function SidebarMenu({ type }) {
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
            <Menu.Item as={Link} to="/antrian/umum" className="bg-blue-200">
              Lab. PK{' '}
              <Label circular color="red" className="-mt-1.5">
                1
              </Label>
            </Menu.Item>
            <Divider className="my-2" />
            <Menu.Item className="font-semibold m-0">Radiologi</Menu.Item>
            <Menu.Item as={Link} to="/antrian/umum">
              Radiologi{' '}
              <Label circular color="red" className="-mt-1.5">
                1
              </Label>
            </Menu.Item>
            <Divider className="my-2" />
            <Menu.Item className="font-semibold m-0">OK</Menu.Item>
            <Menu.Item as={Link} to="/antrian/umum">
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
