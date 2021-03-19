import React, { Fragment, useState, useRef } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { List, Icon, Menu, Dropdown } from 'semantic-ui-react';
import classNames from 'classnames';
import { isDesktop } from '@simrs/common/src/helpers/deviceDetector';

export default function SidebarMenu({ type, kode }) {
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

  let query = undefined !== kode ? `kode=${kode}` : '';

  const listMenu = [
    { text: 'Anamnesis', icon: 'tasks', path: '/anamnesis', useFor: ['umum'] },
    {
      text: 'Pemeriksaan Umum',
      icon: 'chart line',
      path: '/pemeriksaan-umum',
      useFor: ['umum'],
    },
    {
      text: 'Pemeriksaan Fisik',
      icon: 'stethoscope',
      path: '/pemeriksaan-fisik',
      useFor: ['umum'],
    },
    {
      text: 'Pengkajian Khusus',
      icon: 'chart bar',
      path: '/pengkajian-khusus',
      useFor: ['umum'],
      children: [
        { text: 'Pre-Hospital', path: '/prehospital' },
        { text: 'TRIAGE', path: '/triage' },
        {
          text: 'Screening Resiko Jatuh',
          path: '/screening-resiko-jatuh',
          children: [
            {
              text: 'Morse Fall Scale',
              description: 'Dewasa',
              keyPath: 'dewasa',
            },
            { text: 'Humpty Dumpty', description: 'Anak', keyPath: 'anak' },
            {
              text: 'Ontario Modified Stratify',
              description: 'Geriatri',
              keyPath: 'geriatri',
            },
            {
              text: 'Time Up and Go',
              description: 'Rawat Jalan',
              keyPath: 'rawat-jalan',
            },
          ],
        },
        {
          text: 'Screening Nyeri',
          path: '/screening-nyeri',
          children: [
            {
              text: 'Numeric Rating Scale',
              description: '> 7 tahun',
              keyPath: 'dewasa',
            },
            {
              text: 'FLACC',
              description: '7 bulan - 7 tahun',
              keyPath: 'anak',
            },
            { text: 'CRIES', description: '< 7 bulan', keyPath: 'bayi' },
            { text: 'Geriatri', keyPath: 'geriatri' },
          ],
        },
        {
          text: 'Screening Gizi',
          path: '/screening-gizi',
          children: [
            { text: 'Dewasa', keyPath: 'dewasa' },
            { text: 'Anak', keyPath: 'anak' },
            { text: 'Obstetri', keyPath: 'obstetri' },
            { text: 'Intervensi Gizi', path: '/screening-intervensi-gizi' },
          ],
        },
        {
          text: 'Screening Activity Daily Living',
          path: '/screening-activity-daily-living',
        },
        {
          text: 'Screening Decubitus Norton Scale',
          path: '/screening-decubitus-norton-scale',
        },
        {
          text: 'Screening Depresi Geriatri',
          path: '/screening-depresi-geriatri',
        },
        {
          text: 'Screening Status Mental Geriatri',
          path: '/screening-status-mental-geriatri',
        },
        { text: 'Screening APGAR Score', path: '/screening-apgar-score' },
        { text: 'Screening DOWNE Score', path: '/screening-downe-score' },
      ],
    },
    {
      text: 'Hasil Penunjang',
      icon: 'tasks',
      path: '/hasil-penunjang',
      useFor: ['penunjang'],
    },
    {
      text: 'Resep',
      icon: 'sticky note outline',
      path: '/resep',
      useFor: ['umum', 'penunjang'],
    },
    {
      text: 'CPPT',
      icon: 'list',
      path: '/cppt',
      useFor: ['umum', 'penunjang'],
    },
    {
      text: 'Kerjasama Medis',
      icon: 'user md',
      path: '/kerja-sama-medis',
      useFor: ['umum'],
      children: [
        { text: 'Konsul', path: '/konsul-dokter/permintaan' },
        { text: 'Rawat Bersama', path: '/rawat-bersama/permintaan' },
        { text: 'Alih DPJP', path: '/alih-dpjp/permintaan' },
        { text: 'Delegasi Tugas', path: '/delegasi-tugas/permintaan' },
      ],
    },
    {
      text: 'Pemeriksaan Penunjang',
      icon: 'file alternate outline',
      path: '/pemeriksaan-penunjang',
      useFor: ['umum'],
    },
    {
      text: 'Dokumen',
      icon: 'file alternate outline',
      path: '/dokumen',
      useFor: ['umum', 'penunjang'],
    },
  ];

  return (
    <div
      className={classNames('col-start-1 border-r', {
        'overflow-y-auto': !submenuIsOpen,
      })}
    >
      <Menu vertical secondary className="w-full h-full border-0 mx-0 p-3">
        <Menu.Item
          as={Link}
          to={`/detail-rekam-medis/${type}`}
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
        {listMenu.map((dt1, idx1) => {
          if (dt1.useFor.indexOf(type) > -1) {
            if (undefined !== dt1.children) {
              let stylesPengkajian = {
                height: `calc(100vh - ${isDesktop ? 85 : 40}px)`,
                top:
                  null === pengkajianKhususRef.current
                    ? 0
                    : -(
                        pengkajianKhususRef.current.getBoundingClientRect()
                          .top - (isDesktop ? 45 : 2)
                      ),
              };
              return (
                <Dropdown
                  key={idx1}
                  item
                  floating
                  icon={null}
                  trigger={
                    dt1.text === 'Pengkajian Khusus' ? (
                      <div ref={pengkajianKhususRef} tabIndex="-1">
                        <Icon name={dt1.icon} /> {dt1.text}
                        <Icon name="caret right" className="float-right" />
                      </div>
                    ) : (
                      <div tabIndex="-1">
                        <Icon name={dt1.icon} /> {dt1.text}
                        <Icon name="caret right" className="float-right" />
                      </div>
                    )
                  }
                  className={classNames('block', {
                    'bg-blue-200': dt1.path.substring(1) === currentMenu,
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
                    className={classNames('z-50 p-3', {
                      'overflow-y-auto': dt1.text === 'Pengkajian Khusus',
                    })}
                    style={
                      dt1.text === 'Pengkajian Khusus' ? stylesPengkajian : {}
                    }
                  >
                    {dt1.children.map((dt2, idx2) => {
                      let items = [];
                      if (undefined !== dt2.children) {
                        items.push(
                          <Fragment key={`${idx2}h`}>
                            <Dropdown.Divider />
                            <Dropdown.Header
                              content={dt2.text}
                              className="normal-case text-base font-semibold"
                            />
                            {dt2.children.map((dt3, idx3) => {
                              if (dt3.text === 'Intervensi Gizi') {
                                return (
                                  <Fragment>
                                    <Dropdown.Item
                                      key={idx3}
                                      className={
                                        dt3.path.substring(1) ===
                                        currentChildMenu
                                          ? 'custom-selected'
                                          : ''
                                      }
                                      as={Link}
                                      to={{
                                        pathname: `${match.path}${dt1.path}${dt3.path}`,
                                        search: query,
                                      }}
                                      text={dt3.text}
                                      description={
                                        undefined !== dt3.description
                                          ? dt3.description
                                          : ''
                                      }
                                    />
                                    <Dropdown.Divider />
                                  </Fragment>
                                );
                              } else {
                                return (
                                  <Dropdown.Item
                                    key={idx3}
                                    className={
                                      `${dt2.path}-${dt3.keyPath}`.substring(
                                        1
                                      ) === currentChildMenu
                                        ? 'custom-selected'
                                        : ''
                                    }
                                    as={Link}
                                    to={{
                                      pathname: `${match.path}${dt1.path}${dt2.path}-${dt3.keyPath}`,
                                      search: query,
                                    }}
                                    text={dt3.text}
                                    description={
                                      undefined !== dt3.description
                                        ? dt3.description
                                        : ''
                                    }
                                  />
                                );
                              }
                            })}
                          </Fragment>
                        );
                      } else {
                        items.push(
                          <Dropdown.Item
                            key={idx2}
                            className={
                              dt2.path.substring(1) === currentChildMenu
                                ? 'custom-selected'
                                : ''
                            }
                            as={Link}
                            to={{
                              pathname: `${match.path}${dt1.path}${dt2.path}`,
                              search: query,
                            }}
                            text={dt2.text}
                            description={
                              undefined !== dt2.description
                                ? dt2.description
                                : ''
                            }
                          />
                        );
                      }
                      return items;
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              );
            } else {
              return (
                <Menu.Item
                  key={idx1}
                  as={Link}
                  to={{
                    pathname: `/detail-rekam-medis/${type}${dt1.path}`,
                    search: query,
                  }}
                  className={
                    dt1.path.substring(1) === currentMenu ? 'bg-blue-200' : ''
                  }
                >
                  <Icon name={dt1.icon} className="float-left ml-0 mr-1" />{' '}
                  {dt1.text}
                </Menu.Item>
              );
            }
          }
        })}
        {/*
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
      */}
      </Menu>
    </div>
  );
}
