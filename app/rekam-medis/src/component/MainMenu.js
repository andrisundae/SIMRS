import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Icon, Label, Header, List, Item } from 'semantic-ui-react';
import classNames from 'classnames';
import Mousetrap from 'mousetrap';
import { isDesktop } from '@simrs/common/src/helpers/deviceDetector';
import useOutsideCallback from '@simrs/components/src/hook/useOutsideCallback';

const VISITE_DPJP = 'visiteDpjp';
const RAWAT_BERSAMA = 'rawatBersama';
const DELEGASI_TUGAS = 'delegasiTugas';
const ALIH_DPJP = 'alihDpjp';
const KUNJUNGAN_UMUM = 'kunjunganUmum';
const KUNJUNGAN_PENUNJANG = 'kunjunganPenunjang';

const menus = [
  VISITE_DPJP,
  RAWAT_BERSAMA,
  DELEGASI_TUGAS,
  ALIH_DPJP,
  KUNJUNGAN_UMUM,
  KUNJUNGAN_PENUNJANG,
];

export default function MainMenu() {
  const history = useHistory();
  const { t } = useTranslation();
  const [selectedMenu, setSelectedMenu] = useState('');
  const menuElement = {
    [VISITE_DPJP]: useRef(null),
    [RAWAT_BERSAMA]: useRef(null),
    [DELEGASI_TUGAS]: useRef(null),
    [ALIH_DPJP]: useRef(null),
    [KUNJUNGAN_UMUM]: useRef(null),
    [KUNJUNGAN_PENUNJANG]: useRef(null),
  };

  useEffect(() => {
    if (isDesktop) {
      Mousetrap(menuElement[VISITE_DPJP].current).bind(
        ['mod+c', 'shift+tab'],
        clickOutside
      );
      Mousetrap(menuElement[RAWAT_BERSAMA].current).bind('mod+c', clickOutside);
      Mousetrap(menuElement[DELEGASI_TUGAS].current).bind(
        'mod+c',
        clickOutside
      );
      Mousetrap(menuElement[ALIH_DPJP].current).bind('mod+c', clickOutside);
      Mousetrap(menuElement[KUNJUNGAN_UMUM].current).bind(
        'mod+c',
        clickOutside
      );
      Mousetrap(menuElement[KUNJUNGAN_PENUNJANG].current).bind(
        ['mod+c', 'tab'],
        clickOutside
      );

      Mousetrap.bind('alt+v', menuElement[VISITE_DPJP].current.click);
      Mousetrap.bind('alt+r', menuElement[RAWAT_BERSAMA].current.click);
      Mousetrap.bind('alt+d', menuElement[DELEGASI_TUGAS].current.click);
      Mousetrap.bind('alt+a', menuElement[ALIH_DPJP].current.click);
      Mousetrap.bind('alt+k', menuElement[KUNJUNGAN_UMUM].current.click);
      Mousetrap.bind('alt+p', menuElement[KUNJUNGAN_PENUNJANG].current.click);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isDesktop) {
      Mousetrap.bind('down', toNextMenu);
      Mousetrap.bind('up', toPrevMenu);

      return () => {
        Mousetrap.unbind('down');
        Mousetrap.unbind('up');
      };
    }
    // eslint-disable-next-line
  }, [selectedMenu]);

  useOutsideCallback(menuElement, clickOutside);

  function toNextMenu() {
    const selectedIndex = menus.indexOf(selectedMenu);

    if (-1 === selectedIndex || selectedIndex === menus.length - 1) {
      menuElement[VISITE_DPJP].current.focus();
    } else {
      const nextSelectedIndex = selectedIndex + 1;
      menuElement[menus[nextSelectedIndex]].current.focus();
    }
  }

  function toPrevMenu() {
    const selectedIndex = menus.indexOf(selectedMenu);

    if (-1 === selectedIndex || 0 === selectedIndex) {
      menuElement[KUNJUNGAN_PENUNJANG].current.focus();
    } else {
      const prevSelectedIndex = selectedIndex - 1;
      menuElement[menus[prevSelectedIndex]].current.focus();
    }
  }

  function clickOutside() {
    setSelectedMenu('');
  }

  function toVisiteDpjp(e) {
    e.preventDefault();
    alert('VisiteDpjp');
  }

  function toRawatBersama(e) {
    e.preventDefault();
    alert('RawatBersama');
  }

  function toDelegasiTugas(e) {
    e.preventDefault();
    alert('DelegasiTugas');
  }

  function toAlihDpjp(e) {
    e.preventDefault();
    alert('AlihDpjp');
  }

  function toKunjungan(e) {
    e.preventDefault();
    history.push('/antrian/umum');
  }

  function toPemeriksaanPenunjang(e) {
    e.preventDefault();
    history.push('/antrian/penunjang');
  }

  return (
    <div className="lg:flex py-20">
      <div className="flex-1"></div>
      <div className="flex-auto grid grid-cols-2 gap-12 pl-10 pr-10">
        <div>
          <Header as="h3">{t('portal:antrianMedis')}</Header>
          <List selection>
            <ListItem
              ref={menuElement[VISITE_DPJP]}
              iconName="bed"
              iconColor="violet"
              badgeCounter={1}
              header={t(`module:${VISITE_DPJP}`)}
              shortcut="Alt + V"
              description={t(`module:${VISITE_DPJP}.description`)}
              active={VISITE_DPJP === selectedMenu}
              onFocus={() => {
                setSelectedMenu(VISITE_DPJP);
              }}
              onClick={toVisiteDpjp}
            />
            <ListItem
              ref={menuElement[RAWAT_BERSAMA]}
              iconName="users"
              iconColor="green"
              header={t(`module:${RAWAT_BERSAMA}`)}
              shortcut="Alt + R"
              description={t(`module:${RAWAT_BERSAMA}.description`)}
              active={RAWAT_BERSAMA === selectedMenu}
              onFocus={() => {
                setSelectedMenu(RAWAT_BERSAMA);
              }}
              onClick={toRawatBersama}
            />
            <ListItem
              ref={menuElement[DELEGASI_TUGAS]}
              iconName="user plus"
              iconColor="blue"
              header={t(`module:${DELEGASI_TUGAS}`)}
              shortcut="Alt + D"
              description={t(`module:${DELEGASI_TUGAS}.description`)}
              active={DELEGASI_TUGAS === selectedMenu}
              onFocus={() => {
                setSelectedMenu(DELEGASI_TUGAS);
              }}
              onClick={toDelegasiTugas}
            />
            <ListItem
              ref={menuElement[ALIH_DPJP]}
              iconName="user times"
              iconColor="orange"
              header={t(`module:${ALIH_DPJP}`)}
              shortcut="Alt + A"
              description={t(`module:${ALIH_DPJP}.description`)}
              active={ALIH_DPJP === selectedMenu}
              onFocus={() => {
                setSelectedMenu(ALIH_DPJP);
              }}
              onClick={toAlihDpjp}
            />
          </List>
        </div>
        <div>
          <Header as="h3">{t('portal:antrianUmum')}</Header>
          <List selection>
            <ListItem
              ref={menuElement[KUNJUNGAN_UMUM]}
              iconName="ordered list"
              iconColor="teal"
              header={t(`module:${KUNJUNGAN_UMUM}`)}
              shortcut="Alt + K"
              description={t(`module:${KUNJUNGAN_UMUM}.description`)}
              active={KUNJUNGAN_UMUM === selectedMenu}
              onFocus={() => {
                setSelectedMenu(KUNJUNGAN_UMUM);
              }}
              onClick={toKunjungan}
            />
            <ListItem
              ref={menuElement[KUNJUNGAN_PENUNJANG]}
              iconName="ordered list"
              iconColor="yellow"
              header={t(`module:${KUNJUNGAN_PENUNJANG}`)}
              shortcut="Alt + P"
              description={t(`module:${KUNJUNGAN_PENUNJANG}.description`)}
              active={KUNJUNGAN_PENUNJANG === selectedMenu}
              onFocus={() => {
                setSelectedMenu(KUNJUNGAN_PENUNJANG);
              }}
              onClick={toPemeriksaanPenunjang}
            />
          </List>
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}

const ListItem = forwardRef(
  (
    {
      active = false,
      iconName,
      iconColor = undefined,
      header,
      shortcut = undefined,
      description,
      badgeCounter = undefined,
      ...props
    },
    ref
  ) => {
    const menuRef = useRef();

    useImperativeHandle(ref, () => ({
      focus: () => {
        menuRef.current.focus();
      },
      contains: (target) => {
        menuRef.current.contains(target);
      },
      addEventListener: (type, callback, useCapture) => {
        menuRef.current.addEventListener(type, callback, useCapture);
      },
      attachEvent: (type, callback) => {
        menuRef.current.attachEvent(type, callback);
      },
      click: () => {
        menuRef.current.click();
      },
    }));

    return (
      <a
        ref={menuRef}
        href="/"
        className={classNames('item focus:shadow hover:shadow py-4', {
          active,
        })}
        {...props}
      >
        <Item.Image className="relative">
          <Icon
            name={iconName}
            color={iconColor}
            size="large"
            circular
            inverted
          />
          {0 < badgeCounter && (
            <Label circular color="red" floating className="left-auto -top-2">
              {badgeCounter}
            </Label>
          )}
        </Item.Image>
        <Item.Content>
          <Item.Header>
            {header}
            {isDesktop && undefined !== shortcut && (
              <Label basic color="grey" size="small" className="py-1 px-2 ml-2">
                {shortcut}
              </Label>
            )}
          </Item.Header>
          <Item.Description>{description}</Item.Description>
        </Item.Content>
      </a>
    );
  }
);
