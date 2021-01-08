import React, { useState } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { List, Icon, Menu, Dropdown } from 'semantic-ui-react';
import classNames from 'classnames';
import { isDesktop } from '@simrs/common/src/helpers/deviceDetector';

export default function SidebarMenu({ type }) {
  const [submenuIsOpen, setSubmenuIsOpen] = useState(false);
  const location = useLocation();
  const match = useRouteMatch();
  const pathname = location.pathname.replace(match.path, '');
  const currentMenu = '' === pathname ? pathname : pathname.split('/')[1];

  return (
    <div
      className={classNames('col-start-1 border-r', {
        'overflow-y-auto': !submenuIsOpen,
      })}
    >
      <Menu vertical secondary className="w-full h-full border-0 mx-0 p-3">
        <Menu.Item
          as={Link}
          to="/detail-rekam-medis/umum"
          className="sticky bg-gray-100 -mx-3 -mt-3"
        >
          <List>
            <List.Item className="font-semibold">20136359</List.Item>
            <List.Item className="font-semibold">
              SITI NUR FADIYAH, / P
            </List.Item>
            <List.Item>Tanggal Lahir: 05/05/2004</List.Item>
            <List.Item>66 Tahun 0 Bulan 10 Hari</List.Item>
            <List.Item>IGD</List.Item>
            <List.Item>Tgl. Pelayanan: 17/12/2020 06:10</List.Item>
            <List.Item>Tgl. MRS: 17/12/2020 06:10</List.Item>
            <List.Item>Tgl. KRS: 17/12/2020 06:10</List.Item>
          </List>
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/detail-rekam-medis/umum/anamnesis"
          className={'anamnesis' === currentMenu ? 'bg-blue-200' : ''}
        >
          <Icon name="tasks" className="float-left ml-0 mr-1" /> Anamnesis
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/detail-rekam-medis/umum/pemeriksaan-umum"
          className={'pemeriksaan-umum' === currentMenu ? 'bg-blue-200' : ''}
        >
          <Icon name="chart line" className="float-left ml-0 mr-1" />{' '}
          Pemeriksaan Umum
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/detail-rekam-medis/umum/pemeriksaan-fisik"
          className={'pemeriksaan-fisik' === currentMenu ? 'bg-blue-200' : ''}
        >
          <Icon name="stethoscope" className="float-left ml-0 mr-1" />{' '}
          Pemeriksaan Fisik
        </Menu.Item>
        <Dropdown
          item
          floating
          icon={null}
          trigger={
            <div tabIndex="-1">
              <Icon name="chart bar" /> Pengkajian Khusus
              <Icon name="caret right" className="float-right" />
            </div>
          }
          className={classNames('block', {
            'bg-blue-200': 'pengkajian-khusus' === currentMenu,
          })}
          onOpen={(e) => {
            setSubmenuIsOpen(true);
          }}
          onClose={() => {
            setSubmenuIsOpen(false);
          }}
        >
          <Dropdown.Menu
            className={classNames('z-50 overflow-y-auto top-submenu p-3', {
              'h-submenu-desktop': isDesktop,
              'h-screen': !isDesktop,
            })}
          >
            <Dropdown.Item text="Pre-Hospital" />
            <Dropdown.Item text="TRIAGE" />
            <Dropdown.Divider />
            <Dropdown.Header
              content="Screening Resiko Jatuh"
              className="normal-case text-base font-semibold"
            />
            <Dropdown.Item text="Morse Fall Scale" description="Dewasa" />
            <Dropdown.Item text="Humpty Dumpty" description="Anak" />
            <Dropdown.Item
              text="Ontario Modified Stratify"
              description="Geriatri"
            />
            <Dropdown.Item text="Time Up and Go" description="Rawat Jalan" />
            <Dropdown.Divider />
            <Dropdown.Header
              content="Screening Nyeri"
              className="normal-case text-base font-semibold"
            />
            <Dropdown.Item
              text="Numeric Rating Scale"
              description="> 7 tahun"
            />
            <Dropdown.Item text="FLACC" description="7 bulan - 7 tahun" />
            <Dropdown.Item text="CRIES" description="> 7 bulan" />
            <Dropdown.Item text="Geriatri" />
            <Dropdown.Divider />
            <Dropdown.Header
              content="Screening Gizi"
              className="normal-case text-base font-semibold"
            />
            <Dropdown.Item text="Dewasa" />
            <Dropdown.Item text="Anak" />
            <Dropdown.Item text="Obstetri" />
            <Dropdown.Item text="Intervensi Gizi" />
            <Dropdown.Divider />
            <Dropdown.Item text="Screening Activity Daily Living" />
            <Dropdown.Item text="Screening Decubitus Norton Scale" />
            <Dropdown.Item text="Screening Depresi Geriatri" />
            <Dropdown.Item text="Screening Status Mental Geriatri" />
            <Dropdown.Item text="Screening APGAR Score" />
            <Dropdown.Item text="Screening Downe Score" />
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item
          as={Link}
          to="/detail-rekam-medis/umum"
          className={'resep' === currentMenu ? 'bg-blue-200' : ''}
        >
          <Icon name="sticky note outline" className="float-left ml-0 mr-1" />{' '}
          Resep
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/detail-rekam-medis/umum"
          className={'cppt' === currentMenu ? 'bg-blue-200' : ''}
        >
          <Icon name="list" className="float-left ml-0 mr-1" /> CPPT
        </Menu.Item>
        <Dropdown
          item
          floating
          icon={null}
          trigger={
            <div tabIndex="-1">
              <Icon name="user md" /> Kerjasama Medis
              <Icon name="caret right" className="float-right" />
            </div>
          }
          className={classNames('block', {
            'bg-blue-200': 'kerja-sama-medis' === currentMenu,
          })}
          onOpen={(e, data) => {
            setSubmenuIsOpen(true);
          }}
          onClose={() => {
            setSubmenuIsOpen(false);
          }}
        >
          <Dropdown.Menu className="z-50 p-3">
            <Dropdown.Item text="Konsul" />
            <Dropdown.Item text="Rawat Bersama" />
            <Dropdown.Item text="Alih DPJP" />
            <Dropdown.Item text="Delegasi Tugas" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </div>
  );
}
