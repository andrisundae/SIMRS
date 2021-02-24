import React, { Fragment, useState } from 'react';
import className from 'classname';
import { Icon, Form, Button, Modal, Tab, Menu } from 'semantic-ui-react';
import PemeriksaanFisik from './ObjectiveExtension/PemeriksaanFisik';
import KeadaanUmum from './ObjectiveExtension/KeadaanUmum';
import TTV from './ObjectiveExtension/TTV';
import Antropometri from './ObjectiveExtension/Antropometri';
import PemeriksaanLain from './ObjectiveExtension/PemeriksaanLain';
import PemeriksaanPenunjang from './ObjectiveExtension/PemeriksaanPenunjang';

export default function ObjectiveExtension() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Tab
      menu={{
        attached: true,
        className: 'sticky z-10 top-0 p-1 pb-0 bg-gray-200',
      }}
      panes={[
        {
          menuItem: {
            key: 'pemeriksaan_fisik',
            content: 'Pemeriksaan Fisik',
            className: className('', {
              'bg-blue-600 text-white': activeIndex === 0,
            }),
            onClick: () => setActiveIndex(0),
          },
          render: () => (
            <Tab.Pane>
              <PemeriksaanFisik />
            </Tab.Pane>
          ),
        },
        {
          menuItem: {
            key: 'keadaan_umum',
            content: 'Keadaan Umum',
            className: className('', {
              'bg-blue-600 text-white': activeIndex === 1,
            }),
            onClick: () => setActiveIndex(1),
          },
          render: () => (
            <Tab.Pane>
              <KeadaanUmum />
            </Tab.Pane>
          ),
        },
        {
          menuItem: {
            key: 'ttv',
            content: 'TTV',
            className: className('', {
              'bg-blue-600 text-white': activeIndex === 2,
            }),
            onClick: () => setActiveIndex(2),
          },
          render: () => (
            <Tab.Pane>
              <TTV />
            </Tab.Pane>
          ),
        },
        {
          menuItem: {
            key: 'antropometri',
            content: 'Antropometri',
            className: className('', {
              'bg-blue-600 text-white': activeIndex === 3,
            }),
            onClick: () => setActiveIndex(3),
          },
          render: () => (
            <Tab.Pane>
              <Antropometri />
            </Tab.Pane>
          ),
        },
        {
          menuItem: {
            key: 'pemeriksaan_lain',
            content: 'Pemeriksaan Lain',
            className: className('', {
              'bg-blue-600 text-white': activeIndex === 4,
            }),
            onClick: () => setActiveIndex(4),
          },
          render: () => (
            <Tab.Pane>
              <PemeriksaanLain />
            </Tab.Pane>
          ),
        },
        {
          menuItem: {
            key: 'pemeriksaan_penunjang',
            content: 'Pemeriksaan Penunjang',
            className: className('', {
              'bg-blue-600 text-white': activeIndex === 5,
            }),
            onClick: () => setActiveIndex(5),
          },
          render: () => (
            <Tab.Pane>
              <PemeriksaanPenunjang />
            </Tab.Pane>
          ),
        },
      ]}
    />
  );
}
