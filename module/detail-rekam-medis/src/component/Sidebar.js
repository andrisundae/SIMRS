import React, { useState, useRef } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { List, Icon, Menu, Dropdown } from 'semantic-ui-react';
import classNames from 'classnames';
import { isDesktop } from '@simrs/common/src/helpers/deviceDetector';

export default function SidebarMenu({ type }) {
  const pengkajianKhususRef = useRef(null);
  const [submenuIsOpen, setSubmenuIsOpen] = useState(false);
  const location = useLocation();
  const match = useRouteMatch();
  const pathname = location.pathname.replace(match.path, '');
  const currentMenu = '' === pathname ? pathname : pathname.split('/')[1];
  const currentChildMenu =
    '' === pathname
      ? pathname
      : undefined !== pathname.split('/')[2]
      ? pathname.split('/')[2]
      : pathname.split('/')[1];

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
          className="sticky top-0 z-10 bg-gray-100 -mx-3 -mt-3"
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
            <div ref={pengkajianKhususRef} tabIndex="-1">
              <Icon name="chart bar" /> Pengkajian Khusus
              <Icon name="caret right" className="float-right" />
            </div>
          }
          className={classNames('block', {
            'bg-blue-200': 'pengkajian-khusus' === currentMenu,
          })}
          onOpen={(e) => {
            // console.log(pengkajianKhususRef.current.getBoundingClientRect());
            setSubmenuIsOpen(true);
          }}
          onClose={() => {
            setSubmenuIsOpen(false);
          }}
        >
          <Dropdown.Menu
            className="z-50 overflow-y-auto p-3"
            style={{
              height: `calc(100vh - ${isDesktop ? 85 : 40}px)`,
              top:
                null === pengkajianKhususRef.current
                  ? 0
                  : -(
                      pengkajianKhususRef.current.getBoundingClientRect().top -
                      (isDesktop ? 45 : 2)
                    ),
            }}
          >
            <Dropdown.Item
              className={
                'prehospital' === currentChildMenu ? 'custom-selected' : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/prehospital`}
              text="Pre-Hospital"
            />
            <Dropdown.Item
              className={'triage' === currentChildMenu ? 'custom-selected' : ''}
              as={Link}
              to={`${match.path}/pengkajian-khusus/triage`}
              text="TRIAGE"
            />
            <Dropdown.Divider />
            <Dropdown.Header
              content="Screening Resiko Jatuh"
              className="normal-case text-base font-semibold"
            />
            <Dropdown.Item
              className={
                'screening-resiko-jatuh-dewasa' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-resiko-jatuh-dewasa`}
              text="Morse Fall Scale"
              description="Dewasa"
            />
            <Dropdown.Item
              className={
                'screening-resiko-jatuh-anak' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-resiko-jatuh-anak`}
              text="Humpty Dumpty"
              description="Anak"
            />
            <Dropdown.Item
              className={
                'screening-resiko-jatuh-geriatri' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-resiko-jatuh-geriatri`}
              text="Ontario Modified Stratify"
              description="Geriatri"
            />
            <Dropdown.Item
              className={
                'screening-resiko-jatuh-rawat-jalan' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-resiko-jatuh-rawat-jalan`}
              text="Time Up and Go"
              description="Rawat Jalan"
            />
            <Dropdown.Divider />
            <Dropdown.Header
              content="Screening Nyeri"
              className="normal-case text-base font-semibold"
            />
            <Dropdown.Item
              className={
                'screening-nyeri-dewasa' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-nyeri-dewasa`}
              text="Numeric Rating Scale"
              description="> 7 tahun"
            />
            <Dropdown.Item
              className={
                'screening-nyeri-anak' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-nyeri-anak`}
              text="FLACC"
              description="7 bulan - 7 tahun"
            />
            <Dropdown.Item
              className={
                'screening-nyeri-bayi' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-nyeri-bayi`}
              text="CRIES"
              description="< 7 bulan"
            />
            <Dropdown.Item
              className={
                'screening-nyeri-geriatri' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-nyeri-geriatri`}
              text="Geriatri"
            />
            <Dropdown.Divider />
            <Dropdown.Header
              content="Screening Gizi"
              className="normal-case text-base font-semibold"
            />
            <Dropdown.Item
              className={
                'screening-gizi-dewasa' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-gizi-dewasa`}
              text="Dewasa"
            />
            <Dropdown.Item
              className={
                'screening-gizi-anak' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-gizi-anak`}
              text="Anak"
            />
            <Dropdown.Item
              className={
                'screening-gizi-obstetri' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-gizi-obstetri`}
              text="Obstetri"
            />
            <Dropdown.Item
              className={
                'screening-intervensi-gizi' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-intervensi-gizi`}
              text="Intervensi Gizi"
            />
            <Dropdown.Divider />
            <Dropdown.Item
              className={
                'screening-activity-daily-living' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-activity-daily-living`}
              text="Screening Activity Daily Living"
            />
            <Dropdown.Item
              className={
                'screening-decubitus-norton-scale' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-decubitus-norton-scale`}
              text="Screening Decubitus Norton Scale"
            />
            <Dropdown.Item
              className={
                'screening-depresi-geriatri' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-depresi-geriatri`}
              text="Screening Depresi Geriatri"
            />
            <Dropdown.Item
              className={
                'screening-status-mental-geriatri' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-status-mental-geriatri`}
              text="Screening Status Mental Geriatri"
            />
            <Dropdown.Item
              className={
                'screening-apgar-score' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-apgar-score`}
              text="Screening APGAR Score"
            />
            <Dropdown.Item
              className={
                'screening-downe-score' === currentChildMenu
                  ? 'custom-selected'
                  : ''
              }
              as={Link}
              to={`${match.path}/pengkajian-khusus/screening-downe-score`}
              text="Screening Downe Score"
            />
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item
          as={Link}
          to="/detail-rekam-medis/umum/resep"
          className={'resep' === currentMenu ? 'bg-blue-200' : ''}
        >
          <Icon name="sticky note outline" className="float-left ml-0 mr-1" />{' '}
          Resep
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/detail-rekam-medis/umum/cppt"
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
            <Dropdown.Item
              className={
                'konsul-dokter' === currentChildMenu ? 'custom-selected' : ''
              }
              as={Link}
              to={`${match.path}/kerja-sama-medis/konsul-dokter/permintaan`}
              text="Konsul"
            />
            <Dropdown.Item
              className={
                'rawat-bersama' === currentChildMenu ? 'custom-selected' : ''
              }
              as={Link}
              to={`${match.path}/kerja-sama-medis/rawat-bersama/permintaan`}
              text="Rawat Bersama"
            />
            <Dropdown.Item
              className={
                'alih-dpjp' === currentChildMenu ? 'custom-selected' : ''
              }
              as={Link}
              to={`${match.path}/kerja-sama-medis/alih-dpjp/permintaan`}
              text="Alih DPJP"
            />
            <Dropdown.Item
              className={
                'delegasi-tugas' === currentChildMenu ? 'custom-selected' : ''
              }
              as={Link}
              to={`${match.path}/kerja-sama-medis/delegasi-tugas/permintaan`}
              text="Delegasi Tugas"
            />
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item
          as={Link}
          to="/detail-rekam-medis/umum/pemeriksaan-penunjang"
          className={
            'pemeriksaan-penunjang' === currentMenu ? 'bg-blue-200' : ''
          }
        >
          <Icon
            name="file alternate outline"
            className="float-left ml-0 mr-1"
          />{' '}
          Pemeriksaan Penunjang
        </Menu.Item>
      </Menu>
    </div>
  );
}
