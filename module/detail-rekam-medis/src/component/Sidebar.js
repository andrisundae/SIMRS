import React, { useState } from 'react';
import { List, Icon, Menu, Sidebar, Sticky } from 'semantic-ui-react';
import Content from './Content';

export default function SidebarMenu({ umum = false, penunjang = false }) {
  const [activeMenu, setActiveMenu] = useState('info-pasien');

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
        <Menu.Item
          className="sticky border-b bg-gray-50 text-sm"
          onClick={() => setActiveMenu('info-pasien')}
        >
          <List>
            <List.Item className="font-black">20136359</List.Item>
            <List.Item className="font-black">SITI NUR FADIYAH, / P</List.Item>
            <List.Item className="font-black">
              Tanggal Lahir: 05/05/2004
            </List.Item>
            <List.Item className="font-black">
              66 Tahun 0 Bulan 10 Hari
            </List.Item>
            <List.Item className="font-black">IGD</List.Item>
            <List.Item className="font-black">
              Tgl. Pelayanan: 17/12/2020 06:10
            </List.Item>
            <List.Item className="font-black">
              Tgl. MRS: 17/12/2020 06:10
            </List.Item>
            <List.Item className="font-black">
              Tgl. KRS: 17/12/2020 06:10
            </List.Item>
          </List>
        </Menu.Item>
        <Menu.Item className="font-bold" onClick={() => setActiveMenu('cppt')}>
          <Icon name="list" /> CPPT
        </Menu.Item>
        <Menu.Item
          className="font-bold"
          onClick={() => setActiveMenu('pengkajian-khusus')}
        >
          <Icon name="adjust" /> PENGKAJIAN KHUSUS
        </Menu.Item>
        <Menu.Item
          className="font-bold"
          onClick={() => setActiveMenu('dokumen')}
        >
          <Icon name="file alternate outline" /> DOKUMEN
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher>
        <Content umum={umum} penunjang={penunjang} activeMenu={activeMenu} />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}
