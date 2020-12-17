import React, { Fragment } from 'react';
import { Label, Menu, Sidebar } from 'semantic-ui-react';
import Content from './Content';

export default function SidebarMenu({ umum = false, penunjang = false }) {
  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="uncover"
        vertical
        visible
        width="wide"
        size="small"
      >
        {umum && (
          <Fragment>
            <Menu.Item className="font-bold">RAWAT DARURAT</Menu.Item>
            <Menu.Item className="pl-9" onClick={() => {}}>
              IGD <Label circular>0</Label>
            </Menu.Item>

            <Menu.Item className="font-bold">RAWAT JALAN</Menu.Item>
            <Menu.Item className="pl-9" onClick={() => {}}>
              BEDAH UMUM <Label circular>0</Label>
            </Menu.Item>
            <Menu.Item className="pl-9" onClick={() => {}}>
              KEBIDANAN & KANDUNGAN <Label circular>0</Label>
            </Menu.Item>

            <Menu.Item className="font-bold">RAWAT INAP</Menu.Item>
            <Menu.Item className="pl-9" onClick={() => {}}>
              ANGGREK <Label circular>0</Label>
            </Menu.Item>
            <Menu.Item className="pl-9" onClick={() => {}}>
              DAHLIA <Label circular>0</Label>
            </Menu.Item>
          </Fragment>
        )}
        {penunjang && (
          <Fragment>
            <Menu.Item className="font-bold">LABORATORIUM</Menu.Item>
            <Menu.Item className="pl-9" onClick={() => {}}>
              LAB. PK <Label circular>0</Label>
            </Menu.Item>

            <Menu.Item className="font-bold">RADIOLOGI</Menu.Item>
            <Menu.Item className="pl-9" onClick={() => {}}>
              RADIOLOGI <Label circular>0</Label>
            </Menu.Item>

            <Menu.Item className="font-bold">OK</Menu.Item>
            <Menu.Item className="pl-9" onClick={() => {}}>
              OK UMUM <Label circular>0</Label>
            </Menu.Item>
          </Fragment>
        )}
      </Sidebar>
      <Sidebar.Pusher>
        <Content umum={umum} penunjang={penunjang} />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}
